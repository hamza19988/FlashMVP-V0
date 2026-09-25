# Dual-mode execution (ADR 0002)

| Flag | Where | true | false |
| --- | --- | --- | --- |
| `VITE_DEMO_MODE` | client/.env | UI uses `src/mocks` via `src/api`, no server needed (Vercel 24/7 demo) | UI calls FastAPI through the Vite `/api` proxy |
| `DEMO_MODE` | server/.env | skills return fixtures, no Docker/DB/IBM calls | real engine |

- The public demo must never break: any code path reachable in demo mode must not need
  credentials, Docker or network access.
- Demo responses should feel real: small delays (`demo()` helper in `src/api/demo.js`),
  realistic ids (`proj_8f92a`), streaming logs line by line.
