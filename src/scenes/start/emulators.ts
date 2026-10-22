import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { startTree } from './tree'
import code from '../../../spine/start/04-emulators/project/env.sh?raw'
import session from '../../../spine/start/04-emulators/session.txt?raw'

// What the emulators model and what they do not, as the course relies on them (AZURE-COURSE-PLAN.md).
// Azurite emulates Blob, Queue and Table storage; it has no hierarchical-namespace (dfs) endpoint.
// source: https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite
// source: https://learn.microsoft.com/en-us/azure/storage/common/storage-use-emulator
export const emulators: Scene = ideFrame(
  'emulators',
  'risk-on-azure',
  startTree('04', 'env.sh', ['env.sh', 'requirements.txt']),
  { file: 'env.sh', code, highlight: [2, 3, 4, 10], terminal: session },
  {
    id: 'emulators-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'which',
        kind: 'table',
        label: 'The emulators, from Microsoft',
        headers: ['emulator', 'stands in for', 'from'],
        values: [
          ['Azurite', 'Blob, Queue, Table', 'now'],
          ['Event Hubs', 'the market feed', 'Course 9'],
          ['Service Bus', 'deal steps', 'Course 9'],
          ['Cosmos DB', 'the group lookup', 'Course 11'],
          ['PostgreSQL 16', 'TradeBook, the mart', 'Course 8'],
        ],
      },
      {
        id: 'cannot',
        kind: 'list',
        icon: 'circleslash',
        label: 'What none of them can show',
        pattern: 'warn',
        items: ['Resource Manager: no group, no role', 'Entra tokens and sign-ins', 'Packets, private links, failover', 'Quotas and prices'],
      },
      {
        id: 'rules',
        kind: 'list',
        icon: 'terminal',
        label: 'How the course uses them',
        pattern: 'network',
        items: [
          'The real CLI and SDKs; only the endpoint changes',
          'Every pane run against one says “emulated”',
          'Control-plane files are model-checked instead',
          'Emulator keys are on screen; real keys never',
        ],
      },
    ],
  },
)
