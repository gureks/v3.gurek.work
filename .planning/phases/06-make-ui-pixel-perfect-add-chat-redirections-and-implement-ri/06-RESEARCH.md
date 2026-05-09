# Phase 06: Make UI pixel-perfect, add chat redirections, and implement Rich Component Templating - Research

## RESEARCH COMPLETE

### Current State
- Chat framework exists but requires enhanced rich-component rendering for AI messages.
- Routing mechanism (`chat.ts`) handles navigation but needs expansion.

### Technical Approach
1. **Rich Component Rendering**: Update the frontend `ChatBubble` or `MessageContent` components to conditionally render React components based on message payload or intent (e.g. `type: 'skills-carousel'`, `type: 'experience-timeline'`).
2. **Chat.ts Redirection logic**: Map AI intents to specific page redirects. Update the list of supported routes and triggers.
3. **Figma Integration Workflow**: For each complex layout segment (Tools, Skills, Experience), run `get_design_context` on the exact node IDs (e.g., `373:453` for Tools, `373:321` for Skills, `373:1445` for Experience) during implementation.

### Validation Strategy
- UI implementation matches Figma screenshot pixel-perfectly.
- All routing triggers in `chat.ts` function properly without errors.
- No dummy text or missing assets (all assets pulled via Figma MCP).
