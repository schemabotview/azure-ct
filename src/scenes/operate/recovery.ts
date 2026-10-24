import type { Scene } from '@graphlearning/flow'

// RTO: how long until the service is back; RPO: how much data, in time, may be lost. UK South pairs
// with UK West, which has no availability zones. Storage GZRS/GRS replicate asynchronously to the
// secondary (geo priority replication: RPO ≤ 15 minutes for block blobs) and fail over when the bank
// starts it; ZRS has no copy outside UK South. PostgreSQL flexible server geo-restores from
// geo-redundant backups to the paired Region (RPO under an hour). Event Hubs geo-disaster recovery
// in Standard copies metadata, not events. Code, templates and factory JSON redeploy from git.
// The 3-hour RTO is an assumption: lost at 00:30 London, back by 03:30, nightly by 05:30.
// source: https://learn.microsoft.com/en-us/azure/reliability/disaster-recovery-overview
// source: https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-business-continuity
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-geo-dr
export const recovery: Scene = {
  id: 'recovery-objectives',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'by-part',
      kind: 'table',
      label: 'UK South is lost at 00:30: what comes back in UK West',
      headers: ['part', 'copy in UK West', 'data lost (RPO)', 'how it comes back'],
      values: [
        ['network, vaults, identities', 'none needed', 'none', 'redeploy from Bicep'],
        ['the reports', 'GZRS', 'under 15 minutes', 'the bank starts a failover'],
        ['the risk mart', 'geo-redundant backups', 'under an hour', 'geo-restore to a new server'],
        ['the lake (bronze, gold)', 'none: ZRS', 'everything', 're-land, rebuild: a gap'],
        ['streams in flight', 'none', 'a few minutes', 'the bank’s Kafka resends'],
        ['factory, jobs, API', 'git', 'none', 'redeploy, then rerun the night'],
      ],
    },
    {
      id: 'dr-row',
      label: 'Failing over',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'objectives',
          kind: 'table',
          label: 'The two numbers',
          headers: ['', 'means', 'here (assumed)'],
          values: [
            ['RTO', 'how long until it works again', '3 hours'],
            ['RPO', 'how much may be lost', '15 minutes of reports'],
          ],
        },
        {
          id: 'order',
          kind: 'list',
          icon: 'sortarrows',
          label: 'In dependency order',
          pattern: 'network',
          items: [
            'Network, DNS and the vaults',
            'The lake and the mart',
            'The runtime, factory and Databricks',
            'The API, then readers’ DNS',
          ],
        },
        {
          id: 'dr-caveats',
          kind: 'list',
          icon: 'ban',
          label: 'What the plan shows',
          pattern: 'warn',
          items: [
            'The lake has no second Region',
            'UK West has no zones',
            'Quota there is not reserved',
            'Failing back is a second migration',
          ],
        },
      ],
    },
  ],
  edges: [],
}
