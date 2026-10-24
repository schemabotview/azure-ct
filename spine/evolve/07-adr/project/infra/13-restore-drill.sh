#!/usr/bin/env bash
# The quarterly restore drill: restore the mart to a NEW server at a point
# in time, check it, and only then decide whether anything points at it.
# A restore never overwrites the running server.
set -euo pipefail
G=rg-risk-prod-data

az postgres flexible-server restore -g $G -n psql-wg-riskmart-drill \
  --source-server psql-wg-riskmart-prod \
  --restore-time "2026-10-16T21:30:00+00:00"

# The new server has the source's settings but not its private endpoint
# or its Entra ID administrators: add them before anyone signs in.
az postgres flexible-server show -g $G -n psql-wg-riskmart-drill \
  --query "{state: state, version: version, zone: availabilityZone}"

# The drill is over: delete it, so the bank does not pay for a second mart.
az postgres flexible-server delete -g $G -n psql-wg-riskmart-drill --yes
