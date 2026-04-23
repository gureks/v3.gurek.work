import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';

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
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="bg-background text-foreground min-h-screen">
              Gurek AI-Twin v3 Foundation
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
