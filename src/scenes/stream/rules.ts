import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { streamTree } from './tree'
import code from '../../../spine/stream/08-rules/project/tools/stream_rules.py?raw'
import session from '../../../spine/stream/08-rules/session.txt?raw'

// Standard tier: a throughput unit allows ingress up to 1 MB/s or 1,000 events/s and egress up to
// 2 MB/s or 4,096 events/s; over it, requests are throttled (ServerBusy) and senders retry with
// backoff; auto-inflate raises units up to a maximum. Order holds within a partition only. Event
// time is when it happened; enqueued time is when the hub accepted it; a reader that counts by event
// time must wait a while for late arrivals. Plain Python model, run locally.
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-scalability
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-quotas
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-features#event-ordering
export const rules: Scene = ideFrame(
  'stream-rules',
  'risk-on-azure',
  streamTree('08', 'tools/stream_rules.py', ['tools/stream_rules.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies', 'templates'], ['tools']),
  { file: 'tools/stream_rules.py', code, show: [[8, 11], [16, 20], [24, 28]], highlight: [9, 19, 26], pattern: 'network', terminal: session, emulated: false },
  {
    id: 'rules-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'limits',
        kind: 'table',
        label: 'One Standard throughput unit',
        headers: ['', 'up to'],
        values: [
          ['in', '1 MB/s or 1,000 events/s'],
          ['out', '2 MB/s or 4,096 events/s'],
          ['over it', 'ServerBusy: retry, back off'],
          ['auto-inflate', 'up to 4 units, never down'],
        ],
      },
      {
        id: 'stream-truths',
        kind: 'list',
        icon: 'clock',
        label: 'What a stream does not promise',
        pattern: 'warn',
        items: [
          'Order across partitions: none',
          'Arrival in the order things happened',
          'Each event exactly once',
          'So: key by deal, count by event time',
          'And drop repeats by event id',
        ],
      },
    ],
  },
)
