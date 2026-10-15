import type { Section } from '../types'

// Ch7 §5. Reference: Azure SQL high availability, read scale-out and backups; PostgreSQL flexible server HA and read replicas.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Retention periods, replica lag behaviour, and restore options are service-specific; none are quoted. Confirm for the chosen service and tier.
export const availabilityReplicasBackupsAndRestore: Section = {
  id: 'availability-replicas-backups-and-restore',
  title: 'Availability, read replicas, backups and restore',
  scene: 'availability',
  focus: 'lag',
  slide: `## Three different tools

### High availability
- Keeps the database running when a **node or zone** fails
- It does **not** protect against a bad change

### Read replicas
- A copy for **extra read capacity**
- **Asynchronous**: a read just after a write can be **stale**
- Reads that must be fresh go to the **primary**

### Backups
- **Point-in-time restore** brings back data from before a mistake
- Restore creates a **new** database; practise it
- Time a restore against your **recovery target**
- A replica is **not** a backup

### Know your service
- Behaviour and retention are **service-specific**`,
  narration:
    "Three tools get confused because they all involve extra copies, but each answers a different question. High availability keeps the database running when a node or even a whole zone fails. It is about continuity. It does not protect you from someone running a bad update, because the bad update is replicated too. A read replica is a copy that serves reads, which helps when the primary is overwhelmed by queries. But replicas are asynchronous, so a replica can be a little behind. The table traces the effect. At zero seconds the price is set to twenty on the primary. At four tenths of a second a shopper reads from the replica and still sees eighteen. By one point two seconds it catches up. That is fine for a catalogue page and wrong for checking out. Reads that must be fresh go to the primary. Backups answer the third question: how do I get back to before the mistake? Point-in-time restore brings back an earlier state, usually into a new database, so practise it, and time it against your recovery target. A replica is not a backup. Every managed service differs in its retention and behaviour, so check yours. Now a different model: Cosmos DB.",
}
