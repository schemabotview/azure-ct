#!/usr/bin/env bash
# One deployment identity per environment, and no secret in either: Entra ID
# trusts GitHub's token for one repository's environment instead.
set -euo pipefail
REPO=woodgrove-example/risk-on-azure
declare -A SUB=([dev]=bbbb1b1b-cc2c-dd3d-ee4e-ffffff5f5f5f
                [prod]=aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e)

for ENV in dev prod; do
  APP=$(az ad app create --display-name "risk-deploy-$ENV" \
    --query appId -o tsv)
  az ad sp create --id "$APP"
  az ad app federated-credential create --id "$APP" --parameters "{
    \"name\": \"github-$ENV\",
    \"issuer\": \"https://token.actions.githubusercontent.com\",
    \"subject\": \"repo:$REPO:environment:$ENV\",
    \"audiences\": [\"api://AzureADTokenExchange\"]}"
  az role assignment create --assignee "$APP" --role Contributor \
    --scope "/subscriptions/${SUB[$ENV]}"
done
