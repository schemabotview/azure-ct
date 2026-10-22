import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { publishTree } from './tree'
import code from '../../../spine/publish/01-api/project/app/server.py?raw'
import session from '../../../spine/publish/01-api/session.txt?raw'

// The exposure API, run locally against the risk mart on PostgreSQL 16: Python's standard HTTP
// server and psycopg, a health check route, a read, and a reservation that applies Course 11's
// rules (one serializable transaction, an idempotency key, 40001 retried).
export const api: Scene = ideFrame(
  'exposure-api',
  'risk-on-azure',
  publishTree('01', 'app/server.py', ['app/'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'functions', 'infra', 'policies', 'sql', 'templates', 'tools']),
  { file: 'app/server.py', code, show: [[22, 35]], highlight: [23, 25, 28, 29, 33], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'api-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'routes',
        kind: 'table',
        label: 'The API’s routes',
        headers: ['route', 'answers'],
        values: [
          ['GET /health', 'can I reach the mart?'],
          ['GET …/G-WW/headroom', 'how much is left'],
          ['POST …/G-WW/reservations', 'hold some, once'],
        ],
      },
      {
        id: 'api-notes',
        kind: 'list',
        icon: 'appservice',
        label: 'What the code does not do',
        pattern: 'service',
        items: [
          'Check who is calling: App Service does',
          'Store a password: it signs in as itself',
          'Decide over the limit: the mart refuses',
          'Log to a file: one line per request, out',
        ],
      },
    ],
  },
)
