"""QA step configuration + pipeline trigger. Owner: Person 3 (BL-QA-01/02)."""

from app.bob.skill_watsonx_qa import run_pipeline
from app.core import store as st
from app.core.mocks import load_mock
from app.schemas.qa import QARunResponse, QAStep
from app.services import run_store


def get_steps(project_id: str) -> list[QAStep]:
    steps = st.store.get(st.QA_STEPS, project_id)
    if steps is None:
        # TODO(BL-ARC-02): seed from the project's parsed flashmvp.json instead of the fixture.
        steps = [QAStep(**s) for s in load_mock("qa_steps_mock.json")["steps"]]
        st.store.put(st.QA_STEPS, project_id, steps)
    return sorted(steps, key=lambda s: s.order)


def save_steps(project_id: str, steps: list[QAStep]) -> list[QAStep]:
    ordered = [
        s.model_copy(update={"order": i + 1})
        for i, s in enumerate(sorted(steps, key=lambda s: s.order))
    ]
    return st.store.put(st.QA_STEPS, project_id, ordered)


async def run(project_id: str, only: list[str] | None = None) -> QARunResponse:
    steps = [s for s in get_steps(project_id) if only is None or s.id in only]
    result = await run_pipeline(project_id, steps)
    run_store.record_run(project_id, result)
    return QARunResponse(**result)
