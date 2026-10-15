import type { Section } from '../types'

// Ch3 §3. Reference: Azure CLI az webapp commands; App Service deployment and configuration docs.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the --runtime string with `az webapp list-runtimes`, and the B1 tier name and region availability.
export const deploymentStartupAndConfiguration: Section = {
  id: 'deployment-startup-and-configuration',
  title: 'Deployment, startup and configuration',
  scene: 'deployment',
  focus: 'start',
  slide: `## From files to a running app

### Four steps
- **Create** the plan and the app
- **Configure** the app settings
- **Deploy** a release artefact, such as a zip file
- The platform **starts** your process

### App settings
- They appear to your code as **environment variables**
- Changing one **restarts** the app

### When it will not start
- Read the **startup logs** first
- Usual causes: a **missing setting**, a wrong **start command**, or a process not **listening** where the platform expects

### Release artefacts
- Deploy the **same artefact** to every environment
- Only the **settings** should differ`,
  narration:
    "Here is the whole journey in four commands. The first creates a Linux plan on the Basic tier. The second creates the web app on that plan and picks a Python runtime. The third sets an app setting, the catalogue address. The fourth deploys a zip file, which is our release artefact: the exact bundle of code we want to run. Now look at what happens on the instance. The platform unpacks the artefact, makes the app settings available as environment variables, and runs a start command to launch the process. The app is only healthy once that process is listening on the port the platform expects. When an app will not start, this sequence tells you where to look. The startup logs usually show it: a setting that is missing, a start command that points at the wrong file, or a process that listens somewhere else. A good habit follows from this. Deploy the same artefact to every environment, and let only the settings differ. Then a bug in production can be reproduced with the same bits. Now, about those settings that hold secrets.",
}
