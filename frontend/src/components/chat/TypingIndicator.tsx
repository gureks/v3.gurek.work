import { motion } from 'framer-motion';
import { useChatStore } from '../../store/useChatStore';

/**
 * TypingIndicator — Figma-accurate loading indicator.
 * 
 * Matches AI message row layout: bot avatar (32x32) + gap 16px + bubble.
 * Bubble uses background-tooltip (#404040), radius/lg (16px), padding space/4 (16px).
 * 
 * When the store's retryAttempt is non-null, shows a "Retrying…" message
 * alongside the bouncing dots so the user knows the system is still working.
 */
export function TypingIndicator() {
  const retryAttempt = useChatStore((state) => state.retryAttempt);

  return (
    <div className="flex items-start" style={{ gap: 'var(--space-4)' }}>
      {/* Bot avatar — same as MessageBubble AI avatar */}
      <div
        className="flex-shrink-0 flex items-center justify-center text-foreground"
        style={{
          width: 'var(--avatar-md)',
          height: 'var(--avatar-md)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--background)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M4 16.5C4 13.5 6.5 12 10 12C13.5 12 16 13.5 16 16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Bouncy dots bubble + optional retry indicator */}
      <div className="flex flex-col" style={{ gap: '6px' }}>
        <div
          className="flex items-center"
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--background-tooltip)',
            gap: '6px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              // @ts-expect-error framer-motion v12 type declarations missing animation props from motion-dom
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
              className="block rounded-full"
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--foreground-muted)',
              }}
            />
          ))}
        </div>

        {/* Retry indicator — only visible when retrying */}
        <span
          style={{
            fontSize: '12px',
            lineHeight: '16px',
            color: 'var(--foreground-muted)',
            paddingLeft: 'var(--space-4)',
            transition: 'opacity 300ms ease',
            opacity: retryAttempt !== null ? 1 : 0,
          }}
        >
          {retryAttempt !== null ? `Retrying… (attempt ${retryAttempt}/3)` : ''}
        </span>
      </div>
    </div>
  );
}
