import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="border-t border-border-subtle bg-background px-6 pb-6 pt-4"
    >
      <div
        className="flex items-end gap-3 rounded-lg border border-border bg-background-elevated px-[17px] py-[17px]"
        style={{ boxShadow: 'var(--shadow-lg)' }}
      >
        <textarea
          id="chat-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe what you want to know about Gurek or his work here..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-transparent text-foreground placeholder-foreground-muted focus:outline-none text-[14px] leading-[20px] font-normal"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          aria-label="Send Message"
          className="flex items-center justify-center rounded-sm bg-foreground text-background p-3 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          {/* Send arrow icon matching Figma */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 1.5L7 9M14.5 1.5L10 14.5L7 9M14.5 1.5L1.5 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
