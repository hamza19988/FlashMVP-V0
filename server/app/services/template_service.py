"""Starter template scaffolder. Owner: Person 4 (BL-ARC-01)."""

from pathlib import Path

from app.core.config import settings
from app.core.errors import not_implemented
from app.schemas.project import ScaffoldRequest, ScaffoldResponse
from app.services.manifest_parser import load_template_manifest


async def scaffold(req: ScaffoldRequest) -> ScaffoldResponse:
    manifest = load_template_manifest(req.template)
    target = Path(settings.workspace_dir) / req.project_id
    if settings.demo_mode:
        return ScaffoldResponse(
            project_id=req.project_id,
            template=req.template,
            scaffolded_path=str(target),
            ibm_bindings=manifest.ibm_bindings,
            git_initialized=True,
            status="SUCCESS",
        )
    # TODO(BL-ARC-01): copy templates/<template>/ to target, write flashmvp.json with the
    # project schema, `git init`, first commit.
    raise not_implemented("Template scaffolder", "BL-ARC-01")
