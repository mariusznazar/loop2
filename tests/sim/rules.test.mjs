// Spec rules S1 and S2 (spec section 3), checked by scanning the source.
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { ARCHETYPES } from '../../dist/public/sim/data/archetypes.js';
import { MAPS } from '../../dist/public/sim/data/maps.js';
import { RESOURCES } from '../../dist/public/sim/data/resources.js';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const SIM = join(ROOT, 'src', 'browser', 'sim');
const VIEW = join(ROOT, 'src', 'browser', 'view');
const DATA = join(SIM, 'data');
const MAIN = join(ROOT, 'src', 'browser', 'main.ts');
const CODE = /\.(ts|mts|cts|js|mjs|cjs)$/;

/** Every code file below a directory, as absolute paths; none when the directory is missing. */
function codeFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { recursive: true })
    .map(name => join(directory, String(name)))
    .filter(path => statSync(path).isFile() && CODE.test(path))
    .sort();
}

const REGEX_AFTER = new Set('(,=:[!&|?{};+-*%<>~^'.split(''));
const REGEX_AFTER_WORDS = new Set(['return', 'typeof', 'case', 'do', 'else', 'in', 'of', 'new', 'delete',
  'void', 'throw', 'yield', 'await', 'instanceof']);

/**
 * Splits source text into code and literal texts: comments are dropped; each string literal and
 * each piece of template text is replaced in the code by a marker `@S<n>@`, n indexing `strings`;
 * a regular expression is replaced by ` /re/ `. Template substitutions stay code.
 */
function splitSource(text) {
  let code = '';
  const strings = [];
  const templates = []; // per open template substitution: its depth of nested braces
  let i = 0;
  const n = text.length;

  const mark = value => {
    strings.push(value);
    return `@S${strings.length - 1}@`;
  };
  // Reads template text from `start` (after ` or }); returns [index after it, substitution opened].
  const readTemplate = start => {
    let j = start;
    let part = '';
    while (j < n) {
      const c = text[j];
      if (c === '\\') { part += text.slice(j, j + 2); j += 2; continue; }
      if (c === '`') { code += mark(part); return [j + 1, false]; }
      if (c === '$' && text[j + 1] === '{') { code += mark(part); return [j + 2, true]; }
      part += c;
      j += 1;
    }
    code += mark(part);
    return [n, false];
  };

  while (i < n) {
    const c = text[i];
    if (text.startsWith('//', i)) {
      const j = text.indexOf('\n', i);
      i = j < 0 ? n : j;
      continue;
    }
    if (text.startsWith('/*', i)) {
      const j = text.indexOf('*/', i + 2);
      i = j < 0 ? n : j + 2;
      code += ' ';
      continue;
    }
    if (c === "'" || c === '"') {
      let j = i + 1;
      let part = '';
      while (j < n && text[j] !== c && text[j] !== '\n') {
        if (text[j] === '\\') { part += text[j + 1] ?? ''; j += 2; continue; }
        part += text[j];
        j += 1;
      }
      code += mark(part);
      i = j + 1;
      continue;
    }
    if (c === '`') {
      const [next, opened] = readTemplate(i + 1);
      i = next;
      if (opened) templates.push(0);
      continue;
    }
    if (c === '}' && templates.length > 0) {
      if (templates.at(-1) === 0) {
        templates.pop();
        const [next, opened] = readTemplate(i + 1);
        i = next;
        if (opened) templates.push(0);
        continue;
      }
      templates[templates.length - 1] -= 1;
    }
    if (c === '{' && templates.length > 0) templates[templates.length - 1] += 1;
    if (c === '/') {
      const before = code.trimEnd();
      const word = /([A-Za-z_$][\w$]*)$/.exec(before);
      if (!before || REGEX_AFTER.has(before.at(-1)) || (word && REGEX_AFTER_WORDS.has(word[1]))) {
        let j = i + 1;
        let inClass = false;
        while (j < n && text[j] !== '\n') {
          if (text[j] === '\\') { j += 2; continue; }
          if (text[j] === '[') inClass = true;
          else if (text[j] === ']') inClass = false;
          else if (text[j] === '/' && !inClass) break;
          j += 1;
        }
        j += 1;
        while (j < n && /\w/.test(text[j])) j += 1;
        code += ' /re/ ';
        i = j;
        continue;
      }
    }
    code += c;
    i += 1;
  }
  return { code, strings };
}

