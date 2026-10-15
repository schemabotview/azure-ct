import type { Scene } from '@graphlearning/flow'

// Ch1 §5 — one annotated CLI call, its (trimmed) JSON reply, and the resource ID taken apart.
// Synthetic names; <subscription-id> stays a placeholder. Output is trimmed to the fields taught.
export const firstRequest: Scene = {
  id: 'first-request',
  title: 'A first request and its resource ID',
  flow: 'TB',
  padding: 0.13,
  nodes: [
    {
      id: 'command',
      kind: 'code',
      filename: 'Cloud Shell',
      label: `az account set --subscription contoso-dev
az group create \\
  --name rg-retail-dev \\
  --location swedencentral \\
  --tags env=dev owner=retail`,
    },
    {
      id: 'reply',
      kind: 'code',
      filename: 'reply (trimmed)',
      label: `{
  "id": "/subscriptions/<subscription-id>/resourceGroups/rg-retail-dev",
  "location": "swedencentral",
  "name": "rg-retail-dev",
  "properties": { "provisioningState": "Succeeded" },
  "tags": { "env": "dev", "owner": "retail" }
}`,
    },
    {
      id: 'web-id',
      kind: 'code',
      filename: 'the same idea, for a web app',
      label: `/subscriptions/<subscription-id>
  /resourceGroups/rg-retail-dev
  /providers/Microsoft.Web
  /sites/contoso-shop-dev`,
    },
    {
      id: 'anatomy',
      label: 'Reading a resource ID, left to right',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'id-sub', label: 'subscriptions', sub: 'which bill', pattern: 'group', icon: 'subscription' },
        { id: 'id-rg', label: 'resourceGroups', sub: 'which lifecycle', pattern: 'service', icon: 'resourcegroup' },
        { id: 'id-prov', label: 'providers', sub: 'Microsoft.Web', pattern: 'network', icon: 'gears' },
        { id: 'id-name', label: 'sites', sub: 'type, then name', pattern: 'storage', icon: 'appservice' },
      ],
    },
  ],
  edges: [
    { source: 'command', target: 'reply', label: 'PUT to ARM' },
    { source: 'reply', target: 'web-id', label: 'the id field' },
    { source: 'web-id', target: 'anatomy', label: 'taken apart' },
  ],
}
