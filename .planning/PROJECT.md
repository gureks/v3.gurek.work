# Gurek AI-Twin Portfolio

## What This Is

Gurek AI-Twin is a conversational portfolio web application designed to act as a "Digital Brain" for Gurek Singh. It replaces traditional static portfolios with an intuitive, chat-based interface that allows recruiters and peers to interactively explore his professional journey, projects, and case studies.

## Core Value

Interactive, query-driven discovery of Gurek's work through a highly responsive, custom-designed chat UI backed by a local RAG engine.

## Requirements

### Validated

- ✓ Local LightRAG Backend with FastAPI orchestration — existing
- ✓ Local PostgreSQL with `pgvector` for embeddings — existing
- ✓ Basic legacy frontend codebase (to be discarded/refactored) — existing

### Active

- [ ] Complete frontend rewrite from scratch in the `frontend` folder using React + Vite + Tailwind.
- [ ] Implement Conversational AI interface (chat-style UI with streaming) via `/query/stream` endpoint.
- [ ] Implement Project "Gems" (Responsive sidebar navigation for deep-dive summaries).
- [ ] Implement Scroll Gallery (Infinite scroll gallery for projects, media, blogs).
- [ ] Remove all 3rd-party component libraries including shadcn.
- [ ] Implement responsive UI strictly adhering to Figma designs (Slide-out sheets on mobile, fixed sidebars on desktop).
- [ ] Render rich content in chat (GFM, tables, raw HTML, custom components) via `react-markdown`.
- [ ] Create templated system prompts in frontend for use-case specific outputs.

### Out of Scope

- Modifying the `LightRAG` directory or backend logic — The backend acts as a stable orchestration layer, and any use-case specific adaptation must happen via frontend prompts.
- Using 3rd-party component libraries like Shadcn — UI must be built from scratch to perfectly match bespoke Figma designs.

## Context

- The legacy frontend codebase used a different backend API and is deprecated but available for reference.
- The new frontend must be heavily customized and use Tailwind CSS for Light/Dark mode transitions.
- The backend is a FastAPI server wrapping the LightRAG engine on `localhost:9621`, which we communicate with for fetching embeddings and chat responses.

## Constraints

- **Backend Immutable**: No changes in the LightRAG directory — Ensures backend stability and separation of concerns.
- **Bespoke UI**: No 3rd-party component libraries — Ensures pixel-perfect alignment with the provided Figma designs.
- **Frontend Only**: All current development must happen entirely in the `frontend` directory.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Total Frontend Rewrite | Legacy frontend used a different API; new Figma design requires custom components | — Pending |
| Conversational UI First | AI Chat interface is the core capability | — Pending |
| No 3rd-party component libs | Must follow bespoke Figma design strictly without library overhead | — Pending |
| Frontend-driven Templated Prompts | Keep backend immutable while customizing output | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-23 after initialization*
