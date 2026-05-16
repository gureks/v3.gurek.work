import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendQuery } from './api';
import { logChatToNotion } from './cms';

// Mock global fetch
global.fetch = vi.fn();

describe('API Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('sendQuery (LightRAG)', () => {
    it('should format message history correctly and send query', async () => {
      const mockResponse = { response: 'Hello world' };
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
        headers: new Headers(),
        text: async () => JSON.stringify(mockResponse)
      });

      const messages = [
        { role: 'user' as const, content: 'Hi' },
        { role: 'assistant' as const, content: 'Hello' }
      ];

      const result = await sendQuery({ query: 'How are you?', conversation_history: messages });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/query'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
          body: expect.stringContaining('How are you?')
        })
      );
      expect(result.response).toBe('Hello world');
    });

    it('should throw an error when API fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ detail: 'Internal Server Error' }),
      });

      await expect(sendQuery({ query: 'Test' })).rejects.toThrow('Internal Server Error');
    });
  });

  describe('logChatSession (Notion)', () => {
    it('should sync chat session successfully', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const messages = [{ id: '1', role: 'user' as const, content: 'Test msg', timestamp: Date.now() }];
      
      logChatToNotion({
        sessionId: 'session-123',
        messages,
        userName: 'Gurek',
        userRole: null
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/log_chat',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('session-123')
        })
      );
    });
  });
});
