import { useState } from 'react';
import { NAV_PRIMARY, NAV_SOCIAL, NAV_LOGO, isSeparator, type NavEntry, type NavItemConfig } from '../../config/nav.config';
import {
  HomeIcon, ProjectsIcon, ResumeIcon, BuildsIcon, PromptsIcon,
  PlaygroundIcon, FpvIcon, InstagramIcon, LinkedinIcon, GithubIcon,
  EmailIcon,
} from '../../assets/custom-icons';

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

interface NavSidebarProps {
  activeRoute?: string;
}

export function NavSidebar({ activeRoute = '/' }: NavSidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const allEntries: NavEntry[] = [...NAV_PRIMARY, ...NAV_SOCIAL];

  const getActiveId = () => {
    const match = allEntries.find((e) => {
      if (isSeparator(e)) return false;
      return (e as NavItemConfig).href === activeRoute;
    });
    return match && !isSeparator(match) ? (match as NavItemConfig).id : 'home';
  };

  const activeId = getActiveId();

  return (
    <nav
      className="flex flex-col items-start justify-start w-[108px] h-full flex-shrink-0"
      style={{
        padding: 'var(--space-6)', // 24px padding
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <div 
        className="flex flex-col items-center flex-1 w-full"
        style={{
          backgroundColor: 'var(--background-elevated)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        {/* Logo — top of nav */}
        {NAV_LOGO.visible && (
          <div className="w-full flex items-center justify-center" style={{ padding: 'var(--space-2)' }}>
            <a
              href={NAV_LOGO.href}
              className="flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                width: '100%',
                aspectRatio: '1',
                padding: 'var(--space-3)',
              }}
            >
              <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                {/* Gurek Logo Placeholder */}
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" stroke="var(--background)" strokeWidth="2"/>
                  <path d="M10 24C10 18 14 16 16 16C18 16 22 18 22 24" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="16" cy="12" r="4" stroke="var(--background)" strokeWidth="2"/>
                </svg>
              </div>
            </a>
          </div>
        )}

        {/* Nav items */}
        {allEntries.map((entry, index) => {
          if (isSeparator(entry)) {
            return (
              <div
                key={`sep-${index}`}
                className="w-full flex justify-center"
              >
                <div 
                  style={{
                    height: '8px', // matched from Figma separator 'imgNavItem'
                    width: '100%'
                  }}
                />
              </div>
            );
          }

          const item = entry as NavItemConfig;
          if (!item.visible) return null;

          const Icon = ICON_MAP[item.id];
          const isActive = item.id === activeId;
          const isHovered = item.id === hoveredId;

          return (
            <div 
              key={item.id} 
              className="w-full flex justify-center relative" 
              style={{ 
                padding: 'var(--space-3) var(--space-2)', // py-12px px-8px
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <a
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="relative flex items-center justify-center transition-colors w-full"
                style={{
                  padding: 'var(--space-2) var(--space-3)', // px-12px py-8px
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isActive ? 'var(--foreground)' : 'transparent',
                  color: isActive ? 'var(--background)' : 'var(--foreground)',
                  opacity: item.disabled ? 0.4 : 1,
                  pointerEvents: item.disabled ? 'none' : 'auto',
                  cursor: item.disabled ? 'default' : 'pointer',
                  transition: 'background-color var(--duration-fast) var(--easing-default)',
                }}
              >
                {Icon && <Icon size={20} />}
                
                {/* Tooltip on hover */}
                {isHovered && !isActive && (
                  <span
                    className="absolute left-[56px] whitespace-nowrap z-10 pointer-events-none shadow-md"
                    style={{
                      backgroundColor: 'var(--background-elevated)',
                      color: 'var(--foreground)',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '16px',
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
