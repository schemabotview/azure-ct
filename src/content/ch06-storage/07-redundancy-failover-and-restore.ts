import type { Section } from '../types'

// Ch6 §7. Reference: Azure Storage redundancy; storage account failover; Azure Backup for blobs, files and disks.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Verify current durability and availability figures, which redundancy options each account type offers, and failover data-loss behaviour.
export const redundancyFailoverAndRestore: Section = {
  id: 'redundancy-failover-and-restore',
  title: 'LRS, ZRS, GRS, failover, backups and restore boundaries',
  scene: 'ch06-redundancy',
  focus: 'threats',
  slide: `## Redundancy is not recovery

### Where copies live
- **LRS**: three copies in one datacentre
- **ZRS**: three copies across zones
- **GRS and GZRS**: plus an **asynchronous** copy in another region

### What replication cannot do
- It copies **deletions** and **corruption** too
- Asynchronous geo-copy can **lose recent writes** on failover
- Failover is a **decision**, with consequences

### Matching threat to control
- Hardware loss: **redundancy**
- Mistakes: **versions and soft delete**
- Attack or corruption: **immutable or isolated backups**

### A claim needs proof
- Recoverable means a **tested restore**`,
  narration:
    "We finish the chapter with the most misunderstood word in storage: redundancy. Redundancy keeps extra copies of your data. Locally redundant storage keeps three copies inside one datacentre. Zone-redundant storage keeps three copies across zones. Geo-redundant options add a further copy in another region, and that copy is made asynchronously, so a regional failover can lose the most recent writes. Geo-replication therefore does not mean zero data loss. Now the key distinction, drawn in the bottom card. Replication protects against hardware and site loss. But a replica faithfully copies a deletion, an overwrite or a corruption, because it is just another copy. Each threat needs its own control. Mistakes call for versioning and soft delete. Corruption or an attacker calls for immutable or isolated backups. And for any of them, the claim that data is recoverable is only as good as a tested restore. So when someone says the data is safe because it is geo-redundant, ask what happens after someone deletes it. With persistence settled, we can organise transactional data: databases.",
}
