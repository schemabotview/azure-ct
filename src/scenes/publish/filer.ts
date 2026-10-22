import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/publish/09-filer/project/templates/modules/filer.bicep?raw'

// Container Apps jobs run a container to completion, on a schedule (cron, in UTC), on demand or on an
// event, with a replica timeout and retry limit, in a Container Apps environment that can sit in a
// customer subnet (workload profiles environment: a /27 or larger subnet delegated to
// Microsoft.App/environments). Images come from Azure Container Registry, pulled with a managed
// identity holding AcrPull. The analysts' tools: Power BI (reports on a semantic model), Microsoft
// Fabric (a SaaS analytics platform that includes Power BI), Azure Synapse Analytics, and
// Databricks SQL warehouses.
// source: https://learn.microsoft.com/en-us/azure/container-apps/jobs
// source: https://learn.microsoft.com/en-us/azure/container-apps/custom-virtual-networks
// source: https://learn.microsoft.com/en-us/azure/container-registry/container-registry-authentication-managed-identity
// source: https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview
export const filer: Scene = mapFrame('morning-report', BUILT_BY[12], {
  id: 'filer-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'filer-code', kind: 'code', filename: 'templates/modules/filer.bicep', label: code.replace(/\n+$/, ''), show: [[11, 15], [29, 43]], highlight: [14, 15, 36, 37, 38, 39, 41], pattern: 'service' },
    {
      id: 'morning',
      kind: 'table',
      label: 'The morning, in London',
      headers: ['time', 'what'],
      values: [
        ['00:05–02:00', 'nightly: TradeBook in, gold built'],
        ['06:30 (05:30 UTC)', 'the filer starts, from crwgriskprod'],
        ['06:34', 'the file is in the locked reports'],
        ['07:00', 'the report is due'],
        ['from 25 Oct', '05:30 in London: still in time'],
      ],
    },
    {
      id: 'analyst-tools',
      kind: 'table',
      label: 'Where the analysts read',
      headers: ['tool', 'reads', 'the platform'],
      values: [
        ['Power BI', 'the risk mart', 'yes: reports'],
        ['Fabric', 'its own OneLake', 'not now'],
        ['Synapse', 'its own pools', 'no: Databricks'],
        ['Databricks SQL', 'gold, governed', 'yes: ad hoc'],
      ],
    },
  ],
})
