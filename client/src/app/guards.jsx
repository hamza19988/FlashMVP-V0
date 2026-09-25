/** Route guards that enforce the SDD gate in the UI (the API enforces it too). */
import { Navigate } from 'react-router-dom';
import { useProject } from './ProjectContext';

export function RequireProject({ children }) {
  const { projectId } = useProject();
  return projectId ? children : <Navigate to="/" replace />;
}

export function RequireApproval({ children }) {
  const { projectId, approved } = useProject();
  if (!projectId) return <Navigate to="/" replace />;
  return approved ? children : <Navigate to="/specs" replace />;
}
