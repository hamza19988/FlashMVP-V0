"""bob-skill-cloud-db - isolated Postgres schema per project in < 200ms.

Owner: Person 4 | Backlog: BL-INF-01
"""

import re
import time

from app.core.config import settings
from app.core.errors import bad_request, not_implemented

_SAFE_ID = re.compile(r"^[a-z0-9_]{3,40}$")


def schema_name_for(project_id: str) -> str:
    if not _SAFE_ID.match(project_id):
        raise bad_request("project_id must match ^[a-z0-9_]{3,40}$")
    return f"app_{project_id}"


async def provision_schema(project_id: str) -> dict:
    """Return a dict shaped like ``ProjectCreateResponse``."""
    schema = schema_name_for(project_id)
    if settings.demo_mode:
        return {
            "project_id": project_id,
            "schema_name": schema,
            "execution_time_ms": 180,
            "connection_url": "postgresql://****@db.example.internal:5432/postgres",
            "status": "SUCCESS",
        }

    start = time.perf_counter()
    # TODO(BL-INF-01): psycopg async connection -> CREATE SCHEMA IF NOT EXISTS {schema};
    # apply RLS policies; return real timing.
    _ = start
    raise not_implemented("Cloud DB schema provisioner", "BL-INF-01")
