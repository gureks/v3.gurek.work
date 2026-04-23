# Known Pitfalls & Solutions

**Domain:** Conversational AI Portfolio UI
**Date:** 2026-04-23

## ⚠️ Pitfall 1: Streaming Markdown Re-renders
**Problem:** `react-markdown` re-parsing the entire message on every new chunk causes severe lag for long responses.
**Solution:** Throttle state updates (e.g., using a 50ms buffer) or use memoization so only the actively updating message forces a re-render. 

## ⚠️ Pitfall 2: Broken Markdown Syntax during Stream
**Problem:** A code block like ` ```javascript ` arriving in chunks will break rendering until the closing ` ``` ` arrives.
**Solution:** Use robust rehype sanitization or custom rendering rules that gracefully fallback if tags are unclosed.

## ⚠️ Pitfall 3: Auto-scroll Jitter
**Problem:** Forcing `scrollIntoView` on every frame causes the UI to shake uncontrollably.
**Solution:** Implement smooth scrolling logic that only anchors to the bottom if the user hasn't manually scrolled up.

## ⚠️ Pitfall 4: Relying on generic UI frameworks
**Problem:** Trying to bend Tailwind to look like the Figma design when relying on pre-built abstractions.
**Solution:** Build structural components (Button, Input, Sheet) from absolute scratch using raw Tailwind classes, copying styles directly from Figma Dev Mode.
