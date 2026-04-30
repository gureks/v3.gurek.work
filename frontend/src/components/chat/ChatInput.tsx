import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { SendIcon } from '../../assets/custom-icons';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const DEFAULT_SUGGESTIONS = [
  "What enterprise projects has he built?",
  "What are some of the metrics he has achieved?",
  "Share his Work Experience",
  "Here for prompts...",
  "What does he do after 9-5?"
];

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Handle clicks outside to close suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    setIsFocused(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setIsFocused(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Suggestions Overlay */}
      {isFocused && !value && (
        <div className="absolute flex flex-col gap-[8px] justify-center p-[16px] right-0 z-10" style={{ bottom: '100%', alignItems: 'flex-end' }}>
          {DEFAULT_SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="bg-[var(--background-tooltip)] border border-[var(--border-subtle)] text-foreground-muted hover:text-foreground transition-colors px-[16px] py-[8px] rounded-[16px] text-[14px] whitespace-nowrap shadow-[var(--shadow-md)]"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <div
        className="flex items-end gap-3 rounded-[16px] border px-4 py-4 w-full transition-colors relative z-20"
        style={{ 
          backgroundColor: 'var(--background-elevated)',
          borderColor: isFocused ? 'var(--border)' : 'var(--border-subtle)', 
          height: '118px',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <textarea
          ref={inputRef}
          id="chat-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          placeholder="Describe what you want to know about Gurek or his work here..."
          disabled={disabled}
          className="flex-1 h-full resize-none bg-transparent text-foreground placeholder-[#a1a1a1] focus:outline-none text-[14px] leading-[20px] font-normal"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          aria-label="Send Message"
          className="flex items-center justify-center rounded-[8px] bg-foreground text-background transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          style={{ width: '36px', height: '36px', flexShrink: 0 }}
        >
          <SendIcon size={16} />
        </button>
      </div>
    </div>
  );
}
