import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/transform/01-workspace/project/templates/modules/databricks.bicep?raw'

// An Azure Databricks workspace is an Azure resource (Microsoft.Databricks/workspaces) with a managed
// resource group that Databricks owns and locks (deny assignment): its storage account for the
// workspace's own files and, without VNet injection, its network. Premium is required for Unity
// Catalog-era features such as private link and role-based controls. Notebooks, Spark, Delta,
// Unity Catalog grants and jobs are the subject of databricks-data-engineer-ct.
// source: https://learn.microsoft.com/en-us/azure/databricks/getting-started/
// source: https://learn.microsoft.com/en-us/azure/databricks/security/network/classic/vnet-inject
// source: https://learn.microsoft.com/en-us/azure/templates/microsoft.databricks/workspaces
export const workspace: Scene = mapFrame('dbx-workspace', [...BUILT_BY[9], 'dbx'], {
  id: 'workspace-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'workspace-code', kind: 'code', filename: 'templates/modules/databricks.bicep', label: code.replace(/\n+$/, ''), show: [[13, 35]], highlight: [13, 22, 25, 26, 29, 32], pattern: 'service' },
    {
      id: 'azure-creates',
      kind: 'table',
      label: 'What deploying it creates',
      headers: ['resource', 'owned by'],
      values: [
        ['the workspace, dbw-wg-risk-prod', 'the bank'],
        ['rg-dbw-wg-risk-prod-managed', 'Databricks: locked'],
        ['  its storage, for the workspace', 'Databricks'],
        ['  cluster VMs, while they run', 'Databricks, billed to the bank'],
        ['the access connector', 'the bank'],
      ],
    },
    {
      id: 'scope-split',
      kind: 'table',
      label: 'This course and the Databricks course',
      headers: ['here (Azure)', 'there (Databricks)'],
      values: [
        ['workspace, network, identity', 'notebooks, Spark, Delta'],
        ['the lake’s roles, Key Vault', 'Unity Catalog grants'],
        ['VMs, quotas, the bill', 'jobs, Auto Loader, Lakeflow'],
      ],
    },
  ],
})
