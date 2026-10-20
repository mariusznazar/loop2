"""Independent token-value, provenance and historical-role checks.

Source inspection is delegated to styleguide_source.contrast_pairs(root). Its complete
list contains dictionaries with roles (two names), path (existing repository-relative
regular source file) and line (positive integer). Missing/unsupported discovery cannot
give a contrast verdict. The source module must raise QualityError on incomplete input.
"""

import json
import importlib
import math
from pathlib import Path, PurePosixPath
import re
import shutil
import sys

from quality_support import QualityError, run_tool

TOKEN_PATH = "src/browser/view/design-tokens.json"
KINDS = {"background", "text", "other"}
BACKGROUNDS = ("page", "panel", "highlight")
TEXT = ("positive", "warning", "danger", "discovery", "player-change", "text-strong",
        "text", "text-secondary", "text-label", "text-disabled")
OTHER = ("divider", "control-border", "selected", "character", "tile-hidden",
         "tile-revealed", "tile-edge", "link-highlight", "depleted", "focus")


def _object(pairs):
    result = {}
    for name, value in pairs:
        if name in result:
            raise QualityError(f"duplicate JSON key: {name}")
        result[name] = value
    return result


def _json(text):
    try:
        return json.loads(text, object_pairs_hook=_object,
                          parse_constant=lambda value: (_ for _ in ()).throw(
                              QualityError(f"invalid JSON number: {value}")))
    except (ValueError, TypeError) as problem:
        raise QualityError(f"invalid token JSON: {problem}") from problem


def _read(path):
    try:
        if path.is_symlink() or not path.is_file():
            raise QualityError(f"missing or unsafe token input: {path}")
        return _json(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError) as problem:
        raise QualityError(f"cannot read token input: {path}: {problem}") from problem


def _appearance(value, path, missing_sources):
    if isinstance(value, dict):
        if not value:
            raise QualityError(f"empty appearance object: {path}")
        if "value" in value:
            _record(value, path, missing_sources)
        else:
            for name, child in value.items():
                _appearance(child, f"{path}.{name}", missing_sources)
    elif isinstance(value, list):
        if not value:
            raise QualityError(f"empty appearance array: {path}")
        for index, child in enumerate(value):
            _appearance(child, f"{path}[{index}]", missing_sources)
    elif isinstance(value, str):
        if not value.strip():
            raise QualityError(f"empty appearance string: {path}")
    elif type(value) not in {int, float} or not math.isfinite(value):
        raise QualityError(f"invalid appearance value: {path}")


def _record(record, path, missing_sources, *, role=False):
    allowed = {"value", "source", "kind"} if role else {"value", "source"}
    if not isinstance(record, dict) or record.keys() - allowed or "value" not in record:
        raise QualityError(f"unknown or incomplete value record: {path}")
    if role and record.get("kind") not in KINDS:
        raise QualityError(f"invalid role kind: {path}")
    source = record.get("source")
    if not isinstance(source, str) or not source.strip():
        missing_sources.append(path)
    _appearance(record["value"], path + ".value", missing_sources)


def validate(data):
    """Validate value-bearing schema independently of the current 23-role obligation.

    Preserve arbitrary well-formed historical names and valid kinds for comparison:
    a rename or valid-kind change must be a preservation failure, not a schema error.
    """
    if not isinstance(data, dict) or set(data) != {"roles", "tokens"}:
        raise QualityError("token root must contain exactly roles and tokens")
    missing_sources = []
    for group in ("roles", "tokens"):
        records = data[group]
        if not isinstance(records, dict):
            raise QualityError(f"{group} must be an object")
        for name, record in records.items():
            if not re.fullmatch(r"[a-z][a-z0-9]*(?:-[a-z0-9]+)*", name):
                raise QualityError(f"invalid token name: {name}")
            _record(record, f"{group}.{name}", missing_sources, role=group == "roles")
    if data["roles"].keys() & data["tokens"].keys():
        raise QualityError("role and token names collide")
    return missing_sources


