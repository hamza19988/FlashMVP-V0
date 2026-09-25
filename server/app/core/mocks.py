"""Loader for demo fixtures in ``app/mocks``.

Fixtures are validated against the Pydantic schemas by ``tests/test_contracts.py``,
so returning them in DEMO_MODE is always contract-safe.
"""

import json
from copy import deepcopy
from functools import lru_cache
from typing import Any

from app.core.config import settings


@lru_cache
def _load(name: str) -> Any:
    path = settings.mocks_dir / name
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def load_mock(name: str) -> Any:
    """Return a deep copy so callers can mutate freely."""
    return deepcopy(_load(name))
