import type { Section } from '../types'

// Ch4 §4. Reference: Azure network security groups overview; default security rules.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the default rule names and priorities (65000, 65001, 65500) against current documentation.
export const networkSecurityGroups: Section = {
  id: 'network-security-groups',
  title: 'Network security groups and rule scope',
  scene: 'nsg',
  focus: 'first',
  slide: `## Allow and deny rules

### Network security groups
- An ordered list of rules: **priority, source, destination, port, action**
- The **lowest number** is checked first, and the **first match** wins
- Attach one to a **subnet** or a **NIC**
- Use **service tags** such as Internet, not address lists

### Stateful
- Allowing a request in **automatically allows its reply**

### Defaults
- Default rules allow traffic **within the VNet** and from the load balancer
- Everything else inbound is **denied**

### What it does not know
- An NSG filters **packets**
- It knows nothing about **who the user is**`,
  narration:
    "A network security group, or NSG, is Azure's basic packet filter. It is an ordered list of rules, and each rule says a priority, a source, a destination, a port and an action, allow or deny. The lowest priority number is checked first, and the first rule that matches decides. In the table, rule one hundred allows HTTPS from the internet to our web subnet, and rule two hundred denies remote administration from the internet. Below them sit the default rules, which Azure always adds. They allow traffic within the virtual network and deny every other inbound connection. NSGs are stateful, so if an inbound request is allowed, the reply is allowed automatically; you do not write a matching outbound rule. You attach an NSG to a subnet or to a network interface, and the scope matters: a rule on the subnet applies to everything in it. One honest limitation to keep in mind. An NSG sees addresses, ports and protocols. It has no idea who the user is, or whether the request is legitimate. That is the job of other layers, which we meet shortly. First, names.",
}
