import type { Section } from '../types'

// Ch5 §5. Reference: Azure Container Apps overview, revisions, ingress, scale rules and jobs.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm az containerapp flags, scale-to-zero behaviour, and revision traffic-splitting commands for the current CLI.
export const azureContainerApps: Section = {
  id: 'azure-container-apps',
  title: 'Azure Container Apps: revisions, ingress, jobs and scaling',
  scene: 'ch05-container-apps',
  focus: 'rev2',
  slide: `## Containers without cluster work

### Environment and app
- An **environment** shares networking and logging
- An app runs your **image** with **ingress** if it needs a public endpoint

### Revisions
- A **revision** is an immutable snapshot of the app
- **Split traffic** between revisions for a canary or rollback

### Jobs
- A **job** runs to completion instead of serving requests

### Good fits
- Stateless **HTTP APIs**, workers and event processors
- No direct access to the **Kubernetes API**

### Scaling
- Replicas follow **rules**: HTTP load, queue length, schedules
- **Scale to zero** saves money, but adds a **cold start**`,
  narration:
    "Azure Container Apps runs containers without making you operate a Kubernetes cluster. You create an environment, which provides shared networking and logging, and then deploy apps into it. The command in the card deploys our order API image, enables external ingress on port 8000, and lets the app run between zero and five replicas. Each time you change the app's definition, Container Apps creates a revision. A revision is an immutable snapshot, so you can run two at once and split traffic between them: in the diagram, eighty percent goes to revision one and twenty percent to revision two, which is a canary release you can roll back by shifting the split. Jobs are the other workload shape. A job runs to completion, such as a nightly export, instead of waiting for requests. It suits stateless APIs, workers and event processors, and it does not expose the Kubernetes API. Scaling follows rules: concurrent HTTP requests, the length of a queue, or a schedule. Scale to zero is attractive because an idle app costs very little, but the price is a cold start when the first request arrives. If your latency target cannot absorb that, keep at least one replica running. And when containers are not enough?",
}
