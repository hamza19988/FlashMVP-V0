/**
 * Owner: Person 2 | Backlog: BL-PLAY-04
 * Data: useLogStream(projectId, containerId) -> LogEvent[] (server/app/schemas/container.py)
 */
import { useProject } from '@/app/ProjectContext';
import { useLogStream } from '@/hooks/useLogStream';
import { FeatureStub } from '@/components/ui';

export function LogViewer({ containerId = 'frontend' }) {
  const { projectId } = useProject();
  const lines = useLogStream(projectId, containerId);

  return (
    <FeatureStub
      backlog="BL-PLAY-04"
      title="Live SSE log viewer"
      owner="Person 2"
      specPath="docs/backlogs/50-container-playground-observability/frontend/BL-PLAY-04-container-fleet-telemetry-and-log-viewer-ui.md"
      data={lines}
    />
  );
}
