import type { Section } from '../types'

// Ch12 §7. Reference: Azure Well-Architected Framework pillars and review process.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// The findings are drawn from earlier chapters of this course and the ranking is illustrative; a real review ranks by the workload and its evidence.
export const wellArchitectedReviewAndPriorities: Section = {
  id: 'well-architected-review-and-priorities',
  title: 'An integrated Azure Well-Architected review and prioritised improvements',
  scene: 'waf-review',
  focus: 'ranked',
  slide: `## Review the whole, then rank

### Five pillars together
- **Reliability**, **security**, **cost**
- **Operational excellence**, **performance efficiency**
- Improving one can **cost** another

### One finding each
- Restore **never tested**
- Storage **keys still enabled**
- Idle **dev plan** at night
- Alerts **without owners**
- **SQL query** is 59 % of the p95

### Prioritising
- Rank by **evidence** and **effort**
- Cheap fixes to **proven risks** go first
- Re-measure **after** each change

### No universal answer
- A design is **good for a purpose**, under stated assumptions`,
  narration:
    "We finish by looking at the whole system, using the five pillars of the Azure Well-Architected Framework: reliability, security, cost optimisation, operational excellence and performance efficiency. The point of reviewing them together is that they interact. Making something more reliable usually costs more, and making it cheaper can reduce resilience. The first card lists one finding for each pillar, drawn from this course. Reliability: we have never tested a restore. Security: storage account keys are still enabled and bypass our roles. Cost: the development plan idles overnight. Operations: some alerts have no owner. Performance: one SQL query is fifty-nine percent of the slow request. Next, rank them. The table orders improvements by evidence and effort. Testing a restore is cheap and addresses an unproven claim, so it goes first. Disabling keys is also cheap. Indexing the slow query takes more effort but has clear evidence. Do the cheap fixes for proven risks first, and re-measure after every change. There is no universal best architecture. A design is good for a purpose, under stated assumptions. From here, continue with hands-on practice, current service documentation, and demonstrated deployment, security and recovery competence, because production responsibility needs more than following worked examples.",
}
