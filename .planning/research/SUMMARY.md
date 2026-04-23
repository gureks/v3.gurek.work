# Domain Research Summary

**Domain:** Conversational AI Portfolio UI
**Date:** 2026-04-23

## Market Baseline
Modern AI chat interfaces expect a highly responsive, real-time streaming experience. The key challenge lies in rendering complex Markdown dynamically without destroying frontend performance. To stand out, portfolios are shifting from static layouts to conversational models, acting as a "Digital Brain."

## Key Findings

### 1. Stack & Tools
- The standard approach uses React + Vite + Tailwind CSS.
- To parse the streaming Markdown, `react-markdown` is commonly used alongside `remark-gfm` (for tables/strikethroughs).
- Micro-animations (like typing indicators or sliding menus) are essential and best handled by Framer Motion.

### 2. Architecture Patterns
- **NDJSON Streaming:** The LightRAG API utilizes an NDJSON (Newline-Delimited JSON) stream over HTTP. Fetch must read the `response.body` chunk-by-chunk and parse each valid JSON line before appending it to the UI state.
- **Throttling/Memoization:** Streaming triggers rapid re-renders. Bounding these updates or memoizing completed blocks prevents layout thrashing.

### 3. Critical Pitfalls
- **The "Broken Syntax" Problem:** When Markdown is mid-stream, syntax tags like code blocks (```) or bold markers (**) are unclosed, which breaks standard parsers. A robust implementation must gracefully handle partial structures.
- **Auto-scroll Jitter:** Blindly running `scrollIntoView` on every chunk creates a terrible user experience if the user tries to scroll up. Scroll locking is required.
- **Over-reliance on UI Libraries:** Since this project specifically forbids Shadcn or similar libraries, all generic components must be hand-built using base Tailwind utility classes to match the Figma designs flawlessly.

## Impact on Requirements
These findings confirm the necessity of building the chat components from scratch. Using off-the-shelf React chat libraries often introduces bloat or restricts customization, violating the "No 3rd-party component libs" constraint. The emphasis should be on robust NDJSON streaming handlers and performance-optimized Markdown rendering logic.
