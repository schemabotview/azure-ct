import type { Scene } from '@graphlearning/flow'

// Ch2 §1 — authentication ends in a token; it grants no access by itself. Federation is a trust
// relationship with another identity provider. Conditional Access depends on licensing.
export const signIn: Scene = {
  id: 'sign-in',
  title: 'From sign-in to a token',
  flow: 'TB',
  padding: 0.05,
  nodes: [
    { id: 'person', label: 'Priya', sub: 'support engineer', pattern: 'user', icon: 'users' },
    { id: 'idp', label: 'Corporate IdP', sub: 'federated sign-in', pattern: 'external', icon: 'externalidentities' },
    {
      id: 'entra',
      label: 'Microsoft Entra tenant',
      sub: 'checks who you are',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'credential', label: 'Credential', sub: 'password or passkey', pattern: 'user', icon: 'key' },
        { id: 'mfa', label: 'MFA', sub: 'a second factor', pattern: 'user', icon: 'mfa' },
        { id: 'rules', label: 'Access rules', sub: 'Conditional Access', pattern: 'warn', icon: 'conditionalaccess' },
      ],
    },
    { id: 'token', label: 'Token', sub: 'proof, not a password', pattern: 'storage', icon: 'scroll' },
    { id: 'azure', label: 'Azure and apps', sub: 'accept the token', pattern: 'service', icon: 'cloud' },
  ],
  edges: [
    { source: 'person', target: 'entra', label: 'signs in' },
    { source: 'idp', target: 'entra', label: 'trusted by', dashed: true },
    { source: 'entra', target: 'token', label: 'issues' },
    { source: 'token', target: 'azure', label: 'presented' },
  ],
}
