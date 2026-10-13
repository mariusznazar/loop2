import { spawnSync } from 'node:child_process';
import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const compiler = fileURLToPath(new URL('node_modules/typescript/bin/tsc', root));
const checkOnly = process.argv.includes('--check');

for (const config of ['tsconfig.browser.json', 'tsconfig.server.json']) {
  const result = spawnSync(process.execPath, [compiler, '-p', config, ...(checkOnly ? ['--noEmit'] : [])], {
    cwd: fileURLToPath(root),
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (!checkOnly) {
  await mkdir(new URL('dist/public/', root), { recursive: true });
  await copyFile(new URL('src/browser/index.html', root), new URL('dist/public/index.html', root));
  const iconsOut = new URL('dist/public/icons/', root);
  await mkdir(iconsOut, { recursive: true });
  for (const name of await readdir(new URL('assets/icons/', root))) {
    if (name.endsWith('.svg')) await copyFile(new URL(`assets/icons/${name}`, root), new URL(name, iconsOut));
  }
}
