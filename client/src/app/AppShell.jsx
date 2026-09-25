/** Layout frame for every route. Owner: Person 1. */
import { Outlet, useLocation } from 'react-router-dom';
import { BobHeader } from '@/components/shell/BobHeader';
import { StepNav } from '@/components/shell/StepNav';

export function AppShell() {
  const { pathname } = useLocation();
  const inWorkflow = !pathname.startsWith('/hub');

  return (
    <div className="app-shell">
      <BobHeader />
      <main className="page">
        {inWorkflow && <StepNav />}
        <Outlet />
      </main>
    </div>
  );
}
