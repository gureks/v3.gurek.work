# Phase 3: Navigation & Page Context - Context

**Gathered:** 2026-04-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the responsive outer shell, manage page-specific content integration within the chat UI, and implement global chat history with context injection for navigation.

</domain>

<decisions>
## Implementation Decisions

### Sidebar Layout & Transitions
- **D-01: Mobile Slide-Out Backdrop:** Frosted glass effect (backdrop-blur) as specified in Figma `backdrop-blur-[10px]` / `backdrop-blur-[20px]`.
- **D-02: Slide-In Animations:** Pure Tailwind CSS transitions should be used for all sidebar animations to maintain consistency and avoid Framer Motion overhead.
- **D-03: Navigation Link Alignment:** Primary navigation links within the sidebar should be top-aligned, consistent with the Figma component.
- **D-04: Desktop Sidebar Overflow:** Implement a custom scrollbar contained strictly within the sidebar itself, ensuring the main chat area remains fixed.

### Chat History Persistence
- **D-05: Storage Mechanism:** Chat history for the global chat should persist across browser reloads and closed tabs using `localStorage`.
- **D-06: Active Link Behavior:** Clicking an already active navigation link should keep the chat history intact, not clearing it.
- **D-07: Message Limit:** All messages should be kept in state, without an arbitrary limit, as performance is not expected to be an issue for this use case.

### Navigation Routing Hierarchy
- **D-08: Chat Isolation:** A single, global chat history should be maintained across the application. Page-specific context will be dynamically injected.
- **D-09: Visual Transition:** Instant swap between routes for the chat feed to provide a standard Single Page Application (SPA) experience.
- **D-10: Backend Communication for Context:** The frontend will prepend a hidden system prompt prefix to the user's message before sending it to the LightRAG backend, based on the current route. This guides LightRAG's responses without modifying the backend.

### Page Templates Structure
- **D-11: Content Integration:** Templated page content (e.g., Project Gallery, Resume) will appear *within* the chat UI. Different UI variants of the chat component will be displayed based on the active section.
- **D-12: Chat UI Collapsibility:** The chat UI's width will remain fixed. Templated pages must adapt to the available space.
- **D-13: Content Sourcing:** Initial layout content for templated pages will be sourced from hardcoded React components, which will be extracted directly from Figma designs.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Specs
- `.planning/PROJECT.md` — Core project vision, values, and constraints (e.g., no 3rd-party component libraries).
- `.planning/ROADMAP.md` — Overall project roadmap and phase details.
- `.planning/REQUIREMENTS.md` — Detailed requirements for the project, including LAY-03, LAY-04, LAY-05, CHAT-07 for this phase.
- `.planning/phases/01-project-foundation-styling/01-CONTEXT.md` — Prior decisions on initial setup, styling, routing, and state management.
- `.planning/phases/02-core-chat-ui/02-CONTEXT.md` — Prior decisions on core chat UI features like markdown rendering and animations.

### Figma Designs
- `https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=12-643&m=dev` — Figma design for the navigation component, guiding mobile backdrop, navigation link alignment, and overall sidebar structure.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `frontend/src/store/useAppStore.ts`: Global Zustand store, already established for state management, will be used for chat history persistence.
- `react-router-dom`: Already integrated for application routing, forming the basis for navigation hierarchy.
- Tailwind CSS: Established as the primary styling framework, to be used for all UI components and transitions.

### Established Patterns
- Pure Tailwind CSS with custom CSS variables (from Phase 1).
- Direct `fetch` integrated with Zustand state (from Phase 2).

### Integration Points
- Frontend will communicate with `localhost:9621/query` (FastAPI orchestrator) for LightRAG responses, requiring context injection for navigation.

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-navigation-page-context*
*Context gathered: 2026-04-26*