// Names S1 forbids: browser globals, Node modules and globals, timers, system time, other randomness.
const S1_FORBIDDEN = [
  'document', 'window', 'navigator', 'localStorage', 'sessionStorage', 'indexedDB',
  'requestAnimationFrame', 'cancelAnimationFrame', 'fetch', 'XMLHttpRequest', 'WebSocket', 'globalThis',
  'process', 'Buffer', 'require', '__dirname', '__filename', 'global',
  'setTimeout', 'setInterval', 'setImmediate', 'clearTimeout', 'clearInterval', 'clearImmediate',
  'queueMicrotask', 'Date', 'performance', 'crypto',
];
const IMPORT_SPECIFIER = /\b(?:from|import)\s*\(?\s*@S(\d+)@/g;
const DYNAMIC_IMPORT = /\bimport\s*\(\s*(?!@S\d+@\s*\))/;

/** What spec rule S1 finds in one file of the simulation; `file` is an absolute path under SIM. */
function s1Findings(file, text) {
  const found = [];
  const { code, strings } = splitSource(text);
  const where = relative(ROOT, file).split(sep).join('/');
  for (const match of code.matchAll(IMPORT_SPECIFIER)) {
    const specifier = strings[Number(match[1])];
    const target = resolve(dirname(file), specifier);
    const relativeSpecifier = specifier.startsWith('./') || specifier.startsWith('../');
    if (!relativeSpecifier || !(target + sep).startsWith(SIM + sep)) {
      found.push(`${where} imports ${specifier}`);
    }
  }
  if (DYNAMIC_IMPORT.test(code)) found.push(`${where} imports a module named at run time`);
  for (const name of S1_FORBIDDEN) {
    if (new RegExp(`(?<![.\\w$])${name}(?![\\w$])`).test(code)) found.push(`${where} names ${name}`);
  }
  if (/\bMath\s*\??\.\s*random\b|\bMath\s*\[/.test(code)) found.push(`${where} names Math.random`);
  return found;
}

/** Map, resource and archetype ids and names, read from the built data modules. */
const IDS = [...Object.keys(MAPS), ...Object.keys(RESOURCES), ...Object.keys(ARCHETYPES)];
const NAMES = [...Object.values(MAPS), ...Object.values(RESOURCES), ...Object.values(ARCHETYPES)].map(entry => entry.name);

/** What spec rule S2 finds in one file outside sim/data: a literal id or name of the content. */
function s2Findings(where, text) {
  const found = [];
  const { code, strings } = splitSource(text);
  for (const value of strings) {
    if (IDS.includes(value) || NAMES.includes(value)) found.push(`${where} holds the literal ${JSON.stringify(value)}`);
  }
  for (const id of IDS) {
    if (new RegExp(`(?<![\\w$])${id}(?![\\w$])`).test(code)) found.push(`${where} names the content id ${id}`);
  }
  return found;
}

const simFiles = codeFiles(SIM);
const s2Files = [...simFiles.filter(file => !file.startsWith(DATA + sep)), ...codeFiles(VIEW), MAIN];

test('S1: the simulation imports only its own files and names no DOM, Node, timer, clock or other randomness', () => {
  assert.ok(simFiles.length > 0, 'no source file under src/browser/sim');
  const found = simFiles.flatMap(file => s1Findings(file, readFileSync(file, 'utf8')));
  assert.deepEqual(found, []);
});

test('S1 control: each forbidden form is flagged, and the same names in comments and strings are not', () => {
  const probe = join(SIM, 'probe.ts');
  const flagged = [
    "import { readFileSync } from 'node:fs';",
    "import { app } from '../view/app.js';",
    "export * from 'some-package';",
    "import './side-effect-outside/../../view/x.js';",
    'const m = await import(name);',
    'const now = Date.now();',
    'const t = performance.now();',
    'setTimeout(() => 0, 10);',
    'const id = setInterval(tick, 200);',
    'const el = document.createElement("div");',
    'const w = window.innerWidth;',
    'const s = localStorage.getItem("x");',
    'requestAnimationFrame(draw);',
    'const a = process.argv;',
    'const b = Buffer.from("x");',
    'const u = Math.random();',
    'const v = Math["random"]();',
    'const c = crypto.getRandomValues(new Uint32Array(1));',
    'const g = globalThis.navigator;',
    'const k = `${Date.now()}`;',
  ];
  for (const source of flagged) {
    assert.notDeepEqual(s1Findings(probe, source), [], source);
  }
  const clean = [
    "import { MAPS } from './data/maps.js';",
    "import type { Hex } from './types.js';",
    '// Date.now(), setTimeout and document are not used here',
    '/* window, process, Math.random() */',
    "export const label = 'document window Date performance';",
    'export const text = `no Date.now() ${1 + 2} here`;',
    'export const pattern = /Date|window/g;',
    'export const half = total / 2 / 1;',
    'const update = run.performance + state.date;',
  ];
  for (const source of clean) {
    assert.deepEqual(s1Findings(probe, source), [], source);
  }
});

test('S2 scans the simulation outside sim/data, the view and the entry module main.ts', () => {
  assert.ok(s2Files.includes(MAIN), 'main.ts is not scanned');
  assert.ok(s2Files.some(file => file.startsWith(VIEW + sep)), 'no view file is scanned');
  assert.ok(s2Files.some(file => file.startsWith(SIM + sep) && !file.startsWith(DATA + sep)), 'no simulation file is scanned');
  assert.ok(!s2Files.some(file => file.startsWith(DATA + sep)), 'a sim/data file is scanned');
});

test('S2: no file of the simulation outside sim/data, of the view or main.ts writes a content id or name', () => {
  const found = s2Files.flatMap(file => s2Findings(relative(ROOT, file).split(sep).join('/'), readFileSync(file, 'utf8')));
  assert.deepEqual(found, []);
});

test('S2 control: literal ids, names and closed unions are flagged; reading them from data is not', () => {
  const [mapId, map] = Object.entries(MAPS)[0];
  const [resourceId, resource] = Object.entries(RESOURCES)[0];
  const [archetypeId, archetype] = Object.entries(ARCHETYPES)[0];
  const flagged = [
    `const map = MAPS['${mapId}'];`,
    `const map = MAPS.${mapId};`,
    `type ResourceId = '${resourceId}' | 'other';`,
    `const name = "${resource.name}";`,
    `const title = \`${map.name}\`;`,
    `const who = { kind: '${archetypeId}' };`,
    `const label = '${archetype.name}';`,
  ];
  for (const source of flagged) {
    assert.notDeepEqual(s2Findings('probe.ts', source), [], source);
  }
  const clean = [
    'const name = MAPS[run.mapId].name;',
    `// the map ${mapId} is called ${map.name}`,
    `const text = \`Mapa: \${MAPS[mapId].name}\`;`,
    "const kind = 'explore';",
  ];
  for (const source of clean) {
    assert.deepEqual(s2Findings('probe.ts', source), [], source);
  }
});

test('a directory that does not exist yet (the view before it is written) gives no files, not an error', () => {
  assert.deepEqual(codeFiles(join(ROOT, 'src', 'browser', 'no-such-directory')), []);
});
