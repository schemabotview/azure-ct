#!/usr/bin/env bash
# Woodgrove's hierarchy: the platform apart from the workloads that use it.
set -euo pipefail
az account management-group create --name woodgrove
for mg in platform landing-zones; do
  az account management-group create --name $mg --parent woodgrove
done
az account management-group subscription add --name platform \
  --subscription platform-connectivity
for sub in risk-prod risk-dev; do
  az account management-group subscription add --name landing-zones \
    --subscription $sub
done
