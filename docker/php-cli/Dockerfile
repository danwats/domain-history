FROM php:8.4-cli AS base

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    nodejs \
    npm 

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

from base as dev

ARG uid

WORKDIR /app/
RUN useradd -m -u $uid -d /home/appuser appuser
RUN mkdir -p /home/appuser/.composer && \
chown -R appuser:appuser /home/appuser

COPY ./docker/php-cli/docker-entrypoint.sh /usr/local/bin/
RUN chmod 744 /usr/local/bin/docker-entrypoint.sh

USER $uid

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

FROM base as prod

WORKDIR /app

COPY --chown=www-data:www-data ./app ./app
COPY --chown=www-data:www-data ./artisan ./artisan
COPY --chown=www-data:www-data ./bootstrap ./bootstrap
COPY --chown=www-data:www-data ./composer.json ./
COPY --chown=www-data:www-data ./composer.lock ./
COPY --chown=www-data:www-data ./config ./config
COPY --chown=www-data:www-data ./database ./database
COPY --chown=www-data:www-data ./resources ./resources
COPY --chown=www-data:www-data ./routes ./routes
COPY --chown=www-data:www-data ./storage ./storage
COPY --chown=www-data:www-data ./vendor ./vendor
COPY --chown=www-data:www-data ./package*.json ./vite.config.* ./
COPY --chown=www-data:www-data ./resources ./resources
COPY --chown=www-data:www-data ./public ./public

RUN chmod -R ugo+rwx ./bootstrap/
RUN chmod -R ugo+rwx ./storage/
