"""Process-local in-memory store shared by all services.

Good enough for the hackathon (single uvicorn worker). Swap for Postgres later
without touching routers: services are the only callers.
"""

from threading import Lock
from typing import Any


class MemoryStore:
    def __init__(self) -> None:
        self._data: dict[str, dict[str, Any]] = {}
        self._lock = Lock()

    def get(self, bucket: str, key: str) -> Any | None:
        return self._data.get(bucket, {}).get(key)

    def put(self, bucket: str, key: str, value: Any) -> Any:
        with self._lock:
            self._data.setdefault(bucket, {})[key] = value
        return value

    def delete(self, bucket: str, key: str) -> bool:
        with self._lock:
            return self._data.get(bucket, {}).pop(key, None) is not None

    def all(self, bucket: str) -> list[Any]:
        return list(self._data.get(bucket, {}).values())

    def clear(self) -> None:
        with self._lock:
            self._data.clear()


store = MemoryStore()

# Bucket names - use these constants, never raw strings.
SPECS = "specs"
PROJECTS = "projects"
SECRETS = "secrets"
RUNS = "runs"
QA_STEPS = "qa_steps"
TUNNELS = "tunnels"
ACCESS = "access"
