import type { Section } from '../types'

// Ch6 §5. Reference: Blob access tiers; lifecycle management policies; blob versioning; soft delete; immutable storage.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm tier names and minimum retention periods, archive rehydration times, and the lifecycle policy schema.
export const accessTiersVersioningAndImmutability: Section = {
  id: 'access-tiers-versioning-and-immutability',
  title: 'Access tiers, lifecycle, versioning, soft delete and immutable retention',
  scene: 'ch06-protection',
  focus: 'events',
  slide: `## Tiers, versions and deletes

### Access tiers
- **Hot**, **Cool**, **Cold**, **Archive**: cheaper to store, dearer to read
- **Archive** is offline; reading means **rehydrating** for hours
- Moving or deleting early can incur **early-deletion charges**
- A **lifecycle rule** moves blobs by age automatically

### Versioning and soft delete
- **Versioning** keeps previous versions of a blob
- **Soft delete** keeps deleted data for a **retention period**
- Both protect against **mistakes**, and both **still bill**

### Immutable retention
- **WORM** storage cannot be changed or deleted until the period ends
- Policies can be **time-based** or a **legal hold**
- Soft delete is **not** immutability`,
  narration:
    "Data has a life, and Azure gives you controls for each stage. First, access tiers. Hot is for frequently used data. Cool, cold and archive are progressively cheaper to store but more expensive to read, and archive is offline, so reading it means rehydrating it, which can take hours. Rather than moving blobs by hand, a lifecycle rule does it by age. The card moves anything under receipts to cool after thirty days and to archive after one hundred and eighty. Second, protection against our own mistakes. The table follows a blob over four days. Versioning keeps the old content when it is overwritten, and soft delete keeps a deleted blob for a retention period, so on day three we can undelete it. Be honest about what that covers. Both protect against mistakes. A person with enough permission can still remove versions and soft-deleted data. For stronger guarantees, immutable storage stores data in a write-once, read-many way, so it cannot be changed or deleted until the retention period ends. Remember that versions and soft-deleted data still cost money. Now, the other storage shapes.",
}
