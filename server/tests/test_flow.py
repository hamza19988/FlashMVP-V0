"""End-to-end happy path in DEMO_MODE: spec -> approve -> QA -> deploy."""


def _generate(client):
    res = client.post(
        "/api/v1/specs/generate",
        json={"prompt": "E-commerce store with Stripe", "template": "react-fastapi"},
    )
    assert res.status_code == 200
    body = res.json()
    assert body["status"] == "DRAFT" and body["tasks"]
    return body["project_id"]


def test_deploy_is_blocked_until_specs_are_approved(client):
    pid = _generate(client)
    res = client.post(f"/api/v1/projects/{pid}/deploy")
    assert res.status_code == 403
    assert res.json()["code"] == "FORBIDDEN"


def test_revise_then_approve_then_deploy(client):
    pid = _generate(client)

    res = client.post(
        "/api/v1/specs/revise",
        json={"project_id": pid, "feedback": "Use PostgreSQL", "sections": ["all"]},
    )
    assert res.json()["status"] == "CHANGES_REQUESTED"
    assert res.json()["version"] == 2

    res = client.post("/api/v1/specs/approve", json={"project_id": pid})
    assert res.json() == {"project_id": pid, "status": "APPROVED", "locked": True}

    res = client.post(f"/api/v1/projects/{pid}/deploy")
    assert res.status_code == 200
    body = res.json()
    assert body["status"] == "DEPLOYED"
    assert body["tunnel"]["public_url"].startswith("https://")

    runs = client.get(f"/api/v1/projects/{pid}/runs").json()["runs"]
    assert runs[0]["run_id"] == body["run_id"]


def test_empty_feedback_is_rejected(client):
    pid = _generate(client)
    res = client.post("/api/v1/specs/revise", json={"project_id": pid, "feedback": ""})
    assert res.status_code == 422


def test_secrets_crud(client):
    pid = "proj_test1"
    assert len(client.get(f"/api/v1/projects/{pid}/secrets").json()) == 3
    res = client.post(
        f"/api/v1/projects/{pid}/secrets",
        json={"key": "JWT_SECRET", "value": "supersecret", "scope": "BACKEND"},
    )
    assert res.json()["masked_value"] == "sup****"
    assert client.delete(f"/api/v1/projects/{pid}/secrets/JWT_SECRET").json()["deleted"]


def test_observability_endpoints(client):
    pid = "proj_test1"
    fleet = client.get(f"/api/v1/projects/{pid}/containers").json()
    assert {c["container_id"] for c in fleet["containers"]} == {"frontend", "backend"}
    stats = client.get(f"/api/v1/projects/{pid}/containers/frontend/stats").json()
    assert 0 <= stats["cpu_percent"] <= 100
    assert client.get("/api/v1/projects").status_code == 200
    assert client.get("/api/v1/hub/analytics").json()["series"]
