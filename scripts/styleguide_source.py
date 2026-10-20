"""Map-owned source snapshots and validated operation bridge for styleguide Methods.

Protocol 1 retains every file, its source text (null for binary fonts), classification,
located declarations, DOM construction/mutation sites, violations and unresolved input.
An unresolved value has value=null; an empty known value has value="". Node consumers
receive deeply frozen facts. Focus and adjacency are separate optional operation modules.
"""

import ast
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import shutil
import sys

from quality_support import QualityError, discover_files, run_tool

BRIDGE = Path(__file__).with_suffix(".mjs")
TOKEN_PATH = "src/browser/view/design-tokens.json"
KINDS = {"typescript", "css", "html", "python", "documentation", "font",
         "icon-exception", "token-values", "unknown"}


def _kind(path):
    suffix = PurePosixPath(path).suffix.lower()
    if path == TOKEN_PATH:
        return "token-values"
    if path.startswith("assets/icons/") and suffix == ".svg":
        return "icon-exception"
    if path.startswith("assets/fonts/") and suffix in {".woff", ".woff2", ".ttf", ".otf"}:
        return "font"
    if suffix in {".md", ".txt"}:
        return "documentation"
    if suffix in {".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"}:
        return "typescript"
    return {".css": "css", ".html": "html", ".svg": "html", ".py": "python"}.get(
        suffix, "unknown")


def _python_fragments(source):
    """Parse Python, extracting embedded markup/styles without executing test fixtures."""
    tree = ast.parse(source)
    fragments = []
    parents = {child: node for node in ast.walk(tree) for child in ast.iter_child_nodes(node)}
    for node in ast.walk(tree):
        if isinstance(node, ast.Constant) and isinstance(node.value, str):
            parent = parents.get(node)
            if isinstance(parent, (ast.JoinedStr, ast.Expr)):
                continue  # Template parts below; standalone strings are documentation.
            text = node.value
            dynamic = False
        elif isinstance(node, ast.JoinedStr):
            text = "".join(part.value if isinstance(part, ast.Constant) else "__unresolved__"
                           for part in node.values)
            dynamic = True
        else:
            continue
        javascript = re.search(r"\b(?:const|let|function|class|export|import)\b.*[=({]|\bdocument\.", text)
        if javascript or re.search(r"<[a-zA-Z][^>]*>|[.#\w\]]\s*\{\s*[\w-]+\s*:", text):
            segment = ast.get_source_segment(source, node) or ""
            fragments.append({"text": text if "\n" in segment else text.replace("\n", " "),
                              "line": node.lineno, "dynamic": dynamic,
                              "kind": "html" if text.lstrip().startswith("<") else "typescript" if javascript else "css"})
    return fragments


def _snapshot(root):
    files = []
    for path in discover_files(root, ["browser-view"]):
        try:
            data = (root / path).read_bytes()
            kind = _kind(path)
            source = None if kind == "font" else data.decode("utf-8")
            fragments = _python_fragments(source) if kind == "python" else []
        except (OSError, UnicodeError, SyntaxError) as problem:
            raise QualityError(f"cannot parse/read source {path}: {problem}") from problem
        files.append({"path": path, "kind": kind, "source": source,
                      "digest": hashlib.sha256(data).hexdigest(), "fragments": fragments})
    if not files:
        raise QualityError("browser-view has no source inventory")
    return files


def _located(record, files):
    if not isinstance(record, dict) or record.get("path") not in files:
        raise QualityError("source evidence has no inventoried path")
    line = record.get("line")
    source = files[record["path"]]["source"]
    if type(line) is not int or source is None or not 1 <= line <= max(1, len(source.splitlines())):
        raise QualityError("source evidence has no in-range original source line")


def _validate_facts(report, requested):
    if (not isinstance(report, dict) or set(report) != {"schema", "files"}
            or type(report["schema"]) is not int or report["schema"] != 1):
        raise QualityError("unsupported source-fact protocol")
    files = report["files"]
    if not isinstance(files, list) or len(files) != len(requested):
        raise QualityError("incomplete source inventory")
    inputs = {entry["path"]: entry for entry in requested}
    if [entry.get("path") if isinstance(entry, dict) else None for entry in files] != list(inputs):
        raise QualityError("source inventory changed order, omitted or invented a file")
    for entry, original in zip(files, requested):
        if set(entry) != {"path", "kind", "source", "digest", "declarations", "sites",
                          "unresolved", "violations"}:
            raise QualityError("incomplete source facts")
        if any(entry[key] != original[key] for key in ("path", "kind", "source", "digest")):
            raise QualityError("source snapshot changed during extraction")
        if entry["kind"] not in KINDS:
            raise QualityError("unknown source classification")
        for key in ("declarations", "sites", "unresolved", "violations"):
            if not isinstance(entry[key], list):
                raise QualityError("source fact collection must be a list")
            for fact in entry[key]:
                _located(fact, inputs)
                if fact["path"] != entry["path"]:
                    raise QualityError("source fact moved to a different file")
                if key in {"unresolved", "violations"}:
                    if set(fact) != {"path", "line", "reason"} or not isinstance(
                            fact["reason"], str) or not fact["reason"]:
                        raise QualityError("invalid diagnostic evidence")
                elif key == "declarations":
                    if set(fact) != {"path", "line", "property", "value", "selector", "context"}:
                        raise QualityError("incomplete declaration evidence")
                    if any(not isinstance(fact[field], str) for field in (
                            "property", "selector", "context")) or not fact["property"]:
                        raise QualityError("invalid declaration name/context")
                    if fact["value"] is not None and not isinstance(fact["value"], str):
                        raise QualityError("invalid declaration value")
                    if fact["value"] is None and not entry["unresolved"]:
                        raise QualityError("unresolved declaration without diagnostic")
                elif set(fact) != {"path", "line", "kind", "expression"} or any(
                        not isinstance(fact[field], str) for field in ("kind", "expression")):
                    raise QualityError("invalid DOM construction evidence")
    return report


