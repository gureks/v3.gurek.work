# Phase 3: Navigation & Page Context - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-26
**Phase:** 03-navigation-page-context
**Areas discussed:** Sidebar Layout & Transitions, Chat History Persistence, Navigation Routing Hierarchy, Page Templates Structure

---

## Sidebar Layout & Transitions

### On mobile (slide-out menu), what should happen to the background chat UI?
- **Option Selected:** Refer Figma navigation component - https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=12-643&m=dev Use Figma MCP
- **Resolved Decision:** Frosted glass effect (backdrop-blur) as specified in Figma `backdrop-blur-[10px]` / `backdrop-blur-[20px]`.

### For the slide-in animations, should we use Framer Motion or pure Tailwind CSS?
- **Option Selected:** Pure Tailwind CSS transitions

### Where should the primary navigation links be positioned within the sidebar?
- **Option Selected:** Refer Figma https://www.figma.com/design/L95Qbm2qizmTPnyWstPwdP/v2.gurek.work?node-id=12-643&m=dev
- **Resolved Decision:** Top aligned.

### Since desktop sidebars stay open (LAY-04), what happens if navigation content overflows?
- **Option Selected:** Custom scrollbar inside sidebar

---

## Chat History Persistence

### Should the chat history persist across browser reloads and closed tabs?
- **Option Selected:** localStorage (Persistent)

### What should happen to the chat history if the user clicks the current active nav link again (e.g. clicking 'Home' while on Home)?
- **Option Selected:** Keep history intact (recommended)

### How many previous messages should be kept in state per page to avoid DOM performance issues?
- **Option Selected:** Keep all messages

---

## Navigation Routing Hierarchy

### Should every route have its own isolated chat history, or is the chat global but aware of the current page?
- **Option Selected:** Global chat with injected context

### When transitioning between pages (e.g., Home to Projects), what should the visual transition look like for the chat feed?
- **Option Selected:** Instant swap

### How should the current page context be communicated to the LightRAG backend to shape responses?
- **Option Selected:** Hidden system prompt prefix

---

## Page Templates Structure

### When navigating to a templated page (like Resume or Projects), how should the content appear in relation to the chat UI?
- **Option Selected:** The content appears within the chat UI. Different UI variants of the chat component are displayed for different sections like Resume, Projects, metrics, timeline, image, etc.. Figma URL will be provided when required.

### For pages that require more visual space (like the FPV Gallery), should the chat UI itself be collapsible?
- **Option Selected:** Fixed chat width

### How should the initial layout content for these pages be sourced?
- **Option Selected:** Hardcoded react components extracted from Figma. Ask for Figma URL when needed.

---
