// Shared helpers for the cross-platform dev scripts (Windows, macOS, Linux).
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const SERVER = join(ROOT, 'server');
export const CLIENT = join(ROOT, 'client');
export const IS_WIN = process.platform === 'win32';

export function venvPython() {
  const py = IS_WIN
    ? join(SERVER, '.venv', 'Scripts', 'python.exe')
    : join(SERVER, '.venv', 'bin', 'python');
  if (!existsSync(py)) {
    console.error('Python venv not found. Run `npm run setup` first.');
    process.exit(1);
  }
  return py;
}
