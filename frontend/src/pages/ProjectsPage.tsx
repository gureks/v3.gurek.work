import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore, type ChatMessage } from '../store/useChatStore';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageBubble } from '../components/chat/MessageBubble';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { Header } from '../components/layout/Header';
import { RichContentContainer } from '../components/rich-content/RichContentContainer';

/* ─────────────────────────────────────────────
   Seed data — the initial conversation shown on /projects
   ───────────────────────────────────────────── */
const USER_SEED_ID = 'projects-user-seed';
const ASSISTANT_SEED_ID = 'projects-assistant-seed';

const SEED_MESSAGES: ChatMessage[] = [
  {
    id: USER_SEED_ID,
    role: 'user',
    content: 'Can you walk me through his past work or projects he has built?',
    timestamp: Date.now(),
  },
  {
    id: ASSISTANT_SEED_ID,
    role: 'assistant',
    content: 'Here’s a gallery of projects currently available. Just a click away to dive deeper into any of them!',
    suggestions: [
      'Dive deeper into Growfast',
      'Can you describe his role in the Times Intelligence Layer',
      'What was the impact of ePaper?',
      'Tell me more about ET Markets Design System?',
      'Where can I reach you?'
    ],
    timestamp: Date.now(),
    component: <RichContentContainer type="projects" />,
    richContentType: 'projects',
  },
];

const ProjectsPage: React.FC = () => {
  const { sessions, isLoading, sendMessage, injectMessages } = useChatStore();
  const location = useLocation();
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);
  const seededRef = useRef(false);

  const pathname = location.pathname;
  const messages = sessions[pathname] || [];

  // Seed the session on first mount if empty
  useEffect(() => {
    if (!seededRef.current && (!sessions[pathname] || sessions[pathname].length === 0)) {
      seededRef.current = true;
      injectMessages(pathname, SEED_MESSAGES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isLoading]);

  const handleSend = (content: string) => {
    sendMessage(content, pathname, navigate);
  };


  return (
    <div className="flex flex-col flex-1 relative h-full">
      {/* Header */}
      <Header />

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center pb-[130px]">
        <div className="flex flex-col w-full" style={{ maxWidth: '654px', gap: '24px' }}>
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
      </main>

      {/* Input Area */}
      <div
        className="absolute bottom-0 left-0 w-full flex justify-center bg-background/80 pt-6"
        style={{  }}
      >
        <div className="w-full" style={{ maxWidth: '702px' }}>
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
