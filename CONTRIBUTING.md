# Contributing

1. **Know your files.** Check [docs/team/OWNERSHIP.md](docs/team/OWNERSHIP.md). Edit only
   what your role owns; ask the owner for anything else.
2. **One backlog item per branch:** `p<N>/<BL-ID>-<slug>`, branched from fresh `main`.
3. **Pull often.** Rebase on `origin/main` at least twice a day (`/sync` in Bob).
4. **Commit style:** `feat(qa): BL-QA-01 render step nodes`. Types: `feat`, `fix`,
   `contract`, `refactor`, `docs`, `test`, `chore`.
5. **Contracts:** payload changes follow [docs/team/CONTRACTS.md](docs/team/CONTRACTS.md).
6. **Before a PR:** `npm run check` green, demo mode works, backlog file updated
   (`/pre-pr` in Bob does all of this).
7. **Merge:** squash merge after one approval (two for contract changes).

Full routine: [docs/team/WORKFLOW.md](docs/team/WORKFLOW.md).
