import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/stream/05-capture/project/templates/modules/streaming.bicep?raw'

// Event Hubs Capture writes a hub's events to Blob Storage or Data Lake Storage as Avro files, per
// partition, by a time window or a size, whichever comes first, with no consumer to run; it can
// skip empty windows, and can authenticate with the namespace's managed identity. It is included in
// Premium and Dedicated, and billed per throughput unit in Standard. The emulator has no Capture.
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-capture-overview
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-capture-managed-identity
export const capture: Scene = mapFrame('stream-capture', [...BUILT_BY[8], 'evh'], {
  id: 'capture-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'capture-code', kind: 'code', filename: 'templates/modules/streaming.bicep', label: code.replace(/\n+$/, ''), show: [[15, 27], [45, 45], [82, 82], [86, 86]], highlight: [16, 17, 18, 23, 26, 45, 86], pattern: 'network' },
    {
      id: 'capture-files',
      kind: 'table',
      label: 'What Capture writes into bronze',
      headers: ['part of the path', 'example'],
      values: [
        ['namespace / hub', 'evh-wg-risk-prod/deal-events'],
        ['partition', '2'],
        ['window, to the second', '2026/10/13/14/25/00'],
        ['file', 'Avro: body, offset, enqueued time'],
      ],
    },
    {
      id: 'capture-why',
      kind: 'list',
      icon: 'adls',
      label: 'Why capture as well as read',
      pattern: 'storage',
      items: [
        'The hub keeps events one day; bronze keeps them',
        'Nothing to run: no reader, no checkpoints',
        'Databricks replays any day from bronze',
        'The batch reconciles against it',
      ],
    },
  ],
})
