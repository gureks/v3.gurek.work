export interface ProjectEntry {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
}

export const PROJECT_REGISTRY: ProjectEntry[] = [
  { id: 'et-epaper', slug: 'et-epaper', title: 'ET ePaper', shortDescription: "Improving the reading experience for India's largest daily" },
  { id: 'growfast', slug: 'growfast', title: 'GrowFast', shortDescription: 'E-learning experiment rebuilt around trust and conversion' },
  { id: 'et-markets-ds', slug: 'et-markets-ds', title: 'ET Markets Design System', shortDescription: 'Design system for stock research tools and news app' },
  { id: 'design-agency', slug: 'design-agency', title: 'Design Agency', shortDescription: 'Bootstrapped a design agency during Covid' },
  { id: 'ai-avatar', slug: 'ai-avatar', title: 'AI Avatar System', shortDescription: 'Automated anchor-led videos with AI avatar technology' },
  { id: 'times-intel', slug: 'times-intel', title: 'Times Intelligence Layer', shortDescription: 'RAG and LLM engine over 20 years of repository' },
];

export const PROJECT_SLUGS = PROJECT_REGISTRY.map(p => p.slug);
