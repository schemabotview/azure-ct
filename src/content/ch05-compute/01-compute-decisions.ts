import type { Section } from '../types'

// Ch5 §1. Reference: Azure compute decision tree (Architecture Center); App Service, VMs, Container Apps, AKS, Functions overviews.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const computeDecisions: Section = {
  id: 'compute-decisions',
  title: 'Compute decisions: control, workload shape and operations',
  scene: 'ch05-compute-decision',
  focus: 'questions',
  slide: `## Choosing where code runs

### Start from requirements
- **Control**: how much of the stack must you own?
- **Workload shape**: steady, bursty or batch
- **Latency**: can it tolerate a **cold start**?
- **Portability** and **operations**: who runs it, and who is on call?

### The simplest option that fits
- **App Service** for web apps and APIs
- **Container Apps** when you ship containers
- **VMs** for special software or lift and shift
- **AKS** only when you need Kubernetes itself

### Remember
- More control means **more to operate**
- **Total cost** includes patching, upgrades and on-call time
- One system can use **several** options for different parts
- Check **Region availability** and **quota** first`,
  narration:
    "Before comparing products, decide how to decide. Our order API could run in five different places, and the table lists them with what you manage in each. On App Service you manage the code and settings. On a virtual machine you manage the operating system and everything above it. On Container Apps you ship a container image and Azure runs the platform around it. On Kubernetes, through AKS, you manage workloads and nodes. And Azure Functions runs small pieces of event-driven code. The questions on the right pick between them. How much of the stack must you control? Is the load steady, bursty or batch? Can the workload tolerate a cold start, the pause while a new instance spins up? Do you need portability? And, bluntly, who operates this at three in the morning? The rule of thumb is to pick the simplest option that meets the requirements. App Service for a normal web app, Container Apps when you ship containers, virtual machines for special software, and AKS only when you truly need Kubernetes. More control always means more to operate, and the true cost includes patching, upgrades and on-call time. A system can also mix options, and quota and Region availability should be checked first. Let's start at the control end, with virtual machines.",
}
