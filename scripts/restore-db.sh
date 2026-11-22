#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
if [ "$#" -ne 2 ] || [ "$1" != "--replace" ] || [ ! -f "$2" ]; then
    printf '%s\n' 'Aufruf: sh scripts/restore-db.sh --replace backups/DATEI.dump' 'Ersetzt die aktuelle Datenbank durch diese Sicherung.' >&2
    exit 1
fi
docker compose exec -T db pg_restore --list < "$2" > /dev/null
# Stop application writes while replacing database contents.
docker compose stop backend
trap 'docker compose start backend' EXIT HUP INT TERM
docker compose exec -T db sh -c 'pg_restore --exit-on-error --single-transaction --clean --if-exists --no-owner -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < "$2"
printf '%s\n' 'Datenbank wiederhergestellt.'
