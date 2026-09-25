"""One-click deploy. Owner: Person 4 | BL-ARC-03 (uses Person 3's orchestrator).

Gate order: spec approved (403) -> QA passed (409) -> swarm: DB + fleet + tunnel.
"""

from fastapi import APIRouter

from app.bob import skill_cloud_db, skill_code_engine
from app.bob.orchestrator import run_swarm
from app.core import store as st
from app.core.errors import conflict, forbidden
from app.schemas.deploy import DeployRequest, DeployResponse
from app.services import qa_service, spec_generator, tunnel_service

router = APIRouter(prefix="/api/v1/projects/{project_id}", tags=["deploy"])


@router.post("/deploy", response_model=DeployResponse)
async def deploy(project_id: str, req: DeployRequest | None = None) -> DeployResponse:
    req = req or DeployRequest()
    if not spec_generator.is_approved(project_id):
        raise forbidden("Specs not approved")

    qa = await qa_service.run(project_id) if not req.skip_qa else None
    if qa and qa.overall_status != "PASSED":
        raise conflict("QA pipeline failed - deploy blocked")

    project = st.store.get(st.PROJECTS, project_id) or {}
    report = await run_swarm(
        {
            "db": skill_cloud_db.provision_schema(project_id),
            "fleet": skill_code_engine.deploy_container_fleet(
                project_id, project.get("template", "react-fastapi"), env={}
            ),
            "tunnel": tunnel_service.open_tunnel(project_id),
        }
    )
    fleet = report.get("fleet") or {"network": f"net_{project_id}", "containers": []}
    return DeployResponse(
        project_id=project_id,
        status="DEPLOYED" if report.ok else "FAILED",
        run_id=qa.run_id if qa else "skipped",
        network=fleet["network"],
        containers=fleet["containers"],
        tunnel=report.get("tunnel"),
        execution_time_ms=max((r.duration_ms for r in report.results), default=0),
    )
