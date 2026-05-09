import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';
import { useAppStore } from '../store/useAppStore';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageBubble } from '../components/chat/MessageBubble';
import { RichContentContainer } from '../components/chat/RichContentContainer';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { Header } from '../components/layout/Header';

export interface ChatSequenceMessage {
  role: 'user' | 'assistant';
  content: string;
  component?: React.ReactNode;
  richContentType?: string;
  suggestions?: string[];
  delayMs?: number;
}

export interface ChatPageProps {
  templatedComponent?: React.ReactNode;
  introMessage?: React.ReactNode;
  initialSequence?: ChatSequenceMessage[];
}

export function ChatPage({ templatedComponent, introMessage, initialSequence }: ChatPageProps = {}) {
  const { sessions, isLoading, sendMessage } = useChatStore();
  const location = useLocation();
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  const pathname = location.pathname;
  const messages = sessions[pathname] || [];
  const sequenceStarted = useRef(false);

  const locationState = location.state as { suggestions?: string[]; toast?: string } | null;

  // Consume toast from redirect navigation state
  useEffect(() => {
    if (locationState?.toast) {
      useAppStore.getState().showToast(locationState.toast);
      // Clear the state so it doesn't re-trigger
      window.history.replaceState({}, document.title);
    }
  }, [location.key]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Home page default sequence
  const defaultHomeSequence: ChatSequenceMessage[] = [
    { role: 'assistant', content: "Hola! I'm Gurek - Product Generalist, UX Systems Designer and an AI-Native Builder.", delayMs: 800 },
    { role: 'assistant', content: "Versatile product thinker with 5+ years of experience across Product Strategy, AI-led Feature Development, UX Design, and qualitative product-led experience improvements.", delayMs: 500 },
    { role: 'assistant', content: "Currently focused on AI-driven personalised content systems, Vector DBs, RAGs, graph knowledge bases, and stock market UX.", delayMs: 800 },
    { role: 'user', content: "What are the tools you work with?", delayMs: 600 },
    { role: 'assistant', content: "This is my toolbox:", richContentType: 'tools', delayMs: 500 },
    { role: 'assistant', content: "Using it I can be a jack of all trades!", richContentType: 'skills', delayMs: 800 },
    { role: 'user', content: "What are some of the metrics that you have achieved?", delayMs: 500 },
    { role: 'assistant', content: "Here’s a gallery of projects currently available. Just a click away to dive deeper into any of them!", richContentType: 'projects', suggestions: ["Dive deeper into Growfast", "Can you describe his role in the Times Intelligence Layer", "What was the impact of ePaper?", "Tell me more about ET Markets Design System?", "Where can I reach you?"], delayMs: 800 }
  ];

  const sequenceToRun = initialSequence || (pathname === '/' ? defaultHomeSequence : null);

  useEffect(() => {
    // Run sequence if the chat is completely empty
    if (sequenceToRun && messages.length === 0 && !isLoading && !sequenceStarted.current) {
      sequenceStarted.current = true;
      const runSequence = async () => {
        for (let i = 0; i < sequenceToRun.length; i++) {
          const msg = sequenceToRun[i];
          const delay = msg.delayMs || 800;

          if (msg.role === 'assistant') {
            useChatStore.setState({ isLoading: true });
            await new Promise(r => setTimeout(r, delay));
            useChatStore.setState({ isLoading: false });
          } else {
            await new Promise(r => setTimeout(r, delay));
          }

          useChatStore.setState(state => {
            const currentSessions = { ...state.sessions };
            const currentMessages = currentSessions[pathname] || [];
            return {
              sessions: {
                ...currentSessions,
                [pathname]: [...currentMessages, { 
                  id: crypto.randomUUID(), 
                  role: msg.role as 'user' | 'assistant', 
                  content: msg.content, 
                  component: msg.component || (msg.richContentType ? <RichContentContainer type={msg.richContentType as any} /> : undefined),
                  richContentType: msg.richContentType,
                  suggestions: msg.suggestions || [],
                  timestamp: Date.now() 
                }]
              }
            };
          });
        }
      };
      runSequence();
    }
  }, [pathname, messages.length, isLoading, sequenceToRun]);

  const handleSend = (content: string) => {
    sendMessage(content, pathname, navigate);
  };



  return (
    <div className="flex flex-col flex-1 relative h-full">
      {/* Header */}
      <Header />

      {/* Chat Area Container */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center pb-[130px]">
        {messages.length === 0 && !isLoading ? (
          /* Empty State matching System Chat Bubble */
          <div className="flex flex-col flex-1 text-left justify-end w-full pb-[40px] items-center">
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
                  borderRadius: '0 var(--radius-lg) var(--radius-lg) var(--radius-lg)',
                  backgroundColor: 'var(--background-tooltip)',
                  border: '1px solid var(--border)',
                }}
              >
                <p className="font-normal whitespace-pre-wrap" style={{ fontSize: '14px', lineHeight: '20px' }}>
                  {introMessage || `Hi, I'm Gurek.\n\nLet's start by knowing each other!\nWhat's your name and profession?`}
                </p>
              </div>
            </div>
            {templatedComponent && (
              <div className="w-full mt-4">
                {templatedComponent}
              </div>
            )}
            {isLoading && <TypingIndicator />}
          </div>
        ) : (
          <div className="flex flex-col w-full" style={{ maxWidth: '654px', gap: 'var(--space-6)' }}>
            {templatedComponent && (
              <div className="w-full my-4">
                {templatedComponent}
              </div>
            )}
            {messages.map((msg, idx) => {
              const lastAssistantIndex = messages.map(m => m.role).lastIndexOf('assistant');
              const isLastAssistant = msg.role === 'assistant' && idx === lastAssistantIndex;
              return (
                <MessageBubble 
                  key={msg.id} 
                  message={msg} 
                  onSuggestionClick={handleSend} 
                  isLastAssistantMessage={isLastAssistant} 
                />
              );
            })}
            {isLoading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center bg-background/80 pt-6" style={{ }}>
        <div className="w-full" style={{ maxWidth: '702px' }}>
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
