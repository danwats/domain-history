# Domain History

![Domain History Record Scanner](assets/domain_history.png)

Collects DNS records that can be analysed and reviewed over time. Uses [HarvesterPHP](https://github.com/danwats/HarvesterPHP) for the collection of records and stores them into a database.

This is in early alpha. A lot may change throughout.

Here is a list of what works:

Frontend:
- Search domains
- go through records and types with pagination

Backend:
- add domain in for collection
- schedule domain scanning, will add a job, and will reschedule itself for scan (partial working)

- [**Installation**](#installation)
    - [Dev](#dev)
    - [Production](#production)

- [**Usage**](#Usage)
    - [Scan domain](#scan-domain)

## Installation

### Dev

```
docker compose build
docker compose up -d
docker compose exec php-cli php artisan key:generate
# run this again to get php-apache running
docker compose up -d
```

### Production
TBC


## Usage
### Scan Domain
Run the following to scan a domain
```
docker compose exec php-cli php artisan app:record-collector <domain>
```

TBC
