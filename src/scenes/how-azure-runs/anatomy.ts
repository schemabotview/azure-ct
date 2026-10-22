import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import session from '../../../spine/how-azure-runs/04-anatomy/session.txt?raw'

// One read, replayed against the emulator (scripts/spine.py): the CLI's answer, the same call through
// the Python SDK with a hook printing the signed request's parts, then the account itself through
// Resource Manager — which refuses before sending anything, because there is no Entra sign-in. The
// lake is lit on the map although the platform builds it in Course 3: this demo makes its own.
// source: https://learn.microsoft.com/en-us/rest/api/storageservices/authorize-with-shared-key
// source: https://learn.microsoft.com/en-us/rest/api/storagerp/storage-accounts/get-properties
export const anatomy: Scene = mapFrame('request-anatomy', [...BUILT_BY[1], 'lake'], {
  id: 'anatomy-side',
  label: 'side',
  bare: true,
  children: [
    { id: 'anatomy-run', kind: 'terminal', filename: 'Terminal — how-azure-runs · emulated', label: session.replace(/\n+$/, '') },
    {
      id: 'parts',
      kind: 'table',
      label: 'The same file, two planes',
      headers: ['part', 'data plane (sent)', 'control plane (refused)'],
      values: [
        ['address', 'stwgriskprod.blob.core…', 'management.azure.com'],
        ['names', 'container and blob', 'subscription, group, account'],
        ['version', 'x-ms-version 2026-10-06', '?api-version=2025-08-01'],
        ['identity', 'SharedKey: account key', 'Bearer: an Entra token'],
        ['proof', 'HMAC of the request', 'the token’s signature'],
      ],
    },
    {
      id: 'takeaways',
      kind: 'list',
      icon: 'key',
      label: 'What to take from it',
      pattern: 'warn',
      items: [
        'A data-plane call needs no Resource Manager at all',
        'An account key opens every file in the account: Course 7 switches keys off',
        'The control plane only takes Entra tokens; Course 3 signs in',
        'Every request names a version of the contract it expects',
      ],
    },
  ],
})
