#!/usr/bin/env bash
# A Databricks secret scope backed by kv-wg-dbx-prod: notebooks read secrets
# through it, the values stay in the vault. Run with the Databricks CLI,
# signed in to the workspace as a workspace admin.
set -euo pipefail
VAULT=$(az keyvault show -n kv-wg-dbx-prod -g rg-risk-prod-data \
  --query id -o tsv)

databricks secrets create-scope risk-kv \
  --scope-backend-type AZURE_KEYVAULT \
  --json "{\"backend_azure_keyvault\": {\"resource_id\": \"$VAULT\",
    \"dns_name\": \"https://kv-wg-dbx-prod.vault.azure.net/\"}}"

# Who may read through it: the engineers' group, and nobody else
databricks secrets put-acl risk-kv "Risk Data Engineers" READ
databricks secrets list-acls risk-kv
