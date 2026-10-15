import type { Section } from '../types'

// Ch8 §4. Reference: Azure messaging services comparison; Storage queues and Service Bus queues compared.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm message size limits, ordering and duplicate-detection support per tier, and the current comparison table.
export const queueStorageVersusServiceBus: Section = {
  id: 'queue-storage-versus-service-bus',
  title: 'Queue Storage versus Service Bus',
  scene: 'queue-vs-servicebus',
  focus: 'compare',
  slide: `## Two queues, two jobs

### Queue Storage
- **Simple and cheap**; very large capacity
- **No ordering** guarantee
- You build **poison handling** yourself

### Service Bus
- **Sessions** give ordered delivery per key
- Built-in **dead-letter** queue
- Optional **duplicate detection**
- **Topics** let many subscribers each get a copy
- **Transactions** across operations

### Choosing
- Start with the **delivery rules** you need, not the price
- Choose Queue Storage when **simple is enough**
- Both deliver **at least once**, so expect duplicates
- Neither gives **exactly-once business effects**
- Check **message size limits** for your payloads`,
  narration:
    "Azure has more than one queue, and the right one depends on the delivery rules you need. Queue Storage is simple and inexpensive, with very large capacity. The trade is that it gives no ordering guarantee, and handling poison messages is something you build yourself. Service Bus is the full messaging service. Sessions give you ordered delivery for messages that share a key. A dead-letter queue is built in, so messages that keep failing are parked rather than lost. Duplicate detection is available as an option. Topics and subscriptions let many subscribers each receive a copy of a message, and transactions can group operations. The table lines the capabilities up. How do you choose? Start with the delivery rules you need, not the price. If you only need to hand work from one component to another, and simple is enough, Queue Storage is a good fit. If you need ordering, dead-lettering, publish and subscribe, or transactions, use Service Bus. Both deliver at least once, and payload size limits differ, so check them. And be careful with one claim: neither service on its own gives you exactly-once business effects. We will come back to that. First, how Service Bus settles messages.",
}
