import type { Section } from '../types'

export const queueStorageServiceBusEventGridOrEventHubs: Section = {
  id: 'queue-storage-service-bus-event-grid-or-event-hubs',
  title: 'Queue Storage, Service Bus, Event Grid or Event Hubs',
  scene: 'four-ways',
  narration:
    "Azure has four services that move a message, and they are easy to mix up, because each can be bent into doing another's job. Queue Storage is a simple queue inside a storage account: small messages, up to sixty four kilobytes, no ordering, no sessions, cheap, for a simple list of work. Service Bus is a broker for commands and business messages: queues and topics, sessions that keep one key's messages in order, duplicates dropped, dead letters kept aside, and each message settled exactly once by whoever handles it. Event Grid pushes notices that something happened, like a file arrived or a machine stopped, to whoever subscribed, filtered, retried and finally dead lettered; it is not for a stream of data. Event Hubs is a log of events, taking millions a second, keeping them a day or more so they can be replayed, read by many readers at their own positions, in order only within a partition. The table at the bottom gives each its job on the platform. A file landed, so load it: Event Grid, because it is a notice, pushed, as Course eight set up. Every exchange rate and every deal event: Event Hubs, because it is a stream, with several readers and replay. A deal's steps, in order, each handled once: Service Bus, because of sessions, duplicate detection and dead letters. And an over the limit alert that someone must act on: Service Bus too, because it must not be lost or doubled; Course twelve sends it. Next, Service Bus for the deal's steps.",
}
