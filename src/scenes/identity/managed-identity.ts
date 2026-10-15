import type { Scene } from '@graphlearning/flow'

// Ch2 §3 — system-assigned identities share their resource's lifecycle; user-assigned ones are
// standalone resources that several workloads can use. Either way the identity still needs a role.
export const managedIdentity: Scene = {
  id: 'managed-identity',
  title: 'Two kinds of managed identity',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'system',
      label: 'System-assigned',
      sub: 'born and deleted with the app',
      pattern: 'service',
      children: [
        { id: 'web', label: 'Web app', pattern: 'service', icon: 'appservice' },
        { id: 'sys-id', label: 'Its own identity', sub: 'one app only', pattern: 'user', icon: 'managedidentity' },
      ],
    },
    {
      id: 'user',
      label: 'User-assigned',
      sub: 'a separate resource',
      pattern: 'group',
      children: [
        { id: 'usr-id', label: 'id-retail', sub: 'own lifecycle', pattern: 'user', icon: 'managedidentity' },
        { id: 'api-app', label: 'Order API', sub: 'uses id-retail', pattern: 'service', icon: 'appservice' },
        { id: 'func', label: 'Function app', sub: 'uses id-retail', pattern: 'service', icon: 'functions' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'app.py',
      label: `from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient

cred = DefaultAzureCredential()   # no secret in code
blobs = BlobServiceClient(
    "https://stcontosoretail.blob.core.windows.net",
    credential=cred,
)`,
    },
    { id: 'storage', label: 'Storage account', sub: 'needs a data role', pattern: 'storage', icon: 'storage' },
  ],
  edges: [
    { source: 'system', target: 'code', label: 'token via' },
    { source: 'user', target: 'code' },
    { source: 'code', target: 'storage', label: 'token, then data' },
  ],
}
