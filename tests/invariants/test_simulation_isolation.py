"""Invariant simulation-isolation: No file of the simulation imports a file from outside the
simulation, or uses the page, a timer, the system time or a global object that the browser or
Node.js adds to those of the JavaScript language.

The files of the simulation are the files git tracks or would track under `src/browser/sim/` (the
part `simulation`'s source) and, for the run, the modules `npm run build` places under
`dist/public/sim/` in a temporary copy of the working tree (the real tree is never written).

Reading of the sentence:
- imports a file from outside the simulation: an `import ... from`, `export ... from`, a bare
  `import '...'`, a dynamic `import(...)` or a `/// <reference path=...>` whose specifier is not a
  relative path resolving under `src/browser/sim/` (a package or `node:` specifier included); a
  dynamic import of something other than a string literal counts, since its target cannot be
  bounded;
- the page, a timer, a global object the browser or Node.js adds: a name, outside comments and
  strings and not after a `.`, from the list HOST_GLOBALS written out below (the page's objects,
  the timers, `console`, `process`, `performance` and the other host additions), or a member of
  `globalThis`, `window`, `self` or `global` read by a name not on the language's list
  LANGUAGE_GLOBALS, or read by a computed key;
- the system time: `Date.now`, `performance.now`, `Date()` called without `new`, or `new Date()`
  without arguments, with `Date` or `performance` reached by its own name or as a member of
  anything (`globalThis.Date.now()`, `new window.Date()`, for two).

Covers:
- static: every source file is scanned by the reading above;
- a control of the static scan: made-up source holding each forbidden form in turn is flagged,
  and made-up source holding the same names in comments, strings, after a `.` or as object keys,
  with a relative import inside the simulation, is not;
- dynamic: a Node script (run with `--experimental-vm-modules`) loads every built module of the
  simulation into a `node:vm` context that holds only the globals of the JavaScript language —
  `console` and `WebAssembly`, which `node:vm` adds, removed — with `Date` replaced by one that
  throws on `Date.now()`, `Date()` and `new Date()`; every import is resolved by the script and
  any specifier resolving outside `dist/public/sim/` is recorded and refused. It then drives the
  public functions of `game.js` through a character created, a send, a mixed program for 150 game
  minutes, real time,
  a pause, a restart, an end and a second send. No module may fail to load, no input may raise
  and no refused import or guarded call may be recorded;
- a control of the dynamic harness: made-up modules that call `setTimeout`, read `document`,
  call `Date.now()`, `new Date()`, `Date()`, write to `console`, read `process`, import a file
  outside their directory or import `node:fs` each fail in the same harness, and a made-up module
  using only language globals (`new Date(0)` included) runs.

Does NOT cover: host objects reached through names built at run time; a local variable that
shadows a host name (it is flagged, which is stricter than the sentence); code paths of the built
modules the driven scenario does not reach (the static scan covers those in the source).
"""

import json
import os
import posixpath
import re
import shutil
import tempfile
import unittest

import loop2_invariant_support as support

SOURCE_DIRECTORY = "src/browser/sim/"
BUILT_DIRECTORY = "dist/public/sim"
CODE_EXTENSIONS = (".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs")

