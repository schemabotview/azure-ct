import type { Scene } from '@graphlearning/flow'

// Ch5 §2 — a VM is an image + disks + a NIC + a size. Stopped-from-inside-the-OS still bills; only a
// DEALLOCATED VM stops compute charges, and disks bill either way. Names and image alias synthetic.
export const vm: Scene = {
  id: 'vm',
  title: 'A virtual machine and its lifecycle',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'create',
      kind: 'code',
      filename: 'Cloud Shell',
      label: `az vm create -g rg-retail-dev -n vm-orders-01 \\
  --image Ubuntu2204 --size Standard_B2s \\
  --admin-username azureuser --generate-ssh-keys \\
  --public-ip-address ""`,
    },
    {
      id: 'parts',
      label: 'vm-orders-01',
      sub: 'what the VM is made of',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'image', label: 'Image', sub: 'the starting OS', pattern: 'storage', icon: 'gallery' },
        { id: 'size', label: 'Size', sub: 'CPU and memory', pattern: 'service', icon: 'cpu' },
        { id: 'disk', label: 'Managed disks', sub: 'OS and data', pattern: 'storage', icon: 'disk' },
        { id: 'nic', label: 'Network interface', sub: 'private IP only', pattern: 'network', icon: 'nic' },
      ],
    },
    {
      id: 'life',
      label: 'Lifecycle and what still bills',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'running', label: 'Running', sub: 'compute and disks', pattern: 'service', icon: 'power' },
        { id: 'stopped', label: 'Stopped in the OS', sub: 'compute still billed', pattern: 'warn', icon: 'ban' },
        { id: 'dealloc', label: 'Deallocated', sub: 'disks only', pattern: 'storage', icon: 'disk' },
      ],
    },
  ],
  edges: [
    { source: 'create', target: 'parts', label: 'builds' },
    { source: 'parts', target: 'life', label: 'goes through' },
  ],
}
