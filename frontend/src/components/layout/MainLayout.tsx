import React from 'react';
import { Outlet } from 'react-router-dom';
import DesktopSidebar from './DesktopSidebar';
import MobileMenu from './MobileMenu';

const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row bg-background text-foreground h-screen overflow-hidden">
      <DesktopSidebar />
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      
      <main className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-background-nav border-b border-border z-10 relative">
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-medium text-foreground">Gurek</span>
          <div className="w-6" /> {/* Placeholder for balance */}
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full h-full overflow-y-auto relative mx-auto max-w-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
