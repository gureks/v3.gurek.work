/**
 * Navigation Configuration
 * ─────────────────────────────────────────
 * Control sidebar navigation visibility, labels, and hyperlinks here.
 * No code changes needed — just edit this file to:
 *   - Toggle visibility with `visible: false`
 *   - Change the destination with `href`
 *   - Mark as `external: true` to open in a new tab
 *   - Add `disabled: true` to show item but block interaction (grays it out)
 */

export type NavItemConfig = {
  id: string;
  label: string;
  /** Route href or external URL */
  href: string;
  /** Open in new tab */
  external?: boolean;
  /** Show/hide in sidebar */
  visible: boolean;
  /** Gray out and prevent click */
  disabled?: boolean;
  /** Coming soon badge */
  comingSoon?: boolean;
};

export type NavSeparator = {
  type: 'separator';
};

export type NavEntry = NavItemConfig | NavSeparator;

const isSeparator = (entry: NavEntry): entry is NavSeparator =>
  (entry as NavSeparator).type === 'separator';

export { isSeparator };

// ─── Logo ────────────────────────────────
export const NAV_LOGO: Pick<NavItemConfig, 'href' | 'visible'> = {
  href: '/',
  visible: true,
};

// ─── Primary Navigation ──────────────────
export const NAV_PRIMARY: NavEntry[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    visible: true,
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    visible: true,
  },
  {
    id: 'resume',
    label: 'Resume',
    href: '/about',
    visible: true,
  },
  { type: 'separator' },
  {
    id: 'builds',
    label: 'Builds',
    href: '/builds',
    visible: false,
    comingSoon: true,
  },
  {
    id: 'prompts',
    label: 'Prompts',
    href: '/prompts',
    visible: true,
    comingSoon: true,
  },
  {
    id: 'playground',
    label: 'Playground',
    href: '/playground',
    visible: true,
    comingSoon: true,
  },
  {
    id: 'fpv',
    label: 'FPV',
    href: '/fpv',
    visible: true,
    comingSoon: true,
  },
];

// ─── Social / Contact Links ───────────────
export const NAV_SOCIAL: NavEntry[] = [
  { type: 'separator' },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/gureksingh',
    external: true,
    visible: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/gureks',
    external: true,
    visible: true,
  },
  {
    id: 'github',
    label: 'Github',
    href: 'https://github.com/gureks',
    external: true,
    visible: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:gurek15033@iiitd.ac.in',
    external: true,
    visible: true,
  },
];

// ─── Header CTA ──────────────────────────
export const HEADER_CTA = {
  label: 'Get in Touch',
  href: 'mailto:gurek15033@iiitd.ac.in',
  visible: true,
};

// ─── Suggestion Chips (Chat Input) ────────
export const SUGGESTION_CHIPS: string[] = [
  "Projects he's built",
  "Share his Work Ex",
  "Here for prompts...",
  "What's after 9-5?",
  "Check his resume",
];
