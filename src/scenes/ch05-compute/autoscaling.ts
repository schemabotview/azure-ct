import type { Scene } from '@graphlearning/flow'

// Ch5 §7 — scaling is a delay chain, not an instant. A replacement instance has no local state, so
// sessions must live elsewhere; shutdown must be graceful or in-flight requests are cut.
export const autoscaling: Scene = {
  id: 'ch05-autoscaling',
  title: 'Why scaling is never instant',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'timeline',
      label: 'A traffic spike, step by step',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't1', label: 'Load rises', sub: 'latency climbs', pattern: 'warn', icon: 'gauge' },
        { id: 't2', label: 'Metric breaches', sub: 'after a window', pattern: 'network', icon: 'bell' },
        { id: 't3', label: 'Instance starts', sub: 'image pull, boot', pattern: 'service', icon: 'power' },
        { id: 't4', label: 'Warm and ready', sub: 'now takes traffic', pattern: 'storage', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'shutdown',
      kind: 'code',
      filename: 'app.py',
      label: `import signal

def stop(*_):
    server.shutdown()   # finish in-flight work

signal.signal(signal.SIGTERM, stop)`,
    },
    {
      id: 'state',
      label: 'Where a session lives',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'local', label: 'In instance memory', sub: 'lost on replacement', pattern: 'warn', icon: 'memory' },
        { id: 'shared', label: 'In a shared store', sub: 'survives replacement', pattern: 'storage', icon: 'database' },
      ],
    },
  ],
  edges: [
    { source: 'timeline', target: 'shutdown', label: 'scale-in must be graceful' },
    { source: 'shutdown', target: 'state', label: 'and stateless' },
  ],
}
