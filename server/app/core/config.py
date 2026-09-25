"""Central runtime configuration.

Every module reads settings from here - never call ``os.getenv`` directly.
``settings.demo_mode`` is the single switch between the mock engine and the real engine
(see docs/decisions/0002-dual-mode-execution-strategy.md).
"""

from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

SERVER_ROOT = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=SERVER_ROOT / ".env", env_file_encoding="utf-8", extra="ignore"
    )

    # Execution mode
    demo_mode: bool = True

    # API
    api_port: int = 8000
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    # IBM Bob 2.0
    ibm_bob_api_url: str = ""
    ibm_bob_api_key: str = ""

    # IBM watsonx
    watsonx_api_key: str = ""
    watsonx_project_id: str = ""
    watsonx_url: str = "https://us-south.ml.cloud.ibm.com"

    # Database
    database_url: str = "postgresql://postgres:postgres@localhost:5432/postgres"

    # Vault
    vault_master_key: str = ""

    # Container runner
    workspace_dir: str = "/tmp/flashmvp"
    frontend_host_port: int = 3001
    backend_host_port: int = 8001
    cloudflared_bin: str = "cloudflared"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def templates_dir(self) -> Path:
        return SERVER_ROOT / "templates"

    @property
    def mocks_dir(self) -> Path:
        return SERVER_ROOT / "app" / "mocks"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
