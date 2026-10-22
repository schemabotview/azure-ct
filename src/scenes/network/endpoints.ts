import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import script from '../../../spine/network/07-endpoints/project/infra/05-private-endpoints.sh?raw'
import session from '../../../spine/network/07-endpoints/session.txt?raw'

// A private endpoint is a network interface with a private IP in your subnet, mapped to one
// sub-resource (group id) of a service: blob and dfs are separate endpoints for one storage account.
// Disabling public network access then refuses everything but private endpoints (and trusted
// exceptions configured). A service endpoint, by contrast, keeps the service's public address and
// lets the service's firewall recognise traffic from chosen subnets.
// source: https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview
// source: https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview
// source: https://learn.microsoft.com/en-us/azure/storage/common/storage-private-endpoints
export const endpoints: Scene = mapFrame('private-endpoints', [...BUILT_BY[4], 'vnet', 'pe'], {
  id: 'endpoints-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'pe-script', kind: 'code', filename: 'infra/05-private-endpoints.sh', label: script.replace(/\n+$/, ''), highlight: [8, 10, 12, 16, 17], pattern: 'network' },
    { id: 'pe-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · a reachability model', label: session.replace(/\n+$/, '') },
    {
      id: 'pe-vs-se',
      kind: 'table',
      label: 'Private endpoint or service endpoint',
      headers: ['', 'private endpoint', 'service endpoint'],
      values: [
        ['address', 'private, in snet-pe', 'still public'],
        ['on-premises', 'yes, over ExpressRoute', 'no'],
        ['public access off', 'yes', 'no'],
        ['costs', 'per hour and per GB', 'nothing extra'],
      ],
    },
  ],
})
