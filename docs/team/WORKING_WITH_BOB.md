# Working with IBM Bob

## What is already configured

| File | Purpose |
| --- | --- |
| `AGENTS.md` | Project summary + non-negotiable rules. Loaded by Bob automatically. |
| `.bob/rules/*.md` | Detailed conventions (ownership, contracts, frontend, backend, git, demo mode). Apply in every mode. |
| `.bob/custom_modes.yaml` | One mode per person. Each mode can only edit that person's files. |
| `.bob/commands/*.md` | Slash commands: `/start-task`, `/sync`, `/pre-pr`, `/contract-change`. |
| `.bobignore` | Keeps `node_modules`, venvs, builds and `.env` out of Bob's context. |

Do not run `/init` - it would regenerate `AGENTS.md` and overwrite the team rules.

## Session routine

1. Open the repo root in Bob and select **your** mode.
2. `/sync` if you haven't pulled in the last few hours.
3. `/start-task <BL-ID>` and review the plan before letting Bob write code.
4. Work in small steps; commit whenever something works.
5. `/pre-pr`, open the PR, move to the next item.

## Prompting tips that work well here

- Always name the backlog id: *"Implement BL-QA-01 per its backlog file. Replace the
  FeatureStub in QACanvas.jsx."* Bob will read the spec file with the exact file table.
- Point at the contract: *"Data shape is QAStepsResponse in server/app/schemas/qa.py."*
- Ask for demo mode explicitly when adding a server feature: *"Keep the DEMO_MODE branch
  returning fixture data."*
- When Bob says it needs to edit a file outside your mode, that's the ownership guard
  working. Copy its proposal into the team chat for the owner.

## If Bob does not show the custom modes

The mode file follows the format used by Bob's rules and modes system as documented by
the community. If your Bob version doesn't list the four modes, everything else
(`AGENTS.md`, `.bob/rules/`, commands) still applies. Start each session with:
*"I am Person N. Only edit files listed for Person N in docs/team/OWNERSHIP.md."*
