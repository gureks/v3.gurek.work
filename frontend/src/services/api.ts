/**
 * Hardened API client
 *
 * Architecture:
 *   Browser → /api/query (Vercel serverless proxy) → LightRAG server
 *
 * The Vercel proxy holds all credentials server-side (LIGHTRAG_API_KEY,
 * LIGHTRAG_USERNAME, LIGHTRAG_PASSWORD). Nothing sensitive is in VITE_* vars.
 *
 * In local dev the proxy is not available, so requests fall back to
 * VITE_API_URL (direct to LightRAG). Set VITE_DEV_DIRECT=true to force
 * this path, or run `vercel dev` for an end-to-end local proxy.
 *
 * Hardening retained:
 * - HTTPS enforcement in production
 * - Request timeout (AbortController)
 * - Response size guard
 * - Domain validation (dev path only)
 */

const API_BASE_RAW = (import.meta.env.VITE_API_URL as string | undefined);

/**
 * In production: call our own Vercel proxy function (relative URL).
 * In dev: call LightRAG directly via VITE_API_URL (fallback path).
 *
 * VITE_DEV_DIRECT=true forces the direct path in any environment
 * (useful for testing without `vercel dev`).
 */
const IS_DEV_DIRECT = import.meta.env.DEV || import.meta.env.VITE_DEV_DIRECT === 'true';

if (IS_DEV_DIRECT && !API_BASE_RAW) {
  throw new Error('[config] VITE_API_URL is not set. Add it to your .env file.');
}

/** Endpoint the frontend actually calls */
const QUERY_ENDPOINT: string = IS_DEV_DIRECT
  ? `${API_BASE_RAW}/query`   // dev: direct to LightRAG
  : '/api/query';              // prod: Vercel proxy

/** Used for domain validation in dev mode only */
const API_BASE: string = API_BASE_RAW ?? '';

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

// Domain/origin validation only applies in dev-direct mode.
// In production the fetch target is a relative /api/query URL on the
// same Vercel origin — there is no external host to validate.
if (IS_DEV_DIRECT && API_BASE) {
  assertTrustedDomain(API_BASE);
}

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
  // Origin checks only apply when calling LightRAG directly (dev mode).
  if (IS_DEV_DIRECT) {
    assertSecureOrigin(API_BASE);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // In dev-direct mode, add X-API-Key so local requests still authenticate.
    // In production this header is added server-side by the Vercel proxy.
    ...(IS_DEV_DIRECT && import.meta.env.VITE_API_KEY
      ? { 'X-API-Key': import.meta.env.VITE_API_KEY as string }
      : {}),
  };

  let res: Response;
  try {
    res = await fetch(QUERY_ENDPOINT, {
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
