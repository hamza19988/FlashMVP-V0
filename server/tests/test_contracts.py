"""Every demo fixture - server AND client - must satisfy the Pydantic contracts.

If this test fails after you changed a schema, update the fixtures on both sides
(server/app/mocks and client/src/mocks) in the same PR.
"""

import json
from pathlib import Path

import pytest
from pydantic import TypeAdapter

from app.schemas.container import ContainerListResponse
from app.schemas.hub import AppCatalogItem, HubAnalytics
from app.schemas.qa import QARunResponse, QAStepsResponse
from app.schemas.run import RunListResponse
from app.schemas.secret import SecretResponse
from app.schemas.spec import SpecResponse

REPO = Path(__file__).resolve().parents[2]
MOCK_DIRS = [REPO / "server" / "app" / "mocks", REPO / "client" / "src" / "mocks"]

CONTRACTS = {
    "sdd_mock.json": SpecResponse,
    "secrets_mock.json": list[SecretResponse],
    "qa_steps_mock.json": QAStepsResponse,
    "qa_run_mock.json": QARunResponse,
    "runs_mock.json": RunListResponse,
    "containers_mock.json": ContainerListResponse,
    "hub_catalog_mock.json": list[AppCatalogItem],
    "hub_analytics_mock.json": HubAnalytics,
}


@pytest.mark.parametrize("mock_dir", MOCK_DIRS, ids=lambda p: p.parent.name)
@pytest.mark.parametrize("name,model", CONTRACTS.items(), ids=list(CONTRACTS))
def test_fixture_matches_contract(mock_dir, name, model):
    path = mock_dir / name
    if not path.exists():
        pytest.skip(f"{path} not present")
    TypeAdapter(model).validate_python(json.loads(path.read_text(encoding="utf-8")))
