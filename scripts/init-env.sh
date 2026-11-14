#!/bin/sh
set -eu

cd "$(dirname "$0")/.."
init_env() (
    if [ -f .env ]; then
        printf '%s\n' '.env existiert bereits.'
        exit 0
    fi
    if [ -e .env ] || [ -L .env ]; then
        printf '%s\n' 'Der Pfad .env ist bereits belegt.' >&2
        exit 1
    fi

    umask 077
    tmp=$(mktemp .env.tmp.XXXXXXXX)
    trap 'rm -f "$tmp"' EXIT
    trap 'exit 1' HUP INT TERM

    while IFS= read -r line || [ -n "$line" ]; do
        case "$line" in
            POSTGRES_PASSWORD=|DJANGO_SECRET_KEY=)
                secret=$(openssl rand -hex 48)
                printf '%s%s\n' "$line" "$secret"
                ;;
            *) printf '%s\n' "$line" ;;
        esac
    done < .env.example > "$tmp"

    # Publish the completed file atomically; concurrent runs cannot overwrite it.
    if ln "$tmp" .env 2>/dev/null; then
        printf '%s\n' '.env angelegt.'
    elif [ -f .env ]; then
        printf '%s\n' '.env existiert bereits.'
    else
        printf '%s\n' '.env konnte nicht angelegt werden.' >&2
        exit 1
    fi
)

printf '%s\n' 'Lokale Konfiguration prüfen (.env.example → .env)'
init_env

# Only trace public commands, after credentials have been prepared.
(
    set -x
    docker compose config --quiet
    docker compose up --build --wait --wait-timeout 180
    docker compose ps
)
