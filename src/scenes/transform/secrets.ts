import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { transformTree } from './tree'
import code from '../../../spine/transform/04-secrets/project/infra/10-secret-scope.sh?raw'
import session from '../../../spine/transform/04-secrets/session.txt?raw'

// An Azure Key Vault-backed secret scope supports only the vault access policy permission model, not
// Azure RBAC; creating the scope grants Get and List to the AzureDatabricks application. Behind a
// vault firewall, trusted Microsoft services must be allowed (or the control plane's NAT address).
// Secret values printed in a notebook are redacted. Entra ID users and groups reach the workspace
// through the Databricks account (automatic identity management syncs them); a group must be
// assigned to the workspace. The Databricks CLI lines are not checked here (only `az` lines are).
// source: https://learn.microsoft.com/en-us/azure/databricks/security/secrets/
// source: https://kb.databricks.com/en_US/dbsql/permission_denied-error-when-creating-secret-scope
// source: https://learn.microsoft.com/en-us/azure/databricks/admin/users-groups/automatic-identity-management
export const secrets: Scene = ideFrame(
  'dbx-secrets',
  'risk-on-azure',
  transformTree('04', 'infra/10-secret-scope.sh', ['templates/modules/dbxvault.bicep', 'tools/secret_read.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'policies'], ['infra', 'templates', 'templates/modules', 'tools']),
  { file: 'infra/10-secret-scope.sh', code, highlight: [6, 9, 10, 11, 15], pattern: 'warn', terminal: session, emulated: false },
  {
    id: 'dbx-secrets-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'two-vaults',
        kind: 'table',
        label: 'Why a second vault',
        headers: ['', 'kv-wg-risk-prod', 'kv-wg-dbx-prod'],
        values: [
          ['permissions', 'Azure roles', 'access policies'],
          ['secret scope', 'not supported', 'supported'],
          ['holds', 'everything', 'Databricks’ only'],
          ['network', 'private only', 'trusted services'],
        ],
      },
      {
        id: 'people',
        kind: 'list',
        icon: 'users',
        label: 'People in the workspace',
        pattern: 'user',
        items: [
          'Entra groups, synced, never local users',
          'A group is added to the workspace',
          'The scope’s ACL: who reads which secret',
          'A printed secret shows [REDACTED]',
        ],
      },
    ],
  },
)