# Globals the browser or Node.js add to those of the JavaScript language, as a name standing
# alone: the page, timers, the system's clock and the other host objects.
HOST_GLOBALS = (
    "window", "self", "global", "document", "navigator", "location", "history", "screen",
    "localStorage", "sessionStorage", "indexedDB", "caches", "alert", "confirm", "prompt",
    "fetch", "XMLHttpRequest", "WebSocket", "EventSource", "Worker", "SharedWorker",
    "setTimeout", "setInterval", "setImmediate", "clearTimeout", "clearInterval",
    "clearImmediate", "requestAnimationFrame", "cancelAnimationFrame", "requestIdleCallback",
    "cancelIdleCallback", "queueMicrotask", "performance", "console", "process", "Buffer",
    "require", "module", "exports", "__dirname", "__filename", "structuredClone", "crypto",
    "atob", "btoa", "TextEncoder", "TextDecoder", "URL", "URLSearchParams", "AbortController",
    "AbortSignal", "Event", "EventTarget", "CustomEvent", "MessageChannel", "BroadcastChannel",
    "Blob", "File", "FileReader", "FormData", "Headers", "Request", "Response", "Image",
    "Audio", "HTMLElement", "Element", "HTMLCanvasElement", "CanvasRenderingContext2D",
    "matchMedia", "getComputedStyle", "customElements", "ResizeObserver", "MutationObserver",
    "IntersectionObserver", "WebAssembly",
)
# Objects through whose members any host object can be reached.
GLOBAL_OBJECTS = ("globalThis", "window", "self", "global")
# The globals of the JavaScript language (ECMAScript and its Intl API), as a node:vm context
# holds them.
LANGUAGE_GLOBALS = (
    "AggregateError", "Array", "ArrayBuffer", "AsyncDisposableStack", "Atomics", "BigInt",
    "BigInt64Array", "BigUint64Array", "Boolean", "DataView", "Date", "DisposableStack",
    "Error", "EvalError", "FinalizationRegistry", "Float16Array", "Float32Array",
    "Float64Array", "Function", "Infinity", "Int16Array", "Int32Array", "Int8Array", "Intl",
    "Iterator", "JSON", "Map", "Math", "NaN", "Number", "Object", "Promise", "Proxy",
    "RangeError", "ReferenceError", "Reflect", "RegExp", "Set", "SharedArrayBuffer", "String",
    "SuppressedError", "Symbol", "SyntaxError", "TypeError", "URIError", "Uint16Array",
    "Uint32Array", "Uint8Array", "Uint8ClampedArray", "WeakMap", "WeakRef", "WeakSet",
    "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval",
    "globalThis", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape",
)
# Reads of the system time, however `Date` or `performance` is reached: by its own name or as a
# member of anything (`globalThis.Date`, `window.performance`, ...).
MEMBER_CHAIN = r"(?:[\w$]+\s*(?:\?\.|\.)\s*)*"
SYSTEM_TIME = (
    (re.compile(r"(?<![\w$])Date\s*(?:\?\.|\.)\s*now\b"), "Date.now"),
    (re.compile(r"(?<![\w$])performance\s*(?:\?\.|\.)\s*now\b"), "performance.now"),
    (re.compile(r"\bnew\s+" + MEMBER_CHAIN + r"Date\s*\(\s*\)"), "new Date()"),
    (re.compile(r"\bnew\s+" + MEMBER_CHAIN + r"Date\s*(?![\s(\w$])"), "new Date"),
)
BARE_DATE_CALL = re.compile(r"(?<![\w$])Date\s*(?:\?\.\s*)?\(")
NEW_BEFORE = re.compile(r"\bnew\s+" + MEMBER_CHAIN + r"$")

REGEX_AFTER = set("(,=:[!&|?{};+-*%<>~^")
REGEX_AFTER_WORDS = ("return", "typeof", "case", "do", "else", "in", "of", "new", "delete",
                     "void", "throw", "yield", "await", "instanceof")


def segments(text):
    """The text cut into ('code' | 'comment' | 'string' | 'template' | 'regex', text) pieces, by
    the forms TypeScript and JavaScript share — enough for a scan of names and specifiers."""
    out, buf, braces = [], [], []
    i, n = 0, len(text)

    def flush():
        if buf:
            out.append(("code", "".join(buf)))
            buf.clear()

    def last_code():
        for kind, piece in reversed(out + [("code", "".join(buf))]):
            if kind == "comment":
                continue
            stripped = piece.rstrip()
            if kind != "code":
                return "x"  # an operand
            if stripped:
                return stripped
        return ""

    def template(start):
        """From a backtick or the brace closing a substitution, to the end of the template or
        the opening of its next substitution."""
        j = start + 1
        while j < n:
            if text[j] == "\\":
                j += 2
                continue
            if text[j] == "`":
                out.append(("template", text[start:j + 1]))
                return j + 1
            if text.startswith("${", j):
                out.append(("template", text[start:j + 2]))
                braces.append(0)
                return j + 2
            j += 1
        out.append(("template", text[start:]))
        return n

    while i < n:
        c = text[i]
        if text.startswith("//", i) or text.startswith("/*", i):
            flush()
            if text[i + 1] == "/":
                j = text.find("\n", i)
                j = n if j < 0 else j
            else:
                j = text.find("*/", i + 2)
                j = n if j < 0 else j + 2
            out.append(("comment", text[i:j]))
            buf.append(" ")
            i = j
            continue
        if c in "'\"":
            j = i + 1
            while j < n and text[j] != c and text[j] != "\n":
                j += 2 if text[j] == "\\" else 1
            flush()
            out.append(("string", text[i:j + 1]))
            i = j + 1
            continue
        if c == "`":
            flush()
            i = template(i)
            continue
        if c == "}" and braces:
            if braces[-1] == 0:
                braces.pop()
                flush()
                i = template(i)
                continue
            braces[-1] -= 1
        if c == "{" and braces:
            braces[-1] += 1
        if c == "/":
            before = last_code()
            word = re.search(r"([A-Za-z_$][\w$]*)$", before)
            if not before or before[-1] in REGEX_AFTER or (
                    word and word.group(1) in REGEX_AFTER_WORDS):
                j, in_class = i + 1, False
                while j < n and text[j] != "\n":
                    if text[j] == "\\":
                        j += 2
                        continue
                    if text[j] == "[":
                        in_class = True
                    elif text[j] == "]":
                        in_class = False
                    elif text[j] == "/" and not in_class:
                        break
                    j += 1
                j += 1
                while j < n and (text[j].isalnum() or text[j] == "_"):
                    j += 1
                flush()
                out.append(("regex", text[i:j]))
                i = j
                continue
        buf.append(c)
        i += 1
    flush()
    return out


