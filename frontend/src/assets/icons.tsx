/**
 * Icon Manifest
 * ─────────────────────────────────────────
 * Maps nav item IDs and header actions to our custom Figma SVG icons.
 * The Gurek logo uses a custom SVG asset.
 * Utility icons like Menu and Close fallback to Lucide.
 */

import React from 'react';
import { Menu, X } from 'lucide-react';
import {
  HomeIcon,
  ProjectsIcon,
  ResumeIcon,
  BuildsIcon,
  PromptsIcon,
  PlaygroundIcon,
  FpvIcon,
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
  EmailIcon,
  SearchIcon,
  NightmodeIcon,
  ShareIcon,
  PhoneIcon,
  CaretdownIcon,
  SendIcon,
} from './custom-icons';

type IconType = React.FC<{ size?: number | string; className?: string }>;

// ─── Nav Item Icons (keyed by nav.config.ts IDs) ─── //
export const NavIcons: Record<string, IconType> = {
  home: HomeIcon as IconType,
  projects: ProjectsIcon as IconType,
  resume: ResumeIcon as IconType,
  builds: BuildsIcon as IconType,
  prompts: PromptsIcon as IconType,
  playground: PlaygroundIcon as IconType,
  fpv: FpvIcon as IconType,
  instagram: InstagramIcon as IconType,
  linkedin: LinkedinIcon as IconType,
  github: GithubIcon as IconType,
  email: EmailIcon as IconType,
};

// ─── Header Action Icons ─── //
export const HeaderIcons = {
  search: SearchIcon as IconType,
  theme: NightmodeIcon as IconType,
  share: ShareIcon as IconType,
  phone: PhoneIcon as IconType,
  caretDown: CaretdownIcon as IconType,
} as const;

// ─── Utility Icons ─── //
export const UtilIcons = {
  send: SendIcon as IconType,
  menu: Menu as IconType,
  close: X as IconType,
} as const;

// ─── Gurek Logo (custom SVG) ─── //
export const GUREK_LOGO_SRC = '/src/assets/nav/c71d870637e3f15c0d2909aab439103ef0125695.svg';
