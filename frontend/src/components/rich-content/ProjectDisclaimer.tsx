import React from 'react';

interface ProjectDisclaimerProps {
  text: React.ReactNode;
}

export const ProjectDisclaimer: React.FC<ProjectDisclaimerProps> = ({ text }) => {
  return (
    <div className="flex gap-3 items-start">
      <div className="shrink-0 size-5 text-[var(--foreground-muted)] flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-1A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM7 7h2v5H7V7zm1-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
      </div>
      <p className="text-[12px] leading-[16px] text-[var(--foreground-muted)] m-0 whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
};

export default ProjectDisclaimer;
