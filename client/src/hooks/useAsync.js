import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Run an async loader and track { data, error, loading }. Shared hook - owner: Person 1.
 *
 *   const { data, loading, error, reload } = useAsync(() => runsApi.list(projectId), [projectId]);
 */
export function useAsync(loader, deps = [], { immediate = true } = {}) {
  const [state, setState] = useState({ data: null, error: null, loading: immediate });
  const alive = useRef(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(loader, deps);

  const reload = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await run();
      if (alive.current) setState({ data, error: null, loading: false });
      return data;
    } catch (error) {
      if (alive.current) setState((s) => ({ ...s, error, loading: false }));
      return undefined;
    }
  }, [run]);

  useEffect(() => {
    alive.current = true;
    if (immediate) reload();
    return () => {
      alive.current = false;
    };
  }, [reload, immediate]);

  return { ...state, reload, setData: (data) => setState((s) => ({ ...s, data })) };
}
