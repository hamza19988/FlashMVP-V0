import { RouterProvider } from 'react-router-dom';
import { ProjectProvider } from '@/app/ProjectContext';
import { router } from '@/app/routes';

export default function App() {
  return (
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  );
}
