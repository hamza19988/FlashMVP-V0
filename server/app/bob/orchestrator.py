"""IBM Bob agent swarm manager. Owner: Person 3.

Runs independent skills in parallel (Alpha: DB, Beta: QA, Gamma: containers,
Delta: vault/tunnel) and reports each result. Callers pass coroutines; the
orchestrator owns timing, error isolation and ordering of the report.
"""

import asyncio
import time
from collections.abc import Awaitable
from dataclasses import dataclass, field
from typing import Any


@dataclass
class SubagentResult:
    name: str
    ok: bool
    duration_ms: int
    result: Any = None
    error: str | None = None


@dataclass
class SwarmReport:
    results: list[SubagentResult] = field(default_factory=list)

    @property
    def ok(self) -> bool:
        return all(r.ok for r in self.results)

    def get(self, name: str) -> Any:
        return next((r.result for r in self.results if r.name == name), None)


async def _timed(name: str, job: Awaitable[Any]) -> SubagentResult:
    start = time.perf_counter()

    def elapsed() -> int:
        return int((time.perf_counter() - start) * 1000)

    try:
        return SubagentResult(name, True, elapsed(), await job)
    except Exception as exc:  # a failing subagent must not kill the swarm
        return SubagentResult(name, False, elapsed(), error=str(exc))


async def run_swarm(jobs: dict[str, Awaitable[Any]]) -> SwarmReport:
    """Run named subagent jobs concurrently: ``await run_swarm({"db": ..., "qa": ...})``."""
    results = await asyncio.gather(*(_timed(name, job) for name, job in jobs.items()))
    return SwarmReport(list(results))
