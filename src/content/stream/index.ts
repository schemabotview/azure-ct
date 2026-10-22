import type { Course } from '../types'
import { whyAStream } from './01-why-a-stream'
import { eventHubs } from './02-event-hubs'
import { theKafkaEndpoint } from './03-the-kafka-endpoint'
import { consumersAndCheckpoints } from './04-consumers-and-checkpoints'
import { captureToTheLake } from './05-capture-to-the-lake'
import { queueStorageServiceBusEventGridOrEventHubs } from './06-queue-storage-service-bus-event-grid-or-event-hubs'
import { serviceBusForDealSteps } from './07-service-bus-for-deal-steps'
import { lateDuplicateAndThrottled } from './08-late-duplicate-and-throttled'

// Course 9 — Bring the stream in. Why a stream, Event Hubs, the Kafka endpoint, checkpoints,
// Capture, the four messaging services, Service Bus sessions, and what streams do not promise.
export const stream: Course = {
  id: 'stream',
  title: 'Bring the stream in',
  sections: [
    whyAStream,
    eventHubs,
    theKafkaEndpoint,
    consumersAndCheckpoints,
    captureToTheLake,
    queueStorageServiceBusEventGridOrEventHubs,
    serviceBusForDealSteps,
    lateDuplicateAndThrottled,
  ],
}
