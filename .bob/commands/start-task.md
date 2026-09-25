---
description: Start a backlog item on a fresh branch
argument-hint: <BL-ID, e.g. BL-SDD-02>
---

Start work on backlog item $ARGUMENTS.

1. Run `git status`. If there are uncommitted changes, stop and ask what to do.
2. Run `git fetch origin && git switch main && git pull --ff-only`.
3. Find the backlog file for $ARGUMENTS under `docs/backlogs/` and the matching
   `00-design-*.md` in the same feature folder. Read both fully.
4. Check `docs/team/OWNERSHIP.md`: confirm the item belongs to the role of the current
   mode. If not, stop and say who owns it.
5. Create the branch `p<N>/$ARGUMENTS-<short-slug>`.
6. Read the existing stub files the backlog lists (they already exist with TODO markers)
   and the schema in `server/app/schemas/` that the feature uses.
7. Reply with a short plan: files you will change, contract fields you depend on,
   anything you need from another person. Wait for approval before coding.
