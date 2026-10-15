import type { Section } from '../types'

// Ch5 §3. Reference: Azure Virtual Machine Scale Sets overview; availability zones; autoscale; quotas and capacity reservations.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm current orchestration-mode guidance (Flexible) and how quota differs from capacity allocation.
export const scaleSets: Section = {
  id: 'scale-sets',
  title: 'VM Scale Sets: health, zones and capacity',
  scene: 'scale-set',
  focus: 'quota',
  slide: `## A fleet of identical VMs

### What a scale set does
- Keeps **identical instances** from one model
- Spreads them across **zones**
- **Replaces** an instance that fails its health check

### Scaling
- An **autoscale rule** adds or removes instances from a metric
- Instances must be **stateless** to be replaceable

### Updating
- **Rolling upgrades** replace instances in batches
- Keep **spare capacity** during the roll

### Limits to respect
- **Quota** is the most you may use, not capacity reserved for you
- Capacity in a size or zone can be **unavailable** when you ask
- Plan for **fallback sizes** or reserve capacity`,
  narration:
    "A virtual machine scale set manages many identical machines as one unit. You describe a model, once, and the scale set creates instances from it. In the diagram, three instances run in three different zones, which protects against the loss of a datacenter. It also watches health. Instance two is failing its check, so the scale set replaces it rather than leaving it in the pool. Autoscale rules can add or remove instances based on a metric such as CPU or queue length. Note the consequence: for instances to be replaceable, they must be stateless, because a new instance will not have the old one's local data. Updates can roll through in batches, as long as you keep spare capacity. Now the limits, which people often misunderstand. Quota is a ceiling on what you are allowed to use. It is not capacity set aside for you. When you ask for more instances, a particular size in a particular zone may simply not be available at that moment. So plan for fallback sizes, and if your workload truly needs guaranteed capacity, look at reserving it. Next, a different packaging: the container image.",
}
