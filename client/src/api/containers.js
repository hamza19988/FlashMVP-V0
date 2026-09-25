/** Container fleet API - contract: server/app/schemas/container.py (BE: Person 4, FE: Person 2). */
import { isDemoMode } from '@/config';
import containersMock from '@/mocks/containers_mock.json';
import logsMock from '@/mocks/logs_mock.json';
import { http, apiUrl } from './http';
import { demo, nowIso, randomBetween } from './demo';

export const containersApi = {
  list(projectId) {
    if (isDemoMode) return demo({ ...containersMock, project_id: projectId });
    return http.get(`/api/v1/projects/${projectId}/containers`);
  },

  stats(projectId, containerId) {
    if (isDemoMode) {
      return demo(
        {
          container_id: containerId,
          cpu_percent: randomBetween(5, 35),
          memory_mb: randomBetween(80, 256),
          network_rx_kb: randomBetween(1, 40),
          network_tx_kb: randomBetween(1, 20),
          status: 'RUNNING',
          timestamp: nowIso(),
        },
        150,
      );
    }
    return http.get(`/api/v1/projects/${projectId}/containers/${containerId}/stats`);
  },

  /**
   * Subscribe to the SSE log stream. `onEvent` receives LogEvent objects.
   * Returns an unsubscribe function - call it in your effect cleanup.
   */
  subscribeLogs(projectId, containerId, onEvent, onError) {
    if (isDemoMode) {
      let i = 0;
      const timer = setInterval(() => {
        if (i >= logsMock.length) return clearInterval(timer);
        onEvent({ container_id: containerId, timestamp: nowIso(), ...logsMock[i++] });
      }, 400);
      return () => clearInterval(timer);
    }
    const source = new EventSource(
      apiUrl(`/api/v1/projects/${projectId}/containers/${containerId}/logs`),
    );
    source.onmessage = (e) => onEvent(JSON.parse(e.data));
    source.onerror = (e) => {
      source.close();
      onError?.(e);
    };
    return () => source.close();
  },
};
