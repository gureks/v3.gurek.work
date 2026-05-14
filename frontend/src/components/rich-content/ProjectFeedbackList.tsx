import React from 'react';

export interface FeedbackItem {
  label: string;
  subtitle?: string;
  type: 'critical' | 'warning' | 'neutral';
}

interface ProjectFeedbackListProps {
  items: FeedbackItem[];
}

export const ProjectFeedbackList: React.FC<ProjectFeedbackListProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        let borderColor = 'var(--border)';
        if (item.type === 'critical') borderColor = '#ff4a4a';
        if (item.type === 'warning') borderColor = '#ff9e4a';

        return (
          <div key={index} className="border-l-2 pl-2 text-[14px]" style={{ borderColor }}>
            <p className="m-0 font-bold text-[var(--foreground)]">{item.label}</p>
            {item.subtitle && (
              <p className="m-0 text-[var(--foreground-muted)]">{item.subtitle}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProjectFeedbackList;
