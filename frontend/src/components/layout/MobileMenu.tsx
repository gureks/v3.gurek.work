import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavSidebar } from './NavSidebar';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  return (
    <div className={`fixed inset-0 z-50 md:hidden pointer-events-none`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-[10px] transition-opacity duration-300 ease-in-out pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0 !pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      {/* Sidebar Content */}
      <div className={`absolute left-0 top-0 h-full p-4 transform transition-transform duration-300 ease-in-out pointer-events-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NavSidebar activeRoute={location.pathname} />
      </div>
    </div>
  );
};

export default MobileMenu;
