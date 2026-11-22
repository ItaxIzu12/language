#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
umask 077
mkdir -p backups
target="backups/linguaflow-$(date -u +%Y%m%dT%H%M%SZ)-$$.dump"
tmp=$(mktemp backups/.dump.XXXXXXXX)
trap 'rm -f "$tmp"' EXIT HUP INT TERM
docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > "$tmp"
mv "$tmp" "$target"
printf 'Datenbanksicherung erstellt: %s\n' "$target"
