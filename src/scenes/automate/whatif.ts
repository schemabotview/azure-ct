import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { automateTree } from './tree'
import code from '../../../spine/automate/05-whatif/project/tools/whatif.py?raw'
import session from '../../../spine/automate/05-whatif/session.txt?raw'

// What-if compares the template with what exists and changes nothing. Its change types: Create,
// Delete, Ignore, NoChange, Modify, Deploy (and NoEffect, Unsupported). Ignore is a resource that
// exists but is not in the template — left alone in incremental mode, deleted in complete mode. A
// change to a name declares a new resource; the old one stays. A VM's zone is set when it is created.
// A deleted vault's name stays held for its soft-delete retention (90 days here), with purge protection.
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-what-if
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-modes
// source: https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview
export const whatif: Scene = ideFrame(
  'what-if',
  'risk-on-azure',
  automateTree('05', 'tools/whatif.py', ['tools/whatif.py'], ['budgets', 'infra', 'policies', 'templates']),
  { file: 'tools/whatif.py', code, show: [[7, 17], [34, 36]], highlight: [14, 16, 35], terminal: session, emulated: false },
  {
    id: 'whatif-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'drift',
        kind: 'table',
        label: 'Drift, and what the next deployment does',
        headers: ['made by hand', 'next deployment'],
        values: [
          ['TLS lowered to 1.0', 'puts back 1.2'],
          ['stwgscratch added', 'ignored, or deleted'],
          ['a group’s tag removed', 'puts it back'],
        ],
      },
      {
        id: 'replace',
        kind: 'table',
        label: 'Changes that are really a new resource',
        headers: ['change', 'what happens'],
        values: [
          ['any name', 'a second one; the old stays'],
          ['a VM’s zone', 'set at creation: rebuild'],
          ['a vault, deleted', 'name held 90 days'],
          ['a subnet in use', 'resize refused'],
        ],
      },
    ],
  },
)
