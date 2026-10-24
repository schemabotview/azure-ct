#!/usr/bin/env bash
# Workload identities. A user-assigned identity lives on its own and can be
# shared; a system-assigned one is created and deleted with its resource.
set -euo pipefail
az identity create --name id-wg-exposure-prod -g rg-risk-prod-app

# The exposure API (Course 12) and the breach alert share the first
az webapp identity assign --name app-wg-exposure-prod -g rg-risk-prod-app \
  --identities id-wg-exposure-prod
# Data Factory (Course 8) and the Databricks access connector (Course 10)
# get system-assigned ones, made with them