def _invoke(root, operation):
    root = Path(root).resolve()
    requested = _snapshot(root)
    node = shutil.which("node")
    if node is None or not BRIDGE.is_file():
        raise QualityError("local source inspector is unavailable")
    request = {"schema": 1, "root": str(root), "operation": operation, "files": requested}
    result = run_tool([node, BRIDGE], cwd=root,
                      input=json.dumps(request, ensure_ascii=True).encode("utf-8"))
    if result.stderr.strip():
        raise QualityError("source inspector reported diagnostics on stderr", result)
    try:
        report = json.loads(result.stdout)
    except (ValueError, TypeError) as problem:
        raise QualityError("malformed or truncated source inspector output", result) from problem
    if operation == "sources":
        return _validate_facts(report, requested)
    if not isinstance(report, dict) or set(report) != {"schema", "operation", "inventory",
                                                     "unresolved", "findings", "result"}:
        raise QualityError("incomplete operation report")
    if type(report["schema"]) is not int or report["schema"] != 1 or report["operation"] != operation or report["inventory"] != [
            entry["path"] for entry in requested]:
        raise QualityError("operation report does not cover the requested inventory")
    inputs = {entry["path"]: entry for entry in requested}
    for key in ("unresolved", "findings"):
        if not isinstance(report[key], list):
            raise QualityError("operation diagnostics must be lists")
        for finding in report[key]:
            _located(finding, inputs)
            if set(finding) != {"path", "line", "reason"} or not isinstance(
                    finding["reason"], str) or not finding["reason"]:
                raise QualityError("invalid operation diagnostic")
    if report["unresolved"]:
        raise QualityError("operation has unresolved source: " + json.dumps(report["unresolved"]))
    return report


def source_facts(root):
    """Return complete located source facts; unresolved constructs remain explicit data."""
    return _invoke(root, "sources")


def check(root, selector):
    if selector == "tokens":
        # invariant: design-token-use/1
        facts = source_facts(root)
        violations = [item for entry in facts["files"] for item in entry["violations"]]
        unresolved = [item for entry in facts["files"] for item in entry["unresolved"]]
        for item in violations + unresolved:
            print(json.dumps(item, ensure_ascii=True), file=sys.stderr)
        if unresolved:
            raise QualityError(f"token inspection has {len(unresolved)} unresolved source constructs")
        return not violations
    if selector == "focus":
        # invariant: keyboard-focus-style/1
        report = _invoke(root, "focus")
        if type(report["result"]) is not bool or report["result"] != (not report["findings"]):
            raise QualityError("focus inspection must return an evidenced boolean")
        return report["result"]
    raise QualityError(f"unknown source operation: {selector}")


def contrast_pairs(root):
    """Return located role pairs from the separately authored adjacency inspector."""
    report = _invoke(root, "adjacency")
    pairs = report["result"]
    if not isinstance(pairs, list) or report["findings"]:
        raise QualityError("adjacency operation did not return complete pairs")
    try:
        roles = json.loads((Path(root) / TOKEN_PATH).read_text(encoding="utf-8"))["roles"]
        if not isinstance(roles, dict):
            raise TypeError("role names must be an object")
    except (OSError, UnicodeError, ValueError, KeyError, TypeError) as problem:
        raise QualityError("cannot read actual role names for adjacency evidence") from problem
    inputs = {entry["path"]: entry for entry in _snapshot(Path(root).resolve())}
    for pair in pairs:
        _located(pair, inputs)
        if set(pair) != {"roles", "path", "line"} or not isinstance(pair["roles"], list) or len(
                pair["roles"]) != 2 or any(not isinstance(role, str) or role not in roles for role in pair["roles"]):
            raise QualityError("invalid adjacency role pair")
    return pairs
