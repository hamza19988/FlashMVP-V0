// Run the server's venv Python from anywhere: node scripts/py.mjs -m pytest -q
import { spawnSync } from 'node:child_process';
import { SERVER, venvPython } from './_lib.mjs';

const res = spawnSync(venvPython(), process.argv.slice(2), { cwd: SERVER, stdio: 'inherit' });
process.exit(res.status ?? 1);
