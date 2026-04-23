# Gurek AI-Twin Portfolio ("Digital Brain")

**STRICTLY NO CHANGES TO BE MADE in THE LIGHTRAG DIRECTORY**

## 📖 Product Overview

**Gurek AI-Twin** is a cutting-edge, conversational portfolio web application designed to act as a "Digital Brain" for Gurek Singh. Moving beyond traditional static portfolios, this platform mimics the intuitive, chat-based interface of advanced LLMs (like ChatGPT or Gemini), allowing recruiters, hiring managers, and peers to interactively explore Gurek's professional journey, technical projects, and case studies.

### Value Proposition
- **Interactive Discovery:** Replaces linear reading with dynamic, query-driven exploration.
- **Context-Aware Responses:** Leverages LightRAG instance deployed locally to provide highly specific, accurate answers based purely on Gurek's actual work experience and documentation.
- **Premium User Experience:** Offers a modern, highly responsive UI with rich-media support, dark mode, and seamless interactions.

### Core Capabilities
- **Conversational AI Interface:** A familiar, chat-style UI that responds contextually to user queries and streams the response as it's being generated.
- **Project "Gems":** Sidebar navigation providing quick access to structured, deep-dive summaries of key projects and case studies.
- **Personalized Onboarding:** Tailors the conversation's tone and focus based on the user's role and intent.
- **Rich Content Rendering:** Supports GitHub Flavored Markdown (GFM), tables, raw HTML, and custom UI components directly within the chat stream.

---

## 🏗 System Architecture

The platform operates on a decoupled client-server architecture, optimizing for responsiveness on the frontend and processing power on the backend.

### 1. Frontend Ecosystem (Client)
**ALL WORK MUST BE DONE IN THE FRONTEND FOLDER**
**legacy codebase is available in frontend folder for refactoring and repurposing**
**The CSS and component structure must be created from scratch in the frontend folder as per the figma designs. Remove all 3rd party component libraries including shadcn components**

The client-side is built for speed, accessibility, and a premium aesthetic, strictly adhering to modern web development standards.

- **Framework:** React with Vite for rapid HMR and optimized production builds.
- **UI & Styling:** 
  - **Custom Design:** A custom, bespoke UI currently in Figma, needs to be translated into actual code and components.
  - **Tailwind CSS:** Utility-first styling, to include seamless Light/Dark mode transitions.
- **Content Parsing:** Utilizes `react-markdown` with GFM support to safely and beautifully render the LLM's markdown outputs, including tables, code blocks, and formatted text.
- **Core Components:**
  - `ChatInterface`: The central hub managing the message stream, loading states, and user input.
  - `Sidebar / Gems`: Responsive project navigation (utilizing slide-out sheets on mobile and fixed sidebars on desktop).
  - `Scroll Gallery`: Infinite scroll gallery for project listing, media showcase, blog listing, also in Figma.

### 2. Backend Services (API & RAG Engine)
**LightRAG instance deployed locally.**
**STRICTLY NO CHANGES TO BE MADE in THE LIGHTRAG DIRECTORY**
**WE USE THE LIGHTRAG API TO UPDATE THE DATABASE AND KNOWLEDGE BASE**
**Any use-case specific outputs must be handled by defining templated system prompts in frontend OR using the existing tools and APIs**

The server-side acts as a high-performance orchestration layer, managing data retrieval, embedding generation, and LLM communication.

- **Framework:** FastAPI (Python), ensuring asynchronous request handling and rapid API responses.
- **Database & Vector Store:** PostgreSQL (hosted via Docker) leveraging the `pgvector` extension for storing and querying high-dimensional embeddings.
- **API Documentation:** http://localhost:9621/redoc
- **Swagger UI:** http://localhost:9621/docs
- **OpenAPI JSON:** http://localhost:9621/openapi.json


### 3. Figma Designs
All components, icons, color pallette, and every visual asset is defined in the Figma designs. 
Use the Figma MCP to import all the details directly from Figma. 
- [Initial Default](https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=214-14384&m=dev)
- [Homepage](https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=26-177&m=dev)
- [Projects Page](https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=36-755&m=dev)
- [Projects Detail Page - WIP / TBD](https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=198-6226&m=dev)
- [Gallery Section - FPV/Prompts/Play Sections](https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=390-7205&m=dev)
- [Mobile](https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=36-565&m=dev)
---

## 📦 Deployment Strategy

### Frontend Deployment (Vercel)
1. Import the `frontend` directory as a new project in Vercel.
2. Configure necessary environment variables (e.g., backend API URL).
3. Deploy for global CDN distribution.

### Backend Deployment (Render / Railway)
1. Deploy the `backend` directory as a Python Web Service.
2. Inject all environment variables defined in your `.env` file.
3. Update the Frontend's API base URL to point to the newly deployed backend service.

---

## Project Roadmap & TODOs
- [ ] **Default Responses**: Default responses for certain questions
- [ ] **Animations and Positioning**: Render messages in a more natural way and align viewport to the unread message
- [ ] **Templated Responses**: Redirection responses for questions that already have a dedicated page
- [ ] **Rate Limiting**: Tune rate limiter for production loads and DDoS prevention.
- [ ] **Project Gallery**: Create a visual gallery view for projects instead of just a list.
- [ ] **Theme Customization**: Revamp entire theme as per figma redesign
- [ ] **Mobile Polish**: Further refine the chat experience on small screens (keyboard handling, etc.).
