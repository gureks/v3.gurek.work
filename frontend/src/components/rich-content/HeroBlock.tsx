import React from 'react';

interface HeroBlockProps {
  title: string;
  subtitle?: string;
  cover?: string;
  slug: string;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ title, subtitle, cover, slug }) => {
  const coverUrl = cover && slug
    ? new URL(`../../../assets/projects/${slug}/${cover}`, import.meta.url).href
    : '';

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--card))] border border-[var(--border)]">
        {coverUrl ? (
          <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 text-center">
            <span className="text-2xl font-bold text-[var(--foreground-muted)] opacity-50">
              {title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col mt-2">
        <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">{title}</h2>
        {subtitle && (
          <p className="text-sm text-[hsl(var(--foreground-muted))] mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
