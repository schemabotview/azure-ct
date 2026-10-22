import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { streamTree } from './tree'
import code from '../../../spine/stream/04-checkpoints/project/tools/intraday_reader.py?raw'
import session from '../../../spine/stream/04-checkpoints/session.txt?raw'

// A consumer group is an independent view of a hub: each group keeps its own position. The SDK's
// event processor balances a hub's partitions across a group's readers and stores ownership and
// checkpoints (offset and sequence number per partition) in a blob container; a restarted reader
// carries on from its checkpoint. Checkpointing after handling an event gives at-least-once
// processing: an event handled but not checkpointed is read again. Event Hubs (emulated) and the
// checkpoint store (Azurite) are emulators.
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-processor-balance-partition-load
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-features#checkpointing
export const checkpoints: Scene = ideFrame(
  'stream-checkpoints',
  'risk-on-azure',
  streamTree('04', 'tools/intraday_reader.py', ['tools/intraday_reader.py', 'tools/deal_event.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies', 'templates'], ['tools']),
  { file: 'tools/intraday_reader.py', code, show: [[15, 19], [23, 29], [38, 39]], highlight: [16, 18, 28, 39], pattern: 'network', terminal: session },
  {
    id: 'checkpoints-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'groups',
        kind: 'table',
        label: 'Readers of deal-events',
        headers: ['consumer group', 'reads for'],
        values: [
          ['exposure-intraday', 'the intraday exposure'],
          ['$Default', 'nobody: left unused'],
          ['Capture (next)', 'needs no group'],
        ],
      },
      {
        id: 'checkpoint-rules',
        kind: 'list',
        icon: 'history',
        label: 'Checkpoints',
        pattern: 'network',
        items: [
          'Kept per group and partition, in blob storage',
          'Written after an event is handled',
          'A restart carries on from the last one',
          'A crash in between: that event comes again',
          'So handling must be safe to repeat',
        ],
      },
    ],
  },
)
