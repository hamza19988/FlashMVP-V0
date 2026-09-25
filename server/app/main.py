"""FlashMVP API entry point.

uvicorn app.main:app --reload --port 8000
Swagger UI: http://localhost:8000/docs
"""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import ROUTERS
from app.core.config import settings
from app.core.errors import register_error_handlers


def create_app() -> FastAPI:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
    app = FastAPI(
        title="FlashMVP API",
        version="0.1.0",
        description="IBM Bob 2.0 middleware proxy - specs, QA, infra and fleet observability.",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    register_error_handlers(app)
    for router in ROUTERS:
        app.include_router(router)

    logging.getLogger("flashmvp").info("Started (DEMO_MODE=%s)", settings.demo_mode)
    return app


app = create_app()
