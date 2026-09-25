"""Secrets vault contracts - BL-INF-02 (owner: Person 4, consumer: Person 1).

project_id comes from the URL path; it is accepted (optional) in the body for
backwards compatibility with the backlog draft.
"""

from typing import Literal

from pydantic import BaseModel, Field

from app.schemas.common import SecretScope


class SecretCreateRequest(BaseModel):
    key: str = Field(min_length=1, pattern=r"^[A-Z_][A-Z0-9_]*$")
    value: str = Field(min_length=1)
    scope: SecretScope = "ALL"
    project_id: str | None = None


class SecretResponse(BaseModel):
    project_id: str
    key: str
    scope: SecretScope
    masked_value: str  # "sk-****"
    status: Literal["STORED"]


class SecretDeleteResponse(BaseModel):
    project_id: str
    key: str
    deleted: bool
