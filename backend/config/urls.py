from django.urls import path, re_path
from accounts import views as accounts
from catalog import views as catalog
from learning import views

urlpatterns = [
    path("api/v1/courses/", catalog.courses),
    path("api/v1/courses/<slug:language>/", catalog.course),
    path("api/v1/courses/<slug:language>/words/", catalog.words),
    path("api/v1/health/", views.health),
    path("api/v1/me/", accounts.personal_data),
    path("api/v1/session/", accounts.session),
    re_path(r"^api/v1/(?P<action>login|register|logout)/$", accounts.account),
    path("api/v1/state/<slug:language>/", views.state),
]
