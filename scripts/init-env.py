"""Create local Docker credentials once, without overwriting an existing .env."""
import os
from pathlib import Path
import secrets

path = Path(__file__).resolve().parent.parent / ".env"
try:
    fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
except FileExistsError:
    print(".env existiert bereits.")
else:
    with os.fdopen(fd, "w") as out:
        for name in ("DJANGO_SECRET_KEY", "POSTGRES_PASSWORD"):
            print(f"{name}={secrets.token_urlsafe(48)}", file=out)
    print(".env angelegt.")
