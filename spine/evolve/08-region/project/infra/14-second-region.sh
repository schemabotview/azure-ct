#!/usr/bin/env bash
# A second Region, in steps that can each be undone until the last one.
set -euo pipefail
G=rg-risk-prod-data
DR=rg-risk-dr-data

# 1. The lake gets a copy in UK West: ZRS becomes GZRS (a conversion runs
#    in the background; undo: back to ZRS).
az storage account update -g $G -n stwgriskprod --sku Standard_GZRS

# 2. Rehearse the mart in UK West from its geo-redundant backups, on a new
#    server (undo: delete it).
az group create -n $DR -l ukwest
az postgres flexible-server geo-restore -g $DR -n psql-wg-riskmart-dr \
  --source-server "$(az postgres flexible-server show -g $G \
  -n psql-wg-riskmart-prod --query id -o tsv)" -l ukwest

# 3. Rehearse one night there: the factory's nightly, against the restored
#    mart and the lake's secondary (read-only until a failover).

# 4. Only for a real loss: fail the lake over. After this the account is
#    LRS in UK West, and coming back is a second migration.
# az storage account failover -g $G -n stwgriskprod
