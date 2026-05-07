#!/bin/bash
# Deploy M2B Blog ke Hostinger blog.m2b.co.id
# Usage: ./deploy.sh

set -e

REMOTE_USER="u301249154"
REMOTE_HOST="31.97.104.23"
REMOTE_PORT="65002"
REMOTE_PATH="/home/u301249154/domains/m2b.co.id/public_html/blog/"

echo "🏗  Building..."
npm run build

echo "🚀 Deploying to ${REMOTE_HOST}:${REMOTE_PATH} ..."
rsync -avz --delete \
  --exclude='admin/' \
  -e "ssh -p ${REMOTE_PORT}" \
  out/ \
  ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}

echo "✅ Deploy selesai! Blog live di https://blog.m2b.co.id"
