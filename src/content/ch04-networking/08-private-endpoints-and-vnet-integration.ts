import type { Section } from '../types'

// Ch4 §8. Reference: App Service VNet integration; Private Link and private endpoints; service endpoints overview.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm that a private endpoint does not by itself disable the service public endpoint, and the DNS zone names for each service.
export const privateEndpointsAndVnetIntegration: Section = {
  id: 'private-endpoints-and-vnet-integration',
  title: 'Private endpoints, service endpoints and VNet integration',
  scene: 'ch04-private-access',
  focus: 'pe',
  slide: `## Private paths to services

### VNet integration
- **Outbound** from the app into a VNet
- It does not make the app privately reachable **inbound**

### Private endpoint
- A **private IP** in your subnet for one service
- It does **not** switch off the service's public endpoint
- It does **not** grant **permission** to the data

### Service endpoint
- Optimises the route and lets a firewall **allow a subnet**
- Traffic still targets the service's **public address**

### Which to choose
- **Integration** for outbound, **private endpoint** for private inbound

### The failure to recognise
- The name still resolves to the **public IP**, and the call fails
- That is a **DNS** problem, not a firewall rule`,
  narration:
    "Our web app needs to reach its database privately. Three features sound alike, so let's separate them. VNet integration is outbound. It lets the app send traffic into a virtual network, through an integration subnet. It does not make the app itself privately reachable from outside. A private endpoint is the opposite kind of thing: it gives one service instance, here our Azure SQL server, a private IP address inside your subnet. Two cautions. A private endpoint does not by itself switch off the service's public endpoint, so you must disable public access separately. And it grants no permission to the data; you still need the right roles or logins. A service endpoint is an older, simpler idea. It improves the route and lets a service firewall allow your subnet, but the traffic still targets the service's public address. Now the failure in the code card. The app asks for the database name and gets the public address, because the private DNS zone is not linked to this network. With public access disabled, the call fails. The fix is DNS, not another firewall rule. So: integration for outbound, private endpoint for private inbound. Last, connecting whole networks.",
}
