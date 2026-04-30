---
phase: "04"
wave: 3
depends_on: ["04-PLAN-WAVE-2.md"]
files_modified:
  - "frontend/src/App.tsx"
  - "frontend/src/pages/PlaygroundPage.tsx"
  - "frontend/src/pages/ProjectPage.tsx"
autonomous: true
---

# Phase 4: Wave 3 - Page Layouts & Routing

<task>
<id>6</id>
<title>Create Full-Page Gallery Views</title>
<read_first>
- frontend/src/pages/PlaygroundPage.tsx (to be created)
- frontend/src/components/ui/infinite-drag-scroll.tsx
</read_first>
<action>
Create `frontend/src/pages/PlaygroundPage.tsx`.
Import `DraggableContainer`, `GridBody`, and `GridItem` from the `infinite-drag-scroll` component.
Set up a dummy array of images (or use skeletons) and render the `DraggableContainer` full-screen (100dvh).
Ensure the standard Chat Timeline UI is NOT rendered on this page.
Do the same for `FPVPage.tsx` or handle it dynamically if they share the same structure.
</action>
<acceptance_criteria>
- `frontend/src/pages/PlaygroundPage.tsx` exists and renders `DraggableContainer`.
- The chat timeline component is not present in the render tree for this page.
</acceptance_criteria>
</task>

<task>
<id>7</id>
<title>Create Project Case Study Page</title>
<read_first>
- frontend/src/pages/ProjectPage.tsx (to be created)
- frontend/src/store/useChatStore.ts
</read_first>
<action>
Create `frontend/src/pages/ProjectPage.tsx`.
This page should receive the `:name` param from the route.
On mount, it should call `setActiveSession('/project/' + name)` to isolate the chat history.
If the history for this route is empty, it should inject initial message(s) containing rich components (e.g., a header, a carousel gallery, or project description) into the store.
Render the standard `ChatLayout` so the user can continue chatting specifically about this case study within the same view.
</action>
<acceptance_criteria>
- `frontend/src/pages/ProjectPage.tsx` uses route parameters.
- It calls `setActiveSession` on mount.
- It renders the standard chat layout wrapper.
</acceptance_criteria>
</task>

<task>
<id>8</id>
<title>Update App Routing</title>
<read_first>
- frontend/src/App.tsx
</read_first>
<action>
Modify `frontend/src/App.tsx` (or your route configuration file).
Add routes for:
- `<Route path="/playground" element={<PlaygroundPage />} />`
- `<Route path="/project/:name" element={<ProjectPage />} />`
</action>
<acceptance_criteria>
- `/playground` and `/project/:name` routes are registered in the main React Router setup.
</acceptance_criteria>
</task>
