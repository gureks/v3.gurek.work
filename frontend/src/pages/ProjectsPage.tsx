import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore, type ChatMessage } from '../store/useChatStore';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageBubble } from '../components/chat/MessageBubble';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { Header } from '../components/layout/Header';
import { ProjectCardGallery, type ProjectCard } from '../components/chat/ProjectCardGallery';

/* ─────────────────────────────────────────────
   Project data — sourced from Figma node 36:755
   Images are the Figma-exported PNGs in /public/assets
   ───────────────────────────────────────────── */

const ROW_1_CARDS: ProjectCard[] = [
  {
    id: 'et-epaper',
    images: [
      '/assets/823d97199270e75d420d2be4f903caa3bcaa1c6a.png',
      '/assets/fd0b2da01413441fa046b98efad20c7c55b55f14.png',
    ],
    title: (
      <>
        <span style={{ fontWeight: 400 }}>Improving the </span>
        <span>Reading Experience for India's Largest Daily</span>
      </>
    ),
    slug: 'et-epaper',
  },
  {
    id: 'growfast',
    images: ['/assets/e08a0b9d8698eb32ec06cfdd4733323a216e4208.png'],
    title: 'GrowFast: From an E-learning Experiment to rebuilding around Trust and Conversion',
    slug: 'growfast',
  },
  {
    id: 'et-markets-ds',
    images: [
      '/assets/3ed51a5f4379f836fd3ce350a0d565dad38fd27e.png',
      '/assets/cf839f1ab5c6f45d6191f2e94dc5396c12137d0a.png',
    ],
    title: (
      <>
        <span>Better Developer Handoffs- </span>
        <span style={{ fontWeight: 400 }}>
          Design System for ET Markets - stock research tools and news app, across all platforms
        </span>
      </>
    ),
    slug: 'et-markets-ds',
  },
];

const ROW_2_CARDS: ProjectCard[] = [
  {
    id: 'design-agency',
    images: ['/assets/c2e65175b9331d1aadd3e1321c5c118d07d18b44.png'],
    title: 'Bootstraped a Design Agency during Covid',
    slug: 'design-agency',
  },
  {
    id: 'ai-avatar',
    images: ['/assets/cf8307e5f34d566ee243db3b515015da70f892a1.png'],
    title: (
      <>
        <span>Trusted stories, humanized! </span>
        <span style={{ fontWeight: 400 }}>
          Automated anchor-led videos, by developing an AI Avatar System
        </span>
      </>
    ),
    slug: 'ai-avatar',
  },
  {
    id: 'times-intel',
    images: [
      '/assets/3ed51a5f4379f836fd3ce350a0d565dad38fd27e.png',
      '/assets/cf839f1ab5c6f45d6191f2e94dc5396c12137d0a.png',
    ],
    title: (
      <>
        <span>Times Intelligence Layer - </span>
        <span style={{ fontWeight: 400 }}>
          RAG and LLM Engine layer over 20yrs of repository
        </span>
      </>
    ),
    slug: 'times-intel',
  },
];

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
    content:
      "Sure! Here's a gallery of projects currently available. Let me know if you want to dive deeper into any of them!\n\nHappy to help :D",
    timestamp: Date.now(),
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

  const handleCardClick = (card: ProjectCard) => {
    if (card.slug) {
      navigate(`/project/${card.slug}`);
    }
  };

  const lastAssistantMessage = [...messages].reverse().find((msg) => msg.role === 'assistant');
  const activeSuggestions = lastAssistantMessage?.suggestions;

  return (
    <div className="flex flex-col flex-1 relative h-full">
      {/* Header */}
      <Header />

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center pb-[130px]">
        <div className="flex flex-col w-full" style={{ maxWidth: '654px', gap: '24px' }}>
          {messages.map((msg) => {
            const isGallerySeed = msg.id === ASSISTANT_SEED_ID;
            return (
              <React.Fragment key={msg.id}>
                <MessageBubble message={msg} onSuggestionClick={handleSend} />

                {/* Gallery rows render right after the seed assistant message */}
                {isGallerySeed && (
                  <>
                    <ProjectCardGallery cards={ROW_1_CARDS} onCardClick={handleCardClick} />
                    <ProjectCardGallery cards={ROW_2_CARDS} onCardClick={handleCardClick} />
                  </>
                )}
              </React.Fragment>
            );
          })}

          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </main>

      {/* Input Area */}
      <div
        className="absolute bottom-0 left-0 w-full flex justify-center bg-background/80 pt-6"
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="w-full" style={{ maxWidth: '702px' }}>
          <ChatInput onSend={handleSend} disabled={isLoading} suggestions={activeSuggestions} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
