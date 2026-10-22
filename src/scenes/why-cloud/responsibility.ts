import type { Scene, SceneNode } from '@graphlearning/flow'

// Microsoft's shared responsibility model: the physical datacentre, hosts and network are always
// Microsoft's; information and data, devices, and accounts and identities are always the customer's;
// the rest moves with the service type. On Azure Databricks the cluster's runtime image is Databricks'
// to build and patch, and the customer chooses the version and restarts clusters onto new ones.
// source: https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility
// source: https://learn.microsoft.com/en-us/azure/databricks/release-notes/runtime/databricks-runtime-ver
const chip = (id: string, label: string, pattern: SceneNode['pattern']): SceneNode => ({ id, label, variant: 'chip', pattern, icon: 'none' })

export const responsibility: Scene = {
  id: 'shared-responsibility',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'split',
      label: 'One line, two owners',
      bare: true,
      children: [
        {
          id: 'always-you',
          label: 'Always the bank’s',
          pattern: 'user',
          icon: 'usercheck',
          cols: 2,
          children: [
            chip('you-data', 'the data and its labels', 'user'),
            chip('you-ids', 'accounts and identities', 'user'),
            chip('you-devices', 'laptops that sign in', 'user'),
            chip('you-access', 'who may reach what', 'user'),
            chip('you-net', 'network rules', 'user'),
            chip('you-config', 'every setting it chooses', 'user'),
          ],
        },
        {
          id: 'always-ms',
          label: 'Always Microsoft’s',
          pattern: 'network',
          icon: 'cloud',
          cols: 2,
          children: [
            chip('ms-dc', 'datacentres and guards', 'network'),
            chip('ms-hw', 'hosts and disks', 'network'),
            chip('ms-net', 'the physical network', 'network'),
            chip('ms-hv', 'the hypervisor', 'network'),
            chip('ms-svc', 'managed-service software', 'network'),
            chip('ms-regions', 'Regions and zones', 'network'),
          ],
        },
      ],
    },
    {
      id: 'detail',
      label: 'Where the line sits',
      bare: true,
      children: [
        {
          id: 'matrix',
          kind: 'table',
          label: 'Who patches and protects what',
          headers: ['', 'VM', 'PostgreSQL', 'Databricks', 'Storage'],
          values: [
            ['physical hardware', 'Microsoft', 'Microsoft', 'Microsoft', 'Microsoft'],
            ['operating system', 'bank', 'Microsoft', 'Databricks', '—'],
            ['engine or runtime', 'bank', 'Microsoft', 'Databricks*', '—'],
            ['code and jobs', 'bank', 'bank', 'bank', '—'],
            ['network rules', 'bank', 'bank', 'bank', 'bank'],
            ['who may use it', 'bank', 'bank', 'bank', 'bank'],
            ['data and encryption keys', 'bank', 'bank', 'bank', 'bank'],
          ],
        },
        {
          id: 'footnote',
          kind: 'note',
          label: '* Databricks builds the runtime; the bank picks the version and restarts clusters onto it',
        },
        {
          id: 'incidents',
          kind: 'list',
          icon: 'bell',
          label: 'Whose incident is it?',
          pattern: 'warn',
          items: [
            'A host fails under a VM — Microsoft',
            'The lake accepts traffic from the internet — the bank',
            'The integration VM misses a patch — the bank',
            'A PostgreSQL engine patch — Microsoft, in the bank’s window',
          ],
        },
      ],
    },
  ],
  edges: [],
}
