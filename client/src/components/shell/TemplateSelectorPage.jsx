/**
 * Owner: Person 1 | Backlog: BL-ARC-01
 * Spec: docs/backlogs/30-expandable-architecture/frontend/BL-ARC-01-starter-template-selector-ui.md
 *
 * Baseline: pick a template, describe the app, generate specs, go to /specs.
 * The flow works end to end so the rest of the team can reach their pages.
 * TODO(BL-ARC-01): hero copy, card grid layout, loading state, validation messages.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { specsApi } from '@/api';
import { useProject } from '@/app/ProjectContext';
import { templates } from '@/data/templates';
import { Button, ErrorNotice, FeatureStub } from '@/components/ui';
import { TemplateCard } from './TemplateCard';
import './TemplateSelectorPage.css';

export function TemplateSelectorPage() {
  const navigate = useNavigate();
  const { startProject } = useProject();
  const [templateId, setTemplateId] = useState(templates[0].id);
  const [prompt, setPrompt] = useState('E-commerce store with Stripe checkout');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleStart() {
    setLoading(true);
    setError(null);
    try {
      const spec = await specsApi.generate({ prompt, template: templateId });
      startProject({ projectId: spec.project_id, templateId, prompt, specStatus: spec.status });
      navigate('/specs');
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FeatureStub
      backlog="BL-ARC-01"
      title="Starter template selector"
      owner="Person 1"
      specPath="docs/backlogs/30-expandable-architecture/frontend/BL-ARC-01-starter-template-selector-ui.md"
      data={templates}
    >
      <div className="template-grid">
        {templates.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            selected={t.id === templateId}
            onSelect={setTemplateId}
          />
        ))}
      </div>
      <label className="field">
        Describe your app
        <textarea className="textarea" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </label>
      <ErrorNotice error={error} />
      <div>
        <Button variant="primary" loading={loading} disabled={!prompt.trim()} onClick={handleStart}>
          Generate specs
        </Button>
      </div>
    </FeatureStub>
  );
}
