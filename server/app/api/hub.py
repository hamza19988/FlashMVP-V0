"""xAppHub endpoints. Owner: Person 4 | BL-HUB-01."""

from fastapi import APIRouter

from app.schemas.hub import (
    AccessControlRequest,
    AccessControlResponse,
    AppCatalogItem,
    HubAnalytics,
)
from app.services import hub_service

router = APIRouter(prefix="/api/v1", tags=["hub"])


@router.get("/projects", response_model=list[AppCatalogItem])
async def catalog() -> list[AppCatalogItem]:
    return await hub_service.catalog()


@router.post("/hub/access", response_model=AccessControlResponse)
async def set_access(req: AccessControlRequest) -> AccessControlResponse:
    return await hub_service.set_access(req.project_id, req.user_email, req.role)


@router.get("/hub/analytics", response_model=HubAnalytics)
async def analytics() -> HubAnalytics:
    return await hub_service.analytics()
