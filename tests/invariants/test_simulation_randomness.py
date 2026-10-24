"""Invariant simulation-randomness: No file of the simulation draws a random number from any
source other than the generator seeded from the map run's state.

The files of the simulation are the files git tracks or would track under `src/browser/sim/` (the
part `simulation`'s source) and, for the run, the modules `npm run build` places under
`dist/public/sim/` in a temporary copy of the working tree (the real tree is never written).

Covers:
- static: every such source file, with its comments and the text of its string and template
  literals and regular expressions removed, names none of `Math.random`, `Math[` (computed access
  to Math), `crypto`, `getRandomValues`, `randomUUID`, and holds no string literal `crypto` or
  `node:crypto` (a module specifier); no such file other than `src/browser/sim/random.ts` holds
  the increment constant of the mulberry32 generator step, `0x6D2B79F5` (decimal 1831565813), so
  that no second generator step stands beside the seeded one;
- a control of the static scan: made-up source holding each forbidden form in turn is flagged,
  and made-up source holding the same names only in comments, strings, template text and a
  regular expression is not;
- dynamic: a Node script replaces `Math.random`, `crypto.getRandomValues`, `crypto.randomUUID`
  and the random functions of `node:crypto` with functions that count their calls and throw,
  first proving each replacement fires on a direct call, then imports every module under
  `dist/public/sim/` and drives the public functions of `game.js`: a character created, a send,
  240 game minutes with a program whose only rule is to wander, then a program mixing every action
  of the closed list (gathering, which draws from the gathering generator, included), a restart,
  an end and a second send, no map run going past game minute 240; no input may raise and no
  replaced function may be called;
- control: two sends with different real times give different wandering paths over the same 200
  game minutes, and a send repeated with the same real time gives the same path, so the draws
  depend on the seed's generator; likewise, with the program mixing every action, the gathering
  generator's state moves on as the character gathers, a send repeated with the same real time
  gives the same gatherings, piece by piece, and a send with another real time other ones.

Does NOT cover: a home-made generator seeded from something other than the map run's state that
uses none of the names above and not the mulberry32 constant; randomness reached through names
built at run time; the view.
"""

import json
import os
import re
import shutil
import tempfile
import unittest

import loop2_invariant_support as support

SOURCE_DIRECTORY = "src/browser/sim/"
GENERATOR_FILE = "src/browser/sim/random.ts"
BUILT_DIRECTORY = "dist/public/sim"
GAME_MODULE = "dist/public/sim/game.js"
CODE_EXTENSIONS = (".ts", ".mts", ".cts", ".js", ".mjs", ".cjs")

FORBIDDEN_NAMES = (
    (re.compile(r"\bMath\s*\.\s*random\b"), "Math.random"),
    (re.compile(r"\bMath\s*\?\.\s*random\b"), "Math?.random"),
    (re.compile(r"\bMath\s*\["), "Math[...]"),
    (re.compile(r"\bcrypto\b"), "crypto"),
    (re.compile(r"\bgetRandomValues\b"), "getRandomValues"),
    (re.compile(r"\brandomUUID\b"), "randomUUID"),
)
FORBIDDEN_STRINGS = ("crypto", "node:crypto")
GENERATOR_CONSTANT = (
    (re.compile(r"\b0[xX]0*6[dD]2[bB]79[fF]5n?\b"), "0x6D2B79F5"),
    (re.compile(r"\b1831565813n?\b"), "1831565813"),
)

REGEX_AFTER = set("(,=:[!&|?{};+-*%<>~^")
REGEX_AFTER_WORDS = ("return", "typeof", "case", "do", "else", "in", "of", "new", "delete",
                     "void", "throw", "yield", "await", "instanceof")


