/** Route "/" - Owner: Person 1 */
import { TemplateSelectorPage } from '@/components/shell/TemplateSelectorPage';

export default function StartPage() {
  return (
    <>
      <div className="page__head">
        <div>
          <h1 className="page__title">Start a project</h1>
          <p className="page__lede">
            Pick an IBM-ready template and describe what you want to build. IBM Bob drafts the specs
            for your review before any code runs.
          </p>
        </div>
      </div>
      <TemplateSelectorPage />
    </>
  );
}
