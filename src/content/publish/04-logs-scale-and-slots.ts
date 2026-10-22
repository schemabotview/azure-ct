import type { Section } from '../types'

export const logsScaleAndSlots: Section = {
  id: 'logs-scale-and-slots',
  title: 'Logs, scale and slots',
  scene: 'logs-scale-slots',
  narration:
    "A new release must not make the dealers' screens stall, and a bad one must be undone in seconds. The script at the top is infra slash twelve release dot sh. It zips the app folder and deploys it, not to production, but to the staging slot: a second, live copy of the app with its own address, running on the same plan. It then checks the staging slot's state. And it swaps staging into production. The swap first warms the production instances with the new code, then switches traffic, so nobody meets a cold start. The old release is now in staging, still warm, so rolling back is the same swap again. The first table is scaling, which App Service does two ways. Scaling up changes the plan's size, from P one v three to P two v three, by hand and rarely. Scaling out changes the number of instances, and autoscale does it: from three to ten, adding an instance when average C P U stays above seventy per cent for ten minutes, and removing one when it falls below thirty, with ten minutes' cooldown so it does not flap. Three is the floor, one per zone. The second table is health and logs. The health check path, slash health, takes an instance that keeps failing out of the load balancer's rotation. Standard output, the A P I's one line per request, is collected by App Service, and Course thirteen sends it on to Log Analytics. The staging slot warms before the swap. And swapping again is the rollback. Next, a step back: other places the same A P I could have run.",
}
