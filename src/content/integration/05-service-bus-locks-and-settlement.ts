import type { Section } from '../types'

// Ch8 §5. Reference: Service Bus message transfers, locks and settlement; dead-letter queues; sessions; duplicate detection.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm default lock duration and max delivery count, and the receiver API names for the chosen SDK version.
export const serviceBusLocksAndSettlement: Section = {
  id: 'service-bus-locks-and-settlement',
  title: 'Service Bus locks, settlement, sessions and dead letters',
  scene: 'servicebus-settlement',
  focus: 'timeline',
  slide: `## Peek-lock and settlement

### How a receive works
- A message is **locked**, hidden from other receivers
- You **settle** it when finished
- If the lock expires, it becomes **visible again**

### Settlement outcomes
- **Complete**: done, remove it
- **Abandon**: release for another try
- **Dead-letter**: park it
- **Defer**: fetch it later by number

### Delivery count
- After a maximum number of tries it is **dead-lettered**

### Sessions and duplicates
- **Sessions** keep order per key
- **Duplicate detection** drops repeats within a window
- Neither makes your handler **idempotent**`,
  narration:
    "Service Bus delivers messages in peek-lock mode. When your code receives a message, the service locks it, which hides it from other receivers, and waits for you to settle it. You can complete it, meaning it is done and can be removed. You can abandon it, releasing it for another try. You can dead-letter it, parking it for inspection. Or you can defer it, to fetch later by its number. After a maximum number of delivery attempts, the service dead-letters the message for you. Now the failure the table traces, which catches many teams. The lock lasts sixty seconds, but our database work takes seventy-five. At forty seconds the update succeeds. At sixty the lock expires, and the message becomes visible again. At seventy-five our Complete call fails because the lock is lost, and a second delivery happens. The work was done twice. Sessions keep messages ordered per key, and duplicate detection drops repeated sends within a window, but neither makes your handler safe against a redelivery. Next, a different kind of messaging: events.",
}
