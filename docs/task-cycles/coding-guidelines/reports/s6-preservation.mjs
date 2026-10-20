import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const base = '2f33b5deb858104729ce8871f653c051740c6c49';
const names = ['app', 'clock', 'credits', 'footer', 'program-editor'];
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
console.log(`Node ${process.version}; TypeScript API ${ts.version}; baseline ${base}`);
for (const name of names) {
  const path = `src/browser/view/${name}.ts`;
  const before = execFileSync('git', ['show', `${base}:${path}`], { encoding: 'utf8' });
  const after = readFileSync(path, 'utf8');
  assert.deepStrictEqual(tree(after, path), tree(before, path), `AST/literal values: ${path}`);
  assert.deepStrictEqual(comments(after), comments(before), `comments: ${path}`);
  assert.ok(!after.includes('\r'), `LF: ${path}`);
  console.log(`PASS ${path}: complete ordered AST, identifier/literal values, comments, LF`);
}
const path = 'src/browser/view/program-editor.ts';
const editor = readFileSync(path, 'utf8');
const changedLabel = editor.replace('Dodaj regułę', 'Dodaj inną regułę');
assert.notEqual(changedLabel, editor);
// A comment change is observable separately from the syntax comparison.
assert.notDeepStrictEqual(comments(changedLabel), comments(editor));
const changedValue = editor.replace('"Program"', '"Changed program"');
assert.notEqual(changedValue, editor);
assert.notDeepStrictEqual(tree(changedValue, path), tree(editor, path));
const changedBranch = editor.replace('if (!next) return;', 'if (next) return;');
assert.notEqual(changedBranch, editor);
assert.notDeepStrictEqual(tree(changedBranch, path), tree(editor, path));
console.log('PASS controls: changed comment, visible string and edit guard detected');
