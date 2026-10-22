import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { batchTree } from './tree'
import code from '../../../spine/batch/08-secrets/project/adf/linkedService/ls_tradebook.json?raw'
import session from '../../../spine/batch/08-secrets/session.txt?raw'

// A linked service can take a secret from Key Vault (AzureKeyVaultSecret) instead of storing it; the
// factory reads it with its managed identity, which needs a data-plane role on the vault (Key Vault
// Secrets User, with RBAC authorization). A linked service with no credential to the lake uses the
// factory's system-assigned identity. Contributor cannot create role assignments; Role Based Access
// Control Administrator with a condition can be limited to assigning named roles only.
// source: https://learn.microsoft.com/en-us/azure/data-factory/store-credentials-in-key-vault
// source: https://learn.microsoft.com/en-us/azure/data-factory/data-factory-service-identity
// source: https://learn.microsoft.com/en-us/azure/role-based-access-control/delegate-role-assignments-overview
// source: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/privileged#role-based-access-control-administrator
export const secrets: Scene = ideFrame(
  'pipeline-secrets',
  'risk-on-azure',
  batchTree('08', 'adf/linkedService/ls_tradebook.json', ['templates/modules/factory.bicep', 'infra/08-deploy-can-assign.sh'], ['.github', 'budgets', 'contracts', 'data', 'policies', 'tools', 'adf/dataset', 'adf/pipeline', 'adf/trigger'], ['infra', 'templates', 'templates/modules']),
  { file: 'adf/linkedService/ls_tradebook.json', code, show: [[7, 19], [22, 23]], highlight: [10, 13, 14, 16, 19, 23], pattern: 'warn', terminal: session, emulated: false },
  {
    id: 'secrets-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'factory-roles',
        kind: 'table',
        label: 'What the factory’s identity holds',
        headers: ['role', 'on'],
        values: [
          ['Key Vault Secrets User', 'kv-wg-risk-prod'],
          ['Storage Blob Data Contributor', 'landing'],
          ['Storage Blob Data Contributor', 'bronze'],
        ],
      },
      {
        id: 'secret-rules',
        kind: 'list',
        icon: 'keyvault',
        label: 'No password in the factory',
        pattern: 'warn',
        items: [
          'The lake: the factory’s own identity',
          'TradeBook: a password, kept in Key Vault',
          'Rotated in Key Vault; nothing redeployed',
          'Role assignments are in factory.bicep',
          'The deployer may grant these two roles only',
        ],
      },
    ],
  },
)
