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
      className="flex items-end rounded-[16px] border w-full relative"
      style={{ 
        height: '118px',
        backgroundColor: 'var(--background-elevated)',
        borderColor: 'var(--border)',
        padding: '17px',
        gap: '8px',
        boxShadow: '0px 4px 6px -4px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)'
      }}
    >
      <textarea
        id="chat-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe what you want to know about Gurek or his work here..."
        disabled={disabled}
        className="flex-1 resize-none bg-transparent text-foreground focus:outline-none font-normal"
        style={{
          color: 'var(--foreground-muted)',
          fontSize: '14px',
          lineHeight: '20px',
          minHeight: '44px' // Approximate height to fit the button without wrapping too soon
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="Send Message"
        className="flex items-center justify-center transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 flex-shrink-0"
        style={{ 
          backgroundColor: 'var(--foreground)',
          color: 'var(--background)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          boxShadow: '0px 1px 2px -1px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.1)'
        }}
      >
        <SendIcon size={20} />
      </button>
    </div>
  );
}
