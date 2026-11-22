from django.conf import settings
from django.urls import include, path, re_path
from accounts import views as accounts
from accounts import recovery
from catalog import views as catalog
from learning import views

urlpatterns = [
    path("api/v1/password-reset/", recovery.request_reset),
    path("api/v1/password-reset-confirm/", recovery.confirm_reset),
    path("api/v1/recovery-email/", recovery.recovery_email),
    path("api/v1/courses/", catalog.courses),
    path("api/v1/courses/<slug:language>/", catalog.course),
    path("api/v1/courses/<slug:language>/words/", catalog.words),
    path("api/v1/health/", views.health),
    path("api/v1/me/", accounts.personal_data),
    path("api/v1/session/", accounts.session),
    re_path(r"^api/v1/(?P<action>login|register|logout)/$", accounts.account),
    path("api/v1/state/<slug:language>/", views.state),
]

if settings.SOCIALACCOUNT_PROVIDERS:
    urlpatterns.append(path("api/oauth/", include("allauth.urls")))
