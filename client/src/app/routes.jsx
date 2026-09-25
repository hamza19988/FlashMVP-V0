/**
 * Route table - every page is registered here up front so feature owners never need
 * to edit this file to ship. Owner: Person 1.
 */
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './AppShell';
import { RequireApproval, RequireProject } from './guards';
import StartPage from '@/pages/StartPage';
import SpecPage from '@/pages/SpecPage';
import QAPage from '@/pages/QAPage';
import PlaygroundPage from '@/pages/PlaygroundPage';
import HubPage from '@/pages/HubPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <StartPage /> }, // Person 1
      {
        path: '/specs', // Person 1
        element: (
          <RequireProject>
            <SpecPage />
          </RequireProject>
        ),
      },
      {
        path: '/qa', // Person 2
        element: (
          <RequireApproval>
            <QAPage />
          </RequireApproval>
        ),
      },
      {
        path: '/playground', // Person 2
        element: (
          <RequireApproval>
            <PlaygroundPage />
          </RequireApproval>
        ),
      },
      { path: '/hub', element: <HubPage /> }, // Person 2
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
