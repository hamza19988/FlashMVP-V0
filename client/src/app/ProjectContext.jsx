/**
 * Cross-feature workflow state (template -> specs -> QA -> deploy). Owner: Person 1.
 *
 * This is the ONLY state shared between feature folders. Features keep their own data
 * local and read the project gate flags from here. Persisted to localStorage so an
 * approved spec survives a page reload (BL-SDD-03).
 *
 * Need a new shared field? Open a PR touching only this file and tag Person 1.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'flashmvp.project.v1';

const EMPTY = {
  projectId: null,
  templateId: null,
  prompt: '',
  specStatus: null, // 'DRAFT' | 'CHANGES_REQUESTED' | 'APPROVED'
  approved: false,
  qaPassed: false,
  publicUrl: null,
};

function readStored() {
  try {
    return { ...EMPTY, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') };
  } catch {
    return EMPTY;
  }
}

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [state, setState] = useState(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable (private mode) - state stays in memory */
    }
  }, [state]);

  const patch = useCallback((next) => setState((s) => ({ ...s, ...next })), []);

  const actions = useMemo(
    () => ({
      startProject: ({ projectId, templateId, prompt, specStatus = 'DRAFT' }) =>
        setState({ ...EMPTY, projectId, templateId, prompt, specStatus }),
      setSpecStatus: (specStatus) => patch({ specStatus }),
      markApproved: () => patch({ approved: true, specStatus: 'APPROVED' }),
      markQaPassed: (qaPassed = true) => patch({ qaPassed }),
      setPublicUrl: (publicUrl) => patch({ publicUrl }),
      reset: () => setState(EMPTY),
    }),
    [patch],
  );

  const value = useMemo(() => ({ ...state, ...actions }), [state, actions]);
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used inside <ProjectProvider>');
  return ctx;
}
