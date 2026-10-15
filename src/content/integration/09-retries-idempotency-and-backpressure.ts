import type { Section } from '../types'

// Ch8 §9. Reference: Idempotent receiver pattern; Service Bus and Event Hubs delivery semantics; retry and backoff guidance.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const retriesIdempotencyAndBackpressure: Section = {
  id: 'retries-idempotency-and-backpressure',
  title: 'Retries, idempotency, replay, poison messages and backpressure',
  scene: 'idempotency',
  focus: 'guard',
  slide: `## Safe under repeats

### Duplicates happen
- Delivery is **at least once**, so a handler can run twice
- Duplicate detection, sessions and checkpoints **do not stop** it

### Idempotency
- Make the **effect** safe to repeat
- A **unique key** in the database is the reliable guard
- On a key violation, **skip** the side effect

### Retries
- Retry **transient** faults with **backoff**
- Cap the attempts

### Poison messages
- A message that keeps failing is **parked** for a human

### Backpressure
- Let a slow consumer **slow the producer**`,
  narration:
    "Everything in this chapter delivers at least once, which means any handler can run twice. Duplicate detection, ordered sessions and checkpoints all reduce repeats, but none of them can promise that your business effect happens exactly once. The only reliable defence is to make the effect itself idempotent, meaning a repeat does no harm. The card shows one way: a fulfilments table with the order identifier as its primary key. The first delivery inserts the key and ships the parcel. A duplicate delivery hits a key violation, so the handler skips the shipping and acknowledges the message. The unique key, in the same database as the effect, is what makes the guard reliable. Around that, keep the pipeline healthy. Retry transient faults with backoff, and cap the attempts. A message that keeps failing is a poison message, so park it for a human rather than letting it block the queue forever. And let a slow consumer push back on the producer, so that backlog cannot grow without limit. That completes our application plumbing. Now, how do operational changes feed analysis and reporting?",
}
