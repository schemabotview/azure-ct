import type { Section } from '../types'

// Ch7 §7. Reference: Cosmos DB consistency levels; transactional batch; optimistic concurrency; multi-region writes and conflict resolution.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm that Session is the default level, the availability and latency characteristics per level, and the scope of transactional batches.
export const cosmosDbConsistencyAndTransactions: Section = {
  id: 'cosmos-db-consistency-and-transactions',
  title: 'Cosmos DB consistency, concurrency and multi-region trade-offs',
  scene: 'cosmos-consistency',
  focus: 'batch',
  slide: `## Choosing how fresh a read is

### Five consistency levels
- From **Strong** to **Eventual**
- Stronger means **higher latency** and less availability across regions
- **Session** is the default: you see **your own writes**
- Pick the **weakest level** that meets the requirement

### Atomic work
- A **transactional batch** is atomic within **one logical partition**
- There is **no cross-partition** transaction

### Concurrency
- Use the item's **ETag** for optimistic concurrency

### Several regions
- **Multi-region writes** can produce **conflicts**
- You need a **conflict-resolution policy**
- Choose it **per workload**, not globally`,
  narration:
    "A distributed database makes you choose how fresh a read must be, and Cosmos DB offers five consistency levels. Strong guarantees that a read sees the latest write, at the highest latency. Eventual might return any older state, at the lowest cost. Between them sit bounded staleness, session, and consistent prefix. Session is the default, and it guarantees that a client sees its own writes, which fits most applications. The trade-off is straightforward: stronger consistency costs latency, and across regions it also costs availability. Now the scope of atomic work, which people often overestimate. A transactional batch is atomic, but only within one logical partition. There is no transaction across partitions, so a design that needs cross-partition atomicity needs another approach. For concurrent writers, use the item's ETag, just as we did with blobs. Finally, if you accept writes in several regions, two regions can modify the same item at once, and you need a conflict-resolution policy. Choose these settings per workload rather than once for everything. Our last data topic is the cache that sits in front of it all.",
}
