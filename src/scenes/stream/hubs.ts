import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/stream/02-hubs/project/templates/modules/streaming.bicep?raw'
import session from '../../../spine/stream/02-hubs/session.txt?raw'

// An Event Hubs namespace holds event hubs; a hub has a fixed number of partitions; events with the
// same partition key go to the same partition, and order holds within a partition only. The Kafka
// endpoint needs Standard tier or above; throughput units set Standard capacity, and auto-inflate
// raises them up to a maximum (it never lowers them). disableLocalAuth turns off shared access keys.
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-features
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-scalability
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-auto-inflate
// source: https://learn.microsoft.com/en-us/azure/event-hubs/azure-event-hubs-apache-kafka-overview
export const hubs: Scene = mapFrame('event-hubs', [...BUILT_BY[8], 'evh'], {
  id: 'hubs-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'hubs-code', kind: 'code', filename: 'templates/modules/streaming.bicep', label: code.replace(/\n+$/, ''), show: [[11, 14], [21, 23], [28, 30]], highlight: [11, 13, 14, 22, 23, 29], pattern: 'network' },
    { id: 'hubs-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · emulated', label: session.replace(/\n+$/, '') },
    {
      id: 'hubs-words',
      kind: 'table',
      label: 'Event Hubs, word by word',
      headers: ['word', 'means', 'Kafka calls it'],
      values: [
        ['namespace', 'the service, one address', 'cluster'],
        ['event hub', 'one stream: fx-rates', 'topic'],
        ['partition', 'an ordered lane within it', 'partition'],
        ['partition key', 'picks the lane: GBPUSD', 'key'],
        ['consumer group', 'one reader’s own position', 'consumer group'],
      ],
    },
  ],
})
