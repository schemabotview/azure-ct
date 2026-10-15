import type { Scene } from '@graphlearning/flow'

// Ch5 §3 — a scale set keeps N identical instances, replaces unhealthy ones and spreads across zones.
// Quota is a ceiling you may use, not capacity reserved for you. Flexible orchestration is current
// guidance; confirm before authoring commands.
export const scaleSet: Scene = {
  id: 'scale-set',
  title: 'A scale set across zones',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'vmss',
      label: 'vmss-orders',
      sub: 'identical instances from one model',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'z1', label: 'Instance 0', sub: 'zone 1', pattern: 'service', icon: 'vm' },
        { id: 'z2', label: 'Instance 1', sub: 'zone 2', pattern: 'service', icon: 'vm' },
        { id: 'z3', label: 'Instance 2', sub: 'zone 3 · unhealthy', pattern: 'warn', icon: 'vm' },
      ],
    },
    {
      id: 'rules',
      label: 'What drives it',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'health', label: 'Health signal', sub: 'replace the failed one', pattern: 'warn', icon: 'shieldcheck' },
        { id: 'autoscale', label: 'Autoscale rule', sub: 'add or remove instances', pattern: 'service', icon: 'scale' },
        { id: 'quota', label: 'Quota', sub: 'a limit, not a reservation', pattern: 'network', icon: 'quotas' },
        { id: 'capacity', label: 'Capacity', sub: 'may be unavailable', pattern: 'storage', icon: 'cloud' },
      ],
    },
  ],
  edges: [{ source: 'vmss', target: 'rules', label: 'governed by' }],
}
