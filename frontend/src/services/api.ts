const API_BASE = 'http://localhost:9621';

export interface QueryRequest {
  query: string;
  mode?: 'local' | 'global' | 'hybrid' | 'naive' | 'mix' | 'bypass';
  stream?: boolean;
  conversation_history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  include_references?: boolean;
}

export interface QueryResponse {
  response: string;
  references?: Array<{
    reference_id: string;
    file_path: string;
    content?: string[];
  }>;
}

export async function sendQuery(request: QueryRequest): Promise<QueryResponse> {
  const res = await fetch(`${API_BASE}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...request,
      stream: false,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(errorBody.detail || `HTTP ${res.status}`);
  }

  return res.json();
}
