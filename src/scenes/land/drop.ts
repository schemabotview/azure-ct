import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { landTree } from './tree'
import code from '../../../spine/land/03-drop/project/tools/drop_sas.py?raw'
import session from '../../../spine/land/03-drop/session.txt?raw'

// A SAS grants exactly the permissions and the expiry it is signed with. A user-delegation SAS is
// signed with a user delegation key obtained with Entra ID credentials (valid at most seven days),
// and is the only SAS left when shared key access is disallowed. On an account with a hierarchical
// namespace, Azure RBAC is evaluated first and POSIX-style ACLs on directories and files after it.
// The expired token's error code is the emulator's (Azure returns AuthenticationFailed).
// source: https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview
// source: https://learn.microsoft.com/en-us/rest/api/storageservices/create-user-delegation-sas
// source: https://learn.microsoft.com/en-us/azure/storage/common/shared-key-authorization-prevent
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-access-control-model
export const drop: Scene = ideFrame(
  'drop-sas',
  'risk-on-azure',
  landTree('03', 'tools/drop_sas.py', ['tools/drop_sas.py', 'data/collateral_20261013.csv'], ['.github', 'budgets', 'infra', 'policies', 'templates']),
  { file: 'tools/drop_sas.py', code, show: [[24, 29], [41, 49]], highlight: [28, 29, 43], pattern: 'storage', terminal: session },
  {
    id: 'drop-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'writers',
        kind: 'table',
        label: 'Who may write where',
        headers: ['who', 'by', 'where'],
        values: [
          ['collateral system', 'SAS, 30 min', 'landing'],
          ['adf-wg-risk-prod', 'role', 'landing, bronze'],
          ['Databricks', 'role', 'bronze to gold'],
          ['Risk Analysts', 'role: read', 'gold'],
        ],
      },
      {
        id: 'lake-access',
        kind: 'list',
        icon: 'lock',
        label: 'How the lake decides',
        pattern: 'warn',
        items: [
          'Account keys are off: no key can sign',
          'A SAS is signed with a key from Entra ID',
          'Roles first, then a folder’s ACL',
          'An ACL can open one folder to one identity',
          'A SAS names its rights and its end',
        ],
      },
    ],
  },
)
