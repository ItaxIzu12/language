from django import forms
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.db import IntegrityError, transaction
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.cache import never_cache
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from config.http import body, error
from . import lockout


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
            email = forms.EmailField(required=False).clean(credentials.get("email", ""))
        except forms.ValidationError:
            return error("Bitte eine gültige E-Mail-Adresse eingeben.", 400)
        try:
            with transaction.atomic():
                user = form.save(commit=False)
                user.email = email
                user.save()
        except IntegrityError:
            return error("Benutzername bereits vergeben.", 409)
    else:
        if lockout.is_locked(username):
            response = error("Zu viele fehlgeschlagene Anmeldungen. Bitte versuche es in 15 Minuten erneut.", 429)
            response["Retry-After"] = str(lockout.WINDOW_SECONDS)
            return response
        user = authenticate(request, username=username, password=password)
        if user is None:
            lockout.record_failure(username)
            return error("Anmeldung fehlgeschlagen.", 401)
        lockout.reset(username)
    login(request, user)
    return session_response(request)


def session_response(request):
    return JsonResponse({"username": request.user.get_username() or None, "csrf": get_token(request), "providers": list(settings.SOCIALACCOUNT_PROVIDERS)})


@never_cache
@require_http_methods(["GET", "DELETE"])
def personal_data(request):
    if not request.user.is_authenticated:
        return error("Anmeldung erforderlich.", 401)
    if request.method == "GET":
        rows = request.user.learningstate_set.order_by("language_id").values("language_id", "revision", "document")
        return JsonResponse({"username": request.user.get_username(), "states": list(rows)})
    try:
        password = body(request).get("password")
        if not isinstance(password, str) or not request.user.check_password(password):
            return error("Passwort bestätigen.", 403)
    except ValueError:
        return error("Ungültige Anfrage.", 400)
    with transaction.atomic():
        user = request.user
        logout(request)
        user.delete()
    return JsonResponse({"deleted": True})
