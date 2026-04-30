import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageBubble } from '../components/chat/MessageBubble';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { Header } from '../components/layout/Header';

export function ChatPage() {
  const { sessions, isLoading, sendMessage } = useChatStore();
  const location = useLocation();
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  const pathname = location.pathname;
  const messages = sessions[pathname] || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = (content: string) => {
    sendMessage(content, pathname, navigate);
  };

  const lastAssistantMessage = [...messages].reverse().find(msg => msg.role === 'assistant');
  const activeSuggestions = lastAssistantMessage?.suggestions;

  const isTemplatedPage = pathname === '/projects' || pathname === '/about';

  return (
    <div className="flex flex-col flex-1 relative h-full">
      {/* Header */}
      <Header />

      {/* Chat Area Container */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center pb-[130px]">
        {messages.length === 0 && !isLoading ? (
          /* Empty State matching System Chat Bubble */
          <div className="flex flex-col flex-1 text-left justify-end w-full pb-[40px] items-center">
            {isTemplatedPage && (
              <div className="w-full text-center text-foreground-muted mb-8 italic">
                Rendering Inline Templated Page ({pathname})...
              </div>
            )}
            <div className="flex items-start gap-4 w-full" style={{ maxWidth: '654px' }}>
              {/* Bot Avatar */}
              <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'transparent' }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 24C10 18 14 16 16 16C18 16 22 18 22 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              {/* Intro Message */}
              <div
                className="flex flex-col flex-1 text-left text-foreground"
                style={{
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--background-tooltip)'
                }}
              >
                <p className="font-normal whitespace-pre-wrap" style={{ fontSize: '14px', lineHeight: '20px' }}>Hi, I'm Gurek.

Let's start by knowing each other!
What's your name and profession?</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full" style={{ maxWidth: '654px', gap: 'var(--space-6)' }}>
            {isTemplatedPage && (
              <div className="w-full text-center text-foreground-muted italic bg-background-elevated-alt p-4 rounded-lg my-4 border border-border-subtle">
                [Templated Component Rendered Here]
              </div>
            )}
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} onSuggestionClick={handleSend} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center bg-background/80 pt-6" style={{ backdropFilter: 'blur(20px)' }}>
        <div className="w-full" style={{ maxWidth: '702px' }}>
          <ChatInput onSend={handleSend} disabled={isLoading} suggestions={activeSuggestions} />
        </div>
      </div>
    </div>
  );
}
