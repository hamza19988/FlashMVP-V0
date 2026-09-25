# Daily workflow

## First time

```bash
git clone <repo-url> FlashMVP
cd FlashMVP
npm run setup          # Python venv + deps, client deps, .env files
npm run dev            # UI on http://localhost:5173 with demo data
npm run dev:full       # UI + API (http://localhost:8000/docs)
```

Requirements: Node 20+, Python 3.11+, Git. Docker only for real-engine work (Person 4).

## Starting a task

In IBM Bob, select **your mode** (`p1-frontend-lead`, `p2-qa-observability`,
`p3-agent-engine` or `p4-cloud-infra`), then run:

```
/start-task BL-SDD-02
```

Bob pulls `main`, reads the backlog + design doc, checks ownership, creates
`p1/BL-SDD-02-<slug>` and proposes a plan. Approve the plan, then let it code.

## Staying in sync

Everyone merges into `main` several times a day, so pull often:

```
/sync
```

That rebases your branch on `origin/main` and runs `npm run check`. Do it at least
**every morning, after lunch, and before opening a PR**. Small, frequent rebases are
painless; one big rebase at the end of the day is not.

## Branches and commits

- Branch: `p<N>/<BL-ID>-<slug>` - one backlog item per branch, short-lived (< 1 day).
- Commits: `feat(sdd): BL-SDD-02 add tab switcher`, `fix(qa): ...`,
  `contract(qa): ...`, `docs: ...`, `chore: ...`.
- Never commit `.env`, `node_modules`, `.venv`, `dist`.

## Pull requests

1. Run `/pre-pr` in Bob (rebases, checks ownership, runs `npm run check`).
2. Open the PR; the template asks for the backlog id and a screenshot or API sample.
3. CODEOWNERS requests the right reviewer automatically. One approval is enough, except
   contract changes, which need both the producer and the consumer.
4. **Squash merge.** Delete the branch.

## GitHub settings (lead does this once)

- Branch protection on `main`: require PR, require 1 approval, require status checks
  `Client (lint + build)` and `Server (lint + tests + contracts)`, require branches to be
  up to date, block force pushes.
- Settings -> General -> Pull requests: allow squash merging only, auto-delete branches.
- Replace `@person1`...`@person4` in `.github/CODEOWNERS` with real usernames.

## Definition of done

- Acceptance criteria and verification steps in the backlog file pass.
- Works with default settings (demo mode on both sides).
- `npm run check` is green.
- `<FeatureStub>` wrapper removed from the finished component.
- Backlog file status updated.

## Demo deployment (Vercel)

Project root directory: `client`. Build command `npm run build`, output `dist`.
Environment variable `VITE_DEMO_MODE=true`. `client/vercel.json` already handles
client-side routing.
