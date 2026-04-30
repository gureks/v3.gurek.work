---
phase: "04"
wave: 1
depends_on: []
files_modified:
  - "frontend/package.json"
  - "frontend/src/store/useChatStore.ts"
  - "frontend/src/types.ts"
autonomous: true
---

# Phase 4: Galleries & Interactive Gems - Plan

## Goal
Building the infinite scroll gallery and sidebar project gems, integrated directly into the chat interface or as full-page layouts based on the page type.

## Requirements
- **GAL-01**: Scroll Gallery (infinite scroll) remains within bounds of chat or full-page.
- **GAL-02**: Project Gems (deep-dive summaries) replace chat feed with a fresh timeline.

## Wave 1: Dependencies & Store Updates

<task>
<id>1</id>
<title>Install new UI dependencies</title>
<read_first>
- frontend/package.json
</read_first>
<action>
Modify `frontend/package.json` to add the required dependencies for the infinite scroll gallery:
- `motion`: "^12.0.0"
- `class-variance-authority`: "^0.7.0"

Run `npm install` inside the `frontend` directory.
</action>
<acceptance_criteria>
- `frontend/package.json` contains `motion` and `class-variance-authority` in dependencies.
- `npm list motion` exits with 0 in the frontend directory.
</acceptance_criteria>
</task>

<task>
<id>2</id>
<title>Update types for rich components</title>
<read_first>
- frontend/src/types.ts
</read_first>
<action>
Update the `Message` type in `frontend/src/types.ts` to support rich component injection.
Add an optional field `component?: React.ReactNode` or `type: 'text' | 'component'` so the chat interface knows when to render standard markdown vs a rich interactive UI component.
</action>
<acceptance_criteria>
- `frontend/src/types.ts` has a mechanism for a `Message` to carry a custom React component.
- TypeScript compiler passes cleanly.
</acceptance_criteria>
</task>

<task>
<id>3</id>
<title>Implement route-keyed chat history</title>
<read_first>
- frontend/src/store/useChatStore.ts
</read_first>
<action>
Update `useChatStore` to store messages keyed by route/session ID instead of a single flat array.
- Current state likely holds `messages: Message[]`.
- Change this to `sessions: Record<string, Message[]>` and an `activeSessionId: string`.
- Add an action `setActiveSession(routeId: string)` that creates an empty array for that route if it doesn't exist, and sets it as active.
- Ensure the `addMessage` and `setMessages` actions update the array for the currently `activeSessionId`.
- Add a helper to inject an initial payload of rich components into a fresh session if it is empty.
</action>
<acceptance_criteria>
- `frontend/src/store/useChatStore.ts` exports `setActiveSession`.
- `addMessage` appends to a session-specific history.
- The default session can be `/query` or `/`.
</acceptance_criteria>
</task>
