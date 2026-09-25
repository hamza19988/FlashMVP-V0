/**
 * Owner: Person 2 | Backlogs: BL-PLAY-01, BL-PLAY-03
 * Spec: docs/backlogs/50-container-playground-observability/frontend/
 * Data: containersApi.list, projectsApi.deploy (contract: server/app/schemas/container.py, deploy.py)
 */
import { containersApi } from '@/api';
import { useProject } from '@/app/ProjectContext';
import { useAsync } from '@/hooks/useAsync';
import { FeatureStub } from '@/components/ui';

export function PlaygroundWindow() {
  const { projectId } = useProject();
  const { data } = useAsync(() => containersApi.list(projectId), [projectId]);

  return (
    <FeatureStub
      backlog="BL-PLAY-01 / BL-PLAY-03"
      title="Embedded iframe playground + service switcher"
      owner="Person 2"
      specPath="docs/backlogs/50-container-playground-observability/frontend/"
      data={data}
    />
  );
}
