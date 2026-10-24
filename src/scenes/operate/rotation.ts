import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { operateTree } from './tree'
import code from '../../../spine/operate/05-rotate/project/tools/rotate_secret.py?raw'
import session from '../../../spine/operate/05-rotate/session.txt?raw'

// A secret in Key Vault has versions; a reference without a version (as ls_tradebook.json's) reads
// the current one on each use. Rotating a credential that a running service holds is done with two
// sets of credentials, alternately (Key Vault's dual-credential rotation tutorial): the new
// password goes on the login that is NOT in use. Key Vault raises SecretNearExpiry to Event Grid.
// PostgreSQL ends no open session when a password changes; it checks passwords at connection. The
// run is local PostgreSQL 16 over TCP (scram-sha-256), with a dict standing in for the vault.
// Storage encryption is always on; with a customer-managed key in Key Vault (soft delete and purge
// protection required) the bank rotates it and can revoke access to the data.
// source: https://learn.microsoft.com/en-us/azure/key-vault/secrets/tutorial-rotation-dual
// source: https://learn.microsoft.com/en-us/azure/key-vault/general/event-grid-overview
// source: https://learn.microsoft.com/en-us/azure/storage/common/customer-managed-keys-overview
// source: https://www.postgresql.org/docs/16/sql-alterrole.html
export const rotation: Scene = ideFrame(
  'key-rotation',
  'risk-on-azure',
  operateTree('05', 'tools/rotate_secret.py', ['tools/rotate_secret.py'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'data', 'feeds', 'functions', 'infra', 'kql', 'policies', 'sql', 'templates'], ['tools']),
  { file: 'tools/rotate_secret.py', code, show: [[40, 52]], highlight: [41, 42, 45, 46, 50], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'rotation-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'two-logins',
        kind: 'list',
        icon: 'key',
        label: 'Two logins, in turn',
        pattern: 'service',
        items: [
          'The vault holds the login in use',
          'Rotate: new password on the other',
          'Then point the secret at it',
          'Old copies keep working till next time',
        ],
      },
      {
        id: 'cmk',
        kind: 'table',
        label: 'Who holds the storage key',
        headers: ['', 'Microsoft', 'the bank (CMK)'],
        values: [
          ['the key lives', 'Microsoft', 'its Key Vault'],
          ['rotation', 'automatic', 'the bank’s'],
          ['revoke it', 'no', 'yes: data unreadable'],
          ['can be lost', 'no', 'yes: purge protection'],
        ],
      },
    ],
  },
)
