import type { Section } from '../types'

// Ch8 §8. Reference: Durable Functions overview and code constraints; Azure Logic Apps overview; saga and compensation pattern.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm Durable Functions Python decorator syntax and the orchestrator determinism rules for the chosen runtime.
export const logicAppsAndDurableFunctions: Section = {
  id: 'logic-apps-and-durable-functions',
  title: 'Logic Apps and Durable Functions: orchestration and compensation',
  scene: 'orchestration',
  focus: 'release',
  slide: `## Workflows across steps

### The problem
- Reserve stock, **charge**, ship: any step can **fail**
- A failed payment must **release the stock**

### Durable Functions
- An **orchestrator** coordinates **activities**
- It is **replayed** from history, so it must be **deterministic**
- Put **side effects** in activities, not the orchestrator
- **Retries** and durable timers are built in

### Logic Apps
- A **visual** workflow with many **connectors**
- Good for **integration** with other systems

### Compensation
- You cannot **roll back** across services
- Each step needs a **compensating action**
- Test the **failure paths**, not only the happy one`,
  narration:
    "A real order touches several services: reserve stock, take payment, create a shipment. Any step can fail, and you cannot roll back a payment the way a database rolls back a transaction. The answer is an orchestration with compensation. Look at the orchestrator in the card. It reserves stock, then charges payment. If the charge throws an exception, the orchestrator runs a compensating activity that releases the stock, and then re-raises. Durable Functions provides this. The orchestrator coordinates the work, while each activity does one real step. There is a rule that surprises people: an orchestrator is replayed from its history each time it resumes, so its code must be deterministic. It must not read the clock, generate random numbers, or call services directly. Those side effects belong in activities. Logic Apps is the other tool. You build workflows visually, with a large library of connectors, which suits integration with other systems. Test the failure paths, not only the happy one. Choose Durable Functions when you want code, tests and source control, and Logic Apps when connectors and a visual flow matter more. The final section ties everything together: retries and duplicates.",
}
