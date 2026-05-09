# Phase 07: Implement Project Pages - Context

**Gathered:** 2026-05-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Building the detailed display for individual case studies (like the "epaper" project) by creating dedicated full pages, and constructing reusable bespoke components that strictly match the provided Figma design.
</domain>

<decisions>
## Implementation Decisions

### Architecture & UX Pattern
- **Dedicated Project Pages:** We will build dedicated full pages (e.g. `EpaperProject.tsx`) for each project listing, rather than embedding them inline in the chat timeline.

### Content Templating Strategy
- **Hardcoded Composition:** We will use hardcoded React pages for each project. Inside these pages, we will manually compose reusable rich components to build the layout. This prioritizes speed and bespoke layout flexibility.

### Figma Design Integration
- **Bespoke Layouts & Reusable Components:** We will build bespoke layouts and new reusable rich components based strictly on the provided Figma design (e-paper project).
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Figma Design
- `https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=322-13318&t=ZMD9k4dSZHxWhlWX-11` — E-paper project design references
</canonical_refs>

<specifics>
## Specific Ideas

- Focus on making the individual components (like carousels, cards, metrics blocks) modular so they can be easily reused across different hardcoded project pages.
</specifics>

<deferred>
## Deferred Ideas

- **Config-driven Templating Approach:** Building a config custom markup language (like JSON or Markdown-based structure) that dynamically renders reusable rich chat components based on variables. (Deferred to prioritize speed via hardcoded compositions).
</deferred>

---

*Phase: 07-implement-project-pages-either-templated-or-rich-chat-compon*
*Context gathered: 2026-05-10*
