import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import script from '../../../spine/secure/07-environments/project/infra/04-management-groups.sh?raw'

// Management groups organise subscriptions; policy and role assignments at a management group are
// inherited by every subscription in it. A subscription is a unit of billing, quota and an access
// boundary; Azure landing zones separate platform subscriptions (connectivity, management, identity)
// from application landing zones, and prod from dev. Network isolation is NOT a subscription
// property: virtual networks in different subscriptions can be peered.
// source: https://learn.microsoft.com/en-us/azure/governance/management-groups/overview
// source: https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-area/resource-org-subscriptions
// source: https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview
export const environments: Scene = mapFrame('environments', [...BUILT_BY[3], 'entra', 'mi', 'policy'], {
  id: 'environments-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'mg-script', kind: 'code', filename: 'infra/04-management-groups.sh', label: script.replace(/\n+$/, ''), highlight: [4, 6, 8, 11, 12], pattern: 'warn' },
    {
      id: 'hierarchy',
      kind: 'table',
      label: 'What lands where',
      headers: ['management group', 'subscriptions', 'inherits'],
      values: [
        ['woodgrove', '—', 'UK only, no public storage'],
        ['platform', 'platform-connectivity', '+ platform team owns'],
        ['landing-zones', 'risk-prod, risk-dev', '+ auditors read all'],
      ],
    },
    {
      id: 'isolates',
      kind: 'table',
      label: 'What a subscription isolates',
      headers: ['', 'separate per subscription?'],
      values: [
        ['bill and budget', 'yes'],
        ['quotas', 'yes'],
        ['role assignments', 'yes, unless inherited from above'],
        ['network', 'no: VNets can be peered across'],
      ],
    },
    {
      id: 'why-split',
      kind: 'list',
      icon: 'layers',
      label: 'Why prod and dev are two subscriptions',
      pattern: 'user',
      items: ['A mistake in dev cannot touch prod’s resources', 'Prod can be stricter: fewer people, more policy', 'Each has its own bill, quotas and limits'],
    },
  ],
})
