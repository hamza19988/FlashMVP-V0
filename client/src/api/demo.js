/**
 * Helpers for VITE_DEMO_MODE=true. Only files inside src/api may use these.
 */
import { DEMO_LATENCY_MS } from '@/config';

export const clone = (value) => structuredClone(value);

/** Resolve with a copy of `value` after a realistic delay. */
export function demo(value, ms = DEMO_LATENCY_MS) {
  return new Promise((resolve) => setTimeout(() => resolve(clone(value)), ms));
}

export const nowIso = () => new Date().toISOString();
export const randomBetween = (min, max) =>
  Math.round((min + Math.random() * (max - min)) * 10) / 10;
