import type { Scene } from '@graphlearning/flow'

// One API on four kinds of compute, under the stated assumptions: the API is busy 08:00-18:00 and
// quiet otherwise, one instance-hour of a worker is the HYPOTHETICAL USD 0.20 everywhere,
// three instances by day give one per zone. Container Apps scales replicas by rules (here 3 by
// day, 1 at night); Functions (Flex Consumption) scales per execution and to zero, with optional
// always-ready instances against cold starts; VMs and App Service plans are billed while they run.
// source: https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree
// source: https://learn.microsoft.com/en-us/azure/container-apps/scale-app
// source: https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan
export const fourways: Scene = {
  id: 'four-ways-one-api',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'four',
      kind: 'table',
      label: 'The exposure API four ways (hypothetical: USD 0.20 an instance-hour)',
      headers: ['', 'runs', 'a month', 'the bank does', 'at 08:00'],
      values: [
        ['VMs, one per zone', '3 × 24 h', '438.00', 'OS, patches, web server', 'ready'],
        ['App Service (today)', '3 × 24 h', '438.00', 'the code, the settings', 'ready'],
        ['Container Apps', '3 by day, 1 at night', '267.67', 'an image, scale rules', 'ready'],
        ['Functions', 'per request', 'by use', 'functions, cold starts', 'cold, unless kept warm'],
      ],
    },
    {
      id: 'four-row',
      label: 'Reading the table',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'assumptions',
          kind: 'list',
          icon: 'ruler',
          label: 'The assumptions',
          pattern: 'service',
          items: [
            'Busy 08:00–18:00, quiet after',
            'The same rate for every worker',
            'Three by day: one per zone',
            'The team’s time is not priced',
          ],
        },
        {
          id: 'four-verdict',
          kind: 'table',
          label: 'What would change the answer',
          headers: ['if', 'then'],
          values: [
            ['nights stay quiet', 'Container Apps saves 39%'],
            ['the API becomes a container', 'move it then'],
            ['traffic is rare, bursty', 'Functions'],
            ['nothing changes', 'stay: moving costs too'],
          ],
        },
      ],
    },
  ],
  edges: [],
}
