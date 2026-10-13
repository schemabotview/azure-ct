import type { Section } from '../types'

// Ch3 §5. Reference: App Service diagnostic logging, health check, scale up and out, autoscale.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm health-check behaviour (probe interval, failure threshold, minimum two instances) and the tiers that support autoscale.
export const logsHealthChecksAndScaling: Section = {
  id: 'logs-health-checks-and-scaling',
  title: 'Logs, health checks and scaling',
  scene: 'ch03-health-scale',
  focus: 'i3',
  slide: `## Seeing and sizing the app

### Logs
- The **log stream** shows output as it happens
- Logging must be **enabled** and sent somewhere to be kept

### Health check
- You give a **path**, such as /healthz
- An instance that keeps failing is taken **out of rotation**
- Needs **two or more** instances to route around

### Scale up and out
- **Up**: a bigger instance
- **Out**: more instances behind the load balancer
- **Autoscale** rules need a **qualifying tier**

### Capacity
- Scaling takes **time**
- More instances do not fix a **slow dependency**`,
  narration:
    "A running app needs three things from the platform: evidence, a way to be judged healthy, and a way to grow. Evidence first. The log stream shows what each instance prints as it happens, which is perfect for the first look at a problem. Be aware that logging has to be switched on and sent somewhere if you want to keep it. Health checking comes next. You give App Service a path, like slash healthz, and the platform probes it. In the card, instance three keeps failing, so it is taken out of the rotation and the other two serve the traffic. Notice the catch: that rerouting only helps when there is a second instance to take over. For growth there are two directions. Scaling up means a bigger instance. Scaling out means more instances behind the load balancer, and automatic rules for it need a tier that supports them. Finally, keep expectations honest. Scaling is not instant, and adding instances does nothing for a slow database. Capacity helps only when the app itself is the bottleneck. Our last topic in this chapter is releasing new versions safely.",
}
