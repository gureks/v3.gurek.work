# Phase 5: Prompt Templating & Redirection - Research

## Objective
Research how to implement Phase 05: prompt-templating-redirection
Answer: "What do I need to know to PLAN this phase well?"

## Overview
Phase 5 enriches the AI chat pipeline with three capabilities:
1. **Page-context-aware system prompts** — each route contributes descriptive context so the LLM generates relevant, non-redundant responses.
2. **Redirect decision logic** — the system prompt includes explicit heuristics that the LLM follows to decide between redirect-only, redirect+answer, and chat-only responses.
3. **Resilient response parsing** — exponential backoff retries, graceful degradation, and suggestion carry-over across redirects.

## 1. System Prompt Enrichment Architecture

### Current State
- `getSystemContext(pathname)` in `frontend/src/utils/chat.ts` returns a single monolithic prompt string.
- The prompt already defines the JSON output format (`redirect`, `response`, `suggestions`) and lists two redirections (`/projects`, `/about`).
- The pathname is interpolated but only as a raw string — no page-specific descriptive context is injected.

### Required Changes
**Per-route context map:** Build a `Record<string, string>` (or a function `getPageContext(pathname): string`) that returns a human-readable description of what's visible on the current page. This must be dynamic for parameterized routes like `/project/:name`.

```typescript
// Pattern: static routes use a lookup, dynamic routes use a builder
const PAGE_CONTEXTS: Record<string, string> = {
  '/': 'User is on the home chat page — no specific content is displayed.',
  '/projects': 'User is viewing the Project Gallery showing cards for: ET ePaper, GrowFast, ET Markets Design System, Design Agency, AI Avatar, Times Intel.',
  '/about': 'User is viewing Gurek\'s resume, work experience, education, and skills.',
  '/playground': 'User is browsing the interactive playground gallery.',
};

function getPageContext(pathname: string): string {
  if (pathname.startsWith('/project/')) {
    const slug = pathname.split('/project/')[1];
    return `User is viewing the deep-dive case study for project: ${slug}`;
  }
  return PAGE_CONTEXTS[pathname] || 'User is on an unknown page.';
}
```

### Redirect Mapping
The system prompt must enumerate **all** available routes with their slugs:
- `/` — Home
- `/projects` — Project Gallery
- `/about` — Resume & Background
- `/playground` — Interactive playground
- `/project/et-epaper`, `/project/growfast`, `/project/et-markets-ds`, `/project/design-agency`, `/project/ai-avatar`, `/project/times-intel` — Individual case studies

**Source of truth for project slugs:** The `ProjectsPage.tsx` already hardcodes `ROW_1_CARDS` and `ROW_2_CARDS` with slugs. A shared registry (e.g., `frontend/src/data/projects.ts`) should export the slug list so both `ProjectsPage` and `chat.ts` reference the same data — avoiding drift.

## 2. Redirect Decision Heuristics

### LLM Decision Framework (System Prompt Additions)
The system prompt needs explicit, unambiguous rules:

```
[REDIRECT DECISION RULES]
Analyze the user's query intent and choose ONE behavior:

REDIRECT ONLY (set redirect, response as brief navigation context):
- User asks to "show", "view", "browse", or "see" a section (e.g., "show me your work")
- User asks a vague question best answered by a whole page (e.g., "what have you built?")

REDIRECT + ANSWER (set both redirect AND a substantive response):
- User asks about a specific project by name → redirect to /project/<slug>, response summarizes the project
- User asks about experience/resume → redirect to /about, response highlights key points

CHAT ONLY (set redirect to null, answer directly):
- User asks a specific technical question (e.g., "what tech stack did you use for X?")
- User asks about your role, a concept, or general career advice
- User is already on the relevant page — do NOT redirect to the current page

NEVER redirect to the current page (${pathname}).
```

### Anti-Over-Redirect Guard
A critical landmine: the LLM must NOT redirect on every mention of a project name. The heuristic must distinguish between:
- "Tell me about the ET ePaper project" → redirect + answer (user wants to explore)
- "What framework did you use in ET ePaper?" → chat only (specific question)

The system prompt must include this distinction explicitly.

## 3. Exponential Backoff & Retry Strategy

### Pattern: Retry Wrapper for JSON Parsing
When `JSON.parse()` fails on the LLM response, retry the entire `sendQuery` call with exponential backoff. The user should NOT re-send their query — retries are automatic.

