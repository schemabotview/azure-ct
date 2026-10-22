#!/usr/bin/env bash
# The lake on a private address, then its public endpoint switched off.
set -euo pipefail
RG=rg-risk-prod-net
LAKE=$(az storage account show -n stwgriskprod -g rg-risk-prod-data \
  --query id -o tsv)
for svc in blob dfs; do
  az network private-endpoint create --name "pe-stwgriskprod-$svc" -g $RG \
    --vnet-name vnet-risk-prod-uks --subnet snet-pe \
    --private-connection-resource-id "$LAKE" --group-id $svc \
    --connection-name "stwgriskprod-$svc"
  az network private-endpoint dns-zone-group create -g $RG \
    --endpoint-name "pe-stwgriskprod-$svc" --name default \
    --private-dns-zone "privatelink.$svc.core.windows.net" --zone-name $svc
done
az storage account update -n stwgriskprod -g rg-risk-prod-data \
  --public-network-access Disabled
