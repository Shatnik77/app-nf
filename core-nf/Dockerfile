FROM node:22.19.0 as builder

WORKDIR /app

COPY core-platform-manifest-0.0.1.tgz .
COPY package.json .
COPY package-lock.json .

COPY package.json package-lock.json ./ 

RUN npm ci

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine-slim

USER root

RUN apk upgrade --no-cache

# clean default content
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/apps/shell/browser /usr/share/nginx/html/
COPY ./nginx /etc/nginx

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
