import ts from 'typescript';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const root = '.runs/task-cycles/wprawa-i-drzewa/reports/';
const report = JSON.parse(readFileSync(root + 'review-mutation.json', 'utf8'));
const config = ts.readConfigFile('tsconfig.browser.json', ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, process.cwd());
const results = [];
const normalized = file => path.resolve(file).replaceAll('\\', '/').toLowerCase();
for (const [file, data] of Object.entries(report.files)) {
  for (const mutant of data.mutants.filter(m => ['Survived', 'NoCoverage'].includes(m.status))) {
    const original = ts.createSourceFile(file, data.source, ts.ScriptTarget.Latest, true);
    const start = original.getPositionOfLineAndCharacter(mutant.location.start.line - 1, mutant.location.start.column - 1);
    const end = original.getPositionOfLineAndCharacter(mutant.location.end.line - 1, mutant.location.end.column - 1);
    const changed = data.source.slice(0, start) + mutant.replacement + data.source.slice(end);
    const options = { ...parsed.options, noEmit: true };
    const host = ts.createCompilerHost(options);
    const getSource = host.getSourceFile.bind(host);
    host.getSourceFile = (name, languageVersion, onError, shouldCreate) => normalized(name) === normalized(file)
      ? ts.createSourceFile(name, changed, languageVersion, true)
      : getSource(name, languageVersion, onError, shouldCreate);
    const program = ts.createProgram(parsed.fileNames, options, host);
    const errors = ts.getPreEmitDiagnostics(program).map(d => ({ file: d.file?.fileName, code: d.code, message: ts.flattenDiagnosticMessageText(d.messageText, ' ') }));
    results.push({ id: mutant.id, file, original: data.source.slice(start, end), replacement: mutant.replacement, errors });
    if (errors.length) console.log(JSON.stringify({ id: mutant.id, errors }));
  }
}
writeFileSync(root + 'review-mutant-types.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify({ analyzed: results.length, rejected: results.filter(x => x.errors.length).length }));
