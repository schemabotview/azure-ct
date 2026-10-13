import type { Scene } from '@graphlearning/flow'

// Ch1 §2 — a region holds separate zones; a zone is a failure boundary inside it; a second region
// is a separate boundary the architect has to design for. Not every region has zones.
export const regionsZones: Scene = {
  id: 'ch01-regions-zones',
  title: 'Region, zones and a second region',
  flow: 'TB',
  padding: 0.05,
  nodes: [
    { id: 'shoppers', label: 'Shoppers', sub: 'browsers and apps', pattern: 'user', icon: 'users' },
    { id: 'balancer', label: 'Load balancer', sub: 'zone-redundant', pattern: 'network', icon: 'loadbalancer' },
    {
      id: 'region',
      label: 'One Azure region',
      sub: 'if it offers availability zones',
      pattern: 'group',
      children: [
        {
          id: 'zone-1',
          label: 'Zone 1',
          pattern: 'service',
          children: [{ id: 'api-1', label: 'Order API', sub: 'instance A', pattern: 'service', icon: 'vm' }],
        },
        {
          id: 'zone-2',
          label: 'Zone 2',
          pattern: 'service',
          children: [{ id: 'api-2', label: 'Order API', sub: 'instance B', pattern: 'service', icon: 'vm' }],
        },
        {
          id: 'zone-3',
          label: 'Zone 3',
          pattern: 'service',
          children: [{ id: 'api-3', label: 'Order API', sub: 'instance C', pattern: 'service', icon: 'vm' }],
        },
      ],
      cols: 3,
    },
    {
      id: 'second-region',
      label: 'A second region',
      sub: 'a separate failure boundary',
      pattern: 'external',
      children: [{ id: 'standby', label: 'Standby copy', sub: 'only if you build it', pattern: 'external', icon: 'region' }],
    },
  ],
  edges: [
    { source: 'shoppers', target: 'balancer', label: 'orders' },
    { source: 'balancer', target: 'region', label: 'to healthy instances' },
    { source: 'region', target: 'second-region', label: 'not automatic', dashed: true },
  ],
}
