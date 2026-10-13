import type { Section } from '../types'

// Ch10 §6. Reference: Zero-downtime database migration (expand and contract); App Service slots and traffic routing; canary releases.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const slotsCanariesRollbackAndSchema: Section = {
  id: 'slots-canaries-rollback-and-schema',
  title: 'Slots, canaries, rollback, schema compatibility and stateful changes',
  scene: 'ch10-schema-rollback',
  focus: 'steps',
  slide: `## Releasing safely

### Rolling back code
- A **slot swap** or a **traffic shift** reverts the **application**
- It does **not** revert the **database**

### Expand and contract
- **Expand**: add the new column, keeping the old one
- **Release**: the new version uses both
- **Contract**: drop the old column **only after** the old version is gone

### Canaries
- Send a **small percentage** of traffic first
- Watch **errors and latency** before widening
- **Feature flags** separate deploying from releasing

### The rule
- Every schema change must work with **two adjacent versions**
- After the **contract** step, an app rollback no longer helps`,
  narration:
    "Releasing software is riskier than deploying infrastructure, because software changes have to coexist with state. Start with what a rollback does. A slot swap or a traffic shift reverts the application code. It does not revert the database. If version thirteen has already changed the schema, putting version twelve back in front of it may fail. The answer is to make schema changes in steps, called expand and contract. The table shows renaming a column. First, expand: add the new column and keep the old one, so version twelve still works. Second, release version thirteen, which uses both columns, and fill the new one. Third, verify that only version thirteen is running. Only then, in the fourth step, contract: drop the old column. After that last step, an application rollback no longer restores the old behaviour, because the old column is gone. Alongside this, use canaries. Send a small percentage of traffic to the new version first and watch errors and latency before widening it. Feature flags help too, because they separate deploying code from releasing it. The rule behind it all is that every schema change must work with two adjacent application versions. Last, how a build moves between environments.",
}
