import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { operateTree } from './tree'
import code from '../../../spine/operate/10-retry/project/tools/retry_jitter.py?raw'
import session from '../../../spine/operate/10-retry/session.txt?raw'

// Cosmos DB answers 429 (request rate too large) with x-ms-retry-after-ms when a partition's RU/s
// are spent; Resource Manager throttles with 429 and Retry-After; Key Vault throttles per vault;
// Event Hubs returns ServerBusy past its throughput units. The Azure SDKs retry with exponential
// backoff and honour Retry-After. The retry pattern adds randomisation (jitter) so clients do not retry
// in step; full jitter waits uniform(0, cap). The numbers are a model's, not Cosmos DB's. Azure Chaos Studio injects faults to test.
// source: https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/troubleshoot-request-rate-too-large
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling
// source: https://learn.microsoft.com/en-us/azure/key-vault/general/service-limits
// source: https://learn.microsoft.com/en-us/azure/architecture/best-practices/retry-service-specific
// source: https://learn.microsoft.com/en-us/azure/chaos-studio/chaos-studio-overview
// source: https://learn.microsoft.com/en-us/azure/architecture/patterns/retry
export const throttling: Scene = ideFrame(
  'throttling-retries',
  'risk-on-azure',
  operateTree('10', 'tools/retry_jitter.py', ['tools/retry_jitter.py'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'data', 'feeds', 'functions', 'infra', 'kql', 'policies', 'sql', 'templates'], ['tools']),
  { file: 'tools/retry_jitter.py', code, show: [[7, 20], [36, 36]], highlight: [12, 16, 20], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'throttle-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'limits',
        kind: 'table',
        label: 'Who says “too many”',
        headers: ['service', 'when', 'answer'],
        values: [
          ['Cosmos DB', 'RU/s spent', '429, wait ms'],
          ['Resource Manager', 'too many calls', '429, Retry-After'],
          ['Key Vault', 'per-vault limit', '429'],
          ['Event Hubs', 'past its TUs', 'ServerBusy'],
        ],
      },
      {
        id: 'retry-rules',
        kind: 'list',
        icon: 'repeat',
        label: 'Retrying well',
        pattern: 'service',
        items: [
          'Honour Retry-After when given',
          'Back off, with jitter',
          'Cap the tries, then fail loudly',
          'Retry only what is idempotent',
          'Test it: Chaos Studio',
        ],
      },
    ],
  },
)
