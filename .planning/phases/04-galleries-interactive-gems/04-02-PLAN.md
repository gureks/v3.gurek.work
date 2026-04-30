---
phase: "04"
wave: 2
depends_on: ["04-PLAN.md"]
files_modified:
  - "frontend/src/components/ui/infinite-drag-scroll.tsx"
  - "frontend/src/components/ui/Skeleton.tsx"
autonomous: true
---

# Phase 4: Wave 2 - UI Components

<task>
<id>4</id>
<title>Implement Infinite Drag Scroll component</title>
<read_first>
- design/infinite-scroll-gallery.md
- frontend/src/components/ui/infinite-drag-scroll.tsx (to be created)
</read_first>
<action>
Create `frontend/src/components/ui/infinite-drag-scroll.tsx`.
Copy the component code provided in `design/infinite-scroll-gallery.md`.
Export `DraggableContainer`, `GridItem`, and `GridBody`.
Ensure `cn` utility is imported from `@/lib/utils` or the equivalent path in this project.
</action>
<acceptance_criteria>
- `frontend/src/components/ui/infinite-drag-scroll.tsx` exists and exports the three components.
- The file uses `motion/react` as specified.
</acceptance_criteria>
</task>

<task>
<id>5</id>
<title>Create Skeleton Loader component</title>
<read_first>
- frontend/src/components/ui/Skeleton.tsx (to be created)
</read_first>
<action>
Create a standard `Skeleton` component in `frontend/src/components/ui/Skeleton.tsx`.
It should accept standard `React.HTMLAttributes<HTMLDivElement>` and apply Tailwind pulse animations: `animate-pulse rounded-md bg-zinc-800`.
This will be used for all image placeholders and empty states as per the D-05 decision.
</action>
<acceptance_criteria>
- `frontend/src/components/ui/Skeleton.tsx` exists.
- Contains the `animate-pulse` Tailwind class.
</acceptance_criteria>
</task>
