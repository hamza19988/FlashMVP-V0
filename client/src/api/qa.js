/** QA pipeline API - contract: server/app/schemas/qa.py (BE: Person 3, FE: Person 2). */
import { isDemoMode } from '@/config';
import qaStepsMock from '@/mocks/qa_steps_mock.json';
import qaRunMock from '@/mocks/qa_run_mock.json';
import { http } from './http';
import { demo } from './demo';

let demoSteps = null;

export const qaApi = {
  getSteps(projectId) {
    if (isDemoMode) {
      demoSteps ??= qaStepsMock.steps;
      return demo({ project_id: projectId, steps: demoSteps });
    }
    return http.get(`/api/v1/projects/${projectId}/qa/steps`);
  },

  saveSteps(projectId, steps) {
    if (isDemoMode) {
      demoSteps = steps.map((s, i) => ({ ...s, order: i + 1 }));
      return demo({ project_id: projectId, steps: demoSteps });
    }
    return http.post(`/api/v1/projects/${projectId}/qa/steps`, { steps });
  },

  run(projectId, stepIds = null) {
    if (isDemoMode) return demo({ ...qaRunMock, project_id: projectId }, 2500);
    return http.post(`/api/v1/projects/${projectId}/qa/run`, { steps: stepIds });
  },
};
