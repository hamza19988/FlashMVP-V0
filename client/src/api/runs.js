/** Run history API - contract: server/app/schemas/run.py (BE: Person 3, FE: Person 2). */
import { isDemoMode } from '@/config';
import runsMock from '@/mocks/runs_mock.json';
import { http } from './http';
import { demo } from './demo';

export const runsApi = {
  list(projectId) {
    if (isDemoMode) return demo({ ...runsMock, project_id: projectId });
    return http.get(`/api/v1/projects/${projectId}/runs`);
  },

  get(projectId, runId) {
    if (isDemoMode) return demo(runsMock.runs.find((r) => r.run_id === runId) ?? runsMock.runs[0]);
    return http.get(`/api/v1/projects/${projectId}/runs/${runId}`);
  },
};
