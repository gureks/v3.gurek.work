/**
 * Hardened API client — wraps fetch with:
 * - Environment-aware base URL (no hardcoded localhost in prod)
 * - Enforced HTTPS in production
 * - Request timeout (AbortController)
 * - Response size guard
 * - Authorization header injection
 * - Domain validation to prevent SSRF-like abuse
 */

const API_BASE_RAW = (import.meta.env.VITE_API_URL as string | undefined);
const API_TOKEN = import.meta.env.VITE_API_TOKEN as string | undefined;

if (!API_BASE_RAW) {
  throw new Error('[config] VITE_API_URL is not set. Add it to your .env file.');
}

/** Narrowed to string after the guard above */
const API_BASE: string = API_BASE_RAW;

/** Throw if we're in production and the API URL is not HTTPS */
function assertSecureOrigin(url: string): void {
  if (import.meta.env.PROD && url.startsWith('http://')) {
    throw new Error('[security] API requests must use HTTPS in production');
  }
}

/** Validate the API base URL is a known safe origin — blocks open fetch to arbitrary URLs */
function assertTrustedDomain(url: string): void {
  try {
    const parsed = new URL(url);
    const ALLOWED_HOSTS = [
      'localhost',
      '127.0.0.1',
      'gurek.work',
      'v2.gurek.work',
      'lrag-gurek.onrender.com'
      // Add your production API hostname here
    ];
    const hostOk = ALLOWED_HOSTS.some(h => parsed.hostname === h || parsed.hostname.endsWith(`.${h}`));
    if (!hostOk) {
      throw new Error(`[security] Untrusted API host: ${parsed.hostname}`);
    }
  } catch (e) {
    if ((e as Error).message.startsWith('[security]')) throw e;
    throw new Error('[security] Malformed API base URL');
  }
}

// Validate once at module load
assertTrustedDomain(API_BASE);

/** Max response body size we'll read — 512 KB */
const MAX_RESPONSE_BYTES = 512 * 1024;

/** Request timeout — 30s */
const TIMEOUT_MS = 30_000;

export interface QueryRequest {
  query: string;
  mode?: 'local' | 'global' | 'hybrid' | 'naive' | 'mix' | 'bypass';
  stream?: boolean;
  conversation_history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  include_references?: boolean;
  /** Sent to LLM as formatting/persona instructions. NOT vectorized for retrieval. */
  user_prompt?: string;
  response_type?: string;
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
  assertSecureOrigin(API_BASE);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Helps backend CSRF detection
  };

  if (API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }

  let res: Response;
  try {
    console.log(API_BASE, API_TOKEN);
    res = await fetch(`${API_BASE}/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...request,
        stream: false,
      }),
      signal: controller.signal,
      // Prevent cookies from leaking to the API server (no credentials needed)
      credentials: 'omit',
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    // Avoid leaking raw server error details to the UI
    const errorBody = await res.json().catch(() => ({ detail: 'Unknown error' }));
    const message = typeof errorBody?.detail === 'string'
      ? errorBody.detail.slice(0, 200)  // Truncate — don't expose full server errors
      : `HTTP ${res.status}`;
    throw new Error(message);
  }

  // Guard response size before reading
  const contentLength = res.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_RESPONSE_BYTES) {
    throw new Error('[security] API response too large');
  }

  const text = await res.text();
  if (text.length > MAX_RESPONSE_BYTES) {
    throw new Error('[security] API response too large');
  }

  return JSON.parse(text) as QueryResponse;
}
