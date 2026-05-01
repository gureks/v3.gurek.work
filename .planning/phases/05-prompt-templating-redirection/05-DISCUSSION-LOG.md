# Phase 5: Prompt Templating & Redirection - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-01
**Phase:** 05-prompt-templating-redirection
**Areas discussed:** Prompt template variations, Redirection mapping & extensibility, Response parsing & fallback behavior, Redirect UX & transition

---

## Prompt Template Variations

| Option | Description | Selected |
|--------|-------------|----------|
| Single generic prompt | One `getSystemContext()` for all pages (current state) | |
| Per-page context injection | Enrich system prompt with current page's visible content | ✓ |

**User's choice:** Per-page context injection — include at least a line about current context and what templated information has already been shown. This bounds RAG responses and improves follow-up suggestions.
**Notes:** The user wants the LLM to be aware of what's already visible to avoid repetition and to generate contextually relevant suggestions.

---

## Redirection Mapping & Extensibility

| Option | Description | Selected |
|--------|-------------|----------|
| Hardcoded shallow routes | Only `/projects` and `/about` (current state) | |
| All routes with guardrails | Include deeper routes (`/project/:name`, `/playground`) with LLM decision heuristics | ✓ |

**User's choice:** All routes with decision guardrails. The system prompt must guide the LLM on three scenarios:
- Vague query → redirect only
- Specific query + relevant page → redirect AND answer
- Specific enough → straight response only (no redirect)
**Notes:** User emphasized the need for explicit heuristics so the LLM doesn't over-redirect.

---

## Response Parsing & Fallback Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Immediate error on parse fail | Show generic error (current state) | |
| Exponential retry then graceful degradation | Auto-retry up to 3x with visible indicator, then render raw markdown | ✓ |

**User's choice:** Exponential retry with visible "retrying…" indicator alongside typing dots. After 3 retries, graceful degradation (render raw text as markdown).
**Notes:** Retries should be automatic — user does not need to re-send query. The retrying indicator should be visible and continuous with the typing animation.

---

## Redirect UX & Transition

| Option | Description | Selected |
|--------|-------------|----------|
| Silent navigation | Navigate immediately with no feedback (current state) | |
| Toast on destination | Show response as toast on the new page | |
| Chat message + preload + navigate | Render response in current timeline, preload destination, then navigate | ✓ |

**User's choice:** When redirecting, show the response as a chat message in the *current* page's timeline. Preload the destination page in the background. Then navigate. Suggestions carry over to destination page's input chips.
**Notes:** For pure redirect (no meaningful response), a toast on the destination is acceptable. The key insight is that the user should see the answer before being moved.

---

## Agent's Discretion

- Exact exponential backoff timing
- Toast styling and auto-dismiss duration
- Page preload strategy (lazy import vs prefetch)
- Retrying indicator exact wording

## Deferred Ideas

- None — discussion stayed within phase scope.
