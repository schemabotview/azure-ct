import type { Section } from '../types'

// Ch9 §6. Reference: Azure Stream Analytics windowing functions and late arrival handling; event time vs processing time.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm Stream Analytics query syntax, late-arrival policy options and how they affect output timing.
export const streamingAnalyticsLateDataAndCost: Section = {
  id: 'streaming-analytics-late-data-and-cost',
  title: 'Streaming analytics, late data, duplicates and freshness trade-offs',
  scene: 'streaming',
  focus: 'late',
  slide: `## When the data cannot wait

### Event time and processing time
- **Event time**: when it happened
- **Processing time**: when it arrived
- They **differ**, sometimes by minutes

### Windows
- A **tumbling window** groups events into fixed periods
- A **late event** may miss its window or be adjusted

### Trade-offs
- Waiting for late data **delays** the result
- Replays and retries can **duplicate** events
- Always-on compute has a **cost**

### Decide
- Is a **fast, approximate** answer or a **late, accurate** one better?
- Use **batch** when a day-old answer is fine`,
  narration:
    "Sometimes a nightly batch is too slow, and we need results from a stream. Streaming brings a distinction batch hides: event time versus processing time. Event time is when something happened. Processing time is when the system received it. They can differ by minutes, because of network delays or retries. The Stream Analytics query in the card counts orders by product in five-minute tumbling windows, grouping events into fixed periods by their order time. Now suppose an order placed at ten oh four arrives at ten oh seven. The table shows the choice. If you allow no lateness, the window closes at ten oh five and the late event is dropped or adjusted, but the result is available on time. If you allow three minutes of lateness, the event is counted, but every result waits until ten oh eight. So lateness trades accuracy against freshness. Add two more pressures: replays and retries can duplicate events, and an always-on streaming job costs money all day. So decide what matters. A fast, approximate answer, or a late, accurate one? And if a day-old answer is fine, use batch. With analytics in place, how do we reproduce all this infrastructure reliably?",
}
