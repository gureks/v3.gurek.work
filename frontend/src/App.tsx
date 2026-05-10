import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import MainLayout from './components/layout/MainLayout';
import { Toast } from './components/ui/Toast';

// ─── Lazy-loaded routes for code splitting ───────────────────────────────────
const ChatPage = lazy(() => import('./pages/ChatPage').then(m => ({ default: m.ChatPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));

// ─── Route loading skeleton ───────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="flex flex-col flex-1 w-full h-full items-center justify-center animate-pulse">
      <div className="flex flex-col gap-4 w-full" style={{ maxWidth: '654px', padding: '24px' }}>
        <div className="h-8 rounded-lg" style={{ backgroundColor: 'var(--background-elevated)', width: '60%' }} />
        <div className="h-4 rounded-lg" style={{ backgroundColor: 'var(--background-elevated)', width: '90%' }} />
        <div className="h-4 rounded-lg" style={{ backgroundColor: 'var(--background-elevated)', width: '75%' }} />
        <div className="h-24 rounded-lg mt-4" style={{ backgroundColor: 'var(--background-elevated)' }} />
      </div>
    </div>
  );
}

function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <Suspense fallback={<PageSkeleton />}>
              <ChatPage />
            </Suspense>
          } />
          <Route path="/projects" element={
            <Suspense fallback={<PageSkeleton />}>
              <ProjectsPage />
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<PageSkeleton />}>
              <AboutPage />
            </Suspense>
          } />
          <Route path="/playground" element={
            <Suspense fallback={<PageSkeleton />}>
              <PlaygroundPage />
            </Suspense>
          } />
          <Route path="/project/:name" element={
            <Suspense fallback={<PageSkeleton />}>
              <ProjectPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
