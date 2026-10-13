import type { Scene } from '@graphlearning/flow'

// Ch2 §5 — one principal, one storage account, two different authorisation systems. Contributor is
// a management role; reading blob contents needs a data role. (Contributor can list account keys,
// which is a separate route to the data — see the slide.) The error text is paraphrased.
export const controlDataPlane: Scene = {
  id: 'ch02-control-data-plane',
  title: 'Management access is not data access',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    { id: 'priya', label: 'Priya', sub: 'Contributor on the account', pattern: 'user', icon: 'users' },
    {
      id: 'planes',
      label: 'Same storage account, two doors',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'control', label: 'Control plane', sub: 'create, configure, delete', pattern: 'network', icon: 'gears' },
        { id: 'data', label: 'Data plane', sub: 'read and write blobs', pattern: 'storage', icon: 'blob' },
        { id: 'ok', label: 'Container created', sub: 'allowed by Contributor', pattern: 'service', icon: 'shieldcheck' },
        { id: 'denied', label: 'Blob read refused', sub: 'HTTP 403', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'error',
      kind: 'code',
      filename: 'az storage blob download (trimmed)',
      label: `az storage blob download --auth-mode login ...

# HTTP 403  AuthorizationPermissionMismatch
# error text paraphrased: this identity has
# no data action that allows reading blobs`,
    },
    { id: 'fix', label: 'Blob Data Reader', sub: 'a data role, at the account', pattern: 'user', icon: 'roles' },
  ],
  edges: [
    { source: 'priya', target: 'planes', label: 'two requests' },
    { source: 'planes', target: 'error', label: 'the second returns' },
    { source: 'error', target: 'fix', label: 'fixed by' },
  ],
}
