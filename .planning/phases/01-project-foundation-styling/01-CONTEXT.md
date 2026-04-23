# Phase 1: Project Foundation & Styling - Context

**Gathered:** 2026-04-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the underlying stack and global design tokens strictly based on Figma. This lays the foundation for React + Vite + Tailwind, sets up routing and state management, and integrates the Figma MCP to ensure pixel-perfect fidelity.

</domain>

<decisions>
## Implementation Decisions

### Figma MCP Workflow
- Write a reusable sync script to auto-generate `index.css` from the Figma MCP.
- Use this script to fetch layouts for templated galleries and pages directly from Figma.

### Tailwind Structure
- Use `index.css` with CSS variables to handle the Light/Dark mode toggling smoothly.
- Avoid extending `tailwind.config.js` directly for tokens that vary by theme to keep the setup clean and robust.

### Application Routing
- Use `react-router-dom` to make projects/galleries addressable via URLs.
- The route will act as a key to persist page-specific chat histories later on.

### State Management
- Use `Zustand` for simple, scalable global state management to store varied chat histories across multiple pages/routes.

### the agent's Discretion
- Exactly how the sync script parses Figma MCP payloads (so long as the outcome is valid CSS variables).
- Initial folder structure (e.g. standard `src/components`, `src/store`).

</decisions>

<specifics>
## Specific Ideas

- The UI must perfectly align with Figma.
- No 3rd-party component libraries (e.g. Shadcn) are permitted. Everything must be built from raw Tailwind classes mapping to the Figma variables.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Specs
- `.planning/PROJECT.md` — Core constraints (Figma MCP usage, no 3rd-party component libraries).
- `.planning/REQUIREMENTS.md` — Phase 1 specific requirements (LAY-01, LAY-02).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None. Complete rewrite from scratch in the `frontend` folder.

### Established Patterns
- We are establishing new patterns here: `Zustand` for state, `react-router-dom` for routing, and CSS Variables in `index.css` for styling.

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-project-foundation-styling*
*Context gathered: 2026-04-24*
