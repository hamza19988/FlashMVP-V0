/**
 * Live container logs over SSE.
 * Owner: Person 2 | Backlog: BL-PLAY-04 (docs/backlogs/50-container-playground-observability/)
 *
 * TODO(BL-PLAY-04): buffering cap, search/filter, reconnect with backoff.
 */
import { useEffect, useState } from 'react';
import { containersApi } from '@/api';

export function useLogStream(projectId, containerId) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (!projectId || !containerId) return undefined;
    setLines([]);
    return containersApi.subscribeLogs(projectId, containerId, (event) =>
      setLines((prev) => [...prev, event]),
    );
  }, [projectId, containerId]);

  return lines;
}
