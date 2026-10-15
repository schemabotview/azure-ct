import type { Scene } from '@graphlearning/flow'

// Ch11 §7 — containing a compromised identity: stop access first, then investigate with evidence.
// The query is over the Entra sign-in log table; the user is synthetic.
export const incident: Scene = {
  id: 'incident',
  title: 'Containing a compromised identity',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'steps',
      kind: 'table',
      label: 'A containment sequence',
      headers: ['Step', 'Action', 'Why first'],
      values: [
        ['1 Detect', 'impossible-travel alert fires', 'start the clock'],
        ['2 Contain', 'revoke sessions, disable sign-in', 'stop the access'],
        ['3 Investigate', 'sign-in and Activity Logs', 'scope the damage'],
        ['4 Eradicate', 'rotate secrets, remove roles', 'close the doors'],
        ['5 Recover', 'restore, then review', 'return to normal'],
      ],
    },
    {
      id: 'query',
      kind: 'code',
      filename: 'sign-in log (KQL)',
      label: `SigninLogs
| where UserPrincipalName == "priya@contoso.com"
| where TimeGenerated > ago(24h)
| project TimeGenerated, IPAddress, ResultType, AppDisplayName`,
    },
    {
      id: 'owners',
      label: 'Who patches what',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'azure-patch', label: 'Azure', sub: 'the platform, PaaS hosts', pattern: 'network', icon: 'cloud' },
        { id: 'you-patch', label: 'You', sub: 'VM guest OS, libraries, images', pattern: 'warn', icon: 'wrench' },
      ],
    },
  ],
  edges: [
    { source: 'steps', target: 'query', label: 'step 3 uses' },
    { source: 'query', target: 'owners', label: 'and afterwards' },
  ],
}
