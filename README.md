# Gurek AI-Twin Portfolio ("Digital Brain")

**STRICTLY NO CHANGES TO BE MADE IN THE LIGHTRAG DIRECTORY**

## 📖 Product Overview

**Gurek AI-Twin** is a cutting-edge, conversational portfolio web application designed to act as a "Digital Brain" for Gurek Singh. Moving beyond traditional static portfolios, this platform mimics the intuitive, chat-based interface of advanced LLMs, allowing users to interactively explore Gurek's professional journey, technical projects, and case studies.

### Core Value Proposition
- **Interactive Discovery:** Replaces linear reading with dynamic, query-driven exploration.
- **Context-Aware Responses:** Leverages a local LightRAG instance for highly specific, accurate answers based on Gurek's actual work corpus.
- **Premium User Experience:** A bespoke UI built from scratch to match high-fidelity Figma designs, featuring glassmorphism, dark mode, and fluid animations.

---

## 🏗 System Architecture

### 1. Frontend Ecosystem (React + Vite)
Built for speed and design fidelity.
- **Framework:** React with Vite.
- **Styling:** Custom Vanilla CSS + Tailwind CSS (Zero 3rd-party component libraries).
- **Animations:** Framer Motion for micro-interactions and typing indicators.
- **Security:** DOMPurify for sanitizing AI-generated markdown/HTML.
- **Orchestration:** Frontend-led prompt templating for deterministic navigation and persona control.
- **Telemetry & Testing:** Serverless (Vercel) integration with Notion REST API for asynchronous chat logging, tested via Vitest & Playwright.

### 2. Backend Services (FastAPI + LightRAG)
- **Engine:** LightRAG for Retrieval-Augmented Generation.
- **API:** FastAPI (Python) as the orchestration layer.
- **Database:** PostgreSQL with `pgvector` for embedding storage.

---

## 📂 Project Documentation

Detailed project logs and case studies are available in the root directory:
- [**Process.md**](./Process.md): A deep dive into the engineering journey, challenges (RAG optimization, Hybrid Routing), and critical decisions.
- [**case-study.md**](./case-study.md): A portfolio-style breakdown of the challenge, technical innovations, and results.

---

## 📦 Deployment Strategy

### Frontend (Vercel)
1. Import the `frontend` directory.
2. Configure `VITE_API_URL` environment variable.
3. Deploy to global edge network.

### Backend (Render / Railway)
1. Deploy the `backend` directory as a Python service.
2. Inject PostgreSQL connection strings and environment variables.
3. Expose the FastAPI endpoints for the frontend.

---

## 🛠 Current Progress
- [x] Phase 1: Foundation & Styling
- [x] Phase 2: Core Chat UI & Markdown Rendering
- [x] Phase 3: Responsive Shell & Navigation
- [x] Phase 4: Project Gems & Interactive Galleries
- [x] Phase 5: Prompt Templating & Redirection
- [x] Phase 6: Pixel-Perfect Polish & Rich Component Templating
- [x] Phase 7: Advanced Project Templating, Automated Evals & Session State Handling
- [x] Phase 8: Serverless Telemetry, Asynchronous Notion Persistence & Test Coverage

---

*Engineered by Gurek Singh — Integrating AI into the modern web.*
