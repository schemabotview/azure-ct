import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { secureTree } from './tree'
import code from '../../../spine/secure/06-policy/project/policies/storage-private.json?raw'
import session from '../../../spine/secure/06-policy/session.txt?raw'

// Azure Policy evaluates resource properties (through aliases) at creation and update, and
// periodically for compliance; a deny effect refuses the request. The built-in "Allowed locations"
// (e56962a6-4747-49cd-b67b-bf8b01975c4c) runs in Indexed mode, so it does not evaluate resource
// groups — a separate built-in covers them. A missing property makes notEquals true. The verdicts
// come from tools/policy_check.py, a model of the conditions these two definitions use.
// source: https://learn.microsoft.com/en-us/azure/governance/policy/overview
// source: https://learn.microsoft.com/en-us/azure/governance/policy/concepts/definition-structure-policy-rule
// source: https://learn.microsoft.com/en-us/azure/governance/policy/samples/built-in-policies
export const policy: Scene = ideFrame(
  'policy-deny',
  'risk-on-azure',
  secureTree('06', 'policies/storage-private.json', ['policies/builtin', 'policies/storage-private.json', 'policies/uk-only.assignment.json', 'tools/policy_check.py', 'tools/proposed'], ['budgets', 'infra', 'policies/roles']),
  { file: 'policies/storage-private.json', code, highlight: [8, 10, 11, 15], terminal: session, emulated: false, pattern: 'warn' },
  {
    id: 'policy-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'two-rules',
        kind: 'table',
        label: 'Two rules on landing-zones',
        headers: ['rule', 'effect'],
        values: [
          ['Allowed locations (built-in)', 'deny outside UK'],
          ['no public network (custom)', 'deny'],
        ],
      },
      {
        id: 'vs-rbac',
        kind: 'table',
        label: 'Not the same as RBAC',
        headers: ['', 'asks'],
        values: [
          ['RBAC', 'may this person do it?'],
          ['Policy', 'may anyone make this?'],
        ],
      },
      {
        id: 'not-proof',
        kind: 'list',
        icon: 'circleslash',
        label: 'Compliant does not mean secure',
        pattern: 'warn',
        items: ['It checks what the rules name', 'Not code, data, or people', 'A gap, like resource groups, passes'],
      },
    ],
  },
)
