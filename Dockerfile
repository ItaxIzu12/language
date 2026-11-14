# --- Stufe 1: App bauen ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY src src
COPY public public
COPY *.json *.js *.ts *.html ./
ENV VITE_ACCOUNT_BACKEND=1
RUN npm run build

# --- Stufe 2: Fertige Dateien mit nginx ausliefern ---
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
