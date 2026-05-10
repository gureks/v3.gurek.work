export interface ProjectStat {
  value: string;
  label: string;
  isPositive?: boolean;
  isNegative?: boolean;
}

export interface ProjectEntry {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  coverImage?: string;
  stats?: ProjectStat[];
}

export const PROJECT_REGISTRY: ProjectEntry[] = [
  { 
    id: 'et-epaper', 
    slug: 'et-epaper', 
    title: 'Improving the Reading Experience for India’s Largest Daily', 
    shortDescription: 'Making ePapers Actually Readable for print-first readers in a digital world',
    coverImage: '/9e03e2b4a665a12c8b87ff25eb44c28f326f423e.png',
    stats: [
      { value: '+37% ↑', label: 'Retention\nRate', isPositive: true },
      { value: '- 40% ↓', label: 'Reported\nFriction', isNegative: true },
      { value: '+21% ↑', label: 'Subscription\nConversion', isPositive: true },
    ]
  },
  { 
    id: 'growfast', 
    slug: 'growfast', 
    title: 'GrowFast: From an E-learning Experiment to rebuilding around Trust', 
    shortDescription: 'We built, broke, & scaled to 20Cr+ ARR experimenting and rebuilding around trust',
    coverImage: '/e08a0b9d8698eb32ec06cfdd4733323a216e4208.png',
    stats: [
      { value: '₹20 Cr+', label: 'ARR\nGenerated', isPositive: true },
      { value: '4.7/5', label: 'NPS\nmaintained', isPositive: true },
      { value: '+32% ↑', label: 'Conversion\nOptimized', isPositive: true },
    ]
  },
  { 
    id: 'times-intel', 
    slug: 'times-intel', 
    title: 'Times Intelligence Layer - Agentic RAG Engine layer over 20yrs of repository', 
    shortDescription: 'Transformed 15 years of editorial data into a scalable GenAI engine',
    coverImage: '/6cccde0eb236be7e617b47a651110f4c58f5e8e5.png',
    stats: [
      { value: '2.43M+', label: 'Articles\nIndexed', isPositive: true },
      { value: '<5s', label: 'P95\nLatency', isPositive: true },
      { value: '88%', label: 'Query\nAccuracy', isPositive: true },
    ]
  },
  { 
    id: 'et-markets-ds', 
    slug: 'et-markets-ds', 
    title: 'Better Developer Handoffs with \n Design System for ET Markets', 
    shortDescription: 'Created and maintained design system for stock research tools, across all platforms',
    coverImage: '/cf8307e5f34d566ee243db3b515015da70f892a1.png',
    stats: [
      { value: '₹20 Cr+', label: 'Handoff\nPeriod', isPositive: true },
      { value: '+40% ↑', label: 'Development\nTurnaround', isPositive: true },
      { value: '+27% ↑', label: 'Usability\nNSM Improved', isPositive: true },
    ]
  },
  { 
    id: 'design-agency', 
    slug: 'design-agency', 
    title: 'Bootstrapped a multi-disciplinary Design Agency during Covid', 
    shortDescription: 'Delivered projects for Ernst & Young, GlaxoSmithKline, Bare Anatomy, and more',
    coverImage: '/c2e65175b9331d1aadd3e1321c5c118d07d18b44.png',
    stats: [
      { value: '20L+', label: 'Revenue\nGenerated', isPositive: true },
      { value: '8+', label: 'New\nClients', isPositive: true },
      { value: '12+', label: 'Projects\nDelivered', isPositive: true },
    ]
  },
  { 
    id: 'ai-avatar', 
    slug: 'ai-avatar', 
    title: 'Trusted Stories, Humanized. \nAutomated anchor-led videos.', 
    shortDescription: 'AI avatar product delivering anchor-led explainers, product reviews, social content',
    coverImage: '/cf839f1ab5c6f45d6191f2e94dc5396c12137d0a.png',
    stats: [
      { value: '+80% ↑', label: 'Turnaround\nTime', isPositive: true },
      { value: '- 60% ↓', label: 'Cost\nSavings', isNegative: true },
      { value: '32+', label: 'Anchors\nDigitized', isPositive: true },
    ]
  },
];

export const PROJECT_SLUGS = PROJECT_REGISTRY.map(p => p.slug);
