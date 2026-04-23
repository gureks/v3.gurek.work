---
phase: 2
plan: 02-01
status: complete
created: 2026-04-24
---

# Plan 02-01 Summary: Chat Store, API Service & Core Components

## What Was Built
All atomic components and infrastructure for the Core Chat UI, aligned to the Figma design system from `design/global.scss` and `design/design-system-reference.md`.

## Key Files Created
| File | Purpose |
|------|---------|
| `frontend/src/services/api.ts` | API service with typed `QueryRequest`/`QueryResponse`, enforces `stream: false` |
| `frontend/src/store/useChatStore.ts` | Zustand store with messages array, loading state, `sendMessage` action, and `conversation_history` passthrough |
| `frontend/src/components/chat/MarkdownRenderer.tsx` | Renders GFM, raw HTML, syntax-highlighted code blocks using `react-markdown` + `remark-gfm` + `rehype-raw` + `react-syntax-highlighter` |
| `frontend/src/components/chat/ChatInput.tsx` | Input area matching Figma: elevated bg, border, shadow-lg, send arrow icon |
| `frontend/src/components/chat/MessageBubble.tsx` | Avatar + bubble layout per Figma (user=elevated bg with accent glow avatar, AI=transparent-alt bg) |
| `frontend/src/components/chat/TypingIndicator.tsx` | Bouncy 3-dot animation with bot avatar using framer-motion |

## Key Files Modified
| File | Change |
|------|--------|
| `frontend/src/index.css` | Replaced with full Figma design tokens (backgrounds, borders, shadows, blur, layout, typography) |
| `frontend/tailwind.config.js` | Extended with all semantic tokens, border-radius, box-shadow, max-width |
| `frontend/package.json` | Added `react-syntax-highlighter` and `@types/react-syntax-highlighter` |

## Decisions Made
- **framer-motion v12 type workaround**: Used `@ts-expect-error` directives for `initial`/`animate` props since `motion-dom` dependency ships without `.d.ts` files. Runtime behavior is correct.
- **AI bubble bg**: Uses `var(--background-elevated-alt)` (rgba(38, 38, 38, 0.40)) matching Figma's AI response bubble style, not solid `#262626`.
- **Inline SVG avatars**: Bot avatar uses a simple person-circle SVG; user avatar shows "AB" initials in accent-colored circle with glow.

## Self-Check: PASSED
- ✅ TypeScript compiles with zero errors (`npx tsc --noEmit`)
- ✅ Vite production build passes
- ✅ Visual verification in browser confirms correct rendering
