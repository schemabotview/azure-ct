#!/usr/bin/env bash
# Move TradeBook from the bank's PostgreSQL to psql-wg-tradebook-prod with the
# flexible server's own migration service, online: a full copy first, then
# every change replicated (logical replication) until the cutover.
set -euo pipefail
G=rg-risk-prod-data
S=psql-wg-tradebook-prod
M=tradebook-2026-11

az postgres flexible-server migration create -g $G -s $S -n $M \
  --migration-mode Online --properties infra/migration-tradebook.json
az postgres flexible-server migration show -g $G -s $S -n $M \
  --query "properties.currentStatus.state"

# When the copy has caught up, reconciled, and the business agrees a moment:
# TradeBook's application stops writing, then
az postgres flexible-server migration update -g $G -s $S -n $M --cutover
