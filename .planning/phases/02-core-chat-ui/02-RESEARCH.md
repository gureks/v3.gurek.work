# Phase 2: Core Chat UI - Research

**Gathered:** 2026-04-24

## Objective
Research how to implement the standard request/response cycle for the Core Chat UI, interacting with the local LightRAG backend.

## Findings

### LightRAG API Integration
Based on the Swagger/OpenAPI spec from `http://localhost:9621/openapi.json`:
- **Endpoint**: `POST /query`
- **Request Payload (`QueryRequest`)**:
  - `query` (string, required): The user's query text.
  - `mode` (string): Defaults to `"mix"`. Acceptable values include `"local"`, `"global"`, `"hybrid"`, `"naive"`, `"mix"`, `"bypass"`.
  - `conversation_history` (array of objects): Used for maintaining conversation context. Format: `[{'role': 'user' | 'assistant', 'content': '...'}]`. Note: only sent to LLM for context, not used for retrieval.
  - `stream` (boolean): Defaults to `true`. For Phase 2 (CHAT-01), we **must** explicitly pass `"stream": false` to ensure a standard JSON response.
  - `include_references` (boolean): Defaults to `true`.
  - `user_prompt` (string): Can be passed from the frontend for templated prompt injection.

- **Response Payload (`QueryResponse`)**:
  - Returns a JSON object with:
    - `response` (string, required): The generated response text (markdown/HTML block).
    - `references` (array): Only included if `include_references` is true. Contains source references with `reference_id` and `file_path`.

### Frontend Markdown Rendering Architecture
- **react-markdown**: Handles the base Markdown parsing.
- **remark-gfm**: Required for GitHub Flavored Markdown (tables, strikethrough, tasklists).
- **rehype-raw**: Required to parse raw HTML that may be embedded within the Markdown response.
- **react-syntax-highlighter**: For rendering styled code blocks. This is vital for code snippets returned by the LLM.

### Animation and Scroll Strategies
- **Loading State (CHAT-06)**: Use Framer Motion (`framer-motion`) to build a bouncy/skeleton loading indicator. Once `response` is available, unmount the loader and render the Markdown block.
- **Fade In (CHAT-06)**: Since streaming is disabled, apply an initial fade-in or slide-up animation to the final Markdown component using Framer Motion.
- **Scroll Behavior (CHAT-03)**: Utilize a `useEffect` hooked into the messages list or `response` state that calls `scrollIntoView({ behavior: 'smooth' })` on a dummy element (`div`) at the bottom of the chat view.

## Integration Blueprint
1. User types in chat input and hits enter.
2. The user's message is immediately added to the Zustand state.
3. A skeleton/bouncy loader appears (driven by a loading flag in Zustand).
4. A direct `fetch` POST request is made to `http://localhost:9621/query`:
   ```json
   {
     "query": "User's message",
     "mode": "mix",
     "stream": false,
     "conversation_history": [ ... ]
   }
   ```
5. Upon receiving the `QueryResponse`, the Markdown block is appended to the message state as an `assistant` message.
6. The loader unmounts, and the markdown block animates into view.
7. The container auto-scrolls to the newly rendered message.

## Conclusion
The backend is well-suited for the non-streaming approach; we just need to ensure `"stream": false` is passed. The frontend can safely utilize direct `fetch`, Zustand, `react-markdown`, and `framer-motion` to fulfill the requirements cleanly.
