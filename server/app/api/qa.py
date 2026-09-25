"""QA pipeline endpoints. Owner: Person 3 | BL-QA-01, BL-QA-02."""

from fastapi import APIRouter

from app.schemas.qa import QARunRequest, QARunResponse, QAStepsResponse, QAStepsUpdateRequest
from app.services import qa_service

router = APIRouter(prefix="/api/v1/projects/{project_id}/qa", tags=["qa"])


@router.get("/steps", response_model=QAStepsResponse)
async def get_steps(project_id: str) -> QAStepsResponse:
    return QAStepsResponse(project_id=project_id, steps=qa_service.get_steps(project_id))


@router.post("/steps", response_model=QAStepsResponse)
async def save_steps(project_id: str, req: QAStepsUpdateRequest) -> QAStepsResponse:
    return QAStepsResponse(
        project_id=project_id, steps=qa_service.save_steps(project_id, req.steps)
    )


@router.post("/run", response_model=QARunResponse)
async def run_qa(project_id: str, req: QARunRequest | None = None) -> QARunResponse:
    return await qa_service.run(project_id, req.steps if req else None)
