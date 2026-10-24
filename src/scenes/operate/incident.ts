import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { operateTree } from './tree'
import code from '../../../spine/operate/07-sas/project/infra/13-revoke-sas.sh?raw'
import session from '../../../spine/operate/07-sas/session.txt?raw'

// A service SAS bound to a stored access policy is revoked by deleting or changing the policy (it
// can take up to 30 seconds to apply); an ad hoc service SAS lives until it expires or the account
// key that signed it is rotated. A stored access policy is not supported for a user-delegation
// SAS: it is revoked by revoking the account's user delegation keys (all of them), or by removing
// the signer's role, since its rights never exceed the signer's. The emulator's tokens are service
// SAS signed with its key; Azurite's 403 code is AuthorizationFailure.
// source: https://learn.microsoft.com/en-us/rest/api/storageservices/define-stored-access-policy
// source: https://learn.microsoft.com/en-us/rest/api/storageservices/create-user-delegation-sas#revoke-a-user-delegation-sas
// source: https://learn.microsoft.com/en-us/cli/azure/storage/account#az-storage-account-revoke-delegation-keys
// source: https://learn.microsoft.com/en-us/azure/storage/common/shared-key-authorization-prevent
export const incident: Scene = ideFrame(
  'leaked-sas',
  'risk-on-azure',
  operateTree('07', 'infra/13-revoke-sas.sh', ['infra/13-revoke-sas.sh', 'tools/sas_incident.py'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'data', 'feeds', 'functions', 'kql', 'policies', 'sql', 'templates'], ['infra', 'tools']),
  { file: 'infra/13-revoke-sas.sh', code, highlight: [10, 13, 17, 18], pattern: 'storage', terminal: session },
  {
    id: 'incident-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'incident-steps',
        kind: 'list',
        icon: 'skull',
        label: 'A token in a vendor ticket',
        pattern: 'warn',
        items: [
          'Detect: the ticket, or Defender',
          'Contain: revoke the delegation keys',
          'Rotate: new tokens, 30 minutes',
          'Look back: StorageBlobLogs',
          'Learn: shorter tokens, no tickets',
        ],
      },
      {
        id: 'who-patches',
        kind: 'table',
        label: 'Who fixes what',
        headers: ['', 'who'],
        values: [
          ['the vendor’s process', 'the vendor'],
          ['tokens and logs', 'the platform team'],
          ['the storage service', 'Microsoft'],
          ['the runtime VMs’ OS', 'the bank'],
        ],
      },
    ],
  },
)
