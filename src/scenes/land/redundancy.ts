import type { Scene } from '@graphlearning/flow'

// LRS: three copies in one datacenter; ZRS: synchronously across three availability zones; GRS:
// LRS plus an asynchronous copy in the paired Region; GZRS: ZRS plus that copy. Geo priority
// replication gives block blobs an RPO of 15 minutes or less. Customer-managed unplanned failover
// makes the secondary the primary, usually with some data loss (check Last Sync Time), and leaves the
// account LRS. Replication copies deletes and overwrites too: it protects against losing hardware,
// a zone or a Region, not against a mistake. UK South pairs with UK West (Course 2).
// source: https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy
// source: https://learn.microsoft.com/en-us/azure/storage/common/storage-failover-customer-managed-unplanned
// source: https://learn.microsoft.com/en-us/azure/storage/common/storage-disaster-recovery-guidance
export const redundancy: Scene = {
  id: 'storage-redundancy',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'copies',
      kind: 'table',
      label: 'Where the copies are',
      headers: ['option', 'copies', 'survives', 'the platform uses it for'],
      values: [
        ['LRS', '3, one datacenter', 'a failed disk or rack', 'dev: stwgriskdev'],
        ['ZRS', '3, three zones', 'a lost zone', 'the lake, the collateral share'],
        ['GRS', 'LRS here + LRS in UK West', 'a lost Region, with a failover', '—'],
        ['GZRS', 'ZRS here + LRS in UK West', 'a lost zone or Region', 'the locked reports'],
      ],
    },
    {
      id: 'restore-row',
      label: 'Redundancy is not a backup',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'failover',
          kind: 'list',
          icon: 'globe',
          label: 'A failover to UK West',
          pattern: 'network',
          items: [
            'Started by the bank, when UK South is lost',
            'The secondary becomes the primary',
            'Writes not yet copied are lost',
            'Last Sync Time says how much',
            'Afterwards the account is LRS',
          ],
        },
        {
          id: 'not-restored',
          kind: 'table',
          label: 'What redundancy does not undo',
          headers: ['mistake', 'is copied', 'undone by'],
          values: [
            ['a file deleted', 'at once', 'soft delete, 14 days'],
            ['a file overwritten', 'at once', 'reloading from landing'],
            ['the account deleted', 'with it', 'a backup elsewhere'],
            ['a bad job’s output', 'at once', 'rebuilding from bronze'],
          ],
        },
      ],
    },
  ],
  edges: [],
}
