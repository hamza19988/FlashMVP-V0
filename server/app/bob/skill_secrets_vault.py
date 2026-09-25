"""bob-skill-secrets-vault - encrypted env vars + tunnel URL storage.

Owner: Person 4 | Backlog: BL-INF-02, BL-PLAY-02
"""

from app.core import store as st
from app.core.config import settings
from app.core.mocks import load_mock


def mask(value: str) -> str:
    return f"{value[:3]}****" if len(value) > 6 else "****"


def _seed_demo(project_id: str) -> None:
    if settings.demo_mode and not any(
        s["project_id"] == project_id for s in st.store.all(st.SECRETS)
    ):
        for item in load_mock("secrets_mock.json"):
            item["project_id"] = project_id
            st.store.put(st.SECRETS, f"{project_id}:{item['key']}", item)


async def list_secrets(project_id: str) -> list[dict]:
    _seed_demo(project_id)
    return [s for s in st.store.all(st.SECRETS) if s["project_id"] == project_id]


async def store_secret(project_id: str, key: str, value: str, scope: str) -> dict:
    # TODO(BL-INF-02): encrypt `value` with Fernet(settings.vault_master_key) and persist
    # the ciphertext. Plaintext must never be stored or returned.
    record = {
        "project_id": project_id,
        "key": key,
        "scope": scope,
        "masked_value": mask(value),
        "status": "STORED",
    }
    return st.store.put(st.SECRETS, f"{project_id}:{key}", record)


async def delete_secret(project_id: str, key: str) -> bool:
    _seed_demo(project_id)
    return st.store.delete(st.SECRETS, f"{project_id}:{key}")
