import type { Scene } from '@graphlearning/flow'

// Ch2 §8 — just-in-time elevation (Privileged Identity Management; needs Entra ID Governance /
// P2-class licensing — label it), periodic access reviews, and who owns which layer.
export const privilegedAccess: Scene = {
  id: 'privileged-access',
  title: 'Time-boxed access and clear ownership',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'jit',
      label: 'Just-in-time elevation',
      sub: 'a licensed Entra feature',
      pattern: 'user',
      cols: 2,
      children: [
        { id: 'eligible', label: 'Eligible', sub: 'no standing access', pattern: 'user', icon: 'users' },
        { id: 'activate', label: 'Activate', sub: 'MFA and a reason', pattern: 'user', icon: 'pim' },
        { id: 'active', label: 'Active', sub: 'for a set time', pattern: 'service', icon: 'roles' },
        { id: 'expires', label: 'Expires', sub: 'access drops', pattern: 'storage', icon: 'clock' },
      ],
    },
    {
      id: 'ownership',
      label: 'Who owns which layer',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'platform-team', label: 'Platform team', sub: 'policy, hub network, identity', pattern: 'network', icon: 'managementgroup' },
        { id: 'app-team', label: 'Application team', sub: 'workload resources', pattern: 'service', icon: 'resourcegroup' },
      ],
    },
    {
      id: 'evidence',
      label: 'Evidence',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'review', label: 'Access review', sub: 'owners re-confirm', pattern: 'storage', icon: 'identitygovernance' },
        { id: 'audit', label: 'Audit trail', sub: 'who did what, when', pattern: 'storage', icon: 'activitylog' },
      ],
    },
  ],
  edges: [
    { source: 'jit', target: 'ownership', label: 'within boundaries' },
    { source: 'ownership', target: 'evidence', label: 'proved by' },
  ],
}
