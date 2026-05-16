import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// We need to mock global fetch since the function uses it
global.fetch = vi.fn();

describe('/api/log_chat Serverless Function', () => {
  let mockReq: Partial<VercelRequest>;
  let mockRes: Partial<VercelResponse>;
  let statusMock: ReturnType<typeof vi.fn>;
  let jsonMock: ReturnType<typeof vi.fn>;
  let handler: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    
    // Set up mock environment BEFORE importing
    process.env.NOTION_API_KEY = 'test-key';
    process.env.NOTION_DATABASE_ID = 'test-db';

    // Dynamically import handler to capture env vars
    handler = (await import('./log_chat')).default;

    jsonMock = vi.fn();
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    mockReq = {
      method: 'POST',
      body: {
        sessionId: 'session-1',
        messages: [{ role: 'user', content: 'test' }]
      },
      headers: {
        'x-forwarded-for': '127.0.0.1'
      }
    };

    mockRes = {
      status: statusMock,
      json: jsonMock
    };
  });

  it('should return 405 for non-POST requests', async () => {
    mockReq.method = 'GET';
    await handler(mockReq as VercelRequest, mockRes as VercelResponse);
    expect(statusMock).toHaveBeenCalledWith(405);
  });

  it('should return 400 for invalid payload', async () => {
    mockReq.body = { sessionId: null };
    await handler(mockReq as VercelRequest, mockRes as VercelResponse);
    expect(statusMock).toHaveBeenCalledWith(400);
  });
});
