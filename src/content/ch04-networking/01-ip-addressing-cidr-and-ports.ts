import type { Section } from '../types'

// Ch4 §1. Reference: Azure virtual network IP addressing and subnet docs; CIDR notation.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the five reserved addresses per subnet and current minimum/maximum subnet sizes.
export const ipAddressingCidrAndPorts: Section = {
  id: 'ip-addressing-cidr-and-ports',
  title: 'IP addresses, CIDR ranges and ports',
  scene: 'ch04-cidr',
  focus: 'reading',
  slide: `## Addresses, ports and subnets

### An IP address
- Identifies a **network interface**; IPv4 addresses are **32 bits**
- Ranges such as **10.0.0.0/8** are **private**, not routed on the public internet

### CIDR notation
- **10.20.1.0/24**: the first 24 bits are the **network**, the last 8 vary
- A /24 holds **256** addresses, a /16 holds **65,536**
- Azure reserves **5 per subnet**, so a /24 gives **251** usable
- A **/32** is one address; **/0** is all

### Sizing a subnet
- Count what will live in it and add **headroom**

### Ports and protocols
- A **port** picks the service on a host, over **TCP or UDP**
- 443 is HTTPS, 1433 is SQL Server, 53 is DNS`,
  narration:
    "Before we can trace our shop's traffic, we need the vocabulary of addresses. An IPv4 address names a network interface and is 32 bits long. Some ranges, such as those starting with 10, are private, which means they are not routed on the public internet, and Azure virtual networks use them. A range is written in CIDR notation. Take ten dot twenty dot one dot zero slash twenty-four. The slash says that the first twenty-four bits identify the network and stay fixed, while the last eight bits vary, so the subnet holds two to the power of eight, which is 256 addresses. A slash sixteen holds 65,536. In the table, notice the last column. Azure reserves five addresses in every subnet, so a slash twenty-four gives 251 you can actually use, and a slash twenty-eight gives only eleven. That matters when you size subnets: count what will live there and add headroom. Finally, an address alone does not say which service you want. A request also names a port and a protocol. Port 443 over TCP is HTTPS, 1433 is SQL Server, and DNS answers on port 53. With that vocabulary, we can build the network itself.",
}
