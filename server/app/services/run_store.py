"""Workflow run history. Owner: Person 3 (BL-QA-03)."""

from datetime import UTC, datetime

from app.core import store as st
from app.core.config import settings
from app.core.errors import not_found
from app.core.mocks import load_mock
from app.schemas.run import RunRecord


def _seed_demo(project_id: str) -> None:
    if settings.demo_mode and not _for_project(project_id):
        for run in load_mock("runs_mock.json")["runs"]:
            run["project_id"] = project_id
            st.store.put(st.RUNS, f"{project_id}:{run['run_id']}", RunRecord(**run))


def _for_project(project_id: str) -> list[RunRecord]:
    return [r for r in st.store.all(st.RUNS) if r.project_id == project_id]


def list_runs(project_id: str) -> list[RunRecord]:
    _seed_demo(project_id)
    return sorted(_for_project(project_id), key=lambda r: r.run_number, reverse=True)


def get_run(project_id: str, run_id: str) -> RunRecord:
    _seed_demo(project_id)
    run = st.store.get(st.RUNS, f"{project_id}:{run_id}")
    if run is None:
        raise not_found("Run", run_id)
    return run


def record_run(project_id: str, qa_run: dict, deployment_url: str | None = None) -> RunRecord:
    runs = list_runs(project_id)
    record = RunRecord(
        run_id=qa_run["run_id"],
        project_id=project_id,
        run_number=(runs[0].run_number + 1) if runs else 1,
        status=qa_run["overall_status"],
        triggered_at=datetime.now(UTC),
        duration_ms=sum(s["duration_ms"] for s in qa_run["steps"]),
        qa_steps=qa_run["steps"],
        deployment_url=deployment_url,
    )
    return st.store.put(st.RUNS, f"{project_id}:{record.run_id}", record)
