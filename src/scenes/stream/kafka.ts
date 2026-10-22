import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { streamTree } from './tree'
import code from '../../../spine/stream/03-kafka/project/feeds/market_producer.py?raw'
import session from '../../../spine/stream/03-kafka/session.txt?raw'

// Event Hubs' Kafka endpoint speaks the Kafka protocol (1.0 and later) on port 9093: the namespace
// is the bootstrap server, an event hub is a topic, and a client authenticates with SASL OAUTHBEARER
// (an Entra ID token) or SASL PLAIN with a connection string; disabling local auth leaves OAuth only.
// Existing Kafka producers and consumers change configuration, not code. The emulator listens on
// 9092 in plain text. A Kafka client chooses the partition itself (by hashing the key), so the
// same key may map to a different partition than an AMQP partition key: keep one way per hub.
// source: https://learn.microsoft.com/en-us/azure/event-hubs/azure-event-hubs-apache-kafka-overview
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-quickstart-kafka-enabled-event-hubs
// source: https://learn.microsoft.com/en-us/azure/event-hubs/authenticate-application
export const kafka: Scene = ideFrame(
  'kafka-endpoint',
  'risk-on-azure',
  streamTree('03', 'feeds/market_producer.py', ['feeds/', 'data/fx_20261013.csv'], ['.github', 'adf', 'budgets', 'contracts', 'infra', 'policies', 'templates', 'tools']),
  { file: 'feeds/market_producer.py', code, show: [[11, 26]], highlight: [13, 15, 24], pattern: 'network', terminal: session },
  {
    id: 'kafka-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'kafka-changes',
        kind: 'table',
        label: 'bank.properties to azure.properties',
        headers: ['setting', 'now'],
        values: [
          ['bootstrap.servers', 'evh-wg-risk-prod…:9093'],
          ['security.protocol', 'SASL_SSL (as before)'],
          ['sasl.mechanism', 'OAUTHBEARER'],
          ['credential', 'an Entra ID token'],
          ['the code', 'unchanged'],
        ],
      },
      {
        id: 'kafka-notes',
        kind: 'list',
        icon: 'kafka',
        label: 'Moving a Kafka producer',
        pattern: 'network',
        items: [
          'The namespace is the cluster',
          'Each hub is a topic: fx-rates',
          'No broker to run, patch or grow',
          'Kafka picks its own partition by key',
          'So one hub: Kafka clients, or the SDK',
        ],
      },
    ],
  },
)
