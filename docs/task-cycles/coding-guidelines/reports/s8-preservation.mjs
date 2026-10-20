import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(new URL('../../../../package.json', import.meta.url));
const ts = require('typescript');
const prettier = require('prettier');
const files = ['src/server/app.ts', 'src/server/main.ts', 'tests/http.test.mjs', 'tests/startup.test.mjs'];
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
  const before = execFileSync('git', ['show', `1efd0c87134064ec960bb73cc1c461004a482bdc:${file}`], {encoding:'utf8'});
  const after = readFileSync(file, 'utf8');
  assert.deepEqual(syntax(before,file), syntax(after,file), `${file}: AST/literal mismatch`);
  assert.equal(await prettier.format(before, {filepath:file}), after, `${file}: differs from formatter-only output`);
  assert.ok(!after.includes('\r'), `${file}: CR byte`);
  console.log(`${file}: AST/literal values identical; exact Prettier-only output; LF`);
}
const sample = readFileSync('src/server/app.ts','utf8');
assert.notDeepEqual(syntax(sample,'app.ts'), syntax(sample.replace('Not found','Different error'),'app.ts'));
assert.notDeepEqual(syntax(sample,'app.ts'), syntax(sample.replace('status(404)','status(200)'),'app.ts'));
console.log(`Positive controls: changed literal and status detected. TypeScript API ${ts.version}, Prettier ${prettier.version}`);
