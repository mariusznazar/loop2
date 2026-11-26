"""Invariant balance-instrument-file-writes: No file of code in `balance/` other than
`balance/cli.mjs` writes a file or creates a directory.

The files of code are the files git tracks or would track under `balance/` with an extension of
TypeScript or JavaScript; the overlay files and the player descriptions there are JSON and hold
no code.

Reading of the sentence: a file writes a file or creates a directory where its code, outside
comments, strings, template text and regular expressions, holds one of the names of WRITING_NAMES,
which are the functions of `node:fs` and its promises that write, append to, copy, rename or
truncate a file, make a directory or a stream to a file, however the function is reached
(`fs.writeFileSync`, `fsPromises.mkdir`, a name imported alone); or where a string literal of the
file is exactly one of those names, which is how a function is reached by a computed key.

Covers:
- static: every such file but the command line is scanned by the reading above;
- a control of the scan: made-up source holding each way of reaching a writing function in turn is
  flagged, and made-up source holding the names only in comments, strings, template text and a
  regular expression, and the names of functions that only read, is not;
- a control of the choice of files: the command line is the one file of `balance/` left out of
  the scan, files of code under `balance/` at any depth are scanned, and the JSON files there and
  the files of `tests/balance/` are not.

Does NOT cover: a command the file starts that writes (`child_process`); a function reached by a
name built at run time; a stream or a descriptor opened for writing by `open` or `openSync` with a
flag; a command written into the command line itself that writes a result to a fixed path in the
repository, which the tests of `tests/balance/cli.test.mjs` and the review of each change to the
command line keep out.
"""

import re
import unittest

import balance_source_scan as scan

WRITING_NAMES = (
    "writeFile",
    "writeFileSync",
    "appendFile",
    "appendFileSync",
    "mkdir",
    "mkdirSync",
    "mkdtemp",
    "mkdtempSync",
    "createWriteStream",
    "copyFile",
    "copyFileSync",
    "cp",
    "cpSync",
    "rename",
    "renameSync",
    "truncate",
    "truncateSync",
    "symlink",
    "symlinkSync",
    "link",
    "linkSync",
)
NAME_PATTERN = re.compile(r"(?<![\w$])(" + "|".join(WRITING_NAMES) + r")(?![\w$])")
PROBE = "balance/probe.mjs"


def scanned_files(paths):
    """The files of the instrument the scan reads: all its code but the command line."""
    return [path for path in scan.instrument_files(paths) if path != scan.COMMAND_LINE_FILE]


def findings(relative, text):
    """What the scan finds in one file's text: a list of descriptions."""
    found = []
    code = scan.code_only(text)
    for match in NAME_PATTERN.finditer(code):
        found.append(f"{relative} names {match.group(1)}")
    for value in scan.string_values(text):
        if value in WRITING_NAMES:
            found.append(f"{relative} reaches {value} by a string")
    return found


# Made-up sources for the control of the scan: each alone must be flagged.
FLAGGED_SOURCES = (
    "import { writeFileSync } from 'node:fs';\nwriteFileSync('a', 'b');\n",
    "import fs from 'node:fs';\nfs.writeFileSync('a', 'b');\n",
    "import { promises as fsPromises } from 'node:fs';\nawait fsPromises.writeFile('a', 'b');\n",
    "import * as fs from 'node:fs';\nfs.mkdirSync('d', { recursive: true });\n",
    "import { mkdir } from 'node:fs/promises';\nawait mkdir('d');\n",
    "import fs from 'node:fs';\nfs.appendFileSync('a', 'b');\n",
    "import fs from 'node:fs';\nfs.createWriteStream('a');\n",
    "import fs from 'node:fs';\nfs.copyFileSync('a', 'b');\n",
    "import fs from 'node:fs';\nfs.renameSync('a', 'b');\n",
    "import fs from 'node:fs';\nfs.mkdtempSync('d');\n",
    "import fs from 'node:fs';\nfs.truncateSync('a');\n",
    "import fs from 'node:fs';\nfs.cpSync('a', 'b', { recursive: true });\n",
    "import fs from 'node:fs';\nfs?.writeFileSync('a', 'b');\n",
    "import fs from 'node:fs';\nfs['writeFileSync']('a', 'b');\n",
    "import fs from 'node:fs';\nfs[`writeFileSync`]('a', 'b');\n",
    "export const t = `${writeFile}`;\n",
)
# Made-up source holding the names only where the scan must not look, and functions that read.
CLEAN_SOURCE = (
    "// writeFileSync and mkdirSync are not used here.\n"
    "/* appendFile, createWriteStream, node:fs */\n"
    "import { existsSync, readFileSync, realpathSync } from 'node:fs';\n"
    "export const label = 'writeFileSync mkdirSync appendFile';\n"
    'export const other = "it\'s a mkdir";\n'
    "export const text = `no writeFile ${1 + 2} here, nor mkdir`;\n"
    "export const pattern = /writeFile|mkdir(Sync)?/g;\n"
    "export const read = readFileSync('a', 'utf8') + String(existsSync('b'));\n"
    "export const written = process.stdout.write('a');\n"
    "export const half = 10 / 2 / 1;\n"
    "export const linked = { linkText: 1, copyOf: 2, renamed: 3, cpu: 4 };\n"
)


class BalanceInstrumentFileWrites(unittest.TestCase):
    def test_no_file_of_the_instrument_but_the_command_line_writes(self):
        # invariant: balance-instrument-file-writes
        sources = scan.instrument_sources()
        read = scanned_files([path for path, _text in sources])
        scanned = [(path, text) for path, text in sources if path in read]
        self.assertIn(
            scan.COMMAND_LINE_FILE,
            [path for path, _text in sources],
            "the working tree holds no command line of the instrument, so the file the scan "
            "leaves out does not exist and the scan reads a changed layout",
        )
        self.assertTrue(scanned, "the working tree holds no file of code of the instrument to scan")
        found = []
        for path, text in scanned:
            found += findings(path, text)
        self.assertEqual(
            found,
            [],
            "a file of the instrument other than its command line writes a file or creates a "
            "directory",
        )

    def test_control_the_scan_flags_each_way_to_a_writing_function(self):
        # invariant: balance-instrument-file-writes
        for text in FLAGGED_SOURCES:
            with self.subTest(source=text):
                self.assertTrue(findings(PROBE, text), f"the scan does not flag {text!r}")
        self.assertEqual(
            findings(PROBE, CLEAN_SOURCE),
            [],
            "the scan flags names standing only in comments, strings, template text, a regular "
            "expression, or functions that only read",
        )

    def test_control_the_scan_reads_the_code_under_balance_but_the_command_line(self):
        # invariant: balance-instrument-file-writes
        paths = [
            "balance/cli.mjs",
            "balance/engine.mjs",
            "balance/new-mode.mjs",
            "balance/deeper/mode.js",
            "balance/overlays/wasteland.json",
            "balance/players/edge-daily-best.json",
            "tests/balance/cli.test.mjs",
            "src/browser/sim/game.ts",
        ]
        self.assertEqual(
            scanned_files(paths),
            ["balance/engine.mjs", "balance/new-mode.mjs", "balance/deeper/mode.js"],
            "the files the scan reads are not the files of code under balance/ but the command line",
        )


if __name__ == "__main__":
    unittest.main()
