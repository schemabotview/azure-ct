import type { Section } from '../types'

// Ch12 §6. Reference: Azure Cloud Adoption Framework migration guidance; architecture decision records.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const migrationCutoverAndDecisionRecords: Section = {
  id: 'migration-cutover-and-decision-records',
  title: 'Migration, cutover, regional evolution and architecture decision records',
  scene: 'migration-adr',
  focus: 'phases',
  slide: `## Changing a running system

### Staged cutover
- **Build** the new stack beside the old
- **Shadow** traffic and **reconcile** results
- **Canary** a small share of real traffic
- **Cut over** writes, then **retire** the old

### Point of no return
- Rollback is easy until the new system owns the **data**
- After that you need a **data plan**, not just a redeploy

### Moving the data
- **Bulk copy** first, then **sync changes** until cutover

### Regional evolution
- Adding a region is a **design**, not a switch
- Test **failover and failback**

### Decision records
- Write **context, decision, consequences**
- Note **when to revisit** it`,
  narration:
    "Moving a running system is a sequence of reversible steps, with one step that is not. The table lays out a staged cutover for the order API. First, build the new stack beside the old one. Second, shadow it: send it a copy of traffic and reconcile its results against the old stack. Third, send a small share of real traffic as a canary. Fourth, cut over, so the new stack owns the writes. And finally retire the old one. Notice the rollback column. Until the cutover, you can return easily. After the new system owns the data, going back needs a data plan, not just a redeploy, and after retirement you cannot go back at all. Plan for that point of no return before you reach it, copy data in bulk and then sync changes until cutover, and reconcile the totals. Expanding to another region is a design exercise too, not a switch, and failover and failback both need testing. Finally, record the decision. An architecture decision record, like the one in the card, captures the context, the decision and its consequences, and says when to revisit it. Months later, nobody needs to guess why a choice was made. The last section pulls everything together.",
}
