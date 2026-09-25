/**
 * Owner: Person 2 | Backlog: BL-QA-03
 * Spec: docs/backlogs/40-qa-pipeline-workflow/frontend/BL-QA-03-workflow-run-history-and-detail-inspector-ui.md
 * Data: runsApi.list / runsApi.get (contract: server/app/schemas/run.py)
 */
import { runsApi } from '@/api';
import { useProject } from '@/app/ProjectContext';
import { useAsync } from '@/hooks/useAsync';
import { FeatureStub } from '@/components/ui';

export function RunHistoryTable() {
  const { projectId } = useProject();
  const { data } = useAsync(() => runsApi.list(projectId), [projectId]);

  return (
    <FeatureStub
      backlog="BL-QA-03"
      title="Workflow run history + detail inspector"
      owner="Person 2"
      specPath="docs/backlogs/40-qa-pipeline-workflow/frontend/BL-QA-03-workflow-run-history-and-detail-inspector-ui.md"
      data={data}
    />
  );
}
