import type { Section } from '../types'

// Ch2 §6. Reference: Azure Policy overview, effects, compliance and remediation docs.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the
// authoring environment) — re-check the claims below before publishing.
// The rule in the scene is a policyRule fragment, not a complete definition (no displayName/mode).
export const azurePolicy: Section = {
  id: 'azure-policy',
  title: 'Azure Policy: definitions, effects and compliance',
  scene: 'policy',
  focus: 'deny',
  slide: `## Rules for resources

### Definition and assignment
- A **definition** is an if/then rule over resource properties
- An **assignment** applies it at a **scope**
- Groups of definitions are **initiatives**

### Effects
- **Audit** flags; **Deny** rejects create or update requests
- **Modify** and **DeployIfNotExists** change or add things

### Compliance
- Resources are reported **compliant or not**
- Existing resources are **not deleted** by a new Deny
- **Remediation tasks** fix existing ones for effects that can

### Not the same as RBAC
- RBAC: **who** may act. Policy: what **state** resources may be in
- A compliant resource is **not** a secure application`,
  narration:
    "Role-based access control says who may act. Azure Policy answers a different question: what state may resources be in? A policy definition is a rule shaped like if this, then that. In the card, if a resource's location is not Sweden Central or North Europe, then the effect is deny. A definition does nothing until it is assigned to a scope, and from then on everything beneath that scope is evaluated. The effect decides what happens. Audit simply flags the resource and allows it. Deny rejects a create or update request that would break the rule. Modify can add or change fields, such as a missing tag, and deploy-if-not-exists can add a companion resource, such as diagnostic settings. Afterwards, compliance reporting shows which resources pass and which do not. A new deny rule does not delete resources that already exist; it marks them non-compliant, and remediation tasks can fix those where the effect supports it. Keep the two systems apart: a person with Owner can still be stopped by policy, and a compliant resource is not proof that the application on it is secure. Next, where do we assign these rules and roles so they apply consistently?",
}
