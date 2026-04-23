# Concerns & Tech Debt

**Date:** 2026-04-23

## Known Issues / Tech Debt
- **Deployment**: Local and offline storage options are extensive; ensuring parity between different vector DB backends might be complex.
- **Frontend/Backend Synchronization**: Need to ensure API contracts between the Vite app and FastAPI are well-documented and type-safe (no shared schema generation seen yet).
- **Fork-safety**: `docling` processing engines have known issues on macOS due to lack of fork-safety with Objective-C frameworks in multi-worker Gunicorn.
