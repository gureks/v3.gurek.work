# Requirements

**Core Value:** Interactive, query-driven discovery of Gurek's work through a highly responsive, custom-designed chat UI backed by a local RAG engine.

## v1 Requirements

### Core Chat Interface
- [ ] **CHAT-01**: User can send a message and receive real-time streamed responses (NDJSON).
- [ ] **CHAT-02**: Responses render rich Markdown (GFM, tables, raw HTML, code blocks) via `react-markdown`.
- [ ] **CHAT-03**: Chat window automatically scrolls to the bottom to follow new incoming chunks smoothly.
- [ ] **CHAT-04**: Use templated system prompts to shape use-case specific outputs.
- [ ] **CHAT-05**: Implement Templated Responses (Redirection): If a query matches a dedicated page, redirect the user instead of chatting.
- [ ] **CHAT-06**: Display typing indicators and micro-animations for message appearance (Framer Motion).

### Layout & Navigation
- [ ] **LAY-01**: User can toggle seamlessly between Light and Dark mode using Tailwind CSS.
- [ ] **LAY-02**: UI must be strictly built from scratch based on Figma designs (No Shadcn or 3rd-party component libs).
- [ ] **LAY-03**: Mobile responsiveness: Slide-out hamburger menu for navigation and fixed chat input at the bottom.
- [ ] **LAY-04**: Desktop responsiveness: Fixed, context-aware sidebars that stay open.

### Gallery & Gems
- [ ] **GAL-01**: User can view a Scroll Gallery (infinite scroll gallery for projects, media, blogs).
- [ ] **GAL-02**: User can interact with Project "Gems" (Responsive sidebar navigation for deep-dive summaries).

## v2 Requirements
- [ ] Advanced Interactive Markdown Elements (Clickable project cards rendered *within* the chat stream).

## Out of Scope
- **Backend Modifications**: Modifying the `LightRAG` directory or backend logic is strictly forbidden. The backend acts as a stable orchestration layer.
- **3rd-Party Component Libraries**: Shadcn, MUI, etc., are forbidden to ensure pixel-perfect fidelity with bespoke Figma designs.

## Traceability
*(To be populated by Roadmap)*
