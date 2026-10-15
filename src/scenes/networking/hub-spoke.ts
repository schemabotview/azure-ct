import type { Scene } from '@graphlearning/flow'

// Ch4 §9 — hub-spoke with peering (non-transitive by default) and a hybrid link. ExpressRoute is a
// private circuit, not encrypted by default. Address ranges are synthetic and must not overlap.
export const hubSpoke: Scene = {
  id: 'hub-spoke',
  title: 'Hub, spokes and the way home',
  flow: 'TB',
  padding: 0.11,
  nodes: [
    {
      id: 'onprem',
      label: 'On-premises network',
      sub: '192.168.0.0/16',
      pattern: 'external',
      children: [{ id: 'office', label: 'Office and datacentre', sub: 'existing systems', pattern: 'external', icon: 'building' }],
    },
    {
      id: 'hub',
      label: 'Hub VNet',
      sub: '10.0.0.0/16 · shared services',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'fw', label: 'Firewall', sub: 'central inspection', pattern: 'network', icon: 'firewall' },
        { id: 'gw', label: 'VPN or ExpressRoute', sub: 'the way home', pattern: 'network', icon: 'vnetgateway' },
      ],
    },
    {
      id: 'spokes',
      label: 'Spoke VNets',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'spoke-prod', label: 'Production', sub: '10.20.0.0/16', pattern: 'service', icon: 'vnet' },
        { id: 'spoke-dev', label: 'Development', sub: '10.30.0.0/16', pattern: 'service', icon: 'vnet' },
      ],
    },
  ],
  edges: [
    { source: 'onprem', target: 'hub', label: 'VPN: encrypted · ExpressRoute: private, not encrypted by default' },
    { source: 'hub', target: 'spokes', label: 'peering: not transitive' },
  ],
}
