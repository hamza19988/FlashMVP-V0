---
description: Verify the branch is ready for a pull request
---

1. `git fetch origin && git rebase origin/main`
2. `git diff --stat origin/main...HEAD` - list every changed file and flag any file my
   role does not own according to `docs/team/OWNERSHIP.md`.
3. Run `npm run check`. Fix failures in my own files only.
4. Confirm the feature works with demo mode on (default settings).
5. Search the diff for secrets, `.env` content, `console.log` debugging and absolute
   local paths. Remove them.
6. Update the backlog file's status line and tick the verification steps done.
7. Draft the PR title (Conventional Commit style with backlog id) and a body following
   `.github/pull_request_template.md`.