def without_comments(text):
    return "".join(" " if kind == "comment" else piece for kind, piece in segments(text))


def code_only(text):
    """Comments removed, the content of strings, template text and regular expressions blanked."""
    parts = []
    for kind, piece in segments(text):
        if kind == "code":
            parts.append(piece)
        elif kind in ("string", "template"):
            parts.append(" '' ")
        elif kind == "regex":
            parts.append(" /re/ ")
        else:
            parts.append(" ")
    return "".join(parts)


SPECIFIER_FORMS = (
    re.compile(r"\bfrom\s*(['\"])([^'\"\n]*)\1"),
    re.compile(r"\bimport\s*(['\"])([^'\"\n]*)\1"),
    re.compile(r"\bimport\s*\(\s*(['\"`])([^'\"`\n]*)\1\s*[,)]"),
)
DYNAMIC_IMPORT = re.compile(r"\bimport\s*\(")
REFERENCE_PATH = re.compile(r"///\s*<reference\s+(?:path|types|lib)\s*=\s*(['\"])([^'\"]*)\1")


def import_findings(relative, text):
    found = []
    stripped = without_comments(text)
    specifiers = []
    for pattern in SPECIFIER_FORMS:
        specifiers += [m.group(2) for m in pattern.finditer(stripped)]
    literal_dynamic = len(SPECIFIER_FORMS[2].findall(stripped))
    if len(DYNAMIC_IMPORT.findall(code_only(text))) > literal_dynamic:
        found.append(f"{relative} imports by a dynamic import of no string literal")
    for match in REFERENCE_PATH.finditer(text):
        found.append(f"{relative} references {match.group(2)!r} by a triple-slash directive")
    for specifier in specifiers:
        if not specifier.startswith(("./", "../")):
            found.append(f"{relative} imports {specifier!r}, which is no file of the simulation")
            continue
        target = posixpath.normpath(posixpath.join(posixpath.dirname(relative), specifier))
        if not (target + "/").startswith(SOURCE_DIRECTORY):
            found.append(f"{relative} imports {specifier!r}, resolving to {target}, outside "
                         f"{SOURCE_DIRECTORY}")
    return found


def name_findings(relative, text):
    found = []
    code = code_only(text)
    for name in HOST_GLOBALS:
        for match in re.finditer(r"(?<![\w$])" + re.escape(name) + r"(?![\w$])", code):
            before = code[:match.start()].rstrip()
            after = code[match.end():].lstrip()
            if before.endswith("."):
                continue  # a member of something else
            if after.startswith(":") and not after.startswith("::") and before[-1:] in ("{", ","):
                continue  # an object key or a member of a type
            found.append(f"{relative} names the host global {name}")
            break
    for name in GLOBAL_OBJECTS:
        pattern = r"(?<![\w$.])" + re.escape(name) + r"\s*(?:\?\.\s*|\.\s*)?(\[|[\w$]+)"
        for match in re.finditer(pattern, code):
            member = match.group(1)
            if member == "[":
                found.append(f"{relative} reads a computed member of {name}")
            elif member not in LANGUAGE_GLOBALS and code[match.start():match.end()].find(".") >= 0:
                found.append(f"{relative} reads {name}.{member}, no global of the language")
    for pattern, label in SYSTEM_TIME:
        if pattern.search(code):
            found.append(f"{relative} reads the system time by {label}")
    for match in BARE_DATE_CALL.finditer(code):
        if not NEW_BEFORE.search(code[:match.start()]):
            found.append(f"{relative} reads the system time by Date() without new")
            break
    return found


