import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { transformTree } from './tree'
import code from '../../../spine/transform/05-compute/project/policies/databricks/overnight-job.json?raw'
import session from '../../../spine/transform/05-compute/session.txt?raw'

// Databricks cluster nodes are Azure VMs in the customer's subscription, billed as VMs plus DBUs;
// they count against the subscription's regional and per-family vCPU quotas (raised by request).
// Spot VMs can be evicted at any time; SPOT_WITH_FALLBACK_AZURE falls back to on-demand, and
// first_on_demand keeps the driver on demand. A cluster policy fixes or limits cluster attributes.
// Prices are hypothetical; the quota of 100 is assumed.
// source: https://learn.microsoft.com/en-us/azure/databricks/admin/clusters/policy-definition
// source: https://learn.microsoft.com/en-us/azure/quotas/per-vm-quota-requests
// source: https://learn.microsoft.com/en-us/azure/virtual-machines/spot-vms
// source: https://docs.databricks.com/api/azure/workspace/clusters/create
export const compute: Scene = ideFrame(
  'dbx-compute',
  'risk-on-azure',
  transformTree('05', 'policies/databricks/overnight-job.json', ['tools/compute_plan.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'templates', 'policies/builtin', 'policies/roles'], ['policies', 'tools']),
  { file: 'policies/databricks/overnight-job.json', code, highlight: [4, 7, 10, 12, 13], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'dbx-compute-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'vm-choice',
        kind: 'table',
        label: 'The nodes, on the Azure bill',
        headers: ['', 'value'],
        values: [
          ['VM', 'Standard_D4ds_v5'],
          ['size', '4 vCPUs, 16 GiB'],
          ['quota family', 'DDSv5: 100 vCPUs'],
          ['workers', 'Spot, falls back'],
          ['driver', 'on demand, always'],
        ],
      },
      {
        id: 'policy-why',
        kind: 'list',
        icon: 'policy',
        label: 'What the policy prevents',
        pattern: 'warn',
        items: [
          'A bigger VM nobody budgeted for',
          'More than 16 workers',
          'A driver evicted mid-run',
          'A cluster without its cost tags',
        ],
      },
    ],
  },
)
