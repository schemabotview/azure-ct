import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'

// TLS protects one hop between two endpoints that terminate it; each later hop needs its own. The
// platform sets TLS 1.2 as the minimum on storage, App Service and PostgreSQL flexible server (which
// requires encrypted connections by default). Traffic over ExpressRoute is NOT encrypted by default:
// it is private, not secret; MACsec exists on ExpressRoute Direct only, and IPsec can run over it.
// source: https://learn.microsoft.com/en-us/azure/expressroute/expressroute-about-encryption
// source: https://learn.microsoft.com/en-us/azure/storage/common/transport-layer-security-configure-minimum-version
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/security-tls
// source: https://learn.microsoft.com/en-us/azure/app-service/overview-tls
export const tls: Scene = mapFrame('tls-path', [...BUILT_BY[4], 'vnet', 'pe'], {
  id: 'tls-pane',
  label: 'side',
  bare: true,
  children: [
    {
      id: 'hops',
      kind: 'table',
      label: 'Hop by hop: who ends the encryption',
      headers: ['from → to', 'protected by', 'ends at'],
      values: [
        ['analyst → Front Door', 'TLS, the bank’s certificate', 'Front Door'],
        ['Front Door → the API', 'a new TLS session', 'App Service'],
        ['the API → the risk mart', 'TLS, required', 'PostgreSQL'],
        ['Databricks → the lake', 'HTTPS, TLS 1.2 or later', 'Storage'],
        ['TradeBook → integration VM', 'ExpressRoute: none by default', '—'],
        ['integration VM → the lake', 'HTTPS', 'Storage'],
      ],
    },
    {
      id: 'certs',
      kind: 'table',
      label: 'Certificates the platform holds',
      headers: ['name', 'issued by', 'kept in'],
      values: [
        ['risk.woodgrovebank.example', 'a public CA', 'Key Vault'],
        ['*.azurewebsites.net', 'Microsoft', 'App Service'],
        ['the PostgreSQL server’s', 'Microsoft (its root CA)', 'the server'],
      ],
    },
    {
      id: 'tls-means',
      kind: 'list',
      icon: 'lock',
      label: 'Private is not encrypted',
      pattern: 'warn',
      items: [
        'A private endpoint keeps traffic off the internet, not unreadable',
        'ExpressRoute carries plain text unless MACsec or IPsec is added',
        'So TradeBook’s copy is wrapped in TLS end to end (Course 8)',
        'Minimum TLS 1.2 is set on every service, never assumed',
      ],
    },
  ],
})
