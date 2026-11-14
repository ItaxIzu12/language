# Isolated fallback for API tests on machines without PostgreSQL.
import os
os.environ.setdefault("DJANGO_SECRET_KEY", "local-test-suite-only")
os.environ.setdefault("POSTGRES_PASSWORD", "unused")
from .settings import *  # noqa

DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}}
