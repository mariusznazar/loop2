"""Invariant test: no function and no file of the code is longer than the thresholds of D-425, apart
from its two exceptions, as `tests/quality/eslint-size-rules.mjs` reports them. That script runs
ESLint with the two size rules alone, apart from the run on `eslint.config.mjs`, and prints one line
`<file>:<line>: <message>` for each function and each file over a threshold; this test only reads
what it prints and decides nothing about sizes itself.

The first case runs the script on the repository. The control case runs the same script on a tree of
made-up files, so that a script that prints nothing because it is broken cannot pass the first case.
"""

from pathlib import Path
import re
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
SIZE_RULES = "tests/quality/eslint-size-rules.mjs"
REPORT_LINE = re.compile(r"^(?P<file>.+):(?P<line>\d+): (?P<message>.+)$")


def size_reports(directory=None):
    """The reports of the script on `directory`, the repository by default, as a list of
    (file, line, message), in the order the script prints them. A script that does not end with 0
    fails the test with its output."""
    command = ["node", SIZE_RULES] + ([str(directory)] if directory else [])
    result = subprocess.run(command, cwd=ROOT, capture_output=True, text=True,
                            encoding="utf-8", errors="backslashreplace", timeout=900,
                            check=False)
    if result.returncode:
        raise AssertionError(f"{SIZE_RULES} ended with {result.returncode}:\n"
                             + result.stdout + result.stderr)
    reports = []
    for text in result.stdout.splitlines():
        found = REPORT_LINE.match(text)
        if not found:
            raise AssertionError(f"{SIZE_RULES} printed a line that is no report: {text}")
        reports.append((found["file"], int(found["line"]), found["message"]))
    return reports


def function_source(name, lines, jsx=False):
    """A function of `name` that is `lines` lines long, its first and last line included, each of
    the others a statement."""
    body = [f"  const value{index} = {index};" for index in range(lines - 2)]
    if jsx:
        body[0] = "  const element = <div>{1}</div>;"
    return "\n".join([f"function {name}() {{", *body, "}"]) + "\n"


def padded_function_source(name, lines):
    """A function of `lines` lines of code to which comments and blank lines are added, which the
    count of a line skips."""
    code = function_source(name, lines).splitlines()
    padding = ["", "  // a comment", "  /* a block comment", "     of two lines */"] * 10
    return "\n".join(code[:-1] + padding + code[-1:]) + "\n"


