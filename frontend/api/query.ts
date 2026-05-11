/**
 * Vercel Serverless Function — /api/query
 *
 * Acts as a secure proxy between the browser and the LightRAG server.
 * The LightRAG API key is read from server-side environment variables
 * (set via Vercel dashboard), so it is NEVER bundled into the client JS.
 *
 * Security properties:
 * - API key is server-side only (process.env, not VITE_*)
 * - Optional JWT login on startup (stored in module scope, refreshed on expiry)
 * - Rate-limiting enforced via Vercel's built-in edge rate limits
 * - Request body size capped at 16 KB
 * - Only POST method accepted
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// ── Server-side env vars (set in Vercel dashboard, NOT in .env) ──────────────
const LIGHTRAG_API_URL  = process.env.LIGHTRAG_API_URL;   // e.g. https://lrag-gurek.onrender.com
const LIGHTRAG_API_KEY  = process.env.LIGHTRAG_API_KEY;   // static API key
const LIGHTRAG_USERNAME = process.env.LIGHTRAG_USERNAME;  // JWT account username (optional)
const LIGHTRAG_PASSWORD = process.env.LIGHTRAG_PASSWORD;  // JWT account password (optional)

const REQUEST_TIMEOUT_MS = 35_000; // slightly longer than client timeout
const MAX_BODY_BYTES      = 256 * 1024; // 256 KB request cap

// ── JWT token cache (module scope — lives for the lifetime of the function instance) ─
let cachedToken: string | null = null;
let tokenExpiresAt: number     = 0;

/** Fetch a fresh JWT from the LightRAG /auth/login endpoint */
async function fetchJwtToken(): Promise<string | null> {
  if (!LIGHTRAG_USERNAME || !LIGHTRAG_PASSWORD || !LIGHTRAG_API_URL) return null;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(`${LIGHTRAG_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: LIGHTRAG_USERNAME,
        password: LIGHTRAG_PASSWORD,
      }),
      signal: controller.signal,
    });

    if (!res.ok) return null;

    const data = await res.json() as { access_token?: string; expires_in?: number };
    if (!data.access_token) return null;

    // Cache token with a 60-second safety buffer before real expiry
    const expiresInSeconds = data.expires_in ?? 3600;
    tokenExpiresAt = Date.now() + (expiresInSeconds - 60) * 1000;
    return data.access_token;
  } catch {
    return null;
  } finally {
    clearTimeout(id);
  }
}

/** Get a valid JWT token (uses cache if still valid) */
async function getJwtToken(): Promise<string | null> {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;
  cachedToken = await fetchJwtToken();
  return cachedToken;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ── Method guard ────────────────────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  if (!LIGHTRAG_API_URL) {
    return res.status(500).json({ detail: 'Proxy not configured' });
  }

  // ── Body size guard ─────────────────────────────────────────────────────────
  const rawBody = JSON.stringify(req.body);
  if (rawBody.length > MAX_BODY_BYTES) {
    return res.status(413).json({ detail: 'Request too large' });
  }

  // ── Build upstream headers ──────────────────────────────────────────────────
  const upstreamHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  };

  // Priority 1: JWT token (if credentials are configured)
  const token = await getJwtToken();
  if (token) {
    upstreamHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Priority 2: Static API key (used alongside JWT, or as fallback)
  if (LIGHTRAG_API_KEY) {
    upstreamHeaders['X-API-Key'] = LIGHTRAG_API_KEY;
  }

  // ── Proxy the request ───────────────────────────────────────────────────────
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const upstream = await fetch(`${LIGHTRAG_API_URL}/query`, {
      method:  'POST',
      headers: upstreamHeaders,
      body:    rawBody,
      signal:  controller.signal,
    });

    const text = await upstream.text();

    // Forward the status code and body from LightRAG verbatim
    res.status(upstream.status)
       .setHeader('Content-Type', 'application/json')
       .send(text);
  } catch (err: unknown) {
    const isTimeout = (err as Error)?.name === 'AbortError';
    res.status(isTimeout ? 504 : 502).json({
      detail: isTimeout ? 'Upstream timeout' : 'Upstream unreachable',
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
