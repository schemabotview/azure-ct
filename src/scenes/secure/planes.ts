import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { secureTree } from './tree'
import code from '../../../spine/secure/05-planes/project/tools/access_check.py?raw'
import session from '../../../spine/secure/05-planes/session.txt?raw'

// Control-plane permissions (actions) and data-plane permissions (dataActions) are separate:
// Contributor has no dataActions, so it cannot read blobs with an Entra token — but it includes
// Microsoft.Storage/storageAccounts/listkeys/action, and an account key authorises every data
// operation. Setting allowSharedKeyAccess to false makes Azure Storage refuse shared-key requests.
// The answers come from tools/access_check.py (a model) over the built-in definitions.
// source: https://learn.microsoft.com/en-us/azure/role-based-access-control/role-definitions#control-and-data-actions
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access
// source: https://learn.microsoft.com/en-us/azure/storage/common/shared-key-authorization-prevent
export const planes: Scene = ideFrame(
  'two-planes',
  'risk-on-azure',
  secureTree('05', 'tools/access_check.py', ['tools/planes.py'], ['budgets', 'infra', 'policies/roles']),
  { file: 'tools/access_check.py', code, show: [[36, 50]], highlight: [38, 44, 45, 47], terminal: session, emulated: false },
  {
    id: 'planes-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'two-lists',
        kind: 'table',
        label: 'Two lists in every role',
        headers: ['list', 'covers'],
        values: [
          ['actions', 'managing the resource'],
          ['dataActions', 'reading and writing its data'],
          ['Contributor', 'actions *, dataActions none'],
          ['Blob Data Reader', 'blob read, as a dataAction'],
        ],
      },
      {
        id: 'keys',
        kind: 'list',
        icon: 'key',
        label: 'The back door: account keys',
        pattern: 'warn',
        items: ['Contributor may list the keys', 'A key opens every file', 'So the lake refuses keys (Course 7)'],
      },
      {
        id: 'model',
        kind: 'list',
        icon: 'scale',
        label: 'This is a model',
        pattern: 'network',
        items: ['Real role definitions, word for word', 'Real scope rules', 'No deny assignments, no conditions'],
      },
    ],
  },
)
