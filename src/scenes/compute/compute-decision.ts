import type { Scene } from '@graphlearning/flow'

// Ch5 §1 — compute is chosen from requirements, not fashion. The order-API example reappears in each
// option. Descriptions are deliberately coarse; AKS is introduced only after the simpler options.
export const computeDecision: Scene = {
  id: 'compute-decision',
  title: 'Choosing where code runs',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'options',
      kind: 'table',
      label: 'The same order API, five homes',
      headers: ['Option', 'You manage', 'Fits when'],
      values: [
        ['App Service', 'code, settings', 'web apps and APIs'],
        ['Virtual Machines', 'OS and above', 'special software, lift and shift'],
        ['Container Apps', 'a container image', 'containers without cluster ops'],
        ['AKS', 'workloads, nodes', 'you need Kubernetes itself'],
        ['Functions', 'function code', 'event-driven, short tasks'],
      ],
    },
    {
      id: 'questions',
      label: 'Decide on requirements',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'control', label: 'Control', sub: 'how much of the stack', pattern: 'user', icon: 'wrench' },
        { id: 'shape', label: 'Workload shape', sub: 'steady, bursty, batch', pattern: 'service', icon: 'gauge' },
        { id: 'latency', label: 'Latency', sub: 'cold starts matter?', pattern: 'warn', icon: 'clock' },
        { id: 'portable', label: 'Portability', sub: 'avoid lock-in?', pattern: 'network', icon: 'boxes' },
        { id: 'ops', label: 'Operations', sub: 'who runs it at 3am', pattern: 'storage', icon: 'users' },
      ],
    },
  ],
  edges: [{ source: 'options', target: 'questions', label: 'choose by' }],
}
