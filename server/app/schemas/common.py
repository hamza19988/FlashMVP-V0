from typing import Literal

from pydantic import BaseModel

ContainerStatus = Literal["RUNNING", "HEALTHY", "STOPPED", "CRASHED", "EXITED", "RESTARTING"]
RunStatus = Literal["PASSED", "FAILED", "RUNNING"]
StepStatus = Literal["PASSED", "FAILED", "SKIPPED", "RUNNING", "PENDING"]
SecretScope = Literal["ALL", "FRONTEND", "BACKEND"]
HubRole = Literal["Super Admin", "Developer", "Viewer", "Revoked"]
TemplateId = Literal["react-fastapi", "nextjs-go"]


class HealthResponse(BaseModel):
    status: Literal["ok"] = "ok"
    demo_mode: bool
    version: str
