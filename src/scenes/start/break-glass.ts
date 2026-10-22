import type { Scene, SceneNode } from '@graphlearning/flow'

// Microsoft's guidance for emergency access ("break-glass") accounts: at least two, cloud-only,
// protected by phishing-resistant MFA, credentials stored securely, every sign-in monitored and
// alerted, tested regularly. A Global Administrator can elevate themselves to User Access
// Administrator at root scope, which reaches every subscription and management group in the tenant.
// Microsoft enforces MFA for sign-ins to the Azure portal, CLI, PowerShell and infrastructure-as-code
// tools.
// source: https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access
// source: https://learn.microsoft.com/en-us/azure/role-based-access-control/elevate-access-global-admin
// source: https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication
const who = (id: string, label: string, sub: string, icon: string, pattern: SceneNode['pattern']): SceneNode => ({ id, label, sub, icon, pattern })

export const breakGlass: Scene = {
  id: 'break-glass',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'tenant',
      label: 'Woodgrove’s tenant',
      icon: 'tenant',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'glass',
          label: 'Break-glass accounts',
          sub: 'Global Administrator · used only in an emergency',
          icon: 'mfa',
          pattern: 'warn',
          cols: 2,
          children: [who('bg1', 'breakglass-01', 'cloud-only', 'key', 'warn'), who('bg2', 'breakglass-02', 'cloud-only', 'key', 'warn')],
        },
        {
          id: 'daily',
          label: 'Daily accounts',
          sub: 'no standing admin rights',
          icon: 'users',
          pattern: 'user',
          cols: 3,
          children: [who('priya', 'priya', 'data engineer', 'usercheck', 'user'), who('omar', 'omar', 'risk analyst', 'usercheck', 'user'), who('sam', 'sam', 'credit officer', 'usercheck', 'user')],
        },
        who('workloads', 'Workloads', 'managed identities, not people · Course 4', 'managedidentity', 'service'),
      ],
    },
    {
      id: 'reach-side',
      label: 'Why it is guarded',
      bare: true,
      children: [
        {
          id: 'reach',
          kind: 'table',
          label: 'What the highest roles reach',
          headers: ['role', 'can'],
          values: [
            ['Global Administrator', 'change any Entra setting, grant any Entra role'],
            ['Global Administrator', 'elevate to every subscription in the tenant'],
            ['Owner of a subscription', 'do anything in it, and grant access to it'],
            ['priya, on a normal day', 'what her group is granted — Course 4'],
          ],
        },
        {
          id: 'lock',
          kind: 'list',
          icon: 'lock',
          label: 'Lock it away',
          pattern: 'warn',
          items: [
            'Two accounts, cloud-only, never federated',
            'Phishing-resistant MFA: a hardware key, kept apart',
            'An alert on every sign-in, read by a person',
            'A tested procedure: who may open it, and when',
          ],
        },
        {
          id: 'never',
          kind: 'list',
          icon: 'circleslash',
          label: 'Why nobody works as one',
          pattern: 'user',
          items: [
            'A phished daily account must not own the tenant',
            'Admin rights are granted for an hour, not for ever — PIM, Course 4',
            'Azure demands MFA for portal and CLI sign-ins anyway',
            'Azure has no single root user: access is roles at scopes',
          ],
        },
      ],
    },
  ],
  edges: [],
}
