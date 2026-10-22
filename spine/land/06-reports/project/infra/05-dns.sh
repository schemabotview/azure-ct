#!/usr/bin/env bash
# Private DNS zones for the private endpoints, linked to the spoke and hub
# (the bank's DNS forwards to the hub's resolver, so on-premises sees them).
set -euo pipefail
RG=rg-risk-prod-net
for zone in privatelink.blob.core.windows.net privatelink.dfs.core.windows.net \
            privatelink.vaultcore.azure.net privatelink.servicebus.windows.net \
            privatelink.postgres.database.azure.com; do
  az network private-dns zone create -g $RG --name $zone
  for vnet in vnet-risk-prod-uks vnet-hub-uks; do
    az network private-dns link vnet create -g $RG --zone-name $zone \
      --name "link-$vnet" --virtual-network $vnet --registration-enabled false
  done
done
