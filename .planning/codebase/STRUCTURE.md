# Directory Structure

**Date:** 2026-04-23

## Root (`/`)
- `frontend/`: React + Vite web application.
  - `src/`: Source code for React application.
  - `public/`: Static assets.
  - `package.json`, `vite.config.ts`, `tailwind.config.js`.
- `LightRAG/`: Python backend and core library.
  - `lightrag/`: Core logic and API (`api/`).
  - `examples/`: Usage examples.
  - `tests/`: Python tests.
  - `pyproject.toml`: Python dependencies and metadata.
  - `Dockerfile`, `docker-compose.yml`: Containerization.
