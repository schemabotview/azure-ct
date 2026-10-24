import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'

// Microsoft Defender for Cloud: posture management (recommendations, secure score) for all
// subscriptions, plus workload plans — Defender for Storage (unusual access, a SAS used from an
// unusual location, malware scanning), for Key Vault (unusual secret access), for servers and for
// open-source relational databases. Microsoft Sentinel: a SIEM over a Log Analytics workspace
// (analytics rules → incidents → automation playbooks). Web Application Firewall on Application
// Gateway: OWASP managed rule sets, blocking in prevention mode. None of them sees an over-broad
// grant used as granted, and none patches what it flags.
// source: https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction
// source: https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-storage-introduction
// source: https://learn.microsoft.com/en-us/azure/sentinel/overview
// source: https://learn.microsoft.com/en-us/azure/web-application-firewall/ag/ag-overview
export const detect: Scene = mapFrame('detect-and-block', [...BUILT_BY[12], 'monitor', 'defender'], {
  id: 'detect-pane',
  label: 'side',
  bare: true,
  children: [
    {
      id: 'detectors',
      kind: 'table',
      label: 'What each one does',
      headers: ['', 'does', 'here, it would'],
      values: [
        ['Defender for Cloud', 'scores posture, advises', 'flag public access left on'],
        ['Defender for Storage', 'detects unusual access', 'see the drop token used abroad'],
        ['Defender for Key Vault', 'detects unusual reads', 'see a secret read from a new IP'],
        ['Sentinel', 'turns logs into incidents', 'join the alert to jo’s change'],
        ['WAF', 'blocks bad requests', 'stop an injection at the gateway'],
      ],
    },
    {
      id: 'detect-row',
      label: 'And what they leave to the bank',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'not-fixed',
          kind: 'list',
          icon: 'ban',
          label: 'What none of them fix',
          pattern: 'warn',
          items: [
            'A role wider than the job needs',
            'A valid token used as issued',
            'A VM they flag but do not patch',
            'A wrong number in the report',
          ],
        },
        {
          id: 'who-acts',
          kind: 'table',
          label: 'Who acts on an alert',
          headers: ['alert', 'goes to'],
          values: [
            ['security', 'the bank’s security team'],
            ['the nightly', 'the platform on-call'],
            ['posture', 'the owning team, by tag'],
          ],
        },
      ],
    },
  ],
})
