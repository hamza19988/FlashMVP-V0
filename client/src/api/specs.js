/** SDD API - contract: server/app/schemas/spec.py (BE: Person 3, FE: Person 1). */
import { isDemoMode } from '@/config';
import sddMock from '@/mocks/sdd_mock.json';
import { http } from './http';
import { demo } from './demo';

const demoSpecs = new Map();

export const specsApi = {
  generate({ prompt, template, projectId }) {
    if (isDemoMode) {
      const spec = { ...sddMock, project_id: projectId ?? sddMock.project_id };
      demoSpecs.set(spec.project_id, spec);
      return demo(spec, 1200);
    }
    return http.post('/api/v1/specs/generate', { prompt, template, project_id: projectId });
  },

  get(projectId) {
    if (isDemoMode) return demo(demoSpecs.get(projectId) ?? { ...sddMock, project_id: projectId });
    return http.get(`/api/v1/specs/${projectId}`);
  },

  revise({ projectId, feedback, sections = ['all'] }) {
    if (isDemoMode) {
      const current = demoSpecs.get(projectId) ?? { ...sddMock, project_id: projectId };
      const next = {
        ...current,
        status: 'CHANGES_REQUESTED',
        version: current.version + 1,
        requirements: `${current.requirements}\n\n> Revision applied: ${feedback}`,
      };
      demoSpecs.set(projectId, next);
      return demo(next, 1500);
    }
    return http.post('/api/v1/specs/revise', { project_id: projectId, feedback, sections });
  },

  approve(projectId) {
    if (isDemoMode) {
      const current = demoSpecs.get(projectId);
      if (current) demoSpecs.set(projectId, { ...current, status: 'APPROVED', locked: true });
      return demo({ project_id: projectId, status: 'APPROVED', locked: true }, 1500);
    }
    return http.post('/api/v1/specs/approve', { project_id: projectId });
  },
};
