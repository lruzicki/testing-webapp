#!/bin/bash

# Check branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "${CURRENT_BRANCH}" == "main" ]; then
  DEPLOYMENT_USER="ubuntu"
  DEPLOYMENT_HOST="main.govstack.global"
  DEPLOYMENT_DIR="/opt/main-webapp"
elif [ "${CURRENT_BRANCH}" == "development" ]; then
  DEPLOYMENT_USER="ubuntu"
  DEPLOYMENT_HOST=""
  DEPLOYMENT_DIR=""
else
  echo "Unknown branch, operation aborted."
  exit 1
fi

SSH="${DEPLOYMENT_USER}@${DEPLOYMENT_HOST}"

cd "$(dirname "$0")"

# Update the git repository on the deployment host
ssh "${SSH}" "git --git-dir ${DEPLOYMENT_DIR}/.git --work-tree ${DEPLOYMENT_DIR} reset --hard origin/main"
ssh "${SSH}" "git --git-dir ${DEPLOYMENT_DIR}/.git --work-tree ${DEPLOYMENT_DIR} pull origin main"

# Start the app
ssh "${SSH}" "${DEPLOYMENT_DIR}/deployment/run-prod.sh"