def _emit(event, **fields):
    print(json.dumps({"event": event, **fields}, ensure_ascii=True), file=sys.stderr)


def sources(data):
    # invariant: design-token-sources/1
    missing = validate(data)
    for path in missing:
        _emit("missing-source", value=path)
    return not missing


def preserved(before, after):
    # invariant: design-role-preservation/1
    validate(before)
    validate(after)
    violations = []
    for name, record in before["roles"].items():
        later = after["roles"].get(name)
        if later is None or later["kind"] != record["kind"]:
            violations.append(name)
            _emit("role-not-preserved", role=name, before=record["kind"],
                  after=None if later is None else later["kind"])
    return not violations


def _git(root, *arguments):
    executable = shutil.which("git")
    if executable is None:
        raise QualityError("local Git is unavailable")
    result = run_tool([executable, *arguments], cwd=root)
    if result.stderr.strip():
        raise QualityError("Git reported a diagnostic", result)
    return result.stdout


def historical(root, fork_point):
    if not isinstance(fork_point, str) or not re.fullmatch(r"[0-9a-f]{40}", fork_point):
        raise QualityError("fork point must be a full commit hash, never none")
    resolved = _git(root, "rev-parse", "--verify", fork_point + "^{commit}").strip()
    if resolved != fork_point:
        raise QualityError("Git did not resolve the requested historical commit")
    _git(root, "merge-base", "--is-ancestor", fork_point, "HEAD")
    tree = _git(root, "ls-tree", "-r", "-z", fork_point)
    if tree and not tree.endswith("\0"):
        raise QualityError("incomplete historical tree listing")
    present = False
    for entry in tree.removesuffix("\0").split("\0") if tree else []:
        metadata, separator, path = entry.partition("\t")
        fields = metadata.split()
        if not separator or len(fields) != 3:
            raise QualityError("invalid historical tree entry")
        if path == TOKEN_PATH:
            if present or fields[0] not in {"100644", "100755"} or fields[1] != "blob":
                raise QualityError("unsafe historical token file")
            present = True
    # data: src/browser/view/design-tokens.json
    data = _json(_git(root, "show", fork_point + ":" + TOKEN_PATH)) if present else {
        "roles": {}, "tokens": {}}
    validate(data)
    _emit("historical-read", commit=fork_point, path=TOKEN_PATH, present=present,
          protected_roles=len(data["roles"]))
    return data


def _color(value):
    """Return opaque sRGB channels; unsupported notation is inability, never guessed."""
    if not isinstance(value, str) or not re.fullmatch(r"#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})", value):
        raise QualityError(f"unsupported opaque sRGB color: {value!r}")
    digits = value[1:]
    if len(digits) == 3:
        digits = "".join(char * 2 for char in digits)
    return tuple(int(digits[index:index + 2], 16) / 255 for index in (0, 2, 4))


def _luminance(color):
    channels = [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4
                for value in color]
    return sum(value * weight for value, weight in zip(channels, (0.2126, 0.7152, 0.0722)))


def _threshold(names, roles):
    if "text-disabled" in names or "depleted" in names:
        return None
    if any(roles[name]["kind"] == "text" for name in names):
        return 4.5
    if {"control-border", "focus", "character"}.intersection(names) or set(names) == {
            "tile-revealed", "tile-hidden"}:
        return 3.0
    raise QualityError(f"no governing contrast threshold for pair: {names}")


