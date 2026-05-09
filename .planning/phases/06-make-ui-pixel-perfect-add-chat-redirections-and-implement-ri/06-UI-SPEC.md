# Phase 06: Make UI pixel-perfect, add chat redirections, and implement Rich Component Templating - UI Specification

**Status:** Locked
**Figma Nodes:** 26:177 (Homepage UI)

## Visual Architecture
This phase implements the pixel-perfect Homepage Chat UI (`26:177`).
- Includes a Header with Search, Theme toggle, Contact link, and Profile listbox.
- Main layout includes a Navigation Tooltip column and the Main Chat Container.
- Chat Bubble components require custom variations to support rich content:
  - Tools Carousel
  - Skills Carousel
  - Stats Container
  - Download Resume Component
  - Experience Timeline Component

## Implementation Rules
1. **Design Parity**: 1:1 match with Figma.
2. **Tokens**: Use pure CSS variables from `index.css` mapped to Tailwind. No generic hex codes.
3. **Assets**: Fetch SVGs/Images directly via localhost URLs from Figma MCP server. No placeholders.
4. **Components**: Build reusable UI components within `frontend/src/components/`.

## Responsive & Interactive Behavior
- The input text area is anchored at the bottom.
- Tooltips display on hover.
- Chat timeline supports scrolling while the header remains fixed or appropriately positioned.
