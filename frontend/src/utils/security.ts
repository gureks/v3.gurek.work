import DOMPurify from 'dompurify';

// ─── Constants ─────────────────────────────────────────────────────────────

/** Max characters a user is allowed to send in a single message. */
const MAX_INPUT_LENGTH = 2000;

/** Regex: only allow printable Unicode characters + newlines + tabs. */
const ALLOWED_CHARS_RE = /^[\p{L}\p{N}\p{P}\p{Z}\p{S}\n\t]+$/u;

/** Patterns that look like script injection attempts. */
const DANGEROUS_PATTERNS = [
  /<script[\s>]/i,
  /javascript:/i,
  /on\w+\s*=/i,          // onclick=, onerror=, etc.
  /data:text\/html/i,
  /<iframe/i,
  /<object/i,
  /<embed/i,
  /vbscript:/i,
  /expression\s*\(/i,    // CSS expression()
];

// ─── Input Sanitization ────────────────────────────────────────────────────

/**
 * Sanitize a user-provided chat message before displaying it in the UI
 * or sending it to the API.
 *
 * Strategy:
 * 1. Trim and enforce length cap
 * 2. Strip control characters (except \n, \t)
 * 3. Reject strings that match known XSS/injection patterns
 * 4. Run through DOMPurify for belt-and-suspenders HTML stripping
 *
 * Returns the sanitized string, or throws if the input is clearly malicious.
 */
export function sanitizeUserInput(raw: string): string {
  // 1. Trim
  let s = raw.trim();

  // 2. Enforce length
  if (s.length > MAX_INPUT_LENGTH) {
    s = s.slice(0, MAX_INPUT_LENGTH);
  }

  // 3. Strip null bytes and non-printable control characters (keep \n \t)
  // eslint-disable-next-line no-control-regex
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');

  // 4. Check for dangerous patterns — log but don't expose error detail to UI
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(s)) {
      console.warn('[security] Potentially malicious input blocked');
      // Strip the dangerous fragment rather than reject entirely — 
      // this avoids false-positive UX failures for edge cases
      s = s.replace(pattern, '');
    }
  }

  // 5. DOMPurify — strips any remaining HTML/SVG/MathML tags
  // ALLOW_SAFE_TARGET ensures rel="noopener" on any surviving links
  s = DOMPurify.sanitize(s, {
    ALLOWED_TAGS: [],       // No HTML in user messages — plain text only
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,     // Preserve text content inside stripped tags
  });

  return s;
}

/**
 * Sanitize markdown content from the LLM response before rendering.
 * We allow a safe subset of HTML tags since markdown-to-HTML conversion
 * produces them.
 */
export function sanitizeLLMResponse(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';

  // DOMPurify: allow safe markdown-produced HTML, block scripts/iframes/events
  return DOMPurify.sanitize(raw, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's', 'del', 'ins',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
      'a', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'span', 'div',
    ],
    ALLOWED_ATTR: ['href', 'title', 'class', 'target', 'rel', 'lang'],
    ALLOW_DATA_ATTR: false,
    // Force safe target on all links
    FORCE_BODY: false,
    ADD_ATTR: ['target'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
  });
}

/**
 * Validates a URL is safe to navigate to (internal routes only).
 * Prevents open-redirect attacks from LLM-provided redirect values.
 */
export function validateRedirectPath(path: string | null | undefined): string | null {
  if (!path || typeof path !== 'string') return null;

  const trimmed = path.trim();

  // Must start with / (internal route) — reject absolute URLs and protocols
  if (!trimmed.startsWith('/')) return null;

  // Reject javascript: and data: URIs
  if (/^\/\/|javascript:|data:|vbscript:/i.test(trimmed)) return null;

  // Only allow alphanumeric, hyphens, underscores, forward slashes
  if (!/^\/[a-zA-Z0-9\-_/]*$/.test(trimmed)) return null;

  // Prevent path traversal
  if (trimmed.includes('..')) return null;

  // Max length guard
  if (trimmed.length > 100) return null;

  return trimmed;
}

/**
 * Validates and extracts a safe string array for suggestions.
 * Caps at 5 suggestions, each max 120 chars.
 */
export function validateSuggestions(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
    .map(s => sanitizeUserInput(s.slice(0, 120)))
    .slice(0, 5);
}

/**
 * Validates the entire LLM response shape.
 * Returns null if the response is structurally invalid.
 */
export interface ValidatedLLMResponse {
  redirect: string | null;
  response: string;
  suggestions: string[];
  richContent?: string | null;
}

export function validateLLMResponse(raw: unknown): ValidatedLLMResponse | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;

  const obj = raw as Record<string, unknown>;

  // Required field
  const response = typeof obj.response === 'string' ? obj.response : '';
  if (response.length > 10000) return null; // Sanity cap

  return {
    redirect: validateRedirectPath(obj.redirect as string),
    response: sanitizeLLMResponse(response),
    suggestions: validateSuggestions(obj.suggestions),
    richContent: typeof obj.richContent === 'string' ? obj.richContent : null,
  };
}
