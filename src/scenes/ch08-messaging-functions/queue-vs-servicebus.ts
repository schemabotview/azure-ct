import type { Scene } from '@graphlearning/flow'

// Ch8 §4 — Queue Storage is simple and cheap; Service Bus adds enterprise messaging features. Limits
// vary by tier and change; compare capabilities, and look up sizes at authoring time.
export const queueVsServicebus: Scene = {
  id: 'ch08-queue-vs-servicebus',
  title: 'Queue Storage versus Service Bus',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Capabilities, side by side',
      headers: ['Capability', 'Queue Storage', 'Service Bus'],
      values: [
        ['Ordering', 'not guaranteed', 'sessions: FIFO per key'],
        ['Dead-lettering', 'poison queue you manage', 'built in'],
        ['Duplicate detection', 'none', 'optional'],
        ['Publish/subscribe', 'no', 'topics and subscriptions'],
        ['Transactions', 'no', 'yes, within the namespace'],
      ],
    },
    {
      id: 'pick',
      label: 'Pick by need',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'simple', label: 'Queue Storage', sub: 'simple, cheap, huge', pattern: 'storage', icon: 'queue' },
        { id: 'rich', label: 'Service Bus', sub: 'rich delivery rules', pattern: 'service', icon: 'servicebus' },
      ],
    },
  ],
  edges: [{ source: 'compare', target: 'pick', label: 'then' }],
}
