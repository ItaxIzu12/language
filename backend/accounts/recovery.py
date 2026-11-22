import logging
from django import forms
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.db import transaction
from django.http import JsonResponse
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.views.decorators.cache import never_cache
from django.views.decorators.http import require_POST
from config.http import body, error

logger = logging.getLogger(__name__)


@never_cache
@require_POST
def request_reset(request):
    if settings.EMAIL_BACKEND == "django.core.mail.backends.smtp.EmailBackend" and not settings.EMAIL_HOST:
        return error("Der E-Mail-Versand ist noch nicht eingerichtet. Bitte wende dich an den Betreiber.", 503)
    try:
        email = forms.EmailField().clean(body(request).get("email"))
    except (ValueError, forms.ValidationError):
        return error("Bitte eine gültige E-Mail-Adresse eingeben.", 400)
    form = PasswordResetForm({"email": email})
    if form.is_valid():
        try:
            form.save(
                domain_override=settings.PUBLIC_APP_URL.split("://", 1)[1],
                use_https=settings.PUBLIC_APP_URL.startswith("https://"),
                email_template_name="accounts/reset_email.txt",
                subject_template_name="accounts/reset_subject.txt",
                from_email=settings.DEFAULT_FROM_EMAIL,
            )
        except Exception:
            # Never expose recipient, SMTP details or reset links in logs.
            logger.error("Password reset email delivery failed.")
    return JsonResponse({"message": "Wenn ein passendes Konto existiert, erhältst du eine E-Mail mit weiteren Schritten."})


@never_cache
@require_POST
def confirm_reset(request):
    User = get_user_model()
    try:
        data = body(request)
        uid, token = data["uid"], data["token"]
        if not isinstance(uid, str) or len(uid) > 128 or not isinstance(token, str) or len(token) > 128:
            raise ValueError
        pk = force_str(urlsafe_base64_decode(uid))
    except (ValueError, KeyError, TypeError, UnicodeDecodeError):
        return error("Dieser Link ist ungültig oder abgelaufen.", 400)
    with transaction.atomic():
        user = User.objects.select_for_update().filter(pk=pk).first() if pk.isdecimal() and len(pk) <= 18 else None
        if not user or not user.is_active or not default_token_generator.check_token(user, token):
            return error("Dieser Link ist ungültig oder abgelaufen. Fordere einen neuen Link an.", 400)
        if not all(isinstance(data.get(field), str) and 0 < len(data[field]) <= 1024 for field in ("password", "confirmation")):
            return error("Bitte beide Passwörter eingeben.", 400)
        form = SetPasswordForm(user, {
            "new_password1": data.get("password"),
            "new_password2": data.get("confirmation"),
        })
        if not form.is_valid():
            return error(" ".join(str(message) for messages in form.errors.values() for message in messages), 400)
        form.save()
    return JsonResponse({"message": "Dein Passwort wurde geändert. Du kannst dich jetzt anmelden."})


@never_cache
@require_POST
def recovery_email(request):
    if not request.user.is_authenticated:
        return error("Bitte anmelden.", 401)
    try:
        data = body(request)
        email = forms.EmailField().clean(data.get("email"))
        password = data.get("password")
        if not isinstance(password, str) or not request.user.check_password(password):
            return error("Bitte mit deinem aktuellen Passwort bestätigen.", 403)
    except (ValueError, forms.ValidationError):
        return error("Bitte eine gültige E-Mail-Adresse eingeben.", 400)
    request.user.email = email
    request.user.save(update_fields=["email"])
    return JsonResponse({"message": "E-Mail-Adresse für die Wiederherstellung gespeichert."})
