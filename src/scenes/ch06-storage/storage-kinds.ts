import type { Scene } from '@graphlearning/flow'

// Ch6 §1 — three storage interfaces and where each sits relative to the compute that uses it. The
// persistence boundary is the point: local instance storage is not durable.
export const storageKinds: Scene = {
  id: 'ch06-storage-kinds',
  title: 'Object, file and block storage',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'kinds',
      kind: 'table',
      label: 'Three interfaces, three jobs',
      headers: ['Kind', 'Azure service', 'You use it as', 'Shop example'],
      values: [
        ['Object', 'Blob Storage', 'HTTPS objects', 'product images'],
        ['File', 'Azure Files', 'a shared drive', 'shared config files'],
        ['Block', 'Managed disks', 'a VM disk', 'database data files'],
      ],
    },
    {
      id: 'boundary',
      label: 'What survives an instance being replaced',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'local', label: 'Local disk or memory', sub: 'gone with the instance', pattern: 'warn', icon: 'ban' },
        { id: 'durable', label: 'A storage service', sub: 'outlives the instance', pattern: 'storage', icon: 'database' },
      ],
    },
  ],
  edges: [{ source: 'kinds', target: 'boundary', label: 'persistence' }],
}
