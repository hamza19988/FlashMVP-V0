"""Run history endpoints. Owner: Person 3 | BL-QA-03."""

from fastapi import APIRouter

from app.schemas.run import RunListResponse, RunRecord
from app.services import run_store

router = APIRouter(prefix="/api/v1/projects/{project_id}/runs", tags=["runs"])


@router.get("", response_model=RunListResponse)
async def list_runs(project_id: str) -> RunListResponse:
    return RunListResponse(project_id=project_id, runs=run_store.list_runs(project_id))


@router.get("/{run_id}", response_model=RunRecord)
async def get_run(project_id: str, run_id: str) -> RunRecord:
    return run_store.get_run(project_id, run_id)
