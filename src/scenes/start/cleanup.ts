import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { startTree } from './tree'
import code from '../../../spine/start/06-budget/project/tools/cost_ledger.py?raw'
import session from '../../../spine/start/06-budget/session.txt?raw'

// A Cost Management budget evaluates actual and forecast cost against an amount and notifies at the
// thresholds set; it does not stop resources (action groups can be attached to automate a response).
// Deleting a resource group deletes the resources in it, but not role assignments or policies at a
// higher scope, nor data sent to a workspace elsewhere; a key vault is soft-deleted and its name held
// for the retention period (7–90 days, 90 by default).
// source: https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/delete-resource-group
// source: https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview
export const cleanup: Scene = ideFrame(
  'cleanup',
  'risk-on-azure',
  startTree('06', 'tools/cost_ledger.py', ['tools/cost_ledger.py', 'budgets/risk-dev-monthly.json', 'infra/teardown.sh']),
  { file: 'tools/cost_ledger.py', code, show: [[7, 20], [28, 29]], highlight: [11, 28, 29], terminal: session, emulated: false },
  {
    id: 'cleanup-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'budget',
        kind: 'table',
        label: 'budgets/risk-dev-monthly.json',
        headers: ['field', 'value'],
        values: [
          ['amount, grain', '150 USD, monthly'],
          ['filter', 'tag env = dev'],
          ['actual ≥ 80%', 'email priya'],
          ['forecast ≥ 100%', 'email priya'],
        ],
      },
      {
        id: 'not-cap',
        kind: 'list',
        icon: 'bell',
        label: 'A budget is an alarm, not a cap',
        pattern: 'external',
        items: ['It emails; it stops nothing by itself', 'Its filter only sees what is tagged', 'An untagged line is cost with no owner'],
      },
      {
        id: 'left-behind',
        kind: 'list',
        icon: 'trash',
        label: 'Deleting the group leaves behind',
        pattern: 'warn',
        items: [
          'Roles and policies granted above it',
          'Logs sent to a workspace elsewhere',
          'A key vault’s name, held for 90 days',
          'Budgets, which belong to the subscription',
        ],
      },
    ],
  },
)
