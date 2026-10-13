import type { Section } from '../types'

// Ch8 §7. Reference: Azure Event Hubs features: partitions, consumer groups, checkpointing.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm partition-count limits per tier and checkpoint storage options for the chosen client library.
export const eventHubsPartitionsAndCheckpoints: Section = {
  id: 'event-hubs-partitions-and-checkpoints',
  title: 'Event Hubs: partitions, ordering, consumer groups and checkpoints',
  scene: 'ch08-event-hubs',
  focus: 'lag',
  slide: `## A log for streams

### Partitions
- An event hub is split into **partitions**
- Events are **ordered within** a partition, not across them
- A **partition key** sends related events to the same one

### Consumer groups
- Each group reads the **whole stream** independently
- Analytics and alerting can **share** one hub

### Checkpoints
- A consumer records **how far it has read**
- After a restart it **resumes** from there
- Events may be **reprocessed**

### Lag
- Lag is **newest minus checkpoint**
- A lagging consumer needs **more consumers or faster work**`,
  narration:
    "When events arrive as a continuous, high-volume stream, such as every click or every order change, Event Hubs is the service built for it. An event hub is a partitioned log. Events are appended to partitions, and order is guaranteed only within a partition, never across them. If events about the same order must stay in order, send them with the same partition key, which routes them to the same partition. Consumers read through consumer groups. Each group reads the whole stream independently, so an analytics job and an alerting job can share one hub without interfering. The table shows why. Each group keeps its own checkpoint, a record of how far it has read. After a restart it resumes from that point, which also means some events can be processed again. Lag is simply the newest offset minus the checkpoint. The analytics group is a hundred events behind, while alerts are almost current. A lagging consumer needs more consumers, up to the number of partitions, or faster processing. With streams understood, how do we coordinate multi-step work?",
}
