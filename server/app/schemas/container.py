"""Container fleet contracts - BL-PLAY-04 (owner: Person 4, consumer: Person 2)."""

from typing import Literal

from pydantic import BaseModel

from app.schemas.common import ContainerStatus


class ContainerInfo(BaseModel):
    container_id: str  # "frontend" | "backend"
    name: str  # "proj_8f92a_frontend"
    image: str
    status: ContainerStatus
    host_port: int
    url: str | None = None


class ContainerListResponse(BaseModel):
    project_id: str
    network: str
    containers: list[ContainerInfo]


class ContainerStats(BaseModel):
    container_id: str
    cpu_percent: float
    memory_mb: float
    network_rx_kb: float = 0.0
    network_tx_kb: float = 0.0
    status: ContainerStatus
    timestamp: str  # ISO 8601


class LogEvent(BaseModel):
    """One SSE ``data:`` payload (JSON-encoded) on the logs stream."""

    container_id: str
    timestamp: str
    stream: Literal["stdout", "stderr"]
    message: str
