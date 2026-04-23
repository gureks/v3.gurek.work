import { useState } from 'react';
import { NAV_PRIMARY, NAV_SOCIAL, NAV_LOGO, isSeparator, type NavEntry, type NavItemConfig } from '../../config/nav.config';
import {
  HomeIcon, ProjectsIcon, ResumeIcon, BuildsIcon, PromptsIcon,
  PlaygroundIcon, FpvIcon, InstagramIcon, LinkedinIcon, GithubIcon,
  EmailIcon,
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
      className="flex flex-col items-center w-[108px] h-full flex-shrink-0 overflow-y-auto"
      style={{
        padding: 'var(--space-6)',
        backgroundColor: 'var(--background-nav)',
        backdropFilter: 'blur(var(--blur-xl))',
        WebkitBackdropFilter: 'blur(var(--blur-xl))',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      {/* Logo — top of nav */}
      {NAV_LOGO.visible && (
        <a
          href={NAV_LOGO.href}
          className="flex items-center justify-center mb-4"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--background-elevated)',
          }}
        >
          {/* Gurek logo placeholder */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="var(--foreground)" strokeWidth="1.5"/>
            <circle cx="12" cy="10" r="3.5" stroke="var(--foreground)" strokeWidth="1.5"/>
            <path d="M5 19.5C5 16 8 14 12 14C16 14 19 16 19 19.5" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>
      )}

      {/* Nav items */}
      <div className="flex flex-col items-center w-full flex-1" style={{ gap: 'var(--space-1)' }}>
        {allEntries.map((entry, index) => {
          if (isSeparator(entry)) {
            return (
              <div
                key={`sep-${index}`}
                className="w-6 my-2"
                style={{
                  borderTop: '1px solid var(--border-subtle)',
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
            <a
              key={item.id}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="relative flex items-center justify-center transition-colors"
              style={{
                width: '44px',
                height: '44px',
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
              {Icon && <Icon size={20} />}

              {/* Tooltip on hover — Figma shows label text appearing on hover */}
              {isHovered && !isActive && (
                <span
                  className="absolute left-[52px] whitespace-nowrap z-10 pointer-events-none"
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
          );
        })}
      </div>
    </nav>
  );
}
