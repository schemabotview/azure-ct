import type { Scene } from '@graphlearning/flow'

// Ch6 §4 — optimistic concurrency with ETags: the second writer's If-Match fails with 412. Blob
// operations on one blob are strongly consistent; there are no multi-blob transactions.
export const concurrency: Scene = {
  id: 'ch06-concurrency',
  title: 'Two writers, one blob',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'order-1042.json, three steps',
      headers: ['Step', 'Writer A', 'Writer B', 'ETag'],
      values: [
        ['1', 'reads', 'reads', 'v1'],
        ['2', 'writes If-Match v1: ok', '', 'v2'],
        ['3', '', 'writes If-Match v1: 412', 'v2'],
      ],
    },
    {
      id: 'request',
      kind: 'code',
      filename: 'writer B (trimmed)',
      label: `PUT /receipts/order-1042.json
If-Match: "0x8DC1A2B3C4D5E6F"

HTTP/1.1 412 Precondition Failed`,
    },
    {
      id: 'tools',
      label: 'Tools for concurrent writers',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'etag', label: 'ETag', sub: 'detects a change', pattern: 'service', icon: 'hash' },
        { id: 'lease', label: 'Lease', sub: 'a timed exclusive lock', pattern: 'warn', icon: 'lock' },
        { id: 'single', label: 'One blob only', sub: 'no multi-blob transaction', pattern: 'network', icon: 'file' },
      ],
    },
  ],
  edges: [
    { source: 'timeline', target: 'request', label: 'step 3 on the wire' },
    { source: 'request', target: 'tools', label: 'handled with' },
  ],
}
