import { motion } from 'framer-motion';
import { MarkdownRenderer } from './MarkdownRenderer';
import type { ChatMessage } from '../../store/useChatStore';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      // @ts-expect-error framer-motion v12 type declarations missing animation props from motion-dom
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex items-start w-full ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      style={{ gap: 'var(--space-4)' }}
    >
      {/* Avatar — 32x32 per Figma */}
      <div
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: isUser ? 'var(--radius-md)' : '8px', // Figma: user is radius/md (10px)
          backgroundColor: isUser ? 'var(--accent)' : 'transparent',
          boxShadow: isUser ? '0px 0px 15px -2px #006eff' : 'none',
          color: 'var(--foreground)',
          fontSize: isUser ? '11.8px' : 'inherit',
          fontWeight: 500,
          lineHeight: '16px',
        }}
      >
        {isUser ? 'AB' : (
          /* Bot avatar — Gurek logo placeholder (simple icon on page bg) */
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
            <path d="M10 24C10 18 14 16 16 16C18 16 22 18 22 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )}
      </div>

      {/* Bubble */}
      <div
        className={`text-foreground flex-1 flex flex-col items-start ${message.isError ? 'border border-red-500/30' : ''}`}
        style={{
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: isUser
            ? 'var(--background-elevated)'   /* Figma: semantic/background-elevated #262626 */
            : 'var(--background-tooltip)',     /* Figma: semantic/background-tooltip #404040 */
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '20px',
        }}
      >
        <div className="w-full text-left">
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
