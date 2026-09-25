---
name: Contract change
about: Propose a change to an API schema shared between client and server
title: "contract: "
labels: contract
---

**Schema file:** server/app/schemas/<file>.py
**Producer (BE owner):** Person N  **Consumer (FE owner):** Person N

### Current shape
```json
```

### Proposed shape
```json
```

### Why
<!-- What breaks or is missing today? -->

### Rollout
- [ ] Schema updated
- [ ] server/app/mocks + client/src/mocks updated (tests/test_contracts.py green)
- [ ] client/src/api/<file>.js updated
- [ ] Consumer notified
