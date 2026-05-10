import { useEffect, useState } from 'react';
import { Carousel } from './rich-content/Carousel';

// Stub legacy components (referenced in this file but not yet migrated)
const HeroBlock = (_props: { slug: string; title: string; cover: string }) => null;
const StatCardRow = (_props: { stats: { label: string; value: string }[] }) => null;
const TagRow = (_props: { tags: string[]; stack: string[] }) => null;
const MarkdownTable = (_props: { markdown: string }) => null;
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlockDef {
  type: 'hero' | 'stat_card_row' | 'tag_row' | 'carousel' | 'markdown' | 'table';
  images?: { src: string; caption?: string }[];
  markdown?: string;
}

interface ProjectData {
  slug: string;
  content: string;               // raw markdown (with frontmatter)
  meta: {
    slug: string;
    title: string;
    tags: string[];
    stack: string[];
    stats: { label: string; value: string }[];
    cover: string;
  };
}

interface CaseStudyBlockProps {
  slug: string;
  apiBase: string;
}

// Parse YAML frontmatter from markdown string
function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };
  try {
    const yamlStr = match[1];
    const body = match[2] ?? '';
    const blocks: BlockDef[] = [];
    const lines = yamlStr.split('\n');
    let current: Partial<BlockDef> | null = null;
    for (const line of lines) {
      const typeMatch = line.match(/^\s*-\s+type:\s+(\w+)/);
      if (typeMatch) {
        if (current) blocks.push(current as BlockDef);
        current = { type: typeMatch[1] as BlockDef['type'] };
      }
      if (current && line.match(/^\s+images:\s*\[\]/)) {
        current.images = [];
      }
    }
    if (current) blocks.push(current as BlockDef);
    return { frontmatter: { blocks }, body };
  } catch {
    return { frontmatter: {}, body: raw };
  }
}

export const CaseStudyBlock = ({ slug, apiBase }: CaseStudyBlockProps) => {
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${apiBase}/projects/${slug}/content`)
      .then(r => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((d: ProjectData) => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [slug, apiBase]);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse w-full max-w-2xl">
        <div className="h-40 rounded-xl bg-[hsl(var(--muted))]" />
        <div className="h-4 w-3/4 rounded bg-[hsl(var(--muted))]" />
        <div className="h-3 w-1/2 rounded bg-[hsl(var(--muted))]" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <p className="text-sm text-[var(--foreground-muted)] italic">
        Could not load case study: {error ?? 'Unknown error'}
      </p>
    );
  }

  const { frontmatter, body } = parseFrontmatter(data.content);
  const blocks = (frontmatter.blocks as BlockDef[]) ?? [{ type: 'hero' }, { type: 'markdown' }];

  return (
    <div className="w-full max-w-2xl space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'hero':
            return <HeroBlock key={i} slug={slug} title={data.meta.title} cover={data.meta.cover} />;
          case 'stat_card_row':
            return <StatCardRow key={i} stats={data.meta.stats} />;
          case 'tag_row':
            return <TagRow key={i} tags={data.meta.tags} stack={data.meta.stack} />;
          case 'carousel':
            return <Carousel key={i} slug={slug} images={block.images ?? []} />;
          case 'table':
            return <MarkdownTable key={i} markdown={block.markdown ?? ''} />;
          case 'markdown':
            return (
              <div key={i} className="prose prose-invert prose-sm max-w-none text-[hsl(var(--foreground))]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
