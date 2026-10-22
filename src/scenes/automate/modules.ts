import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { automateTree } from './tree'
import code from '../../../spine/automate/03-modules/project/templates/main.bicep?raw'
import session from '../../../spine/automate/03-modules/session.txt?raw'

// A Bicep file's targetScope is resourceGroup (the default), subscription, managementGroup or tenant.
// A module is compiled into a nested deployment, and `scope:` deploys it into another scope — here,
// into resource groups the same subscription-scope file creates. Referring to a resource or to a
// module's output creates the dependency; no dependsOn needs writing.
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/modules
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-to-subscription
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/resource-dependencies
export const modules: Scene = ideFrame(
  'bicep-modules',
  'risk-on-azure',
  automateTree('03', 'templates/main.bicep', ['templates/main.bicep', 'templates/modules/lake.bicep', 'templates/modules/keyvault.bicep'], ['budgets', 'infra', 'policies', 'tools']),
  { file: 'templates/main.bicep', code, show: [[3, 3], [22, 24], [28, 37]], highlight: [3, 22, 23, 31], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'modules-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'scopes',
        kind: 'table',
        label: 'Where a deployment can land',
        headers: ['scope', 'what it deploys'],
        values: [
          ['tenant', 'management groups'],
          ['management group', 'policies, roles'],
          ['subscription', 'resource groups'],
          ['resource group', 'nearly everything else'],
        ],
      },
      {
        id: 'module-rules',
        kind: 'list',
        icon: 'template',
        label: 'A module',
        pattern: 'service',
        items: [
          'Is a Bicep file used by another one',
          'Becomes a nested deployment',
          'Lands in the scope it is given',
          'Waits for whatever it refers to',
          'Is used by dev and prod alike',
        ],
      },
    ],
  },
)
