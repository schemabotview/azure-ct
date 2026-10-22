import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { transformTree } from './tree'
import code from '../../../spine/transform/03-lake/project/templates/modules/databricks.bicep?raw'
import session from '../../../spine/transform/03-lake/session.txt?raw'

// An Azure Databricks access connector is an Azure resource whose managed identity Unity Catalog uses
// to reach storage: a storage credential is made from it, external locations and managed storage use
// that credential, and Unity Catalog grants decide which users and jobs may use each location. Users
// never get roles on the lake themselves.
// source: https://learn.microsoft.com/en-us/azure/databricks/connect/unity-catalog/cloud-storage/azure-managed-identities
// source: https://learn.microsoft.com/en-us/azure/databricks/connect/unity-catalog/cloud-storage/storage-credentials
export const lake: Scene = ideFrame(
  'dbx-lake',
  'risk-on-azure',
  transformTree('03', 'templates/modules/databricks.bicep', [], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies', 'tools'], ['templates', 'templates/modules']),
  { file: 'templates/modules/databricks.bicep', code, show: [[13, 16], [58, 66]], highlight: [13, 16, 59, 61, 65], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'dbx-lake-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'uc-chain',
        kind: 'table',
        label: 'From Azure role to a reader',
        headers: ['link', 'where'],
        values: [
          ['connector identity', 'Azure: this module'],
          ['Blob Data Contributor', 'Azure: on the lake'],
          ['storage credential', 'Unity Catalog'],
          ['external location', 'Unity Catalog: a path'],
          ['GRANT READ FILES', 'Unity Catalog: a group'],
        ],
      },
      {
        id: 'uc-why',
        kind: 'list',
        icon: 'managedidentity',
        label: 'One identity, many readers',
        pattern: 'user',
        items: [
          'Only the connector holds a lake role',
          'No keys, no SAS in any notebook',
          'Who reads what: Unity Catalog grants',
          'Taking access away is one REVOKE',
        ],
      },
    ],
  },
)
