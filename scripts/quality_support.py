"""Shared discovery, local invocation and the-way records; callers own check policy."""

import json
from pathlib import Path, PurePosixPath
import re
import shutil
import subprocess
import sys
import tempfile


class QualityError(Exception):
    """A check could not reach a verdict; result retains raw process evidence if available."""

    def __init__(self, message, result=None):
        super().__init__(message)
        self.result = result


def run_tool(command, *, cwd, accepted_codes=(0,), timeout=120, env=None, input=None):
    """Run an explicit local executable without a shell or installation wrapper.

    The caller selects accepted exit codes, arguments, environment and output parser. A
    successful invocation alone is no invariant verdict. Outputs must be readable UTF-8;
    failed invocations retain their raw CompletedProcess (or TimeoutExpired) as error.result.
    """
    command = [str(argument) for argument in command]
    if not command or not Path(command[0]).is_absolute():
        raise QualityError("tool executable must be an absolute local path")
    try:
        result = subprocess.run(command, cwd=cwd, input=input, capture_output=True,
                                timeout=timeout, env=env)
    except (OSError, subprocess.TimeoutExpired) as problem:
        raise QualityError(f"cannot run {command[0]}: {problem}", problem) from problem
    if result.returncode not in accepted_codes:
        detail = result.stderr.decode("utf-8", errors="backslashreplace")
        output = result.stdout.decode("utf-8", errors="backslashreplace")
        raise QualityError(f"{command[0]} exited {result.returncode}\n{output}\n{detail}", result)
    try:
        stdout = result.stdout.decode("utf-8")
        stderr = result.stderr.decode("utf-8")
    except UnicodeDecodeError as problem:
        raise QualityError(f"unreadable UTF-8 output from {command[0]}", result) from problem
    return subprocess.CompletedProcess(result.args, result.returncode, stdout, stderr)


def _git(root, arguments, input=None):
    executable = shutil.which("git")
    if executable is None:
        raise QualityError("git is not installed locally")
    result = run_tool([executable, *arguments], cwd=root, input=input)
    if result.stderr.strip():
        raise QualityError(f"git discovery reported a warning: {result.stderr}", result)
    return result.stdout


def _nul_fields(text):
    if not text:
        return []
    if not text.endswith("\0"):
        raise QualityError("incomplete NUL-delimited git discovery output")
    return text[:-1].split("\0")


def _part_patterns(root):
    try:
        text = (root / "foundations/part_map.md").read_text(encoding="utf-8")
    except (OSError, UnicodeError) as problem:
        raise QualityError(f"cannot read part map: {problem}") from problem
    parts = {}
    for section in re.split(r"(?m)^## ", text)[1:]:
        name, _, body = section.partition("\n")
        field = re.search(r"(?m)^- \*\*Files:\*\* (.*(?:\n[ \t]+.*)*)", body)
        if field is None:
            continue
        name = name.strip()
        if name in parts or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name):
            raise QualityError(f"invalid or duplicate part: {name}")
        patterns = [line.strip().removeprefix("- ").strip()
                    for line in field.group(1).splitlines()]
        if patterns == ["none"]:
            patterns = []
        if any(not pattern or pattern == "none" or "TODO" in pattern
               or "(generated)" in pattern for pattern in patterns):
            raise QualityError(f"unreadable Files patterns of {name}")
        parts[name] = patterns
    if not parts:
        raise QualityError("part map contains no readable parts")
    return parts


