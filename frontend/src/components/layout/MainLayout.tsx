import React from 'react';
import { Outlet } from 'react-router-dom';
import DesktopSidebar from './DesktopSidebar';
import MobileMenu from './MobileMenu';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-background text-foreground h-screen overflow-hidden">
      <DesktopSidebar />
      <MobileMenu />
      
      <main className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
        {/* Content Area */}
        <div className="flex-1 w-full h-full overflow-y-auto relative mx-auto max-w-content pt-20 md:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
