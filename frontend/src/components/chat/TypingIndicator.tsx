import { motion } from 'framer-motion';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-4">
      {/* Bot avatar */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-md text-foreground"
        style={{
          width: 'var(--avatar-md)',
          height: 'var(--avatar-md)',
          backgroundColor: 'var(--background-elevated)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M4 16.5C4 13.5 6.5 12 10 12C13.5 12 16 13.5 16 16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Bouncy dots */}
      <div
        className="flex items-center gap-[6px]"
        style={{
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--background-elevated-alt)',
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
            className="block w-[8px] h-[8px] rounded-full bg-foreground-muted"
          />
        ))}
      </div>
    </div>
  );
}
