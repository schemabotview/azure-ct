import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import script from '../../../spine/network/02-spoke/project/infra/05-network.sh?raw'
import session from '../../../spine/network/02-spoke/session.txt?raw'

// A virtual network lives in one Region; its subnets hold network interfaces. A delegated subnet is
// handed to one service (Azure Databricks needs two, each /26 or larger; App Service VNet
// integration a /28 or larger, and its subnet cannot be resized while in use; scaling briefly
// doubles the addresses a plan uses). For the API versions released after 31 March 2026, subnets in
// new virtual networks are private by default (defaultOutboundAccess false).
// source: https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview
// source: https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration
// source: https://learn.microsoft.com/en-us/azure/databricks/security/network/classic/vnet-inject
// source: https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/default-outbound-access
export const spoke: Scene = mapFrame('spoke-subnets', [...BUILT_BY[4], 'vnet'], {
  id: 'spoke-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'spoke-script', kind: 'code', filename: 'infra/05-network.sh', label: script.replace(/\n+$/, ''), highlight: [7, 11, 13, 15, 18], pattern: 'network' },
    { id: 'spoke-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · a sizing model', label: session.replace(/\n+$/, '') },
    {
      id: 'tiers',
      kind: 'table',
      label: 'What lives in each subnet',
      headers: ['subnet', 'holds', 'delegated to'],
      values: [
        ['snet-dbx-host, -container', 'Databricks cluster nodes', 'Databricks'],
        ['snet-pe', 'private endpoints', '—'],
        ['snet-app', 'the API’s outbound calls', 'App Service'],
        ['snet-shir', 'two integration VMs', '—'],
      ],
    },
  ],
})
