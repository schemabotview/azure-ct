import type { Scene, SceneNode } from '@graphlearning/flow'

// Who runs what, from a server the bank owns to software it only uses. The splits follow Microsoft's
// descriptions: a VM's guest OS is the customer's; Azure Database for PostgreSQL flexible server
// applies OS and minor engine updates in a scheduled maintenance window the customer may choose;
// Data Factory runs its Azure integration runtime itself, while a self-hosted runtime is the
// customer's machine; Power BI is SaaS.
// source: https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-maintenance
// source: https://learn.microsoft.com/en-us/azure/data-factory/concepts-integration-runtime
const stage = (id: string, label: string, sub: string, icon: string, pattern: SceneNode['pattern'], you: string[], microsoft: string[]): SceneNode => ({
  id,
  label,
  sub,
  icon,
  pattern,
  cols: 1,
  children: [
    { id: `${id}-you`, kind: 'list', label: 'The bank runs', icon: 'usercheck', pattern: 'user', items: you },
    { id: `${id}-ms`, kind: 'list', label: 'Microsoft runs', icon: 'cloud', pattern: 'network', items: microsoft },
  ],
})

export const managed: Scene = {
  id: 'managed-services',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'ladder',
      label: 'The line moves right, one service at a time',
      bare: true,
      flow: 'LR',
      align: 'start',
      stretch: true,
      children: [
        stage('own', 'A server it owns', 'on-premises', 'server', 'service',
          ['Building, power, network', 'The hardware', 'The operating system', 'Software and patches', 'Its data'], ['Nothing']),
        stage('vm', 'A virtual machine', 'IaaS · the integration runtime', 'vm', 'service',
          ['The operating system and patches', 'The software on it', 'How many machines', 'Its data'], ['Buildings and hardware', 'The hypervisor']),
        stage('pg', 'PostgreSQL Flexible Server', 'PaaS · the risk mart', 'postgres', 'storage',
          ['Size, backups, maintenance window', 'Tables, queries, connections', 'Its data'], ['Hardware and OS', 'Engine install and patches', 'Backups and failover']),
        stage('adf', 'Data Factory', 'PaaS · moving data', 'datafactory', 'service',
          ['Pipelines and schedules', 'Connections and their secrets', 'A self-hosted runtime, if any'], ['The service and its runtime', 'Scaling copy jobs', 'Running the schedules']),
        stage('pbi', 'Power BI', 'SaaS · reports', 'powerbi', 'user',
          ['Reports and who sees them', 'The data put in'], ['The whole application', 'Everything underneath']),
      ],
      edges: [
        { source: 'own', target: 'vm' },
        { source: 'vm', target: 'pg' },
        { source: 'pg', target: 'adf' },
        { source: 'adf', target: 'pbi' },
      ],
    },
    {
      id: 'trade-row',
      label: 'The trade',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'trade',
          kind: 'table',
          label: 'What moving right buys, and costs',
          headers: ['', 'more managed'],
          values: [
            ['jobs the bank does', 'fewer'],
            ['control', 'less: versions, OS access, tuning'],
            ['limits', 'the service’s, documented as quotas'],
            ['paying', 'closer to use: per hour, per GB, per run'],
          ],
        },
        {
          id: 'platform-uses',
          kind: 'list',
          icon: 'package',
          label: 'Where the platform uses each',
          pattern: 'user',
          items: [
            'A VM for the integration runtime — Course 8',
            'Data Factory for the batches — Course 8',
            'PostgreSQL for the risk mart — Course 11',
            'Power BI for the analysts — Course 12',
          ],
        },
      ],
    },
  ],
  edges: [],
}
