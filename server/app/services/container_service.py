"""Fleet listing, telemetry and SSE log streaming. Owner: Person 4 (BL-PLAY-04)."""

import asyncio
import json
import random
from collections.abc import AsyncIterator
from datetime import UTC, datetime

from app.core.config import settings
from app.core.errors import not_implemented
from app.core.mocks import load_mock


def _now() -> str:
    return datetime.now(UTC).isoformat()


async def list_containers(project_id: str) -> dict:
    if settings.demo_mode:
        fleet = load_mock("containers_mock.json")
        fleet["project_id"] = project_id
        fleet["network"] = f"net_{project_id}"
        for c in fleet["containers"]:
            c["name"] = f"{project_id}_{c['container_id']}"
        return fleet
    raise not_implemented("Container listing", "BL-PLAY-04")


async def get_stats(project_id: str, container_id: str) -> dict:
    if settings.demo_mode:
        return {
            "container_id": container_id,
            "cpu_percent": round(random.uniform(5.0, 35.0), 1),
            "memory_mb": round(random.uniform(80.0, 256.0), 1),
            "network_rx_kb": round(random.uniform(1, 40), 1),
            "network_tx_kb": round(random.uniform(1, 20), 1),
            "status": "RUNNING",
            "timestamp": _now(),
        }
    # TODO(BL-PLAY-04): docker_client.containers.get(f"{project_id}_{container_id}").stats()
    raise not_implemented("Container stats", "BL-PLAY-04")


async def stream_logs(project_id: str, container_id: str) -> AsyncIterator[str]:
    """Yield SSE frames. Each ``data:`` line is a JSON-encoded ``LogEvent``."""
    if settings.demo_mode:
        for line in load_mock("logs_mock.json"):
            event = {"container_id": container_id, "timestamp": _now(), **line}
            yield f"data: {json.dumps(event)}\n\n"
            await asyncio.sleep(0.4)
        return
    # TODO(BL-PLAY-04): follow docker logs and wrap each line in a LogEvent.
    raise not_implemented("Container log stream", "BL-PLAY-04")
