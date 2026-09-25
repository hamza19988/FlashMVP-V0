# Git workflow

- Branch from latest `main`: `p<N>/<backlog-id>-<short-slug>`
  (e.g. `p1/BL-SDD-02-reviewer-tabs`). One backlog item per branch.
- Commit messages: Conventional Commits with scope and backlog id:
  `feat(sdd): BL-SDD-02 add tab switcher`, `fix(api): BL-QA-03 sort runs by number`,
  `contract(qa): BL-QA-02 add enabled flag to QAStep`.
- Small commits. Rebase on `origin/main` before pushing (`/sync`).
- Never commit `.env`, `node_modules`, `.venv`, `dist`, or generated files.
- Never force-push to `main`. Force-push only your own branch after a rebase.
- A task is done when `npm run check` passes and the backlog item's verification
  steps pass in demo mode.
