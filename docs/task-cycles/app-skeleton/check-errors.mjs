import assert from 'node:assert/strict';
import { writeFile, unlink } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

for (const directory of ['browser', 'server']) {
  const probe = `src/${directory}/type-error-probe.ts`;
  await writeFile(probe, 'const invalid: number = "invalid";\n', { flag: 'wx' });
  try {
    for (const args of [['scripts/build.mjs', '--check'], ['scripts/build.mjs']]) {
      const result = spawnSync(process.execPath, args, { encoding: 'utf8' });
      assert.equal(result.error, undefined);
      assert.notEqual(result.status, 0);
      assert.match(result.stdout + result.stderr, /TS2322/);
    }
  } finally {
    await unlink(probe);
  }
}
console.log('Both compiler failure paths passed.');