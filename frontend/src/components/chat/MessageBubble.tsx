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
      className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-md text-[11.8px] font-medium leading-[16px]"
        style={{
          width: 'var(--avatar-md)',
          height: 'var(--avatar-md)',
          backgroundColor: isUser ? 'var(--accent)' : 'var(--background-elevated)',
          boxShadow: isUser ? 'var(--glow-accent)' : 'none',
          color: 'var(--foreground)',
        }}
      >
        {isUser ? 'AB' : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M4 16.5C4 13.5 6.5 12 10 12C13.5 12 16 13.5 16 16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] text-[14px] leading-[20px] font-normal ${
          message.isError ? 'border border-red-500/30' : ''
        }`}
        style={{
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: isUser
            ? 'var(--background-elevated)'
            : 'var(--background-elevated-alt)',
        }}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-foreground">{message.content}</p>
        ) : (
          <div className="text-foreground">
            <MarkdownRenderer content={message.content} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
