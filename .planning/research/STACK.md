# Tech Stack Recommendations

**Domain:** Conversational AI Portfolio UI
**Date:** 2026-04-23

## Recommended Core Stack
- **Framework:** React + Vite (Fast HMR, optimized builds)
- **Styling:** Tailwind CSS (utility-first, easy theming)
- **Routing:** React Router (client-side routing for sidebar/projects)
- **Markdown Parsing:** `react-markdown` + `remark-gfm` + `rehype-raw` + `rehype-highlight` (for code blocks)

## Specialized Libraries
- **Framer Motion:** Crucial for micro-interactions (sidebar slide-in, message bubbles appearing smoothly).
- **Lucide React:** For icons (if bespoke Figma icons aren't sufficient).
- **Next-themes:** To easily handle light/dark mode toggling with Tailwind's `dark:` classes.

## What NOT to Use
- **UI Component Libraries (Shadcn, MUI, Chakra):** Explicitly forbidden by project constraints to ensure pixel-perfect fidelity with Figma.
- **Heavy State Management (Redux):** Unnecessary overhead; standard React Context + Hooks are sufficient for chat state.
