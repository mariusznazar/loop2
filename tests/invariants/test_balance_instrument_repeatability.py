"""Invariant balance-instrument-repeatability: No file of code in `balance/` reads the system clock
or draws a random number from any source other than the seed of its measurement.

The files of code are the files git tracks or would track under `balance/` with an extension of
TypeScript or JavaScript; the overlay files and the player descriptions there are JSON and hold
no code.

Reading of the sentence: a file reads the system clock where its code, outside comments, strings,
template text and regular expressions, holds `Date.now`, `performance.now`, `new Date()` with no
argument, `Date()` called without `new` or `hrtime`, with `Date` or `performance` reached by its
own name or as a member of anything (`globalThis.Date.now()`); it draws a random number from
another source where that code names `Math.random`, `Math[` (computed access to `Math`), `crypto`,
`getRandomValues` or `randomUUID`, holds the increment constant of the mulberry32 generator step,
`0x6D2B79F5` (decimal 1831565813), so that no generator beside the seeded one of the game stands
in the instrument, or where a string literal of the file is a module specifier of the clock or
of random numbers (`crypto`, `node:crypto`, `perf_hooks`, `node:perf_hooks`).

Covers:
- static: every such file is scanned by the reading above;
- a control of the scan: made-up source holding each forbidden form in turn is flagged, and made-up
  source holding the same names only in comments, strings, template text, a regular expression,
  or a date given its argument (`new Date(0)`), is not.

Does NOT cover: a generator written from scratch that uses none of the names above and not the
mulberry32 constant; the clock or a random source reached through a name built at run time; a
command the file starts whose output depends on the time.
"""

import re
import unittest

import balance_source_scan as scan

PROBE = "balance/probe.mjs"

FORBIDDEN_NAMES = (
    (re.compile(r"\bMath\s*\.\s*random\b"), "Math.random"),
    (re.compile(r"\bMath\s*\?\.\s*random\b"), "Math?.random"),
    (re.compile(r"\bMath\s*\["), "Math[...]"),
    (re.compile(r"\bcrypto\b"), "crypto"),
    (re.compile(r"\bgetRandomValues\b"), "getRandomValues"),
    (re.compile(r"\brandomUUID\b"), "randomUUID"),
    (re.compile(r"\bhrtime\b"), "hrtime"),
)
FORBIDDEN_STRINGS = ("crypto", "node:crypto", "perf_hooks", "node:perf_hooks")
GENERATOR_CONSTANT = (
    (re.compile(r"\b0[xX]0*6[dD]2[bB]79[fF]5n?\b"), "0x6D2B79F5"),
    (re.compile(r"\b1831565813n?\b"), "1831565813"),
)
# Reads of the system clock, however `Date` or `performance` is reached: by its own name or as a
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


def findings(relative, text):
    """What the scan finds in one file's text: a list of descriptions."""
    found = []
    code = scan.code_only(text)
    for pattern, name in FORBIDDEN_NAMES:
        if pattern.search(code):
            found.append(f"{relative} names {name}")
    for pattern, name in GENERATOR_CONSTANT:
        if pattern.search(code):
            found.append(f"{relative} holds the generator step constant {name}")
    for pattern, label in SYSTEM_TIME:
        if pattern.search(code):
            found.append(f"{relative} reads the system clock by {label}")
    for match in BARE_DATE_CALL.finditer(code):
        if not NEW_BEFORE.search(code[: match.start()]):
            found.append(f"{relative} reads the system clock by Date() without new")
            break
    for value in scan.string_values(text):
        if value in FORBIDDEN_STRINGS:
            found.append(f"{relative} holds the string {value!r}")
    return found


# Made-up sources for the control of the scan: each alone must be flagged.
FLAGGED_SOURCES = (
    "export const u = Math.random();\n",
    "export const u = Math . random();\n",
    "export const u = Math?.random();\n",
    "export const u = Math['random']();\n",
    "export const b = globalThis.crypto.getRandomValues(new Uint32Array(1));\n",
    "export const b = crypto.randomUUID();\n",
    "import { randomInt } from 'node:crypto';\n",
    'import * as c from "crypto";\n',
    "const c = await import(`node:crypto`);\n",
    "export function step(s) { return (s + 0x6D2B79F5) | 0; }\n",
    "export function step(s) { return (s + 1831565813) | 0; }\n",
    "export const now = Date.now();\n",
    "export const now = new Date();\n",
    "export const now = new Date;\n",
    "export const now = Date();\n",
    "export const now = globalThis.Date.now();\n",
    "export const now = globalThis.Date?.now();\n",
    "export const now = globalThis . Date . now();\n",
    "export const now = new globalThis.Date();\n",
    "export const now = globalThis.Date();\n",
    "export const p = performance.now();\n",
    "export const p = globalThis.performance.now();\n",
    "import { performance } from 'node:perf_hooks';\nexport const p = performance.now();\n",
    "export const t = process.hrtime.bigint();\n",
    "export const t = `${Date.now()}`;\n",
)
# Made-up source holding the names only where the scan must not look, and a date with an argument.
CLEAN_SOURCE = (
    "// Math.random(), crypto.getRandomValues, Date.now() and performance.now() are not used.\n"
    "/* randomUUID, 0x6D2B79F5, node:crypto, hrtime */\n"
    "export const label = 'Math.random crypto getRandomValues Date.now() hrtime';\n"
    'export const other = "it\'s crypto-free";\n'
    "export const text = `no Math.random() ${1 + 2} here, nor Date.now()`;\n"
    "export const pattern = /Math\\.random|Date\\.now\\(\\)/g;\n"
    "export const half = 10 / 2 / 1;\n"
    "export const epoch = new Date(0).getTime();\n"
    "export const day = new globalThis.Date(86400000).getUTCDate();\n"
    "export const utc = globalThis.Date.UTC(2020, 0, 1);\n"
    "export const round = Math.round(1.5) + Math.floor(2.5) + Math.min(1, 2);\n"
    "export const record = { Date: 1, performance: 2 };\n"
)


class BalanceInstrumentRepeatability(unittest.TestCase):
    def test_no_file_of_the_instrument_reads_the_clock_or_draws_apart_from_the_seed(self):
        # invariant: balance-instrument-repeatability
        sources = scan.instrument_sources()
        self.assertTrue(sources, "the working tree holds no file of code of the instrument to scan")
        found = []
        for path, text in sources:
            found += findings(path, text)
        self.assertEqual(
            found,
            [],
            "a file of the instrument reads the system clock or draws a random number from "
            "a source other than the seed of its measurement",
        )

    def test_control_the_scan_flags_each_forbidden_form(self):
        # invariant: balance-instrument-repeatability
        for text in FLAGGED_SOURCES:
            with self.subTest(source=text):
                self.assertTrue(findings(PROBE, text), f"the scan does not flag {text!r}")
        self.assertEqual(
            findings(PROBE, CLEAN_SOURCE),
            [],
            "the scan flags names standing only in comments, strings, template text, a regular "
            "expression, or a date given its argument",
        )


if __name__ == "__main__":
    unittest.main()
