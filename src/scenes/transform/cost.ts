import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { transformTree } from './tree'
import code from '../../../spine/transform/07-cost/project/tools/night_cost.py?raw'
import session from '../../../spine/transform/07-cost/session.txt?raw'

// Azure Databricks is billed in two parts: the VMs (and their disks) at Azure's prices, and DBUs —
// Databricks Units of processing per hour, by VM size and compute type — at a per-DBU price. Every
// price and the DBU rate here are hypothetical.
// source: https://learn.microsoft.com/en-us/azure/databricks/admin/account-settings/usage-detail-tags
// source: https://azure.microsoft.com/en-us/pricing/details/databricks/
export const cost: Scene = ideFrame(
  'night-cost',
  'risk-on-azure',
  transformTree('07', 'tools/night_cost.py', ['tools/night_cost.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies', 'templates'], ['tools']),
  { file: 'tools/night_cost.py', code, show: [[5, 11], [16, 22]], highlight: [5, 6, 7, 10, 11, 17, 19], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'cost-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'two-bills',
        kind: 'table',
        label: 'Two bills for one node-hour',
        headers: ['bill', 'from', 'hypothetical'],
        values: [
          ['the VM', 'Azure', '0.20, Spot 0.06'],
          ['DBUs', 'Databricks', '0.75 × 0.15'],
          ['disks, network', 'Azure', 'not counted here'],
        ],
      },
      {
        id: 'cost-lessons',
        kind: 'list',
        icon: 'costanalysis',
        label: 'What the numbers say',
        pattern: 'external',
        items: [
          'The intraday job costs more than the night',
          'Spot cuts the night’s VMs by two thirds',
          'DBUs do not fall with Spot',
          'Tags on every cluster: cost by job',
        ],
      },
    ],
  },
)
