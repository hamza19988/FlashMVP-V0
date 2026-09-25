/**
 * Revise / approve actions for the spec reviewer.
 * Owner: Person 1 | Backlog: BL-SDD-03 (docs/backlogs/10-specs-driven-development/frontend/)
 *
 * Baseline wiring is in place so the approval gate works for the whole team.
 * TODO(BL-SDD-03): optimistic status badge, error toasts, section-level revisions.
 */
import { useState } from 'react';
import { specsApi } from '@/api';
import { useProject } from '@/app/ProjectContext';

export function useSpecActions(onSpecChange) {
  const { projectId, setSpecStatus, markApproved } = useProject();
  const [pending, setPending] = useState(null); // 'revise' | 'approve' | null
  const [error, setError] = useState(null);

  async function revise(feedback, sections = ['all']) {
    if (!feedback.trim()) {
      setError(new Error('Describe what should change before requesting a revision.'));
      return;
    }
    setPending('revise');
    setError(null);
    try {
      const spec = await specsApi.revise({ projectId, feedback, sections });
      setSpecStatus(spec.status);
      onSpecChange?.(spec);
    } catch (e) {
      setError(e);
    } finally {
      setPending(null);
    }
  }

  async function approve() {
    setPending('approve');
    setError(null);
    try {
      await specsApi.approve(projectId);
      markApproved();
    } catch (e) {
      setError(e);
    } finally {
      setPending(null);
    }
  }

  return { revise, approve, pending, error };
}
