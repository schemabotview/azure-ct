import type { Section } from '../types'

// Ch11 §6. Reference: Microsoft Defender for Cloud overview; Microsoft Sentinel overview; Azure Web Application Firewall.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Product names, bundles and pricing in this area change often; the roles, not the SKUs, are what this section teaches.
export const defenderSentinelWafAndBoundaries: Section = {
  id: 'defender-sentinel-waf-and-boundaries',
  title: 'Defender for Cloud, Microsoft Sentinel, WAF and security-service boundaries',
  scene: 'security-services',
  focus: 'stages',
  slide: `## Who does which security job

### Prevent
- **Azure Policy** blocks bad configuration
- **WAF** blocks common web attacks at the edge

### Detect
- **Defender for Cloud** finds **weak posture** and raises **threat alerts**
- Detection **does not fix** anything by itself

### Respond
- **Microsoft Sentinel** collects signals, **correlates** them and runs **playbooks**
- It needs **log sources** to be useful

### Cost
- Many plans bill **per resource**: enable by **need**

### Boundaries
- A WAF is **not** application security
- Overlapping names, **different jobs**
- **Detection is not prevention**`,
  narration:
    "Azure has several security services whose names overlap, but whose jobs differ. Think in three stages: prevent, detect and respond. Prevention stops problems from happening. Azure Policy blocks bad configuration, and a web application firewall blocks common web attacks at the edge, such as injection attempts. Detection finds problems. Defender for Cloud assesses your posture, flagging weak configuration, and raises alerts about threats. But detection does not fix anything by itself, so someone must act on its findings. Response is where Microsoft Sentinel fits. It collects signals from many sources, correlates them into incidents, and can run automated playbooks. It depends on being fed log sources, so it is only as good as what you send it. The table sets out each service's main job and what it is not. A web application firewall is not the same as application security, and a detection service is not a prevention service. Many plans bill per resource, so enable them by need. Product names and packaging change often, so judge each service by its job, not its label. When something does go wrong, what is the sequence?",
}
