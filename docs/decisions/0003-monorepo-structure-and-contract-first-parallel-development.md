# ADR 0003: Monorepo Structure & Contract-First Parallel Development

| Metadata | Details |
| :--- | :--- |
| **Status** | Accepted |
| **Date** | 2026-09-25 |
| **Deciders** | Platform Core Team |
| **Relates To** | ADR 0002, `docs/team/` |

## 1. Context

Four engineers build FlashMVP in a 3-day sprint, each driving their own IBM Bob
session. Without guardrails, parallel agents edit the same files (router registration,
app routes, shared styles), invent payload shapes independently, and block each other
(frontend waiting for backend endpoints).

## 2. Decision

1. **Single repository** with `client/` (React + Vite, JavaScript) and `server/`
   (FastAPI, Python 3.11), plus cross-platform Node scripts at the root.
2. **Strict file ownership.** Each file has one owner (`docs/team/OWNERSHIP.md`),
   enforced by per-person Bob custom modes (`.bob/custom_modes.yaml`) and GitHub
   `CODEOWNERS`.
3. **Pre-wired integration points.** All routes, pages, API client modules, routers and
   services exist from day one as stubs. Feature work fills files in; it never needs to
   register anything in a shared file.
4. **Contract-first.** Pydantic models in `server/app/schemas/` define every payload.
   Demo fixtures on both sides are validated against them in CI
   (`server/tests/test_contracts.py`).
5. **Demo mode as the default dev loop.** With `VITE_DEMO_MODE=true` the client runs on
   fixtures through `src/api`; with `DEMO_MODE=true` the server returns fixtures from
   every skill. No one waits on anyone else's implementation.
6. **Layering.** Client: component -> `@/api` -> server or fixture.
   Server: router -> service -> Bob skill.

## 3. Consequences

* ✅ Feature PRs touch disjoint files; merge conflicts are limited to deliberate
  shared-file changes.
* ✅ Every screen is navigable and demoable from the first commit.
* ✅ Contract drift is caught by CI instead of during integration.
* ⚠️ Fixtures are duplicated (server and client). Accepted: CI validates both copies, and
  duplication keeps the Vercel client build independent of the server folder.
* ⚠️ Shared-file changes need coordination with the owner (Person 1 for client,
  Person 3 for server core).
