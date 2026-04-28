# Phase 3: Navigation & Page Context - Context

**Gathered:** 2026-04-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the responsive outer shell, manage page-specific content integration within the chat UI, and implement chat history with context injection for navigation and AI-driven route redirection.

</domain>

<decisions>
## Implementation Decisions

### Sidebar Layout & Transitions
- **D-01: Mobile Slide-Out Backdrop:** Frosted glass effect (backdrop-blur) as specified in Figma `backdrop-blur-[10px]` / `backdrop-blur-[20px]`.
- **D-02: Slide-In Animations:** Pure Tailwind CSS transitions should be used for all sidebar animations to maintain consistency and avoid Framer Motion overhead.
- **D-03: Navigation Link Alignment:** Primary navigation links within the sidebar should be top-aligned, consistent with the Figma component.
- **D-04: Desktop Sidebar Overflow:** Implement a custom scrollbar contained strictly within the sidebar itself, ensuring the main chat area remains fixed.

### Chat History Persistence
- **D-05: Storage Mechanism:** Chat history should persist across browser reloads and closed tabs using `localStorage`.
- **D-06: Active Link Behavior:** Clicking an already active navigation link should keep the chat history intact, not clearing it.
- **D-07: Message Limit:** All messages should be kept in state, without an arbitrary limit.
- **D-08: Chat Isolation:** **UPDATED** Chat history is tied to specific pages/routes. Each page maintains its own isolated chat thread that is visible upon return.

### Navigation Routing & AI Redirection
- **D-09: AI-Driven Redirection:** The frontend will dynamically inject available templated pages/routes into the backend system prompt. The backend will decide whether to return a chat response or a redirection signal. The frontend will parse this response to either display the chat or programmatically redirect the user to the requested page.
- **D-10: Gallery & Gems Activation:** Project Gems and Scroll Galleries can be accessed via two methods: directly clicking sidebar navigation links, OR by asking the AI, which triggers the AI-driven redirection mechanism to the relevant templated page.

### Page Templates Structure
- **D-11: Content Integration:** **UPDATED** Templated page content (e.g., Project Gallery, Resume) will be injected *within* the chat feed UI as rich chat components, rather than replacing the chat feed entirely.
- **D-12: Chat UI Collapsibility:** The chat UI's width will remain fixed. Templated components must adapt to the available space within the feed.
- **D-13: Content Sourcing:** Initial layout content for templated components will be sourced from hardcoded React components extracted from Figma designs.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Specs
- `.planning/PROJECT.md` — Core project vision, values, and constraints.
- `.planning/ROADMAP.md` — Overall project roadmap and phase details.
- `.planning/REQUIREMENTS.md` — Detailed requirements for the project, including LAY-03, LAY-04, LAY-05, CHAT-07, GAL-01, GAL-02.
- `.planning/phases/01-project-foundation-styling/01-CONTEXT.md`
- `.planning/phases/02-core-chat-ui/02-CONTEXT.md`

### Figma Designs
- `https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=12-643&m=dev`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `frontend/src/store/useChatStore.ts`: Global Zustand store to be updated to support route-keyed chat history and persistence.
- `react-router-dom`: Used for application routing and redirection.
- Tailwind CSS: Primary styling framework.

### Established Patterns
- Pure Tailwind CSS with custom CSS variables (from Phase 1).
- Direct `fetch` integrated with Zustand state (from Phase 2).

### Integration Points
- Frontend communicates with `localhost:9621/query`. The `sendMessage` pipeline must be updated to inject route awareness into the prompt and handle redirection parsing.

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-navigation-page-context*
*Context gathered: 2026-04-28*
