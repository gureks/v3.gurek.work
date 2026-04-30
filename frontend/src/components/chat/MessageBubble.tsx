import { motion } from 'framer-motion';
import { MarkdownRenderer } from './MarkdownRenderer';
import type { ChatMessage } from '../../store/useChatStore';

interface MessageBubbleProps {
  message: ChatMessage;
  onSuggestionClick?: (suggestion: string) => void;
}

/**
 * MessageBubble — Figma-accurate chat message row.
 * 
 * Layout from Figma (node 214:14045, 214:14040):
 * - Message row: avatar (32x32) + gap (16px) + bubble container
 * - User bubble: bg = semantic/background-elevated (#262626), radius/lg (16px), padding space/4 (16px)
 * - AI bubble:   bg = semantic/background-tooltip (#404040), radius/lg (16px), padding space/4 (16px)
 * - Avatar: 32x32, bot = bg transparent on page bg, user = accent (#006eff) with glow
 * - User row: avatar on the RIGHT side (flex-row-reverse)
 * - AI row: avatar on the LEFT side (flex-row)
 * - Gap between avatar and bubble: 16px (derived from Figma x=48 - avatar width 32 = 16px gap)
 */
export function MessageBubble({ message, onSuggestionClick }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      // @ts-expect-error framer-motion v12 type declarations missing animation props from motion-dom
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      style={{ gap: 'var(--space-4)' }}
    >
      {/* Avatar — 32x32 per Figma */}
      <div
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: 'var(--avatar-md)',
          height: 'var(--avatar-md)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: isUser ? 'var(--accent)' : 'var(--background)',
          boxShadow: isUser ? 'var(--glow-accent)' : 'none',
          color: 'var(--foreground)',
          fontSize: isUser ? '11.8px' : 'inherit',
          fontWeight: 500,
          lineHeight: '16px',
        }}
      >
        {isUser ? 'AB' : (
          /* Bot avatar — Gurek logo placeholder (simple icon on page bg) */
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M4 16.5C4 13.5 6.5 12 10 12C13.5 12 16 13.5 16 16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        )}
      </div>

      {/* Bubble Container */}
      <div className="flex flex-col gap-2" style={{ maxWidth: '606px' }}>
        {/* Bubble — Figma: padding space/4 (16px), radius/lg (16px) */}
        <div
          className={`text-foreground ${message.isError ? 'border border-red-500/30' : ''}`}
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: isUser
              ? 'var(--background-elevated)'   /* Figma: semantic/background-elevated #262626 */
              : 'var(--background-tooltip)',     /* Figma: semantic/background-tooltip #404040 */
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            width: 'fit-content',
            marginLeft: isUser ? 'auto' : '0'
          }}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
          {message.component && (
            <div className="mt-4">
              {message.component}
            </div>
          )}
        </div>
        
      </div>
    </motion.div>
  );
}
