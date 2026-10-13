import type { Scene } from '@graphlearning/flow'

// Ch9 §5 — three analytics platforms with different control surfaces. Fabric is a SaaS product with
// its own tenant/workspace/capacity model, not an Azure resource service. Product direction changes
// quickly; the table states the shape of each, not a recommendation.
export const productChoice: Scene = {
  id: 'ch09-product-choice',
  title: 'Synapse, Databricks and Fabric',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'products',
      kind: 'table',
      label: 'Three platforms',
      headers: ['Product', 'Shape', 'Governed through'],
      values: [
        ['Azure Synapse', 'Azure resource: SQL, Spark, pipelines', 'subscription, RBAC'],
        ['Azure Databricks', 'Azure resource: Spark lakehouse', 'workspace, Unity Catalog'],
        ['Microsoft Fabric', 'SaaS: one platform on OneLake', 'tenant, workspace, capacity'],
      ],
    },
    {
      id: 'surfaces',
      label: 'Different places to look for the bill and the access',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'azure-side', label: 'Azure resources', sub: 'subscription, resource group, RBAC', pattern: 'service', icon: 'subscription' },
        { id: 'fabric-side', label: 'Fabric', sub: 'tenant settings, workspaces, capacity', pattern: 'network', icon: 'cloud' },
        { id: 'companion', label: 'Databricks', sub: 'a specialist companion subject', pattern: 'storage', icon: 'databricks' },
      ],
    },
  ],
  edges: [{ source: 'products', target: 'surfaces', label: 'so' }],
}
