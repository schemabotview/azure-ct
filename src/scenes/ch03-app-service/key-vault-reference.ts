import type { Scene } from '@graphlearning/flow'

// Ch3 §4 — a Key Vault reference lets the PLATFORM fetch a secret with the app's managed identity and
// expose it as an app setting. Both the identity's role and the vault's reachability must be right; a
// failed reference leaves the app seeing the reference text, not the secret.
export const keyVaultReference: Scene = {
  id: 'ch03-key-vault-reference',
  title: 'A secret the app never stores',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'setting',
      kind: 'code',
      filename: 'app setting DB_PASSWORD',
      label: `@Microsoft.KeyVault(
  SecretUri=https://kv-contoso-retail.vault.azure.net/secrets/db-password/
)`,
    },
    {
      id: 'platform',
      label: 'App Service platform',
      sub: 'resolves the reference',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'identity', label: 'Managed identity', sub: 'proves who the app is', pattern: 'user', icon: 'managedidentity' },
        { id: 'role', label: 'Secrets User role', sub: 'granted on the vault', pattern: 'user', icon: 'roles' },
      ],
    },
    { id: 'vault', label: 'Key Vault', sub: 'holds the secret', pattern: 'storage', icon: 'keyvault' },
    { id: 'process', label: 'App process', sub: 'reads an environment variable', pattern: 'service', icon: 'appservice' },
  ],
  edges: [
    { source: 'setting', target: 'platform', label: 'read by' },
    { source: 'platform', target: 'vault', label: 'fetches' },
    { source: 'vault', target: 'process', label: 'value delivered' },
  ],
}
