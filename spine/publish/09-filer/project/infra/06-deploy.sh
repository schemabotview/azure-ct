#!/usr/bin/env bash
# Deploy one environment from the build in out/: first what-if, which
# changes nothing, then the deployment, named after the commit it came from.
set -euo pipefail
ENV=${1:?usage: 06-deploy.sh dev|prod}
NAME="risk-$ENV-${GITHUB_SHA:0:7}"
(cd out && sha256sum --check --quiet SHA256SUMS)

az deployment sub what-if --location uksouth --name "$NAME" \
  --template-file out/main.json --parameters "out/$ENV.parameters.json"

az deployment sub create --location uksouth --name "$NAME" \
  --template-file out/main.json --parameters "out/$ENV.parameters.json"
