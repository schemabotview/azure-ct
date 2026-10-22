import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { publishTree } from './tree'
import code from '../../../spine/publish/03-settings/project/templates/modules/app.bicep?raw'
import session from '../../../spine/publish/03-settings/session.txt?raw'

// An App Service app setting can be a Key Vault reference, @Microsoft.KeyVault(VaultName=…;
// SecretName=…) or (SecretUri=…); App Service resolves it with the app's managed identity (or the
// one named in keyVaultReferenceIdentity), which needs permission to read secrets on the vault, and
// re-fetches it periodically. Connections that accept Microsoft Entra tokens (PostgreSQL, Cosmos DB,
// Storage, Service Bus) need no secret at all: the identity is the credential.
// source: https://learn.microsoft.com/en-us/azure/app-service/app-service-key-vault-references
// source: https://learn.microsoft.com/en-us/azure/app-service/overview-managed-identity
export const settings: Scene = ideFrame(
  'settings-without-secrets',
  'risk-on-azure',
  publishTree('03', 'templates/modules/app.bicep', ['tools/settings_check.py', 'app/limits.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'functions', 'infra', 'policies', 'sql'], ['templates', 'templates/modules', 'tools']),
  { file: 'templates/modules/app.bicep', code, show: [[22, 22], [28, 28], [35, 44]], highlight: [28, 36, 38, 40, 41], pattern: 'warn', terminal: session, emulated: false },
  {
    id: 'settings-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'how-it-signs-in',
        kind: 'table',
        label: 'How the API reaches each thing',
        headers: ['thing', 'with'],
        values: [
          ['the risk mart', 'its identity: a token'],
          ['the group lookup', 'its identity: a token'],
          ['the cache', 'its identity: a token'],
          ['the limits system', 'a key, from Key Vault'],
        ],
      },
      {
        id: 'kv-ref',
        kind: 'list',
        icon: 'keyvault',
        label: 'A Key Vault reference',
        pattern: 'warn',
        items: [
          'The setting names the secret, not its value',
          'App Service reads it as id-wg-exposure-prod',
          'That identity needs Key Vault Secrets User',
          'A rotated secret is picked up, no redeploy',
        ],
      },
    ],
  },
)
