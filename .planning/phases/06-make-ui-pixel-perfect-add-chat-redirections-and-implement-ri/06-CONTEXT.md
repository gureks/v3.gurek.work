# Phase 06: Make UI pixel-perfect, add chat redirections, and implement Rich Component Templating - Context

**Gathered:** 2026-05-07
**Status:** Ready for planning
**Source:** User Prompt / Figma Link

<domain>
## Phase Boundary

- Implement pixel-perfect Chat UI based on Figma design (Node ID: `26:177`).
- Support Rich Component Templating for diverse chat messages (Projects, Tools, Stats, Resumes, Experience).
- Add new pages and redirections within the `chat.ts` logic.
</domain>

<decisions>
## Implementation Decisions

### Design & Figma Rules
- **Figma Source**: `https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=26-177`
- Must extract exact layouts, spacing, and typography using Figma MCP `get_design_context` and `get_screenshot`.
- Fetch assets (SVG/images) directly from the Figma MCP localhost endpoints. Do not add new icon packages or placeholders.
- Treat Figma MCP React/Tailwind output as behavior/design reference, but adapt to this project's existing theme tokens (`index.css`), UI patterns, and reusable components.
- Validate final UI against the Figma screenshot.

### Rich Component Templating
- The `ChatContainer` must render complex layout bubbles (`Rich Content Container` slots).
- Components include:
  - Tools Carousel (`373:453`)
  - Skills Carousel (`373:321`)
  - Stats Container (`373:1189`)
  - Download Resume Component (`373:2668`)
  - Experience Timeline / List (`373:1445`)
  - Tooltips (`320:13230`)

### Redirections
- Update `chat.ts` with new pages and redirection logic.

</decisions>
