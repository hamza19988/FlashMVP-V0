---
description: Propose or apply a client/server contract change
argument-hint: <schema file and what should change>
---

Contract change request: $ARGUMENTS

Follow `docs/team/CONTRACTS.md`:
1. Show the current Pydantic model and the proposed one. Prefer additive, optional fields.
2. List every file affected: schema, both fixture copies, `client/src/api/<domain>.js`,
   components reading the field, tests.
3. If all affected files belong to my role, apply the change and run `npm run test`.
4. Otherwise, do not edit other people's files. Produce a ready-to-paste issue using
   `.github/ISSUE_TEMPLATE/contract-change.md`.
