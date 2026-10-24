# ADR-001: The store behind the exposure API

Status: accepted, 2026-10-21 · Owner: priya · Revisit: when Singapore books

## Context
At 08:00 about 400 dashboards read headroom, and dealers reserve it for
deals in progress. Two reservations against one limit must never both
succeed (Course 11). Scores: evolve/score_options.py.

## Musts: an option that fails one is out
- M1 a serializable transaction across limits, exposure and reservations
- M2 a private endpoint and Microsoft Entra ID sign-in, no passwords
- M3 a standby in another availability zone of UK South
- M4 a lookup in under 100 ms at 08:00 (assumed)

## Wants: scored 1-5, times the weight
- W1 the team already runs it (weight 3)
- W2 cost a month (weight 2)
- W3 an open-source engine, portable off Azure (weight 1)

## Decision
Azure Database for PostgreSQL flexible server, zone-redundant: 28 of 30.
Rejected: Cosmos DB alone (M1: a batch is one partition of one container),
a Databricks SQL warehouse (M4: built for scans, not lookups). Azure SQL
Database passes every must and scores 13: the team runs PostgreSQL.

## Consequences
The mart is PostgreSQL 16 and TradeBook's skills carry over. Group lookups
stay in Cosmos DB. Re-decide if writes come from a second Region.
