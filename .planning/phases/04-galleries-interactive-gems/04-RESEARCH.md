# Phase 4: Galleries & Interactive Gems - Research

## Objective
Research how to implement Phase 04: galleries-interactive-gems
Answer: "What do I need to know to PLAN this phase well?"

## Overview
This phase introduces visual galleries and deep-dive case studies into the application. There are three distinct structural layouts for these new features:
1. **Scrollable Carousel in Chat**: For pages like Projects, Builds, and Prompts, the gallery will be a rich component injected directly into the standard chat timeline.
2. **Infinite Drag Scroll (Full Page)**: For pages like Playground and FPV, the chat timeline is completely hidden, and a full-page infinite-scroll gallery takes over using the design from `design/infinite-scroll-gallery.md`.
3. **Project Case Studies (Gems)**: Deep-dive pages (e.g., `/project/<name>`) replace the current chat feed with a *fresh* chat timeline that includes injected rich components detailing the case study.

## Technical Requirements & Dependencies

### 1. New Packages
The infinite drag scroll component requires the following external dependencies to be added to `package.json`:
- `motion` (Framer Motion v12 package name is `motion`, imported as `motion/react`)
- `class-variance-authority` (cva) for styling variants
- `lucide-react` (if icons are needed, though already present in most standard setups)

### 2. State Management Updates (`useChatStore`)
- **Route-Keyed Isolation**: The Zustand store must support separate chat histories per route. The `/project/<case-study-name>` route needs an entirely fresh chat timeline, isolated from the main `/query` feed.
- **Component Injection**: The store must support a message type that accepts rich React components, not just markdown text, so that the gallery carousels and case study blocks can be rendered *within* the message bubbles.

### 3. Component Architecture
- `DraggableContainer`, `GridItem`, `GridBody`: These three components from `design/infinite-scroll-gallery.md` must be implemented in `frontend/src/components/ui/infinite-drag-scroll.tsx`.
- **Chat Feed Conditional Rendering**: The main layout must conditionally hide the chat timeline when on `/playground` or `/fpv` routes, rendering the `infinite-drag-scroll` component full-screen instead.
- **Loaders & Skeletons**: Standard Tailwind-based gray skeletons (`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md`) must be used for loading states across all galleries and empty states. 

### 4. Routing Changes
- Add new routes in the `react-router-dom` setup:
  - `/project`
  - `/project/:name`
  - `/playground`
  - `/fpv`
  - `/projects` / `/builds` / `/prompts` (if they are direct routes that inject the carousel).

## Potential Landmines & Considerations

- **Auto-scroll Conflict**: Because the gallery carousel sits inside the chat UI, horizontal scrolling inside the carousel should NOT trigger the chat feed's vertical auto-scroll-to-bottom logic. The planner needs to ensure `CHAT-03` auto-scroll ignores carousel interactions.
- **Framer Motion Setup**: The code from `design/infinite-scroll-gallery.md` uses `import { motion } from "motion/react"`. This corresponds to Framer Motion v12+. We must ensure `npm install motion` is executed, not `framer-motion`, to match the provided code snippet.

## Conclusion for Planner
The planner needs to create tasks that:
1. Install `motion` and `class-variance-authority`.
2. Add the UI components for the infinite scroll gallery.
3. Update `useChatStore` to support rich component injection and route-keyed history.
4. Implement the new routes and conditionally render the full-page gallery vs the chat UI.
5. Create the gray skeleton loader components.
