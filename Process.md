# Project Process: Building the Gurek AI-Twin Portfolio

This document outlines the end-to-end journey of conceptualizing, designing, and engineering the **Gurek AI-Twin Portfolio**—a conversational "Digital Brain" that redefines the traditional professional showcase.

---

## 1. Ideation & Conceptualization
The project was born from a desire to move beyond static, linear portfolios. The core concept was to create a **"Digital Brain"**—a system that doesn't just show work but *explains* it in context.

### Key Goals:
- **Query-Driven Discovery:** Allow users to ask specific questions (e.g., "What was Gurek's role in the Epapers project?") and get immediate, accurate answers.
- **AI-Twin Persona:** Establish a conversational tone that reflects Gurek's professional personality.
- **Frictionless Experience:** Minimize the effort required to find deep-dive details.

---

## 2. Design Philosophy: Figma-First & Bespoke UI
Unlike many modern web apps that rely on component libraries (like Shadcn or MUI), the AI-Twin project prioritized **absolute design fidelity**.

- **Source of Truth:** Every pixel, color token, and animation curve was defined in **Figma**.
- **No Libraries:** To ensure a premium, unique feel, all UI components (Sidebars, Chat Bubbles, Modals) were built from scratch using **Vanilla CSS and Tailwind**.
- **Theming:** A robust design system was implemented using CSS variables, enabling seamless Light/Dark mode transitions that strictly follow the Figma specs.

---

## 3. Development Workflow: The GSD Methodology
The project followed a disciplined **"Get Stuff Done" (GSD)** workflow, breaking the development into logical, verifiable phases.

### Phase 1: Foundation & Styling
- Initialized React + Vite environment.
- Integrated Figma tokens into `index.css`.
- Set up the global layout shell.

### Phase 2: Core Chat Architecture
- Implemented the standard request/response cycle with the **LightRAG** backend.
- Built rich-text rendering using `react-markdown` (GFM, tables, code blocks).
- Added Framer Motion for typing indicators and smooth message entry.

### Phase 3: Navigation & Page Context
- Developed a responsive shell (Slide-out menus for mobile, fixed sidebars for desktop).
- Implemented **Project Gems**: quick-access navigation for key case studies.
- Added page-specific chat history persistence.

### Phase 4: Rich Media & Interactive Galleries
- Built the **Infinite Scroll Gallery** for visual storytelling.
- Integrated media-heavy components directly into the chat stream.

### Phase 5: Intelligent Routing & Redirection
- Implemented **Prompt Templating**: Shifting orchestration logic to the frontend to keep the backend immutable.
- Built **Dynamic Redirection**: The AI can now "sense" when a user needs to see a specific page and trigger a route transition automatically.

### Phase 6: Telemetry, Persistence & Testing
- Developed an asynchronous **Notion Logging Pipeline** using Vercel Serverless Functions to securely track chat sessions.
- Bypassed Notion SDK limitations by implementing direct REST API calls for database schema manipulation and record insertion.
- Engineered a robust testing suite using **Vitest** for store state/API validation and **Playwright** for E2E visual flow verification.

---

## 4. Technical Implementation Details

### The Backend (LightRAG)
- **Engine:** LightRAG provides the retrieval-augmented generation capabilities.
- **Orchestration:** A FastAPI layer manages communication between the frontend and the RAG engine.
- **Database:** PostgreSQL with `pgvector` stores high-dimensional embeddings of Gurek's professional documentation.

### The Frontend (React/Vite)
- **State Management:** A lightweight, reactive store manages chat history and navigation state.
- **UI Engine:** Tailwind CSS for layout, custom CSS for intricate design details, and Framer Motion for high-end micro-animations.

---

## 5. Quality & Verification
Each phase underwent a rigorous verification process:
- **UAT (User Acceptance Testing):** Ensuring every requirement in the SPEC was met.
- **UI Audit:** A 6-pillar visual audit to ensure pixel-perfect parity with Figma.
- **Verification Loop:** Every code change was tested against real-world user queries.

---

## 6. Deployment Strategy
The project uses a modern, distributed deployment model:
- **Frontend:** Deployed on **Vercel** for global CDN performance and seamless CI/CD.
- **Backend:** Deployed on **Render/Railway**, hosting the FastAPI service and the LightRAG engine.
- **Database:** Cloud-hosted PostgreSQL instance with vector support.

---

## 7. Engineering Challenges & Critical Decisions

Throughout the development, several "hidden" technical hurdles were overcome through iterative agent-human collaboration:

### A. Hybrid Suggestion Routing
**Decision:** Transitioned from full LLM-generated suggestions to a structured `SuggestionItem` architecture.
**Reasoning:** Pure LLM suggestions occasionally hallucinated routes or failed to trigger navigation. By defining a "navigation bridge," the AI can suggest actions that are deterministically handled by the React Router, ensuring a 100% success rate for interactive flows.

### B. RAG Context Optimization
**Decision:** Refactored the `/query` payload to separate "retrieval context" from "orchestration instructions."
**Reasoning:** Large system prompts were polluting the vector search, leading to poor retrieval accuracy. Instructions were moved to a dedicated `user_prompt` field, leaving the `query` field clean for high-precision semantic matching.

### C. Security & Content Sanitization
**Decision:** Integrated **DOMPurify** and rigid origin-trust guards for all LLM outputs.
**Reasoning:** Rendering raw markdown and HTML from an AI can introduce XSS risks. All incoming messages are now sanitized at the component level before they hit the DOM.

### D. Architectural Modularization
**Decision:** Standardized all rich UI elements into a single `RichContentContainer`.
**Reasoning:** To avoid code bloat and maintain Figma parity, a registry-based system was created where components (Galleries, Timelines, Project Gems) are dynamically injected into chat bubbles based on the message metadata.

### E. LLM Evaluation & Visual Testing Pipeline
**Decision:** Engineered a dual-layered testing suite using Vitest (headless LLM eval) and Playwright (Visual E2E testing).
**Reasoning:** To prevent "over-redirection" heuristics and ensure stable UI rendering, automated tests simulate user conversation flows across states. They verify that the LLM reliably returns the precise `RichContentData` schema required to render dynamic components rather than blindly navigating to fallback pages.

### F. Intelligent Session State & Caching
**Decision:** Migrated chat persistence to `sessionStorage` with automatic expiration, reload-wipes, and deployment-version cache invalidation.
**Reasoning:** AI chat history can easily become stale or hit browser size limits. By introducing a 12-hour expiry, capping history to 50 items, and attaching Vite build-timestamps to the Zustand state, the user is guaranteed a fresh conversational context without accumulating technical debt in their local browser. Additionally, state injection logic ensures that when an AI *does* redirect a user, the initial user prompt seamlessly carries over to the new page to maintain narrative continuity.

---

*This process document serves as a testament to the engineering rigour and design-centric approach taken to build the Digital Brain.*
