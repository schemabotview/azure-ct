import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { networkTree } from './tree'
import code from '../../../spine/network/01-addresses/project/tools/cidr_plan.py?raw'
import session from '../../../spine/network/01-addresses/session.txt?raw'

// CIDR: a prefix length says how many leading bits are the network. Azure reserves five addresses in
// every subnet (network, three for the platform, broadcast). Address spaces that will ever be
// connected — the hub, the spokes and the bank's own network — must not overlap. Ports name the
// service on a host: 443 for HTTPS, 5432 for PostgreSQL, 22 for SSH.
// source: https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq#are-there-any-restrictions-on-using-ip-addresses-within-these-subnets
// source: https://learn.microsoft.com/en-us/azure/virtual-network/concepts-and-best-practices
export const addresses: Scene = ideFrame(
  'cidr-plan',
  'risk-on-azure',
  networkTree('01', 'tools/cidr_plan.py', ['tools/cidr_plan.py'], ['budgets', 'infra', 'policies']),
  { file: 'tools/cidr_plan.py', code, show: [[9, 21], [35, 37]], highlight: [10, 11, 15, 16], terminal: session, emulated: false },
  {
    id: 'cidr-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'cidr',
        kind: 'table',
        label: 'Reading a CIDR range',
        headers: ['range', 'addresses'],
        values: [
          ['10.110.0.0/20', '4,096: the spoke'],
          ['10.110.1.0/24', '256: endpoints'],
          ['10.110.0.0/26', '64: one subnet'],
          ['10.100.1.0/28', '16: the smallest'],
        ],
      },
      {
        id: 'ports',
        kind: 'table',
        label: 'Ports the platform uses',
        headers: ['port', 'for'],
        values: [
          ['443', 'HTTPS: storage, APIs'],
          ['5432', 'PostgreSQL'],
          ['9093', 'Kafka, Event Hubs'],
          ['22', 'SSH: closed to all'],
        ],
      },
      {
        id: 'plan-rules',
        kind: 'list',
        icon: 'network',
        label: 'Rules for the plan',
        pattern: 'network',
        items: ['No overlap with anything it will join', 'Leave room: subnets rarely grow', 'One range per environment'],
      },
    ],
  },
)
