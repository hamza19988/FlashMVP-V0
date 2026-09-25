/**
 * The four-stage workflow rail. Stages unlock in order; locked stages are not links.
 * Owner: Person 1.
 */
import { NavLink } from 'react-router-dom';
import { useProject } from '@/app/ProjectContext';

export function StepNav() {
  const { projectId, approved } = useProject();

  const steps = [
    { to: '/', label: 'Template', unlocked: true },
    { to: '/specs', label: 'Specs review', unlocked: Boolean(projectId) },
    { to: '/qa', label: 'QA pipeline', unlocked: approved },
    { to: '/playground', label: 'Deploy & observe', unlocked: approved },
  ];

  return (
    <ol className="step-nav" aria-label="Workflow">
      {steps.map((s, i) => (
        <li key={s.to}>
          {s.unlocked ? (
            <NavLink to={s.to} end className="step-nav__item">
              <span className="step-nav__num">{i + 1}</span>
              {s.label}
            </NavLink>
          ) : (
            <span className="step-nav__item is-locked" aria-disabled="true">
              <span className="step-nav__num">🔒</span>
              {s.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
