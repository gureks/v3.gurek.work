import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sendQuery } from '../services/api';
import { getSystemContext } from '../utils/chat';

import * as React from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
  timestamp: number;
  isError?: boolean;
  component?: React.ReactNode;
}

interface ChatState {
  sessions: Record<string, ChatMessage[]>;
  isLoading: boolean;
  activeSessionId: string;
  setActiveSession: (pathname: string) => void;
  injectMessages: (pathname: string, messages: ChatMessage[]) => void;
  sendMessage: (content: string, pathname: string, navigate?: (path: string) => void) => Promise<void>;
  clearMessages: (pathname: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: {},
      isLoading: false,
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

      sendMessage: async (content: string, pathname: string, navigate?: (path: string) => void) => {
        const systemContext = getSystemContext(pathname);
        const contentWithContext = `${systemContext}\n\nUser Message:\n${content}`;

        const userMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'user',
          content: content, // Display original content to user
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
          };
        });

        try {
          const history = (get().sessions[pathname] || []).map((m) => ({
            role: m.role,
            content: m.content,
          }));

          const response = await sendQuery({
            query: contentWithContext,
            mode: 'mix',
            conversation_history: history,
          });

          const replyText = response.response.trim();
          
          let parsedResponse;
          try {
            // Strip potential markdown code block backticks if the LLM wrapped the JSON
            const cleanJson = replyText.replace(/```json/i, '').replace(/```/g, '').trim();
            parsedResponse = JSON.parse(cleanJson);
          } catch (e) {
            console.error("Failed to parse backend JSON response", replyText);
            throw new Error("Invalid response format");
          }

          // Check for redirection signal
          if (parsedResponse.redirect && navigate) {
            set({ isLoading: false });
            navigate(parsedResponse.redirect);
            return;
          }

          const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: parsedResponse.response || '',
            suggestions: parsedResponse.suggestions || [],
            timestamp: Date.now(),
          };

          set((state) => {
            const currentSession = state.sessions[pathname] || [];
            return {
              sessions: {
                ...state.sessions,
                [pathname]: [...currentSession, assistantMessage],
              },
              isLoading: false,
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
      name: 'chat-storage', // name of the item in the storage (must be unique)
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ sessions: state.sessions }), // only persist the 'sessions' slice
    }
  )
);
