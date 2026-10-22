#!/usr/bin/env bash
# Deploy one environment from its parameter file: first what-if, which
# changes nothing, then the deployment. The pipeline runs this.
set -euo pipefail
ENV=${1:?usage: 06-deploy.sh dev|prod}

az deployment sub what-if --location uksouth \
  --name "risk-$ENV" --parameters "templates/$ENV.bicepparam"

az deployment sub create --location uksouth \
  --name "risk-$ENV" --parameters "templates/$ENV.bicepparam"
