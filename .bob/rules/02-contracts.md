# API contracts

- `server/app/schemas/*.py` is the single source of truth for request/response shapes.
- The client mirrors each domain in `client/src/api/<domain>.js`; every function there
  returns exactly the schema shape in both demo and real mode.
- Fixtures exist twice: `server/app/mocks/*.json` and `client/src/mocks/*.json`.
  `server/tests/test_contracts.py` validates both against the schemas.
- Changing a schema = changing the contract. In the same change:
  1. update the Pydantic model,
  2. update both fixture copies,
  3. update the matching `client/src/api/<domain>.js`,
  4. run `npm run test`.
  If the other side belongs to someone else, stop after proposing the change and write
  the proposal in the task summary instead of editing their files.
- Additive changes (new optional field with a default) are preferred over renames.
