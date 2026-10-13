import type { Scene } from '@graphlearning/flow'

// Ch8 §7 — Event Hubs is a partitioned log. Ordering holds only within a partition. Each consumer
// group has its own position (checkpoint). Lag figures are illustrative.
export const eventHubs: Scene = {
  id: 'ch08-event-hubs',
  title: 'Partitions, consumer groups and checkpoints',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    { id: 'producers', label: 'Order service', sub: 'sends events with a key', pattern: 'user', icon: 'appservice' },
    {
      id: 'hub',
      label: 'Event hub: orders',
      sub: 'a partitioned log',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'p0', label: 'Partition 0', sub: 'ordered', pattern: 'storage', icon: 'eventhubs' },
        { id: 'p1', label: 'Partition 1', sub: 'ordered', pattern: 'storage', icon: 'eventhubs' },
        { id: 'p2', label: 'Partition 2', sub: 'ordered', pattern: 'storage', icon: 'eventhubs' },
        { id: 'p3', label: 'Partition 3', sub: 'ordered', pattern: 'storage', icon: 'eventhubs' },
      ],
    },
    {
      id: 'lag',
      kind: 'table',
      label: 'Each consumer group keeps its own place',
      headers: ['Consumer group', 'Checkpoint', 'Newest event', 'Lag'],
      values: [
        ['analytics', 'offset 9,400', 'offset 9,500', '100 events'],
        ['alerts', 'offset 9,498', 'offset 9,500', '2 events'],
      ],
    },
  ],
  edges: [
    { source: 'producers', target: 'hub', label: 'key picks the partition' },
    { source: 'hub', target: 'lag', label: 'read by' },
  ],
}
