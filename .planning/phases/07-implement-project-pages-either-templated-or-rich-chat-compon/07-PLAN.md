---
version: 1.0
phase: 7
wave: 1
depends_on: []
files_modified:
  - frontend/src/pages/ProjectPage.tsx
  - frontend/src/pages/projects/EpaperProject.tsx
  - frontend/src/components/case-study/ProjectHero.tsx
  - frontend/src/components/case-study/ProjectSection.tsx
  - frontend/src/components/case-study/ProjectMetrics.tsx
autonomous: false
---

# Phase 7: Implement Project Pages Plan

## Goal
Implement dedicated full pages for project listings starting with the E-paper project. Use hardcoded compositions of new reusable case-study components based strictly on the Figma design.

## Verification Criteria
- [ ] Navigating to `/project/epaper` displays a dedicated page (not just an inline chat bubble).
- [ ] The E-paper page strictly implements the layout and visual language from the provided Figma link.
- [ ] The implementation uses modular, reusable components composed manually.

<plan>
<task>
<id>1</id>
<title>Refactor ProjectPage for Dedicated Layouts</title>
<action>
Modify `frontend/src/pages/ProjectPage.tsx` to stop wrapping the `ChatPage`. Instead, it should act as a router for dedicated project pages. Read the `name` parameter from the URL. If `name === 'epaper'`, render the new `<EpaperProject />` component. Otherwise, render a generic "Project Not Found" or "Coming Soon" component. Create the initial `frontend/src/pages/projects/EpaperProject.tsx` file with a placeholder "E-Paper Project" heading.
</action>
<read_first>
- frontend/src/pages/ProjectPage.tsx
- frontend/src/App.tsx
</read_first>
<acceptance_criteria>
- `frontend/src/pages/ProjectPage.tsx` imports and renders `<EpaperProject />` when the route param matches.
- `frontend/src/pages/ProjectPage.tsx` no longer imports or renders `<ChatPage />`.
- `frontend/src/pages/projects/EpaperProject.tsx` exists and exports a React component.
</acceptance_criteria>
</task>

<task>
<id>2</id>
<title>Extract Figma Data and Build Reusable Components</title>
<action>
Using the Figma link (`https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=322-13318&t=ZMD9k4dSZHxWhlWX-11`), extract the design context and metadata. Create reusable components in `frontend/src/components/case-study/` to match the visual blocks present in the design. For example, build a `ProjectHero.tsx` for the top section, `ProjectMetrics.tsx` for stats/tags, and `ProjectSection.tsx` for text/image content blocks. Use the exact tokens from `index.css` (e.g. `var(--color-background-elevated)`).
</action>
<read_first>
- frontend/index.css
- .planning/phases/07-implement-project-pages-either-templated-or-rich-chat-compon/07-CONTEXT.md
</read_first>
<acceptance_criteria>
- `frontend/src/components/case-study/ProjectHero.tsx` exists and accepts props for title, description, and image.
- `frontend/src/components/case-study/ProjectMetrics.tsx` exists.
- `frontend/src/components/case-study/ProjectSection.tsx` exists.
- Components use standard Tailwind or custom CSS variable classes defined in `index.css`.
</acceptance_criteria>
</task>

<task>
<id>3</id>
<title>Assemble E-Paper Project Page</title>
<action>
In `frontend/src/pages/projects/EpaperProject.tsx`, compose the new reusable components (`ProjectHero`, `ProjectSection`, `ProjectMetrics`, etc.) to exactly match the E-Paper project layout from the Figma file. Hardcode the text, tags, and image placeholders (using generic asset paths or placeholder images if actual assets are missing) as seen in the Figma design. Ensure the layout is responsive and matches the exact padding, typography, and structure defined in the design contract.
</action>
<read_first>
- frontend/src/pages/projects/EpaperProject.tsx
- frontend/src/components/case-study/ProjectHero.tsx
</read_first>
<acceptance_criteria>
- `frontend/src/pages/projects/EpaperProject.tsx` imports and uses the bespoke reusable components.
- The page includes hardcoded text and structure matching the E-paper Figma node `322:13318`.
- The component is a full-page layout, responsive, and visually consistent with the dark/light theme tokens.
</acceptance_criteria>
</task>
</plan>
