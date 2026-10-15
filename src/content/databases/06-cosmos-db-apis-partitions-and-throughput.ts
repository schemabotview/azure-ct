import type { Section } from '../types'

// Ch7 §6. Reference: Azure Cosmos DB for NoSQL: partitioning, request units, indexing policy, throughput options.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the API list, throughput modes (provisioned, autoscale, serverless), and partition-size limits.
export const cosmosDbApisPartitionsAndThroughput: Section = {
  id: 'cosmos-db-apis-partitions-and-throughput',
  title: 'Cosmos DB APIs, partition keys, indexing and throughput',
  scene: 'cosmos-partitions',
  focus: 'keys',
  slide: `## Cosmos DB for NoSQL

### The model
- A **container** holds JSON **items**
- Every item has a **partition key** value
- Items with the same key form a **logical partition**

### Choosing the key
- Pick a key with **many values**, used in **most queries**
- A skewed key creates a **hot partition**
- Prefer queries that include the **partition key**

### Throughput
- Measured in **request units** per second (RU/s)
- Provisioned, **autoscale** or **serverless** options
- A hot partition is **throttled** even if the total is idle

### Indexing
- **Every property** is indexed by default
- Tune the policy to lower **write cost**`,
  narration:
    "Cosmos DB is a globally distributed document database, and we will use its NoSQL API as our concrete example. A container holds JSON items, and every item carries a value for the partition key. Items sharing a key value form a logical partition, and Azure spreads partitions across physical machines. So the partition key is the most important design choice you will make. The card shows an order item that uses the customer identifier as its key. The table compares candidates. The customer identifier has many values, spread evenly, so it is a good key. The order date is a poor key, because today's orders all share one value, so all the writes land on one partition. A country is skewed, because a few big countries dominate. Throughput is measured in request units per second and is divided across partitions. That is why a hot partition is throttled even while the container's total capacity sits idle. By default Cosmos DB indexes every property, which makes queries flexible but costs on writes, so tune the indexing policy once you know your queries. The next question is how consistent reads need to be.",
}
