/**
 * Owner: Person 2 | Backlog: BL-HUB-01 (UI)
 * Data: hubApi.catalog (contract: server/app/schemas/hub.py)
 */
import { hubApi } from '@/api';
import { useAsync } from '@/hooks/useAsync';
import { FeatureStub } from '@/components/ui';

export function AppCatalog() {
  const { data } = useAsync(() => hubApi.catalog(), []);
  return (
    <FeatureStub
      backlog="BL-HUB-01"
      title="Central application catalog"
      owner="Person 2"
      specPath="docs/backlogs/60-xapphub-management-portal/frontend/BL-HUB-01-central-application-catalog-ui.md"
      data={data}
    />
  );
}
