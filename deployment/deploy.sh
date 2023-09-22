#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: ./deploy.sh [staging|prod]"
    exit 1
fi

DEPLOYMENT_DIR="/opt/testing-webapp"

DEPLOY_ENV=$1

if [ "${DEPLOY_ENV}" == "staging" ]; then
  DEPLOYMENT_USER="ubuntu"
  DEPLOYMENT_HOST="staging.testing.govstack.global"
elif [ "${DEPLOY_ENV}" == "prod" ]; then
  DEPLOYMENT_USER="ubuntu"
  DEPLOYMENT_HOST="testing.govstack.global"
else
  echo "Unknown deployment environment, operation aborted."
  exit 1
fi

SSH="${DEPLOYMENT_USER}@${DEPLOYMENT_HOST}"

cd "$(dirname "$0")"

# Update the git repository on the deployment host
ssh "${SSH}" "git --git-dir ${DEPLOYMENT_DIR}/.git --work-tree ${DEPLOYMENT_DIR} reset --hard origin/main"
ssh "${SSH}" "git --git-dir ${DEPLOYMENT_DIR}/.git --work-tree ${DEPLOYMENT_DIR} pull origin main"

# Start the app
ssh "${SSH}" "${DEPLOYMENT_DIR}/deployment/run-app.sh" "$DEPLOY_ENV"
