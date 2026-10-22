#!/usr/bin/env bash
# Spoke to hub: the spoke uses the hub's ExpressRoute gateway to reach the
# bank. Peering is not transitive: spokes reach each other only via the hub.
set -euo pipefail
HUB=$(az network vnet show -n vnet-hub-uks -g rg-hub-net \
  --subscription platform-connectivity --query id -o tsv)
SPOKE=$(az network vnet show -n vnet-risk-prod-uks -g rg-risk-prod-net \
  --query id -o tsv)
az network vnet peering create --name spoke-to-hub -g rg-risk-prod-net \
  --vnet-name vnet-risk-prod-uks --remote-vnet "$HUB" \
  --allow-vnet-access --allow-forwarded-traffic --use-remote-gateways
az network vnet peering create --name hub-to-risk-prod -g rg-hub-net \
  --subscription platform-connectivity --vnet-name vnet-hub-uks \
  --remote-vnet "$SPOKE" --allow-vnet-access --allow-gateway-transit