def file_source(lines, blank_and_comment=0):
    """A file of `lines` lines of code, with `blank_and_comment` blank lines and comment lines added
    in turn."""
    code = [f"export const value{index} = {index};" for index in range(lines)]
    padding = ["", "// a comment"] * (blank_and_comment // 2)
    return "\n".join(code + padding) + "\n"


def nested_function_source(name, lines):
    """A function of `lines` lines in all that holds a nested function of 79 lines."""
    inner = function_source("inner", 79).splitlines()
    outer = [f"function {name}() {{",
             *[f"  const value{index} = {index};" for index in range(lines - 2 - 79)],
             *["  " + text for text in inner], "}"]
    return "\n".join(outer) + "\n"


# The made-up files of the control case, each with what the script must say of it.
CONTROL_FILES = {
    # a function and a file one line over their thresholds are reported
    "src/browser/view/over-function.ts": function_source("overFunction", 201),
    "src/browser/view/over-file.ts": file_source(801),
    # the thresholds themselves, and comments and blank lines, count for nothing
    "src/browser/view/at-function.ts": padded_function_source("atFunction", 200),
    "src/browser/view/at-file.ts": file_source(800, blank_and_comment=80),
    # the lines of a nested function count in the function that holds it
    "src/browser/view/nested.ts": nested_function_source("outer", 201),
    # a view in JSX is read, not refused
    "src/browser/view/view.tsx": function_source("View", 201, jsx=True),
    # a test file is held to the threshold of a function but not to that of a file
    "tests/over-file.test.mjs": file_source(801),
    "tests/over-function.test.mjs": function_source("overTestFunction", 201),
    # the two exceptions of D-425, whole, and no other place
    "src/browser/sim/saved-game.ts": file_source(801),
    "src/server/account-routes.ts": (function_source("accountRoutes", 201).replace(
        "function accountRoutes", "export function accountRoutes")
        + function_source("otherRoute", 201)),
    "src/server/other-routes.ts": function_source("accountRoutes", 201),
    # the scripts, the code of the balance instrument and the agent-workflow directories the linter
    # of D-29 reaches
    "scripts/over-file.mjs": file_source(801),
    "balance/over-function.mjs": function_source("overBalanceFunction", 201),
    ".claude/hooks/over-hook.js": function_source("overHook", 201),
    # no inline comment and no suppressions file hides a report
    "src/browser/view/hidden.ts": ("/* eslint-disable max-lines-per-function */\n"
                                   + function_source("hiddenFunction", 201)),
    "eslint-suppressions.json": ('{"src/browser/view/over-function.ts": '
                                 '{"max-lines-per-function": {"count": 1}}}\n'),
    # files the linter of D-29 does not lint are not measured
    "elsewhere/big.mjs": file_source(801) + function_source("elsewhereFunction", 201),
    "dist/big.js": file_source(801) + function_source("builtFunction", 201),
}

# What the script must report on that tree: the file and the message ESLint gives, which holds the
# size. The line is left to the script.
CONTROL_REPORTS = {
    ("src/browser/view/over-function.ts",
     "Function 'overFunction' has too many lines (201). Maximum allowed is 200."),
    ("src/browser/view/over-file.ts", "File has too many lines (801). Maximum allowed is 800."),
    ("src/browser/view/nested.ts",
     "Function 'outer' has too many lines (201). Maximum allowed is 200."),
    ("src/browser/view/view.tsx", "Function 'View' has too many lines (201). Maximum allowed is 200."),
    ("tests/over-function.test.mjs",
     "Function 'overTestFunction' has too many lines (201). Maximum allowed is 200."),
    ("src/server/account-routes.ts",
     "Function 'otherRoute' has too many lines (201). Maximum allowed is 200."),
    ("src/server/other-routes.ts",
     "Function 'accountRoutes' has too many lines (201). Maximum allowed is 200."),
    ("scripts/over-file.mjs", "File has too many lines (801). Maximum allowed is 800."),
    ("balance/over-function.mjs",
     "Function 'overBalanceFunction' has too many lines (201). Maximum allowed is 200."),
    (".claude/hooks/over-hook.js",
     "Function 'overHook' has too many lines (201). Maximum allowed is 200."),
    ("src/browser/view/hidden.ts",
     "Function 'hiddenFunction' has too many lines (201). Maximum allowed is 200."),
}


class FunctionAndFileSize(unittest.TestCase):
    """A function or a file over a threshold fails the first case and is named with its place and its
    size; the control case shows that the script that finds them finds them."""

    def test_no_function_and_no_file_is_over_a_threshold(self):
        # invariant: function-and-file-size
        # decision: D-425 "A function holds at most 200 lines of code and a file at most 800"
        # data: eslint.config.mjs
        reports = size_reports()
        if reports:
            self.fail("functions and files over a threshold of D-425:\n"
                      + "\n".join(f"{file}:{line}: {message}" for file, line, message in reports))

    def test_control_the_script_reports_what_stands_over_a_threshold_and_nothing_else(self):
        with tempfile.TemporaryDirectory() as temp:
            tree = Path(temp)
            for path, text in CONTROL_FILES.items():
                (tree / path).parent.mkdir(parents=True, exist_ok=True)
                (tree / path).write_text(text, encoding="utf-8", newline="\n")
            reports = size_reports(tree)
        self.assertEqual(sorted({(file, message) for file, _, message in reports}),
                         sorted(CONTROL_REPORTS))
        self.assertEqual(len(reports), len(CONTROL_REPORTS))


if __name__ == "__main__":
    unittest.main()
