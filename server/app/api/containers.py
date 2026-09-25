"""Container fleet endpoints. Owner: Person 4 | BL-PLAY-04."""

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.schemas.container import ContainerListResponse, ContainerStats
from app.services import container_service

router = APIRouter(prefix="/api/v1/projects/{project_id}/containers", tags=["containers"])


@router.get("", response_model=ContainerListResponse)
async def list_containers(project_id: str) -> ContainerListResponse:
    return await container_service.list_containers(project_id)


@router.get("/{container_id}/stats", response_model=ContainerStats)
async def container_stats(project_id: str, container_id: str) -> ContainerStats:
    return await container_service.get_stats(project_id, container_id)


@router.get("/{container_id}/logs")
async def container_logs(project_id: str, container_id: str) -> StreamingResponse:
    return StreamingResponse(
        container_service.stream_logs(project_id, container_id),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
