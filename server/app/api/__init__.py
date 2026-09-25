"""Router registry.

All routers are registered here ONCE so nobody needs to edit main.py to ship a feature.
Adding a brand-new router file? Append it below in the same PR (one line, low conflict risk).
"""

from app.api import containers, deploy, health, hub, projects, qa, runs, secrets, specs

ROUTERS = [
    health.router,
    specs.router,  # Person 3
    qa.router,  # Person 3
    runs.router,  # Person 3
    projects.router,  # Person 4
    secrets.router,  # Person 4
    containers.router,  # Person 4
    deploy.router,  # Person 4
    hub.router,  # Person 4
]
