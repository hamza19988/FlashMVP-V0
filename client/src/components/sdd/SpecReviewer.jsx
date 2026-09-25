/**
 * Owner: Person 1 | Backlogs: BL-SDD-02 (reviewer), BL-SDD-03 (revise + approve lock)
 * Specs: docs/backlogs/10-specs-driven-development/frontend/
 *
 * Baseline: tabs + raw content + working revise/approve so the approval gate unlocks
 * QA and Playground for Person 2. Everything visual is still to build.
 * TODO(BL-SDD-02): glass layout from the spec, markdown rendering, bindings badges.
 * TODO(BL-SDD-03): locked read-only state, status transitions, demo 1.5s animation.
 */
import { useState } from 'react';
import { Button, ErrorNotice, FeatureStub, StatusBadge, Tabs } from '@/components/ui';
import { useSpecActions } from '@/hooks/useSpecActions';
import { RequirementsTab } from './RequirementsTab';
import { DesignTab } from './DesignTab';
import { TaskBreakdownTab } from './TaskBreakdownTab';
import { IBMToolBindingsPanel } from './IBMToolBindingsPanel';
import './SpecReviewer.css';

const TABS = [
  { id: 'requirements', label: '📝 Requirements' },
  { id: 'design', label: '🏗️ Technical design' },
  { id: 'tasks', label: '📋 Task breakdown' },
];

export function SpecReviewer({ spec, isLocked, onSpecChange, onApproved }) {
  const [tab, setTab] = useState('requirements');
  const [feedback, setFeedback] = useState('');
  const { revise, approve, pending, error } = useSpecActions(onSpecChange);

  async function handleApprove() {
    await approve();
    onApproved?.();
  }

  return (
    <FeatureStub
      backlog="BL-SDD-02 / BL-SDD-03"
      title="Spec review gate"
      owner="Person 1"
      specPath="docs/backlogs/10-specs-driven-development/frontend/"
      data={spec}
    >
      <StatusBadge status={isLocked ? 'APPROVED' : spec.status} />
      <Tabs tabs={TABS} active={tab} onChange={setTab} label="Spec sections" />
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'requirements' && <RequirementsTab markdown={spec.requirements} />}
        {tab === 'design' && <DesignTab markdown={spec.design} />}
        {tab === 'tasks' && <TaskBreakdownTab tasks={spec.tasks} />}
      </div>
      <IBMToolBindingsPanel bindings={spec.ibm_bindings} />

      {!isLocked && (
        <>
          <label className="field">
            Request revisions
            <input
              className="input"
              value={feedback}
              placeholder="Describe what to change (e.g. use PostgreSQL instead of MongoDB)"
              onChange={(e) => setFeedback(e.target.value)}
            />
          </label>
          <div className="sdd-actions">
            <Button loading={pending === 'revise'} onClick={() => revise(feedback)}>
              Request changes
            </Button>
            <Button variant="primary" loading={pending === 'approve'} onClick={handleApprove}>
              Approve specs & deploy to IBM Cloud
            </Button>
          </div>
        </>
      )}
      <ErrorNotice error={error} />
    </FeatureStub>
  );
}
