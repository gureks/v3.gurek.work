import { motion } from 'framer-motion';
import { MarkdownRenderer } from './MarkdownRenderer';
import { RichContentContainer } from '../rich-content/RichContentContainer';
import { GurekAvatarIcon } from '@/assets/custom-icons';
import type { ChatMessage } from '../../store/useChatStore';

interface MessageBubbleProps {
  message?: ChatMessage;
  role?: 'system' | 'user';
  children?: React.ReactNode;
  noPadding?: boolean;
  onSuggestionClick?: (suggestion: string) => void;
  isLastAssistantMessage?: boolean;
}

/**
 * MessageBubble — Figma-accurate chat message row.
 *
 * Verified against Figma node 190:6225 (ChatBubble component).
 *
 * User bubble (state=User, type=Default):
 *   - Row: flex-row-reverse, gap=16px (space/4), pl=80px (space/20)
 *   - Bubble: bg=primitive/accent (#006eff), rounded-tl-lg + rounded-tr-lg + rounded-bl-lg (NO br)
 *   - Avatar: 32x32 pill (radius/full), bg=accent-foreground (white), text=accent (#006eff)
 *   - Font: Inter Regular 14/20
 *
 * System bubble (state=System, type=Default):
 *   - Row: flex-row, gap=16px (space/4), pr=80px (space/20)
 *   - Avatar: 32x32 gurek.svg
 *   - Bubble: bg=background-tooltip (#404040), border=border (#404040),
 *     rounded-bl-lg + rounded-tr-lg + rounded-br-lg (NO tl)
 *   - Font: Inter Regular 14/20
 *
 * Suggestion Pills (node 320:13229):
 *   - Container: flex-wrap, gap=8px, pl=48px (space/12)
 *   - Each pill: bg=background-input-80 (rgba(38,38,38,0.8)), border=border-input (#404040),
 *     radius=16px, px=16px, py=4px, backdrop-blur(8px), font 12px/16px Inter Regular
 */
export function MessageBubble({ 
  message, 
  role, 
  children, 
  noPadding, 
  onSuggestionClick, 
  isLastAssistantMessage 
}: MessageBubbleProps) {
  const isUser = role === 'user' || message?.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col"
      style={{ gap: 'var(--space-2)' }}
    >
      {/* Message row */}
      <div
        className={`flex items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
        style={{
          gap: 'var(--space-4)',
          paddingLeft: isUser ? 'var(--space-8)' : '0',
          paddingRight: isUser ? '0' : 'var(--space-8)',
        }}
      >
        {/* Avatar — 32x32 per Figma */}
        <div
          className="flex-shrink-0 flex items-center justify-center overflow-hidden"
          style={{
            width: 'var(--avatar-md)',
            height: 'var(--avatar-md)',
            borderRadius: isUser ? 'var(--radius-full)' : 'var(--radius-md)',
            backgroundColor: isUser ? 'var(--accent-foreground)' : 'var(--background)',
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
          {/* Bubble — Figma specs */}
          {(message?.content || children) && (
            <div
              className={`text-foreground ${message?.isError ? 'border border-red-500/30' : ''}`}
              style={{
                padding: noPadding ? '0' : 'var(--space-4)',
                borderRadius: isUser
                  ? 'var(--radius-lg) var(--radius-lg) 0 var(--radius-lg)'   /* tl tr br=0 bl */
                  : '0 var(--radius-lg) var(--radius-lg) var(--radius-lg)',   /* tl=0 tr br bl */
                backgroundColor: isUser
                  ? 'var(--accent)'                  /* Figma: primitive/accent #006eff */
                  : 'var(--background-tooltip)',      /* Figma: semantic/background-tooltip #404040 */
                border: isUser ? 'none' : '1px solid var(--border)',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                width: children && !isUser ? '100%' : 'fit-content',
                marginLeft: isUser ? 'auto' : '0',
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                overflow: 'hidden'
              }}
            >
              {children ? (
                children
              ) : isUser ? (
                <p className="whitespace-pre-wrap m-0">{message?.content}</p>
              ) : (
                message?.content && <MarkdownRenderer content={message.content} />
              )}
            </div>
          )}
          
          {(message?.component || message?.richContentType) && (
            <div className="w-full flex flex-col mt-2">
              {message?.component || (message?.richContentType && <RichContentContainer type={message.richContentType as Parameters<typeof RichContentContainer>[0]['type']} />)}
            </div>
          )}
        </div>
      </div>

      {/* Suggestion Pills — touch-friendly, wrappable */}
      {isLastAssistantMessage && message?.suggestions && message.suggestions.length > 0 && (
        <div
          className="flex flex-wrap items-start"
          style={{
            gap: 'var(--space-2)',
            paddingLeft: 'var(--space-12)',
          }}
        >
          {message.suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick?.(suggestion)}
              className="flex items-center justify-center shrink-0 transition-opacity hover:opacity-80 active:opacity-60"
              style={{
                backgroundColor: 'var(--background-input-80)',
                border: '1px solid var(--border-input)',
                borderRadius: '16px',
                paddingLeft: '14px',
                paddingRight: '14px',
                paddingTop: '6px',
                paddingBottom: '6px',
                minHeight: '32px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: '16px',
                color: 'var(--foreground)',
                cursor: 'pointer',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
