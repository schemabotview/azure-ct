#!/usr/bin/env bash
# Release the API: deploy to the staging slot, let it warm up and pass its
# health check there, then swap staging into production. To roll back, swap
# again: the previous release is now in staging, still warm.
set -euo pipefail
G=rg-risk-prod-data
APP=app-wg-exposure-prod

(cd app && zip -qr ../release.zip .)
az webapp deploy -g $G -n $APP --slot staging \
  --src-path release.zip --type zip
az webapp show -g $G -n $APP --slot staging --query state -o tsv

az webapp deployment slot swap -g $G -n $APP \
  --slot staging --target-slot production
