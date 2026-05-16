import { ChatMessage } from '../store/useChatStore';

export interface NotionLogPayload {
  sessionId: string;
  userName: string | null;
  userRole: string | null;
  messages: ChatMessage[];
}

export function logChatToNotion(payload: NotionLogPayload) {
  // Prevent relative fetch errors in Node.js test environments
  if (typeof window === 'undefined') return;

  fetch('/api/log_chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error('[CMS] Failed to log chat to Notion:', error);
  });
}
