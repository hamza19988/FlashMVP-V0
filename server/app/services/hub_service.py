"""xAppHub catalog, RBAC and analytics. Owner: Person 4 (BL-HUB-01)."""

from app.core import store as st
from app.core.config import settings
from app.core.errors import not_implemented
from app.core.mocks import load_mock


async def catalog() -> list[dict]:
    if settings.demo_mode:
        return load_mock("hub_catalog_mock.json")
    raise not_implemented("App catalog", "BL-HUB-01")


async def set_access(project_id: str, user_email: str, role: str) -> dict:
    st.store.put(st.ACCESS, f"{project_id}:{user_email}", role)
    return {"project_id": project_id, "user_email": user_email, "role": role, "updated": True}


async def analytics() -> dict:
    if settings.demo_mode:
        return load_mock("hub_analytics_mock.json")
    raise not_implemented("Adoption analytics", "BL-HUB-01")
