/**
 * Owner: Person 1 | Backlog: BL-INF-02 (UI)
 * Spec: docs/backlogs/20-application-infrastructure/frontend/BL-INF-02-environment-variables-modal-ui.md
 *
 * Baseline: list / add / delete wired to secretsApi. Opened from the header.
 * TODO(BL-INF-02): table layout from the spec, validation (UPPER_SNAKE keys),
 * "Confirm & lock vault" state, empty state.
 */
import { useState } from 'react';
import { secretsApi } from '@/api';
import { useProject } from '@/app/ProjectContext';
import { useAsync } from '@/hooks/useAsync';
import { Button, ErrorNotice, Modal, Spinner } from '@/components/ui';
import { SecretRow } from './SecretRow';
import './SecretsModal.css';

export function SecretsModal({ open, onClose }) {
  const { projectId } = useProject();
  const [draft, setDraft] = useState({ key: '', scope: 'ALL', value: '' });
  const { data, loading, error, reload } = useAsync(
    () => (open && projectId ? secretsApi.list(projectId) : Promise.resolve([])),
    [open, projectId],
  );

  async function save() {
    await secretsApi.save(projectId, draft);
    setDraft({ key: '', scope: 'ALL', value: '' });
    reload();
  }

  async function remove(key) {
    await secretsApi.remove(projectId, key);
    reload();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="🔐 IBM Secrets Manager: environment variables"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            Confirm & lock vault
          </Button>
        </>
      }
    >
      {loading ? (
        <Spinner label="Loading secrets" />
      ) : (
        <ul className="secret-list">
          {(data ?? []).map((s) => (
            <SecretRow key={s.key} secret={s} onDelete={remove} />
          ))}
        </ul>
      )}
      <ErrorNotice error={error} onRetry={reload} />
      <div className="secret-form">
        <input
          className="input"
          placeholder="KEY_NAME"
          value={draft.key}
          onChange={(e) => setDraft({ ...draft, key: e.target.value.toUpperCase() })}
        />
        <select
          className="select"
          value={draft.scope}
          onChange={(e) => setDraft({ ...draft, scope: e.target.value })}
        >
          <option>ALL</option>
          <option>FRONTEND</option>
          <option>BACKEND</option>
        </select>
        <input
          className="input"
          type="password"
          placeholder="Value"
          value={draft.value}
          onChange={(e) => setDraft({ ...draft, value: e.target.value })}
        />
        <Button onClick={save} disabled={!draft.key || !draft.value}>
          Save key
        </Button>
      </div>
    </Modal>
  );
}
