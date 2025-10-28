#!/bin/bash

set -e

php artisan migrate:status || true
php artisan migrate --force
php artisan migrate:status
php artisan cache:setup || true

while true; do
    sleep 1
done

