#!/usr/bin/env bash
# The development lake: a tagged group, a storage account, a container.
set -euo pipefail
TAGS="app=risk-platform env=dev owner=priya"

# Resource Manager (the control plane): needs az login
az group create --name rg-risk-dev-data --location uksouth --tags $TAGS
az storage account create --name stwgriskdev -g rg-risk-dev-data \
  --sku Standard_LRS --kind StorageV2 --hns true \
  --min-tls-version TLS1_2 --allow-blob-public-access false --tags $TAGS

# The account's own endpoint (the data plane)
az storage container create --name landing \
  --account-name stwgriskdev --auth-mode login
