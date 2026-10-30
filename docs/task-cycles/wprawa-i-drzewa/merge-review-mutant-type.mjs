import ts from 'typescript';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
const configuration = ts.readConfigFile('tsconfig.browser.json', ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(configuration.config, ts.sys, process.cwd());
const host = ts.createCompilerHost(parsed.options);
const originalRead = host.readFile.bind(host);
const target = resolve('src/browser/sim/run.ts').replaceAll('\\','/');
host.readFile = file => {
  const source = originalRead(file);
  return resolve(file).replaceAll('\\','/') === target
    ? source.replace('streamState(seed, "attack")','streamState(seed, "")') : source;
};
const program = ts.createProgram(parsed.fileNames, parsed.options, host);
const diagnostics = ts.getPreEmitDiagnostics(program).filter(item=>item.file?.fileName.replaceAll('\\','/').endsWith('/src/browser/sim/run.ts'));
const result = diagnostics.map(item=>({code:item.code,message:ts.flattenDiagnosticMessageText(item.messageText,'\n')}));
writeFileSync('.runs/task-cycles/wprawa-i-drzewa/reports/merge-review-mutant-type.json',JSON.stringify(result,null,2));
assert.ok(result.some(item=>item.code===2345 && item.message.includes('Stream')));
console.log(JSON.stringify(result));
