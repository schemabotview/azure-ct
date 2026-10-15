import type { Section } from '../types'

// Ch3 §1. Reference: HTTP basics; App Service app settings and environment variables.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const httpRequestsAndProcesses: Section = {
  id: 'http-requests-and-processes',
  title: 'HTTP requests, processes and configuration',
  scene: 'request-path',
  focus: 'deps',
  slide: `## A request and its process

### The request
- HTTP is a **request and a response**: method, path, headers, optional body
- The hostname leads to your app; the path picks the **handler**

### The process
- Your code is a **long-running process** waiting for requests
- It reads **configuration** from environment variables, not from edited code

### The dependency call
- The handler often calls **another service**
- Most failures show up here: **timeouts, refusals, bad data**

### Reading a failure
- A **500** says your code failed; check what it was calling
- A **timeout** does not tell you whether the dependency ran`,
  narration:
    "We will follow one small application for the whole chapter, so let's start with what it actually does. A browser sends an HTTP request: a method, a path, some headers, and sometimes a body. The hostname gets the request to our app, and the path decides which handler answers. In the code card, the handler for slash products slash 42 is a function inside a long-running process. That process starts once, then waits for requests, and that matters, because it explains where configuration lives. The catalogue address is read from an environment variable at startup, not typed into the code, so the same code can run in development and production with different settings. Now look at the handler itself. To answer, it calls another service, the catalogue store. That dependency call is where most real failures appear: a timeout, a refused connection, an unexpected answer. So when a request fails, the question is not only whether our code ran, but what it was talking to. A 500 tells us our code failed. A timeout does not even tell us whether the dependency did its work. Next, where does this process run?",
}
