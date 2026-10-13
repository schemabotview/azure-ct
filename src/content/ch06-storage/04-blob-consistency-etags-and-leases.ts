import type { Section } from '../types'

// Ch6 §4. Reference: Managing concurrency in Blob Storage; blob leases; Azure Storage consistency model.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm that single-blob operations are strongly consistent and that there are no multi-blob transactions, and lease duration limits.
export const blobConsistencyEtagsAndLeases: Section = {
  id: 'blob-consistency-etags-and-leases',
  title: 'Blob consistency, ETags, conditional operations and leases',
  scene: 'ch06-concurrency',
  focus: 'request',
  slide: `## Two writers, one blob

### Consistency
- A successful write is **visible to the next read**
- That is **per blob**: there are **no multi-blob transactions**

### Optimistic concurrency
- Every blob has an **ETag** that changes on each write
- Send **If-Match** with the ETag you read
- A stale writer gets **412 Precondition Failed**

### Leases
- A **lease** is a timed **exclusive lock** on a blob or container
- Use for **short critical sections**, with renewal

### Common mistakes
- Sending **no condition**: the **last writer wins**
- To create only if absent, send \`If-None-Match: *\`

### Designing for it
- **Re-read and retry** after a 412`,
  narration:
    "Suppose two parts of our shop update the same receipt at the same time. Blob Storage is strongly consistent, which means once a write succeeds, the next read sees it. But that guarantee is per blob. There are no transactions across several blobs, so two related blobs can never be updated atomically. For one blob, the tool for concurrent writers is the ETag. Every blob has an ETag that changes whenever it is written. The table shows the pattern. Both writers read the blob and get version one. Writer A writes first, with an If-Match header naming version one, and it succeeds, so the blob becomes version two. Writer B then writes with the same If-Match header. The condition no longer holds, and the service answers 412, precondition failed, instead of silently overwriting A's change. B should re-read and retry. A lease is the heavier alternative: a timed, exclusive lock, which suits short critical sections, with renewal. With no condition, the last writer simply wins, and a conditional create can use if-none-match with a star. Design accordingly. Expect to retry after a 412, and never assume two blobs change together. Next, protecting data from the changes we make ourselves.",
}
