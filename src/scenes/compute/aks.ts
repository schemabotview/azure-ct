import type { Scene } from '@graphlearning/flow'

// Ch5 §6 — AKS: Azure runs the control plane, you run what is above it (node pools, upgrades,
// workloads, policy). The manifest is a minimal Deployment; image tag matches the registry example.
export const aks: Scene = {
  id: 'aks',
  title: 'What AKS adds, and what it asks of you',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'manifest',
      kind: 'code',
      filename: 'deployment.yaml',
      label: `apiVersion: apps/v1
kind: Deployment
metadata: { name: orders-api }
spec:
  replicas: 3
  selector: { matchLabels: { app: orders-api } }
  template:
    metadata: { labels: { app: orders-api } }
    spec:
      containers:
        - name: api
          image: contosoacr.azurecr.io/orders-api:1.4.2`,
    },
    {
      id: 'cluster',
      label: 'An AKS cluster',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'control', label: 'Control plane', sub: 'run by Azure', pattern: 'network', icon: 'aks' },
        { id: 'nodes', label: 'Node pools', sub: 'VMs you size and upgrade', pattern: 'service', icon: 'vmss' },
        { id: 'pods', label: 'Pods', sub: 'your workloads', pattern: 'storage', icon: 'boxes' },
        { id: 'add-ons', label: 'Add-ons', sub: 'ingress, policy, monitoring', pattern: 'warn', icon: 'wrench' },
      ],
    },
    { id: 'worth', label: 'Choose AKS when', sub: 'you need Kubernetes itself', pattern: 'user', icon: 'search' },
  ],
  edges: [
    { source: 'manifest', target: 'cluster', label: 'applied to' },
    { source: 'cluster', target: 'worth', label: 'justified only if' },
  ],
}
