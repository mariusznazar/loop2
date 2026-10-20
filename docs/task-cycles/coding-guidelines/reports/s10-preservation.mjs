import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(new URL('../../../../package.json', import.meta.url));
const ts = require('typescript');
const prettier = require('prettier');
const files = ['tests/view/icons.test.mjs', 'tests/view/program-editor.test.mjs', 'tests/view/status-row.test.mjs', 'tests/view/terrain-picture.test.mjs', 'tests/view/tile-list.test.mjs'];
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
  const before = execFileSync('git', ['show', `8f5657458c12fd16c58ad6abc282a025c15f134b:${file}`], {encoding:'utf8'});
  const after = readFileSync(file, 'utf8');
  assert.deepEqual(syntax(before,file), syntax(after,file), `${file}: AST/literal mismatch`);
  assert.equal(await prettier.format(before, {filepath:file}), after, `${file}: differs from formatter-only output`);
  assert.ok(!after.includes('\r'), `${file}: CR byte`);
  console.log(`${file}: AST/literal values identical; exact Prettier-only output; LF`);
}
const sample = readFileSync('tests/view/icons.test.mjs','utf8');
assert.notDeepEqual(syntax(sample,'icons.mjs'), syntax(sample.replace('not an svg document','changed SVG diagnostic'),'icons.mjs'));
assert.notDeepEqual(syntax(sample,'icons.mjs'), syntax(sample.replace('files.length > 0','files.length > 1'),'icons.mjs'));
assert.notDeepEqual(syntax(sample,'icons.mjs'), syntax(sample.replace('assert.ok(files.length > 0, "no icon files found");',''),'icons.mjs'));
assert.notDeepEqual(syntax(sample,'icons.mjs'), syntax(sample.replace('/<script/i','/<style/i'),'icons.mjs'));
console.log(`Positive controls: changed literal, assertion threshold, removed assertion and regex detected. TypeScript API ${ts.version}, Prettier ${prettier.version}`);