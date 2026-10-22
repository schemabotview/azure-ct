import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import script from '../../../spine/network/02-spoke/project/infra/05-network.sh?raw'
import session from '../../../spine/automate/01-rerun/session.txt?raw'

// Resource Manager's PUT creates or updates, so a create command run again changes nothing it already
// made; a script lists steps, not the end state, so it never removes what it no longer mentions, and
// an address range cannot change while a resource uses the subnet.
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview
// source: https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-manage-subnet
export const rerun: Scene = mapFrame('script-rerun', BUILT_BY[5], {
  id: 'rerun-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'rerun-script', kind: 'code', filename: 'infra/05-network.sh', label: script.replace(/\n+$/, ''), highlight: [7, 13, 17, 18], pattern: 'network' },
    { id: 'rerun-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · a rerun model', label: session.replace(/\n+$/, '') },
    {
      id: 'rerun-limits',
      kind: 'table',
      label: 'What a script cannot say',
      headers: ['you want', 'the script'],
      values: [
        ['snet-shir gone', 'deleted the line: nothing happens'],
        ['snet-test noticed', 'never looks at what is there'],
        ['dev the same as prod', 'a second copy, edited by hand'],
        ['to see a change first', 'runs it to find out'],
      ],
    },
  ],
})
