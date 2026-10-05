import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:net';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

test('exits with an error instead of reporting ready when port 3000 is occupied', async () => {
  const blocker = createServer();
  let ownsBlocker = false;
  await new Promise((resolve, reject) => {
    blocker.once('error', error => {
      if (error.code === 'EADDRINUSE') resolve();
      else reject(error);
    });
    blocker.listen(3000, '127.0.0.1', () => {
      ownsBlocker = true;
      resolve();
    });
  });

  try {
    const entryPoint = fileURLToPath(new URL('../dist/server/main.js', import.meta.url));
    const result = spawnSync(process.execPath, [entryPoint], {
      encoding: 'utf8',
      timeout: 5000,
    });

    assert.equal(result.error, undefined, result.error?.message);
    assert.notEqual(result.status, 0, 'server process must report a startup failure');
    assert.match(result.stderr, /127\.0\.0\.1:3000.*EADDRINUSE|EADDRINUSE.*127\.0\.0\.1:3000/);
    assert.doesNotMatch(result.stdout, /Loop: http:\/\/127\.0\.0\.1:3000/);
  } finally {
    if (ownsBlocker) await new Promise((resolve, reject) => blocker.close(error => error ? reject(error) : resolve()));
  }
});
