import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavSidebar } from './NavSidebar';

const DesktopSidebar: React.FC = () => {
  const location = useLocation();
  return (
    <div className="hidden md:block h-full flex-shrink-0">
      <NavSidebar activeRoute={location.pathname} />
    </div>
  );
};

export default DesktopSidebar;