def split_source(text):
    """(code, strings): the text with comments removed and the content of every string literal,
    template text and regular expression removed, and the list of the string and template texts
    removed. A lexer for the forms TypeScript and JavaScript share, enough for a scan of names."""
    code, strings = [], []
    templates = []  # for each open template substitution, its depth of nested braces
    i, n = 0, len(text)

    def previous_significant():
        joined = "".join(code[-40:]).rstrip()
        return joined

    def read_template(start):
        """Read template text from `start` (after ` or }) to its end or to `${`; return the index
        after it and whether a substitution opened."""
        j, part = start, []
        while j < n:
            c = text[j]
            if c == "\\":
                part.append(text[j:j + 2])
                j += 2
                continue
            if c == "`":
                strings.append("".join(part))
                return j + 1, False
            if c == "$" and text.startswith("${", j):
                strings.append("".join(part))
                return j + 2, True
            part.append(c)
            j += 1
        strings.append("".join(part))
        return n, False

    while i < n:
        c = text[i]
        if text.startswith("//", i):
            j = text.find("\n", i)
            i = n if j < 0 else j
            continue
        if text.startswith("/*", i):
            j = text.find("*/", i + 2)
            i = n if j < 0 else j + 2
            code.append(" ")
            continue
        if c in "'\"":
            j, part = i + 1, []
            while j < n and text[j] != c and text[j] != "\n":
                if text[j] == "\\":
                    part.append(text[j + 1:j + 2])
                    j += 2
                    continue
                part.append(text[j])
                j += 1
            strings.append("".join(part))
            code.append(c + c)
            i = j + 1
            continue
        if c == "`":
            i, opened = read_template(i + 1)
            code.append("``")
            if opened:
                templates.append(0)
            continue
        if c == "}" and templates:
            if templates[-1] == 0:
                templates.pop()
                i, opened = read_template(i + 1)
                if opened:
                    templates.append(0)
                continue
            templates[-1] -= 1
        if c == "{" and templates:
            templates[-1] += 1
        if c == "/":
            before = previous_significant()
            word = re.search(r"([A-Za-z_$][\w$]*)$", before)
            if not before or before[-1] in REGEX_AFTER or (word and word.group(1)
                                                            in REGEX_AFTER_WORDS):
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
                code.append(" /re/ ")
                i = j
                continue
        code.append(c)
        i += 1
    return "".join(code), strings


def findings(relative, text):
    """What the static rule finds in one file's text: a list of descriptions."""
    found = []
    if relative.endswith(CODE_EXTENSIONS):
        code, strings = split_source(text)
    else:
        code, strings = text, []
    for pattern, name in FORBIDDEN_NAMES:
        if pattern.search(code):
            found.append(f"{relative} names {name}")
    for value in strings:
        if value in FORBIDDEN_STRINGS:
            found.append(f"{relative} holds the string {value!r}")
    if relative != GENERATOR_FILE:
        for pattern, name in GENERATOR_CONSTANT:
            if pattern.search(code):
                found.append(f"{relative} holds the generator step constant {name}")
    return found


CONSTANT_SOURCE = "export function step(s: number) { return (s + 0x6D2B79F5) | 0; }\n"
# Made-up sources for the control of the scan: each line alone must be flagged in a file other
# than the generator's file.
FLAGGED_SOURCES = (
    "export const u = Math.random();\n",
    "export const u = Math . random();\n",
    "export const u = Math?.random();\n",
    "export const u = Math['random']();\n",
    "export const b = globalThis.crypto.getRandomValues(new Uint32Array(1));\n",
    "export const b = crypto.randomUUID();\n",
    "import { randomInt } from 'node:crypto';\n",
    "import * as c from \"crypto\";\n",
    "const c = await import(`node:crypto`);\n",
    CONSTANT_SOURCE,
    "export function step(s: number) { return (s + 1831565813) | 0; }\n",
    "export const t = `${Math.random()}`;\n",
)
# Made-up source holding the names only where the scan must not look.
CLEAN_SOURCE = (
    "// Math.random() and crypto.getRandomValues are not used here.\n"
    "/* randomUUID, 0x6D2B79F5, node:crypto */\n"
    "export const label = 'Math.random crypto getRandomValues randomUUID';\n"
    "export const other = \"it's crypto-free\";\n"
    "export const text = `no Math.random() ${1 + 2} here, nor crypto`;\n"
    "export const pattern = /Math\\.random|crypto['\"]/g;\n"
    "export const half = 10 / 2 / 1;\n"
)

