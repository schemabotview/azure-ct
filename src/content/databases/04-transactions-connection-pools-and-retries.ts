import type { Section } from '../types'

// Ch7 §4. Reference: Azure SQL transactions and connection resiliency; Microsoft Entra authentication for Azure SQL; connection pooling.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Pool and connection figures in the scene are hypothetical; the real limit depends on the service and tier.
export const transactionsConnectionPoolsAndRetries: Section = {
  id: 'transactions-connection-pools-and-retries',
  title: 'Transactions, connection pools, authentication and retries',
  scene: 'transactions',
  focus: 'sql',
  slide: `## Using the database correctly

### Transactions
- A transaction is **all or nothing**
- The order, its items and the stock change **together**
- Guard with a condition: **qty >= 2**
- Keep transactions **short**

### Connection pools
- Each app instance holds a **pool** of connections
- Servers have a **maximum**
- **Instances x pool size** can exceed it when you scale out

### Authentication
- Prefer **Entra authentication** with a managed identity

### Retries
- Retry **transient** errors with **backoff**
- Retry the **whole transaction**, never half
- Make the operation **idempotent**`,
  narration:
    "Choosing a database is only half the job. Using it correctly is the other half. The SQL in the card places one order as a single transaction. It inserts the order, inserts its line item, and reduces the stock, and then commits. A transaction is all or nothing: if any step fails, none of them take effect. The condition on the stock update protects against selling something we do not have. Now look at the second table, which is a hypothetical trace of a classic failure. Each app instance keeps a pool of connections. With three instances and a pool of twenty, that is sixty connections, comfortably under the server's limit. Scale out to twelve instances and the same setting means two hundred and forty, and the server starts refusing connections. So the pool size must be chosen with scale-out in mind. For authentication, prefer Entra authentication with a managed identity over a password. Finally, retries. Transient errors happen, so retry them with backoff, but retry the whole transaction, never half of one, and make the operation idempotent, so a repeat does no harm. Next: availability and the difference between a replica and a backup.",
}
