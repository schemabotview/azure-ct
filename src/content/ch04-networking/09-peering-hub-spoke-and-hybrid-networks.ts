import type { Section } from '../types'

// Ch4 §9. Reference: Virtual network peering; hub-spoke topology; VPN Gateway and ExpressRoute overviews.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm that ExpressRoute is not encrypted by default (MACsec and IPsec options exist) and current gateway transit behaviour.
export const peeringHubSpokeAndHybridNetworks: Section = {
  id: 'peering-hub-spoke-and-hybrid-networks',
  title: 'Peering, hub-spoke, VPN and ExpressRoute',
  scene: 'ch04-hub-spoke',
  focus: 'hub',
  slide: `## Connecting networks

### Peering
- Connects two VNets over Microsoft's backbone
- It is **not transitive**: A to B and B to C does not give A to C

### Hub-spoke
- **Shared services** in a hub, **workloads** in spokes
- Spokes reach each other only if you **route** through the hub
- A hub **firewall** can inspect that traffic and egress

### Hybrid links
- **VPN gateway**: encrypted, over the internet
- **ExpressRoute**: a **private** circuit, not encrypted by default

### Boundaries
- **Overlapping** address ranges cannot connect cleanly
- Connected networks still need **matching rules**, not just routes`,
  narration:
    "The last networking topic is joining networks together. Virtual network peering connects two VNets over Microsoft's backbone, and from then on they behave like one for routing. But peering is not transitive. If A is peered with B, and B is peered with C, A still cannot reach C. That limitation shapes the hub-spoke design in the diagram. Shared services, such as a central firewall and the gateway to the office, live in a hub network, and each workload gets its own spoke, peered to the hub. Spokes reach each other only if you deliberately route their traffic through the hub. For the way home, there are two kinds of link. A VPN gateway builds an encrypted tunnel across the internet. ExpressRoute is a private circuit from your site to Azure, which avoids the public internet, but private does not mean encrypted: it is not encrypted by default, so add encryption if you need it. Two boundaries to remember. Networks with overlapping address ranges cannot be connected cleanly, which is why we planned addresses early. And a connection only gives you routes. You still need matching security rules at each end. Next, we choose what actually runs our code.",
}
