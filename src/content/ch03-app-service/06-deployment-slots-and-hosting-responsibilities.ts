import type { Section } from '../types'

// Ch3 §6. Reference: App Service deployment slots, swap and traffic routing; App Service security and shared responsibility.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Slot counts and eligibility depend on the pricing tier; confirm before relying on them.
export const deploymentSlotsAndHostingResponsibilities: Section = {
  id: 'deployment-slots-and-hosting-responsibilities',
  title: 'Deployment slots and managed-hosting responsibilities',
  scene: 'ch03-slots',
  focus: 'swap',
  slide: `## Releasing without a gap

### Slots
- A slot is a **live copy** with its own hostname
- Both slots share the **plan's resources**
- They need a **qualifying tier**

### Swapping
- **Test** the staging hostname, then let it **warm up**
- Then **routing flips**
- Roll back by swapping **again**
- **Sticky settings** stay with their slot

### Limits of a swap
- It moves **code**, not **database changes**
- Traffic can also be split by **percentage** for a canary

### Who runs what on App Service
- Azure patches the **OS and platform**
- You own your **code, dependencies, settings and access**`,
  narration:
    "Deploying straight over a live app means a moment of risk. Deployment slots remove most of it. A slot is a live copy of the app with its own hostname. In the table, production runs version twelve and serves every customer, while staging runs version thirteen with a test value for the catalogue address and no traffic. Both slots share the same plan, so they use the same instances. We deploy to staging, test it there, and let the platform warm it up. Then a swap flips the routing: staging becomes production, and the old production code sits in the other slot. If something is wrong, swapping again is the rollback. Settings marked as sticky stay with their slot, which is how staging keeps its own test values. Two cautions. A swap moves code, not database changes, so a schema change needs its own care, which we return to in the delivery chapter. And slots need a qualifying tier. Finally, remember the division of work. Azure patches the operating system and the platform, but your code, your dependencies, your settings and your access remain yours. Next: the network path behind all of this.",
}
