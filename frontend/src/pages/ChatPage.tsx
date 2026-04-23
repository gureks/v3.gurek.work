import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageBubble } from '../components/chat/MessageBubble';
import { TypingIndicator } from '../components/chat/TypingIndicator';

export function ChatPage() {
  const { messages, isLoading, sendMessage } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div
          className="mx-auto flex flex-col"
          style={{
            maxWidth: 'var(--content-max-width)',
            gap: 'var(--space-6)',
          }}
        >
          {messages.length === 0 && !isLoading && (
            <div className="flex-1 flex items-center justify-center pt-40">
              <div className="text-center">
                <h2 className="text-[20px] font-semibold text-foreground mb-2 leading-[28px]">
                  No messages yet
                </h2>
                <p className="text-foreground-muted text-[14px] leading-[20px]">
                  Say hello to start the conversation.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isLoading && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Area (anchored to bottom) */}
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--content-max-width)' }}>
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
