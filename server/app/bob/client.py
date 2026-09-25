"""Thin async client for the IBM Bob 2.0 API. Owner: Person 3.

Only used when DEMO_MODE=false. Keep every outbound Bob call behind this class so the
rest of the code base never deals with auth headers or retries.
"""

import httpx

from app.core.config import settings


class IBMBobClient:
    def __init__(self, base_url: str | None = None, api_key: str | None = None):
        self.base_url = (base_url or settings.ibm_bob_api_url).rstrip("/")
        self.api_key = api_key or settings.ibm_bob_api_key

    def _headers(self) -> dict[str, str]:
        return {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}

    async def understand_document(self, prompt: str, template: str, feedback: str | None = None):
        """Call Bob's document understanding endpoint and return the raw SDD payload.

        TODO(BL-SDD-01): confirm the real endpoint path and payload with the Bob API docs.
        """
        if not self.base_url:
            raise RuntimeError("IBM_BOB_API_URL is not configured")
        async with httpx.AsyncClient(timeout=60) as http:
            res = await http.post(
                f"{self.base_url}/v1/understand",
                headers=self._headers(),
                json={"prompt": prompt, "template": template, "feedback": feedback},
            )
            res.raise_for_status()
            return res.json()


bob_client = IBMBobClient()
