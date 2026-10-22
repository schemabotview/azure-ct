import type { Section } from '../types'

export const eventHubs: Section = {
  id: 'event-hubs',
  title: 'Event Hubs',
  scene: 'event-hubs',
  narration:
    "The map now has Event Hubs. The code at the top is templates slash modules slash streaming dot bicep. It creates one namespace on the Standard tier, which is the lowest tier with the Kafka endpoint, with two throughput units of capacity, auto inflate allowed up to four, public network access disabled, and local authentication disabled, so no shared access key can ever be used: Entra I D only. Inside it are two event hubs, f x rates and deal events, each with four partitions, keeping events for one day, and each with a consumer group for the intraday exposure. The terminal runs tools slash send events dot py against the Event Hubs emulator, and shows where each event landed. f x rates has four partitions. G B P U S D goes to partition three, E U R U S D to one, S G D U S D to two, and the second G B P U S D goes to partition three again, as number one after number nought. That is the partition key at work: the same key, the same partition, so one currency pair's rates stay in the order they were sent. Deal events are keyed by the deal, so all of L C twenty forty one's events stay in order too; here L C nineteen ninety five happens to share its partition. Across partitions there is no order at all. The table at the bottom translates. A namespace is the service, with one address, which Kafka calls a cluster. An event hub is one stream, like f x rates, which Kafka calls a topic. A partition is an ordered lane inside it. A partition key picks the lane. And a consumer group is one reader's own position in the stream. Next, the bank's existing Kafka producer, moved onto this namespace.",
}
