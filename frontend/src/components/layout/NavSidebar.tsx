import { useState } from 'react';
import { NAV_PRIMARY, NAV_SOCIAL, NAV_LOGO, isSeparator, type NavEntry, type NavItemConfig } from '../../config/nav.config';
import {
  HomeIcon, ProjectsIcon, ResumeIcon, BuildsIcon, PromptsIcon,
  PlaygroundIcon, FpvIcon, InstagramIcon, LinkedinIcon, GithubIcon,
  EmailIcon, GurekAvatarIcon
} from '../../assets/custom-icons';

/**
 * NavSidebar — Figma-accurate sidebar navigation.
 * 
 * Figma node: 214:14203 (Nav - Tooltip)
 * Width: 108px, full height
 * Variables: space/6 (24px padding), radius/lg (16px), blur/xl (40px), blur/lg (20px)
 * bg: semantic/background-nav (rgba(32,32,32,0.80)) with glassmorphism
 * Selected state: bg white, icon color black
 * Separator: border-subtle (#000000) horizontal line
 */

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
      className="flex flex-col items-center flex-shrink-0 h-full border-r border-[var(--border-subtle)]"
      style={{
        padding: '24px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        width: '108px',
      }}
    >
      <div 
        className="flex flex-col items-center shrink-0 w-full"
        style={{
          backgroundColor: 'var(--background-elevated)',
          borderRadius: 'var(--radius-lg)',
          paddingBottom: '8px'
        }}
      >
      {/* Logo — top of nav */}
      {NAV_LOGO.visible && (
        <div className="flex flex-col items-start justify-center w-full p-[8px]">
          <a
            href={NAV_LOGO.href}
            className="flex items-center justify-center w-full p-[12px]"
          >
            {/* Gurek logo */}
            <GurekAvatarIcon size={32} />
          </a>
        </div>
      )}

      {/* Nav items */}
      <div className="flex flex-col items-center w-full flex-1">
        {allEntries.map((entry, index) => {
          if (isSeparator(entry)) {
            return (
              <div
                key={`sep-${index}`}
                className="w-full h-[8px] my-[4px]"
                style={{
                  backgroundImage: 'radial-gradient(circle, var(--border-subtle) 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'repeat-x',
                  opacity: 0.5
                }}
              />
            );
          }

          const item = entry as NavItemConfig;
          if (!item.visible) return null;

          const Icon = ICON_MAP[item.id];
          const isActive = item.id === activeId;
          const isHovered = item.id === hoveredId;

          return (
            <div key={item.id} className="flex flex-col items-start px-[8px] py-[12px] relative w-full shrink-0">
              <a
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="relative flex items-center justify-center px-[12px] py-[8px] gap-[12px] transition-colors w-full shrink-0"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isActive ? 'var(--foreground)' : 'transparent',
                  color: isActive ? 'var(--background)' : 'var(--foreground)',
                  opacity: item.disabled ? 0.4 : 1,
                  pointerEvents: item.disabled ? 'none' : 'auto',
                  cursor: item.disabled ? 'default' : 'pointer',
                  transition: 'background-color var(--duration-fast) var(--easing-default)',
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {Icon && <Icon size={20} className="shrink-0" />}

                {/* Tooltip on hover */}
                {isHovered && !isActive && (
                  <span
                    className="absolute left-[56px] whitespace-nowrap z-50 pointer-events-none"
                    style={{
                      backgroundColor: 'var(--background-elevated)',
                      color: 'var(--foreground)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      boxShadow: 'var(--shadow-md)'
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
      </div>
    </nav>
  );
}
