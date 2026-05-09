# Roadmap: Gurek AI-Twin Portfolio

## Overview

A full rebuild of the frontend portfolio in React, driven by a conversational AI interface. We start by laying the technical foundation with Tailwind and Figma MCP, move into building the core standard `/query` chat, expand into routing and page-specific context, integrate galleries/gems, and finally tie in the backend-driven templated RAG responses.

## Phases

- [x] **Phase 1: Project Foundation & Styling** - Setup React + Vite + Tailwind and Figma MCP integration.
- [x] **Phase 2: Core Chat UI** - Build the standard request/response cycle, markdown rendering, and typing indicators.
- [x] **Phase 3: Navigation & Page Context** - Implement responsive shell, templated pages, and page-specific chat history.
- [x] **Phase 4: Galleries & Interactive Gems** - Build the infinite scroll gallery and sidebar project gems.
- [x] **Phase 5: Prompt Templating & Redirection** - Implement use-case prompts and dynamic redirection logic based on LightRAG responses.

## Phase Details

### Phase 1: Project Foundation & Styling
**Goal**: Establish the underlying stack and global design tokens strictly based on Figma.
**Depends on**: Nothing
**Requirements**: LAY-01, LAY-02
**Success Criteria** (what must be TRUE):
  1. React + Vite + Tailwind app runs locally.
  2. Figma MCP is used to extract design tokens; Light and Dark mode toggle successfully changes theme colors.
**Plans**: TBD

### Phase 2: Core Chat UI
**Goal**: A functional, non-streaming chat interface rendering rich markdown.
**Depends on**: Phase 1
**Requirements**: CHAT-01, CHAT-02, CHAT-03, CHAT-06
**Success Criteria** (what must be TRUE):
  1. User can send queries to standard `/query` endpoint and receive a response.
  2. Responses correctly render GFM, tables, raw HTML, and code blocks.
  3. Viewport auto-scrolls to the top of the latest message when it arrives.
  4. Framer motion typing indicators and micro-animations play smoothly.
**Plans**: TBD

### Phase 3: Navigation & Page Context
**Goal**: Build the responsive outer shell and page-specific history tracking.
**Depends on**: Phase 2
**Requirements**: LAY-03, LAY-04, LAY-05, CHAT-07
**Success Criteria** (what must be TRUE):
  1. Context-aware sidebars render correctly on desktop, sliding menus on mobile.
  2. Templated pages exist for project descriptions, galleries, etc.
  3. Chat history persists correctly based on the active page session.
**Plans**: TBD

### Phase 4: Galleries & Interactive Gems
**Goal**: Embed visual assets and deep-dive interactions tightly into the layout.
**Depends on**: Phase 3
**Requirements**: GAL-01, GAL-02
**Success Criteria** (what must be TRUE):
  1. Scroll Gallery renders infinitely within the bounds of the chat interface itself.
  2. Project Gems provide sidebar navigation for deep-dives into projects.
**Plans**: TBD

### Phase 5: Prompt Templating & Redirection
**Goal**: Complete the LightRAG integration with robust frontend manipulation logic.
**Depends on**: Phase 4
**Requirements**: CHAT-04, CHAT-05
**Success Criteria** (what must be TRUE):
  1. Frontend intercepts predefined LightRAG responses to redirect users to dedicated templated pages.
  2. Use-case specific outputs are properly shaped by frontend-side system prompts.
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Foundation & Styling | 2/2 | [DONE] | 2026-04-26 |
| 2. Core Chat UI | 2/2 | [DONE] | 2026-04-27 |
| 3. Navigation & Page Context | 3/3 | [DONE] | 2026-04-28 |
| 4. Galleries & Interactive Gems | 3/3 | [DONE] | 2026-04-30 |
| 5. Prompt Templating & Redirection | 3/3 | [DONE] | 2026-05-01 |

### Phase 6: Make UI pixel-perfect, add chat redirections, and implement Rich Component Templating

**Goal:** [To be planned]
**Requirements**: TBD
**Depends on:** Phase 5
**Plans:** 0 plans

Plans:
- [ ] TBD (run /gsd-plan-phase 6 to break down)

### Phase 7: Implement project pages either templated or rich chat component modular and easily templatized. epaper project figma ready here - https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=322-13318&t=ZMD9k4dSZHxWhlWX-11

**Goal:** [To be planned]
**Requirements**: TBD
**Depends on:** Phase 6
**Plans:** 0 plans

Plans:
- [ ] TBD (run /gsd-plan-phase 7 to break down)