# Programs, in the shape `src/browser/sim/types.ts` exports: conditions from the closed list of
# D-23, actions of D-25 and D-26.
ALWAYS = {"kind": "always"}
WANDER_ONLY = {"rules": [{"condition": ALWAYS, "action": {"kind": "wander"}}]}


def rule(condition, action):
    return {"condition": condition, "action": action}


def below(kind, value):
    return {"kind": kind, "value": value}


def item_below(item, value):
    return {"kind": "itemBelow", "item": item, "value": value}


def gather(resource):
    return {"kind": "gather", "resource": resource}


def walk_to(resource):
    return {"kind": "walkTo", "resource": resource}


# Every action of the closed list: the acceptance program of tests/sim/acceptance.test.mjs.
MIXED = {"rules": [
    rule(below("satietyBelow", 35), {"kind": "eat"}),
    rule(below("temperatureBelow", 36), {"kind": "lightCampfire"}),
    rule(below("temperatureBelow", 36.5), {"kind": "feedCampfire"}),
    rule(below("temperatureBelow", 35.2), {"kind": "walkToCampfire"}),
    rule(below("campfireLeftBelow", 1), {"kind": "craftCampfire"}),
    rule(item_below("berry", 1), gather("berry")),
    rule(item_below("berry", 1), walk_to("berry")),
    rule({"kind": "hereBelow", "resource": "berry", "value": 1}, {"kind": "explore"}),
    rule(item_below("berry", 1), {"kind": "wander"}),
    rule(item_below("stick", 8), gather("stick")),
    rule(item_below("stick", 8), walk_to("stick")),
    rule(below("temperatureBelow", 36), {"kind": "lightItem"}),
    rule(ALWAYS, {"kind": "explore"}),
    rule({"kind": "awayFromCampfire"}, {"kind": "walkToCampfire"}),
    rule(ALWAYS, gather("stick")),
    rule(ALWAYS, gather("berry")),
    rule(ALWAYS, {"kind": "wander"}),
]}
# The map sent to, as the data files name it (D-18), and the character sent: the first one a
# new game creates, which takes the id 1.
SENT = {"mapId": "forest", "characterId": 1}
CREATE = ["createCharacter", "Ala"]
T = 1760000000000
T_OTHER = 1760000123456

PATH_MINUTES = 200
LONG_RUN = (
    [["newGame"], CREATE, ["setProgram", WANDER_ONLY], ["send", SENT, T]]
    + [["advanceMinutes", 1]] * PATH_MINUTES
    + [["advanceMinutes", 30], ["passRealTime", 5000],
       ["setProgram", MIXED], ["advanceMinutes", 5],
       ["restart"], ["advanceMinutes", 200], ["end"],
       ["send", SENT, T_OTHER], ["advanceMinutes", 200]]
)
LONG_RUN_MINUTES_BEFORE_RESTART = 240


def path_steps(real_ms, program=WANDER_ONLY):
    return ([["newGame"], CREATE, ["setProgram", program], ["send", SENT, real_ms]]
            + [["advanceMinutes", 1]] * PATH_MINUTES)


# What each replaced source must do when called directly before the simulation is imported.
PROOFS = (
    "Math.random",
    "globalThis.crypto.getRandomValues",
    "globalThis.crypto.randomUUID",
    "node:crypto randomBytes",
    "node:crypto randomInt",
    "node:crypto randomUUID",
    "node:crypto randomFillSync",
    "node:crypto getRandomValues",
    "node:crypto webcrypto.getRandomValues",
    "node:crypto webcrypto.randomUUID",
    "node:crypto default randomBytes",
)

