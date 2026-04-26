---
phase: 02
slug: core-chat-ui
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-26
---

# Phase 02 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Browser → LightRAG backend | Frontend sends user queries and conversation history to `http://localhost:9621/query` | User chat messages (portfolio queries, no PII collected) |
| Backend → Browser | LightRAG returns Markdown/HTML response content rendered by `rehype-raw` | AI-generated portfolio content |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-02-01 | Information Disclosure | `services/api.ts` — plaintext HTTP to `localhost:9621` | accept | Local dev portfolio context; no credentials or sensitive PII in transit | closed |
| T-02-02 | XSS via raw HTML passthrough | `MarkdownRenderer.tsx` — `rehype-raw` plugin | accept | Content source is operator-controlled LightRAG backend, not user-supplied HTML. User input is never rendered as raw HTML. | closed |
| T-02-03 | Open Redirect / tab hijacking via Markdown links | `MarkdownRenderer.tsx` — `<a>` renderer | mitigate | Mitigation present: `rel="noopener noreferrer"` applied on all links | closed |
| T-02-04 | Sensitive data accumulation in conversation_history | `useChatStore.ts` — full history sent to backend on every request | accept | Portfolio context; no auth or PII collection; user voluntarily provides context; history is in-memory only (no persistence) | closed |
| T-02-05 | Error detail leakage from backend | `services/api.ts` — `errorBody.detail` surfaced in thrown Error | accept | Error propagates to store catch block which renders generic user-facing copy. Raw `detail` is never rendered to UI. | closed |

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-02-01 | T-02-01 | Plain HTTP is acceptable for localhost-only dev/portfolio deployment. Production would use HTTPS termination at the host level. | agent-audit | 2026-04-26 |
| AR-02-02 | T-02-02 | `rehype-raw` is scoped to AI backend output only. User input is passed as query text, never rendered as raw HTML. Risk accepted for portfolio context. | agent-audit | 2026-04-26 |
| AR-02-04 | T-02-04 | Conversation history contains only portfolio-domain queries. No auth tokens, passwords, or PII are collected. History is ephemeral (in-memory Zustand, cleared on refresh). | agent-audit | 2026-04-26 |
| AR-02-05 | T-02-05 | Backend error detail text stays in JS Error object / console. The store catch block renders generic copy to the user. No leakage path to UI. | agent-audit | 2026-04-26 |

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-04-26 | 5 | 5 | 0 | agent-audit (gsd-secure-phase) |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-26
