"""flashmvp.json contracts - BL-ARC-02 (owner: Person 4)."""

from typing import Literal

from pydantic import BaseModel


class IBMBindings(BaseModel):
    ibm_code_engine: bool = True
    ibm_postgres_db: bool = True
    ibm_secrets_manager: bool = True
    ibm_watsonx_qa: bool = True


class ServiceDefinition(BaseModel):
    name: str  # "frontend" | "backend"
    dockerfile: str
    port: int


class QAPipelineStep(BaseModel):
    id: str  # "lint" | "test" | "security"
    name: str
    command: str


class FlashMVPManifest(BaseModel):
    """Raw shape of a template's flashmvp.json file."""

    name: str
    template: str
    database: dict = {}
    ibm_bindings: IBMBindings = IBMBindings()
    services: list[ServiceDefinition]
    qa_pipeline: list[QAPipelineStep]


class ParsedManifest(BaseModel):
    project_id: str
    app_name: str
    template: str
    ibm_bindings: IBMBindings
    services: list[ServiceDefinition]
    qa_pipeline: list[QAPipelineStep]
    status: Literal["VALID", "INVALID"]
