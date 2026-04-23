import { useState, KeyboardEvent } from 'react';
import { SendIcon } from '../../assets/custom-icons';

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
      className="flex items-end gap-3 rounded-[16px] border bg-[#262626] px-4 py-4 w-full"
      style={{ 
        borderColor: 'var(--border-subtle)', 
        height: '118px',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      <textarea
        id="chat-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe what you want to know about Gurek or his work here..."
        disabled={disabled}
        className="flex-1 h-full resize-none bg-transparent text-foreground placeholder-[#a1a1a1] focus:outline-none text-[14px] leading-[20px] font-normal"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="Send Message"
        className="flex items-center justify-center rounded-[8px] bg-white text-black transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
        style={{ width: '36px', height: '36px', flexShrink: 0 }}
      >
        <SendIcon size={16} />
      </button>
    </div>
  );
}
