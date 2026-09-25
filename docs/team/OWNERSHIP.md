# File ownership

Every file has exactly one owner. You may **read** anything; you **edit** only what your
role owns. This is what lets four people (and four Bob sessions) work at the same time
without merge conflicts. The same map is enforced by `.bob/custom_modes.yaml` and
reviewed through `.github/CODEOWNERS`.

## Roles and backlog items

| Role | Bob mode | Backlog items |
| --- | --- | --- |
| 🎨 Person 1 - Lead Frontend & SDD Architect | `p1-frontend-lead` | BL-ARC-01 (UI), BL-SDD-02, BL-SDD-03 (UI), BL-INF-02 (UI) |
| 📊 Person 2 - Interactive QA & Observability | `p2-qa-observability` | BL-QA-01 (UI), BL-QA-02, BL-QA-03 (UI), BL-PLAY-01, BL-PLAY-03, BL-PLAY-04 (UI), BL-HUB-01 (UI), BL-HUB-02 |
| 🤖 Person 3 - IBM Agent Engine & Core Skills | `p3-agent-engine` | BL-SDD-01, BL-SDD-03 (API), BL-QA-01 (API), BL-QA-03 (API) |
| ☁️ Person 4 - IBM Cloud Infra & Skill Pack | `p4-cloud-infra` | BL-INF-01, BL-INF-02 (API), BL-ARC-01 (engine), BL-ARC-02, BL-ARC-03, BL-PLAY-02, BL-PLAY-04 (API), BL-HUB-01 (API) |

This follows `docs/backlogs/README.md`, which is more detailed than the summary table in
`docs/START_HERE.md`.

## Client (`client/`)

| Path | Owner |
| --- | --- |
| `src/app/` (routes, AppShell, guards, ProjectContext) | Person 1 (shared) |
| `src/styles/`, `src/components/ui/` | Person 1 (shared) |
| `src/components/shell/`, `src/components/sdd/`, `src/components/infra/` | Person 1 |
| `src/pages/StartPage.jsx`, `SpecPage.jsx`, `NotFoundPage.jsx` | Person 1 |
| `src/hooks/useAsync.js`, `usePolling.js`, `useSpecActions.js` | Person 1 |
| `src/api/http.js`, `demo.js`, `index.js`, `specs.js`, `secrets.js`, `projects.js` | Person 1 |
| `src/config.js`, `main.jsx`, `App.jsx`, `src/data/`, client config files | Person 1 |
| `src/components/qa/`, `playground/`, `telemetry/`, `portal/` | Person 2 |
| `src/pages/QAPage.jsx`, `PlaygroundPage.jsx`, `HubPage.jsx` | Person 2 |
| `src/hooks/useLogStream.js` | Person 2 |
| `src/api/qa.js`, `runs.js`, `containers.js`, `hub.js` | Person 2 |
| `src/mocks/*.json` | owner of the matching server schema (see below) |

## Server (`server/`)

| Path | Owner |
| --- | --- |
| `app/main.py`, `app/core/`, `app/api/__init__.py`, `tests/conftest.py` | Person 3 (shared) |
| `app/bob/client.py`, `orchestrator.py`, `skill_manifest_parser.py`, `skill_watsonx_qa.py` | Person 3 |
| `app/services/spec_generator.py`, `qa_service.py`, `run_store.py` | Person 3 |
| `app/api/specs.py`, `qa.py`, `runs.py` + `app/schemas/spec.py`, `qa.py`, `run.py` | Person 3 |
| mocks: `sdd_mock`, `qa_steps_mock`, `qa_run_mock`, `runs_mock` | Person 3 |
| `app/bob/skill_cloud_db.py`, `skill_secrets_vault.py`, `skill_code_engine.py` | Person 4 |
| `app/services/manifest_parser.py`, `template_service.py`, `container_service.py`, `tunnel_service.py`, `hub_service.py` | Person 4 |
| `app/api/projects.py`, `secrets.py`, `containers.py`, `deploy.py`, `hub.py` | Person 4 |
| `app/schemas/common.py`, `project.py`, `manifest.py`, `secret.py`, `container.py`, `tunnel.py`, `deploy.py`, `hub.py` | Person 4 |
| mocks: `secrets_mock`, `containers_mock`, `logs_mock`, `hub_catalog_mock`, `hub_analytics_mock` | Person 4 |
| `templates/`, `Dockerfile`, `docker-compose.yml` | Person 4 |
| `tests/test_<domain>.py` | owner of that domain (one file each) |
| `requirements*.txt`, `.env.example` | Person 3 and 4 (append-only lines, low conflict) |

## Repo-wide

| Path | Owner |
| --- | --- |
| `AGENTS.md`, `.bob/`, `.github/`, `README.md`, `CONTRIBUTING.md`, `docs/team/` | Person 1 |
| `docs/decisions/` | Person 1 + Person 3 |
| `docs/backlogs/<item>.md` | owner of the item (status updates) |

## Shared files: how to change them

Shared files are already wired for every planned feature, so most people never touch
them. If you need a change (a new field in `ProjectContext`, a new UI kit component, a
new setting in `core/config.py`):

1. Ask the owner in the team chat with the exact change you need.
2. Either they make it, or you open a **tiny, separate PR** containing only that change
   and tag them.
3. Never bundle a shared-file change inside a feature PR.
