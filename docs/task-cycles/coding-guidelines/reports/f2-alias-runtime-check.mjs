import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(path.join(process.cwd(), 'package.json'));
const estreeRequire = createRequire(require.resolve('@typescript-eslint/typescript-estree'));
const apiEntry = estreeRequire.resolve('typescript');
const wrapper = JSON.parse(readFileSync(path.join(path.dirname(apiEntry), '../package.json'), 'utf8'));
const compiler = require('typescript-compiler');
const apiVersion = estreeRequire('typescript').version;
console.log(JSON.stringify({node: process.version, apiEntry, wrapperName: wrapper.name, wrapperVersion: wrapper.version, wrapperSource: readFileSync(apiEntry, 'utf8').trim(), apiRuntime: apiVersion, compilerRuntime: compiler.version}));
assert.equal(wrapper.version, '6.0.2');
assert.equal(apiVersion, '6.0.3');
assert.equal(compiler.version, '7.0.2');
for (const name of ['source', 'configuration']) {
  const record = JSON.parse(readFileSync(`.runs/task-cycles/coding-guidelines/reports/f2-alias-${name}.jsonl`, 'utf8'));
  assert.equal(record.verdict, 'fail');
  assert.equal(record.invariant, null);
  assert.match(record.description, /Parser TypeScript API runtime must be 6\.0\.2/);
}
console.log('Actual API mismatch yields no named source or configuration verdict.');
