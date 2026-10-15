import type { Scene } from '@graphlearning/flow'

// Ch6 §6 — Azure Files is a shared network file system; a managed disk is a block device normally
// attached to ONE VM. A detached disk is still billed and still exists.
export const filesDisks: Scene = {
  id: 'files-disks',
  title: 'A shared drive and a private disk',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'files',
      label: 'Azure Files share',
      sub: 'SMB or NFS · many clients at once',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'c1', label: 'App instance 1', sub: 'mounts the share', pattern: 'service', icon: 'appservice' },
        { id: 'c2', label: 'App instance 2', sub: 'mounts the share', pattern: 'service', icon: 'appservice' },
        { id: 'c3', label: 'Admin VM', sub: 'mounts the share', pattern: 'service', icon: 'vm' },
      ],
    },
    {
      id: 'disks',
      label: 'Managed disk',
      sub: 'block storage · one VM at a time',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'vm', label: 'vm-orders-01', sub: 'the disk is attached', pattern: 'service', icon: 'vm' },
        { id: 'disk', label: 'data disk', sub: 'persistent block device', pattern: 'storage', icon: 'disk' },
      ],
    },
    {
      id: 'life',
      label: 'A disk lifecycle',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l1', label: 'Create', sub: 'size and type', pattern: 'service', icon: 'disk' },
        { id: 'l2', label: 'Attach', sub: 'to one VM', pattern: 'service', icon: 'link' },
        { id: 'l3', label: 'Snapshot', sub: 'a point in time', pattern: 'storage', icon: 'snapshot' },
        { id: 'l4', label: 'Delete', sub: 'or it keeps billing', pattern: 'warn', icon: 'trash' },
      ],
    },
  ],
  edges: [
    { source: 'files', target: 'disks', label: 'versus' },
    { source: 'disks', target: 'life', label: 'lasts as long as you keep it' },
  ],
}
