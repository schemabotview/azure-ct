import type { Scene } from '@graphlearning/flow'

// Ch11 §5 — a secret rotation that breaks: the order of steps matters, and a vault is itself a
// dependency (at startup, and for customer-managed keys). Steps are illustrative.
export const keyVaultRotation: Scene = {
  id: 'key-vault-rotation',
  title: 'A secret rotation that goes wrong',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'Rotating the database password',
      headers: ['Step', 'Done', 'Result'],
      values: [
        ['1', 'database password changed', 'old value rejected'],
        ['2', 'app still holds the old secret', 'logins fail'],
        ['3', 'vault updated, app not restarted', 'still failing'],
        ['4', 'app re-reads the vault', 'recovers'],
      ],
    },
    {
      id: 'vault',
      label: 'Key Vault',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'v-secret', label: 'Secrets', sub: 'passwords, tokens', pattern: 'storage', icon: 'key' },
        { id: 'v-key', label: 'Keys', sub: 'for encryption', pattern: 'service', icon: 'lock' },
        { id: 'v-cert', label: 'Certificates', sub: 'with renewal', pattern: 'network', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'deps',
      label: 'The vault is a dependency',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'dep1', label: 'At startup', sub: 'unreachable means no start', pattern: 'warn', icon: 'power' },
        { id: 'dep2', label: 'Customer-managed key', sub: 'disabled key, data unreadable', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'timeline', target: 'vault', label: 'secrets live in' },
    { source: 'vault', target: 'deps', label: 'and so' },
  ],
}
