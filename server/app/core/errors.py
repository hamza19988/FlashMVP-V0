"""Shared API errors. Every failure reaches the client with the same JSON shape:

    {"detail": "<human readable message>", "code": "<MACHINE_CODE>"}

Raise the helpers below from services/skills; ``register_error_handlers`` does the rest.
"""

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse


class ApiError(Exception):
    def __init__(self, status_code: int, code: str, message: str):
        super().__init__(message)
        self.status_code = status_code
        self.code = code
        self.message = message


def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(ApiError)
    async def _handle(_: Request, exc: ApiError) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code, content={"detail": exc.message, "code": exc.code}
        )


def not_found(what: str, ident: str) -> ApiError:
    return ApiError(status.HTTP_404_NOT_FOUND, "NOT_FOUND", f"{what} '{ident}' not found")


def bad_request(message: str) -> ApiError:
    return ApiError(status.HTTP_400_BAD_REQUEST, "BAD_REQUEST", message)


def conflict(message: str) -> ApiError:
    return ApiError(status.HTTP_409_CONFLICT, "CONFLICT", message)


def forbidden(message: str) -> ApiError:
    return ApiError(status.HTTP_403_FORBIDDEN, "FORBIDDEN", message)


def not_implemented(feature: str, backlog: str) -> ApiError:
    return ApiError(
        status.HTTP_501_NOT_IMPLEMENTED,
        "NOT_IMPLEMENTED",
        f"{feature} is not implemented for the real engine yet ({backlog}). "
        "Run with DEMO_MODE=true or finish the backlog item.",
    )
