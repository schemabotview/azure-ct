import type { Section } from '../types'

// Ch5 §6. Reference: Azure Kubernetes Service overview and operations; Kubernetes Deployment concepts.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm what AKS manages versus the customer (control plane, node upgrades) and whether AKS Automatic should be mentioned.
export const aksAndKubernetes: Section = {
  id: 'aks-and-kubernetes',
  title: 'AKS and Kubernetes: orchestration needs and complexity',
  scene: 'aks',
  focus: 'worth',
  slide: `## Kubernetes as a service

### What AKS gives you
- The **Kubernetes API**: Deployments, Services, custom controllers
- Azure runs the **control plane**

### What it still asks of you
- **Node pools**: sizing, upgrades and capacity
- **Workloads**: manifests, probes, resource limits
- **Add-ons**: ingress, policy, monitoring, networking
- **Security**: network policy, image sources and **pod identity**
- **Version upgrades** on a regular cadence

### Try first
- **Container Apps** or **App Service** before AKS

### When it is justified
- You need **Kubernetes itself**: its APIs, ecosystem or portability
- You have a team to **operate** it`,
  narration:
    "Azure Kubernetes Service gives you Kubernetes without installing it yourself. Kubernetes is an orchestrator: you declare what you want, such as three replicas of the order API, and it keeps reality matching that declaration. The manifest in the card is exactly that declaration. In an AKS cluster, Azure runs the control plane, the part that makes the decisions. But the rest is still yours. You choose and size the node pools, which are virtual machines, and you upgrade them. You write and maintain the manifests, health probes and resource limits for the workloads. You add and operate the pieces around the cluster, such as ingress, policy and monitoring. You also own cluster security, such as network policy and pod identity. And you keep the Kubernetes version moving forward, because versions go out of support. So when is it worth it? When you need Kubernetes itself, its API, its ecosystem, or its portability across environments, and when you have a team who can operate it. If you only need to run containers, Container Apps is simpler. How do all these options scale, and what goes wrong when they do?",
}
