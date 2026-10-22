import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { serveTree } from './tree'
import code from '../../../spine/serve/05-retry/project/tools/retry_safely.py?raw'
import session from '../../../spine/serve/05-retry/session.txt?raw'

// A client that loses the reply to a COMMIT cannot tell whether it committed; retrying a
// non-idempotent write can apply it twice. With Microsoft Entra authentication, the application
// signs in with an access token as the password (its managed identity), refreshed before it expires;
// pooled connections must be renewed with fresh tokens. Each flexible server SKU has a maximum number
// of connections; a pool per app instance multiplies. Real PostgreSQL 16, run locally.
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-connect-with-managed-identity
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-limits
// source: https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults
export const retry: Scene = ideFrame(
  'retry-safely',
  'risk-on-azure',
  serveTree('05', 'tools/retry_safely.py', ['tools/retry_safely.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies', 'sql', 'templates'], ['tools']),
  { file: 'tools/retry_safely.py', code, show: [[10, 17], [20, 26]], highlight: [12, 13, 15, 22, 23], pattern: 'storage', terminal: session },
  {
    id: 'retry-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'retry-what',
        kind: 'table',
        label: 'Safe to retry?',
        headers: ['call', 'retry'],
        values: [
          ['read headroom', 'always'],
          ['reserve, with a key', 'yes: once only'],
          ['reserve, no key', 'no: holds twice'],
          ['40001, timeout', 'retry, with backoff'],
          ['check violation', 'never: it is an answer'],
        ],
      },
      {
        id: 'connections',
        kind: 'list',
        icon: 'managedidentity',
        label: 'Connecting',
        pattern: 'user',
        items: [
          'The API signs in as its managed identity',
          'Its password is an Entra token, an hour long',
          'A pool per instance: 10 instances × 10',
          'Every pool counts against max_connections',
        ],
      },
    ],
  },
)
