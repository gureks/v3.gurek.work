import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';
import { useAppStore } from '../store/useAppStore';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageBubble } from '../components/chat/MessageBubble';
import { RichContentContainer } from '../components/rich-content/RichContentContainer';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { useSEO } from '../hooks/useSEO';

/** A suggestion pill that can either send a chat message or navigate directly to a route. */
export interface SuggestionItem {
  label: string;
  /** If set, clicking this pill navigates directly to this route instead of calling the LLM. */
  redirect?: string;
}

export interface ChatSequenceMessage {
  role: 'user' | 'assistant';
  content: string;
  component?: React.ReactNode;
  richContentType?: string;
  /** Optional data forwarded to RichContentContainer (e.g. { initialCount: 3 }) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  richContentData?: any;
  suggestions?: (string | SuggestionItem)[];
  delayMs?: number;
}

export interface ChatPageProps {
  templatedComponent?: React.ReactNode;
  introMessage?: React.ReactNode;
  initialSequence?: ChatSequenceMessage[];
}

export function ChatPage({ templatedComponent, initialSequence }: ChatPageProps = {}) {
  useSEO({
    title: 'Chat — Gurek Singh',
    description: 'Chat with Gurek\'s AI Twin — ask about his work, projects, skills, and experience.',
    canonicalPath: '/',
  });
  const { sessions, isLoading, sendMessage } = useChatStore();
  const location = useLocation();
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

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
    if (isLoading) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (lastMessageRef.current) {
      // Scroll to the top of the new message so it can be read from the beginning
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Home page default sequence
  const defaultHomeSequence: ChatSequenceMessage[] = [
    { role: 'assistant', content: "Hola! I'm Gurek - Product Generalist, UX Systems Designer and an AI-Native Builder.", delayMs: 1500 },
    { role: 'assistant', content: "Versatile product thinker with 5+ years of experience across Product Strategy, AI-led Feature Development, UX Design, and qualitative product-led experience improvements.", delayMs: 1500 },
    { role: 'assistant', content: "Currently focused on AI-driven personalised content systems, Vector DBs, RAGs, graph knowledge bases, and stock market UX.", delayMs: 800 },
    { role: 'user', content: "What are the tools you work with?", delayMs: 1500 },
    { role: 'assistant', content: "Well my current toolbox is:", richContentType: 'tools', delayMs: 1000 },
    { role: 'assistant', content: "Using it I can be a jack of all trades!", richContentType: 'skills', delayMs: 1500 },
    { role: 'assistant', content: "and I've been associated with", richContentType: 'affiliations', delayMs: 1500 },
    { role: 'user', content: "Can I see some of your past work?", delayMs: 2500 },
    { role: 'assistant', content: "Here's a gallery of projects currently available. Just a click away to dive deeper into any of them!", richContentType: 'projects', richContentData: { initialCount: 3 }, delayMs: 2000 },
    { role: 'user', content: "All those who wander aren't lost! Some bump into a portfolio agent and here I am talking to it...", delayMs: 1500 },
    {
      role: 'assistant',
      content: "Happy to meet you! I didn't catch your name? Please introduce yourself. Or just go ahead, ask me anything!",
      delayMs: 3000,
      suggestions: [
        { label: "Tell me about yourself", redirect: '/about' },
        { label: "What revenue impact have you made?", redirect: '/projects/growfast' },
        { label: "Describe your experience with LLMs, RAGs, and Generative AI?", redirect: '/projects/times-intel' },
        { label: "Walk me through your design thinking process?", redirect: '/projects/epaper' },
        { label: "Why this type of portfolio?" },
        { label: "Walk me through your resume", redirect: '/about' },
      ],
    },
  ];

  const sequenceToRun = initialSequence || (pathname === '/' ? defaultHomeSequence : null);

  useEffect(() => {
    if (!sequenceToRun || isLoading || sequenceStarted.current) return;

    // Run from the beginning (empty) or resume from where it was interrupted (partial).
    const startIndex = messages.length;
    if (startIndex >= sequenceToRun.length) return; // already complete

    sequenceStarted.current = true;
    const runSequence = async () => {
      for (let i = startIndex; i < sequenceToRun.length; i++) {
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
                component: msg.component || (msg.richContentType ? <RichContentContainer type={msg.richContentType as any} data={msg.richContentData} /> : undefined),
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
  }, [pathname, messages.length, isLoading, sequenceToRun]);

  const handleSend = (content: string) => {
    sendMessage(content, pathname, navigate);
  };

  /** Handles a suggestion pill click — navigates directly if a redirect is set, otherwise sends to LLM. */
  const handleSuggestionClick = (item: string | SuggestionItem) => {
    if (typeof item === 'object' && item.redirect) {
      navigate(item.redirect);
      return;
    }
    const label = typeof item === 'string' ? item : item.label;
    handleSend(label);
  };



  return (
    <div className="flex flex-col flex-1 relative h-full">

      {/* Chat Area Container */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center pt-8 pb-[140px] md:pb-[130px]">
        {messages.length === 0 && !isLoading ? (
          /* Empty State matching System Chat Bubble */
          <div className="flex flex-col flex-1 text-left justify-end w-full pb-[40px] items-center">
            {/* <div className="flex items-start gap-4 w-full px-4 md:px-0" style={{ maxWidth: '654px' }}>
              {/* Bot Avatar /}
              <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'transparent' }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 24C10 18 14 16 16 16C18 16 22 18 22 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              {/* Intro Message /}
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
            </div> */}
            {templatedComponent && (
              <div className="w-full mt-4">
                {templatedComponent}
              </div>
            )}
            {isLoading && <TypingIndicator />}
          </div>
        ) : (
          <div className="flex flex-col w-full px-4 md:px-0" style={{ maxWidth: '654px', gap: 'var(--space-6)' }}>
            {templatedComponent && (
              <div className="w-full my-4">
                {templatedComponent}
              </div>
            )}
            {messages.map((msg, idx) => {
              const lastAssistantIndex = messages.map(m => m.role).lastIndexOf('assistant');
              const isLastAssistant = msg.role === 'assistant' && idx === lastAssistantIndex;
              const isLastMessage = idx === messages.length - 1;
              return (
                <div key={msg.id} ref={isLastMessage ? lastMessageRef : null}>
                  <MessageBubble 
                    message={msg} 
                    onSuggestionClick={handleSuggestionClick} 
                    isLastAssistantMessage={isLastAssistant} 
                  />
                </div>
              );
            })}
            {isLoading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center bg-background/80 pt-6 px-4 md:px-0" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="w-full" style={{ maxWidth: '702px' }}>
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
