"""bob-skill-manifest-parser - prompt + flashmvp.json -> 3-part SDD bundle.

Owner: Person 3 | Backlog: BL-SDD-01, BL-SDD-03
"""

from app.bob.client import bob_client
from app.core.config import settings
from app.core.mocks import load_mock


async def parse_prompt_to_sdd(prompt: str, template: str, feedback: str | None = None) -> dict:
    """Return a dict shaped like ``SpecResponse`` minus ``project_id``/``status``."""
    if settings.demo_mode:
        bundle = load_mock("sdd_mock.json")
        if feedback:
            bundle["requirements"] += f"\n\n> Revision applied: {feedback}"
        return bundle

    # TODO(BL-SDD-01): map the Bob response into requirements/design/tasks/ibm_bindings.
    raw = await bob_client.understand_document(prompt, template, feedback)
    return raw
