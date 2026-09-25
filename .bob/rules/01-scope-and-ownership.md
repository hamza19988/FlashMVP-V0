# Scope and ownership

- Four people build this in parallel, each with their own IBM Bob session. Merge
  conflicts are the main risk, so file ownership is strict.
- Before editing, identify the backlog item (BL-*) and its owner. The ownership map is
  `docs/team/OWNERSHIP.md`. Custom modes in `.bob/custom_modes.yaml` enforce it.
- Shared files (`client/src/app/routes.jsx`, `client/src/app/ProjectContext.jsx`,
  `client/src/api/index.js`, `server/app/api/__init__.py`, `server/app/main.py`,
  `server/app/core/*`) are pre-wired. Do not edit them unless the task is explicitly
  about them. If you truly need to, keep the diff to a few lines and call it out.
- Never reformat, rename or "tidy up" files you were not asked to change.
- New files go inside the owner's folders. Name them after the backlog spec's file table.
