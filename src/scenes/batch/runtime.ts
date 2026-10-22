import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/batch/02-runtime/project/templates/modules/factory.bicep?raw'

// A self-hosted integration runtime is software installed on Windows machines the customer runs; up
// to four nodes register with one runtime (high availability and scale-out) using its authentication
// key. It makes only outbound connections (HTTPS 443) to the Data Factory service, so no inbound port
// is opened; the customer patches the OS, and the runtime can auto-update. Patching is scheduled with
// Azure Update Manager; access is by Azure Bastion from the hub, never RDP from the internet.
// source: https://learn.microsoft.com/en-us/azure/data-factory/create-self-hosted-integration-runtime
// source: https://learn.microsoft.com/en-us/azure/data-factory/self-hosted-integration-runtime-auto-update
// source: https://learn.microsoft.com/en-us/azure/update-manager/overview
// source: https://learn.microsoft.com/en-us/azure/bastion/bastion-overview
export const runtime: Scene = mapFrame('bank-runtime', [...BUILT_BY[7], 'shir', 'adf'], {
  id: 'runtime-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'factory-code', kind: 'code', filename: 'templates/modules/factory.bicep', label: code.replace(/\n+$/, ''), highlight: [10, 12, 16, 19], pattern: 'service' },
    {
      id: 'runtime-care',
      kind: 'table',
      label: 'Running the runtime’s two VMs',
      headers: ['concern', 'how'],
      values: [
        ['image', 'Windows Server 2022 Azure Edition'],
        ['disks', 'Premium SSD; logs on the OS disk'],
        ['two nodes', 'zones 1 and 3, one runtime, one key'],
        ['network', 'out on 443 only, through the firewall'],
        ['patching', 'Update Manager, one node at a time'],
        ['access', 'Bastion from the hub; no public IP'],
      ],
    },
    {
      id: 'runtime-why',
      kind: 'list',
      icon: 'vm',
      label: 'Why inside the bank’s reach',
      pattern: 'service',
      items: [
        'TradeBook has no public address',
        'The runtime reaches it over ExpressRoute',
        'And calls out to Data Factory for work',
        'So nothing in the bank opens a port inward',
      ],
    },
  ],
})
