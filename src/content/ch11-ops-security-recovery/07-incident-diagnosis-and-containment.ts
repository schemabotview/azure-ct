import type { Section } from '../types'

// Ch11 §7. Reference: Microsoft incident response guidance; Entra sign-in logs; shared responsibility for patching.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const incidentDiagnosisAndContainment: Section = {
  id: 'incident-diagnosis-and-containment',
  title: 'Incident diagnosis, containment, privileged access and patching',
  scene: 'ch11-incident',
  focus: 'steps',
  slide: `## When an identity is compromised

### The sequence
- **Detect** the signal
- **Contain** first: revoke sessions, disable sign-in
- **Investigate** with sign-in and Activity Logs
- **Eradicate**: rotate secrets, remove roles
- **Recover**, then **review**

### Why contain before investigating
- Every minute of access is **more damage**
- The logs will **still be there**

### Privileged access
- Check what the identity could **reach**
- Use **time-limited** elevation going forward

### Patching
- Azure patches the **platform**
- **You** patch guest OS, libraries and images`,
  narration:
    "Suppose an alert says Priya's account signed in from two countries within an hour. This is a containment problem, and the table gives the sequence. First, detect, which has already happened. Second, contain: revoke her sessions and disable her sign-in, so the access stops. Do this before investigating, because every minute of access is potentially more damage, and the logs will still be there afterwards. Third, investigate. The query in the card pulls her sign-in log for the last day, showing times, addresses and results, and the Activity Log shows what she, or whoever held her account, changed. Check what the identity could reach, which is the reason we use least privilege and time-limited elevation. Fourth, eradicate: rotate any secrets she could read and remove roles that were added. Fifth, recover, and then hold a review. A related question is patching. Azure patches the platform and the hosts behind its managed services. But you patch your own virtual machine guest operating systems, your libraries and your container images. That shared responsibility needs an owner. Next, preparing for the worst case: recovery.",
}
