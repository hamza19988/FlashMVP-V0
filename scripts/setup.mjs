// One-time setup: Python venv + deps, client deps, .env files.
//   npm run setup
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { CLIENT, IS_WIN, SERVER, venvPython } from './_lib.mjs';

function run(cmd, args, cwd) {
  console.log(`\n> ${cmd} ${args.join(' ')}   (${cwd})`);
  const res = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: IS_WIN });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

const systemPython = IS_WIN ? 'py' : 'python3';
if (!existsSync(join(SERVER, '.venv'))) {
  run(systemPython, IS_WIN ? ['-3.11', '-m', 'venv', '.venv'] : ['-m', 'venv', '.venv'], SERVER);
}
run(venvPython(), ['-m', 'pip', 'install', '--upgrade', 'pip'], SERVER);
run(venvPython(), ['-m', 'pip', 'install', '-r', 'requirements-dev.txt'], SERVER);
run('npm', ['install'], CLIENT);

for (const dir of [SERVER, CLIENT]) {
  const env = join(dir, '.env');
  if (!existsSync(env)) {
    copyFileSync(join(dir, '.env.example'), env);
    console.log(`created ${env}`);
  }
}
console.log('\nSetup complete. Next: npm run dev');
