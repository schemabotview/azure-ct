import type { Section } from '../types'

// Ch11 §10. Reference: Azure subscription and service limits; retry and throttling guidance; Azure Chaos Studio.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the Retry-After header behaviour for the services used, and Chaos Studio fault availability for the target resource types.
export const quotasThrottlingAndResilienceValidation: Section = {
  id: 'quotas-throttling-and-resilience-validation',
  title: 'Quotas, throttling, retries, dependency failures and resilience validation',
  scene: 'ch11-resilience',
  focus: 'validate',
  slide: `## Limits and proof

### Limits you will meet
- **Quota**: a ceiling per subscription and region
- **Throttling**: a 429 asks you to **slow down**
- **Dependencies** time out or fail

### Retrying well
- Retry **transient** errors only
- Use **exponential backoff** with **jitter**
- Honour **Retry-After** when it is sent
- **Cap** attempts, and use a **circuit breaker**

### Capacity
- Request **quota increases early**; approval can take time

### Proving it
- **Load test** at expected peak
- **Inject faults** deliberately, for example with Chaos Studio
- Run a **game day** to practise the runbook`,
  narration:
    "We end the chapter with the limits you will meet and the proof you need. Azure enforces quotas, which are ceilings per subscription and region, and services throttle callers who ask too fast, answering with a 429 status code that means slow down. Dependencies also time out or fail outright. The card shows retrying done well. Retry only transient errors, and wait between attempts with exponential backoff, which means increasing delays, plus a little random jitter, so a crowd of clients does not retry in lockstep. If the service sends a Retry-After value, honour it. Cap the number of attempts, and use a circuit breaker so a failing dependency does not drag everything down with it. Ask for quota increases early, since approval can take time. Most important, do not assume any of this works. Validate it. Load test at the peak you expect. Inject faults deliberately, with a service such as Azure Chaos Studio, to see how the system really behaves when a dependency disappears. And run a game day, where the team practises the runbook for a realistic failure. Resilience you have never tested is only a guess. With the system observable and recoverable, we can finally use the evidence to improve it.",
}
