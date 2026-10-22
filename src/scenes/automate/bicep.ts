import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { automateTree } from './tree'
import code from '../../../spine/automate/02-bicep/project/templates/modules/network.bicep?raw'
import session from '../../../spine/automate/02-bicep/session.txt?raw'

// Bicep compiles to an ARM template (JSON); Resource Manager deploys the JSON. Each resource names a
// type and an API version, which fixes its properties. A child declared with `parent` waits for its
// parent; `@batchSize(1)` deploys a loop one at a time. In incremental mode (the default) a
// deployment creates or updates what the template declares and leaves everything else alone.
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/loops
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-modes
export const bicep: Scene = ideFrame(
  'bicep-arm',
  'risk-on-azure',
  automateTree('02', 'templates/modules/network.bicep', ['templates/', 'tools/arm_summary.py'], ['budgets', 'infra', 'policies']),
  { file: 'templates/modules/network.bicep', code, show: [[10, 14], [18, 26], [34, 34]], highlight: [10, 18, 19, 21], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'bicep-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'bicep-to-arm',
        kind: 'table',
        label: 'What the Bicep becomes',
        headers: ['in Bicep', 'in the ARM template'],
        values: [
          ['@2025-07-01', 'the API version: its properties'],
          ['parent: vnet', 'a child, after its parent'],
          ['for s in subnets', 'a copy loop, one per subnet'],
          ['@batchSize(1)', 'the loop one at a time'],
          ['output vnetId', 'a value for the next module'],
        ],
      },
      {
        id: 'bicep-owns',
        kind: 'list',
        icon: 'template',
        label: 'A deployment, in incremental mode',
        pattern: 'service',
        items: [
          'Creates what is declared and missing',
          'Updates what is declared and different',
          'Leaves what it does not declare alone',
          'Is recorded: a name, its template, its result',
        ],
      },
    ],
  },
)
