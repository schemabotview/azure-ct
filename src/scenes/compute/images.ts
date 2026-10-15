import type { Scene } from '@graphlearning/flow'

// Ch5 §4 — a container image is a build artefact; the registry is where trust is decided. Pin by
// digest, control who can push, let workloads PULL with a managed identity. Names synthetic.
export const images: Scene = {
  id: 'images',
  title: 'From Dockerfile to registry to workload',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'dockerfile',
      kind: 'code',
      filename: 'Dockerfile',
      label: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]`,
    },
    {
      id: 'acr',
      label: 'Azure Container Registry',
      sub: 'contosoacr.azurecr.io',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'tag', label: 'orders-api:1.4.2', sub: 'a tag can move', pattern: 'warn', icon: 'tag' },
        { id: 'digest', label: 'Digest', sub: 'immutable content ID', pattern: 'storage', icon: 'hash' },
      ],
    },
    {
      id: 'trust',
      label: 'Supply-chain boundaries',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'push', label: 'Who may push', sub: 'AcrPush, few people', pattern: 'user', icon: 'roles' },
        { id: 'scan', label: 'Scan and sign', sub: 'before it runs', pattern: 'network', icon: 'search' },
        { id: 'pull', label: 'Who may pull', sub: 'AcrPull identity', pattern: 'service', icon: 'managedidentity' },
      ],
    },
  ],
  edges: [
    { source: 'dockerfile', target: 'acr', label: 'build and push' },
    { source: 'acr', target: 'trust', label: 'guarded by' },
  ],
}
