import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(new URL('../../../../package.json', import.meta.url));
const ts = require('typescript');
const prettier = require('prettier');
const files = ['actions', 'data', 'flow', 'hex', 'layout', 'program', 'purity', 'random', 'rules', 'time'].map(name => 'tests/sim/' + name + '.test.mjs');
function syntax(source, file) {
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith('.ts') ? ts.ScriptKind.TS : ts.ScriptKind.JS);
  assert.equal(tree.parseDiagnostics.length, 0);
  function visit(node) {
    if (ts.isParenthesizedExpression(node)) return visit(node.expression);
    const result = [ts.SyntaxKind[node.kind]];
    if (!ts.isSourceFile(node) && typeof node.text === 'string') result.push(node.text);
    if (typeof node.escapedText === 'string') result.push(node.escapedText);
    ts.forEachChild(node, child => { result.push(visit(child)); });
    return result;
  }
  return visit(tree);
}
for (const file of files) {
  const before = execFileSync('git', ['show', `6bdc613d5fe8a0eb7fbdc51501d956009ea8eb9d:${file}`], {encoding:'utf8'});
  const after = readFileSync(file, 'utf8');
  assert.deepEqual(syntax(before,file), syntax(after,file), `${file}: AST/literal mismatch`);
  assert.equal(await prettier.format(before, {...await prettier.resolveConfig(file), filepath:file}), after, `${file}: differs from formatter-only output`);
  assert.ok(!after.includes('\r'), `${file}: CR byte`);
  console.log(`${file}: AST/literal values identical; exact Prettier-only output; LF`);
}
const sample = readFileSync('tests/sim/time.test.mjs','utf8');
assert.notDeepEqual(syntax(sample,'time.test.mjs'), syntax(sample.replace('passRealTime(sent(), 1000)', 'passRealTime(sent(), 1001)'),'time.test.mjs'));
assert.notDeepEqual(syntax(sample,'time.test.mjs'), syntax(sample.replace('state.run.minute, 1', 'state.run.minute, 2'),'time.test.mjs'));
assert.notDeepEqual(syntax(sample,'time.test.mjs'), syntax(sample.replace('assert.equal', 'assert.notEqual'),'time.test.mjs'));
assert.notDeepEqual(syntax(sample,'time.test.mjs'), syntax(sample.replace('1000 ms of real time', '1001 ms of real time'),'time.test.mjs'));
console.log(`Positive controls: changed input, expected value, assertion operator and description detected. Node ${process.version}, TypeScript API ${ts.version}, compiler ${require('typescript-compiler/package.json').version}, npm ${require('npm/package.json').version}, Prettier ${prettier.version}`);