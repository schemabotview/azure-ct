import type { Section } from '../types'

export const appService: Section = {
  id: 'app-service',
  title: 'App Service',
  scene: 'app-service',
  narration:
    "The map now has the exposure A P I, on App Service, which runs a web application's code on machines Azure manages. The code at the top is templates slash modules slash app dot bicep. First the plan, which is the machines: Premium version three, P one v three, three instances, spread across the Region's three zones, so losing a zone loses a third of the capacity, not the A P I. Then the app's settings: H T T P S only, public network access disabled, because the application gateway in front of it is the only way in, and outbound traffic through snet app in the spoke, so the A P I reaches the mart's private endpoint. The runtime stack is Python three point twelve, which Azure keeps patched; the startup command runs app slash server dot p y; and the health check calls slash health. The terminal compiles the module and lists what it creates: the plan; the app, after the plan; a staging slot, after both; and an autoscale setting on the plan. The table at the bottom translates App Service's words. A plan is the machines. An app is the A P I, running on every instance of its plan. The runtime stack is the language version Azure maintains. The startup command is how the app is started. App settings arrive as environment variables. And a deployment is a zip of the app folder, sent to a slot. Next, those settings, and why none of them is a secret.",
}
