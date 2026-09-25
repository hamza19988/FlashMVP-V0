"""SDD endpoints. Owner: Person 3 | BL-SDD-01, BL-SDD-03."""

from fastapi import APIRouter

from app.schemas.spec import (
    ApproveRequest,
    ApproveResponse,
    ReviseRequest,
    SpecGenerateRequest,
    SpecResponse,
)
from app.services import spec_generator

router = APIRouter(prefix="/api/v1/specs", tags=["specs"])


@router.post("/generate", response_model=SpecResponse)
async def generate_spec(req: SpecGenerateRequest) -> SpecResponse:
    return await spec_generator.generate(req)


@router.post("/revise", response_model=SpecResponse)
async def revise_spec(req: ReviseRequest) -> SpecResponse:
    return await spec_generator.revise(req)


@router.post("/approve", response_model=ApproveResponse)
async def approve_spec(req: ApproveRequest) -> ApproveResponse:
    return spec_generator.approve(req.project_id)


@router.get("/{project_id}", response_model=SpecResponse)
async def get_spec(project_id: str) -> SpecResponse:
    return spec_generator.get(project_id)
