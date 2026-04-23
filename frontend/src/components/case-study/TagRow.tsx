import React from 'react';

interface TagRowProps {
  tags?: string[];
  stack?: string[];
  label?: string;
}

export const TagRow: React.FC<TagRowProps> = ({ tags = [], stack = [] }) => {
  if (tags.length === 0 && stack.length === 0) {
    return (
      <div className="w-full text-xs text-[hsl(var(--foreground-muted))] italic">
        No tags
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {stack.map((item, i) => (
        <span
          key={`stack-${i}`}
          className="bg-[hsl(var(--accent-brand))]/10 text-[hsl(var(--accent-brand))] border border-[hsl(var(--accent-brand))]/20 text-xs px-2.5 py-1 rounded-full font-medium"
        >
          {item}
        </span>
      ))}
      
      {tags.map((item, i) => (
        <span
          key={`tag-${i}`}
          className="bg-[hsl(var(--muted))] text-[hsl(var(--foreground-muted))] text-xs px-2.5 py-1 rounded-full font-medium border border-[var(--border)]"
        >
          {item}
        </span>
      ))}
    </div>
  );
};
