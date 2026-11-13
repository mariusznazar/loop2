"""Invariant tests: ESLint, Prettier and the LF rules of `.gitattributes` reach every TypeScript and
JavaScript file of the parts the scope of D-29 and D-32 names, according to the part map.

The files come from the part map (`file_owners` of `loop2_invariant_support.py`). Each tool is asked
what it does with them: ESLint for the rules it gives each file, which the test compares with the
sets @eslint/js and typescript-eslint publish; Prettier which of a tree of made-up files it checks
with the patterns of `test_quality_invariants.py`; git which line ending each file gets. None of
them has its pattern syntax reproduced here (D-83 keeps its test files the same way).
"""

from pathlib import Path
import json
import os
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tests" / "invariants"))

import loop2_invariant_support as support
from test_quality_invariants import PRETTIER_FLAGS, PRETTIER_PATTERNS

SCOPE_PARTS = ("browser-view", "simulation", "account-server", "build-tools", "deployment")
SCRIPT_SUFFIXES = (".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs")
# Unformatted by Prettier's default options, and valid in every language of SCRIPT_SUFFIXES.
UNFORMATTED = "let   unformatted   =   1\n"
# What Prettier prints about a pattern that matches no file; the made-up tree holds no HTML or CSS.
NO_FILE_FOR_PATTERN = "No files matching the pattern were found"


def scope_files():
    """The TypeScript and JavaScript files of the scope's parts that git tracks or would track."""
    listed = support.listed_files(support.ROOT)
    owners = support.file_owners(support.ROOT, listed)
    return sorted(path for path in listed
                  if path.endswith(SCRIPT_SUFFIXES) and owners[path] in SCOPE_PARTS)


def unmet_rules(expected, received):
    """The rules of `expected`, as ESLint gives them under the published sets alone, that
    `received`, the rules ESLint gives the file under eslint.config.mjs, does not hold the same:
    an enabled rule with its severity and options, a rule the sets turn off as off or absent.
    `received` of None, a file ESLint gives no configuration, holds no rule."""
    held = received or {}
    unmet = []
    for name, wanted in expected.items():
        got = held.get(name, [0])
        differs = got[0] != 0 if wanted[0] == 0 else got != wanted
        if differs:
            unmet.append(name)
    return sorted(unmet)


def plain_output():
    """The environment with colour off, so that Prettier's report is read line by line."""
    return {**{k: v for k, v in os.environ.items() if k != "FORCE_COLOR"}, "NO_COLOR": "1"}


def git_attributes(paths):
    """The attributes `text` and `eol` git gives each path, as a dict from (path, attribute) to
    the value."""
    result = subprocess.run(["git", "check-attr", "-z", "text", "eol", "--stdin"],
                            cwd=support.ROOT, input="\0".join(paths) + "\0", capture_output=True,
                            text=True, encoding="utf-8", timeout=60, check=False)
    if result.returncode:
        raise AssertionError("git check-attr failed: " + result.stderr)
    fields = result.stdout.split("\0")
    return {(fields[i], fields[i + 1]): fields[i + 2] for i in range(0, len(fields) - 2, 3)}


