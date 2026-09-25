"""Project lifecycle endpoints. Owner: Person 4 | BL-INF-01, BL-ARC-01, BL-ARC-02."""

from fastapi import APIRouter

from app.bob.skill_cloud_db import provision_schema
from app.core import store as st
from app.core.errors import not_found
from app.schemas.manifest import ParsedManifest
from app.schemas.project import (
    ProjectCreateRequest,
    ProjectCreateResponse,
    ScaffoldRequest,
    ScaffoldResponse,
)
from app.services import manifest_parser, template_service

router = APIRouter(prefix="/api/v1/projects", tags=["projects"])


@router.get("/templates", response_model=list[str])
async def list_templates() -> list[str]:
    return manifest_parser.available_templates()


@router.post("/create", response_model=ProjectCreateResponse)
async def create_project(req: ProjectCreateRequest) -> ProjectCreateResponse:
    return ProjectCreateResponse(**await provision_schema(req.project_id))


@router.post("/scaffold", response_model=ScaffoldResponse)
async def scaffold_project(req: ScaffoldRequest) -> ScaffoldResponse:
    return await template_service.scaffold(req)


@router.post("/{project_id}/parse-manifest", response_model=ParsedManifest)
async def parse_manifest(project_id: str) -> ParsedManifest:
    project = st.store.get(st.PROJECTS, project_id)
    if project is None:
        raise not_found("Project", project_id)
    return manifest_parser.parse(project_id, project["template"])