DRIVER = r"""
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire, syncBuiltinESMExports } from 'node:module';

const [simDirectory, stepsPath, outPath] = process.argv.slice(2);
const MARK = 'simulation-randomness check: a replaced source of random numbers was called: ';
let calls = 0;
const replacement = (name) => function () { calls += 1; throw new Error(MARK + name); };
const replace = (target, name, label) =>
  Object.defineProperty(target, name, { value: replacement(label), writable: true,
                                        configurable: true, enumerable: true });

replace(Math, 'random', 'Math.random');
replace(globalThis.crypto, 'getRandomValues', 'crypto.getRandomValues');
replace(globalThis.crypto, 'randomUUID', 'crypto.randomUUID');
const require = createRequire(import.meta.url);
const nodeCrypto = require('node:crypto');
for (const name of ['randomBytes', 'pseudoRandomBytes', 'randomInt', 'randomUUID', 'randomFill',
                    'randomFillSync', 'generatePrime', 'generatePrimeSync']) {
  if (typeof nodeCrypto[name] === 'function') replace(nodeCrypto, name, 'node:crypto.' + name);
}
syncBuiltinESMExports();
const ns = await import('node:crypto');

const proofs = {};
const prove = (label, call) => {
  const before = calls;
  try { call(); proofs[label] = 'returned'; }
  catch (error) {
    proofs[label] = String(error && error.message).startsWith(MARK) && calls === before + 1
      ? 'threw' : 'other: ' + String(error);
  }
};
prove('Math.random', () => Math.random());
prove('globalThis.crypto.getRandomValues', () => globalThis.crypto.getRandomValues(new Uint8Array(4)));
prove('globalThis.crypto.randomUUID', () => globalThis.crypto.randomUUID());
prove('node:crypto randomBytes', () => ns.randomBytes(4));
prove('node:crypto randomInt', () => ns.randomInt(10));
prove('node:crypto randomUUID', () => ns.randomUUID());
prove('node:crypto randomFillSync', () => ns.randomFillSync(new Uint8Array(4)));
prove('node:crypto getRandomValues', () => ns.getRandomValues(new Uint8Array(4)));
prove('node:crypto webcrypto.getRandomValues', () => ns.webcrypto.getRandomValues(new Uint8Array(4)));
prove('node:crypto webcrypto.randomUUID', () => ns.webcrypto.randomUUID());
prove('node:crypto default randomBytes', () => ns.default.randomBytes(4));
calls = 0;

const modules = [];
const walk = (directory) => {
  for (const name of readdirSync(directory).sort()) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(m?js)$/.test(name)) modules.push(path);
  }
};
walk(simDirectory);

const result = { proofs, modules: modules.map((p) => relative(simDirectory, p).replace(/\\/g, '/')),
                 records: [], error: null, calls: 0 };
try {
  for (const path of modules) await import(pathToFileURL(path).href);
  const game = await import(pathToFileURL(join(simDirectory, 'game.js')).href);
  const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));
  let state;
  for (const [name, ...args] of steps) {
    if (name === 'newGame') {
      state = game.newGame();
    } else {
      state = game[name](state, ...args).state;
    }
    const run = state.run;
    result.records.push({ step: name, minute: run ? run.minute : null,
                          at: run ? run.character.at : null,
                          backpack: run ? run.character.backpack : null,
                          gatherRandom: run ? run.gatherRandom : null });
  }
} catch (error) {
  result.error = String(error && error.stack || error);
}
result.calls = calls;
writeFileSync(outPath, JSON.stringify(result));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def drive(copy, steps):
    if not os.path.isfile(copy.file(GAME_MODULE)):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}, so the simulation "
                             "cannot be driven")
    directory = tempfile.mkdtemp(prefix="loop2-randomness-")
    try:
        script = os.path.join(directory, "driver.mjs")
        steps_path = os.path.join(directory, "steps.json")
        out_path = os.path.join(directory, "result.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(DRIVER)
        with open(steps_path, "w", encoding="utf-8", newline="\n") as handle:
            json.dump(steps, handle)
        code, output = support.run(
            [node(), script, copy.file(BUILT_DIRECTORY), steps_path, out_path], directory)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            return json.load(handle)
    finally:
        shutil.rmtree(directory, ignore_errors=True)


def wander_path(result):
    return [json.dumps(r["at"], sort_keys=True) for r in result["records"][3:]]


def gatherings(result):
    """The backpack after each game minute of the run, from its send on."""
    return [json.dumps(r["backpack"], sort_keys=True) for r in result["records"][2:]]


class SimulationRandomness(unittest.TestCase):

    def assert_clean_run(self, result):
        for label in PROOFS:
            self.assertEqual(result["proofs"].get(label), "threw",
                             f"the replacement of {label} did not fire on a direct call, so a "
                             "call of it from the simulation would go unseen")
        self.assertIsNone(result["error"], f"driving the simulation raised:\n{result['error']}")
        self.assertEqual(result["calls"], 0,
                         "the simulation called a replaced source of random numbers")

    def test_source_names_no_other_source_of_random_numbers(self):
        # invariant: simulation-randomness
        files = [p for p in support.listed_files() if p.startswith(SOURCE_DIRECTORY)]
        self.assertTrue(files, f"the working tree holds no file under {SOURCE_DIRECTORY}, so "
                               "the simulation's source cannot be scanned")
        found = []
        for relative in files:
            found += findings(relative, support.read_text(os.path.join(support.ROOT, relative)))
        self.assertEqual(found, [], "the simulation's source names another source of random "
                                    "numbers or a second generator step")

    def test_control_the_scan_flags_each_forbidden_form(self):
        # invariant: simulation-randomness
        for text in FLAGGED_SOURCES:
            with self.subTest(source=text):
                self.assertTrue(findings("src/browser/sim/probe.ts", text),
                                f"the scan does not flag {text!r}")
        self.assertEqual(findings("src/browser/sim/probe.ts", CLEAN_SOURCE), [],
                         "the scan flags names standing only in comments, strings, template "
                         "text or a regular expression")
        self.assertEqual(findings(GENERATOR_FILE, CONSTANT_SOURCE), [],
                         "the scan flags the generator step constant in the generator's file")

    def test_run_calls_no_other_source_of_random_numbers(self):
        # invariant: simulation-randomness
        result = drive(support.built_copy(), LONG_RUN)
        self.assert_clean_run(result)
        self.assertIn("game.js", result["modules"])
        self.assertEqual(len(result["records"]), len(LONG_RUN))
        restart_at = [r["step"] for r in result["records"]].index("restart")
        self.assertGreaterEqual(result["records"][restart_at - 1]["minute"],
                                LONG_RUN_MINUTES_BEFORE_RESTART,
                                "the run did not cover the minutes it is meant to")

    def test_control_draws_follow_the_seed(self):
        # invariant: simulation-randomness
        copy = support.built_copy()
        first = drive(copy, path_steps(T))
        again = drive(copy, path_steps(T))
        other = drive(copy, path_steps(T_OTHER))
        for result in (first, again, other):
            self.assert_clean_run(result)
        path = wander_path(first)
        self.assertGreater(len(set(path)), 1, "the wandering character never moves")
        self.assertEqual(wander_path(again), path,
                         "two sends with the same real time give different wandering paths")
        self.assertNotEqual(wander_path(other), path,
                            f"sends with real times {T} and {T_OTHER} give the same wandering "
                            "path, so the draws do not show a dependence on the seed")


    def test_control_gathering_draws_follow_the_seed(self):
        # invariant: simulation-randomness
        copy = support.built_copy()
        first = drive(copy, path_steps(T, MIXED))
        again = drive(copy, path_steps(T, MIXED))
        other = drive(copy, path_steps(T_OTHER, MIXED))
        for result in (first, again, other):
            self.assert_clean_run(result)
        states = {r["gatherRandom"] for r in first["records"][2:]}
        self.assertGreater(len(states), 3, "the gathering generator never moves on")
        self.assertGreater(len(set(gatherings(first))), 3, "the character gathers no piece")
        self.assertEqual(gatherings(again), gatherings(first),
                         "two sends with the same real time give different gatherings")
        self.assertNotEqual(gatherings(other), gatherings(first),
                            f"sends with real times {T} and {T_OTHER} give the same gatherings, "
                            "so the draws do not show a dependence on the seed")


if __name__ == "__main__":
    unittest.main()
