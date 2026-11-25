"""Per-account lockout after repeated failed logins.

Complements the per-IP limit in nginx.conf, which cannot stop distributed attempts
against a single account. Keys hash the normalised username, so unknown usernames are
locked the same way and the response reveals nothing about which accounts exist.

The default cache is per process: with several Gunicorn workers the effective limit is
up to MAX_FAILURES per worker. That is acceptable here; a shared cache is not worth an
extra service.
"""

import hashlib
from django.core.cache import cache

MAX_FAILURES = 5
WINDOW_SECONDS = 15 * 60


def _key(username):
    return "login-failures:" + hashlib.sha256(username.casefold().encode()).hexdigest()


def is_locked(username):
    return cache.get(_key(username), 0) >= MAX_FAILURES


def record_failure(username):
    key = _key(username)
    # The window starts with the first failure and is not extended by later ones.
    cache.add(key, 0, WINDOW_SECONDS)
    try:
        cache.incr(key)
    except ValueError:  # expired between add and incr
        cache.set(key, 1, WINDOW_SECONDS)


def reset(username):
    cache.delete(_key(username))
