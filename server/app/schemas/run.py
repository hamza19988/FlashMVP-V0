"""Workflow run history contracts - BL-QA-03 (owner: Person 3, consumer: Person 2)."""

from datetime import datetime

from pydantic import BaseModel

from app.schemas.common import RunStatus
from app.schemas.qa import QAStepResult


class RunRecord(BaseModel):
    run_id: str
    project_id: str
    run_number: int
    status: RunStatus
    triggered_at: datetime
    duration_ms: int
    commit_sha: str | None = None
    qa_steps: list[QAStepResult]
    deployment_url: str | None = None
    env_keys: list[str] = []  # names only, never values


class RunListResponse(BaseModel):
    project_id: str
    runs: list[RunRecord]
