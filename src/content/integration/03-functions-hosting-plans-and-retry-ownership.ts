import type { Section } from '../types'

// Ch8 §3. Reference: Azure Functions hosting options, Flex Consumption plan, scale and concurrency; trigger-specific retry behaviour.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Plan names, eligibility (including Flex Consumption regions and Consumption retirement notices) and retry defaults change; verify per trigger and plan before publishing.
export const functionsHostingPlansAndRetryOwnership: Section = {
  id: 'functions-hosting-plans-and-retry-ownership',
  title: 'Functions hosting plans, scaling, concurrency, networking and identity',
  scene: 'functions-hosting',
  focus: 'owners',
  slide: `## Hosting decides behaviour

### Plans
- **Flex Consumption**: serverless, per-function scaling, **VNet** support
- **Consumption**: scale to zero; check its **current status**
- **Premium**: pre-warmed instances, steadier latency
- **Dedicated**: runs on an **App Service plan**

### Identity and network
- Use a **managed identity** for storage and queue access
- VNet options **vary by plan**

### Concurrency
- One instance may run **many invocations** at once
- Tune it for **dependency limits**

### Who retries
- It depends on the **trigger**: queue, Service Bus, HTTP, timer
- Never assume a retry exists`,
  narration:
    "A function's hosting plan decides how it scales, what networking it can use, and how it behaves when idle. For a new serverless app, evaluate Flex Consumption first where it is available. It scales per function, can scale to zero, and supports virtual network integration. The older Consumption plan also scales to zero, but check its current status and limits before you start something new on it. Premium keeps pre-warmed instances, which gives steadier latency. Dedicated runs your functions on an App Service plan you already own. Whichever you choose, use a managed identity to reach storage and queues, and remember that networking options vary by plan. Concurrency matters too: one instance can run many invocations at once, so tune it to what your dependencies can take. Now the most overlooked point, shown in the card: who retries? It depends on the trigger. A queue trigger relies on the queue to redeliver and eventually parks poison messages. Service Bus uses locks, retries and dead-lettering. For an HTTP trigger, the caller retries. A timer simply runs again at the next time. Never assume a retry exists. Next, the services that carry the messages.",
}
