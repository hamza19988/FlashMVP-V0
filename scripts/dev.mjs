// Start the stack.
//   npm run dev        -> UI only, fixtures (VITE_DEMO_MODE=true). No Python needed.
//   npm run dev:full   -> API on :8000 + UI on :5173 calling the API.
import { spawn } from 'node:child_process';
import { CLIENT, IS_WIN, SERVER, venvPython } from './_lib.mjs';

const full = process.argv.includes('--full');
const children = [];

function start(name, color, cmd, args, cwd, env = {}) {
  const child = spawn(cmd, args, {
    cwd,
    shell: IS_WIN && cmd === 'npm',
    env: { ...process.env, FORCE_COLOR: '1', ...env },
  });
  const tag = `\x1b[${color}m[${name}]\x1b[0m `;
  const pipe = (stream, out) =>
    stream.on('data', (buf) =>
      buf
        .toString()
        .split(/\r?\n/)
        .filter(Boolean)
        .forEach((line) => out.write(tag + line + '\n')),
    );
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  child.on('exit', (code) => {
    console.log(`${tag}exited with code ${code}`);
    shutdown();
  });
  children.push(child);
}

function shutdown() {
  children.forEach((c) => !c.killed && c.kill());
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

if (full) {
  start('api', '34', venvPython(), ['-m', 'uvicorn', 'app.main:app', '--reload', '--port', '8000'], SERVER);
}
start('web', '35', 'npm', ['run', 'dev'], CLIENT, { VITE_DEMO_MODE: full ? 'false' : 'true' });
