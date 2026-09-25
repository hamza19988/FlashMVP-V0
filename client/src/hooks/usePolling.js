import { useEffect, useRef } from 'react';

/** Call `fn` every `intervalMs` while `enabled`. Shared hook - owner: Person 1. */
export function usePolling(fn, intervalMs, enabled = true) {
  const saved = useRef(fn);
  saved.current = fn;

  useEffect(() => {
    if (!enabled) return undefined;
    saved.current();
    const id = setInterval(() => saved.current(), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, enabled]);
}
