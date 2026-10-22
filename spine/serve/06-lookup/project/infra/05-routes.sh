#!/usr/bin/env bash
# Everything bound for the internet leaves through the hub's firewall.
set -euo pipefail
RG=rg-risk-prod-net
az network route-table create --name rt-risk-prod-spoke -g $RG \
  --disable-bgp-route-propagation false
az network route-table route create --route-table-name rt-risk-prod-spoke \
  -g $RG --name to-firewall --address-prefix 0.0.0.0/0 \
  --next-hop-type VirtualAppliance --next-hop-ip-address 10.100.0.68
for s in snet-app snet-shir snet-pe; do
  az network vnet subnet update --vnet-name vnet-risk-prod-uks -g $RG \
    --name $s --route-table rt-risk-prod-spoke
done
