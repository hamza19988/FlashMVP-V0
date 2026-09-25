"""Project lifecycle contracts - BL-INF-01 / BL-ARC-01 (owner: Person 4)."""

from typing import Literal

from pydantic import BaseModel

from app.schemas.manifest import IBMBindings


class ProjectCreateRequest(BaseModel):
    project_id: str
    template: str


class ProjectCreateResponse(BaseModel):
    project_id: str
    schema_name: str  # "app_proj_8f92a"
    execution_time_ms: int
    connection_url: str  # masked
    status: Literal["SUCCESS", "FAILED"]


class ScaffoldRequest(BaseModel):
    project_id: str
    template: str
    prompt: str


class ScaffoldResponse(BaseModel):
    project_id: str
    template: str
    scaffolded_path: str
    ibm_bindings: IBMBindings
    git_initialized: bool
    status: Literal["SUCCESS", "FAILED"]
