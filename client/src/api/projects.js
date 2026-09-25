/** Project lifecycle API - contract: server/app/schemas/project.py, manifest.py (BE: Person 4). */
import { isDemoMode } from '@/config';
import { http } from './http';
import { demo } from './demo';

export const projectsApi = {
  templates() {
    if (isDemoMode) return demo(['nextjs-go', 'react-fastapi']);
    return http.get('/api/v1/projects/templates');
  },

  create(projectId, template) {
    if (isDemoMode) {
      return demo({
        project_id: projectId,
        schema_name: `app_${projectId}`,
        execution_time_ms: 180,
        connection_url: 'postgresql://****@db.example.internal:5432/postgres',
        status: 'SUCCESS',
      });
    }
    return http.post('/api/v1/projects/create', { project_id: projectId, template });
  },

  deploy(projectId, { skipQa = false } = {}) {
    if (isDemoMode) {
      return demo(
        {
          project_id: projectId,
          status: 'DEPLOYED',
          run_id: 'run-015',
          network: `net_${projectId}`,
          containers: [],
          tunnel: {
            project_id: projectId,
            public_url: 'https://app-8f92a.trycloudflare.com',
            local_port: 3001,
            status: 'ACTIVE',
            stored_in_vault: true,
          },
          execution_time_ms: 3850,
        },
        2500,
      );
    }
    return http.post(`/api/v1/projects/${projectId}/deploy`, { skip_qa: skipQa });
  },
};