```typescript
const RETRY_DELAYS = [500, 1000, 2000]; // 3 attempts

async function sendWithRetry(
  request: QueryRequest,
  onRetry?: (attempt: number) => void
): Promise<QueryResponse> {
  let lastError: Error | null = null;
  for (let i = 0; i <= RETRY_DELAYS.length; i++) {
    try {
      const response = await sendQuery(request);
      const clean = response.response.trim().replace(/```json/i, '').replace(/```/g, '').trim();
      JSON.parse(clean); // validate parseable
      return response;
    } catch (err) {
      lastError = err as Error;
      if (i < RETRY_DELAYS.length) {
        onRetry?.(i + 1);
        await new Promise(r => setTimeout(r, RETRY_DELAYS[i]));
      }
    }
  }
  throw lastError;
}
```

### Where to Place
Two options:
1. **In `api.ts`** — wrap `sendQuery` with retry logic → cleanest separation
2. **In `useChatStore.ts`** — wrap the call site → allows state updates during retries (for "retrying…" indicator)

**Recommendation:** Keep `sendQuery` pure in `api.ts`. Add the retry wrapper in `useChatStore.ts` so the store can update `isRetrying` state between attempts.

### Retrying Indicator
Add a new state field `retryAttempt: number | null` to the chat store. When non-null, the `TypingIndicator` component shows "Retrying… (attempt 2/3)" alongside the existing dots animation. The indicator should feel continuous — not a jarring replacement of the typing dots.

### Graceful Degradation
After all retries exhaust:
1. If the raw response text is non-empty and looks like prose (contains spaces, letters), render it as markdown.
2. If the response is empty or gibberish (binary-looking, very short), show a generic error: "I had trouble processing that. Please try again."

## 4. Redirect UX & Transition Flow

### Redirect + Answer Flow (D-09)
When `parsedResponse.redirect` AND `parsedResponse.response` are both present:
1. Render the response as a chat message in the **current** page's timeline.
2. Wait ~1.5s (or until the message animation completes) for the user to read.
3. Navigate to the destination using `navigate(parsedResponse.redirect)`.

**Implementation concern:** The current code (`useChatStore.ts` line 99-103) navigates immediately and skips adding the response. This must change to add-message-first-then-navigate.

### Pure Redirect Flow (D-10)
When `parsedResponse.redirect` is set but `parsedResponse.response` is empty or a brief navigation phrase:
1. Navigate immediately.
2. If `parsedResponse.response` exists, show it as a toast/notification on the destination page.

**Toast implementation:** A simple absolute-positioned div with `position: fixed; top: 20px; right: 20px` that auto-dismisses after 4s. No external toast library needed — keep it minimal with CSS transitions. Add a `toast` state to a lightweight store (or extend `useAppStore`).

### Suggestion Carry-Over (D-11)
When redirecting, `parsedResponse.suggestions` must persist to the destination page. Two approaches:
1. **URL state:** Pass via `navigate(path, { state: { suggestions } })` → read in destination with `useLocation().state`
2. **Store state:** Add a `pendingSuggestions` field to `useChatStore` → consume on destination mount

**Recommendation:** Use navigate state (`{ state: { suggestions } }`) — it's ephemeral, doesn't pollute the store, and auto-clears on subsequent navigations.

## 5. Integration Points & File Changes

| File | Changes Required |
|------|-----------------|
| `frontend/src/utils/chat.ts` | Expand `getSystemContext()` with page context map, all redirect routes, project slug enumeration, and redirect decision heuristics |
| `frontend/src/store/useChatStore.ts` | Add retry logic with `retryAttempt` state, redirect+answer flow (render message → delay → navigate), suggestion carry-over via navigate state |
| `frontend/src/services/api.ts` | No changes needed — keep `sendQuery` pure |
| `frontend/src/types.ts` | No changes needed — existing `Message.response_type` and `metadata` already support redirect tracking |
| `frontend/src/components/chat/TypingIndicator.tsx` | Add optional "retrying" variant showing attempt count |
| `frontend/src/data/projects.ts` (NEW) | Shared project slug registry used by both `ProjectsPage` and `chat.ts` |
| `frontend/src/components/ui/Toast.tsx` (NEW) | Simple toast notification component for pure-redirect responses |
| `frontend/src/pages/ChatPage.tsx` | Read `location.state.suggestions` for carry-over, pass to `ChatInput` |

## 6. Potential Landmines

1. **Race condition on redirect+answer:** If the user types another message during the ~1.5s delay before navigation, the redirect should be cancelled. Guard with a ref or AbortController.
2. **Double-redirect loop:** If the destination page's seed message triggers another redirect (e.g., `/projects` seed message mentions a project), the system could loop. Guard by skipping redirect processing for injected/seeded messages.
3. **localStorage bloat:** Chat sessions accumulate across all routes. Consider a max-sessions or max-messages-per-session cap.
4. **JSON wrapping by LLM:** The current `cleanJson` regex handles ` ```json ` wrapping, but some LLMs also output `json\n{...}` without backticks. Consider a more robust extraction: find the first `{` and last `}`.
5. **Stale page context:** If the page content changes dynamically (e.g., new projects added), the hardcoded `PAGE_CONTEXTS` map won't update. Using a centralized data registry (`projects.ts`) mitigates this for project slugs.

## Conclusion for Planner
The planner needs to create tasks that:
1. Create a shared project data registry (`projects.ts`) with slugs and titles.
2. Rewrite `getSystemContext()` to inject per-route page context, enumerate all redirections with project slugs, and include explicit redirect decision heuristics.
3. Add exponential backoff retry logic in `useChatStore.sendMessage()` with a `retryAttempt` state field and update `TypingIndicator` to show retry status.
4. Implement the redirect+answer flow (render message → delay → navigate) and redirect-only flow (navigate + toast).
5. Create a simple Toast component for redirect notifications.
6. Wire suggestion carry-over using `navigate()` state and read it in `ChatPage`.
7. Refactor `ProjectsPage` to import project data from the shared registry instead of hardcoding.

## RESEARCH COMPLETE
