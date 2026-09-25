/**
 * Owner: Person 2 | Backlogs: BL-QA-01, BL-QA-02
 * Spec: docs/backlogs/40-qa-pipeline-workflow/frontend/
 * Data: qaApi.getSteps / qaApi.saveSteps / qaApi.run (contract: server/app/schemas/qa.py)
 * On a PASSED run call `markQaPassed()` from useProject() to unlock deploy.
 */
import { qaApi } from '@/api';
import { useProject } from '@/app/ProjectContext';
import { useAsync } from '@/hooks/useAsync';
import { FeatureStub, Spinner } from '@/components/ui';
import './QACanvas.css';

export function QACanvas() {
  const { projectId } = useProject();
  const { data, loading } = useAsync(() => qaApi.getSteps(projectId), [projectId]);

  return (
    <FeatureStub
      backlog="BL-QA-01 / BL-QA-02"
      title="Interactive QA canvas + custom step builder"
      owner="Person 2"
      specPath="docs/backlogs/40-qa-pipeline-workflow/frontend/"
      data={data}
    >
      {loading && <Spinner label="Loading pipeline" />}
    </FeatureStub>
  );
}
