---
description: Pull teammates' latest work into the current branch safely
---

1. Run `git status`. Commit or stash local work first (ask me which).
2. `git fetch origin`
3. `git rebase origin/main`
4. If there are conflicts: list the files. For files my role owns, resolve keeping both
   intents. For files another person owns, take `origin/main`'s version and tell me.
5. If `package.json` or `requirements*.txt` changed upstream, run `npm run setup`.
6. Run `npm run check` and report the result.
