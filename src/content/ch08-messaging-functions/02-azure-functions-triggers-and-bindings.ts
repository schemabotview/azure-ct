import type { Section } from '../types'

// Ch8 §2. Reference: Azure Functions triggers and bindings concepts; Python developer guide (v2 programming model).
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm decorator names and the Python v2 model syntax for the chosen runtime version.
export const azureFunctionsTriggersAndBindings: Section = {
  id: 'azure-functions-triggers-and-bindings',
  title: 'Azure Functions: triggers, bindings and execution boundaries',
  scene: 'ch08-function-handler',
  focus: 'flow',
  slide: `## A function in three parts

### Trigger
- **What starts it**: a message, a timer, an HTTP request
- Exactly **one** trigger per function

### Common triggers
- **HTTP**, **timer**, **queue**, **Service Bus**, **Event Hubs**, **Event Grid**

### Handler
- **Your code**: plain Python taking the trigger's data

### Bindings
- Declarative **input and output** connections
- The runtime reads and writes for you

### Execution boundaries
- A **time limit**, which depends on the **hosting plan**
- **No local state**: instances are added and removed
- Connection names point at **app settings**, not secrets in code`,
  narration:
    "Azure Functions lets you run small pieces of code in response to events, without managing servers. Every function has three parts. The trigger is what starts it: a message arriving on a queue, a timer, an HTTP request. A function has exactly one trigger, chosen from HTTP, timer, queue, Service Bus, Event Hubs, Event Grid and more. The handler is your code, which here is plain Python that receives the trigger's data. And bindings are declarative connections for inputs and outputs. In the card, the decorators say this function runs when a message arrives on the orders queue, and that it writes its result to a second queue called fulfil. The runtime does the reading and writing, so the handler stays short. Notice the connection setting is a name that points to an app setting, so no secret sits in the code. Now the boundaries, which shape how you write handlers. There is a time limit, and it depends on the hosting plan. And there is no local state, because instances are added and removed as load changes, so anything that must last belongs in a store. Which hosting plan to choose is next.",
}
