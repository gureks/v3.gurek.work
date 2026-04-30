# Phase 4: Galleries & Interactive Gems - Context

**Gathered:** 2026-05-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Building the infinite scroll gallery and sidebar project gems, integrated directly into the chat interface or as full-page layouts based on the page type.

</domain>

<decisions>
## Implementation Decisions

### Gallery Presentation & Scroll Behavior
- **D-01:** Scrollable carousel galleries rendered *within* the chat UI interface for pages like Projects, Builds, Prompts.
- **D-02:** Infinite scroll galleries that auto-fetch on scroll for pages like Playground and FPV. These pages will NOT have the chat timeline UI rendered; the entire page will be the infinite scroll gallery, utilizing the existing code defined in `design/infinite-scroll-gallery.md`.

### Project Gems (Case Studies) Interaction
- **D-03:** When a Project Case Study (Gem) is clicked (from the sidebar or any other page), it routes to `/project/<case-study-name>`.
- **D-04:** This deep-dive page (`/project/<case-study-name>` and `/project`) replaces the entire chat feed and has new rich components injected within a fresh page's chat timeline.

### Media Placeholder & Loading Strategy
- **D-05:** Standard gray skeletons to be implemented for both placeholders and as loaders. This applies to both infinite gallery pages and chat UI gallery pages.
- **D-06:** Empty and loading states will feature stylized gray skeletons.

### the agent's Discretion
- Precise structure of the new rich components in the deep-dive chat timeline.
- Specific responsive behavior details not covered by Figma.

</decisions>

<specifics>
## Specific Ideas

- The infinite scroll gallery component must integrate the code from `design/infinite-scroll-gallery.md` which uses `motion/react` and `class-variance-authority`.
- Figma designs for the scrollable carousel and rich components will be provided during the development phase.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Specs
- `.planning/PROJECT.md` — Core constraints
- `.planning/REQUIREMENTS.md` — GAL-01, GAL-02 requirements
- `.planning/phases/03-navigation-page-context/03-CONTEXT.md` — D-10, D-11, D-12 decisions

### Design Assets
- `design/infinite-scroll-gallery.md` — Infinite drag scroll component guidelines and code to integrate.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- The `DraggableContainer`, `GridItem`, `GridBody` components from `design/infinite-scroll-gallery.md` need to be implemented in `components/ui`.
- `Zustand` state (`useChatStore`) for managing isolated chat timelines.

### Established Patterns
- Pure Tailwind CSS matching Figma.

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-galleries-interactive-gems*
*Context gathered: 2026-05-01*