class SourceToolScope(unittest.TestCase):
    """A file of the scope no tool reaches, or reaches without the rules or the line ending the
    decisions give, fails the test and is named."""

    def test_eslint_gives_every_scope_file_the_rule_sets(self):
        # invariant: eslint-source-rules
        # data: eslint.config.mjs
        paths = scope_files()
        self.assertTrue(paths, "no TypeScript or JavaScript file found in the scope")
        result = subprocess.run(["node", "tests/quality/eslint-rule-sets.mjs"], cwd=support.ROOT,
                                input=json.dumps(paths), capture_output=True, text=True,
                                encoding="utf-8", errors="backslashreplace", timeout=900,
                                check=False)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        report = json.loads(result.stdout)
        unmet = {}
        for path in paths:
            self.assertIsNotNone(report[path]["expected"], f"the published sets reach no {path}")
            missing = unmet_rules(report[path]["expected"], report[path]["received"])
            if missing:
                unmet[path] = f"{len(missing)} rules unmet, among them {', '.join(missing[:3])}"
        if unmet:
            self.fail("files that do not receive the rule sets of D-29 from eslint.config.mjs:\n"
                      + "\n".join(f"{path}: {why}" for path, why in unmet.items()))

    def test_control_unmet_rules_are_found_by_severity_and_options(self):
        # invariant: eslint-source-rules
        expected = {"no-debugger": [2], "eqeqeq": [2, "always"], "no-var": [0], "no-alert": [1]}
        full = {"no-debugger": [2], "eqeqeq": [2, "always"], "no-var": [0, {"x": 1}],
                "no-alert": [1]}
        self.assertEqual(unmet_rules(expected, full), [])
        self.assertEqual(unmet_rules(expected, {k: v for k, v in full.items() if k != "no-var"}),
                         [])
        self.assertEqual(unmet_rules(expected, None), ["eqeqeq", "no-alert", "no-debugger"])
        self.assertEqual(unmet_rules(expected, {}), ["eqeqeq", "no-alert", "no-debugger"])
        self.assertEqual(unmet_rules(expected, full | {"no-debugger": [1]}), ["no-debugger"])
        self.assertEqual(unmet_rules(expected, full | {"no-debugger": [0]}), ["no-debugger"])
        self.assertEqual(unmet_rules(expected, full | {"eqeqeq": [2, "smart"]}), ["eqeqeq"])
        self.assertEqual(unmet_rules(expected, full | {"no-var": [2]}), ["no-var"])

    def test_prettier_patterns_check_every_scope_file(self):
        # invariant: prettier-source-format
        # data: tests/quality/test_quality_invariants.py
        # Prettier checks the patterns on a tree that holds each file of the scope with unformatted
        # content, so that it reports exactly the files the patterns reach.
        paths = scope_files()
        self.assertTrue(paths, "no TypeScript or JavaScript file found in the scope")
        with tempfile.TemporaryDirectory() as temp:
            tree = Path(temp)
            (tree / ".gitignore").write_text(
                (ROOT / ".gitignore").read_text(encoding="utf-8"), encoding="utf-8")
            for path in paths:
                (tree / path).parent.mkdir(parents=True, exist_ok=True)
                (tree / path).write_text(UNFORMATTED, encoding="utf-8", newline="\n")
            result = subprocess.run(
                ["node", str(ROOT / "node_modules/prettier/bin/prettier.cjs"), *PRETTIER_FLAGS,
                 *PRETTIER_PATTERNS], cwd=tree, capture_output=True, text=True, encoding="utf-8",
                errors="backslashreplace", timeout=300, check=False, env=plain_output())
        lines = (result.stdout + result.stderr).splitlines()
        other = [line for line in lines if line.startswith("[error]")
                 and NO_FILE_FOR_PATTERN not in line]
        self.assertEqual(other, [], result.stdout + result.stderr)
        checked = {line[len("[warn] "):].replace("\\", "/") for line in lines
                   if line.startswith("[warn] ") and not line.startswith("[warn] Code style")}
        unchecked = [path for path in paths if path not in checked]
        if unchecked:
            self.fail("files that the Prettier check of test_quality_invariants.py does not "
                      "reach:\n" + "\n".join(unchecked))

    def test_gitattributes_keeps_lf_for_every_scope_file(self):
        # invariant: prettier-source-format
        # data: .gitattributes
        paths = scope_files()
        self.assertTrue(paths, "no TypeScript or JavaScript file found in the scope")
        attributes = git_attributes(paths)
        # `-text` stops git's line-ending conversion whatever `eol` says, so `text` must be on.
        without_lf = [path for path in paths if attributes[(path, "eol")] != "lf"
                      or attributes[(path, "text")] not in ("set", "auto")]
        if without_lf:
            self.fail("files that .gitattributes does not keep at LF:\n" + "\n".join(without_lf))


if __name__ == "__main__":
    unittest.main()
