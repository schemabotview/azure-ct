import type { Section } from '../types'

// Ch4 §3. Reference: Azure virtual network traffic routing; NAT Gateway; default outbound access retirement notice.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Verify the current state of default outbound access for new virtual networks and subnets, and route-selection precedence.
export const routesAndOutboundConnectivity: Section = {
  id: 'routes-and-outbound-connectivity',
  title: 'Routes, outbound connectivity and NAT',
  scene: 'routes-outbound',
  focus: 'nat',
  slide: `## Where packets go

### Routes
- A route table maps **address prefixes** to a **next hop**
- Azure adds **system routes**; you add **user-defined** ones
- The **most specific prefix** wins; for the same prefix, a user route beats a system route

### Outbound
- A workload needs an **explicit outbound path**
- **Default outbound access** is being phased out, so do not rely on it
- A **NAT gateway** gives a stable public IP

### Reading the table
- Look for **0.0.0.0/0**: it sets where internet-bound traffic goes
- Ask for the **effective routes** of a NIC to see what really applies
- A wrong next hop **drops** traffic or sends it through a firewall that blocks it`,
  narration:
    "When a packet leaves a workload, a route decides where it goes next. A route table is a list that maps address prefixes to a next hop. Azure supplies system routes, such as sending traffic within the virtual network directly, and sending everything else to the internet. You can add user-defined routes of your own. Two rules explain nearly every surprise. The most specific prefix wins. And when two routes have the same prefix, a user-defined route beats a system route. In the table, the last row is a user-defined default route that sends internet-bound traffic to a firewall, so it overrides the system one. That raises outbound connectivity, which deserves a clear answer. Virtual machines and apps used to get an implicit outbound address by default, but that default access is being phased out, so do not rely on it. Choose an explicit path. A NAT gateway gives all the outbound traffic from a subnet one stable public address, which partners can allow on their firewalls. A firewall in the path lets you inspect and control egress. When traffic vanishes, ask for the effective routes of the network interface. Now let's control which traffic is allowed at all.",
}
