import type { Scene } from '@graphlearning/flow'

// Ch8 §6 — Event Grid distributes discrete events from a source to subscribers with filtering. It
// delivers at least once, retries with backoff, and can dead-letter. The event is trimmed.
export const eventGrid: Scene = {
  id: 'ch08-event-grid',
  title: 'Events from a source to subscribers',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'event',
      kind: 'code',
      filename: 'a blob-created event (trimmed)',
      label: `{
  "type": "Microsoft.Storage.BlobCreated",
  "subject": "/blobServices/default/containers/receipts/blobs/order-1042.json",
  "eventTime": "2026-10-13T09:15:02Z"
}`,
    },
    { id: 'source', label: 'Storage account', sub: 'the event source', pattern: 'storage', icon: 'storage' },
    { id: 'topic', label: 'Event Grid', sub: 'routes by filter', pattern: 'network', icon: 'eventgrid' },
    {
      id: 'subs',
      label: 'Subscriptions',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 's-fn', label: 'Function', sub: 'process the receipt', pattern: 'service', icon: 'functions' },
        { id: 's-queue', label: 'Queue', sub: 'buffer the work', pattern: 'storage', icon: 'queue' },
        { id: 's-hook', label: 'Webhook', sub: 'notify a partner', pattern: 'network', icon: 'globe' },
      ],
    },
    { id: 'dlq', label: 'Dead-letter store', sub: 'events that never delivered', pattern: 'warn', icon: 'trash' },
  ],
  edges: [
    { source: 'source', target: 'topic', label: 'emits' },
    { source: 'topic', target: 'subs', label: 'delivers, retries' },
    { source: 'subs', target: 'dlq', label: 'after giving up', dashed: true },
  ],
}
