# API contracts

The frontend and backend are built by different people at the same time. They agree on
**data shapes**, not on implementations. Those shapes are written once, in Pydantic:

```
server/app/schemas/*.py      <- source of truth
server/app/mocks/*.json      <- server demo data   } both validated by
client/src/mocks/*.json      <- client demo data   } server/tests/test_contracts.py
client/src/api/<domain>.js   <- the only client code that knows about URLs
```

Live, browsable version: run `npm run dev:full` and open http://localhost:8000/docs.

## Endpoint map

| Method | Path | Schema | Server owner | Client fn |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/health` | `HealthResponse` | P3 | - |
| POST | `/api/v1/specs/generate` | `SpecGenerateRequest` -> `SpecResponse` | P3 | `specsApi.generate` |
| POST | `/api/v1/specs/revise` | `ReviseRequest` -> `SpecResponse` | P3 | `specsApi.revise` |
| POST | `/api/v1/specs/approve` | `ApproveRequest` -> `ApproveResponse` | P3 | `specsApi.approve` |
| GET | `/api/v1/specs/{project_id}` | `SpecResponse` | P3 | `specsApi.get` |
| GET | `/api/v1/projects/{id}/qa/steps` | `QAStepsResponse` | P3 | `qaApi.getSteps` |
| POST | `/api/v1/projects/{id}/qa/steps` | `QAStepsUpdateRequest` -> `QAStepsResponse` | P3 | `qaApi.saveSteps` |
| POST | `/api/v1/projects/{id}/qa/run` | `QARunRequest` -> `QARunResponse` | P3 | `qaApi.run` |
| GET | `/api/v1/projects/{id}/runs` | `RunListResponse` | P3 | `runsApi.list` |
| GET | `/api/v1/projects/{id}/runs/{run_id}` | `RunRecord` | P3 | `runsApi.get` |
| GET | `/api/v1/projects/templates` | `list[str]` | P4 | `projectsApi.templates` |
| POST | `/api/v1/projects/create` | `ProjectCreateRequest` -> `ProjectCreateResponse` | P4 | `projectsApi.create` |
| POST | `/api/v1/projects/scaffold` | `ScaffoldRequest` -> `ScaffoldResponse` | P4 | - |
| POST | `/api/v1/projects/{id}/parse-manifest` | `ParsedManifest` | P4 | - |
| GET | `/api/v1/projects/{id}/secrets` | `list[SecretResponse]` | P4 | `secretsApi.list` |
| POST | `/api/v1/projects/{id}/secrets` | `SecretCreateRequest` -> `SecretResponse` | P4 | `secretsApi.save` |
| DELETE | `/api/v1/projects/{id}/secrets/{key}` | `SecretDeleteResponse` | P4 | `secretsApi.remove` |
| GET | `/api/v1/projects/{id}/containers` | `ContainerListResponse` | P4 | `containersApi.list` |
| GET | `/api/v1/projects/{id}/containers/{cid}/stats` | `ContainerStats` | P4 | `containersApi.stats` |
| GET | `/api/v1/projects/{id}/containers/{cid}/logs` | SSE, `data:` = `LogEvent` JSON | P4 | `containersApi.subscribeLogs` |
| POST | `/api/v1/projects/{id}/deploy` | `DeployRequest` -> `DeployResponse` | P4 | `projectsApi.deploy` |
| GET | `/api/v1/projects` | `list[AppCatalogItem]` | P4 | `hubApi.catalog` |
| POST | `/api/v1/hub/access` | `AccessControlRequest` -> `AccessControlResponse` | P4 | `hubApi.setAccess` |
| GET | `/api/v1/hub/analytics` | `HubAnalytics` | P4 | `hubApi.analytics` |

Errors always look like `{"detail": "human message", "code": "NOT_FOUND"}`. Codes:
`BAD_REQUEST` 400, `FORBIDDEN` 403 (e.g. deploy before spec approval), `NOT_FOUND` 404,
`CONFLICT` 409 (e.g. deploy after failed QA), `NOT_IMPLEMENTED` 501 (real engine not
built yet), plus FastAPI's own 422 for validation.

## Decisions taken while freezing v1

The backlog drafts disagreed in a few places. These are the resolved versions:

- Spec identifier is `project_id` (not `feature_id`). Status values:
  `DRAFT | CHANGES_REQUESTED | APPROVED`, plus `locked` and `version` fields.
- `/projects/{id}/env` from the architecture doc is replaced by `/projects/{id}/secrets`.
- `project_id` for secrets and QA runs comes from the URL; the body field is optional.
- Log SSE frames carry a JSON `LogEvent`, not a plain text line.
- Spec bindings use `code_engine/cloud_db/...`; manifest bindings use
  `ibm_code_engine/ibm_postgres_db/...` (kept as written in the backlogs).

## Changing a contract

1. Prefer **additive** changes: a new optional field with a default breaks nobody.
2. Open a contract issue (`.github/ISSUE_TEMPLATE/contract-change.md`) or run
   `/contract-change` in Bob. Tag producer and consumer.
3. The producer (backend owner) makes one PR titled `contract(<domain>): ...` with the
   schema, **both** fixture copies and the `client/src/api/<domain>.js` update.
4. `npm run test` must pass - `test_contracts.py` fails if any fixture drifts.
5. The consumer approves the PR, then adapts their components in their own PR.
