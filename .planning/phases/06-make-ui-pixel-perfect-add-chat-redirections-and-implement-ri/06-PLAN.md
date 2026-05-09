---
wave: 1
depends_on: []
files_modified:
  - frontend/src/components/ChatBubble.tsx
  - frontend/src/components/layout/Header.tsx
  - frontend/src/components/chat/RichContentContainer.tsx
  - frontend/src/lib/chat.ts
autonomous: true
---

# Phase 06: Make UI pixel-perfect, add chat redirections, and implement Rich Component Templating

## Goal
Implement the Homepage UI (Figma node `26:177`) pixel-perfectly, add the missing rich component templates (Tools, Skills, Experience, Stats, Resume), and update `chat.ts` to support new page redirections.

## Tasks

### 1. Pixel-Perfect Header & Chat Layout
```xml
<task>
  <description>Implement pixel-perfect header and main chat container using Figma node `26:177` design context. Use the Figma MCP to pull assets and follow tokens.</description>
  <read_first>
    - frontend/src/App.tsx
    - frontend/src/index.css
  </read_first>
  <action>
    Use `get_design_context` on node `26:181` for the Header and `26:178` for the main layout. Extract layout sizing, margins, and tooltips. Use pure CSS variables from `index.css` for styling. Fetch SVGs/Images via Figma MCP localhost endpoints. Update `frontend/src/components/layout/Header.tsx` and the main wrapper.
  </action>
  <acceptance_criteria>
    - `frontend/src/components/layout/Header.tsx` contains specific width, padding, and Figma layout structure.
    - No hardcoded tailwind color hex values are used (must use `var(--color-...)` or Tailwind mappings).
    - Header search, theme, and profile elements are structurally matched to Figma.
  </acceptance_criteria>
</task>
```

### 2. Implement Rich Component Templating
```xml
<task>
  <description>Create and integrate rich components inside the Chat Bubble (Tools Carousel, Skills Carousel, Stats, Resume Download, Experience Timeline).</description>
  <read_first>
    - frontend/src/components/ChatBubble.tsx
  </read_first>
  <action>
    Create a new component `RichContentContainer.tsx` in `frontend/src/components/chat/` that renders different templates based on message type.
    Use `get_design_context` on these nodes to build the templates:
    - Tools Carousel: `373:453`
    - Skills Carousel: `373:321`
    - Stats: `373:1189`
    - Resume: `373:2668`
    - Experience: `373:1445`
    Update `ChatBubble.tsx` to conditionally mount `RichContentContainer`.
  </action>
  <acceptance_criteria>
    - `frontend/src/components/chat/RichContentContainer.tsx` exists and exports the RichContent components.
    - `frontend/src/components/ChatBubble.tsx` contains import for `RichContentContainer`.
  </acceptance_criteria>
</task>
```

### 3. Update Redirections in chat.ts
```xml
<task>
  <description>Update routing logic in chat.ts to map AI intents to specific page redirects.</description>
  <read_first>
    - frontend/src/lib/chat.ts
  </read_first>
  <action>
    Modify `chat.ts` to include redirection logic for the new pages (e.g. `/projects`, `/about`, `/experience`, `/contact`). Ensure the heuristic engine or intent mapper correctly handles these route triggers.
  </action>
  <acceptance_criteria>
    - `frontend/src/lib/chat.ts` contains added routes (`/projects`, `/about`, `/experience`, `/contact`).
    - Redirection logic handles transition correctly.
  </acceptance_criteria>
</task>
```

## Verification
- Run the dev server (`npm run dev`) and visually compare the homepage and chat area with `get_screenshot` for node `26:177`.
- The rich components must render accurately without visual clipping.
- No dummy text is present; content reflects the Figma nodes.

<must_haves>
- Pixel-perfect mapping with Figma node `26:177` and its children.
- Rich content components are implemented and conditionally renderable.
- Redirections are available in `chat.ts`.
</must_haves>
