import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import script from '../../../spine/network/09-peering/project/infra/05-peering.sh?raw'

// Hub and spoke: spokes peer with a hub that holds shared services (gateways, firewall, DNS
// resolver). VNet peering is not transitive; gateway transit lets a spoke use the hub's gateway.
// ExpressRoute is a private connection through a connectivity provider that does not cross the
// public internet; a site-to-site VPN runs over the internet with IPsec and is a common backup.
// source: https://learn.microsoft.com/en-us/azure/architecture/networking/architecture/hub-spoke
// source: https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview
// source: https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction
// source: https://learn.microsoft.com/en-us/azure/expressroute/use-s2s-vpn-as-backup-for-expressroute-privatepeering
export const hybrid: Scene = mapFrame('hybrid-links', [...BUILT_BY[4], 'vnet', 'pe', 'er'], {
  id: 'hybrid-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'peering-script', kind: 'code', filename: 'infra/05-peering.sh', label: script.replace(/\n+$/, ''), highlight: [9, 11, 12, 14], pattern: 'network' },
    {
      id: 'links',
      kind: 'table',
      label: 'Ways to join networks',
      headers: ['link', 'joins', 'over'],
      values: [
        ['VNet peering', 'two VNets, any Region', 'Microsoft’s backbone'],
        ['ExpressRoute', 'the bank to Azure', 'a provider, private'],
        ['site-to-site VPN', 'the bank to Azure', 'the internet, IPsec'],
        ['hub and spoke', 'many VNets, one hub', 'peerings + gateway transit'],
      ],
    },
    {
      id: 'hybrid-means',
      kind: 'list',
      icon: 'network',
      label: 'What the platform uses, and why',
      pattern: 'network',
      items: [
        'ExpressRoute in London: TradeBook’s nightly copy',
        'A VPN as its backup, through the same hub',
        'Peering is not transitive: dev cannot reach prod',
        'The platform team owns the hub; the risk team its spoke',
      ],
    },
  ],
})
