#!/usr/bin/env bash
# The templates now assign roles, which Contributor cannot do. Give each
# deployment identity Role Based Access Control Administrator, with a
# condition: it may assign only Key Vault Secrets User and Storage Blob Data
# Contributor (from Course 12, also AcrPull and Storage Blob Data Owner),
# never Owner or anything else.
set -euo pipefail
SECRETS_USER=4633458b-17de-408a-b874-0445c86b69e6
BLOB_CONTRIBUTOR=ba92f5b4-2d11-453d-a403-e96b0029c9fe
ACR_PULL=7f951dda-4ed3-4680-a7ca-43fe172d538d
BLOB_OWNER=b7e6dc6d-f1e8-4753-8033-0f276bb0955b
ONLY="((!(ActionMatches{'Microsoft.Authorization/roleAssignments/write'}))"
ONLY+=" OR (@Request[Microsoft.Authorization/roleAssignments:RoleDefinitionId]"
ONLY+=" ForAnyOfAnyValues:GuidEquals {$SECRETS_USER, $BLOB_CONTRIBUTOR,"
ONLY+=" $ACR_PULL, $BLOB_OWNER}))"

APP=$(az ad app list --display-name risk-deploy-prod --query "[0].appId" -o tsv)
az role assignment create --assignee "$APP" \
  --role "Role Based Access Control Administrator" \
  --scope /subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e \
  --condition "$ONLY" --condition-version 2.0