def findings(relative, text):
    if not relative.endswith(CODE_EXTENSIONS):
        return []
    return import_findings(relative, text) + name_findings(relative, text)


PROBE = "src/browser/sim/probe.ts"
FLAGGED_SOURCES = (
    "import { RESOURCES } from '../view/credits.js';\n",
    "export { x } from '../../server/app.js';\n",
    "import '../main.js';\n",
    "import express from 'express';\n",
    "import { readFileSync } from 'node:fs';\n",
    "const m = await import('../view/app.js');\n",
    "const m = await import(name);\n",
    "/// <reference path=\"../view/app.ts\" />\nexport const a = 1;\n",
    "export const t = document.title;\n",
    "export function f() { setTimeout(() => {}, 0); }\n",
    "export function f() { requestAnimationFrame(() => {}); }\n",
    "export const now = Date.now();\n",
    "export const now = new Date();\n",
    "export const now = new Date;\n",
    "export const now = Date();\n",
    "export const r = { realMsCarry: globalThis.Date.now() % 1 };\n",
    "export const now = globalThis.Date?.now();\n",
    "export const now = globalThis . Date . now();\n",
    "export const now = window.Date.now();\n",
    "export const now = self.Date.now();\n",
    "export const now = global.Date.now();\n",
    "export const now = globalThis.performance.now();\n",
    "export const now = new globalThis.Date();\n",
    "export const now = new globalThis.Date;\n",
    "export const now = globalThis.Date();\n",
    "export const p = performance.now();\n",
    "export function log(x: number) { console.log(x); }\n",
    "export const env = process.env;\n",
    "export const w = window.innerWidth;\n",
    "export const s = globalThis.localStorage;\n",
    "export const s = globalThis['document'];\n",
    "export const c = structuredClone({ a: 1 });\n",
    "export const t = `${navigator.userAgent}`;\n",
)
CLEAN_SOURCE = (
    "// document, setTimeout, Date.now(), console.log and process are not used here.\n"
    "/* import x from '../view/app.js'; window.alert() */\n"
    "import type { Hex } from './types.js';\n"
    "import { MAPS } from './data/maps.js';\n"
    "export { RESOURCES } from './data/resources.js';\n"
    "export const label = 'document setTimeout Date.now() console process';\n"
    "export const text = `no ${1 + 2} document here`;\n"
    "export const pattern = /document|Date\\.now\\(\\)/g;\n"
    "export const record = { document: 1, console: 2, location: 3 };\n"
    "export const member = record.document + record.location;\n"
    "export const epoch = new Date(0).getTime();\n"
    "export const day = new globalThis.Date(86400000).getUTCDate();\n"
    "export const utc = globalThis.Date.UTC(2020, 0, 1);\n"
    "export const m = Math.max(1, 2) / 2;\n"
    "export const g = globalThis.Math.min(1, 2);\n"
    "export const size = MAPS.forest.width;\n"
)

# --- the dynamic harness ----------------------------------------------------------------------

GUARD = r"""
(() => {
  const hits = [];
  const RealDate = Date;
  function GuardedDate(...args) {
    if (!new.target) { hits.push('Date()'); throw new Error('simulation-isolation: Date()'); }
    if (args.length === 0) {
      hits.push('new Date()'); throw new Error('simulation-isolation: new Date()');
    }
    return Reflect.construct(RealDate, args, new.target);
  }
  GuardedDate.prototype = RealDate.prototype;
  GuardedDate.now = () => { hits.push('Date.now'); throw new Error('simulation-isolation: Date.now'); };
  GuardedDate.parse = RealDate.parse;
  GuardedDate.UTC = RealDate.UTC;
  Object.defineProperty(globalThis, 'Date', { value: GuardedDate, writable: true,
                                              configurable: true, enumerable: false });
  delete globalThis.console;
  delete globalThis.WebAssembly;
  return hits;
})()
"""

