/** Route "/hub" - Owner: Person 2 */
import { AppCatalog } from '@/components/portal/AppCatalog';
import { AccessControlGrid } from '@/components/portal/AccessControlGrid';
import { AdoptionAnalytics } from '@/components/portal/AdoptionAnalytics';

export default function HubPage() {
  return (
    <>
      <div className="page__head">
        <div>
          <h1 className="page__title">xAppHub</h1>
          <p className="page__lede">
            Every app your team has deployed, who can access it, and how it is used.
          </p>
        </div>
      </div>
      <AppCatalog />
      <AccessControlGrid />
      <AdoptionAnalytics />
    </>
  );
}
