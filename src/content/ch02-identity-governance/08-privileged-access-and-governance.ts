import type { Section } from '../types'

// Ch2 §8. Reference: Entra Privileged Identity Management, access reviews, landing-zone guidance.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the
// authoring environment) — re-check the claims below before publishing.
// Licensing: PIM and access reviews need Entra ID Governance / P2-class licensing; confirm current names.
export const privilegedAccessAndGovernance: Section = {
  id: 'privileged-access-and-governance',
  title: 'Privileged access, reviews and landing-zone boundaries',
  scene: 'ch02-privileged-access',
  focus: 'active',
  slide: `## Powerful access, kept small

### Just-in-time elevation
- Privileged roles are **eligible**, not permanently active
- Activating needs **MFA**, a reason and sometimes approval
- Access **expires**; needs a **qualifying licence**

### Access reviews
- Owners **re-confirm** who still needs access
- Stale access is removed, not forgotten

### Who owns which layer
- The **platform team** owns policy, the hub network and identity
- **Application teams** own resources inside their subscriptions

### Evidence
- The **Activity Log** and sign-in logs show who did what
- Ownership must be **written down** to be useful`,
  narration:
    "The most powerful roles deserve the strictest handling. The common pattern is just-in-time elevation. Instead of someone holding Owner all day, every day, they are eligible for the role. When they genuinely need it, they activate it, which can require multi-factor authentication, a written reason, and sometimes an approver. The access then lasts for a set time and expires on its own. In Entra this is Privileged Identity Management, and it needs a qualifying licence, so verify your plan before you design around it. Access also rots. People change teams but keep their roles, which is why access reviews exist: owners are periodically asked to re-confirm who still needs what, and stale access is removed. The last piece is ownership. In a landing-zone design, the platform team owns policy, the hub network and identity foundations, and each application team owns the resources inside its own subscription. That boundary only helps if it is written down, and if evidence supports it: the Activity Log and sign-in logs show who did what and when. With ownership and access settled, we can follow a small application onto managed hosting in the next chapter.",
}
