"""Deploy contracts - BL-ARC-03 (owner: Person 4)."""

from typing import Literal

from pydantic import BaseModel

from app.schemas.container import ContainerInfo
from app.schemas.tunnel import TunnelResponse


class DeployRequest(BaseModel):
    skip_qa: bool = False


class DeployResponse(BaseModel):
    project_id: str
    status: Literal["DEPLOYED", "FAILED"]
    run_id: str
    network: str
    containers: list[ContainerInfo]
    tunnel: TunnelResponse | None
    execution_time_ms: int
