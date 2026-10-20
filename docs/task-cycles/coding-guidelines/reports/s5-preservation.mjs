import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const base = 'e127aa4db9104b596cafd078caed40e0d4c46203';
const names = ['actions', 'archetypes', 'balance', 'conditions', 'maps', 'resources'];
function tree(text, path) {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.equal(source.parseDiagnostics.length, 0, path);
  function visit(node) {
    const children = [];
    ts.forEachChild(node, child => { children.push(visit(child)); });
    return [ts.SyntaxKind[node.kind], ts.isSourceFile(node) ? null : node.text ?? null, children];
  }
  return visit(source);
}
function comments(text) {
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, text);
  const result = [];
  for (let token = scanner.scan(); token !== ts.SyntaxKind.EndOfFileToken; token = scanner.scan()) {
    if ([ts.SyntaxKind.SingleLineCommentTrivia, ts.SyntaxKind.MultiLineCommentTrivia].includes(token)) {
      result.push(scanner.getTokenText().replace(/\r\n/g, '\n'));
    }
  }
  return result;
}
async function exportsOf(text) {
  const output = ts.transpileModule(text, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return await import('data:text/javascript;base64,' + Buffer.from(output).toString('base64'));
}
console.log(`Node ${process.version}; TypeScript API ${ts.version}; baseline ${base}`);
for (const name of names) {
  const path = `src/browser/sim/data/${name}.ts`;
  const before = execFileSync('git', ['show', `${base}:${path}`], { encoding: 'utf8' });
  const after = readFileSync(path, 'utf8');
  assert.deepStrictEqual(tree(after, path), tree(before, path), `AST: ${path}`);
  assert.deepStrictEqual(comments(after), comments(before), `comments: ${path}`);
  assert.equal(JSON.stringify(await exportsOf(after)), JSON.stringify(await exportsOf(before)),
    `all exported data and property/array order: ${path}`);
  assert.ok(!after.includes('\r'), `LF: ${path}`);
  console.log(`PASS ${path}: AST, comments, complete exported data/order, LF`);
}
// Positive controls prove the comparison is sensitive to content and array ordering.
const mapPath = 'src/browser/sim/data/maps.ts';
const maps = readFileSync(mapPath, 'utf8');
const changedNumber = maps.replace('width: 4', 'width: 5');
assert.notDeepStrictEqual(tree(changedNumber, mapPath), tree(maps, mapPath));
assert.notEqual(JSON.stringify(await exportsOf(changedNumber)), JSON.stringify(await exportsOf(maps)));
const original = await exportsOf(maps);
const altered = structuredClone(original.MAPS);
altered.forest.resources.reverse();
assert.notEqual(JSON.stringify(altered), JSON.stringify(original.MAPS));
console.log('PASS controls: changed width and reversed resource order are detected');
