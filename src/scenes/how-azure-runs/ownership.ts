import type { Scene, SceneNode } from '@graphlearning/flow'

// Microsoft's resource organisation levels: a Microsoft Entra tenant holds identities; management
// groups apply policy and access to many subscriptions; a subscription is the unit of billing, quota
// and an access boundary; a resource group holds resources that share a lifecycle (its location is
// only where its metadata is stored); deleting a resource group deletes everything in it.
// source: https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal
const level = (id: string, label: string, sub: string, icon: string, pattern: SceneNode['pattern']): SceneNode => ({ id, label, sub, icon, pattern })

export const ownership: Scene = {
  id: 'ownership-tree',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'tree',
      label: 'Woodgrove’s Azure, from the top',
      bare: true,
      children: [
        level('tenant', 'Tenant', 'woodgrovebank.example · Entra ID: every identity', 'tenant', 'user'),
        level('root-mg', 'Management group woodgrove', 'policy and access for everything below', 'managementgroup', 'warn'),
        {
          id: 'mgs',
          label: 'Two management groups',
          bare: true,
          flow: 'LR',
          align: 'start',
          children: [
            {
              id: 'platform-mg',
              label: 'platform',
              icon: 'managementgroup',
              pattern: 'group',
              cols: 1,
              children: [level('sub-conn', 'platform-connectivity', 'subscription · the hub network', 'subscription', 'network')],
            },
            {
              id: 'lz-mg',
              label: 'landing-zones',
              icon: 'managementgroup',
              pattern: 'group',
              cols: 1,
              children: [
                {
                  id: 'sub-prod',
                  label: 'risk-prod',
                  sub: 'subscription · bills, quotas, access',
                  icon: 'subscription',
                  pattern: 'service',
                  cols: 1,
                  children: [
                    level('rg-net', 'rg-risk-prod-net', 'resource group', 'resourcegroup', 'network'),
                    level('rg-data', 'rg-risk-prod-data', 'resource group', 'resourcegroup', 'storage'),
                    level('rg-app', 'rg-risk-prod-app', 'resource group', 'resourcegroup', 'service'),
                  ],
                },
                level('sub-dev', 'risk-dev', 'subscription · the same, for development', 'subscription', 'service'),
              ],
            },
          ],
        },
      ],
      edges: [
        { source: 'tenant', target: 'root-mg', label: 'trusts' },
        { source: 'root-mg', target: 'mgs' },
      ],
    },
    {
      id: 'levels-side',
      label: 'What each level is for',
      bare: true,
      children: [
        {
          id: 'levels',
          kind: 'table',
          label: 'Four levels, four jobs',
          headers: ['level', 'decides'],
          values: [
            ['tenant', 'who exists: people, groups, apps'],
            ['management group', 'rules and access for many subscriptions'],
            ['subscription', 'who pays, what quotas, a hard access line'],
            ['resource group', 'what is created and deleted together'],
          ],
        },
        {
          id: 'rg-not',
          kind: 'list',
          icon: 'circleslash',
          label: 'A resource group is not…',
          pattern: 'warn',
          items: [
            'a network boundary: its resources can still talk to anything',
            'a billing account: the subscription pays (costs can be grouped by it)',
            'a Region: its location only says where its metadata lives',
            'safe to delete casually: deleting it deletes everything inside',
          ],
        },
        {
          id: 'ids',
          kind: 'table',
          label: 'The fixed example’s placeholders',
          headers: ['name', 'id'],
          values: [
            ['tenant', 'aaaabbbb-0000-cccc-1111-dddd2222eeee'],
            ['risk-prod', 'aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e'],
            ['risk-dev', 'bbbb1b1b-cc2c-dd3d-ee4e-ffffff5f5f5f'],
            ['platform-connectivity', 'cccc2c2c-dd3d-ee4e-ff5f-aaaaaa6a6a6a'],
          ],
        },
      ],
    },
  ],
  edges: [],
}
