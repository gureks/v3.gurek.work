import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageBubble } from '../components/chat/MessageBubble';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { NavSidebar } from '../components/layout/NavSidebar';
import { Header } from '../components/layout/Header';

export function ChatPage() {
  const { messages, isLoading, sendMessage } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden" style={{ padding: '24px', gap: '24px' }}>
      {/* Sidebar Navigation */}
      <NavSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 relative h-full">
        {/* Header */}
        <Header />

        {/* Chat Area Container */}
        <main className="flex-1 overflow-y-auto flex flex-col items-center pb-[130px]">
          {messages.length === 0 && !isLoading ? (
            /* Empty State */
            <div className="flex flex-col flex-1 text-left justify-end w-full pb-[40px]" style={{ maxWidth: '654px' }}>
              <div className="flex items-start gap-4 w-full">
                {/* Bot Avatar */}
                <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--background)' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4 16.5C4 13.5 6.5 12 10 12C13.5 12 16 13.5 16 16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                {/* Intro Message */}
                <div className="flex flex-col text-left">
                  <h1 className="text-foreground font-medium mb-2" style={{ fontSize: '18px' }}>Hi, I'm Gurek.</h1>
                  <p className="text-foreground-muted" style={{ fontSize: '14px', lineHeight: '1.5' }}>Let's start by knowing each other!<br />What's your name and profession?</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full" style={{ maxWidth: '654px', gap: 'var(--space-6)' }}>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>
          )}
        </main>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center bg-background/80 pt-6" style={{ backdropFilter: 'blur(20px)' }}>
          <div className="w-full" style={{ maxWidth: '702px' }}>
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
