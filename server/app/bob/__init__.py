"""IBM Bob 2.0 environment skill pack.

Each ``skill_*.py`` module is one Bob skill with a DEMO_MODE branch and a real branch.
Skills never import FastAPI - they are plain async functions so the Bob orchestrator,
the routers and the tests can all call them.

| Module                    | Skill id                    | Owner    |
|---------------------------|-----------------------------|----------|
| skill_manifest_parser.py  | bob-skill-manifest-parser   | Person 3 |
| skill_watsonx_qa.py       | bob-skill-watsonx-qa        | Person 3 |
| orchestrator.py / client  | Bob agent swarm manager     | Person 3 |
| skill_cloud_db.py         | bob-skill-cloud-db          | Person 4 |
| skill_secrets_vault.py    | bob-skill-secrets-vault     | Person 4 |
| skill_code_engine.py      | bob-skill-code-engine       | Person 4 |
"""
