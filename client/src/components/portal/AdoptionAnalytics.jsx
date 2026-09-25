/**
 * Owner: Person 2 | Backlog: BL-HUB-02
 * Data: hubApi.analytics (contract: HubAnalytics)
 */
import { hubApi } from '@/api';
import { useAsync } from '@/hooks/useAsync';
import { FeatureStub } from '@/components/ui';

export function AdoptionAnalytics() {
  const { data } = useAsync(() => hubApi.analytics(), []);
  return (
    <FeatureStub
      backlog="BL-HUB-02"
      title="Adoption analytics"
      owner="Person 2"
      specPath="docs/backlogs/60-xapphub-management-portal/frontend/BL-HUB-02-access-control-and-adoption-analytics-ui.md"
      data={data}
    />
  );
}
