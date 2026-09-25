/**
 * Owner: Person 2 | Backlog: BL-PLAY-04
 * Data: containersApi.stats polled every 3s (usePolling). Charts: recharts.
 */
import { useState } from 'react';
import { containersApi } from '@/api';
import { useProject } from '@/app/ProjectContext';
import { usePolling } from '@/hooks/usePolling';
import { FeatureStub } from '@/components/ui';

export function TelemetryCharts({ containerId = 'frontend' }) {
  const { projectId } = useProject();
  const [latest, setLatest] = useState(null);

  usePolling(async () => setLatest(await containersApi.stats(projectId, containerId)), 3000);

  return (
    <FeatureStub
      backlog="BL-PLAY-04"
      title="CPU / RAM telemetry charts"
      owner="Person 2"
      specPath="docs/backlogs/50-container-playground-observability/frontend/BL-PLAY-04-container-fleet-telemetry-and-log-viewer-ui.md"
      data={latest}
    />
  );
}
