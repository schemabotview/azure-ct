#!/usr/bin/env bash
# Remove what 01-lake.sh made, newest first. Deleting the group deletes all
# that is in it.
set -euo pipefail
az storage container delete --name landing \
  --account-name stwgriskdev --auth-mode login
az group delete --name rg-risk-dev-data --yes
# check: nothing tagged for the platform is left
az group list --tag app=risk-platform --query "[].name" -o tsv
