import type { Section } from '../types'

// Ch12 §1. Reference: Azure Well-Architected: performance efficiency; Application Insights performance analysis.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const performanceMeasurementAndBottlenecks: Section = {
  id: 'performance-measurement-and-bottlenecks',
  title: 'Performance measurements, latency distributions and bottlenecks',
  scene: 'latency',
  focus: 'breakdown',
  slide: `## Measure before tuning

### Use distributions
- An **average** hides the slow tail
- Look at **p95 and p99**: they are what unlucky users feel
- Measure **throughput** as well: requests per second

### Find the bottleneck
- Break one request into **segments**
- The **largest** segment is the first suspect
- Here the **SQL query** is 59 % of the p95

### Method
- **Measure**, then **change one thing**
- **Measure again** and keep what helped

### Capacity
- Latency **rises sharply** near saturation

### Beware
- Improving a **small segment** wastes effort
- Test at **realistic load**, not on an idle system`,
  narration:
    "Optimisation begins with measurement, and the first rule is to look at distributions, not averages. In the second table, the average response time for our product page on one day is a hundred and eighty milliseconds, which sounds fine. But the ninety-fifth percentile is six hundred and forty, and the ninety-ninth is fourteen hundred. Those slower requests are what some users actually experience, and the average hides them. Throughput matters too, meaning how many requests per second the system handles at acceptable latency. Next, find the bottleneck. The first table breaks one slow request into segments, with synthetic numbers. The browser to edge hop, our application code, even the catalogue call are all small. The SQL query accounts for three hundred and eighty of six hundred and forty milliseconds, fifty-nine percent. That is the first suspect. Tuning the render step, which is three percent, would be wasted effort. The method is simple: measure, change one thing, then measure again and keep what helped. Latency also rises sharply near saturation. And measure at realistic load, because an idle system hides contention. A fast database query needs fewer trips, which brings us to caching at the edge.",
}
