import json
from urllib.parse import unquote

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.db import IntegrityError, connection, transaction
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.cache import never_cache
from django.views.decorators.http import require_GET, require_POST, require_http_methods

from .models import LearningState
from .validation import validate_document

User = get_user_model()


def error(message, status):
    return JsonResponse({"error": message}, status=status)


def body(request):
    if request.content_type != "application/json":
        raise ValueError
    value = json.loads(request.body)
    if not isinstance(value, dict):
        raise ValueError
    return value


@require_GET
def health(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
    return JsonResponse({"status": "ok"})


@never_cache
@require_GET
def session(request):
    return session_response(request)


@never_cache
@require_POST
def account(request, action):
    if action == "logout":
        logout(request)
        return session_response(request)
    try:
        credentials = body(request)
        username, password = credentials["username"], credentials["password"]
        if not all(isinstance(v, str) and 0 < len(v) <= limit for v, limit in ((username, 150), (password, 1024))):
            raise ValueError
    except (ValueError, KeyError):
        return error("Benutzername und Passwort eingeben.", 400)
    if action == "register":
        form = UserCreationForm(data={"username": username, "password1": password, "password2": password})
        if not form.is_valid():
            return error(" ".join(str(m) for errors in form.errors.values() for m in errors), 400)
        try:
            with transaction.atomic():
                user = form.save()
        except IntegrityError:
            return error("Benutzername bereits vergeben.", 409)
    else:
        user = authenticate(request, username=username, password=password)
        if user is None:
            return error("Anmeldung fehlgeschlagen.", 401)
    login(request, user)
    return session_response(request)


def session_response(request):
    return JsonResponse({"username": request.user.get_username() or None, "csrf": get_token(request)})


@never_cache
@require_http_methods(["GET", "PUT"])
def state(request, language):
    if not request.user.is_authenticated:
        return error("Bitte erneut anmelden.", 401)
    if len(language) > 32:
        return error("Sprachcode zu lang.", 400)
    if unquote(request.headers.get("X-Learner", "")) != request.user.get_username():
        return error("Das aktive Konto hat gewechselt.", 409)
    scope = {"user_id": request.user.pk, "language": language}
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
