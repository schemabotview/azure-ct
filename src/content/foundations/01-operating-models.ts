import type { Section } from '../types'

// Ch1 §1. Reference: Microsoft Learn shared-responsibility and IaaS/PaaS/SaaS pages.
// Not verified against live docs at authoring time (docs host unreachable from the authoring
// environment) — re-check wording of the shared-responsibility rows before publishing.
export const operatingModels: Section = {
  id: 'operating-models',
  title: 'Who runs what: IaaS, PaaS and SaaS',
  scene: 'operating-models',
  focus: 'always',
  slide: `## Who runs what

Cloud means renting capacity you control through an API. The question is **how much of the stack you still operate**.

### Three models
- **IaaS** — you get a virtual machine and run the OS and everything above it
- **PaaS** — you deploy code; Azure runs the OS and the runtime
- **SaaS** — you configure a finished product

### In the retail example
- On a **VM** you patch the OS and run the web server
- On **App Service** you deploy code and configure it

### Shared responsibility
- Azure always runs the **datacenter and physical hosts**
- You always own your **data, accounts and access**
- Everything between moves with the model
- Exact boundaries are **service-specific**: check each service's documentation`,
  narration:
    "Let's start with a question that decides almost everything later: who is responsible for what. Cloud computing is renting capacity that you control through an API, and the useful way to compare the options is to ask how much of the stack you still operate yourself. Take our online shop. If we run it on a virtual machine, that is infrastructure as a service. Azure runs the hardware and the hypervisor, but we install the operating system, patch it, and run the web server. If we deploy the same code to App Service, that is platform as a service. Now Azure patches the operating system and runs the runtime, and we own our code and its configuration. A finished product like Microsoft 365 is software as a service, where we only configure it. Read the table across and the boundary slides to the right as more is managed for you. But look at the top row: your data, your accounts and who can reach them stay yours in every column. That row is why the next chapters spend so long on access. The exact line differs by service, so check each one's documentation. First, though, where does all of this physically live?",
}
