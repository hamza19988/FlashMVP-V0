"""QA pipeline contracts - BL-QA-01 / BL-QA-02 (owner: Person 3, consumer: Person 2)."""

from pydantic import BaseModel, Field

from app.schemas.common import RunStatus, StepStatus


class QAStep(BaseModel):
    """A node on the QA canvas."""

    id: str
    name: str
    command: str
    order: int
    enabled: bool = True
    custom: bool = False


class QAStepsUpdateRequest(BaseModel):
    steps: list[QAStep] = Field(min_length=1)


class QAStepsResponse(BaseModel):
    project_id: str
    steps: list[QAStep]


class QARunRequest(BaseModel):
    steps: list[str] | None = None  # None = run every enabled step
    project_id: str | None = None


class QAStepResult(BaseModel):
    step_id: str
    step_name: str
    status: StepStatus
    duration_ms: int
    log_output: str


class QARunResponse(BaseModel):
    run_id: str
    project_id: str
    overall_status: RunStatus
    steps: list[QAStepResult]
    deploy_unlocked: bool
