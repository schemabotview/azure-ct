import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import script from '../../../spine/secure/01-people/project/infra/04-groups.sh?raw'

// People sign in with Microsoft Entra ID; daily accounts are synchronised from the bank's own
// directory (hybrid identity), break-glass accounts are cloud-only. Conditional Access applies
// conditions (who, which app, which device, where) and requires controls (MFA strength, a compliant
// device) at sign-in; it needs a Microsoft Entra ID P1 licence. Emergency accounts are excluded from
// policies that block or restrict sign-in.
// source: https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview
// source: https://learn.microsoft.com/en-us/entra/identity/hybrid/whatis-hybrid-identity
// source: https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access
export const people: Scene = mapFrame('people-signin', [...BUILT_BY[3], 'entra'], {
  id: 'people-side',
  label: 'side',
  bare: true,
  children: [
    { id: 'groups-script', kind: 'code', filename: 'infra/04-groups.sh', label: script.replace(/\n+$/, ''), highlight: [6, 7, 11, 12], pattern: 'user' },
    {
      id: 'groups',
      kind: 'table',
      label: 'Four groups touch risk data',
      headers: ['group', 'who', 'reaches'],
      values: [
        ['Risk Data Engineers', 'priya', 'builds the platform'],
        ['Risk Analysts', 'omar', 'reads exposure and trends'],
        ['Credit Officers', 'sam', 'gets breach alerts, owns limits'],
        ['Risk Auditors', 'audit-01', 'reads reports and logs only'],
      ],
    },
    {
      id: 'ca',
      kind: 'table',
      label: 'Conditional Access at sign-in (Entra ID P1)',
      headers: ['policy', 'for', 'requires'],
      values: [
        ['admin roles', 'anyone holding one', 'phishing-resistant MFA'],
        ['risk data', 'analysts, officers', 'a compliant bank device'],
        ['legacy sign-in', 'everyone', 'blocked'],
        ['break-glass', 'two accounts', 'excluded from blocks'],
      ],
    },
    {
      id: 'authn',
      kind: 'list',
      icon: 'key',
      label: 'Two different questions',
      pattern: 'user',
      items: ['Authentication: who are you? Entra ID answers', 'Authorisation: what may you do here? Roles answer', 'Daily accounts come from the bank’s directory, synced'],
    },
  ],
})
