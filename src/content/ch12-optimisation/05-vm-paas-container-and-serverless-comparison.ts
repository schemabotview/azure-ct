import type { Section } from '../types'

// Ch12 §5. Reference: Azure Architecture Center compute comparison; cost modelling guidance.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// The cost units are illustrative assumptions, not prices. Rebuild the comparison with current prices and measured load before using it for a decision.
export const vmPaasContainerAndServerlessComparison: Section = {
  id: 'vm-paas-container-and-serverless-comparison',
  title: 'VM, PaaS, container and serverless architecture comparisons',
  scene: 'ch12-architecture-compare',
  focus: 'cost',
  slide: `## Comparing architectures honestly

### Include every line
- **Compute**, storage, **data transfer**
- **Logs and monitoring**, **backups**
- **Idle capacity** and **operations time**

### What the table shows
- Same API, **spiky** load, relative **cost units**
- Functions is cheapest here because it has **no idle capacity**
- VMs carry the most **operations time**

### What would change it
- A **steady, heavy** load shrinks idle capacity
- **Latency limits** can rule out cold starts
- **Skills and migration risk** are costs too

### Rule
- Make **assumptions explicit** and revisit them`,
  narration:
    "Which architecture is cheapest for our order API? The honest answer is: it depends on the load and the assumptions, so state them. The table compares three designs, virtual machines, App Service and Functions, in relative cost units, not prices. And it includes every line, not only compute: storage, data transfer, logs and monitoring, backups, idle capacity, and the time people spend operating it. Under a spiky load, Functions comes out cheapest, mainly because it has no idle capacity and little operational work. Virtual machines carry the most operations time, because someone has to patch and look after them. But read the numbers with their caveats, shown in the second card. A steady, heavy load shrinks idle capacity and can reverse the ranking. A strict latency target may rule out cold starts. And skills and migration risk are costs as well, even if they do not appear on an invoice. So the rule is to make the assumptions explicit, build the comparison with current prices and measured load, and revisit it when the load changes. Then, how do you actually move?",
}
