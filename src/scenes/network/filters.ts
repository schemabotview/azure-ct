import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import script from '../../../spine/network/04-filters/project/infra/05-nsg.sh?raw'
import session from '../../../spine/network/04-filters/session.txt?raw'

// A network security group's rules are evaluated by priority (lowest number first); the first match
// decides; rules are stateful, so a reply to an allowed flow is allowed back. The default rules
// include AllowVnetInBound (65000), which admits the whole VirtualNetwork service tag — the VNet,
// peered VNets and on-premises ranges reached through a gateway — unless a higher-priority rule
// denies it. Azure Databricks adds its own required rules to its delegated subnets.
// source: https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
// source: https://learn.microsoft.com/en-us/azure/virtual-network/service-tags-overview
export const filters: Scene = mapFrame('traffic-filters', [...BUILT_BY[4], 'vnet'], {
  id: 'filters-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'nsg-script', kind: 'code', filename: 'infra/05-nsg.sh', label: script.replace(/\n+$/, ''), highlight: [14, 15, 16, 17], pattern: 'warn' },
    { id: 'nsg-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · an NSG model', label: session.replace(/\n+$/, '') },
    {
      id: 'nsg-notes',
      kind: 'list',
      icon: 'shieldcheck',
      label: 'How a security group decides',
      pattern: 'warn',
      items: [
        'Lowest priority number first; the first match wins',
        'The defaults let the whole network in: 4096 says no',
        'Stateful: replies return without a rule of their own',
        'Databricks adds rules its subnets need; leave them',
      ],
    },
  ],
})
