import type { Scene } from '@graphlearning/flow'

// Ch3 §5 — scale UP changes the instance size; scale OUT adds instances. Health check only helps when
// there is another instance to send traffic to. Autoscale rules need a qualifying tier.
export const healthScale: Scene = {
  id: 'ch03-health-scale',
  title: 'Scale up, scale out, and health',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'health',
      kind: 'code',
      filename: 'app.py',
      label: `@app.get("/healthz")
def healthz():
    return {"status": "ok"}   # cheap and fast`,
    },
    {
      id: 'up',
      label: 'Scale up',
      sub: 'a bigger instance',
      pattern: 'warn',
      children: [{ id: 'big', label: 'One larger instance', sub: 'more CPU and memory', pattern: 'warn', icon: 'server' }],
    },
    {
      id: 'out',
      label: 'Scale out',
      sub: 'more instances',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'i1', label: 'Instance 1', sub: 'healthy', pattern: 'service', icon: 'appservice' },
        { id: 'i2', label: 'Instance 2', sub: 'healthy', pattern: 'service', icon: 'appservice' },
        { id: 'i3', label: 'Instance 3', sub: 'failing, rotated out', pattern: 'warn', icon: 'ban' },
      ],
    },
    { id: 'logs', label: 'Log stream', sub: 'what each instance prints', pattern: 'network', icon: 'activitylog' },
  ],
  edges: [
    { source: 'health', target: 'out', label: 'probed on each' },
    { source: 'up', target: 'out', label: 'or' },
    { source: 'out', target: 'logs', label: 'evidence' },
  ],
}
