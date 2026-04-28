# Phase 3: Navigation & Page Context - Code Patterns

**Objective:** Identify existing code patterns and conventions relevant to Phase 3 (Navigation & Page Context) to ensure consistency and efficient development. This document informs the planner about reusable components, styling approaches, and architectural decisions.

## 1. Files to be Created/Modified

Based on CONTEXT.md and RESEARCH.md, the following types of files are expected to be created or modified:

*   `frontend/src/App.tsx`: Main application layout, routing setup.
*   `frontend/src/components/layout/`: New directory for layout components (e.g., `Sidebar.tsx`, `MobileMenu.tsx`, `MainLayout.tsx`).
*   `frontend/src/pages/`: New directory for templated page components (e.g., `ProjectsPage.tsx`, `AboutPage.tsx`).
*   `frontend/src/store/useAppStore.ts`: Modifications for chat history persistence.
*   `frontend/src/utils/chat.ts` (or similar): Logic for injecting page context into chat messages.
*   `frontend/src/index.css` (or similar): Custom scrollbar styles if not using a Tailwind plugin.
*   `frontend/tailwind.config.js`: May need updates for custom CSS variables or plugins.

## 2. Existing Analogies & Code Excerpts

### 2.1. Tailwind CSS for Layout & Styling

**Role:** Primary styling framework for responsive design, component layout, and animations.
**Data Flow:** Components consume Tailwind utility classes.
**Closest Analog:** Existing `frontend/src/App.tsx` or any existing component that uses Tailwind for layout.

**Code Excerpt Example (for responsive layout):**
```tsx
// frontend/src/components/layout/MainLayout.tsx (conceptual)
<div className="flex flex-col md:flex-row min-h-screen">
  {/* Sidebar or Mobile Menu */}
  <nav className="md:w-64 bg-gray-800 text-white">
    {/* ... navigation links ... */}
  </nav>
  {/* Main content area */}
  <main className="flex-1 p-4">
    {/* ... page content and chat UI ... */}
  </main>
</div>
```

**Code Excerpt Example (for mobile slide-out menu):**
```tsx
// frontend/src/components/layout/MobileMenu.tsx (conceptual)
// Using conditional classes and transform for slide animation
<div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
  {/* ... menu items ... */}
  <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div> {/* Frosted glass effect */}
</div>
```

### 2.2. Zustand for State Management & Persistence

**Role:** Global state management for chat history and potentially UI state (e.g., sidebar open/closed).
**Data Flow:** Components dispatch actions to the store; store updates state and persists to `localStorage`.
**Closest Analog:** `frontend/src/store/useAppStore.ts`

**Code Excerpt Example (Zustand with persist middleware):**
```typescript
// frontend/src/store/useAppStore.ts (conceptual addition)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatState {
  messages: { id: string; text: string; sender: 'user' | 'ai' }[];
  addMessage: (message: { text: string; sender: 'user' | 'ai' }) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (newMessage) => set((state) => ({ messages: [...state.messages, { id: Date.now().toString(), ...newMessage }] })),
    }),
    {
      name: 'chat-storage', // name of the item in localStorage
      getStorage: () => localStorage, // use localStorage
    }
  )
);
```

### 2.3. React Router DOM for Navigation

**Role:** Client-side routing to manage different "pages" or views within the single-page application.
**Data Flow:** Browser URL changes trigger component rendering based on route definitions.
**Closest Analog:** Existing `react-router-dom` setup in `frontend/src/App.tsx`.

**Code Excerpt Example (React Router configuration):**
```tsx
// frontend/src/App.tsx (conceptual modification)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          {/* ... other templated pages ... */}
        </Routes>
      </MainLayout>
    </Router>
  );
}
```

## 3. Figma MCP Integration

**Role:** All UI components and styling (spacing, typography, color) must strictly adhere to Figma designs.
**Data Flow:** Figma MCP tools will be used to extract design tokens and component structures.
**Closest Analog:** This is a project-wide convention established in Phase 1.

**Convention:** Developers are expected to generate or manually implement UI components with 1:1 visual fidelity to Figma designs, prioritizing the use of generated Tailwind CSS classes or custom CSS properties that directly map to Figma tokens.

## 4. Chat Context Injection

**Role:** Prepending hidden system prompts to user messages based on the current page context.
**Data Flow:** User input -> Frontend logic (reads route) -> Appends system prompt -> Sends to LightRAG backend.
**Closest Analog:** Existing `fetch` logic for sending messages to `localhost:9621/query`.

**Conceptual Snippet:**
```typescript
// frontend/src/utils/chat.ts (conceptual)
import { useLocation } from 'react-router-dom';

const sendMessage = async (userMessage: string) => {
  const location = useLocation();
  let systemPromptPrefix = '';

  if (location.pathname === '/projects') {
    systemPromptPrefix = '<system_context>You are currently on the projects page. Provide project-related information.</system_context>';
  } else if (location.pathname === '/about') {
    systemPromptPrefix = '<system_context>You are on the about page. Answer questions about the author.</system_context>';
  }
  // ... other page contexts

  const messageToSend = systemPromptPrefix + userMessage;

  // Existing fetch call to localhost:9621/query
  const response = await fetch('http://localhost:9621/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: messageToSend }),
  });
  // ... handle response
};
```
