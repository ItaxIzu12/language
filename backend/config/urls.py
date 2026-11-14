from django.urls import path, re_path
from learning import catalog, views

urlpatterns = [
    path("api/v1/courses/", catalog.courses),
    path("api/v1/courses/<slug:language>/", catalog.course),
    path("api/v1/courses/<slug:language>/words/", catalog.words),
    path("api/v1/health/", views.health),
    path("api/v1/session/", views.session),
    re_path(r"^api/v1/(?P<action>login|register|logout)/$", views.account),
    path("api/v1/state/<slug:language>/", views.state),
]
