import type { Scene, SceneNode } from '@graphlearning/flow'

// Queue Storage: simple queues inside a storage account (64 KB messages, no ordering guarantee).
// Service Bus: an enterprise broker — queues and topics, sessions (FIFO per session), transactions,
// duplicate detection, dead-lettering, peek-lock settlement. Event Grid: event distribution with
// push delivery and filtering, for "something happened" notifications. Event Hubs: a partitioned
// log for high-volume streams, read by many consumers at their own positions, with retention.
// source: https://learn.microsoft.com/en-us/azure/service-bus-messaging/compare-messaging-services
// source: https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-azure-and-storage-queues-compared-contrasted
const way = (id: string, label: string, sub: string, icon: string, items: string[]): SceneNode => ({
  id, label, sub, icon, pattern: 'network', kind: 'list', items,
})

export const fourways: Scene = {
  id: 'four-ways',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'ways',
      label: 'Four ways to move a message',
      bare: true,
      flow: 'LR',
      align: 'start',
      stretch: true,
      children: [
        way('qs', 'Queue Storage', 'a simple queue', 'storagequeue', ['Inside a storage account', 'Small messages, 64 KB', 'No order, no sessions', 'Cheap, for simple work lists']),
        way('sbus', 'Service Bus', 'a broker for commands', 'servicebus', ['Queues and topics', 'Sessions: in order per key', 'Duplicates dropped, dead letters', 'Each message settled once']),
        way('egrid', 'Event Grid', 'notices, pushed', 'eventgrid', ['“A file arrived”, “a VM stopped”', 'Pushed to subscribers, filtered', 'Retried, then dead-lettered', 'Not for a stream of data']),
        way('ehub', 'Event Hubs', 'a log of events', 'eventhubs', ['Millions of events a second', 'Kept a day or more, replayable', 'Many readers, own positions', 'Order per partition only']),
      ],
    },
    {
      id: 'jobs',
      kind: 'table',
      label: 'Which job each does on the platform',
      headers: ['job', 'service', 'because'],
      values: [
        ['a file landed: load it', 'Event Grid', 'a notice, pushed (Course 8)'],
        ['every FX rate, every deal event', 'Event Hubs', 'a stream, many readers, replay'],
        ['a deal’s steps, in order, once', 'Service Bus', 'sessions, dedup, dead letters'],
        ['an over-limit alert to act on', 'Service Bus', 'it must not be lost (Course 12)'],
      ],
    },
  ],
  edges: [],
}
