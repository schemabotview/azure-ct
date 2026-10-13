import type { Section } from '../types'

// Ch4 §2. Reference: Azure Virtual Network overview; subnet and network interface docs; address-space planning guidance.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const virtualNetworksAndSubnets: Section = {
  id: 'virtual-networks-and-subnets',
  title: 'Virtual networks, subnets and address planning',
  scene: 'ch04-vnet-subnets',
  focus: 'vnet',
  slide: `## Virtual networks and subnets

### Virtual network
- Your **private address space** in one region
- Separate from other VNets until you **connect** them

### Subnets
- Slices of the VNet's range
- Rules, such as NSGs and routes, attach per **subnet**
- Some services need a **dedicated subnet**

### Dedicated subnets
- Gateways and firewalls need their **own subnet**, often with a **required name**

### Network interfaces
- A **NIC** attaches a VM or a private endpoint to a subnet
- It receives a **private IP** from that subnet

### Address planning
- Networks you will connect must **not overlap**
- Leave **room to grow**
- Use one subnet per **role**`,
  narration:
    "A virtual network, or VNet, is your own private address space inside one Azure region. Nothing in it is reachable from another VNet until you deliberately connect them. In our diagram the network is called vnet-retail, with the range ten dot twenty dot zero dot zero slash sixteen. We slice it into subnets, one per role: a subnet for the web tier, one for data, and one for virtual machines. Why slice it at all? Because most controls attach per subnet. Network security groups and route tables apply to a subnet, and some Azure services, such as gateways and firewalls, insist on a dedicated subnet, often with a required name. Things join a subnet through a network interface. A virtual machine has one, and so does a private endpoint, and each receives a private IP address from the subnet's range. The bottom card is the part people regret skipping. Address planning. If two networks might ever be connected, their ranges must not overlap. Leave room for growth, because resizing a subnet that is in use is awkward. And give each role its own subnet, so rules can match roles. Next, how do packets find their way out?",
}
