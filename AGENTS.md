# AGENTS.md - FlashMVP

Instructions for IBM Bob (and any coding agent) working in this repository.
Humans: read `README.md` and `docs/team/` first; this file is the agent-facing summary.

## What this project is

FlashMVP is an IBM Bob 2.0 environment skill pack plus a dashboard. A developer picks a
starter template, IBM Bob drafts a 3-part spec (requirements, design, tasks), a human
approves it, then QA runs and the app is deployed as a container fleet with live logs
and telemetry. Product docs: `docs/prd.md`, `docs/architecture-system-design.md`.

## Repository map

```
client/                React 18 + Vite dashboard (JavaScript, no TypeScript)
  src/app/             routes, shell layout, ProjectContext (shared workflow state)
  src/api/             the ONLY place that talks to the server or reads fixtures
  src/components/<feature>/   one folder per feature, owned by one person
  src/components/ui/   shared UI kit (Button, Modal, StatusBadge, Tabs, ...)
  src/pages/           one thin page per route
  src/mocks/           demo fixtures (validated against server schemas in CI)
server/                FastAPI (Python 3.11)
  app/api/             thin routers, registered in app/api/__init__.py
  app/schemas/         Pydantic contracts - the source of truth for every payload
  app/services/        business logic
  app/bob/             IBM Bob skills (skill_*.py) + orchestrator
  app/mocks/           demo fixtures
  tests/               pytest; test_contracts.py guards fixtures on both sides
docs/backlogs/         one markdown spec per backlog item (BL-*)
docs/team/             ownership, workflow, contracts, how we use Bob
```

## Commands

| Task | Command (repo root) |
| --- | --- |
| First-time setup | `npm run setup` |
| UI only, fixtures | `npm run dev` then open http://localhost:5173 |
| UI + API | `npm run dev:full` (API docs at http://localhost:8000/docs) |
| Lint everything | `npm run lint` |
| Server tests | `npm run test` |
| Everything CI runs | `npm run check` |

## Rules that always apply

1. **Stay in your lane.** Only edit files owned by the current task's owner
   (`docs/team/OWNERSHIP.md`). If a change outside that list is needed, stop and say so
   instead of editing - describe the change so the owner can make it.
2. **Contracts first.** Payload shapes live in `server/app/schemas/*.py`. Never invent a
   field in the client or return an undeclared field from the server. Contract changes
   follow `docs/team/CONTRACTS.md`.
3. **Demo mode must keep working.** Every feature works with `VITE_DEMO_MODE=true`
   (client) and `DEMO_MODE=true` (server). Real integrations go in the non-demo branch.
4. **Components never import fixtures or call fetch.** Use `@/api`.
5. **Server settings come from `app.core.config.settings`**, never `os.getenv`.
6. **Errors** are raised with helpers from `app.core.errors` so every failure has the
   shape `{"detail": str, "code": str}`.
7. **No secrets** in code, fixtures, logs or commits. `.env` files are git-ignored.
8. **Run `npm run check` before declaring a task done.**
9. Keep TODO markers in the form `TODO(BL-XXX-00): ...` so work stays traceable.

More detail: `.bob/rules/`.
