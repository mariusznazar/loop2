import assert from 'node:assert/strict';
import fs from 'node:fs';
import cp from 'node:child_process';
import crypto from 'node:crypto';
import ts from '../../../../node_modules/typescript/lib/typescript.js';
import * as prettier from '../../../../node_modules/prettier/index.mjs';

const base = 'fc7445a540c0beb524ea821cd30d9c25a3ce0e92';
const names = ['game', 'hex', 'layout', 'program', 'random', 'run', 'types'];
const expected = { game: 0, hex: 12, layout: 1, program: 1, random: 0, run: 1, types: 0 };
const parse = (path, text) => {
  const tree = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
  assert.equal(tree.parseDiagnostics.length, 0, path);
  return tree;
};
function assertions(tree) {
  const nodes = [];
  const visit = node => {
    if (ts.isNonNullExpression(node)) nodes.push(node);
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return nodes;
}
function canonical(node) {
  if (ts.isParenthesizedExpression(node)) return canonical(node.expression);
  const children = [];
  ts.forEachChild(node, child => { children.push(canonical(child)); });
  return [node.kind, ts.isSourceFile(node) ? null : node.text ?? null, children];
}
const hash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const results = [];
for (const name of names) {
  const path = `src/browser/sim/${name}.ts`;
  const before = cp.execFileSync('git', ['show', `${base}:${path}`], {encoding: 'utf8'});
  const nodes = assertions(parse(path, before));
  const removed = nodes.filter(node => name !== 'run' || ts.isElementAccessExpression(node.expression));
  assert.equal(removed.length, expected[name], path);
  let expectedText = before;
  for (const node of [...removed].sort((a, b) => b.end - a.end)) {
    assert.equal(expectedText[node.end - 1], '!');
    expectedText = expectedText.slice(0, node.end - 1) + expectedText.slice(node.end);
  }
  if (process.argv[2] === 'apply') fs.writeFileSync(path, expectedText);
  else {
    const after = fs.readFileSync(path, 'utf8');
    assert.equal(after, await prettier.format(expectedText, {filepath: path, ...await prettier.resolveConfig(path)}), `${path}: exact formatting of accepted edits`);
    const actualTree = parse(path, after);
    assert.deepEqual(canonical(actualTree), canonical(parse(path, expectedText)), path);
    const remaining = assertions(actualTree).map(node => node.getText());
    if (name === 'run') assert.deepEqual(remaining, ['walkTarget(run, action.resource)!', 'tileAt(run.tiles, next)!']);
    else assert.equal(remaining.length, 0, path);
    assert.ok(!after.includes('\r'), `${path}: LF`);
    const emit = text => canonical(parse(`${name}.js`, ts.transpileModule(text, {
      compilerOptions: {target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext},
      fileName: path,
    }).outputText));
    assert.deepEqual(emit(before), emit(after), `${path}: emitted JS AST`);
    results.push({path, removed: removed.length, remaining, sourceAstSha256: hash(canonical(actualTree)), emittedAstSha256: hash(emit(after))});
  }
}
console.log(JSON.stringify({mode: process.argv[2] ?? 'verify', base, typescriptApi: ts.version, results}, null, 2));
