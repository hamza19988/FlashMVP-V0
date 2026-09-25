"""Cloudflare quick tunnel manager. Owner: Person 4 (BL-PLAY-02)."""

from app.core import store as st
from app.core.config import settings
from app.core.errors import not_implemented


async def open_tunnel(project_id: str, local_port: int | None = None) -> dict:
    port = local_port or settings.frontend_host_port
    if settings.demo_mode:
        suffix = project_id.split("_")[-1]
        tunnel = {
            "project_id": project_id,
            "public_url": f"https://app-{suffix}.trycloudflare.com",
            "local_port": port,
            "status": "ACTIVE",
            "stored_in_vault": True,
        }
        return st.store.put(st.TUNNELS, project_id, tunnel)
    # TODO(BL-PLAY-02): spawn `cloudflared tunnel --url http://localhost:{port}`, parse the
    # *.trycloudflare.com URL from stderr, store it via skill_secrets_vault.
    raise not_implemented("Cloudflare tunnel", "BL-PLAY-02")
