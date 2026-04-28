# Phase 3: Navigation & Page Context - Research

**Objective:** To inform the planning of Phase 3 by outlining the key technical considerations for building the responsive outer shell, managing page-specific content, and implementing global chat history.

## 1. Key Areas of Investigation

### 1.1. Responsive Layout & Navigation (Requirements: LAY-03, LAY-04)

*   **Approach:** Implement a responsive shell using **Tailwind CSS**. The core will be a main layout component that conditionally renders a desktop sidebar or a mobile slide-out menu based on screen size.
*   **Desktop Sidebar (LAY-04):**
    *   A fixed-width sidebar, always visible on larger screens.
    *   It should contain the primary navigation links.
    *   **Custom Scrollbar:** The `plan-phase.md` mentions a custom scrollbar. We can achieve this with Tailwind plugins like `tailwind-scrollbar` or by using custom CSS with `::-webkit-scrollbar`. The decision from `03-CONTEXT.md` (D-04) is to implement a custom scrollbar contained strictly within the sidebar.
*   **Mobile Slide-out Menu (LAY-03):**
    *   Triggered by a hamburger icon.
    *   **Frosted Glass Effect:** `03-CONTEXT.md` (D-01) specifies `backdrop-blur`. This can be implemented in Tailwind with `backdrop-blur-md` or `backdrop-blur-lg`. The exact value should be taken from the Figma design.
    *   **Transitions:** `03-CONTEXT.md` (D-02) mandates pure Tailwind CSS transitions for the slide-in/out animations. We'll use classes like `transform`, `translate-x-full`, `transition-transform`, and `duration-300`.

### 1.2. Chat History & State Management (Requirement: CHAT-07)

*   **Technology:** The project already uses **Zustand** (`frontend/src/store/useAppStore.ts`).
*   **Global Chat History:** A single, global chat history will be maintained in the Zustand store.
*   **Persistence (D-05):** The chat history will be persisted to `localStorage`. We can use a Zustand middleware like `persist` from `zustand/middleware` to handle this automatically.
*   **Page-Specific Context Injection (D-10):**
    *   The frontend will not send the page context to the backend. Instead, it will prepend a hidden system prompt to the user's message based on the current page's route.
    *   This logic will live in the function that handles sending messages to the LightRAG backend. It will read the current route from `react-router-dom`.

### 1.3. Routing & Page Templates (Requirement: LAY-05)

*   **Technology:** The project uses **`react-router-dom`**.
*   **Route Structure:** We will define routes for each templated page (e.g., `/`, `/projects`, `/about`).
*   **Templated Pages (D-11):**
    *   These are not separate pages in the traditional sense. They are React components that will be rendered *within* the main chat UI.
    *   We will need to create different layout variants of the main chat component that can accommodate this content.
    *   The content for these pages will be hardcoded React components, with styling and layout information extracted from Figma.
*   **Visual Transitions (D-09):** The requirement is for an "instant swap". Standard `react-router-dom` route transitions will achieve this.

## 2. External Dependencies & References

*   **Figma:** The single source of truth for all UI design. The planner must refer to the Figma file for all styling, layout, and component design.
    *   **Navigation Component Link:** `https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=12-643&m=dev`
*   **LightRAG Backend:** The frontend will communicate with the backend at `localhost:9621/query`. The only "integration" for this phase is the injection of the system prompt prefix.

## 3. Summary of "What to know to PLAN this phase well"

To plan Phase 3, the planner must create tasks that:

1.  **Build the responsive shell:** Create the main layout component with desktop and mobile variants using Tailwind CSS.
2.  **Implement the sidebar:** Create the fixed desktop sidebar and the slide-out mobile menu with the specified animations and styling.
3.  **Manage chat history:** Use Zustand to manage a global chat history and persist it to `localStorage`.
4.  **Implement routing:** Set up routes for the templated pages using `react-router-dom`.
5.  **Inject page context:** Implement the logic to prepend a system prompt to user messages based on the current route.
6.  **Create page templates:** Build the hardcoded React components for the templated pages, based on Figma designs.
7.  **All UI work must be based on the provided Figma designs.**

This research provides a solid foundation for creating a detailed and actionable plan for Phase 3.
