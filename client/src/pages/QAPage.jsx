/** Route "/qa" - Owner: Person 2 */
import { QACanvas } from '@/components/qa/QACanvas';
import { RunHistoryTable } from '@/components/qa/RunHistoryTable';

export default function QAPage() {
  return (
    <>
      <div className="page__head">
        <div>
          <h1 className="page__title">QA pipeline</h1>
          <p className="page__lede">
            Lint, tests and a watsonx security scan run before every deploy.
          </p>
        </div>
      </div>
      <QACanvas />
      <RunHistoryTable />
    </>
  );
}
