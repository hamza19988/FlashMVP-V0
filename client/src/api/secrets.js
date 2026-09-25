/** Secrets vault API - contract: server/app/schemas/secret.py (BE: Person 4, FE: Person 1). */
import { isDemoMode } from '@/config';
import secretsMock from '@/mocks/secrets_mock.json';
import { http } from './http';
import { demo } from './demo';

let demoSecrets = null;
const mask = (v) => (v.length > 6 ? `${v.slice(0, 3)}****` : '****');

export const secretsApi = {
  list(projectId) {
    if (isDemoMode) {
      demoSecrets ??= secretsMock.map((s) => ({ ...s, project_id: projectId }));
      return demo(demoSecrets);
    }
    return http.get(`/api/v1/projects/${projectId}/secrets`);
  },

  save(projectId, { key, value, scope = 'ALL' }) {
    if (isDemoMode) {
      const record = {
        project_id: projectId,
        key,
        scope,
        masked_value: mask(value),
        status: 'STORED',
      };
      demoSecrets = [...(demoSecrets ?? []).filter((s) => s.key !== key), record];
      return demo(record);
    }
    return http.post(`/api/v1/projects/${projectId}/secrets`, { key, value, scope });
  },

  remove(projectId, key) {
    if (isDemoMode) {
      demoSecrets = (demoSecrets ?? []).filter((s) => s.key !== key);
      return demo({ project_id: projectId, key, deleted: true });
    }
    return http.del(`/api/v1/projects/${projectId}/secrets/${encodeURIComponent(key)}`);
  },
};
