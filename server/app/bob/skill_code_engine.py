"""bob-skill-code-engine - build and run the container fleet.

Owner: Person 4 | Backlog: BL-ARC-01, BL-ARC-03, BL-PLAY-04
"""

from app.core.config import settings
from app.core.errors import not_implemented
from app.core.mocks import load_mock


async def deploy_container_fleet(project_id: str, template: str, env: dict[str, str]) -> dict:
    """Return a dict shaped like ``ContainerListResponse``."""
    if settings.demo_mode:
        fleet = load_mock("containers_mock.json")
        fleet["project_id"] = project_id
        fleet["network"] = f"net_{project_id}"
        for c in fleet["containers"]:
            c["name"] = f"{project_id}_{c['container_id']}"
        return fleet

    # TODO(BL-ARC-03): docker network create net_{project_id}; build Dockerfile.backend and
    # Dockerfile.frontend; run backend on :8001 and frontend on :3001 with env injected.
    raise not_implemented("Container fleet deploy", "BL-ARC-03")
