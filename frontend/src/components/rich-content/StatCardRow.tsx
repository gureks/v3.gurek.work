import React, { useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: string;
}

interface StatCardRowProps {
  stats: Stat[];
}

const AnimatedCounter: React.FC<{ valueStr: string }> = ({ valueStr }) => {
  const [displayValue, setDisplayValue] = useState(valueStr);

  useEffect(() => {
    const match = valueStr.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setDisplayValue(valueStr);
      return;
    }

    const [, prefix, numberStr, suffix] = match;
    const targetValue = parseFloat(numberStr);
    const hasDecimal = numberStr.includes('.');
    const decimals = hasDecimal ? numberStr.split('.')[1].length : 0;

    let startTime: number | null = null;
    const duration = 1200; // 1.2s

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = targetValue * easeProgress;
      
      const formattedNum = currentVal.toFixed(decimals);
      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(valueStr);
      }
    };

    requestAnimationFrame(step);
  }, [valueStr]);

  return <span>{displayValue}</span>;
}

export const StatCardRow: React.FC<StatCardRowProps> = ({ stats }) => {
  if (!stats || stats.length === 0) {
    return (
      <div className="w-full text-xs text-[hsl(var(--foreground-muted))] italic">
        No metrics available yet
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-3 w-full">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="rounded-xl border border-[var(--border)] bg-[hsl(var(--card))] px-5 py-4 flex-1 min-w-[120px] flex flex-col justify-center"
        >
          <div className="text-2xl font-bold text-[hsl(var(--accent-brand))]">
            <AnimatedCounter valueStr={stat.value} />
          </div>
          <div className="text-xs text-[hsl(var(--foreground-muted))] mt-1 uppercase tracking-wide font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
