#!/usr/bin/env bash
# The four groups that touch risk data, in Microsoft Entra ID.
set -euo pipefail
for group in "Risk Data Engineers" "Risk Analysts" "Credit Officers" \
             "Risk Auditors"; do
  az ad group create --display-name "$group" \
    --mail-nickname "$(echo "$group" | tr 'A-Z ' 'a-z-')"
done

# People arrive from the bank's directory; priya joins her group
PRIYA=$(az ad user show --id priya@woodgrovebank.example --query id -o tsv)
az ad group member add --group "Risk Data Engineers" --member-id "$PRIYA"
