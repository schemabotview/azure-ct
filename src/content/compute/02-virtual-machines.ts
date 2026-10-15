import type { Section } from '../types'

// Ch5 §2. Reference: Azure Virtual Machines overview; managed disks; Azure Bastion; Azure Update Manager.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the image alias, VM size availability in the Region, and that only a deallocated VM stops compute billing.
export const virtualMachines: Section = {
  id: 'virtual-machines',
  title: 'Virtual machines: images, disks, lifecycle and patching',
  scene: 'vm',
  focus: 'dealloc',
  slide: `## A virtual machine

### What it is made of
- An **image**, a **size**, **managed disks** and a **network interface**
- You choose the OS and everything above it

### Lifecycle and billing
- **Running** bills compute and disks
- Stopping from **inside the OS** keeps the VM allocated and billed
- A **deallocated** VM stops compute charges; **disks still bill**

### Disks
- The **OS disk** persists; the VM's **temporary disk** does not

### Access
- Avoid a public IP for admin; use **Bastion** or just-in-time access

### Patching
- **You** patch the guest OS`,
  narration:
    "A virtual machine gives you the most control and the most work. It is built from an image, which is the starting operating system, a size that sets the CPU and memory, managed disks for storage, and a network interface. The command in the card creates one with no public IP address, which is deliberate. Lifecycle matters because billing follows it. A running machine bills for compute and for its disks. If you shut it down from inside the operating system, Azure still keeps it allocated, and compute charges continue. Only a deallocated machine stops the compute charge, and its disks keep billing either way. The temporary disk is not durable, so never keep important data there. For access, avoid exposing administration to the internet. Use Azure Bastion or just-in-time access instead, so there is no open remote-login port. Finally, patching is yours. Azure maintains the host, but the guest operating system is your responsibility, so use an update management service rather than logging in and patching by hand. One machine is also a single point of failure, so what keeps a fleet of them healthy?",
}
