import type { Scene, SceneNode } from '@graphlearning/flow'

// Blob Storage is object storage reached over HTTPS (Data Lake Storage adds a hierarchical namespace
// to it); Azure Files is a file share over SMB or NFS; a managed disk is a block device attached to
// one VM. A VM's temporary disk is lost when the VM is deallocated or redeployed; managed disks
// persist, and are deleted with the VM only when their delete option says so. Blob soft delete keeps
// a deleted blob for its retention period; deleting the storage account deletes everything in it.
// source: https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction
// source: https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview#temporary-disk
// source: https://learn.microsoft.com/en-us/azure/virtual-machines/delete
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview
const kind = (id: string, label: string, sub: string, icon: string, pattern: SceneNode['pattern'], items: string[]): SceneNode => ({
  id, label, sub, icon, pattern, kind: 'list', items,
})

export const kinds: Scene = {
  id: 'storage-kinds',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'interfaces',
      label: 'Three ways to store a file',
      bare: true,
      flow: 'LR',
      align: 'start',
      stretch: true,
      children: [
        kind('object', 'Object: Blob Storage', 'the lake · HTTPS', 'blob', 'storage', ['A name and its bytes, whole', 'Read and written over HTTPS', 'Any size, any number', 'The lake: Data Lake Storage']),
        kind('file', 'File: Azure Files', 'a shared drive · SMB', 'file', 'storage', ['Folders, opened and edited in place', 'Mapped as a drive: S:\\collateral', 'Many people, one share', 'The collateral team’s share']),
        kind('block', 'Block: managed disks', 'one machine · its disk', 'vm', 'storage', ['Blocks under a file system', 'Attached to one VM at a time', 'Fast, small, per machine', 'The integration runtime VMs']),
      ],
    },
    {
      id: 'kinds-row',
      label: 'What lasts',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'survives',
          kind: 'table',
          label: 'What survives what',
          headers: ['event', 'what is lost'],
          values: [
            ['a VM restarts', 'nothing'],
            ['a VM is deallocated', 'its temporary disk'],
            ['a VM is deleted', 'its disks, only if set to'],
            ['a blob is deleted', 'nothing for 14 days'],
            ['the storage account is deleted', 'everything in it'],
          ],
        },
        {
          id: 'which',
          kind: 'table',
          label: 'Which the platform uses',
          headers: ['data', 'kind', 'why'],
          values: [
            ['deals, files, the stream', 'object: the lake', 'Spark reads it in parallel'],
            ['the collateral team’s working files', 'file: a share', 'people edit them in place'],
            ['the runtime’s Windows and its logs', 'block: disks', 'a machine needs a disk'],
            ['the filed reports', 'object: locked', 'nobody may change them'],
          ],
        },
      ],
    },
  ],
  edges: [],
}
