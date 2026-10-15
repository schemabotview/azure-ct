import type { Scene } from '@graphlearning/flow'

// Ch12 §5 — an ASSUMPTION-BASED monthly comparison in relative cost units, NOT prices. It assumes a
// spiky load; a steady, high-utilisation load changes the ranking. Operations time is a cost too.
export const architectureCompare: Scene = {
  id: 'architecture-compare',
  title: 'The same order API, three architectures',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'cost',
      kind: 'table',
      label: 'Monthly cost units, spiky load (illustrative)',
      headers: ['Line', 'VMs', 'App Service', 'Functions'],
      values: [
        ['Compute', '90', '120', '40'],
        ['Storage', '10', '10', '10'],
        ['Data transfer', '15', '15', '15'],
        ['Logs and monitoring', '20', '20', '25'],
        ['Backups', '10', '5', '5'],
        ['Idle capacity', '40', '30', '0'],
        ['Operations time', '80', '30', '25'],
        ['Total', '265', '230', '120'],
      ],
    },
    {
      id: 'caveats',
      label: 'What would change the answer',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'cv1', label: 'Steady heavy load', sub: 'idle capacity shrinks', pattern: 'warn', icon: 'gauge' },
        { id: 'cv2', label: 'Latency limits', sub: 'cold starts matter', pattern: 'warn', icon: 'clock' },
        { id: 'cv3', label: 'Skills and risk', sub: 'migration has a cost', pattern: 'warn', icon: 'users' },
      ],
    },
  ],
  edges: [{ source: 'cost', target: 'caveats', label: 'read with' }],
}
