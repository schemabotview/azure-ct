import type { Scene } from '@graphlearning/flow'

// Ch7 §6 — Cosmos DB for NoSQL as the concrete core API. A container is split into logical
// partitions by the partition key; throughput is spread across them, so a skewed key makes a hot
// partition. Items and keys are synthetic.
export const cosmosPartitions: Scene = {
  id: 'cosmos-partitions',
  title: 'Items, partition keys and hot partitions',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'item',
      kind: 'code',
      filename: 'orders container (item)',
      label: `{
  "id": "1042",
  "customerId": "c-7",        // partition key: /customerId
  "total": 36.0,
  "items": [{ "sku": "BTL-01", "qty": 2 }]
}`,
    },
    {
      id: 'keys',
      kind: 'table',
      label: 'Candidate partition keys',
      headers: ['Key', 'Spread', 'Risk'],
      values: [
        ['/customerId', 'many values, even', 'low'],
        ['/orderDate', 'today is one value', 'hot partition'],
        ['/country', 'a few big values', 'skew'],
      ],
    },
    {
      id: 'throughput',
      label: 'Throughput is shared out',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p1', label: 'Partition A', sub: 'calm', pattern: 'service', icon: 'database' },
        { id: 'p2', label: 'Partition B', sub: 'calm', pattern: 'service', icon: 'database' },
        { id: 'p3', label: 'Partition C', sub: 'hot, throttled', pattern: 'warn', icon: 'bell' },
      ],
    },
  ],
  edges: [
    { source: 'item', target: 'keys', label: 'the key decides' },
    { source: 'keys', target: 'throughput', label: 'because' },
  ],
}
