import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import script from '../../../spine/secure/03-identities/project/infra/04-identities.sh?raw'

// A managed identity is a service principal Azure creates and whose credentials it rotates; code on
// the resource gets tokens from a local endpoint, never a secret. System-assigned: one resource,
// same life cycle, deleted with it. User-assigned: independent life cycle, can be shared, and the
// type Microsoft now recommends for its own services. An identity alone grants nothing: it needs
// role assignments like any other principal.
// source: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview
// source: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-managed-identities-work-vm
export const identities: Scene = mapFrame('managed-identities', [...BUILT_BY[3], 'entra', 'mi'], {
  id: 'identities-side',
  label: 'side',
  bare: true,
  children: [
    { id: 'identities-script', kind: 'code', filename: 'infra/04-identities.sh', label: script.replace(/\n+$/, ''), highlight: [5, 8, 9], pattern: 'user' },
    {
      id: 'who-has',
      kind: 'table',
      label: 'The platform’s workload identities',
      headers: ['identity', 'kind', 'ends when'],
      values: [
        ['id-wg-exposure-prod', 'user-assigned', 'someone deletes it'],
        ['adf-wg-risk-prod', 'system-assigned', 'the factory goes'],
        ['ac-wg-risk-prod', 'system-assigned', 'the connector goes'],
        ['vm-wg-shir-prod-1', 'system-assigned', 'the VM goes'],
      ],
    },
    {
      id: 'kinds',
      kind: 'table',
      label: 'Two kinds',
      headers: ['', 'system-assigned', 'user-assigned'],
      values: [
        ['belongs to', 'one resource', 'itself'],
        ['shared', 'no', 'yes, by many'],
        ['deleted', 'with the resource', 'on purpose'],
      ],
    },
    {
      id: 'mi-means',
      kind: 'list',
      icon: 'key',
      label: 'No password, still not a pass',
      pattern: 'warn',
      items: ['No secret to store, leak or rotate: Azure does it', 'It reads nothing until it is given a role', 'Only Azure resources can use one; TradeBook cannot'],
    },
  ],
})
