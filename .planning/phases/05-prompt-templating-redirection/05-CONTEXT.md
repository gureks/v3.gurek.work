# Phase 5: Prompt Templating & Redirection - Context

**Gathered:** 2026-05-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Complete the LightRAG integration with robust frontend-side system prompt templating and dynamic redirection logic. The frontend shapes use-case specific outputs via templated system prompts and intercepts backend responses to either display chat, redirect the user, or both.

</domain>

<decisions>
## Implementation Decisions

### Prompt Template Enrichment
- **D-01:** The system prompt (`getSystemContext`) must include contextual information about what templated content is currently visible on the page. This allows the LLM to generate relevant follow-up suggestions and avoids repeating information already shown to the user.
- **D-02:** Each page/route should contribute its own context snippet describing what the user is currently seeing (e.g., "User is viewing the Project Gallery with cards for X, Y, Z" or "User is on the About page viewing resume and work experience").

### Redirection Mapping & Guardrails
- **D-03:** All routes must be listed as available redirections in the system prompt: `/projects`, `/about`, `/playground`, `/project/:name` (with all known project slugs enumerated).
- **D-04:** The LLM (via system prompt guardrails) decides when to redirect based on query specificity:
  - **Vague query** (e.g., "show me your work") → `redirect` set, `response` as navigation context → redirect only
  - **Specific query + relevant page exists** (e.g., "tell me about project X") → `redirect` set AND `response` with the answer → redirect with answer
  - **Specific enough for inline answer** (e.g., "what tech stack did you use for X?") → `response` only, `redirect` null → straight chat response
- **D-05:** The system prompt must include explicit decision-making heuristics for the LLM to follow when choosing between redirect, redirect+answer, and response-only.

### Response Parsing & Retry Strategy
- **D-06:** When JSON parsing fails, trigger exponential backoff retries (up to 3 attempts) before showing an error to the user. The retry is automatic — the user does not need to re-send their query.
- **D-07:** During retries, show a visible "retrying…" indicator alongside the existing typing dots so the user knows the system is working.
- **D-08:** After all retries exhaust, graceful degradation: render the raw response text as markdown instead of showing a generic error message. Only show a generic error if the response is completely empty or unintelligible.

### Redirect UX & Transition Flow
- **D-09:** When a redirect is triggered with a response (`redirect` + `response` both present): the response is first rendered as a chat message in the **current** page's timeline. The destination page is preloaded in the background. After the message appears, the user is navigated to the destination.
- **D-10:** When a redirect is triggered without a meaningful response (pure navigation): navigate directly, but show the `response` field (if any) as a brief toast/notification on the destination page.
- **D-11:** The `suggestions` array from the redirect response carries over to the destination page and populates the chat input's suggestion chips, giving the user immediate follow-up actions on the new page.

### Agent's Discretion
- Exact exponential backoff timing (e.g., 500ms, 1s, 2s)
- Toast/notification styling and auto-dismiss duration
- How to preload destination pages (lazy import, prefetch, or route-level code splitting)
- Exact wording of the "retrying…" indicator

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Specs
- `.planning/PROJECT.md` — Core constraints (immutable backend, bespoke UI, frontend-only development)
- `.planning/REQUIREMENTS.md` — CHAT-04 (templated system prompts), CHAT-05 (templated response redirection)
- `.planning/ROADMAP.md` — Phase 5 goal and success criteria

### Prior Phase Context
- `.planning/phases/02-core-chat-ui/02-CONTEXT.md` — D-01 (Zustand + direct fetch), D-02/D-03 (markdown rendering stack)
- `.planning/phases/03-navigation-page-context/03-CONTEXT.md` — D-09 (AI-driven redirection mechanism), D-10 (gallery/gems via AI), D-11 (templated content in chat timeline)
- `.planning/phases/04-galleries-interactive-gems/04-CONTEXT.md` — D-03/D-04 (case study routing to `/project/:name`)

### Existing Implementation
- `frontend/src/utils/chat.ts` — Current `getSystemContext()` with JSON output format and redirection fields
- `frontend/src/store/useChatStore.ts` — `sendMessage()` with JSON parsing and redirect handling
- `frontend/src/services/api.ts` — `sendQuery()` hitting `localhost:9621/query`
- `frontend/src/types.ts` — `Message` type with `response_type`, `metadata`, `template_id` fields (not yet utilized)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `getSystemContext(pathname)` in `chat.ts`: Already structures the JSON output format with `redirect`, `response`, `suggestions`. Needs extension for page context injection and expanded redirect mapping.
- `useChatStore.sendMessage()`: Already parses JSON and calls `navigate()` on redirect. Needs retry logic, redirect+answer flow, and suggestion carry-over.
- `Message.response_type` and `Message.metadata` in `types.ts`: Already defined but unused — can be leveraged for redirect type tracking and slug passing.

### Established Patterns
- Zustand persist middleware for session-keyed chat history (`localStorage`)
- Direct `fetch` → JSON parse → state update pipeline
- Route-keyed sessions: `sessions[pathname]` isolation

### Integration Points
- `sendQuery()` in `api.ts` — single endpoint at `localhost:9621/query`. All prompt shaping happens frontend-side before this call.
- `App.tsx` routes: `/`, `/projects`, `/about`, `/playground`, `/project/:name` — these are the complete set of available redirections.
- `ChatPage` accepts `templatedComponent` prop — can be used to pass page-context metadata.

</code_context>

<specifics>
## Specific Ideas

- The system prompt should enumerate all known project slugs (from a registry or hardcoded list) so the LLM can redirect to specific case studies like `/project/lila-games` rather than just `/projects`.
- The redirect decision heuristics in the system prompt should be explicit enough that the LLM doesn't over-redirect on every query mentioning a project name.
- The "retrying…" state should feel continuous with the typing indicator — not a jarring switch.
- On redirect+answer, the brief delay while the response renders and the page preloads creates a natural transition feel.

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-prompt-templating-redirection*
*Context gathered: 2026-05-01*
