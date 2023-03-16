#!/bin/bash

DEPLOYMENT_USER=ubuntu
DEPLOYMENT_HOST="testing.govstack.global"
DEPLOYMENT_DIR="/opt/testing-webapp"

SSH="${DEPLOYMENT_USER}@${DEPLOYMENT_HOST}"

cd "$(dirname "$0")"

# Update the git repository on the deployment host
ssh "${SSH}" "git --git-dir ${DEPLOYMENT_DIR}/.git --work-tree ${DEPLOYMENT_DIR} reset --hard origin/main"
ssh "${SSH}" "git --git-dir ${DEPLOYMENT_DIR}/.git --work-tree ${DEPLOYMENT_DIR} pull origin main"

# Start the app
ssh "${SSH}" "cat ${DEPLOYMENT_DIR}/deployment/run-prod.sh"

