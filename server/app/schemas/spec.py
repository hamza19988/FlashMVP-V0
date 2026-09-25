"""SDD contracts - BL-SDD-01 / BL-SDD-03 (owner: Person 3, consumer: Person 1)."""

from typing import Literal

from pydantic import BaseModel, Field

SpecStatus = Literal["DRAFT", "CHANGES_REQUESTED", "APPROVED"]
SpecSection = Literal["requirements", "design", "tasks", "all"]


class TaskItem(BaseModel):
    id: str  # "task-001"
    description: str
    completed: bool = False


class IBMToolBinding(BaseModel):
    code_engine: bool = True
    cloud_db: bool = True
    secrets_vault: bool = True
    watsonx_qa: bool = True


class SpecGenerateRequest(BaseModel):
    prompt: str = Field(min_length=1)
    template: str  # "react-fastapi" | "nextjs-go"
    project_id: str | None = None  # server generates one when omitted


class SpecResponse(BaseModel):
    project_id: str
    status: SpecStatus
    requirements: str  # Markdown
    design: str  # Markdown
    tasks: list[TaskItem]
    ibm_bindings: IBMToolBinding
    locked: bool = False
    version: int = 1


class ReviseRequest(BaseModel):
    project_id: str
    feedback: str = Field(min_length=1)
    sections: list[SpecSection] = ["all"]


class ApproveRequest(BaseModel):
    project_id: str


class ApproveResponse(BaseModel):
    project_id: str
    status: Literal["APPROVED"]
    locked: bool
