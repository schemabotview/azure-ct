import type { Section } from '../types'

// Ch1 §5. Reference: Azure CLI and Cloud Shell docs; ARM resource-ID format.
// Command syntax and the reply shape follow the `az group create` contract; the reply is trimmed.
// Not run in a live subscription at authoring time — re-run before publishing.
export const firstRequestAndResourceId: Section = {
  id: 'first-request-and-resource-id',
  title: 'A first request and the resource ID',
  scene: 'ch01-first-request',
  focus: 'anatomy',
  slide: `## Your first request

### Where to run it
- **Portal** for exploring
- **Azure CLI** for repeatable commands
- **Cloud Shell**: a browser shell that is already signed in

### The call
- \`az group create\` sends a request to ARM
- The reply echoes the group's **id**, **location** and **tags**
- \`Succeeded\` means the group exists, nothing more
- Running it again with the same values returns the **same group**

### The resource ID
- A path of **scope, then type, then name**
- It uniquely names one resource
- It is what you pass to policies, role assignments and templates`,
  narration:
    "Time to make a real request. You can work in the portal, which is good for exploring, or in the Azure CLI, which is better for anything you want to repeat. Cloud Shell gives you the CLI in a browser tab, already signed in. In the code card, the first command picks the development subscription, and the second creates a resource group called rg-retail-dev in Sweden Central, tagged with the environment and an owner. The command sends a request to Resource Manager, and the reply comes back as JSON. We have trimmed it to the fields that matter. The provisioning state says Succeeded, which tells us the group now exists and nothing more. Run the same command again with the same values and you get the same group back rather than a duplicate. The most useful field is the id. A resource ID is a path that reads from broad to specific: the subscription, then the resource group, then the provider, then the resource type and name. For a web app it would pass through Microsoft.Web and the sites type. Because it names exactly one resource, the ID is what policies, role assignments and templates use to point at things. One last topic before we leave foundations: what all of this costs, and how to stop paying for it.",
}
