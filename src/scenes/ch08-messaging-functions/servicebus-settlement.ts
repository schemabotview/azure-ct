import type { Scene } from '@graphlearning/flow'

// Ch8 §5 — peek-lock: the message is hidden under a lock until you settle it. If the lock expires
// after the work was done but before Complete, the message comes back: a duplicate. The timings are
// illustrative.
export const servicebusSettlement: Scene = {
  id: 'ch08-servicebus-settlement',
  title: 'A lock that expires after the work',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'receiver',
      kind: 'code',
      filename: 'receiver.py',
      label: `with client.get_queue_receiver("orders") as receiver:
    for msg in receiver:
        process(msg)                     # slow database work
        receiver.complete_message(msg)   # settle AFTER the work`,
    },
    {
      id: 'timeline',
      kind: 'table',
      label: 'Lock duration 60 s, work takes 75 s',
      headers: ['Time', 'Event', 'Result'],
      values: [
        ['0 s', 'message received, locked', 'hidden from others'],
        ['40 s', 'database update succeeds', 'work is done'],
        ['60 s', 'lock expires, no Complete yet', 'message visible again'],
        ['75 s', 'Complete fails: lock lost', 'second delivery happens'],
      ],
    },
    {
      id: 'settle',
      label: 'Settlement outcomes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'complete', label: 'Complete', sub: 'done, remove', pattern: 'service', icon: 'circlecheck' },
        { id: 'abandon', label: 'Abandon', sub: 'retry soon', pattern: 'network', icon: 'repeat' },
        { id: 'dead', label: 'Dead-letter', sub: 'park it', pattern: 'warn', icon: 'ban' },
        { id: 'defer', label: 'Defer', sub: 'fetch later', pattern: 'storage', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'receiver', target: 'timeline', label: 'when slow' },
    { source: 'timeline', target: 'settle', label: 'settled as' },
  ],
}