DRIVER = r"""
import vm from 'node:vm';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative, isAbsolute } from 'node:path';

const [directory, configPath, outPath] = process.argv.slice(2);
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const result = { globals: null, modules: [], refused: [], hits: [], error: null, records: [] };
const root = resolve(directory);
const inside = (path) => { const r = relative(root, path); return r !== '' && !r.startsWith('..') && !isAbsolute(r); };

const context = vm.createContext({});
const hits = vm.runInContext(config.guard, context);
result.globals = vm.runInContext('Object.getOwnPropertyNames(globalThis).sort()', context);
const parse = vm.runInContext('(text) => JSON.parse(text)', context);
const stringify = vm.runInContext('(value) => JSON.stringify(value)', context);

const cache = new Map();
const load = (path) => {
  if (!cache.has(path)) {
    const module = new vm.SourceTextModule(readFileSync(path, 'utf8'),
                                           { context, identifier: path });
    cache.set(path, module);
  }
  return cache.get(path);
};
const linker = (specifier, referencing) => {
  const target = specifier.startsWith('./') || specifier.startsWith('../')
    ? resolve(dirname(referencing.identifier), specifier) : null;
  if (target === null || !inside(target) || !existsSync(target)) {
    result.refused.push({ from: relative(root, referencing.identifier).replace(/\\/g, '/'), specifier });
    throw new Error('simulation-isolation: refused import ' + specifier);
  }
  return load(target);
};

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir).sort()) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.m?js$/.test(name)) files.push(path);
  }
};
walk(root);

try {
  const namespaces = {};
  for (const path of files) {
    const module = load(path);
    if (module.status === 'unlinked') await module.link(linker);
    if (module.status === 'linked') await module.evaluate();
    if (module.status === 'errored') throw module.error;
    const name = relative(root, path).replace(/\\/g, '/');
    result.modules.push(name);
    namespaces[name] = module.namespace;
  }
  if (config.mode === 'game') {
    const game = namespaces['game.js'];
    let state;
    for (const [name, ...args] of parse(JSON.stringify(config.steps))) {
      const hadRun = Boolean(state && state.run);
      let error = null;
      try {
        state = name === 'newGame' ? game.newGame() : game[name](state, ...args).state;
      } catch (thrown) {
        error = { name: String(thrown && thrown.name), message: String(thrown && thrown.message) };
      }
      result.records.push({ step: name, hadRun, error,
                            minute: state && state.run ? state.run.minute : null });
    }
  } else {
    for (const name of Object.keys(namespaces)) {
      const f = namespaces[name].f;
      if (typeof f === 'function') { await f(); result.records.push({ step: name }); }
    }
  }
} catch (error) {
  result.error = String(error && error.stack || error);
}
result.hits = [...hits];
writeFileSync(outPath, JSON.stringify(result));
"""

ALWAYS = {"kind": "always"}
MIXED = {"rules": [
    {"condition": {"kind": "hereBelow", "resource": "stick", "value": 1},
     "action": {"kind": "explore"}},
    {"condition": ALWAYS, "action": {"kind": "walkTo", "resource": "berry"}},
    {"condition": ALWAYS, "action": {"kind": "explore"}},
    {"condition": ALWAYS, "action": {"kind": "wander"}},
]}
# The map sent to, as the data files name it (D-18), and the character sent: the first one a
# new game creates, which takes the id 1.
SENT = {"mapId": "forest", "characterId": 1}
CREATE = ["createCharacter", "Ala"]
T = 1760000000000
T_OTHER = 1760000123456
# Inputs on the paths with no map run: before the first send and after an end.
NO_RUN = [["setPaused", True], ["passRealTime", 5000], ["setPaused", False],
          ["passRealTime", 1500], ["advanceMinutes", 3], ["setProgram", MIXED], ["restart"],
          ["end"]]
NO_RUN_FUNCTIONS = ("createCharacter", "setPaused", "passRealTime", "advanceMinutes", "setProgram",
                    "restart", "end")
GAME_STEPS = (
    [["newGame"], CREATE] + NO_RUN + [["setProgram", MIXED], ["send", SENT, T]]
    + [["advanceMinutes", 1]] * 150
    + [["passRealTime", 61000], ["setPaused", True], ["passRealTime", 5000],
       ["advanceMinutes", 5], ["setPaused", False], ["restart"], ["advanceMinutes", 100],
       ["end"]]
    + NO_RUN
    + [["send", SENT, T_OTHER], ["advanceMinutes", 100], ["setPaused", True], ["restart"],
       ["setPaused", False], ["end"]]
)
FIRST_SEND = GAME_STEPS.index(["send", SENT, T])


