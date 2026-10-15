import type { Section } from '../types'

// Ch5 §4. Reference: Azure Container Registry overview, roles and content trust; Docker image build basics.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm ACR roles (AcrPush, AcrPull), the scanning and signing options available on the chosen tier, and digest pinning syntax.
export const containerImagesAndRegistries: Section = {
  id: 'container-images-and-registries',
  title: 'Container images, Azure Container Registry and supply-chain boundaries',
  scene: 'images',
  focus: 'trust',
  slide: `## Images and registries

### The image
- A **Dockerfile** builds a portable, layered **image**
- The same image runs on a laptop, Container Apps or AKS

### The registry
- **Azure Container Registry** stores images
- A **tag** such as 1.4.2 can be moved
- A **digest** identifies exact content and cannot change

### Supply-chain boundaries
- Few identities may **push**
- **Scan** and optionally **sign** before it runs
- Workloads **pull** with a managed identity, not a shared password
- Pin base images, and rebuild to pick up patches

### Build hygiene
- Keep images **small** and run as a **non-root** user
- Never bake **secrets** into an image`,
  narration:
    "Containers package an application and its dependencies into one portable image. The Dockerfile in the card says how: start from a slim Python base image, install the requirements, copy in the code, and define the command. The result runs the same way on a laptop, in Container Apps or on Kubernetes. Images live in a registry, and Azure Container Registry is the Azure one. Look at the two cards inside it. A tag, like one dot four dot two, is a friendly label, but a tag can be moved to point at different content later. A digest is an identifier of the exact content, and it can never change, so pinning by digest is how you know precisely what is running. The registry is also where trust is decided. Allow only a few identities to push images. Scan them, and sign them if your policy requires it, before they run. Let workloads pull using a managed identity with a pull-only role, never a shared password. Keep images small, run as a non-root user, and never bake secrets in. And remember base images age, so rebuild regularly to pick up patches. With an image in a registry, where do we run it?",
}
