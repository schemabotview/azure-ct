import type { Section } from '../types'

// Ch10 §1. Reference: Bicep overview; resource declaration syntax; ARM template reference and API versions.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the API version shown for Microsoft.Web/serverfarms, and the property names for a Linux plan.
export const armAndBicep: Section = {
  id: 'arm-and-bicep',
  title: 'ARM and Bicep: declarative resources, ownership and API versions',
  scene: 'bicep-basics',
  focus: 'parts',
  slide: `## Infrastructure as code

### Declarative
- You describe the **end state**
- Azure works out the **steps**
- Running it twice is **safe**

### Bicep and ARM
- **Bicep** is the readable language
- It compiles to an **ARM template**, the JSON ARM understands
- You review **Bicep**, not the JSON

### Reading a resource
- The **type** names the resource provider and kind
- The **API version** fixes the shape of the properties
- Newer versions bring **new properties**, so pin it deliberately

### Ownership
- The file in **source control** is the owner of the resource
- Manual portal edits become **drift**`,
  narration:
    "So far we created resources by typing commands. That works for a first request, but it does not scale, and it leaves no record of what should exist. Infrastructure as code solves that, and on Azure the native language is Bicep. Bicep is declarative: you describe the end state you want, and Azure works out the steps. That makes running it twice safe. Bicep compiles to an ARM template, the JSON that Azure Resource Manager understands, but you review and edit the Bicep, which is far more readable. Look at the resource line in the card. The type names the resource provider and the kind, here a server farm, which is the App Service plan from chapter three. After the at sign comes the API version, and that matters. It fixes the shape of the resource's properties, so a newer version can bring new properties, and you should pin the version deliberately. A final point about ownership. Once a resource is declared in a file under source control, that file owns it. A manual change in the portal is drift, and it will be flagged or overwritten at the next deployment. Next, structuring larger deployments.",
}
