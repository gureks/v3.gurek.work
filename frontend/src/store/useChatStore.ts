import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as Sentry from '@sentry/react';
import { sendQuery } from '../services/api';
import { getSystemContext } from '../utils/chat';
import { sanitizeUserInput, validateLLMResponse, validateRedirectPath } from '../utils/security';
import { RichContentContainer, RichContentType } from '../components/rich-content/RichContentContainer';
import type { SuggestionItem } from '../pages/ChatPage';
import { logChatToNotion } from '../services/cms';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  richContentData?: any;
}

interface ChatState {
  sessions: Record<string, ChatMessage[]>;
  globalSessionId: string;
  userName: string | null;
  userRole: string | null;
  isLoading: boolean;
  retryAttempt: number | null;
  activeSessionId: string;
  lastActivity: number;
  setActiveSession: (pathname: string) => void;
  injectMessages: (pathname: string, messages: ChatMessage[]) => void;
  sendMessage: (content: string, pathname: string, navigate?: (path: string, options?: { state?: Record<string, unknown> }) => void) => Promise<void>;
  clearMessages: (pathname: string) => void;
}

const RETRY_DELAYS = [500, 1000, 2000];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cleanAndParseJSON(raw: string): { redirect: string | null; response: string; suggestions: string[]; richContent?: RichContentType | null; richContentData?: any; extracted_user_name?: string | null; extracted_user_role?: string | null } {
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
    richContentData: validated.richContentData,
    extracted_user_name: validated.extracted_user_name,
    extracted_user_role: validated.extracted_user_role,
  };
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: {},
      globalSessionId: crypto.randomUUID(),
      userName: null,
      userRole: null,
      isLoading: false,
      retryAttempt: null,
      activeSessionId: '/',
      lastActivity: Date.now(),

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
          lastActivity: Date.now(),
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
            lastActivity: Date.now(),
          };
        });

        try {
          const history = (get().sessions[pathname] || []).map((m) => ({
            role: m.role,
            // Sanitize history entries before sending to API
            content: sanitizeUserInput(m.content),
          }));

          // Attempt to send query and parse JSON with a unified 3-strike retry logic
          let parsedResponse: { redirect: string | null; response: string; suggestions: string[]; richContent?: RichContentType | null; richContentData?: any; extracted_user_name?: string | null; extracted_user_role?: string | null } | undefined;
          let lastError: Error | undefined;
          let rawText = '';
          const maxAttempts = 3;

          for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
              if (attempt > 1) {
                set({ retryAttempt: attempt - 1 });
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAYS[attempt - 2] || 1000));
              }

              const response = await sendQuery({
                query: content,
                user_prompt: systemContext,
                response_type: 'a strictly formatted JSON object exactly matching the requested OUTPUT FORMAT. Do not use Markdown fences outside the JSON.',
                include_references: false,
                mode: 'mix',
                conversation_history: history,
              });

              rawText = response.response.trim();
              parsedResponse = cleanAndParseJSON(rawText);
              
              set({ retryAttempt: null });
              break; // Success!
            } catch (err) {
              lastError = err as Error;
              console.warn(`[chat] Attempt ${attempt} failed:`, err);
              
              if (attempt === maxAttempts) {
                set({ retryAttempt: null });
                // 3 strikes: capture exception in Sentry for immediate notification
                Sentry.captureException(new Error(`LightRAG API failed after 3 consecutive attempts: ${lastError.message}`), {
                  extra: { query: content, pathname, attempt, rawText }
                });

                // Graceful degradation fallback if we received raw prose text
                if (rawText && rawText.length > 10 && /[a-zA-Z\s]/.test(rawText)) {
                  const cleanText = rawText.replace(/\[no-context\]/g, '').trim();
                  parsedResponse = { 
                    redirect: null, 
                    response: sanitizeUserInput(cleanText) || "I couldn't process that request properly. I can't respond to this, but Gurek would be able to help.", 
                    suggestions: [],
                    richContent: 'contact',
                    richContentData: null,
                  };
                } else {
                  throw lastError;
                }
              }
            }
          }

          // At this point parsedResponse is always defined (or we threw above)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const parsed = parsedResponse as { redirect: string | null; response: string; suggestions: string[]; richContent?: RichContentType | null; richContentData?: any; extracted_user_name?: string | null; extracted_user_role?: string | null };

          // Update user details if extracted
          if (parsed.extracted_user_name || parsed.extracted_user_role) {
            set((state) => ({
              userName: parsed.extracted_user_name || state.userName,
              userRole: parsed.extracted_user_role || state.userRole,
            }));
          }

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
                richContentType: parsed.richContent || undefined,
                richContentData: parsed.richContentData,
                component: parsed.richContent ? React.createElement(RichContentContainer, { type: parsed.richContent as RichContentType, data: parsed.richContentData }) : undefined,
              };
              set((state) => {
                const nextSessions = { ...state.sessions };
                nextSessions[pathname] = [...(nextSessions[pathname] || []), assistantMessage];
                
                // If redirecting to a new page, carry over the conversation history so it shows up there
                if (safeRedirect !== pathname) {
                  nextSessions[safeRedirect] = [
                    ...(nextSessions[safeRedirect] || []),
                    { ...userMessage, id: crypto.randomUUID() },
                    { ...assistantMessage, id: crypto.randomUUID() }
                  ];
                }
                
                return {
                  sessions: nextSessions,
                  isLoading: false,
                  retryAttempt: null,
                  lastActivity: Date.now(),
                };
              });
              // Brief delay so user sees the response before redirect
              await new Promise(resolve => setTimeout(resolve, 1500));
              navigate(safeRedirect, {
                state: { suggestions: parsed.suggestions },
              });
              return;
            } else {
              // REDIRECT ONLY: navigate immediately, skip adding empty response message
              set((state) => {
                const nextSessions = { ...state.sessions };
                
                // Carry over the user message to the new page so they know what triggered it
                if (safeRedirect !== pathname) {
                  nextSessions[safeRedirect] = [
                    ...(nextSessions[safeRedirect] || []),
                    { ...userMessage, id: crypto.randomUUID() }
                  ];
                }

                return {
                  sessions: nextSessions,
                  isLoading: false, 
                  retryAttempt: null,
                  lastActivity: Date.now(),
                };
              });
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
            richContentType: parsed.richContent || undefined,
            richContentData: parsed.richContentData,
            component: parsed.richContent ? React.createElement(RichContentContainer, { type: parsed.richContent as RichContentType, data: parsed.richContentData }) : undefined,
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
              lastActivity: Date.now(),
            };
          });

          logChatToNotion({
            sessionId: get().globalSessionId,
            userName: get().userName,
            userRole: get().userRole,
            messages: [userMessage, assistantMessage]
          });
        } catch (error) {
          const errorMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: "I'm having trouble connecting to my backend right now. I can't respond to this, but Gurek would be able to help you out directly.",
            timestamp: Date.now(),
            isError: true,
            richContentType: 'contact',
            component: React.createElement(RichContentContainer, { type: 'contact' }),
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
              lastActivity: Date.now(),
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
          lastActivity: Date.now(),
        })),
    }),
    {
      name: 'chat-storage',
      version: typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 1,
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error || !state) return;

          // 1. 12-hour expiry check
          const TWELVE_HOURS = 12 * 60 * 60 * 1000;
          if (Date.now() - state.lastActivity > TWELVE_HOURS) {
            useChatStore.setState({ sessions: {}, lastActivity: Date.now() });
            return;
          }

          // 2. Hard refresh check
          const isReload = window.performance
            ? (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload'
            : false;
            
          if (isReload) {
            useChatStore.setState({ sessions: {}, lastActivity: Date.now() });
          }
        };
      },
      partialize: (state) => {
        // Strip non-serializable `component` field from messages before persisting
        const cleanSessions: Record<string, ChatMessage[]> = {};
        for (const [key, msgs] of Object.entries(state.sessions)) {
          // Keep only the last 50 messages to prevent QuotaExceededError
          const trimmedMsgs = msgs.slice(-50);
          cleanSessions[key] = trimmedMsgs.map(({ component, ...rest }) => rest);
        }
        return { sessions: cleanSessions, lastActivity: state.lastActivity } as unknown as ChatState;
      },
    }
  )
);
