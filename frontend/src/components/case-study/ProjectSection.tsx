import React from 'react';
import { GurekAvatarIcon } from '../../assets/custom-icons';

interface ProjectSectionProps {
  role: 'system' | 'user';
  children: React.ReactNode;
  noPadding?: boolean;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({ role, children, noPadding = false }) => {
  const isUser = role === 'user';

  return (
    <div
      className={`flex items-start w-full ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      style={{
        gap: 'var(--space-4)',
        paddingLeft: isUser ? 'var(--space-20)' : '0',
        paddingRight: isUser ? '0' : 'var(--space-20)',
      }}
    >
      {/* Avatar */}
      <div
        className="flex-shrink-0 flex items-center justify-center overflow-hidden"
        style={{
          width: 'var(--avatar-md)',
          height: 'var(--avatar-md)',
          borderRadius: isUser ? 'var(--radius-full)' : 'var(--radius-md)',
          backgroundColor: isUser ? 'var(--accent-foreground)' : 'transparent',
          color: isUser ? 'var(--accent)' : 'var(--foreground)',
          fontSize: '11.8px',
          fontWeight: 500,
          lineHeight: '16px',
        }}
      >
        {isUser ? 'AB' : (
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-white text-black shadow-sm relative overflow-hidden">
            <GurekAvatarIcon size={32} />
          </div>
        )}
      </div>

      {/* Bubble Container */}
      <div className="flex flex-col flex-1 min-w-0" style={{ gap: 'var(--space-2)' }}>
        <div
          className="text-foreground flex flex-col"
          style={{
            padding: noPadding ? '0' : 'var(--space-4)',
            borderRadius: isUser
              ? 'var(--radius-lg) var(--radius-lg) 0 var(--radius-lg)'
              : '0 var(--radius-lg) var(--radius-lg) var(--radius-lg)',
            backgroundColor: isUser
              ? 'var(--accent)'
              : 'var(--background-tooltip)',
            border: isUser ? 'none' : '1px solid var(--border)',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            width: isUser ? 'fit-content' : '100%',
            marginLeft: isUser ? 'auto' : '0',
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            overflow: 'hidden'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
