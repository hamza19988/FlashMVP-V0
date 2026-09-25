"""bob-skill-watsonx-qa - ESLint, Pytest and watsonx security audit.

Owner: Person 3 | Backlog: BL-QA-01
"""

import uuid

from app.core.config import settings
from app.core.errors import not_implemented
from app.core.mocks import load_mock
from app.schemas.qa import QAStep


async def run_pipeline(project_id: str, steps: list[QAStep]) -> dict:
    """Run enabled steps in order and stop at the first failure (E1 in the QA design doc).

    Returns a dict shaped like ``QARunResponse``.
    """
    if settings.demo_mode:
        run = load_mock("qa_run_mock.json")
        run["project_id"] = project_id
        run["run_id"] = f"run-{uuid.uuid4().hex[:6]}"
        known = {s["step_id"] for s in run["steps"]}
        for step in steps:
            if step.enabled and step.id not in known:
                run["steps"].append(
                    {
                        "step_id": step.id,
                        "step_name": step.name,
                        "status": "PASSED",
                        "duration_ms": 1500,
                        "log_output": f"$ {step.command}\nok",
                    }
                )
        return run

    # TODO(BL-QA-01): execute each command inside the project sandbox, capture output,
    # call watsonx for the security step, halt on first non-zero exit code.
    raise not_implemented("QA pipeline executor", "BL-QA-01")
