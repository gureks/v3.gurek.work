import { useState, KeyboardEvent, useRef, useCallback } from 'react';
import { SendIcon } from '../../assets/custom-icons';
import { sanitizeUserInput } from '../../utils/security';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    // Sanitize before sending — strips XSS attempts
    const safe = sanitizeUserInput(trimmed);
    if (!safe) return;
    onSend(safe);
    setValue('');
    setIsFocused(false);
    // Auto-resize reset
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-grow textarea up to 200px
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[32px] md:pb-[40px] relative size-full w-full">
      {/* Input Box */}
      <div
        className="flex flex-col items-start p-[14px] md:p-[17px] w-full transition-colors relative z-[1] rounded-[16px] border border-solid shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.1)] overflow-clip"
        style={{ 
          backgroundColor: 'var(--background-elevated, #262626)',
          borderColor: isFocused ? 'var(--border-input, #404040)' : 'var(--border, #404040)', 
        }}
      >
        <div className="flex w-full gap-[8px] items-start justify-center relative bg-clip-padding border-0 border-transparent border-solid">
          <div className="flex flex-col items-start relative shrink-0 w-full flex-[1_0_0] min-w-px">
            <textarea
              ref={inputRef}
              id="chat-input"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe what you want to know about Gurek or his work here..."
              disabled={disabled}
              rows={1}
              aria-label="Chat message input"
              aria-multiline="true"
              className="w-full resize-none bg-transparent text-[color:var(--foreground)] placeholder-[color:var(--foreground-muted,#a1a1a1)] focus:outline-none leading-[20px] font-normal font-['Inter:Regular',sans-serif]"
              style={{ minHeight: '44px', maxHeight: '200px', overflow: 'auto', fontSize: '16px' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            className="flex items-center justify-center p-[12px] rounded-[8px] bg-[var(--foreground,white)] text-[var(--background,black)] shrink-0 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]"
            style={{ width: '44px', height: '44px', minWidth: '44px' }}
          >
            <SendIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
