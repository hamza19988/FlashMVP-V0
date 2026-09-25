"""xAppHub contracts - BL-HUB-01 / BL-HUB-02 (owner: Person 4, consumer: Person 2)."""

from datetime import datetime

from pydantic import BaseModel

from app.schemas.common import ContainerStatus, HubRole


class AppCatalogItem(BaseModel):
    project_id: str
    app_name: str
    template: str
    status: ContainerStatus
    public_url: str | None = None
    deployed_at: datetime
    owner: str
    ibm_region: str


class AccessControlRequest(BaseModel):
    project_id: str
    user_email: str
    role: HubRole


class AccessControlResponse(BaseModel):
    project_id: str
    user_email: str
    role: HubRole
    updated: bool


class AdoptionPoint(BaseModel):
    date: str  # YYYY-MM-DD
    active_users: int
    deployments: int


class HubAnalytics(BaseModel):
    total_apps: int
    running_apps: int
    total_users: int
    series: list[AdoptionPoint]
