import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import prettier from 'prettier';

const base = 'efe6849ac267cda475d3d1feb10d56e4c9ec64b7';
const original = 'c379207bfd8bd148d3589ea75604ba5165915d01';
const paths = ['send-panel', 'status-row', 'terrain-panel', 'terrain-picture', 'tile-list'].map(n => `src/browser/view/${n}.ts`).concat('src/browser/main.ts', 'src/browser/index.html');
const show = (ref, path) => execFileSync('git', ['show', `${ref}:${path}`], { encoding: 'utf8' });
function tree(text, path, assertions = []) {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
  assert.equal(source.parseDiagnostics.length, 0, path);
  function visit(n) {
    if (ts.isNonNullExpression(n)) assertions.push(n.expression.getText(source));
    const children = [];
    ts.forEachChild(n, c => { children.push(visit(c)); });
    return [ts.SyntaxKind[n.kind], ts.isSourceFile(n) ? null : n.text ?? null, children];
  }
  return visit(source);
}
for (const path of paths) {
  const before = show(base, path);
  const after = readFileSync(path, 'utf8');
  let expected = before;
  if (path.endsWith('terrain-picture.ts')) {
    assert.equal(before.split('const centre = centres[index]!;').length, 2);
    expected = before.replace('const centre = centres[index]!;', 'const centre = centres[index];');
  }
  assert.equal(after, await prettier.format(expected, { filepath: path }), path);
  assert.ok(!after.includes('\r'), path);
  if (path.endsWith('.ts')) assert.deepStrictEqual(tree(after, path), tree(expected, path), path);
  console.log(`PASS exact accepted edit plus pinned formatter, AST/literals and LF: ${path}`);
}
const expectedRemoved = new Map([
  ['src/browser/sim/hex.ts', 12], ['src/browser/sim/layout.ts', 1],
  ['src/browser/sim/program.ts', 1], ['src/browser/sim/run.ts', 1],
  ['src/browser/view/terrain-picture.ts', 1],
]);
const files = execFileSync('git', ['ls-files', 'src/**/*.ts'], { encoding: 'utf8' }).trim().split(/\r?\n/);
let removed = 0;
for (const path of files) {
  const oldAssertions = [], currentAssertions = [];
  tree(show(original, path), path, oldAssertions);
  tree(readFileSync(path, 'utf8'), path, currentAssertions);
  const count = oldAssertions.length - currentAssertions.length;
  assert.equal(count, expectedRemoved.get(path) ?? 0, path);
  // All retained assertions must be original expressions, in their original order.
  let start = 0;
  for (const expression of currentAssertions) {
    const index = oldAssertions.indexOf(expression, start);
    assert.ok(index >= 0, `Retained assertion changed: ${path} ${expression}`);
    start = index + 1;
  }
  if (count || currentAssertions.length) console.log(JSON.stringify({ path, removed: count, retained: currentAssertions }));
  removed += count;
}
assert.equal(removed, 16);
console.log(`PASS cumulative exactly ${removed} accepted removals, no removals in any other TypeScript file`);

const htmlPath = 'src/browser/index.html';
const beforeHtml = show(base, htmlPath), afterHtml = readFileSync(htmlPath, 'utf8');
const style = text => text.match(/<style>([\s\S]*?)<\/style>/)[1];
// Parse CSS separately: canonical formatter equality preserves selector combinators,
// declaration values/order, media conditions, and quoted or whitespace-sensitive values.
assert.equal(await prettier.format(style(beforeHtml), { parser: 'css' }), await prettier.format(style(afterHtml), { parser: 'css' }));
// Outside CSS the entire document is unchanged except HTML void-tag closing syntax.
const shell = text => text.replace(/<style>[\s\S]*?<\/style>/, '<style></style>').replace(/\s*\/>/g, '>').replace(/\r\n/g, '\n');
assert.equal(shell(beforeHtml), shell(afterHtml));
assert.equal(beforeHtml.match(/<body>([\s\S]*?)<\/body>/)[1], afterHtml.match(/<body>([\s\S]*?)<\/body>/)[1]);
console.log('PASS HTML body text/whitespace byte-identical; shell unchanged except void meta tags; embedded CSS canonical equality');
const changed = afterHtml.replace('gap: 16px;', 'gap: 17px;');
assert.notEqual(changed, afterHtml);
assert.notEqual(await prettier.format(style(changed), { parser: 'css' }), await prettier.format(style(afterHtml), { parser: 'css' }));
const code = readFileSync(paths[1], 'utf8');
assert.notDeepStrictEqual(tree(code.replace('"Pauza"', '"Changed pause"'), paths[1]), tree(code, paths[1]));
console.log('PASS sensitivity: changed CSS declaration and visible control label detected');
