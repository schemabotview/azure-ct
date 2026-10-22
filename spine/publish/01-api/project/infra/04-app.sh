#!/usr/bin/env bash
# The exposure API's registration: an application object (the definition)
# and a service principal (its instance in Woodgrove's tenant).
set -euo pipefail
APP_ID=$(az ad app create --display-name "Exposure API" \
  --identifier-uris api://exposure-api --sign-in-audience AzureADMyOrg \
  --query appId -o tsv)
az ad sp create --id "$APP_ID"
