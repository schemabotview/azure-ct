import type { Section } from '../types'

// Ch8 §6. Reference: Azure Event Grid concepts, event subscriptions, retry and dead-lettering.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm retry schedule and event time-to-live defaults, supported handlers, and the dead-letter option.
export const eventGridEventDistribution: Section = {
  id: 'event-grid-event-distribution',
  title: 'Event Grid: event distribution, subscriptions and delivery handling',
  scene: 'ch08-event-grid',
  focus: 'topic',
  slide: `## Reacting to what happened

### Events versus messages
- An **event** says something **happened**
- A **message** asks someone to **do** something

### Event Grid
- Sources **emit** events: Storage, resource changes, your own
- **Subscriptions** filter and route to **handlers**
- Handlers: Functions, queues, webhooks

### Delivery
- At least once, with **retries and backoff**
- Can **dead-letter** to storage after giving up
- Handlers must tolerate **duplicates**

### Fit
- Good for **notification and reaction**
- Not for **high-volume streams**`,
  narration:
    "Not everything is a command. Sometimes a system just wants to announce that something happened. That is an event, and Azure Event Grid distributes events from sources to subscribers. In our diagram, the storage account emits an event whenever a blob is created. The card shows it trimmed: its type, a subject naming the blob, and a time. Event Grid does not decide what to do about it. Subscriptions do. Each subscription filters the events it cares about and routes them to a handler, which might be a function that processes the receipt, a queue that buffers the work, or a webhook that notifies a partner. Delivery is at least once. If a handler is down, Event Grid retries with backoff, and it can send events that never delivered to a dead-letter store. That means handlers must tolerate duplicates. Event Grid fits notification and reaction well, such as processing a file as soon as it lands. It is not designed for high-volume continuous streams, and that is the job of Event Hubs, which is next.",
}
