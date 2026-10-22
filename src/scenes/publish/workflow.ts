import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { publishTree } from './tree'
import code from '../../../spine/publish/08-workflow/project/functions/breach_workflow/orchestrator.py?raw'
import session from '../../../spine/publish/08-workflow/session.txt?raw'

// Durable Functions: an orchestrator function is replayed from its history, so it must be
// deterministic; it calls activities, creates durable timers and waits on the first of several
// tasks (task_any), which is how a human-approval timeout is written. Logic Apps (Standard) builds
// the same workflow from connectors in a designer. Compensation undoes completed steps when a later
// one fails. The walk here replaces the Durable runtime with stand-in answers; the orchestrator's
// own code runs unchanged.
// source: https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview
// source: https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-phone-verification
// source: https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview
// source: https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction
export const workflow: Scene = ideFrame(
  'breach-workflow',
  'risk-on-azure',
  publishTree('08', 'functions/breach_workflow/orchestrator.py', ['functions/breach_workflow/', 'tools/walk_breach.py'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies', 'sql', 'templates'], ['tools']),
  { file: 'functions/breach_workflow/orchestrator.py', code, show: [[9, 25]], highlight: [10, 11, 13, 14, 15, 19, 20, 22], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'workflow-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'la-vs-df',
        kind: 'table',
        label: 'Logic Apps or Durable Functions',
        headers: ['', 'Logic Apps', 'Durable'],
        values: [
          ['built in', 'a designer', 'Python'],
          ['email, Teams', 'connectors', 'your code'],
          ['tested by', 'running it', 'unit tests'],
          ['ours', '—', 'yes'],
        ],
      },
      {
        id: 'compensate',
        kind: 'list',
        icon: 'history',
        label: 'Undoing, in order',
        pattern: 'warn',
        items: [
          'A rejected excess releases the reservation',
          'Then the dealer is told: deal refused',
          'Every decision is recorded, either way',
          'A step is undone by another step, logged',
        ],
      },
    ],
  },
)
