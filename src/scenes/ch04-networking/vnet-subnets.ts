import type { Scene } from '@graphlearning/flow'

// Ch4 §2 — a VNet is a regional private address space; subnets slice it; NICs attach things to a
// subnet. Names and ranges are synthetic.
export const vnetSubnets: Scene = {
  id: 'ch04-vnet-subnets',
  title: 'A virtual network and its subnets',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'vnet',
      label: 'vnet-retail',
      sub: '10.20.0.0/16 · one region',
      pattern: 'network',
      cols: 2,
      children: [
        {
          id: 'snet-web',
          label: 'snet-web',
          sub: '10.20.1.0/24',
          pattern: 'service',
          children: [{ id: 'integration', label: 'App integration', sub: 'outbound from apps', pattern: 'service', icon: 'appservice' }],
        },
        {
          id: 'snet-data',
          label: 'snet-data',
          sub: '10.20.2.0/24',
          pattern: 'storage',
          children: [{ id: 'pe-nic', label: 'Private endpoint', sub: 'a NIC, 10.20.2.4', pattern: 'storage', icon: 'privateendpoint' }],
        },
        {
          id: 'snet-vm',
          label: 'snet-vm',
          sub: '10.20.3.0/24',
          pattern: 'user',
          children: [{ id: 'vm-nic', label: 'VM interface', sub: 'a NIC, 10.20.3.5', pattern: 'user', icon: 'nic' }],
        },
      ],
    },
    {
      id: 'plan',
      label: 'Plan the space before using it',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'no-overlap', label: 'No overlaps', sub: 'if you will connect', pattern: 'warn', icon: 'ban' },
        { id: 'room', label: 'Leave room', sub: 'for growth', pattern: 'service', icon: 'scale' },
        { id: 'per-role', label: 'One subnet per role', sub: 'rules apply per subnet', pattern: 'network', icon: 'layers' },
      ],
    },
  ],
  edges: [{ source: 'vnet', target: 'plan', label: 'so' }],
}
