import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { streamTree } from './tree'
import code from '../../../spine/stream/07-deal-steps/project/tools/deal_steps.py?raw'
import session from '../../../spine/stream/07-deal-steps/session.txt?raw'

// Service Bus sessions give first-in, first-out handling per session id, one receiver per session at
// a time. Peek-lock delivers a message under a lock; the receiver completes it (removed) or abandons
// it (delivered again, delivery count up); past MaxDeliveryCount it moves to the dead-letter queue
// with reason MaxDeliveryCountExceeded. Duplicate detection drops a message whose MessageId was seen
// within the detection window. Sessions and duplicate detection need Standard or Premium. The
// emulator caps the window at 5 minutes and message TTL at 1 hour; the template asks 10 min and 1 day.
// source: https://learn.microsoft.com/en-us/azure/service-bus-messaging/message-sessions
// source: https://learn.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement
// source: https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues
// source: https://learn.microsoft.com/en-us/azure/service-bus-messaging/duplicate-detection
// source: https://learn.microsoft.com/en-us/azure/service-bus-messaging/overview-emulator
export const dealsteps: Scene = ideFrame(
  'deal-steps',
  'risk-on-azure',
  streamTree('07', 'tools/deal_steps.py', ['tools/deal_steps.py', 'templates/modules/messaging.bicep'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies'], ['templates', 'templates/modules', 'tools']),
  { file: 'tools/deal_steps.py', code, show: [[12, 13], [26, 27], [33, 42]], highlight: [12, 27, 37, 40], pattern: 'network', terminal: session },
  {
    id: 'dealsteps-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'sb-settings',
        kind: 'table',
        label: 'The deal-steps queue',
        headers: ['setting', 'so that'],
        values: [
          ['session per deal', 'a deal’s steps, in order'],
          ['duplicates, 10 min', 'a resent step is dropped'],
          ['lock, 30 s', 'a crash frees it again'],
          ['3 deliveries', 'then dead letters'],
        ],
      },
      {
        id: 'settle',
        kind: 'list',
        icon: 'servicebus',
        label: 'Settling a message',
        pattern: 'network',
        items: [
          'Complete: done, removed',
          'Abandon: try again, delivery count up',
          'Dead-letter: kept aside for a person',
          'Lock lost: delivered again',
          'Someone reads the dead letters daily',
        ],
      },
    ],
  },
)
