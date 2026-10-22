#!/usr/bin/env bash
# Who may reach the private endpoints: named callers in, the rest denied.
set -euo pipefail
RG=rg-risk-prod-net
NSG=nsg-snet-pe
az network nsg create --name $NSG -g $RG

rule() {  # name, priority, source, port, access
  az network nsg rule create --nsg-name $NSG -g $RG --name "$1" \
    --priority "$2" --direction Inbound --protocol "*" \
    --source-address-prefixes "$3" --destination-port-ranges "$4" \
    --access "$5"
}
rule app-to-mart 100 10.110.2.0/26 5432 Allow
rule databricks-to-pe 110 10.110.0.0/25 443 Allow
rule shir-to-lake 120 10.110.3.0/27 443 Allow
rule deny-other-vnet 4096 VirtualNetwork "*" Deny

az network vnet subnet update --vnet-name vnet-risk-prod-uks -g $RG \
  --name snet-pe --network-security-group $NSG
