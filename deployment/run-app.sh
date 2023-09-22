#!/bin/bash
set -e

cd "$(dirname "$0")"

# Check if the number of arguments is correct
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [staging|prod]"
    exit 1
fi

env=$1

# Check if env is correct
case $env in
  staging|prod)
    ;;
  *)
    echo "Unknown environment: $env. Operation aborted."
    exit 1
    ;;
esac

# Do not use the override compose file, which is intended for development
# We run in prod mode, but we still build from this guild repository
docker-compose -f ../docker-compose.yml -f "../docker-compose.${env}.yml" up --build -d --force-recreate

# Clean up dangling images
docker image prune -f
