"""Check standalone Bash using the pinned default checks adopted by D-31."""

import argparse
import json
import os
from pathlib import Path
import re
import shlex
import sys

from quality_support import QualityError, discover_files, run_check, run_tool

PARTS = ("browser-view", "simulation", "account-server", "build-tools", "deployment",
         "agent-workflow")
OPTIONS = ("--norc", "--shell=bash", "--severity=style", "--format=json1",
           "--extended-analysis=true")
DIRECTIVE = re.compile(r"#\s*shellcheck[ \t]+([^\r\n]*)")
KEY = re.compile(r"\b(disable|enable|shell|extended-analysis|source-path|source)\s*=")
# Pinned Analytics.hs: default checkSpacefulnessCfg emits SC2086; optional
# checkVerboseSpacefulnessCfg and checkVariableBraces emit SC2248 and SC2250.
# Parser.hs emits SC1107 for an unknown directive. Other disabled codes remain
# unclassified, rather than guessing a second inventory of default diagnostics.
KNOWN_DEFAULT = {1107, 2086}
KNOWN_OPTIONAL = {2248, 2250}
OPTIONAL_NAMES = {"quote-safe-variables", "avoid-nullary-conditions",
                  "avoid-negated-conditions", "add-default-case", "require-variable-braces",
                  "check-unassigned-uppercase", "require-double-brackets",
                  "check-set-e-suppressed", "check-extra-masked-returns", "useless-use-of-cat"}


def bash_source(path, data):
    first = data.splitlines()[0] if data else b""
    if first.startswith(b"#!"):
        try:
            words = shlex.split(first[2:].decode("utf-8"))
        except (ValueError, UnicodeError) as problem:
            raise QualityError(f"unreadable shebang: {path}") from problem
        interpreters = [word.rsplit("/", 1)[-1] for word in words]
        if "bash" in interpreters or "bash.exe" in interpreters:
            return True
        # A declared different interpreter is not a standalone Bash script.
        return False
    return path.suffix.lower() in {".sh", ".bash"}


def _diagnostics(result, filename):
    if result.stderr.strip():
        raise QualityError(f"ShellCheck reported stderr: {result.stderr}", result)
    document = json.loads(result.stdout)
    if not isinstance(document, dict) or not isinstance(document.get("comments"), list):
        raise QualityError("invalid ShellCheck json1 report", result)
    reports = document["comments"]
    for item in reports:
        if (not isinstance(item, dict) or item.get("file") != filename
                or type(item.get("code")) is not int or item["code"] < 1000
                or item.get("level") not in {"error", "warning", "info", "style"}
                or not isinstance(item.get("message"), str) or not item["message"]
                or any(type(item.get(field)) is not int or item[field] < 1
                       for field in ("line", "column", "endLine", "endColumn"))):
            raise QualityError("invalid ShellCheck diagnostic", result)
    if result.returncode != int(bool(reports)):
        raise QualityError("ShellCheck exit code disagrees with diagnostics", result)
    return reports


def _directive_policy(payload):
    """Return False for proven policy changes, True for neutral, None for unknown."""
    unknown = False
    for token in shlex.split(payload, comments=True):
        key, separator, value = token.partition("=")
        if not separator:
            unknown = True
        elif key == "disable":
            for selector in value.split(","):
                if selector == "all":
                    return False
                match = re.fullmatch(r"(?:SC)?([0-9]+)(?:-(?:SC)?([0-9]+))?", selector)
                if match is None:
                    unknown = True
                    continue
                lower = int(match[1])
                upper = int(match[2]) if match[2] else lower
                if any(lower <= code <= upper for code in KNOWN_DEFAULT):
                    return False
                if lower != upper or lower not in KNOWN_OPTIONAL:
                    unknown = True
        elif key == "enable":
            if set(value.split(",")) & (OPTIONAL_NAMES | {"all"}):
                return False
            unknown = True
        elif key == "shell":
            if value != "bash":
                return False
        elif key == "extended-analysis":
            if value == "false":
                return False
            if value != "true":
                unknown = True
        else:
            # source and source-path can redirect analysis (including /dev/null).
            # Their exact effect is not inferred from a filename or a text search.
            unknown = True
    return None if unknown else True


def _directives(text, executable, root, environment):
    candidates = {}
    lines = text.splitlines(keepends=True)
    for index, line in enumerate(lines):
        match = DIRECTIVE.search(line)
        if match is not None and KEY.search(match[1]):
            candidates[index + 1] = match[1]
            # Change key letters only: quotes, newlines and shell delimiters survive.
            lines[index] = line[:match.start(1)] + KEY.sub("loopquality=", match[1]) + line[match.end(1):]
    if not candidates:
        return True
    result = run_tool([executable, *OPTIONS, "--", "-"], cwd=root, env=environment,
                      input="".join(lines).encode("utf-8"), accepted_codes=(0, 1))
    reports = _diagnostics(result, "-")
    recognized = {item["line"] for item in reports if item["code"] == 1107
                  and item["message"] == "This directive is unknown. It will be ignored."}
    verdicts = [_directive_policy(payload) for line, payload in candidates.items()
                if line in recognized]
    if False in verdicts:
        return False
    if None in verdicts:
        raise QualityError("cannot establish neutrality of a ShellCheck source directive")
    # The pinned parser recognizes directives; text in strings and heredocs does not
    # emit the sentinel diagnostic. Unexpected probe parse errors are not neutrality.
    if any(item["level"] == "error" for item in reports):
        raise QualityError("ShellCheck directive probe could not parse the source", result)
    return True


def check(root):
    root = Path(root).resolve()
    folder, suffix = ("Scripts", ".exe") if os.name == "nt" else ("bin", "")
    executable = root / ".runs/quality-venv" / folder / ("shellcheck" + suffix)
    if not executable.is_file():
        raise QualityError(f"local ShellCheck is unavailable: {executable}")
    environment = {key: value for key, value in os.environ.items()
                   if not key.upper().startswith("SHELLCHECK_")}
    environment.update(LC_ALL="C.UTF-8", LANG="C.UTF-8")
    version = run_tool([executable, "--version"], cwd=root, env=environment)
    versions = [line for line in version.stdout.splitlines() if line.startswith("version:")]
    if versions != ["version: 0.11.0"] or version.stderr.strip():
        raise QualityError("ShellCheck 0.11.0 is required", version)
    valid = True
    for relative in discover_files(root, PARTS):
        path = root / relative
        data = path.read_bytes()
        if not bash_source(path, data):
            continue
        result = run_tool([executable, *OPTIONS, "--", str(path)], cwd=root,
                          env=environment, accepted_codes=(0, 1))
        reports = _diagnostics(result, str(path))
        # A real diagnostic already proves a violation; a probe must not obscure it.
        neutral = True if reports else _directives(data.decode("utf-8"), executable,
                                                   root, environment)
        if reports or not neutral:
            print(json.dumps({"file": relative, "diagnostics": reports,
                              "policy_changing_directive": not neutral}, ensure_ascii=True),
                  file=sys.stderr)
            valid = False
    return valid


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--record", type=Path)
    args = parser.parse_args()
    return run_check("scripts/check_shellcheck.py", "shellcheck-source-rules/1",
                     lambda: check(Path(__file__).resolve().parents[1]), record=args.record)


if __name__ == "__main__":
    sys.exit(main())
