"""The environment of the pinned Python quality tools, `.runs/quality-venv`, made by the quality test.

`ensure_quality_environment` is called by `test_quality_invariants.py` before its first check
(D-424). An environment that stands complete at the versions `requirements-quality.txt` pins is
used as it is and nothing is fetched. Any other state, an absent directory or one left half made by
an interrupted install included, is made again with the commands of `README.md`, section "Code
check tools": `python -m venv` and `pip install --require-hashes -r requirements-quality.txt`. Where
that fails, the one message of `EnvironmentNotMade` names the directory and the command to run by
hand.
"""

import json
from pathlib import Path
import re
import subprocess
import sys

DIRECTORY = ".runs/quality-venv"
REQUIREMENTS = "requirements-quality.txt"
TOOLS = ("ruff", "shellcheck", "shfmt")
MINIMUM_PYTHON = (3, 9)
WINDOWS = sys.platform == "win32"
KEPT_LINES = 12


class EnvironmentNotMade(Exception):
    """The environment is absent or incomplete and could not be made; the text says what to do."""


def run_command(command, cwd):
    """The result of one command with its output kept, or a result with exit code 127 and the
    reason as its output where the program cannot be started or does not end in time."""
    try:
        return subprocess.run(
            command,
            cwd=cwd,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="backslashreplace",
            timeout=900,
            check=False,
        )
    except (OSError, subprocess.TimeoutExpired) as error:
        return subprocess.CompletedProcess(command, 127, "", str(error))


def folder(root):
    return Path(root) / DIRECTORY


def venv_python(root):
    return folder(root) / ("Scripts/python.exe" if WINDOWS else "bin/python")


def venv_tool(root, name):
    """The pinned tool `README.md` installs into `.runs/quality-venv`, on Windows or elsewhere."""
    return folder(root) / ("Scripts" if WINDOWS else "bin") / (name + ".exe" if WINDOWS else name)


def shown(tool, root):
    """The path of a tool of the environment as the command to run it by hand writes it, relative
    to `root` and with forward slashes."""
    return Path(tool).relative_to(root).as_posix()


def normal(name):
    return re.sub(r"[-_.]+", "-", name).lower()


def pinned(root):
    """The version of each package `requirements-quality.txt` pins, by its normalised name."""
    text = (Path(root) / REQUIREMENTS).read_text(encoding="utf-8")
    pins = re.findall(r"^([A-Za-z0-9][A-Za-z0-9._-]*)==([^\s\\;]+)", text, re.MULTILINE)
    return {normal(name): version for name, version in pins}


def install_command(root):
    """The command of `README.md` that installs the pinned set, as a text to run by hand."""
    python = ".runs/quality-venv/" + ("Scripts/python.exe" if WINDOWS else "bin/python")
    return python + " -m pip install --require-hashes -r " + REQUIREMENTS


def problem(root, run=run_command):
    """Why the environment is not ready, or None where it is complete and at the pinned versions.

    It asks the environment's own `pip list` and `--version` of each tool, which read local files
    only, so a ready environment costs no network."""
    root = Path(root)
    for needed in (venv_python(root), *(venv_tool(root, name) for name in TOOLS)):
        if not needed.is_file():
            return "%s is missing" % needed.relative_to(root).as_posix()
    listed = run([str(venv_python(root)), "-m", "pip", "list", "--format=json"], root)
    try:
        installed = {normal(each["name"]): each["version"] for each in json.loads(listed.stdout)}
    except (ValueError, KeyError, TypeError):
        installed = None
    if listed.returncode != 0 or installed is None:
        return "its pip does not list the packages"
    for name, version in pinned(root).items():
        if installed.get(name) != version:
            return "%s is %s, not the pinned %s" % (
                name,
                installed.get(name) or "not installed",
                version,
            )
    for name in TOOLS:
        if run([str(venv_tool(root, name)), "--version"], root).returncode != 0:
            return "%s does not run" % name
    return None


def refusal(root, why, command=None, result=None):
    """The one message of an environment that could not be made."""
    lines = ["The environment of the quality tools, %s, could not be made: %s." % (DIRECTORY, why)]
    if command is not None:
        shown = (result.stdout or "") + (result.stderr or "")
        lines.append("`%s` ended with code %s:" % (" ".join(map(str, command)), result.returncode))
        lines.extend(shown.strip().splitlines()[-KEPT_LINES:])
    lines.append(
        'Make it by hand with the commands of README.md, section "Code check tools": '
        "`python -m venv %s`, then `%s`." % (DIRECTORY, install_command(root))
    )
    return "\n".join(lines)


def ensure_quality_environment(root, run=run_command, python=None):
    """Leave `.runs/quality-venv` complete at the pinned versions, or raise EnvironmentNotMade.

    A ready environment is left alone. Any other is made again from the start, which `venv
    --clear` does in place, and the pinned set is installed with its hashes; the result is judged
    by the same `problem` check, so a half-made environment is never taken for ready."""
    root = Path(root)
    python = python or sys.executable
    if tuple(sys.version_info[:2]) < MINIMUM_PYTHON:
        raise EnvironmentNotMade(
            refusal(root, "Python %d.%d or newer is needed to make it" % MINIMUM_PYTHON)
        )
    if problem(root, run) is None:
        return
    for command in (
        [python, "-m", "venv", "--clear", str(folder(root))],
        [str(venv_python(root)), "-m", "pip", "install", "--require-hashes", "-r", REQUIREMENTS],
    ):
        result = run(command, root)
        if result.returncode != 0:
            raise EnvironmentNotMade(
                refusal(root, "a command of the install failed", command, result)
            )
    why = problem(root, run)
    if why is not None:
        raise EnvironmentNotMade(refusal(root, "after the install " + why))
