# Architecture

**Date:** 2026-04-23

## High-Level Pattern
- Client-Server Architecture.
- Single Page Application (SPA) frontend communicating with a FastAPI-driven Python backend.
- The backend serves a core Retrieval-Augmented Generation (RAG) system called LightRAG.

## Data Flow
1. User interacts with React frontend.
2. Frontend sends requests to backend API (FastAPI).
3. Backend performs document processing or queries via LightRAG.
4. LightRAG retrieves embeddings/graph data (using `nano-vectordb`, `networkx`, or external DBs) and queries the LLM provider.
5. Response sent back to frontend.

## Key Boundaries
- `frontend/`: UI layer.
- `LightRAG/lightrag/`: Core RAG logic.
- `LightRAG/lightrag/api/`: API controllers.