def run_problems(result):
    """What a driven run shows against the sentence: a refused import, a guarded read of the
    system time, a failure to load, and any error other than a plain `Error` the simulation
    throws on a path with no map run (a missing host global raises a ReferenceError or a
    TypeError instead)."""
    problems = [f"refused import {r}" for r in result["refused"]]
    problems += [f"read the system time by {h}" for h in result["hits"]]
    if result["error"]:
        problems.append(f"failed: {result['error']}")
    for index, record in enumerate(result["records"]):
        error = record["error"]
        if error and (record["hadRun"] or error["name"] != "Error"
                      or error["message"].startswith("simulation-isolation")):
            problems.append(f"step {index} {record['step']} raised {error['name']}: "
                            f"{error['message']}")
    return problems


# Made-up game modules for the control of the no-run paths: each reads the system time or a host
# object only where there is no map run.
MADE_UP_GAME = r"""
const pass = (state) => ({ state, events: [] });
const noRun = (state) => { NO_RUN_READ return pass(state); };
export function newGame() { return { run: null, paused: false }; }
export function createCharacter(state) { return noRun(state); }
export function setProgram(state, program) { return pass({ ...state, program }); }
export function send(state) { return pass({ ...state, run: { minute: 0 } }); }
export function restart(state) {
  if (!state.run) throw new Error('no map run');
  return pass({ ...state, run: { minute: 0 } });
}
export function end(state) {
  if (!state.run) throw new Error('no map run');
  return pass({ ...state, run: null });
}
export function setPaused(state, paused) { return state.run ? pass({ ...state, paused }) : noRun(state); }
export function passRealTime(state) { return state.run ? pass(state) : noRun(state); }
export function advanceMinutes(state, m) {
  return state.run ? pass({ ...state, run: { minute: state.run.minute + m } }) : noRun(state);
}
"""


def made_up_game(no_run_read):
    return MADE_UP_GAME.replace("NO_RUN_READ", no_run_read)


NO_RUN_READS = {
    "globalThis.Date.now()": "state = { ...state, realMsCarry: globalThis.Date.now() % 1 };",
    "globalThis.performance.now()": "state = { ...state, t: globalThis.performance.now() };",
    "new globalThis.Date()": "state = { ...state, t: new globalThis.Date().getTime() };",
    "setTimeout": "setTimeout(() => {}, 0);",
}

