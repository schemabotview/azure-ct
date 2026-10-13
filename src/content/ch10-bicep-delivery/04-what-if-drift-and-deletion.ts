import type { Section } from '../types'

// Ch10 §4. Reference: ARM deployment what-if; deployment modes (Incremental and Complete); deployment stacks.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm what-if change types, Complete-mode deletion behaviour, and the status of deployment stacks for managing deletion.
export const whatIfDriftAndDeletion: Section = {
  id: 'what-if-drift-and-deletion',
  title: 'What-if, drift, replacement and deletion implications',
  scene: 'ch10-what-if',
  focus: 'limits',
  slide: `## Previewing a change

### What-if
- Shows what a deployment **would** change
- **Create**, **modify**, **delete**, no change
- Review it **before** approving

### Deployment modes
- **Incremental**, the default, **never deletes** what the template omits
- **Complete** can **delete** resources not in the template
- Use deletion **deliberately**, with a stack or a review

### Drift
- A portal edit that differs from the file is **drift**
- The next deployment may **revert** it

### Limits
- What-if **cannot promise success**: quota, names and policy can still fail
- It may miss **runtime effects**, such as a restart`,
  narration:
    "Before changing production, you want to see what a deployment will do. What-if gives you that preview. The card shows a trimmed example. A tilde means a resource will be modified, here turning always-on to true on the web app. A plus means a resource will be created, such as an Application Insights component. And a minus means a deletion. Review it before anyone approves the change. That minus line connects to deployment modes. The default, incremental mode, only adds and updates. It never deletes resources that the template omits. Complete mode is different, and can delete anything not in the template, so use it deliberately, with a review, or with a mechanism built for managing deletions. What-if also surfaces drift. A change made by hand in the portal is compared with the file, and the next deployment may revert it. Now the honest limits. A clean what-if cannot promise the deployment will succeed, because quota, name conflicts and policy can still fail it. And it may not show runtime consequences, such as an app restarting. It is a review aid, not a guarantee. Next: who runs the deployment?",
}
