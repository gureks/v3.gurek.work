import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sendQuery } from '../services/api';
import { getSystemContext } from '../utils/chat';
import { sanitizeUserInput, validateLLMResponse, validateRedirectPath } from '../utils/security';
import { RichContentContainer, RichContentType } from '../components/rich-content/RichContentContainer';
import type { SuggestionItem } from '../pages/ChatPage';

import * as React from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: (string | SuggestionItem)[];
  timestamp: number;
  isError?: boolean;
  component?: React.ReactNode;
  richContentType?: string;
}

interface ChatState {
  sessions: Record<string, ChatMessage[]>;
  isLoading: boolean;
  retryAttempt: number | null;
  activeSessionId: string;
  setActiveSession: (pathname: string) => void;
  injectMessages: (pathname: string, messages: ChatMessage[]) => void;
  sendMessage: (content: string, pathname: string, navigate?: (path: string, options?: { state?: Record<string, unknown> }) => void) => Promise<void>;
  clearMessages: (pathname: string) => void;
}

const RETRY_DELAYS = [500, 1000, 2000];

function cleanAndParseJSON(raw: string): { redirect: string | null; response: string; suggestions: string[]; richContent?: RichContentType | null } {
  // Strip markdown code fences
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/g, '').trim();
  // Find the outermost JSON object
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  const parsed = JSON.parse(cleaned);
  // Validate and sanitize the parsed response shape
  const validated = validateLLMResponse(parsed);
  if (!validated) throw new Error('LLM response failed validation');
  return {
    redirect: validated.redirect,
    response: validated.response,
    suggestions: validated.suggestions,
    richContent: validated.richContent as RichContentType | null,
  };
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: {},
      isLoading: false,
      retryAttempt: null,
      activeSessionId: '/',

      setActiveSession: (pathname: string) =>
        set((state) => ({
          activeSessionId: pathname,
          sessions: {
            ...state.sessions,
            [pathname]: state.sessions[pathname] || [],
          },
        })),

      injectMessages: (pathname: string, messages: ChatMessage[]) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [pathname]: [...(state.sessions[pathname] || []), ...messages],
          },
        })),

      sendMessage: async (content: string, pathname: string, navigate?: (path: string, options?: { state?: Record<string, unknown> }) => void) => {
        const systemContext = getSystemContext(pathname);

        // Sanitize user input before storing or sending
        const safeContent = sanitizeUserInput(content);
        if (!safeContent) return; // Reject empty/fully-stripped input

        const userMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'user',
          content: safeContent,
          timestamp: Date.now(),
        };

        set((state) => {
          const currentSession = state.sessions[pathname] || [];
          return {
            sessions: {
              ...state.sessions,
              [pathname]: [...currentSession, userMessage],
            },
            isLoading: true,
            retryAttempt: null,
          };
        });

        try {
          const history = (get().sessions[pathname] || []).map((m) => ({
            role: m.role,
            // Sanitize history entries before sending to API
            content: sanitizeUserInput(m.content),
          }));

          const response = await sendQuery({
            query: content,
            user_prompt: systemContext,
            response_type: 'a strictly formatted JSON object exactly matching the requested OUTPUT FORMAT. Do not use Markdown fences outside the JSON.',
            include_references: false,
            mode: 'mix',
            conversation_history: history,
          });

          const replyText = response.response.trim();

          // Attempt to parse JSON response with retry logic
          let parsedResponse: { redirect: string | null; response: string; suggestions: string[]; richContent?: RichContentType | null } | undefined;
          let rawText = replyText;
          try {
            parsedResponse = cleanAndParseJSON(rawText);
          } catch (parseErr) {
            // Retry loop with exponential backoff
            let retrySuccess = false;
            for (let attempt = 0; attempt < RETRY_DELAYS.length; attempt++) {
              set({ retryAttempt: attempt + 1 });
              await new Promise(resolve => setTimeout(resolve, RETRY_DELAYS[attempt]));
              try {
                const retryResponse = await sendQuery({
                  query: content,
                  user_prompt: systemContext,
                  response_type: 'a strictly formatted JSON object exactly matching the requested OUTPUT FORMAT. Do not use Markdown fences outside the JSON.',
                  include_references: false,
                  mode: 'mix',
                  conversation_history: history,
                });
                rawText = retryResponse.response.trim();
                parsedResponse = cleanAndParseJSON(rawText);
                retrySuccess = true;
                break;
              } catch (retryErr) {
                // Continue to next attempt
              }
            }
            set({ retryAttempt: null });
            if (!retrySuccess) {
              // Graceful degradation — render raw text as markdown if it looks like prose
              if (rawText && rawText.length > 10 && /[a-zA-Z\s]/.test(rawText)) {
                // Filter out technical [no-context] strings from the UI
                const cleanText = rawText.replace(/\[no-context\]/g, '').trim();
                parsedResponse = { 
                  redirect: null, 
                  response: sanitizeUserInput(cleanText) || "I'm sorry, I don't have specific information on that. Can I show you Gurek's projects instead?", 
                  suggestions: ["Show me projects", "Tell me about his experience"],
                  richContent: null
                };
              } else {
                throw new Error('Response could not be parsed after retries');
              }
            }
          }

          // At this point parsedResponse is always defined (or we threw above)
          const parsed = parsedResponse as { redirect: string | null; response: string; suggestions: string[]; richContent?: RichContentType | null };

          // Handle redirect flows
          if (parsed.redirect && navigate) {
            // Extra validation of redirect — defence-in-depth beyond cleanAndParseJSON
            const safeRedirect = validateRedirectPath(parsed.redirect);
            if (!safeRedirect) {
              console.warn('[security] Blocked unsafe redirect:', parsed.redirect);
            } else if (parsed.response && parsed.response.trim().length > 0) {
              // REDIRECT + ANSWER: render message first, then navigate
              const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: parsed.response,
                suggestions: parsed.suggestions || [],
                timestamp: Date.now(),
                component: parsed.richContent ? React.createElement(RichContentContainer, { type: parsed.richContent as RichContentType }) : undefined,
              };
              set((state) => ({
                sessions: {
                  ...state.sessions,
                  [pathname]: [...(state.sessions[pathname] || []), assistantMessage],
                },
                isLoading: false,
                retryAttempt: null,
              }));
              // Brief delay so user sees the response before redirect
              await new Promise(resolve => setTimeout(resolve, 1500));
              navigate(safeRedirect, {
                state: { suggestions: parsed.suggestions },
              });
              return;
            } else {
              // REDIRECT ONLY: navigate immediately, skip adding empty response message
              set({ isLoading: false, retryAttempt: null });
              navigate(safeRedirect, {
                state: {
                  suggestions: parsed.suggestions,
                  toast: parsed.response || null,
                },
              });
              return;
            }
          }

          // Non-redirect response — add as assistant message
          const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: parsed.response || '',
            suggestions: parsed.suggestions || [],
            timestamp: Date.now(),
            component: parsed.richContent ? React.createElement(RichContentContainer, { type: parsed.richContent as RichContentType }) : undefined,
          };

          set((state) => {
            const currentSession = state.sessions[pathname] || [];
            return {
              sessions: {
                ...state.sessions,
                [pathname]: [...currentSession, assistantMessage],
              },
              isLoading: false,
              retryAttempt: null,
            };
          });
        } catch (error) {
          const errorMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: "I couldn't process that request. Please try again.",
            timestamp: Date.now(),
            isError: true,
          };

          set((state) => {
            const currentSession = state.sessions[pathname] || [];
            return {
              sessions: {
                ...state.sessions,
                [pathname]: [...currentSession, errorMessage],
              },
              isLoading: false,
              retryAttempt: null,
            };
          });
        }
      },

      clearMessages: (pathname: string) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [pathname]: [],
          },
        })),
    }),
    {
      name: 'chat-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
      partialize: (state) => {
        // Strip non-serializable `component` field from messages before persisting
        const cleanSessions: Record<string, ChatMessage[]> = {};
        for (const [key, msgs] of Object.entries(state.sessions)) {
          cleanSessions[key] = msgs.map(({ component, ...rest }) => rest);
        }
        return { sessions: cleanSessions } as unknown as ChatState;
      },
    }
  )
);
