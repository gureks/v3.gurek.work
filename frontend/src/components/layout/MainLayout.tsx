import React from 'react';
import { Outlet } from 'react-router-dom';
import DesktopSidebar from './DesktopSidebar';
import MobileMenu from './MobileMenu';
import { Header } from './Header';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-background text-foreground h-screen overflow-hidden" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <DesktopSidebar />
      <MobileMenu />
      <main className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
        <Header />

        {/* Content Area — pt-[60px] on mobile for MobileMenu header height */}
        <div className="flex-1 w-full h-full overflow-y-auto relative mx-auto max-w-content pt-[120px] md:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
