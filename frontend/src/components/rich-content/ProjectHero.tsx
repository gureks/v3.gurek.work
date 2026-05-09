import React from 'react';

interface ProjectHeroProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  imageUrl: string;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="flex flex-col gap-[var(--space-4)] w-full">
      <div className="flex flex-col gap-[var(--space-1)] w-full">
        <h2 className="text-[20px] leading-[24px] tracking-[-0.7px] font-normal m-0" style={{ color: 'var(--foreground)' }}>
          {title} <span style={{ color: '#8c8c8c' }}>{subtitle}</span>
        </h2>
      </div>
      <div className="w-full relative overflow-hidden" style={{ aspectRatio: '30/20', borderRadius: 'var(--radius-sm)' }}>
        <img src={imageUrl} alt="Project Hero" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ProjectHero;
