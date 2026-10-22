import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { automateTree } from './tree'
import code from '../../../spine/automate/04-params/project/templates/prod.bicepparam?raw'
import session from '../../../spine/automate/04-params/session.txt?raw'

// A .bicepparam file names its template with `using` and gives each parameter a value. getSecret()
// compiles to a Key Vault reference: Resource Manager reads the secret during the deployment, into a
// parameter marked @secure(), whose value is not kept in the deployment history. The vault must
// allow template deployment, and whoever deploys needs Microsoft.KeyVault/vaults/deploy/action.
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/parameter-files
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/key-vault-parameter
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/parameters#secure-parameters
export const params: Scene = ideFrame(
  'bicep-params',
  'risk-on-azure',
  automateTree('04', 'templates/prod.bicepparam', ['templates/prod.bicepparam', 'templates/dev.bicepparam', 'templates/modules/runtime.bicep'], ['budgets', 'infra', 'policies', 'tools']),
  { file: 'templates/prod.bicepparam', code, show: [[1, 6], [10, 10], [13, 19]], highlight: [1, 4, 17, 18, 19], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'params-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'prod-dev',
        kind: 'table',
        label: 'One template, two parameter files',
        headers: ['', 'prod', 'dev'],
        values: [
          ['env', 'prod', 'dev'],
          ['address space', '10.110.0.0/20', '10.120.0.0/20'],
          ['subscription', 'risk-prod', 'risk-dev'],
          ['password from', 'kv-wg-risk-prod', 'kv-wg-risk-dev'],
        ],
      },
      {
        id: 'secret-path',
        kind: 'list',
        icon: 'keyvault',
        label: 'Where the password is',
        pattern: 'warn',
        items: [
          'In Key Vault, put there once by a person',
          'Not in the repository: only its name is',
          'Read by Resource Manager while deploying',
          '@secure(): not kept in the history',
          'The vault allows template deployment',
        ],
      },
    ],
  },
)
