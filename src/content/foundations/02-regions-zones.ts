import type { Section } from '../types'

// Ch1 §2. Reference: Microsoft Learn Azure regions and availability zones pages.
// Not verified against live docs at authoring time — re-check the zone-count wording and which
// regions offer zones before publishing; availability changes over time.
export const regionsZones: Section = {
  id: 'regions-zones',
  title: 'Regions, zones and failure boundaries',
  scene: 'regions-zones',
  focus: 'region',
  slide: `## Regions and zones

### Region
- A geographic area with datacenters, and the place you **choose** for most resources
- Services, sizes and prices **differ by region**

### Availability zones
- In regions that offer them, **separate locations** with independent power, cooling and networking
- A **zone-redundant** service spreads itself; a **zonal** one you pin to a zone

### In the retail example
- Three order API instances, **one per zone**
- A **zone-redundant** load balancer in front

### What a boundary means
- Zones help against a **datacenter** failure
- They do not help against a **bad deployment** or a deleted resource
- A second region is **your design**, not a default`,
  narration:
    "Every resource you create lands in a region, which is a geographic area containing Azure datacenters. You choose it, and the choice matters, because the services, machine sizes and prices on offer differ from region to region. Many regions are further divided into availability zones. Each zone is a physically separate location with its own power, cooling and networking, so a fault in one should not take down the others. Some services are zone-redundant, meaning Azure spreads them across zones for you, while others are zonal, meaning you pin an instance to a particular zone. In the diagram our order API runs three instances, one per zone. If a whole zone fails, two instances keep serving. Notice what this does and does not protect against. It is a defence against a datacenter-scale failure. It does nothing about a bad deployment that ships to all three instances, or someone deleting the database. And a second region is a separate boundary again, which only exists if you build it. Next, how resources are grouped and owned.",
}
