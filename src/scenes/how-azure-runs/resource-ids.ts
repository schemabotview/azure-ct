import type { Scene } from '@graphlearning/flow'

// A resource ID is the resource's full path in Resource Manager:
// /subscriptions/{id}/resourceGroups/{group}/providers/{namespace}/{type}/{name}[/{child type}/{name}…].
// A storage account's name is also a DNS name, so it is 3–24 lowercase letters and digits and unique
// across all of Azure.
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/resource-name-rules
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/template-functions-resource#resourceid
// source: https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming
const ID = `/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e
  /resourceGroups/rg-risk-prod-data
  /providers/Microsoft.Storage
  /storageAccounts/stwgriskprod
  /blobServices/default
  /containers/landing`

export const resourceIds: Scene = {
  id: 'resource-ids',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'id-side',
      label: 'One name, all the way down',
      bare: true,
      children: [
        { id: 'id-card', kind: 'code', filename: 'resource-id.txt · doc-cited', label: ID, highlight: [4] },
        {
          id: 'id-parts',
          kind: 'table',
          label: 'Read it from the top',
          headers: ['part', 'here', 'says'],
          values: [
            ['subscription', 'aaaa0a0a-…', 'who pays, whose quota'],
            ['resource group', 'rg-risk-prod-data', 'what lives and dies together'],
            ['provider', 'Microsoft.Storage', 'which service handles it'],
            ['type and name', 'storageAccounts/stwgriskprod', 'the resource'],
            ['children', 'blobServices/…/containers/landing', 'a resource inside it'],
          ],
        },
      ],
    },
    {
      id: 'names-side',
      label: 'The platform’s names',
      bare: true,
      children: [
        {
          id: 'names',
          kind: 'table',
          label: 'One rule: type, wg, role, environment',
          headers: ['resource', 'name'],
          values: [
            ['resource group', 'rg-risk-prod-data'],
            ['key vault', 'kv-wg-risk-prod'],
            ['event hubs namespace', 'evh-wg-risk-prod'],
            ['Databricks workspace', 'dbw-wg-risk-prod'],
            ['PostgreSQL server', 'psql-wg-riskmart-prod'],
            ['web app', 'app-wg-exposure-prod'],
            ['storage account', 'stwgriskprod (no hyphens)'],
          ],
        },
        {
          id: 'rules',
          kind: 'list',
          icon: 'tag',
          label: 'Why names matter more than they look',
          pattern: 'user',
          items: [
            'A storage account name is a DNS name: unique across all of Azure',
            'So it allows 3–24 lowercase letters and digits, nothing else',
            'Most names cannot be changed: renaming means recreating',
            'The ID is what scripts, roles and policies point at',
          ],
        },
      ],
    },
  ],
  edges: [],
}
