"""flashmvp.json reader/validator. Owner: Person 4 (BL-ARC-02)."""

import json

from pydantic import ValidationError

from app.core.config import settings
from app.core.errors import bad_request, not_found
from app.schemas.manifest import FlashMVPManifest, ParsedManifest


def available_templates() -> list[str]:
    return sorted(
        p.name for p in settings.templates_dir.iterdir() if (p / "flashmvp.json").exists()
    )


def load_template_manifest(template: str) -> FlashMVPManifest:
    path = settings.templates_dir / template / "flashmvp.json"
    if not path.exists():
        raise not_found("Template", template)
    try:
        return FlashMVPManifest(**json.loads(path.read_text(encoding="utf-8")))
    except (ValidationError, json.JSONDecodeError) as exc:
        raise bad_request(f"Invalid flashmvp.json for {template}: {exc}") from exc


def parse(project_id: str, template: str) -> ParsedManifest:
    m = load_template_manifest(template)
    return ParsedManifest(
        project_id=project_id,
        app_name=m.name,
        template=m.template,
        ibm_bindings=m.ibm_bindings,
        services=m.services,
        qa_pipeline=m.qa_pipeline,
        status="VALID",
    )
