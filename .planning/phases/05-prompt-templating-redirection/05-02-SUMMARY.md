---
phase: "05"
plan: "02"
status: complete
started: "2026-05-01T00:29:00Z"
completed: "2026-05-01T00:30:11Z"
---

# Plan 05-02 Summary: Retry Logic, Graceful Degradation & Redirect+Answer Flow

## What Was Built
Added exponential backoff retry logic for failed JSON parsing, a "retrying…" indicator, graceful fallback to raw markdown, and the redirect+answer flow where the response renders before navigation occurs.

## Key Files

### Modified
- `frontend/src/store/useChatStore.ts` — Complete rewrite with retry logic, redirect+answer, and redirect-only flows
- `frontend/src/components/chat/TypingIndicator.tsx` — Added retry indicator below bouncing dots

## What Changed
1. **Retry Logic:** 3 attempts with delays [500ms, 1s, 2s] on JSON parse failure, automatic re-query to backend
2. **Retry State:** `retryAttempt: number | null` in store, read by TypingIndicator for visual feedback
3. **Graceful Degradation:** If all retries fail and raw text looks like prose (length > 10, contains letters), render as markdown instead of error
4. **cleanAndParseJSON:** Robust parser that strips markdown code fences and extracts JSON from mixed content
5. **Redirect+Answer Flow:** When both `redirect` and `response` are set, message renders first, then navigation after 1.5s delay
6. **Redirect-Only Flow:** Navigates immediately with `toast` and `suggestions` in navigation state
7. **Typing Indicator:** Shows "Retrying… (attempt N/3)" text with smooth opacity transition below existing dots

## Self-Check: PASSED
- `retryAttempt` state exists in store ✓
- `cleanAndParseJSON` handles markdown-wrapped JSON ✓
- `RETRY_DELAYS` is [500, 1000, 2000] ✓
- Redirect+answer adds message before navigating ✓
- Redirect-only passes toast in navigation state ✓
- TypingIndicator shows retry status ✓
- TypeScript compiles cleanly ✓

## Deviations
None — implemented as planned.
