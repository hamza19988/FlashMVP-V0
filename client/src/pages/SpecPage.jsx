/** Route "/specs" - Owner: Person 1 */
import { useNavigate } from 'react-router-dom';
import { specsApi } from '@/api';
import { useProject } from '@/app/ProjectContext';
import { useAsync } from '@/hooks/useAsync';
import { ErrorNotice, Spinner } from '@/components/ui';
import { SpecReviewer } from '@/components/sdd/SpecReviewer';

export default function SpecPage() {
  const navigate = useNavigate();
  const { projectId, approved } = useProject();
  const {
    data: spec,
    loading,
    error,
    reload,
    setData,
  } = useAsync(() => specsApi.get(projectId), [projectId]);

  return (
    <>
      <div className="page__head">
        <div>
          <h1 className="page__title">Review the specs</h1>
          <p className="page__lede">
            Nothing is built or deployed until you approve. Ask for changes in plain language.
          </p>
        </div>
      </div>
      {loading && !spec && <Spinner label="Loading specs" />}
      <ErrorNotice error={error} onRetry={reload} />
      {spec && (
        <SpecReviewer
          spec={spec}
          isLocked={approved}
          onSpecChange={setData}
          onApproved={() => navigate('/qa')}
        />
      )}
    </>
  );
}
