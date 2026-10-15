import type { Section } from '../types'

// Ch12 §4. Reference: Azure Advisor cost recommendations; reservations and savings plans; Well-Architected sustainability guidance.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm current commitment products (reservations, savings plans), their terms and exchange rules before recommending them.
export const rightsizingCommitmentsAndSustainability: Section = {
  id: 'rightsizing-commitments-and-sustainability',
  title: 'Rightsizing, scaling, commitments, utilisation and sustainability',
  scene: 'rightsizing',
  focus: 'levers',
  slide: `## Sized for what is measured

### Rightsizing
- Use **measured utilisation**, not guesses
- **Resize** over-provisioned machines
- **Schedule off** what idles at night

### Order of levers
- **Delete** unused resources first: no downside
- Then **resize and schedule**
- Then **commit** to steady use
- **Re-architect** last: largest effort

### Commitments
- Reservations and plans trade **flexibility for price**
- Commit only to load you are **sure** will stay

### Sustainability
- **Higher utilisation** usually means less waste
- A **lower price** does not prove lower impact`,
  narration:
    "Rightsizing means matching what you pay for to what you use, and the first step is measurement. The table shows synthetic averages. One virtual machine sits at eight percent CPU, so it can be resized down. The production plan at sixty-five percent is about right, and we keep an eye on it. The development plan is idle at night, so schedule it off. And the database is spiky at thirty percent average, which might suit a serverless or autoscaling tier. The lever order reduces risk. Delete what is unused first, because it has no downside. Then resize and schedule. Then consider commitments such as reservations or savings plans, which trade flexibility for a lower price, and which should cover only load you are certain will remain. Re-architecting is last, because it takes the most effort. Sustainability belongs in the same conversation. Higher utilisation generally means less waste, because idle capacity still consumes resources. But a lower price does not prove a lower environmental impact, and operational limits, such as latency or availability targets, still apply. Next, comparing whole architectures honestly.",
}
