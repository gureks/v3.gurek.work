import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_PRIMARY, NAV_SOCIAL, isSeparator, type NavItemConfig } from '../../config/nav.config';
import {
  HomeIcon, ProjectsIcon, ResumeIcon, BuildsIcon, PromptsIcon,
  PlaygroundIcon, FpvIcon, InstagramIcon, LinkedinIcon, GithubIcon,
  EmailIcon, PhoneIcon, GurekAvatarIcon, HamburgerIcon, NightmodeIcon, LightmodeIcon, CloseIcon
} from '../../assets/custom-icons';
import { useAppStore } from '../../store/useAppStore';

const ICON_MAP: Record<string, React.FC<{ size?: number | string; className?: string }>> = {
  home: HomeIcon,
  projects: ProjectsIcon,
  resume: ResumeIcon,
  builds: BuildsIcon,
  prompts: PromptsIcon,
  playground: PlaygroundIcon,
  fpv: FpvIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  email: EmailIcon,
};

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useAppStore();

  const handleNavClick = (href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href === '#') {
      // Do nothing
    } else {
      navigate(href);
    }
    setIsOpen(false);
  };

  const getActiveId = () => {
    const allEntries = [...NAV_PRIMARY, ...NAV_SOCIAL];
    const match = allEntries.find((e) => !isSeparator(e) && (e as NavItemConfig).href === location.pathname);
    return match ? (match as NavItemConfig).id : 'home';
  };

  const activeId = getActiveId();

  return (
    <>
      {/* Dimmed backdrop when menu is open */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-[4px] z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Floating Top Nav */}
      <div className="fixed top-0 left-0 w-full z-50 md:hidden pointer-events-none flex justify-center">
        <div className="flex flex-col items-center p-[16px] relative rounded-[16px] shrink-0 w-full max-w-full pointer-events-auto">
          <div className="backdrop-blur-[20px] bg-[var(--background-elevated)] border border-[var(--border)] border-solid flex flex-col items-start relative rounded-[16px] shrink-0 w-full transition-all duration-300 shadow-[var(--shadow-lg)] overflow-hidden">
            
            {/* Header / Closed State */}
            <div className="flex items-center justify-between px-[12px] py-[8px] shrink-0 w-full">
              <div className="flex gap-0 items-center py-[12px] shrink-0">
                {/* Gurek Logo */}
                <GurekAvatarIcon size={32} />
              </div>
              <div className="flex gap-[8px] items-center py-[12px] shrink-0">
                {/* Dark mode toggle */}
                {isOpen && (
                  <button 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="bg-[var(--background-tooltip)] flex items-center justify-center p-[8px] rounded-[8px] text-foreground hover:bg-white/10 transition-colors"
                  >
                    {theme !== 'dark' ? <NightmodeIcon size={20} /> : <LightmodeIcon size={20} />}
                  </button>
                )}
                
                {/* Menu Toggle Button */}
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="bg-[var(--background-tooltip)] border border-[var(--border)] flex items-center p-[8px] rounded-[8px] text-foreground hover:bg-white/10 transition-colors"
                >
                  {isOpen ? <CloseIcon size={20} /> : <HamburgerIcon size={20} />}
                </button>
              </div>
            </div>

            {/* Open State / Dropdown List */}
            {isOpen && (
              <div className="flex flex-col items-start p-[8px] shrink-0 w-full">
                {[...NAV_PRIMARY].map((entry, index) => {
                  if (isSeparator(entry)) {
                    return (
                      <div key={`sep-${index}`} className="h-[8px] w-full flex items-center justify-center py-2">
                        <div className="w-full border-t border-[var(--border)]" />
                      </div>
                    );
                  }
                  
                  const item = entry as NavItemConfig;
                  if (!item.visible) return null;
                  
                  const Icon = ICON_MAP[item.id];
                  const isActive = item.id === activeId;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.comingSoon ? '#' : item.href)}
                      className={`flex gap-[16px] items-center px-[16px] py-[12px] rounded-[8px] w-full transition-colors ${isActive ? 'bg-foreground text-background' : 'text-foreground hover:bg-white/5'}`}
                    >
                      {Icon && <Icon size={20} />}
                      <span className="text-[14px] leading-[20px] font-normal">{item.label}{item.comingSoon && (
                      <span className="ml-2 text-xs text-gray-500">Coming soon</span>
                    )}</span>
                    </button>
                  );
                })}
                
                <div className="h-[8px] w-full flex items-center justify-center py-2">
                  <div className="w-full border-t border-[var(--border)]" />
                </div>

                {[...NAV_SOCIAL].map((entry) => {
                  if (isSeparator(entry)) return null;
                  
                  const item = entry as NavItemConfig;
                  if (!item.visible) return null;
                  
                  const Icon = ICON_MAP[item.id];
                  
                  return (
                    <a
                      key={item.id}
                      href={item.comingSoon ? '#' : item.href}
                      target={item.external ? '_blank' : undefined}
                      className="flex gap-[16px] items-center px-[16px] py-[12px] w-full text-foreground hover:bg-white/5 rounded-[8px] transition-colors"
                    >
                      {Icon && <Icon size={20} />}
                      <span className="text-[14px] leading-[20px] font-normal">{item.label}
                        {item.comingSoon && (
                      <span className="ml-2 text-xs text-gray-500">Coming soon</span>
                    )}</span>
                    </a>
                  );
                })}
                
                <div className="pt-2 w-full">
                  <a
                    href="mailto:gurek15033@iiitd.ac.in"
                    className="bg-[var(--accent)] flex gap-[16px] items-center justify-center px-[16px] py-[12px] rounded-[8px] w-full text-white shadow-[var(--glow-accent)] hover:opacity-90 transition-opacity"
                  >
                    <span className="text-[14px] leading-[20px] font-normal">Get in Touch</span> 
                     <PhoneIcon size={20} /> 
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
