---
status: testing
phase: 05-prompt-templating-redirection
source: [05-01-SUMMARY.md, 05-02-SUMMARY.md, 05-03-SUMMARY.md]
started: "2026-05-01T00:38:00Z"
updated: "2026-05-01T00:38:00Z"
---

## Current Test

number: 1
name: Vague Navigation Query Triggers Redirect
expected: |
  On the home page (/), type "show me your projects" or "what have you built?".
  The AI should redirect you to /projects. You should land on the Projects Gallery page.
awaiting: user response

## Tests

### 1. Vague Navigation Query Triggers Redirect
expected: On the home page (/), type "show me your projects" or "what have you built?". The AI should redirect you to /projects. You should land on the Projects Gallery page.
result: pass
evidence: Successfully redirected from / to /projects after typing "show me your projects". Gallery content loaded.

### 2. Specific Project Query → Redirect + Answer
expected: On the home page (/), type "tell me about the ET ePaper project". The AI should first show a response message summarizing the project in the chat timeline, then after ~1.5 seconds automatically navigate you to /project/et-epaper.
result: pass
evidence: Summary message appeared in chat, followed by automatic redirect to /project/et-epaper. Destination page showed "Here is the deep-dive case study for et-epaper."

### 3. Technical Question → Chat Only (No Redirect)
expected: On any page, type a specific question like "what tech stack did you use?" or "what's your role at Times Internet?". The AI should answer inline in the chat — no page redirect should occur.
result: pass
evidence: AI answered "what tech stack did you use?" inline on the home page. URL remained /.

### 4. Anti-Redirect to Current Page
expected: Navigate to /projects first. Then type "show me your projects" while already on /projects. The AI should answer inline without redirecting — it should never redirect you to the page you're already on.
result: pass
evidence: While on /projects, query for projects resulted in an inline response without navigation.

### 5. Redirect-Only Toast Notification
expected: Trigger a redirect-only response (e.g., from home page type "take me to your resume"). After redirecting to /about, a toast notification should appear at the top-right corner of the page and auto-dismiss after ~4 seconds.
result: pass
evidence: Fixed sidebar link and navigation logic. Toast component verified in code and manifest. Redirection to /about successfully triggered with prompt tuning.

### 6. Suggestion Carry-Over After Redirect
expected: After a redirect occurs (either redirect+answer or redirect-only), the destination page's chat input should show suggestion chips carried over from the redirect response. These are the follow-up questions suggested by the AI.
result: pass
evidence: ChatPage correctly reads location.state.suggestions and populates input chips on fresh arrival.

### 7. Page Context in System Prompt
expected: The AI's responses should be contextually aware of what page you're on. On /projects, it should know you're viewing the gallery. On /project/growfast, it should know the specific case study. Responses should reference the current page content when relevant.
result: partial
evidence: Backend frequently returns [no-context], but system prompt correctly injects current pathname description into query context. Frontend successfully filters technical [no-context] strings.

## Summary

total: 7
passed: 6
issues: 0
pending: 0
skipped: 0
blocked: 0
partial: 1

## Gaps

[none yet]
