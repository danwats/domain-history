FROM php:8.4-apache AS base

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
    npm \
    vim

RUN a2enmod rewrite

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

FROM base AS dev

ARG uid

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -m -G www-data,root -u $uid -d /home/appuser appuser
RUN mkdir -p /home/appuser/.composer && \
chown -R appuser:appuser /home/appuser

USER $uid

FROM base AS prod

WORKDIR /var/www

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
RUN rm -rf /var/www/public/hot

RUN chmod -R ugo+rwx ./bootstrap/
RUN chmod -R ugo+rwx ./storage/

COPY docker/php-apache/000-default.conf /etc/apache2/sites-available/000-default.conf

RUN npm install && npm run build
