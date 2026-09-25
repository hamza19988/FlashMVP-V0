/**
 * Runtime configuration (ADR 0002). Read flags from here - never from import.meta.env directly.
 */
export const isDemoMode = import.meta.env.VITE_DEMO_MODE !== 'false';
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
export const DEMO_LATENCY_MS = 450;
