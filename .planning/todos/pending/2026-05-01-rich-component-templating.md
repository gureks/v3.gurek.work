---
created: 2026-05-01T23:33:18Z
title: Implement Rich Component Templating & Dynamic Rendering
area: ui
files:
  - frontend/src/utils/chat.ts
  - frontend/src/pages/ChatPage.tsx
  - frontend/src/store/useChatStore.ts
---

## Problem

The portfolio currently relies on text-based markdown or page-wide redirects to convey information. It lacks the ability to render complex, structured data (metrics, skills, timelines, toolsets) in a visually rich, templated format directly within the chat timeline. This limits the "Gurek AI-Twin" persona's ability to provide high-impact, professional summaries that match the Figma design vision (e.g., specific cards for metrics or interactive grids for skills).

## Evaluation

To optimize for **Accuracy, Response Time, and Token Usage**:
- **Architecture**: **Approach B** (Frontend Prompt Injection) is preferred. By adding the component schema to the existing chat prompt, we avoid the latency and token overhead of a secondary routing/generation call to the backend.
- **Data Pattern**: **Option D** (Structured JSON from LLM) is the most robust. Asking the AI to return data in a specific JSON structure (e.g., `{ type: 'metrics', data: { label: 'Revenue', value: '$10M' } }`) allows the frontend to map this directly to polished, hard-coded React components with 100% layout fidelity.

## Solution

1.  **Schema Update**: Modify the JSON schema in `getSystemContext` (chat.ts) to include an optional `component` field:
    ```json
    {
      "redirect": string | null,
      "response": string,
      "suggestions": string[],
      "component": { "type": string, "data": any } | null
    }
    ```
2.  **Prompt Enrichment**: Add a `[RICH COMPONENTS]` section to `chat.ts` listing available types (e.g., `MetricStats`, `SkillGrid`, `WorkTimeline`) and when to use them.
3.  **Component Registry**: Implement a `RichComponentRenderer` in `ChatPage.tsx` that consumes the `component` field from the chat store.
4.  **Initial Components**: Build the first set of Figma-accurate components:
    - `MetricStats`: For project outcomes/KPIs.
    - `SkillGrid`: For toolsets and professional skills.
    - `WorkTimeline`: For resume/about summaries.
