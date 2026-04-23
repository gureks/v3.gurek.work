# Architecture Patterns

**Domain:** Conversational AI Portfolio UI
**Date:** 2026-04-23

## Pattern: NDJSON Stream Parser
The LightRAG backend returns NDJSON (Newline-Delimited JSON) via `/query/stream`.
- **Implementation:** Use `fetch` API and read from the `response.body` (ReadableStream).
- **Data Flow:** Split incoming stream by newlines (`\n`), parse each line as JSON, and append `response` chunks to the active message state.

## Pattern: Block-based Rendering Optimization
- Rendering huge markdown strings on every character tick can crash the browser.
- **Implementation:** Memoize markdown rendering, or throttle state updates to ~30fps to avoid layout thrashing during fast streams.

## Pattern: Context-Aware Layout
- Separate the "Chat Interface" from the "Project Navigation" (Gems).
- Provide a responsive wrapper where the sidebar is absolutely positioned on mobile and statically positioned on desktop.
