import type { Section } from '../types'

// Ch11 §9. Reference: Azure reliability: business continuity, high availability and disaster recovery; Azure Site Recovery overview; regional pairs.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Targets in the scene are hypothetical. Confirm region-pair behaviour and Site Recovery failback support for the chosen services.
export const rtoRpoAndRegionalFailover: Section = {
  id: 'rto-rpo-and-regional-failover',
  title: 'RTO, RPO, dependency recovery and regional failover',
  scene: 'rto-rpo',
  focus: 'order',
  slide: `## Recovery targets

### Two numbers
- **RPO**: how much data you can **lose**
- **RTO**: how long you can be **down**

### Set them per tier
- Not everything needs the **same** target
- Tighter targets cost **more**

### Recovery order
- **Identity**, then **network**, then **data**, then **applications**
- A dependency that is **down** blocks what needs it

### Do not assume
- A **paired region** does not fail over for you
- Capacity there is **not guaranteed** to match
- **Failback** is a second migration
- Site Recovery covers **VMs**, not every service
- **Test** the failover on a schedule`,
  narration:
    "Recovery planning starts with two numbers. The recovery point objective, or RPO, is how much data you can afford to lose, measured in time. The recovery time objective, or RTO, is how long you can afford to be down. The table sets hypothetical targets by tier. The orders database might need an RPO of five minutes and an RTO of an hour, which suggests a geo replica and a tested failover. The shop site is stateless, so it loses no data and can simply be redeployed from code. And reports can be rebuilt from source, so a day is acceptable. Tighter targets cost more, so set them per tier, not for everything. Then order matters. Recover identity first, because nobody signs in without it, then network and name resolution, then data, and only then the applications, because each depends on what came before. Finally, some cautions. A paired region does not fail over for you. Capacity there is not guaranteed to match, you must design and test the failover, and failing back later is a second migration. Azure Site Recovery replicates virtual machines, but it does not cover every service. Last: quotas and throttling.",
}
