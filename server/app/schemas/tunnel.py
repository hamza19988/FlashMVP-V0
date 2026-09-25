"""Cloudflare quick tunnel contracts - BL-PLAY-02 (owner: Person 4)."""

from typing import Literal

from pydantic import BaseModel


class TunnelResponse(BaseModel):
    project_id: str
    public_url: str
    local_port: int
    status: Literal["ACTIVE", "FAILED"]
    stored_in_vault: bool
