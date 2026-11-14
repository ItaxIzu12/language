import json
from urllib.parse import unquote

from django.contrib.auth import get_user_model
from django.db import connection, transaction
from django.http import JsonResponse
from config.http import body, error
from django.views.decorators.cache import never_cache
from django.views.decorators.http import require_GET, require_http_methods

from catalog.models import Course
from .models import LearningState
from .validation import validate_document

User = get_user_model()


@require_GET
def health(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
    return JsonResponse({"status": "ok"})


@never_cache
@require_http_methods(["GET", "PUT"])
def state(request, language):
    if not request.user.is_authenticated:
        return error("Bitte erneut anmelden.", 401)
    if len(language) > 32:
        return error("Sprachcode zu lang.", 400)
    if unquote(request.headers.get("X-Learner", "")) != request.user.get_username():
        return error("Das aktive Konto hat gewechselt.", 409)
    if not Course.objects.filter(pk=language).exists():
        return error("Unbekannter Kurs.", 404)
    scope = {"user_id": request.user.pk, "language_id": language}
    if request.method == "GET":
        row = LearningState.objects.filter(**scope).first()
        return JsonResponse({"revision": row.revision if row else 0, "document": row.document if row else None})
    try:
        payload = body(request)
        revision, document = payload["revision"], payload["document"]
        if type(revision) is not int or not 0 <= revision < 2**53:
            raise ValueError
        validate_document(document, language)
        # Reject values PostgreSQL JSONB cannot store, including escaped NUL.
        serialized = json.dumps(document, ensure_ascii=False, allow_nan=False)
        serialized.encode("utf-8")
        if r"\u0000" in serialized:
            raise ValueError
    except (ValueError, KeyError, TypeError, RecursionError):
        return error("Der Lernstand hat ein ungültiges Format.", 400)
    with transaction.atomic():
        # Lock the parent so simultaneous first writes are serialized too.
        User.objects.select_for_update().get(pk=request.user.pk)
        row, _ = LearningState.objects.get_or_create(**scope)
        if row.revision != revision:
            if row.revision == revision + 1 and row.document == document:
                return JsonResponse({"revision": row.revision})
            return error("Ein anderes Gerät hat einen neueren Stand gespeichert.", 409)
        row.revision += 1
        row.document = document
        row.save()
    return JsonResponse({"revision": row.revision})
