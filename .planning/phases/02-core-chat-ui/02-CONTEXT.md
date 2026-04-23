# Phase 2: Core Chat UI - Context

**Gathered:** 2026-04-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the standard request/response cycle for the chat interface. Includes markdown rendering (GFM, tables, HTML, code blocks) and visual feedback like typing indicators and auto-scrolling. 

</domain>

<decisions>
## Implementation Decisions

### Data Fetching Strategy
- **D-01:** Direct `fetch` integrated with `Zustand` state. Avoid heavy data-fetching libraries like React Query/SWR to minimize dependencies (per LAY-02 ethos).

### Markdown Plugin Ecosystem
- **D-02:** Use `react-markdown` with `remark-gfm` and `rehype-raw` to support GitHub Flavored Markdown and raw HTML from the LightRAG backend.
- **D-03:** Include `react-syntax-highlighter` to support rich code block formatting.

### Animation Choreography
- **D-04:** Show a skeleton/bouncy loading indicator (similar to standard generic chat windows) while waiting for the full response.
- **D-05:** Once the markdown block is received from LightRAG, stagger/fade it in rather than typing character-by-character (since the endpoint does not stream).

### Scroll Behavior
- **D-06:** Implement `scrollIntoView({ behavior: 'smooth' })` targeted at the latest message to satisfy CHAT-03.

### the agent's Discretion
- Precise UI implementation details for the bouncy loading indicator/skeleton.
- Exactly how the message components are factored (e.g. `MessageList`, `MessageBubble`, `ChatInput`).

</decisions>

<specifics>
## Specific Ideas

- The LightRAG backend will provide a complete markdown/HTML block to be rendered; the frontend must robustly handle parsing this block.
- Loading indicator should match familiar generic chat paradigms (bouncy dots or skeleton).

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Specs
- `.planning/PROJECT.md` — Core constraints (Immutable backend logic, raw Tailwind styling, Figma UI specs).
- `.planning/REQUIREMENTS.md` — Phase 2 specific requirements (CHAT-01, CHAT-02, CHAT-03, CHAT-06).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `frontend/src/store/useAppStore.ts`: Global Zustand state. The direct fetch logic should likely be orchestrated through or alongside this store.
- Old hooks in `frontend/src/hooks/` (`useTypingEffect.ts`, `useFillerMessages.ts`): May be discarded or repurposed based on the new staggered fade-in + bouncy skeleton loading approach.

### Established Patterns
- Pure Tailwind CSS with custom CSS variables (`var(--background)`, etc.) from Phase 1. No Shadcn components.

### Integration Points
- Chat data fetching must hit `localhost:9621/query` (the FastApi orchestrator).

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---
*Phase: 02-core-chat-ui*
*Context gathered: 2026-04-24*
