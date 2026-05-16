import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { useChatStore } from './useChatStore';
import { sendQuery } from '../services/api';

// Mock the API services
vi.mock('../services/api', () => ({
  sendQuery: vi.fn(),
}));

vi.mock('../services/cms', () => ({
  logChatToNotion: vi.fn(),
}));

// Mock window.location for getPageContext
const originalLocation = window.location;
beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: { ...originalLocation, pathname: '/' },
    writable: true,
  });
});

describe('useChatStore', () => {
  beforeEach(() => {
    useChatStore.getState().clearMessages('/');
    vi.clearAllMocks();
  });

  it('should initialize empty messages', () => {
    const state = useChatStore.getState();
    expect(state.sessions['/'] || []).toHaveLength(0);
  });

  it('should add user message and handle loading state', async () => {
    const mockQuery = vi.mocked(sendQuery).mockResolvedValue({ response: '{"response": "I am good!", "suggestions": [], "redirect": null, "action": "chat"}' });
    const state = useChatStore.getState();
    
    // Trigger sendMessage without awaiting to check loading state
    const promise = state.sendMessage('Hello', '/');
    
    expect(useChatStore.getState().isLoading).toBe(true);
    expect(useChatStore.getState().sessions['/'].some(m => m.content === 'Hello')).toBe(true);

    await promise;

    expect(useChatStore.getState().isLoading).toBe(false);
    expect(useChatStore.getState().sessions['/'].some(m => m.content === 'I am good!')).toBe(true);
    expect(mockQuery).toHaveBeenCalled();
  });

  it('should handle API failure and inject fallback contact card', async () => {
    vi.mocked(sendQuery).mockRejectedValue(new Error('Network error'));
    const state = useChatStore.getState();
    
    await state.sendMessage('Fail me', '/');

    const messages = useChatStore.getState().sessions['/'];
    const lastMessage = messages[messages.length - 1];
    
    expect(useChatStore.getState().isLoading).toBe(false);
    // The fallback logic should return a generic message about Gurek and include a contact card
    expect(lastMessage.content).toContain("I can't respond to this");
    expect(lastMessage.richContentType).toBe('contact');
  });
});
