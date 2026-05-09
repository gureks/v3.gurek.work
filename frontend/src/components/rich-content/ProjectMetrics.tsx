import React from 'react';

interface Metric {
  value: string;
  label: string;
  trend: 'positive' | 'negative' | 'neutral';
}

interface ProjectMetricsProps {
  metrics: Metric[];
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ metrics }) => {
  return (
    <div className="flex items-center justify-between px-[var(--space-6)] w-full py-[var(--space-2)]">
      {metrics.map((metric, index) => {
        const isPositive = metric.trend === 'positive';
        const isNegative = metric.trend === 'negative';
        
        let colorClass = 'text-white';
        if (isPositive) colorClass = 'text-[var(--stat-positive)]';
        if (isNegative) colorClass = 'text-[var(--brand-accent-1)]';

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-start font-normal whitespace-nowrap">
              <div className={`font-serif italic text-[24px] leading-[1.1] ${colorClass}`}>
                {metric.value}
              </div>
              <div className="text-[12px] leading-[16px] text-[var(--foreground)] mt-1">
                {metric.label}
              </div>
            </div>
            {index < metrics.length - 1 && (
              <div className="h-[44px] w-px bg-[var(--border)] mx-4 shrink-0" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProjectMetrics;