# Made-up modules for the control of the harness: each must fail.
FAILING_MODULES = {
    "timer.js": "export function f() { setTimeout(() => {}, 0); }\n",
    "page.js": "export function f() { return document.title; }\n",
    "now.js": "export function f() { return Date.now(); }\n",
    "new-date.js": "export function f() { return new Date().getTime(); }\n",
    "date-call.js": "export function f() { return Date(); }\n",
    "console.js": "export function f() { console.log('x'); }\n",
    "process.js": "export function f() { return process.env; }\n",
    "outside.js": "import { a } from '../outside.js';\nexport function f() { return a; }\n",
    "node-fs.js": "import { readFileSync } from 'node:fs';\nexport function f() { return readFileSync; }\n",
}
CLEAN_MODULE = (
    "import { b } from './helper.js';\n"
    "export function f() { return [new Date(0).getTime(), Math.max(1, b), JSON.stringify({ a: 1 }),"
    " new Map([[1, 2]]).size, Intl.NumberFormat ? 1 : 0]; }\n"
)
CLEAN_HELPER = "export const b = 2;\n"


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def harness(directory, config):
    work = tempfile.mkdtemp(prefix="loop2-isolation-")
    try:
        script = os.path.join(work, "driver.mjs")
        config_path = os.path.join(work, "config.json")
        out_path = os.path.join(work, "result.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(DRIVER)
        with open(config_path, "w", encoding="utf-8", newline="\n") as handle:
            json.dump(dict(config, guard=GUARD), handle)
        code, output = support.run([node(), "--experimental-vm-modules", script, directory,
                                    config_path, out_path], work)
        if not os.path.isfile(out_path):
            raise AssertionError(f"the harness exited {code} without a result:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            return json.load(handle)
    finally:
        shutil.rmtree(work, ignore_errors=True)


def made_up_directory(files):
    directory = tempfile.mkdtemp(prefix="loop2-isolation-probe-")
    inner = os.path.join(directory, "sim")
    os.makedirs(inner)
    with open(os.path.join(directory, "outside.js"), "w", encoding="utf-8") as handle:
        handle.write("export const a = 1;\n")
    for name, text in files.items():
        with open(os.path.join(inner, name), "w", encoding="utf-8", newline="\n") as handle:
            handle.write(text)
    return directory, inner


class SimulationIsolation(unittest.TestCase):

    def test_source_imports_and_uses_nothing_outside_the_language(self):
        # invariant: simulation-isolation
        files = [p for p in support.listed_files() if p.startswith(SOURCE_DIRECTORY)]
        self.assertTrue(files, f"the working tree holds no file under {SOURCE_DIRECTORY}")
        found = []
        for relative in files:
            found += findings(relative, support.read_text(os.path.join(support.ROOT, relative)))
        self.assertEqual(found, [], "a file of the simulation imports from outside it or uses "
                                    "a host global or the system time")

    def test_control_the_scan_flags_each_forbidden_form(self):
        # invariant: simulation-isolation
        for text in FLAGGED_SOURCES:
            with self.subTest(source=text):
                self.assertTrue(findings(PROBE, text), f"the scan does not flag {text!r}")
        self.assertEqual(findings(PROBE, CLEAN_SOURCE), [],
                         "the scan flags forms the sentence allows")

    def test_built_simulation_runs_with_the_language_globals_alone(self):
        # invariant: simulation-isolation
        copy = support.built_copy()
        directory = copy.file(BUILT_DIRECTORY)
        self.assertTrue(os.path.isfile(os.path.join(directory, "game.js")),
                        f"`npm run build` placed no {BUILT_DIRECTORY}/game.js")
        result = harness(directory, {"mode": "game", "steps": GAME_STEPS})
        for name in ("console", "WebAssembly", "process", "setTimeout", "document"):
            self.assertNotIn(name, result["globals"], f"the harness's context holds {name}")
        self.assertEqual(run_problems(result), [], "the simulation imports from outside it, reads "
                                                   "the system time or uses a host global")
        self.assertIn("game.js", result["modules"])
        self.assertEqual(len(result["records"]), len(GAME_STEPS))
        self.assertEqual(result["records"][FIRST_SEND + 150]["minute"], 150,
                         "the driven run did not reach game minute 150")
        for name in NO_RUN_FUNCTIONS:
            self.assertTrue(any(r["step"] == name and not r["hadRun"] for r in result["records"]),
                            f"{name} was never called on a game with no map run")

    def test_control_the_no_run_paths_are_judged(self):
        # invariant: simulation-isolation
        for label, read in NO_RUN_READS.items():
            directory, inner = made_up_directory({"game.js": made_up_game(read)})
            result = harness(inner, {"mode": "game", "steps": GAME_STEPS})
            shutil.rmtree(directory, ignore_errors=True)
            with self.subTest(read=label):
                self.assertTrue(run_problems(result),
                                f"a read of {label} on the paths with no map run goes unseen")
        directory, inner = made_up_directory({"game.js": made_up_game("")})
        result = harness(inner, {"mode": "game", "steps": GAME_STEPS})
        shutil.rmtree(directory, ignore_errors=True)
        self.assertEqual(run_problems(result), [], "a made-up game reading nothing is judged "
                                                   "to break the sentence")

    def test_control_the_harness_fails_each_forbidden_use(self):
        # invariant: simulation-isolation
        for name, text in FAILING_MODULES.items():
            directory, inner = made_up_directory({name: text})
            result = harness(inner, {"mode": "call"})
            shutil.rmtree(directory, ignore_errors=True)
            with self.subTest(module=name):
                self.assertTrue(result["error"] or result["refused"] or result["hits"],
                                f"the harness lets the made-up module {name} run: {text!r}")
                self.assertEqual(result["records"], [],
                                 f"the made-up module {name} ran to its end")
        directory, inner = made_up_directory({"clean.js": CLEAN_MODULE, "helper.js": CLEAN_HELPER})
        result = harness(inner, {"mode": "call"})
        shutil.rmtree(directory, ignore_errors=True)
        self.assertIsNone(result["error"], f"the harness refuses a clean module:\n{result['error']}")
        self.assertEqual(result["records"], [{"step": "clean.js"}])


if __name__ == "__main__":
    unittest.main()
