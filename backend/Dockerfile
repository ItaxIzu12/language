FROM node:22-alpine AS catalog
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY scripts scripts
COPY src src
RUN ./node_modules/.bin/esbuild scripts/export-courses.ts --bundle --platform=node --format=esm --define:import.meta.env.DEV=false --outfile=/app/export.mjs && node /app/export.mjs /app/courses.json

FROM python:3.13-slim
ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && useradd --system app
COPY backend .
COPY --from=catalog /app/courses.json ./courses.json
USER app
EXPOSE 8000
CMD ["sh", "-ec", "python manage.py migrate --noinput && python manage.py import_courses courses.json && exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 2 --access-logfile -"]
