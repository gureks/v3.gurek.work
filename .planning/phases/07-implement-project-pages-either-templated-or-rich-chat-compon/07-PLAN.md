---
version: 1.0
phase: 7
wave: 1
depends_on: [6]
files_modified:
  - frontend/src/components/rich-content/RichContentContainer.tsx
  - frontend/src/components/rich-content/ProjectFeedbackList.tsx
  - frontend/src/pages/projects/EpaperProject.tsx
  - frontend/src/pages/ProjectPage.tsx
autonomous: true
---

# Phase 7: Data-Driven Rich Project Walkthroughs

## Goal
Transition the project case study implementation (E-paper) from hardcoded React components in the chat sequence to a standardized, data-driven architecture using `RichContentContainer`. This follows the architectural blueprint in `TODO.md` to enable dynamic rendering triggered by LLM responses and ensures full Figma parity for project-specific rich UI elements.

## Verification Criteria
-[x] Navigating to `/project/epaper` plays the case study sequence correctly.
-[x] `EpaperProject.tsx` sequence uses `richContentType` and `richContentData` instead of raw `component` props.
-[x] New rich component `ProjectFeedbackList` accurately renders the Figma feedback blocks (node `427:2972`).
-[x] `RichContentContainer` is the single source of truth for all project-related rich blocks.
-[x] UI exactly matches the Figma design for E-paper project walkthrough.

<plan>
<task>
<id>1</id>
<title>Create ProjectFeedbackList Component</title>
<action>
Create `frontend/src/components/rich-content/ProjectFeedbackList.tsx`. This component should render the list of feedback items with vertical status bars (red/orange) as seen in Figma node `427:2972`.
It should accept an array of items: `{ label: string, subtitle?: string, type: 'critical' | 'warning' | 'neutral' }`.
Match the exact colors and padding from Figma.
</action>
<read_first>
- frontend/src/index.css
</read_first>
<acceptance_criteria>
- Component renders a vertical list of feedback items.
- Status bars use the correct colors (`#ff4a4a` for critical, `#ff9e4a` for warning).
- Typography matches the Figma design (Inter Regular 14px).
</acceptance_criteria>
</task>

<task>
<id>2</id>
<title>Register Project Components in RichContentContainer</title>
<action>
Update `frontend/src/components/rich-content/RichContentContainer.tsx` to include the new `feedback` type and ensure `hero`, `metrics`, `gallery`, and `carousel` are fully optimized for project data.
Add `feedback` case to the switch statement.
Ensure `ProjectMetrics` and `ProjectGallery` are exported and usable via the container.
</action>
<read_first>
- frontend/src/components/rich-content/RichContentContainer.tsx
</read_first>
<acceptance_criteria>
- `RichContentContainer` supports `type: 'feedback'`.
- All project-related rich components are available through the container.
</acceptance_criteria>
</task>

<task>
<id>3</id>
<title>Refactor EpaperProject to Data-Driven Sequence</title>
<action>
Modify `frontend/src/pages/projects/EpaperProject.tsx`. 
Replace the raw `component` props in `epaperSequence` with `richContentType` and `richContentData`.
Remove the `BubbleWrapper` from the sequence and let `RichContentContainer` (or `MessageBubble`) handle the wrapping.
Move any hardcoded UI logic for feedbacks into the `richContentData` for the `feedback` type.
</action>
<read_first>
- frontend/src/pages/projects/EpaperProject.tsx
- frontend/src/pages/ChatPage.tsx
</read_first>
<acceptance_criteria>
- `epaperSequence` no longer contains JSX in the `component` field for project-specific blocks.
- Sequence uses `richContentType: 'hero' | 'metrics' | 'gallery' | 'carousel' | 'feedback'`.
- The code is cleaner and more aligned with the `TODO.md` pattern.
</acceptance_criteria>
</task>

<task>
<id>4</id>
<title>Verify and Polish Project walkthrough</title>
<action>
Run the dev server and navigate to `/project/epaper`. 
Perform a visual audit against the Figma design. 
Ensure the "disclaimer" block (node `322:14431`) is also moved into a reusable rich component or properly rendered via `RichContentContainer`.
Fix any padding or alignment issues in the rich components within the chat bubble context.
</action>
<read_first>
- frontend/src/components/chat/MessageBubble.tsx
</read_first>
<acceptance_criteria>
- The E-paper walkthrough looks exactly like the Figma design.
- Interactions (carousels, etc.) work as expected.
- Responsive behavior is maintained.
</acceptance_criteria>
</task>
</plan>

<must_haves>
- Adherence to `RichContentContainer` architecture for all rich blocks.
- Pixel-perfect mapping with Figma node `322:13318` sequence.
- Zero raw JSX in the data-driven chat sequence messages.
</must_haves>
