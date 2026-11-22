import os

SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1,[::1]").split(",")
ROOT_URLCONF = "config.urls"
INSTALLED_APPS = ["django.contrib.auth", "django.contrib.contenttypes", "django.contrib.sessions", "learning", "accounts", "catalog", "rest_framework"]
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
]
DATABASES = {"default": {
    "ENGINE": "django.db.backends.postgresql",
    "NAME": os.getenv("POSTGRES_DB", "linguaflow"),
    "USER": os.getenv("POSTGRES_USER", "linguaflow"),
    "PASSWORD": os.environ["POSTGRES_PASSWORD"],
    "HOST": os.getenv("POSTGRES_HOST", "db"),
    "PORT": os.getenv("POSTGRES_PORT", "5432"),
}}
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation." + name}
    for name in ("UserAttributeSimilarityValidator", "MinimumLengthValidator", "CommonPasswordValidator", "NumericPasswordValidator")
] + [{"NAME": "accounts.validators.SpecialCharacterValidator"}]
USE_TZ = True
LANGUAGE_CODE = "de"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
SESSION_COOKIE_SECURE = CSRF_COOKIE_SECURE = os.getenv("DJANGO_HTTPS", "0") == "1"
DATA_UPLOAD_MAX_MEMORY_SIZE = 4 * 1024 * 1024
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ["rest_framework.authentication.SessionAuthentication"],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
}
CSRF_TRUSTED_ORIGINS = [origin.strip() for origin in os.getenv("DJANGO_CSRF_TRUSTED_ORIGINS", "").split(",") if origin.strip()]

# Only expose provider routes when the backend has the complete credentials.
SOCIALACCOUNT_PROVIDERS = {}
if os.getenv("GOOGLE_LOGIN_ENABLED", "1") == "1" and all(
    os.getenv(k) for k in ("GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET")
):
    SOCIALACCOUNT_PROVIDERS["google"] = {"APPS": [{
        "client_id": os.environ["GOOGLE_CLIENT_ID"], "secret": os.environ["GOOGLE_CLIENT_SECRET"],
    }], "OAUTH_PKCE_ENABLED": True}
if os.getenv("APPLE_LOGIN_ENABLED", "1") == "1" and all(
    os.getenv(k) for k in ("APPLE_SERVICE_ID", "APPLE_TEAM_ID", "APPLE_KEY_ID", "APPLE_PRIVATE_KEY")
):
    SOCIALACCOUNT_PROVIDERS["apple"] = {"APPS": [{
        "client_id": os.environ["APPLE_SERVICE_ID"], "key": os.environ["APPLE_TEAM_ID"],
        "secret": os.environ["APPLE_KEY_ID"],
        "settings": {"certificate_key": os.environ["APPLE_PRIVATE_KEY"].replace("\\n", "\n")},
    }]}
if SOCIALACCOUNT_PROVIDERS:
    INSTALLED_APPS += ["django.contrib.messages", "allauth", "allauth.account", "allauth.socialaccount"]
    INSTALLED_APPS += ["allauth.socialaccount.providers." + provider for provider in SOCIALACCOUNT_PROVIDERS]
    MIDDLEWARE += ["django.contrib.messages.middleware.MessageMiddleware", "allauth.account.middleware.AccountMiddleware"]
    TEMPLATES = [{"BACKEND": "django.template.backends.django.DjangoTemplates", "APP_DIRS": True,
                  "OPTIONS": {"context_processors": ["django.template.context_processors.request",
                                                     "django.contrib.messages.context_processors.messages"]}}]
    LOGIN_REDIRECT_URL = "/#/sprachwahl"
    ACCOUNT_DEFAULT_HTTP_PROTOCOL = "https" if SESSION_COOKIE_SECURE else "http"
    ACCOUNT_EMAIL_VERIFICATION = "none"
    SOCIALACCOUNT_ONLY = True
    SOCIALACCOUNT_STORE_TOKENS = False

# Recovery mail is configured explicitly; the default sends no mail.
PUBLIC_APP_URL = os.getenv("PUBLIC_APP_URL", "http://localhost:8080").rstrip("/")
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = os.getenv("EMAIL_HOST", "")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "1") == "1"
EMAIL_TIMEOUT = 10
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "noreply@localhost")
PASSWORD_RESET_TIMEOUT = 3600
if "TEMPLATES" not in globals():
    TEMPLATES = [{"BACKEND": "django.template.backends.django.DjangoTemplates", "APP_DIRS": True}]
