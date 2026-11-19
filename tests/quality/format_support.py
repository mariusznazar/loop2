"""Support of the format checks of `test_quality_invariants.py` (D-433, D-434).

`python_sources` asks Ruff itself which files it reads from `ruff.toml`, so the test that looks for
comments that switch the formatter off reads the files the formatter and the linter read, with the
same exclusions, and no list of files or patterns is kept here. `switching_comments` finds the
comments of a source that Ruff's formatter takes for a switch, by the same reading Ruff gives them.
"""

import io
from pathlib import Path
import subprocess
import tokenize

PYTHON_SUFFIXES = (".py", ".pyi")
# The settings of the Bash format check; explicit flags keep shfmt from reading any `.editorconfig`.
SHFMT_FLAGS = ["-i", "2", "-bn", "-ci", "-ln", "bash"]


def python_sources(root, ruff):
    """The `.py` and `.pyi` files Ruff reads from `ruff.toml` under `root`, as sorted paths with
    forward slashes relative to `root`."""
    result = subprocess.run(
        [str(ruff), "check", "--show-files", "--config", "ruff.toml", "--no-cache", "."],
        cwd=root,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="backslashreplace",
        timeout=900,
        check=False,
    )
    if result.returncode != 0:
        raise AssertionError("Ruff could not list its files:\n" + result.stdout + result.stderr)
    root = Path(root).resolve()
    listed = (Path(line.strip()) for line in result.stdout.splitlines() if line.strip())
    return sorted(
        path.resolve().relative_to(root).as_posix()
        for path in listed
        if path.suffix in PYTHON_SUFFIXES
    )


def switches_formatter(comment):
    """Whether Ruff's formatter takes the comment, given from its `#`, for a switch: `fmt: off`,
    `fmt: on` or `yapf: disable` and `yapf: enable` as the whole of it, or a `fmt: skip` as the
    whole of it or of any part of it set off by a `#`."""
    trimmed = comment.removeprefix("#").strip()
    if trimmed.startswith("fmt:"):
        if trimmed[len("fmt:") :].lstrip() in ("off", "on", "skip"):
            return True
    elif trimmed.startswith("yapf:"):
        if trimmed[len("yapf:") :].lstrip() in ("disable", "enable"):
            return True
    return any(
        part.strip().startswith("fmt:") and part.strip()[len("fmt:") :].lstrip() == "skip"
        for part in comment.split("#")
    )


def switching_comments(source):
    """The comments of the Python `source` that switch the formatter, as pairs of the line and
    the text; only real comments count, not the text of a string."""
    found = []
    for token in tokenize.generate_tokens(io.StringIO(source).readline):
        if token.type == tokenize.COMMENT and switches_formatter(token.string):
            found.append((token.start[0], token.string))
    return found


def read_source(path):
    """The text of a Python file as Python reads it, its declared encoding included."""
    with tokenize.open(path) as stream:
        return stream.read()
