import os

os.environ["DEMO_MODE"] = "true"  # tests always run against the mock engine

import pytest
from fastapi.testclient import TestClient

from app.core.store import store
from app.main import app


@pytest.fixture(autouse=True)
def _clean_store():
    store.clear()
    yield
    store.clear()


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)
