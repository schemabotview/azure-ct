#!/usr/bin/env bash
# A drop token has leaked. The lake's account keys are off, so it is a
# user-delegation SAS: no stored access policy can withdraw it. Revoking
# the account's delegation keys does, and with it every such token on the
# account, so each sender asks for a new token afterwards.
set -euo pipefail
G=rg-risk-prod-data
L=stwgriskprod

az storage account revoke-delegation-keys -g $G -n $L

# What it did while it was out: the lake's own log, in the workspace.
# StorageBlobLogs | where AuthenticationType == "DelegationSas"
#   and Uri has "/landing/"

# The new token for tonight's drop: 30 minutes, create and write only.
az storage container generate-sas --account-name $L -n landing \
  --permissions cw --expiry 2026-10-16T19:30Z --as-user --auth-mode login
