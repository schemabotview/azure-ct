import type { Scene } from '@graphlearning/flow'

// What bills by the hour, by the gigabyte or by the unit — on a HYPOTHETICAL rate card, labelled so
// on screen. A VM stopped from inside its OS is still allocated and still bills for compute; only
// "Stopped (deallocated)" stops compute charges, while its disks and a static public IP keep billing.
// An Event Hubs throughput unit bills per hour whether or not events flow. A stopped PostgreSQL
// flexible server restarts itself after seven days.
// risk-dev for a month (730 h): VM 730 × 0.20 = 146.00; 128 GB disk × 0.10 = 12.80; public IP
// 730 × 0.005 = 3.65; 1 throughput unit 730 × 0.03 = 21.90; 200 GB lake × 0.02 = 4.00.
// Running 188.35; stopped in the OS 188.35; deallocated 42.35.
// source: https://learn.microsoft.com/en-us/azure/virtual-machines/states-billing
// source: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-scalability
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-stop-start-server-portal
export const charging: Scene = {
  id: 'what-keeps-charging',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'card-side',
      label: 'How things bill',
      bare: true,
      children: [
        {
          id: 'rates',
          kind: 'table',
          label: 'The course’s rate card (hypothetical, USD)',
          headers: ['meter', 'unit', 'rate'],
          values: [
            ['VM, 4 vCPU', 'per hour allocated', '0.20'],
            ['managed disk', 'per GB-month', '0.10'],
            ['public IP address', 'per hour', '0.005'],
            ['Event Hubs throughput unit', 'per hour', '0.03'],
            ['lake storage, hot', 'per GB-month', '0.02'],
            ['PostgreSQL server, 2 vCore', 'per hour', '0.25'],
            ['log data', 'per GB ingested', '2.00'],
          ],
        },
        {
          id: 'still',
          kind: 'list',
          icon: 'receipt',
          label: 'Still charging when nothing runs',
          pattern: 'warn',
          items: [
            'A VM shut down from inside: still allocated, still billed',
            'Disks and static IPs, even when the VM is deallocated',
            'Throughput units, whether or not events flow',
            'A stopped PostgreSQL server starts itself after seven days',
          ],
        },
      ],
    },
    {
      id: 'month-side',
      label: 'One month of risk-dev',
      bare: true,
      children: [
        {
          id: 'month',
          kind: 'table',
          label: 'risk-dev for 730 hours, three ways',
          headers: ['line', 'running', 'stopped in the OS', 'deallocated'],
          values: [
            ['integration VM', '146.00', '146.00', '0.00'],
            ['its 128 GB disk', '12.80', '12.80', '12.80'],
            ['its public IP', '3.65', '3.65', '3.65'],
            ['1 throughput unit', '21.90', '21.90', '21.90'],
            ['200 GB in the lake', '4.00', '4.00', '4.00'],
            ['total', '188.35', '188.35', '42.35'],
          ],
        },
        {
          id: 'habits',
          kind: 'list',
          icon: 'circlecheck',
          label: 'Habits that follow',
          pattern: 'storage',
          items: [
            'Deallocate, do not just shut down',
            'Delete what nobody needs; a whole resource group if it is all one thing',
            'Tag everything with an owner and an environment',
            'Read the meter before the bill: Course 3 sets a budget',
          ],
        },
      ],
    },
  ],
  edges: [],
}
