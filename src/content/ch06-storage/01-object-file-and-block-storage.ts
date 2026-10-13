import type { Section } from '../types'

// Ch6 §1. Reference: Azure Storage introduction; Blob, Files and managed disks overviews.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const objectFileAndBlockStorage: Section = {
  id: 'object-file-and-block-storage',
  title: 'Object, file and block storage',
  scene: 'ch06-storage-kinds',
  focus: 'boundary',
  slide: `## Three kinds of storage

### Object
- Whole **objects** over HTTPS, in a flat namespace
- **Blob Storage**: images, documents, backups, data lakes

### File
- A **shared drive** over SMB or NFS
- **Azure Files**: many clients mount the same share

### Block
- A **disk** a VM formats and mounts
- **Managed disks**: low-latency storage for one machine

### Persistence boundary
- Local disk and memory **vanish** when an instance is replaced
- Anything that must survive belongs in a **storage service**
- Pick by the **interface** your software expects
- Prefer **object storage** for files an app reads and writes by name`,
  narration:
    "The last chapter ended with a promise: compute can be replaced at will, so durable data needs a proper home. Azure storage comes in three shapes, and each is defined by the interface your software uses. Object storage holds whole objects, such as images and documents, which you read and write over HTTPS in a flat namespace. That is Blob Storage, and it is the one we will spend most time on. File storage is a shared drive. Many clients mount the same share over SMB or NFS and see the same files, which is what Azure Files provides. Block storage is a disk. A virtual machine formats it and mounts it, and gets low-latency access for one machine, which is what managed disks provide. The table maps each to our shop. Product images are objects, shared configuration is a file share, and database data files sit on block disks. Now the persistence boundary in the bottom card. Local disk and memory vanish when an instance is replaced. If it must survive, it belongs in a storage service. For files an app reads and writes by name, prefer object storage. Let's open up the most common one.",
}
