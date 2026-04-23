import React from 'react';

interface ProjectCardProps {
  slug: string;
  title: string;
  tags: string[];
  cover: string;          // filename e.g. "cover.png" — empty string = no image
  statCount: number;      // number of stats (for a "N metrics" badge)
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  slug,
  title,
  tags,
  cover,
  statCount,
  onClick
}) => {
  const coverUrl = cover
    ? new URL(`../assets/projects/${slug}/${cover}`, import.meta.url).href
    : '';

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-xl overflow-hidden border border-[var(--border)] bg-[hsl(var(--card))] transition-all duration-300 hover:border-[hsl(var(--accent-brand))] hover:shadow-lg w-full h-full flex flex-col`}
    >
      <div className="relative aspect-video w-full bg-[hsl(var(--muted))] flex-shrink-0">
        {cover ? (
          <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full animate-pulse border-2 border-dashed border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 pb-3 overflow-hidden">
        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mt-2 px-3 line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-wrap gap-1 px-3 mt-2">
          {tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] bg-[hsl(var(--muted))] text-[hsl(var(--foreground-muted))] px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-[10px] bg-[hsl(var(--muted))] text-[hsl(var(--foreground-muted))] px-2 py-0.5 rounded-full border border-[var(--border)]">
              +{tags.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-auto pt-3 px-3">
          {statCount > 0 && (
            <span className="text-[10px] uppercase font-medium tracking-wider text-[hsl(var(--foreground-muted))] border border-[var(--border)] px-2 py-1 rounded-[4px] inline-block">
              {statCount} metrics
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
