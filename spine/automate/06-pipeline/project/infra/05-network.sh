#!/usr/bin/env bash
# The production spoke: one virtual network, five subnets, all private (no
# default outbound access: anything that goes out takes an explicit route).
set -euo pipefail
RG=rg-risk-prod-net
VNET=vnet-risk-prod-uks
az network vnet create --name $VNET -g $RG --address-prefixes 10.110.0.0/20

subnet() {  # name, prefix, then any extra options
  az network vnet subnet create --vnet-name $VNET -g $RG --name "$1" \
    --address-prefixes "$2" --default-outbound-access false "${@:3}"
}
subnet snet-dbx-host 10.110.0.0/26 \
  --delegations Microsoft.Databricks/workspaces
subnet snet-dbx-container 10.110.0.64/26 \
  --delegations Microsoft.Databricks/workspaces
subnet snet-pe 10.110.1.0/24
subnet snet-app 10.110.2.0/26 --delegations Microsoft.Web/serverFarms
subnet snet-shir 10.110.3.0/27
