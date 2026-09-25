/**
 * Single fetch wrapper for the whole app. Owner: Person 1.
 * Errors always surface as ApiError { status, code, message } - matching the server's
 * {"detail", "code"} error body.
 */
import { API_BASE_URL } from '@/config';

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function request(method, path, body) {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, 'NETWORK', 'Cannot reach the FlashMVP API. Is the server running?');
  }

  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    const detail = data?.detail;
    const message = typeof detail === 'string' ? detail : 'Request failed';
    throw new ApiError(res.status, data?.code ?? 'HTTP_ERROR', message);
  }
  return data;
}

export const http = {
  get: (path) => request('GET', path),
  post: (path, body = {}) => request('POST', path, body),
  del: (path) => request('DELETE', path),
};

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}
