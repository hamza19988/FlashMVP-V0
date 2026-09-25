/** xAppHub API - contract: server/app/schemas/hub.py (BE: Person 4, FE: Person 2). */
import { isDemoMode } from '@/config';
import catalogMock from '@/mocks/hub_catalog_mock.json';
import analyticsMock from '@/mocks/hub_analytics_mock.json';
import { http } from './http';
import { demo } from './demo';

export const hubApi = {
  catalog() {
    if (isDemoMode) return demo(catalogMock);
    return http.get('/api/v1/projects');
  },

  setAccess({ projectId, userEmail, role }) {
    if (isDemoMode) {
      return demo({ project_id: projectId, user_email: userEmail, role, updated: true });
    }
    return http.post('/api/v1/hub/access', { project_id: projectId, user_email: userEmail, role });
  },

  analytics() {
    if (isDemoMode) return demo(analyticsMock);
    return http.get('/api/v1/hub/analytics');
  },
};
