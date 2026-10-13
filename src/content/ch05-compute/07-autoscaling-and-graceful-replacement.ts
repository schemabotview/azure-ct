import type { Section } from '../types'

// Ch5 §7. Reference: Azure autoscale concepts; Kubernetes pod termination and SIGTERM; Container Apps and App Service scale behaviour.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const autoscalingAndGracefulReplacement: Section = {
  id: 'autoscaling-and-graceful-replacement',
  title: 'Autoscaling signals, statelessness and graceful shutdown',
  scene: 'ch05-autoscaling',
  focus: 'local',
  slide: `## Scaling has a delay

### The chain of delays
- Load rises, a **metric** must cross a threshold over a **window**
- Then an instance **starts**: image pull, boot, warm-up
- Capacity can be **late** and may be **unavailable**

### Stateless instances
- A replacement has **none of the old local state**
- Keep **sessions and files** in a shared store

### Graceful shutdown
- Scale-in sends a **termination signal**
- Finish **in-flight work**, then exit
- Otherwise requests are **cut mid-way**

### Choosing signals
- Prefer a signal that **leads** the problem, such as queue length
- **Load test** the rule before launch`,
  narration:
    "The last topic in this chapter ties the options together: scaling is never instant. Follow the timeline. Load rises and latency climbs. A metric must cross a threshold, usually for a window of time, before a rule fires. Then a new instance has to start: pull the image, boot, and warm up. Only then does it take traffic. And sometimes the capacity you ask for is late, or not available at all. That delay is why the choice of signal matters. A signal that leads the problem, like the length of a queue, helps more than one that lags, like CPU after users are already waiting. Two properties make replacement safe. First, instances must be stateless. In the diagram, a session held in an instance's memory is lost when that instance is replaced, while a session in a shared store survives. Second, shutdown must be graceful. When Azure scales in, it sends a termination signal. The handler in the card finishes in-flight work and exits, instead of cutting requests mid-way. Load test the rule before launch, because an untested scaling rule is a guess. Now that compute can be replaced at will, where does the data that must survive live?",
}
