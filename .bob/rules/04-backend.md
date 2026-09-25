# Backend conventions (server/)

- Layering: `api/` (thin routers) -> `services/` (logic, state) -> `bob/` (skills that
  touch IBM Cloud, Docker, Postgres, cloudflared). Routers contain no business logic.
- Every skill function is `async`, returns a dict or model matching a schema, and has a
  `if settings.demo_mode:` branch that returns fixture-based data.
- Real-engine work that is not built yet raises `not_implemented(feature, "BL-XXX-00")`.
- Config via `from app.core.config import settings`. New settings: add the field to
  `Settings` and the variable to `server/.env.example` in the same change.
- Errors via `app.core.errors` (`not_found`, `bad_request`, `conflict`, `forbidden`).
- State via `app.core.store` with the bucket constants defined there.
- Routers are registered once in `app/api/__init__.py` - already done for all planned
  routers. Add a new route to your existing router file instead of a new file.
- Tests: one file per domain (`tests/test_<domain>.py`), using the `client` fixture.
  Tests always run in demo mode.
- Style: ruff (line length 100). `npm run lint` must be clean.
- Never log secret values. Mask with `skill_secrets_vault.mask()`.
