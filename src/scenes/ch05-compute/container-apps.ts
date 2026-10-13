import type { Scene } from '@graphlearning/flow'

// Ch5 §5 — Container Apps: revisions are immutable snapshots, traffic can be split between them,
// replicas scale on rules including to zero, and jobs run to completion. Flags per `az containerapp`.
export const containerApps: Scene = {
  id: 'ch05-container-apps',
  title: 'Revisions, ingress, jobs and scaling',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'create',
      kind: 'code',
      filename: 'Cloud Shell',
      label: `az containerapp create -g rg-retail-dev \\
  -n orders-api --environment env-retail \\
  --image contosoacr.azurecr.io/orders-api:1.4.2 \\
  --ingress external --target-port 8000 \\
  --min-replicas 0 --max-replicas 5`,
    },
    {
      id: 'env',
      label: 'Container Apps environment',
      sub: 'shared network and logging',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'rev1', label: 'Revision 1', sub: '80 % of traffic', pattern: 'service', icon: 'containerapps' },
        { id: 'rev2', label: 'Revision 2', sub: '20 % of traffic', pattern: 'warn', icon: 'containerapps' },
        { id: 'ingress', label: 'Ingress', sub: 'HTTPS endpoint', pattern: 'network', icon: 'globe' },
        { id: 'job', label: 'Job', sub: 'runs to completion', pattern: 'storage', icon: 'clock' },
      ],
    },
    {
      id: 'scale',
      label: 'Replicas follow a rule',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'http', label: 'HTTP load', sub: 'concurrent requests', pattern: 'service', icon: 'repeat' },
        { id: 'queue', label: 'Queue length', sub: 'event-driven', pattern: 'service', icon: 'queue' },
        { id: 'zero', label: 'Scale to zero', sub: 'and cold starts', pattern: 'warn', icon: 'power' },
      ],
    },
  ],
  edges: [
    { source: 'create', target: 'env', label: 'deploys into' },
    { source: 'env', target: 'scale', label: 'scaled by' },
  ],
}
