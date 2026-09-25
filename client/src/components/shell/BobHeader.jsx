/**
 * Global header: brand, IBM Bob status strip, demo-mode pill, secrets + hub entry points.
 * Owner: Person 1.
 */
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { isDemoMode } from '@/config';
import { useProject } from '@/app/ProjectContext';
import { Button } from '@/components/ui';
import { SecretsModal } from '@/components/infra/SecretsModal';

export function BobHeader() {
  const { projectId } = useProject();
  const [secretsOpen, setSecretsOpen] = useState(false);

  return (
    <header className="bob-header">
      <div className="bob-header__inner">
        <Link to="/" className="brand" aria-label="FlashMVP home">
          <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="var(--ibm-blue)" />
            <path d="M18 4 8 18h7l-2 10 11-15h-7z" fill="#fff" />
          </svg>
          <span>FlashMVP</span>
        </Link>

        <div className="bob-strip" title="Workflow orchestrated by the IBM Bob 2.0 agent engine">
          <span className="bob-strip__pulse" aria-hidden="true" />
          Powered by IBM Bob 2.0
        </div>

        <nav className="bob-header__actions" aria-label="Global">
          {isDemoMode && (
            <span
              className="demo-pill"
              title="VITE_DEMO_MODE=true - data comes from local fixtures"
            >
              Demo mode
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            disabled={!projectId}
            onClick={() => setSecretsOpen(true)}
            title={projectId ? 'Manage environment secrets' : 'Start a project first'}
          >
            🔐 Secrets
          </Button>
          <NavLink to="/hub" className="nav-link">
            xAppHub
          </NavLink>
        </nav>
      </div>
      <SecretsModal open={secretsOpen} onClose={() => setSecretsOpen(false)} />
    </header>
  );
}
