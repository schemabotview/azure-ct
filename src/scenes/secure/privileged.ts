import type { Scene, SceneNode } from '@graphlearning/flow'

// Privileged Identity Management (Entra ID P2 or ID Governance licences) makes a role ELIGIBLE rather
// than permanently active: activation is time-bound and can require MFA, a justification and
// approval. Access reviews ask owners to re-confirm membership on a schedule. The Activity Log keeps
// control-plane events for 90 days; longer retention needs a diagnostic setting. In Azure landing
// zones the platform team owns management groups, policy, connectivity and central logging; the
// workload team owns its landing zone.
// source: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure
// source: https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/platform/activity-log
// source: https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/
const step = (id: string, label: string, sub: string, icon: string, pattern: SceneNode['pattern']): SceneNode => ({ id, label, sub, icon, pattern })

export const privileged: Scene = {
  id: 'privileged-access',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'activation',
      label: 'priya needs Owner on risk-prod for an hour',
      bare: true,
      children: [
        step('eligible', 'Eligible, not active', 'PIM: the role is assigned, switched off', 'pim', 'user'),
        step('request', 'She asks to activate it', 'MFA, a justification, a ticket number', 'mfa', 'user'),
        step('approve', 'Another person approves', 'the platform lead, not priya', 'usercheck', 'warn'),
        step('active', 'Active for one hour', 'then it switches itself off', 'clock', 'service'),
        step('logged', 'Every step is logged', 'Entra audit log; Azure Activity Log', 'activitylog', 'network'),
      ],
      edges: [
        { source: 'eligible', target: 'request' },
        { source: 'request', target: 'approve' },
        { source: 'approve', target: 'active' },
        { source: 'active', target: 'logged' },
      ],
    },
    {
      id: 'owners-side',
      label: 'Who owns what',
      bare: true,
      children: [
        {
          id: 'reviews',
          kind: 'table',
          label: 'Access reviews, every quarter',
          headers: ['group', 'reviewed by'],
          values: [
            ['Risk Data Engineers', 'the platform lead'],
            ['Risk Analysts', 'the head of risk'],
            ['Risk Auditors', 'internal audit'],
            ['eligible Owners', 'the security team'],
          ],
        },
        {
          id: 'landing',
          kind: 'table',
          label: 'Landing-zone boundary',
          headers: ['the platform team owns', 'the risk team owns'],
          values: [
            ['management groups, Policy', 'risk-prod, risk-dev'],
            ['the hub network, DNS', 'the spoke and its subnets'],
            ['central logs and the audit trail', 'its own diagnostics'],
          ],
        },
      ],
    },
    {
      id: 'standing-side',
      label: 'Standing and eligible',
      bare: true,
      children: [
        {
          id: 'standing',
          kind: 'table',
          label: 'Owner on risk-prod',
          headers: ['who', 'how'],
          values: [
            ['nobody', 'standing, all the time'],
            ['3 platform engineers', 'eligible, 1 hour, approved'],
            ['2 break-glass accounts', 'via Global Administrator'],
          ],
        },
        {
          id: 'audit',
          kind: 'list',
          icon: 'scroll',
          label: 'The audit trail belongs to someone else',
          pattern: 'warn',
          items: [
            'The Activity Log keeps 90 days; export it for longer',
            'Logs go to a workspace the risk team cannot delete',
            'PIM and reviews need Entra ID P2 or ID Governance',
          ],
        },
      ],
    },
  ],
  edges: [],
}