def discover_files(root, parts):
    """Return sorted relative paths owned by parts, including unignored untracked files.

    Ownership uses Git attribute patterns, case-sensitively, as the part-map guard does.
    Every non-generated candidate must have exactly one owner, including candidates outside
    the requested parts. Missing tracked files and symlinks are errors, never omissions.
    Language/suffix/shebang/manifest selection belongs to the caller.
    """
    root = Path(root).resolve()
    top = Path(_git(root, ["rev-parse", "--show-toplevel"]).strip()).resolve()
    if top != root:
        raise QualityError("discovery must start at the repository root")
    patterns = _part_patterns(root)
    requested = set(parts)
    if requested - patterns.keys():
        raise QualityError("unknown part: " + ", ".join(sorted(requested - patterns.keys())))
    submodules = set()
    for entry in _nul_fields(_git(root, ["ls-files", "--stage", "-z"])):
        metadata, separator, path = entry.partition("\t")
        fields = metadata.split()
        if not separator or len(fields) != 3 or fields[2] != "0":
            raise QualityError("unreadable or unmerged git index entry")
        if fields[0] == "160000":
            submodules.add(path)
    excluded = {"node_modules", ".runs", ".git", ".venv", "venv",
                "__pycache__", ".ruff_cache"}
    candidates = []
    listing = _git(root, ["ls-files", "--cached", "--others", "--exclude-standard", "-z"])
    for path in sorted(set(_nul_fields(listing))):
        relative = PurePosixPath(path)
        if relative.is_absolute() or ".." in relative.parts:
            raise QualityError(f"unsafe discovered path: {path}")
        if (relative.parts[0] == "dist" or excluded.intersection(relative.parts)) or any(
                path == module or path.startswith(module + "/") for module in submodules):
            continue
        physical = root / path
        if (physical.is_symlink() or not physical.is_file()
                or not physical.resolve().is_relative_to(root)):
            raise QualityError(f"missing or unsafe discovered file: {path}")
        candidates.append(path)
    attributes = {f"loop2qualityowner{index}": name for index, name in enumerate(patterns)}
    with tempfile.TemporaryDirectory(prefix="loop2-quality-ownership-") as temporary:
        attribute_file = Path(temporary, "owners.attributes")
        attribute_file.write_text("".join(f"{pattern} {attribute}={name}\n"
                                         for attribute, name in attributes.items()
                                         for pattern in patterns[name]), encoding="utf-8")
        answer = _git(root, ["-c", f"core.attributesFile={attribute_file.as_posix()}",
                             "-c", "core.ignorecase=false", "check-attr", "--all", "-z", "--stdin"],
                      ("\0".join(candidates) + "\0").encode("utf-8") if candidates else b"")
    fields = _nul_fields(answer)
    if len(fields) % 3:
        raise QualityError("incomplete git ownership output")
    owners = {path: set() for path in candidates}
    for index in range(0, len(fields), 3):
        path, attribute, value = fields[index:index + 3]
        if attribute not in attributes:
            continue
        if path not in owners or value != attributes[attribute]:
            raise QualityError("unexpected git ownership output")
        owners[path].add(value)
    for path, claimed in owners.items():
        if len(claimed) != 1:
            reason = "ambiguous ownership" if claimed else "no ownership"
            raise QualityError(f"{reason}: {path}: {sorted(claimed)}")
    return [path for path in candidates if owners[path] & requested]


def run_check(check, invariant, operation, *, record=None):
    """Record one complete adapter operation: True passes, False violates, errors do neither.

    Return 0 for pass, 1 for a proven violation, 2 for inability to check. The operation must
    return an actual bool only after validating every tool result. Exceptions produce a fail
    with invariant null, without any named verdict. Records overwrite stale prior results.
    A record write failure propagates; callers must never translate it to a successful exit.
    """
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*/[1-9][0-9]*", invariant):
        raise ValueError("invariant must be an identifier/version")
    if record is not None and Path(record).suffix != ".jsonl":
        raise ValueError("record must end in .jsonl")
    handle = None
    if record is not None:
        path = Path(record)
        path.parent.mkdir(parents=True, exist_ok=True)
        handle = path.open("w", encoding="utf-8", errors="backslashreplace", newline="\n")
    try:
        line = {"check": check, "verdict": "fail", "invariant": None}
        try:
            verdict = operation()
            if type(verdict) is not bool:
                raise QualityError("check operation did not return an explicit bool")
        except (Exception, KeyboardInterrupt) as problem:
            line["description"] = f"{type(problem).__name__}: {problem}"
            code = 2
        else:
            line.update(verdict="pass" if verdict else "fail", invariant=invariant)
            code = 0 if verdict else 1
        if handle is not None:
            handle.write(json.dumps(line, ensure_ascii=True) + "\n")
            handle.flush()
        print(json.dumps(line, ensure_ascii=True), file=sys.stderr)
        return code
    finally:
        if handle is not None:
            handle.close()
