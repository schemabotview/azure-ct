import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import script from '../../../spine/network/05-names/project/infra/05-dns.sh?raw'
import session from '../../../spine/network/05-names/session.txt?raw'

// A private endpoint's DNS works through a CNAME the public record already carries
// (<account>.privatelink.blob.core.windows.net): a VNet linked to the private DNS zone of that name
// resolves it to the private address; everyone else gets the public one. On-premises resolution
// needs the bank's DNS to forward to a DNS Private Resolver inbound endpoint in the hub.
// source: https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns
// source: https://learn.microsoft.com/en-us/azure/dns/private-resolver-overview
// source: https://learn.microsoft.com/en-us/azure/dns/private-dns-overview
export const names: Scene = mapFrame('dns-names', [...BUILT_BY[4], 'vnet'], {
  id: 'names-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'dns-script', kind: 'code', filename: 'infra/05-dns.sh', label: script.replace(/\n+$/, ''), highlight: [9, 11, 12], pattern: 'network' },
    { id: 'dns-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · a DNS model', label: session.replace(/\n+$/, '') },
    {
      id: 'dns-parts',
      kind: 'table',
      label: 'Three pieces of DNS',
      headers: ['piece', 'answers'],
      values: [
        ['public DNS', 'the internet, a public address'],
        ['private zone, linked', 'linked VNets, the private address'],
        ['hub resolver', 'the bank’s DNS, forwarded to Azure'],
      ],
    },
  ],
})
