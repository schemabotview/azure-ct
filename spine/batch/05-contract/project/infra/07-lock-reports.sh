#!/usr/bin/env bash
# Lock the reports' retention policy, once it has been tested unlocked. A
# locked policy can be extended, never shortened or removed, and the
# container cannot be deleted while it holds a report. There is no undo.
set -euo pipefail
ETAG=$(az storage container immutability-policy show \
  --account-name stwgreportsprod -g rg-risk-prod-data \
  --container-name large-exposures --query etag -o tsv)
az storage container immutability-policy lock \
  --account-name stwgreportsprod -g rg-risk-prod-data \
  --container-name large-exposures --if-match "$ETAG"
