"""SDD state machine: generate -> revise* -> approve. Owner: Person 3 (BL-SDD-01/03)."""

import uuid

from app.bob.skill_manifest_parser import parse_prompt_to_sdd
from app.core import store as st
from app.core.errors import not_found
from app.schemas.spec import ApproveResponse, ReviseRequest, SpecGenerateRequest, SpecResponse


def _new_project_id() -> str:
    return f"proj_{uuid.uuid4().hex[:5]}"


def get(project_id: str) -> SpecResponse:
    spec = st.store.get(st.SPECS, project_id)
    if spec is None:
        raise not_found("Spec", project_id)
    return spec


async def generate(req: SpecGenerateRequest) -> SpecResponse:
    project_id = req.project_id or _new_project_id()
    bundle = await parse_prompt_to_sdd(req.prompt, req.template)
    spec = SpecResponse(
        project_id=project_id,
        status="DRAFT",
        requirements=bundle["requirements"],
        design=bundle["design"],
        tasks=bundle["tasks"],
        ibm_bindings=bundle.get("ibm_bindings", {}),
        locked=False,
        version=1,
    )
    st.store.put(
        st.PROJECTS,
        project_id,
        {"project_id": project_id, "template": req.template, "prompt": req.prompt},
    )
    return st.store.put(st.SPECS, project_id, spec)


async def revise(req: ReviseRequest) -> SpecResponse:
    current = get(req.project_id)
    if current.locked:
        return current  # approved specs are immutable (E4 idempotency)
    project = st.store.get(st.PROJECTS, req.project_id) or {}
    bundle = await parse_prompt_to_sdd(
        project.get("prompt", ""), project.get("template", ""), req.feedback
    )
    sections = {"requirements", "design", "tasks"} if "all" in req.sections else set(req.sections)
    data = current.model_dump()
    data.update({k: bundle[k] for k in sections if k in bundle})
    data.update(status="CHANGES_REQUESTED", version=current.version + 1)
    return st.store.put(st.SPECS, req.project_id, SpecResponse(**data))


def approve(project_id: str) -> ApproveResponse:
    current = get(project_id)
    if not current.locked:
        st.store.put(
            st.SPECS, project_id, current.model_copy(update={"status": "APPROVED", "locked": True})
        )
    return ApproveResponse(project_id=project_id, status="APPROVED", locked=True)


def is_approved(project_id: str) -> bool:
    spec = st.store.get(st.SPECS, project_id)
    return bool(spec and spec.locked)