def _additional(pairs, roles, root):
    if not isinstance(pairs, list):
        raise QualityError("contrast discovery must return a complete list")
    checked = []
    for pair in pairs:
        if not isinstance(pair, dict) or set(pair) != {"roles", "path", "line"}:
            raise QualityError("incomplete or unsupported contrast discovery evidence")
        names = pair["roles"]
        if not isinstance(names, list) or len(names) != 2 or any(
                not isinstance(name, str) or name not in roles for name in names):
            raise QualityError("contrast discovery names unknown or incomplete roles")
        path, line = pair["path"], pair["line"]
        if not isinstance(path, str) or not path or "\\" in path:
            raise QualityError("invalid contrast evidence path")
        relative = PurePosixPath(path)
        if relative.is_absolute() or ".." in relative.parts or ":" in path:
            raise QualityError("unsafe contrast evidence path")
        physical = root / path
        if (physical.is_symlink() or not physical.is_file()
                or not physical.resolve().is_relative_to(root)):
            raise QualityError("missing or unsafe contrast evidence file")
        try:
            lines = physical.read_text(encoding="utf-8").splitlines()
        except (OSError, UnicodeError) as problem:
            raise QualityError("unreadable contrast evidence file") from problem
        if type(line) is not int or not 1 <= line <= len(lines):
            raise QualityError("invalid contrast evidence line")
        checked.append((names, _threshold(names, roles), f"{path}:{line}"))
    return checked


def contrast(data, additional_pairs, root):
    # invariant: design-contrast/1
    validate(data)
    expected = {**dict.fromkeys(BACKGROUNDS, "background"), **dict.fromkeys(TEXT, "text"),
                **dict.fromkeys(OTHER, "other")}
    roles = data["roles"]
    if {name: record["kind"] for name, record in roles.items()} != expected:
        raise QualityError("current product must declare the 23 names/kinds of D-39, D-40, D-41")
    depleted = roles["depleted"]["value"]
    if type(depleted) not in {int, float} or not 0 <= depleted <= 1:
        raise QualityError("depleted must be an opacity from zero to one")
    luminances = {name: _luminance(_color(record["value"]))
                  for name, record in roles.items() if name != "depleted"}
    pairs = [([name, background], 4.5, "D-39; D-40; D-42")
             for name in TEXT if name != "text-disabled" for background in BACKGROUNDS]
    pairs.extend(([name, background], 3.0, "D-42")
                 for name in ("control-border", "focus") for background in BACKGROUNDS)
    pairs.extend((["character", surface], 3.0, "D-41; D-42")
                 for surface in ("tile-hidden", "tile-revealed", "tile-edge"))
    pairs.append((["tile-revealed", "tile-hidden"], 3.0, "D-42"))
    # Validate all discovery before giving any verdict, including a known violation.
    pairs.extend(_additional(additional_pairs, roles, Path(root).resolve()))
    passed = True
    for names, threshold, evidence in pairs:
        if threshold is None:
            _emit("contrast-exempt", roles=names, source=evidence)
            continue
        first, second = (luminances[name] for name in names)
        ratio = (max(first, second) + 0.05) / (min(first, second) + 0.05)
        sufficient = ratio >= threshold
        _emit("contrast", roles=names, ratio=ratio, threshold=threshold,
              passed=sufficient, source=evidence)
        passed = passed and sufficient
    return passed


def _contrast_sources(root):
    try:
        module = importlib.import_module("styleguide_source")
    except ImportError as problem:
        raise QualityError("independent contrast source discovery is unavailable") from problem
    inspect = getattr(module, "contrast_pairs", None)
    if not callable(inspect):
        raise QualityError("independent contrast source discovery has no complete interface")
    return inspect(root)


def check(root, selector, *, fork_point=None, historical_input=None):
    root = Path(root).resolve()
    if selector == "roles":
        if (fork_point is None) == (historical_input is None):
            raise QualityError("roles requires exactly one of fork-point and historical-input")
        before = (historical(root, fork_point) if historical_input is None else
                  _read(Path(historical_input)))
        # data: src/browser/view/design-tokens.json
        return preserved(before, _read(root / TOKEN_PATH))
    if fork_point is not None or historical_input is not None:
        raise QualityError("historical inputs apply only to roles")
    if selector == "sources":
        return sources(_read(root / TOKEN_PATH))
    if selector == "contrast":
        return contrast(_read(root / TOKEN_PATH), _contrast_sources(root), root)
    raise QualityError(f"value selector is not implemented: {selector}")
