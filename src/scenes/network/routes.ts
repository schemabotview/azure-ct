import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import script from '../../../spine/network/03-routes/project/infra/05-routes.sh?raw'
import session from '../../../spine/network/03-routes/session.txt?raw'

// Azure picks a route by longest prefix match; among routes with the same prefix, a user-defined
// route wins over a BGP route, which wins over a system route. A private subnet has no default
// outbound access, so internet-bound traffic needs an explicit method: a NAT gateway, a public IP,
// a load balancer's outbound rule, or a user-defined route to a firewall.
// source: https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview
// source: https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/default-outbound-access
// source: https://learn.microsoft.com/en-us/azure/nat-gateway/nat-overview
export const routes: Scene = mapFrame('routes', [...BUILT_BY[4], 'vnet'], {
  id: 'routes-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'routes-script', kind: 'code', filename: 'infra/05-routes.sh', label: script.replace(/\n+$/, ''), highlight: [7, 8, 9], pattern: 'network' },
    { id: 'routes-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · a routing model', label: session.replace(/\n+$/, '') },
    {
      id: 'outbound',
      kind: 'table',
      label: 'Ways out of a private subnet',
      headers: ['method', 'when'],
      values: [
        ['route to a firewall', 'the bank inspects all egress: prod'],
        ['NAT gateway', 'many VMs, one stable outbound IP: dev'],
        ['public IP on a VM', 'rarely: it is also a way in'],
        ['nothing', 'the safest, if nothing needs out'],
      ],
    },
  ],
})
