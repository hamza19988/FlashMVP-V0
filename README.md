# ⚡ FlashMVP

> Spec, test and deploy full-stack apps to IBM Cloud in one flow, orchestrated by the
> **IBM Bob 2.0** agent engine.

A developer picks a starter template and describes the app. IBM Bob drafts a 3-part
spec (requirements, technical design, tasks). A human approves it. Then the QA pipeline
runs (ESLint, tests, watsonx security scan), the app is deployed as a container fleet
with an isolated Postgres schema, and the dashboard streams live logs and telemetry.

## Quick start

Requirements: **Node 20+**, **Python 3.11+**, Git.

```bash
npm run setup      # venv + Python deps, client deps, .env files
npm run dev        # UI only, demo data      -> http://localhost:5173
npm run dev:full   # UI + API                -> http://localhost:8000/docs
npm run check      # lint + tests + build (what CI runs)
```

| Command | What it does |
| --- | --- |
| `npm run dev:api` / `npm run dev:web` | Start one side only |
| `npm run lint` / `npm run format` | ESLint + Prettier, ruff check + format |
| `npm run test` | Server tests, including client/server contract checks |
| `docker compose up --build` | Full stack in containers |

## Stack

| Layer | Tech |
| --- | --- |
| Client | React 18, Vite, React Router, Recharts, react-markdown, plain CSS (dark glassmorphism, IBM Plex) |
| Server | FastAPI, Pydantic v2, pydantic-settings |
| Agent layer | IBM Bob 2.0 skills in `server/app/bob/` + parallel orchestrator |
| Infra (real mode) | Docker, IBM Cloud Databases for PostgreSQL / Supabase, IBM Secrets Manager, cloudflared |
| Hosting | Vercel (client, demo mode) |

## Project layout

```
client/src/
  app/            routes, layout, route guards, ProjectContext (workflow state)
  api/            one module per domain; the only code that fetches or reads fixtures
  components/     ui/ (shared kit) + one folder per feature
  pages/          one page per route
  hooks/ data/ mocks/ styles/
server/app/
  api/            thin FastAPI routers (all registered in api/__init__.py)
  schemas/        Pydantic contracts - source of truth for every payload
  services/       business logic
  bob/            IBM Bob skills + orchestrator
  core/           settings, errors, in-memory store, fixture loader
  mocks/          demo fixtures
server/templates/ starter templates with flashmvp.json
docs/             PRD, architecture, ADRs, backlogs, team guides
```

## Demo mode vs real engine

| | `VITE_DEMO_MODE` (client/.env) | `DEMO_MODE` (server/.env) |
| --- | --- | --- |
| `true` | UI runs on local fixtures, no server | Skills return fixtures, no Docker/DB/IBM |
| `false` | UI calls the API through the Vite proxy | Real integrations |

Both default to `true`. See [ADR 0002](docs/decisions/0002-dual-mode-execution-strategy.md).

## Team

| | Role | Area |
| --- | --- | --- |
| 🎨 | Person 1 - Lead Frontend & SDD Architect | App shell, UI kit, template selector, spec reviewer, secrets modal |
| 📊 | Person 2 - Interactive QA & Observability | QA canvas, run history, playground, logs, telemetry, xAppHub UI |
| 🤖 | Person 3 - IBM Agent Engine & Core Skills | FastAPI core, Bob orchestrator, SDD + watsonx QA skills |
| ☁️ | Person 4 - IBM Cloud Infra & Skill Pack | DB, vault, tunnels, container fleet, templates, hub API |

## Documentation

| Start here | |
| --- | --- |
| [docs/team/WORKFLOW.md](docs/team/WORKFLOW.md) | Daily routine, branches, PRs, definition of done |
| [docs/team/OWNERSHIP.md](docs/team/OWNERSHIP.md) | Who edits which file |
| [docs/team/CONTRACTS.md](docs/team/CONTRACTS.md) | Endpoint map and how to change a payload |
| [docs/team/WORKING_WITH_BOB.md](docs/team/WORKING_WITH_BOB.md) | Bob modes, slash commands, prompting tips |
| [docs/START_HERE.md](docs/START_HERE.md) | Architecture diagram and backlog map |
| [docs/prd.md](docs/prd.md) | Product requirements |
| [docs/architecture-system-design.md](docs/architecture-system-design.md) | System design |
| [docs/backlogs/README.md](docs/backlogs/README.md) | All backlog items |
| [docs/decisions/](docs/decisions/README.md) | Architecture decision records |
