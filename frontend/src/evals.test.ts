/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi } from 'vitest';
import { useChatStore } from './store/useChatStore';

// Provide a basic mock for localStorage if it's missing in JSDOM
if (typeof window !== 'undefined' && !window.localStorage) {
  const mockStorage: Record<string, string> = {};
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (k: string) => mockStorage[k] || null,
      setItem: (k: string, v: string) => { mockStorage[k] = v; },
      removeItem: (k: string) => { delete mockStorage[k]; },
      clear: () => {
        for (const k in mockStorage) {
          delete mockStorage[k];
        }
      }
    }
  });
}
if (typeof localStorage === 'undefined') {
  (global as any).localStorage = window.localStorage;
}

// Mock DOMPurify as it doesn't work well natively in node without a full browser context
vi.mock('dompurify', () => {
  return {
    default: {
      sanitize: (str: string) => str
    }
  };
});

const evals = [
  "What tools and software are in your current tech stack?",
  "I'd like to get a copy of your CV.",
  "Walk me through your professional experience.",
  "What were the main user complaints or feedback received during the ET ePaper launch before the hotfix?",
  "Can you highlight some of the key quantitative metrics and business impact you achieved?",
  "Show me a gallery of images related to the ET ePaper redesign.",
  "Show me a few of your top projects."
];

describe('Eval Tests', () => {
  test('run evals sequentially', async () => {
    console.log("Starting Evals with ChatStore (Sequential with history)\n");
    const pathname = '/';
    useChatStore.getState().clearMessages(pathname);

    for (let i = 0; i < evals.length; i++) {
      const prompt = evals[i];
      console.log(`\n======================================`);
      console.log(`EVAL ${i + 1}: ${prompt}`);
      console.log(`======================================`);
      
      await useChatStore.getState().sendMessage(prompt, pathname, (path) => {
        console.log(`[NAVIGATE CALLED] -> ${path}`);
      });

      const messages = useChatStore.getState().sessions[pathname] || [];
      const lastMessage = messages[messages.length - 1];

      expect(lastMessage).toBeDefined();
      if (!lastMessage || lastMessage.role !== 'assistant') {
        console.error(`❌ Failed to get assistant response.`);
        continue;
      }

      console.log(`[RESPONSE] ${lastMessage.content}`);
      console.log(`[RICH CONTENT ID] ${lastMessage.richContentType || 'null'}`);
      console.log(`[RICH CONTENT DATA] \n${lastMessage.richContentData ? JSON.stringify(lastMessage.richContentData, null, 2) : 'null'}`);
      
      // Delay to avoid rate limits
      await new Promise(r => setTimeout(r, 2000));
    }
  }, 120000); // 2 minute timeout
});
