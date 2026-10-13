import type { Section } from '../types'

// Ch6 §6. Reference: Azure Files introduction; Azure managed disks overview; disk snapshots.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm protocols and performance tiers for Azure Files, and which disk types support shared disks and zone redundancy.
export const azureFilesAndManagedDisks: Section = {
  id: 'azure-files-and-managed-disks',
  title: 'Azure Files and managed disks',
  scene: 'ch06-files-disks',
  focus: 'disks',
  slide: `## A shared drive and a private disk

### Azure Files
- A **managed file share**, mounted over **SMB** or **NFS**
- Many clients **share** the same files at once
- Good for shared config, **lift-and-shift** file servers
- Supports **share snapshots** and backup

### Managed disks
- **Block** storage, normally attached to **one VM** at a time
- Different **disk types** trade cost for performance
- A disk is **persistent**: it outlives the VM

### Lifecycle
- **Snapshots** capture a point in time
- A **detached disk** still exists and still **bills**

### Choosing
- Many clients, one namespace: **Files**
- One machine, low latency: **a disk**`,
  narration:
    "Two other storage services complete the picture. Azure Files is a managed file share. Clients mount it over SMB or NFS, and many of them can use it at once, which is what the three clients in the diagram do. It is a good fit for shared configuration, or for moving an old file server to the cloud without rewriting it. A managed disk is different. It is block storage, and it is normally attached to one virtual machine at a time, which formats it and mounts it like a local drive. Disks come in types that trade cost for performance, and a disk is persistent, so it outlives the machine it was attached to. Look at the lifecycle in the bottom card. You create a disk, attach it, snapshot it to capture a point in time, and eventually delete it. The last step is the one people forget, because a detached disk still exists and still bills, as in our cost ledger from the first chapter. To choose, ask about sharing. Many clients with one namespace point to Files. One machine that needs low latency points to a disk. Finally, how many copies, and where?",
}
