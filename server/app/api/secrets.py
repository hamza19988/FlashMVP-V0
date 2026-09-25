"""Secrets vault endpoints. Owner: Person 4 | BL-INF-02."""

from fastapi import APIRouter

from app.bob import skill_secrets_vault as vault
from app.core.errors import not_found
from app.schemas.secret import SecretCreateRequest, SecretDeleteResponse, SecretResponse

router = APIRouter(prefix="/api/v1/projects/{project_id}/secrets", tags=["secrets"])


@router.get("", response_model=list[SecretResponse])
async def list_secrets(project_id: str) -> list[SecretResponse]:
    return await vault.list_secrets(project_id)


@router.post("", response_model=SecretResponse)
async def create_secret(project_id: str, req: SecretCreateRequest) -> SecretResponse:
    return await vault.store_secret(project_id, req.key, req.value, req.scope)


@router.delete("/{key}", response_model=SecretDeleteResponse)
async def delete_secret(project_id: str, key: str) -> SecretDeleteResponse:
    if not await vault.delete_secret(project_id, key):
        raise not_found("Secret", key)
    return SecretDeleteResponse(project_id=project_id, key=key, deleted=True)
