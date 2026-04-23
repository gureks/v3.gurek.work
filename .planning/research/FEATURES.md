# Feature Baseline

**Domain:** Conversational AI Portfolio UI
**Date:** 2026-04-23

## Table Stakes (Must Have)
- **Streaming Chat UI:** Real-time character-by-character rendering of LLM responses via NDJSON streams from `/query/stream`.
- **Markdown Support:** Rendering headings, code blocks, lists, and tables inside chat bubbles.
- **Auto-scroll to bottom:** Viewport follows the new incoming chunks.
- **Light/Dark Mode:** Seamless theme toggling.
- **Mobile Responsiveness:** Fixed chat input at the bottom, slide-out hamburger menu for navigation.

## Differentiating Features (Nice to Have)
- **Interactive Markdown Elements:** Clickable "Gems" or project cards rendered *within* the chat stream.
- **Typing Indicators & Micro-animations:** Framer Motion-driven message appearance (slide up + fade in).
- **Adaptive Layout:** Context-aware sidebars that stay open on desktop but collapse on mobile.
