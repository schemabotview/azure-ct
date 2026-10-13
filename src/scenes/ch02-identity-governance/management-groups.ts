import type { Scene } from '@graphlearning/flow'

// Ch2 §7 — management groups organise subscriptions; a policy or role assigned high up is inherited
// by everything beneath. Subscriptions isolate environments' RBAC, quota, billing and blast radius —
// they are not by themselves a network boundary. Names are synthetic.
export const managementGroups: Scene = {
  id: 'ch02-management-groups',
  title: 'Management groups and subscriptions',
  flow: 'TB',
  padding: 0.05,
  nodes: [
    {
      id: 'root',
      label: 'Tenant root group',
      sub: 'top of the hierarchy',
      pattern: 'user',
      children: [
        {
          id: 'platform',
          label: 'Platform',
          sub: 'shared services',
          pattern: 'group',
          children: [
            { id: 'sub-conn', label: 'connectivity', sub: 'hub network', pattern: 'network', icon: 'subscription' },
            { id: 'sub-mgmt', label: 'management', sub: 'monitoring', pattern: 'network', icon: 'subscription' },
          ],
        },
        {
          id: 'workloads',
          label: 'Landing zones',
          sub: 'inherited by both below',
          pattern: 'service',
          children: [
            { id: 'inherit', label: 'Allowed regions', sub: 'policy assigned here', pattern: 'warn', icon: 'policy' },
            { id: 'sub-prod', label: 'contoso-prod', sub: 'production', pattern: 'service', icon: 'subscription' },
            { id: 'sub-dev', label: 'contoso-dev', sub: 'development', pattern: 'service', icon: 'subscription' },
          ],
        },
      ],
      cols: 2,
    },
  ],
  edges: [],
}
