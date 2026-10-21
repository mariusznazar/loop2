"""Map-owned source snapshots and validated operation bridge for styleguide Methods.

Protocol 3 keeps governed source facts apart from acquired dependency/config snapshots.
It retains every file, its source text (null for binary fonts), classification,
located declarations, DOM construction/mutation sites, violations and unresolved input.
An unresolved value has value=null; an empty known value has value="". Node consumers
receive deeply frozen facts. Focus and adjacency are separate optional operation modules.
"""

import ast
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import posixpath
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


class _FinitePythonMarkup:
    """Prove a closed authored family, never execute Python or imported fixtures."""

    def __init__(self, source, tree, parents):
        self.source, self.tree, self.parents = source, tree, parents
        self.nodes = list(ast.walk(tree))
        self.globals = {}
        self.lines = source.splitlines(keepends=True)
        self.inputs = []

    def witness(self, node):
        def offset(line, column):
            prefix = self.lines[line - 1].encode("utf-8")[:column].decode("utf-8")
            return sum(len(part) for part in self.lines[:line - 1]) + len(prefix)
        start = offset(node.lineno, node.col_offset)
        end = offset(node.end_lineno, node.end_col_offset)
        return {"start": start, "end": end, "line": node.lineno,
                "expression": self.source[start:end]}

    def scope(self, node):
        while node in self.parents:
            node = self.parents[node]
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.Lambda, ast.ClassDef)):
                return node
        return self.tree

    def unique_global(self, name, definition):
        for node in self.nodes:
            if isinstance(node, ast.Name) and node.id == name and not isinstance(node.ctx, ast.Load):
                if node is not definition:
                    raise ValueError("rebound global")
            if isinstance(node, ast.arg) and node.arg == name:
                raise ValueError("shadowed global")
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)) and node.name == name:
                if node is not definition:
                    raise ValueError("shadowed definition")
            if isinstance(node, ast.alias) and (node.asname or node.name.split('.')[0]) in {name, "*"}:
                raise ValueError("imported or wildcard binding")
            if isinstance(node, (ast.Global, ast.Nonlocal)) and name in node.names:
                raise ValueError("dynamic binding")
            if ((isinstance(node, ast.ExceptHandler) and node.name == name)
                    or (isinstance(node, (ast.MatchAs, ast.MatchStar)) and node.name == name)
                    or (isinstance(node, ast.MatchMapping) and node.rest == name)):
                raise ValueError("pattern or exception binding")

    def readonly_use(self, node):
        parent = self.parents.get(node)
        if isinstance(parent, ast.Subscript) and parent.value is node and isinstance(parent.ctx, ast.Load):
            return True  # The literal table contains only immutable strings.
        return (isinstance(parent, ast.Compare) and len(parent.ops) == 1
                and isinstance(parent.ops[0], (ast.In, ast.NotIn))
                and parent.comparators == [node])

    def readonly_alias(self, node):
        branch = self.parents.get(node)
        assignment = self.parents.get(branch)
        if not (isinstance(branch, ast.IfExp) and branch.body is node
                and isinstance(assignment, ast.Assign) and len(assignment.targets) == 1
                and isinstance(assignment.targets[0], ast.Name)):
            return False
        target = assignment.targets[0]
        scope = self.scope(target)
        if not isinstance(scope, ast.FunctionDef):
            return False
        name = target.id
        test = branch.test
        if not (isinstance(branch.orelse, ast.Name) and branch.orelse.id == name
                and isinstance(test, ast.Compare) and isinstance(test.left, ast.Name)
                and test.left.id == name and len(test.ops) == 1 and isinstance(test.ops[0], ast.Is)
                and len(test.comparators) == 1 and isinstance(test.comparators[0], ast.Constant)
                and test.comparators[0].value is None):
            return False
        for use in ast.walk(scope):
            if isinstance(use, (ast.Global, ast.Nonlocal)) and name in use.names:
                return False
            if isinstance(use, ast.Name) and use.id == name:
                if self.scope(use) is not scope:
                    return False
                if use in (target, test.left, branch.orelse):
                    continue
                if not isinstance(use.ctx, ast.Load) or not self.readonly_use(use):
                    return False
        return True

    def readonly_items(self, node):
        attribute = self.parents.get(node)
        call = self.parents.get(attribute)
        generator = self.parents.get(call)
        comp = self.parents.get(generator)
        if not (isinstance(attribute, ast.Attribute) and attribute.attr == "items"
                and isinstance(call, ast.Call) and call.func is attribute and not call.args and not call.keywords
                and isinstance(generator, ast.comprehension) and generator.iter is call and not generator.is_async
                and isinstance(comp, ast.DictComp) and len(comp.generators) == 1
                and isinstance(generator.target, ast.Tuple) and len(generator.target.elts) == 2
                and all(isinstance(item, ast.Name) for item in generator.target.elts)):
            return False
        key, value = generator.target.elts
        if not (isinstance(comp.key, ast.Name) and comp.key.id == key.id
                and isinstance(comp.value, ast.Name) and comp.value.id == value.id):
            return False
        for condition in generator.ifs:
            if not (isinstance(condition, ast.Compare) and len(condition.ops) == 1
                    and isinstance(condition.ops[0], (ast.Eq, ast.NotEq))
                    and isinstance(condition.left, ast.Name) and condition.left.id in {key.id, value.id}
                    and len(condition.comparators) == 1
                    and isinstance(condition.comparators[0], ast.Constant)
                    and isinstance(condition.comparators[0].value, str)):
                return False
        return True

    def global_value(self, name):
        if name in self.globals:
            return self.globals[name]
        candidates = [node for node in self.tree.body if isinstance(node, ast.Assign)
                      and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name)
                      and node.targets[0].id == name]
        if len(candidates) != 1:
            raise ValueError("unknown global")
        assignment = candidates[0]
        self.unique_global(name, assignment.targets[0])
        # Globals are literal data, not arbitrary expressions or reference chains.
        value = ast.literal_eval(assignment.value)
        if isinstance(value, dict):
            if not all(isinstance(key, str) and isinstance(item, str) for key, item in value.items()):
                raise ValueError("non-scalar lookup table")
            for node in self.nodes:
                if isinstance(node, ast.Name) and node.id == name and isinstance(node.ctx, ast.Load):
                    if not (self.readonly_use(node) or self.readonly_alias(node) or self.readonly_items(node)):
                        raise ValueError("mutable or escaping table")
        elif value is not None and not isinstance(value, str):
            raise ValueError("unsupported global data")
        self.inputs.append(self.witness(assignment))
        self.globals[name] = value
        return value

    def value(self, node, local, depth=0):
        if depth > 32:
            raise ValueError("expression limit")
        self.inputs.append(self.witness(node))
        child = lambda item: self.value(item, local, depth + 1)
        if isinstance(node, ast.Constant) and (node.value is None or isinstance(node.value, str)):
            result = node.value
        elif isinstance(node, ast.Name):
            result = local[node.id] if node.id in local else self.global_value(node.id)
        elif isinstance(node, ast.BinOp) and isinstance(node.op, ast.Add):
            left, right = child(node.left), child(node.right)
            if not isinstance(left, str) or not isinstance(right, str):
                raise ValueError("non-string concatenation")
            result = left + right
        elif isinstance(node, ast.JoinedStr):
            pieces = []
            for part in node.values:
                if isinstance(part, ast.FormattedValue):
                    if part.conversion != -1 or part.format_spec is not None:
                        raise ValueError("format conversion")
                    item = child(part.value)
                else:
                    item = child(part)
                if not isinstance(item, str):
                    raise TypeError("non-string substitution")
                pieces.append(item)
            result = "".join(pieces)
        elif isinstance(node, ast.Subscript) and isinstance(node.ctx, ast.Load):
            table, key = child(node.value), child(node.slice)
            if not isinstance(table, dict) or not isinstance(key, str) or key not in table:
                raise ValueError("unknown lookup")
            result = table[key]
        elif isinstance(node, ast.IfExp):
            test = node.test
            if not (isinstance(test, ast.Compare) and len(test.ops) == 1 and isinstance(test.ops[0], ast.Is)
                    and len(test.comparators) == 1 and isinstance(test.comparators[0], ast.Constant)
                    and test.comparators[0].value is None):
                raise ValueError("unsupported conditional")
            result = child(node.body if child(test.left) is None else node.orelse)
        else:
            raise ValueError("unsupported expression")
        if isinstance(result, str) and len(result) > 1_000_000:
            raise ValueError("markup expansion limit")
        return result

    def expand(self, template):
        function = self.scope(template)
        if not (isinstance(function, ast.FunctionDef) and self.parents[function] is self.tree
                and not function.decorator_list and isinstance(function.body[-1], ast.Return)
                and function.body[-1].value is template and len(function.body) <= 2):
            raise ValueError("not a bounded markup helper")
        for node in self.nodes:
            if (isinstance(node, ast.Name) and isinstance(node.ctx, ast.Load)
                    and node.id in {"globals", "locals", "vars", "eval", "exec", "getattr", "setattr", "__import__"}):
                raise ValueError("reflection escapes authored bindings")
            if isinstance(node, ast.Attribute) and node.attr in {"__dict__", "__globals__", "modules"}:
                raise ValueError("reflective attribute escapes authored bindings")
        self.unique_global(function.name, function)
        calls = []
        for node in self.nodes:
            if isinstance(node, ast.Name) and node.id == function.name:
                parent = self.parents[node]
                if not (isinstance(node.ctx, ast.Load) and isinstance(parent, ast.Call) and parent.func is node
                        and self.scope(node) is not function):
                    raise ValueError("helper alias, mutation or recursion")
                calls.append(parent)
        if not calls or len(calls) > 4096:
            raise ValueError("unbounded helper use set")
        args = function.args
        if args.vararg or args.kwarg or args.kwonlyargs:
            raise ValueError("unsupported helper signature")
        parameters = args.posonlyargs + args.args
        names = [param.arg for param in parameters]
        defaults = dict(zip(names[len(names) - len(args.defaults):], args.defaults, strict=True))
        for expression in defaults.values():
            self.value(expression, {})  # Defaults are evaluated even when every call supplies a value.
        expanded = []
        for call in sorted(calls, key=lambda item: (item.lineno, item.col_offset)):
            self.inputs = []
            self.globals = {}
            if len(call.args) > len(names):
                raise ValueError("too many arguments")
            supplied = dict(zip(names, call.args, strict=False))
            for keyword in call.keywords:
                if keyword.arg not in names[len(args.posonlyargs):] or keyword.arg in supplied:
                    raise ValueError("unknown or duplicate argument")
                supplied[keyword.arg] = keyword.value
            local = {}
            for name in names:
                expression = supplied.get(name, defaults.get(name))
                if expression is None:
                    raise ValueError("missing argument")
                # A caller-local name must never be mistaken for a module global.
                for use in ast.walk(expression):
                    if isinstance(use, ast.Name):
                        self.unique_global(use.id, next((n.targets[0] for n in self.tree.body
                            if isinstance(n, ast.Assign) and len(n.targets) == 1
                            and isinstance(n.targets[0], ast.Name) and n.targets[0].id == use.id), None))
                local[name] = self.value(expression, {})
            for statement in function.body[:-1]:
                if not (isinstance(statement, ast.Assign) and len(statement.targets) == 1
                        and isinstance(statement.targets[0], ast.Name) and statement.targets[0].id in names):
                    raise ValueError("unsupported helper body")
                local[statement.targets[0].id] = self.value(statement.value, local)
            text = self.value(template, local)
            expanded.append({"text": text, "line": call.lineno, "dynamic": False, "kind": "html",
                             "origin": {"template": self.witness(template), "call": self.witness(call),
                                        "inputs": self.inputs}})
        return expanded


def _python_fragments(source):
    """Parse Python, extracting embedded markup/styles without executing test fixtures."""
    tree = ast.parse(source)
    fragments = []
    parents = {child: node for node in ast.walk(tree) for child in ast.iter_child_nodes(node)}
    templates = _FinitePythonMarkup(source, tree, parents)
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
            if dynamic and text.lstrip().startswith("<"):
                try:
                    fragments.extend(templates.expand(node))
                    continue
                except (ValueError, TypeError, KeyError, RecursionError):
                    pass  # The original template remains explicit inability below.
            segment = ast.get_source_segment(source, node) or ""
            fragments.append({"text": text if "\n" in segment else text.replace("\n", " "),
                              "line": node.lineno, "dynamic": dynamic,
                              "kind": "html" if text.lstrip().startswith("<") else "typescript" if javascript else "css"})
    return fragments


def _safe_path(root, path):
    relative = PurePosixPath(path)
    if (not isinstance(path, str) or not path or relative.as_posix() != path
            or relative.is_absolute() or any(part in {".", ".."} for part in relative.parts)
            or re.search(r"[\\:\x00-\x1f]", path)):
        raise QualityError("unsafe source path")
    current = root
    for part in relative.parts:
        current = current / part
        if current.is_symlink() or current.is_junction():
            raise QualityError(f"source path crosses a link: {path}")
    if not current.resolve().is_relative_to(root):
        raise QualityError(f"source path escapes repository: {path}")
    return current


def _read_source(root, path):
    try:
        data = _safe_path(root, path).read_bytes()
        kind = _kind(path)
        source = None if kind == "font" else data.decode("utf-8")
        fragments = _python_fragments(source) if kind == "python" else []
    except (OSError, UnicodeError, SyntaxError) as problem:
        raise QualityError(f"cannot parse/read source {path}: {problem}") from problem
    return {"path": path, "kind": kind, "source": source,
            "digest": hashlib.sha256(data).hexdigest(), "fragments": fragments}


def _snapshot(root):
    files = [_read_source(root, path) for path in discover_files(root, ["browser-view"])]
    if not files:
        raise QualityError("browser-view has no source inventory")
    return files


def _call(root, operation, files, dependencies=(), imports=(), unresolved=(), configurations=()):
    node = shutil.which("node")
    if node is None or not BRIDGE.is_file():
        raise QualityError("local source inspector is unavailable")
    request = {"schema": 2, "root": str(root), "operation": operation, "files": files,
               "dependencies": list(dependencies), "imports": list(imports),
               "unresolved": list(unresolved), "configurations": list(configurations)}
    result = run_tool([node, BRIDGE], cwd=root,
                      input=json.dumps(request, ensure_ascii=True).encode("utf-8"))
    if result.stderr.strip():
        raise QualityError("source inspector reported diagnostics on stderr", result)
    try:
        return json.loads(result.stdout)
    except (ValueError, TypeError) as problem:
        raise QualityError("malformed or truncated source inspector output", result) from problem


def _span(source, start, end):
    # TypeScript positions count UTF-16 code units, not Unicode code points.
    encoded = source.encode("utf-16-le")
    if type(start) is not int or type(end) is not int or not 0 <= start < end <= len(encoded) // 2:
        raise QualityError("invalid import source span")
    try:
        return encoded[2 * start:2 * end].decode("utf-16-le")
    except UnicodeError as problem:
        raise QualityError("import source span splits a character") from problem


def _validate_import_coverage(report, requested):
    """Validate a separate parse of original source, never a count of returned edges."""
    if (not isinstance(report, dict) or set(report) != {"schema", "files"}
            or type(report["schema"]) is not int or report["schema"] != 1
            or not isinstance(report["files"], list) or len(report["files"]) != len(requested)):
        raise QualityError("unsupported or incomplete original import coverage")
    coverage = {}
    for entry, original in zip(report["files"], requested):
        if (not isinstance(entry, dict) or set(entry) != {"path", "digest", "sites"}
                or entry["path"] != original["path"] or entry["digest"] != original["digest"]
                or not isinstance(entry["sites"], list)):
            raise QualityError("original import coverage omitted, duplicated, forged or stale")
        spans, previous = [], -1
        for site in entry["sites"]:
            if not isinstance(site, dict) or set(site) != {"start", "end"}:
                raise QualityError("invalid original import coverage span")
            _span(original["source"], site["start"], site["end"])
            if site["start"] <= previous:
                raise QualityError("duplicate or unordered original import coverage")
            previous = site["start"]
            spans.append((site["start"], site["end"]))
        coverage[original["path"]] = spans
    return coverage


def _validate_imports(report, requested, original_coverage):
    coverage = _validate_import_coverage(original_coverage, requested)
    if (not isinstance(report, dict) or set(report) != {"schema", "files"}
            or type(report["schema"]) is not int or report["schema"] != 1
            or not isinstance(report["files"], list)
            or len(report["files"]) != len(requested)):
        raise QualityError("unsupported or incomplete import protocol")
    edges, unresolved = [], []
    inputs = {item["path"]: item for item in requested}
    for entry, original in zip(report["files"], requested):
        if (not isinstance(entry, dict) or set(entry) != {"path", "digest", "imports", "unresolved"}
                or entry["path"] != original["path"] or entry["digest"] != original["digest"]
                or not isinstance(entry["imports"], list) or not isinstance(entry["unresolved"], list)):
            raise QualityError("import snapshot omitted, duplicated, forged or stale")
        last = -1
        for edge in entry["imports"]:
            _located(edge, inputs)
            if (set(edge) != {"path", "line", "start", "end", "expression", "specifier",
                              "specifierStart", "specifierEnd", "kind", "via"}
                    or edge["path"] != original["path"] or original["kind"] != "typescript"
                    or not isinstance(edge["kind"], str)
                    or edge["kind"] not in {"import-type", "import-runtime", "import-mixed",
                                            "export-type", "export-runtime", "export-mixed",
                                            "dynamic-runtime", "dynamic-url", "unsupported"}):
                raise QualityError("invalid import evidence")
            source = original["source"]
            expression = _span(source, edge["start"], edge["end"])
            prefix = _span(source, 0, edge["start"]) if edge["start"] else ""
            if (edge["start"] <= last or expression != edge["expression"]
                    or len(re.findall(r"\r\n|[\n\r\u2028\u2029]", prefix)) + 1 != edge["line"]):
                raise QualityError("duplicate, unordered or forged import location")
            last = edge["start"]
            via = edge["via"]
            container_start, container_end = edge["start"], edge["end"]
            if via is not None:
                if (edge["kind"] != "dynamic-url" or not isinstance(via, dict)
                        or set(via) != {"start", "end", "expression"}
                        or _span(source, via["start"], via["end"]) != via["expression"]):
                    raise QualityError("invalid const URL relation evidence")
                container_start, container_end = via["start"], via["end"]
            elif edge["kind"] == "dynamic-url":
                raise QualityError("const URL import omitted binding evidence")
            if edge["specifier"] is None:
                if edge["specifierStart"] is not None or edge["specifierEnd"] is not None:
                    raise QualityError("unknown import has a forged literal span")
            else:
                literal = _span(source, edge["specifierStart"], edge["specifierEnd"])
                if (not isinstance(edge["specifier"], str) or len(literal) < 2
                        or literal[0] not in {"'", '"'} or literal[-1] != literal[0]
                        or "\\" in literal or literal[1:-1] != edge["specifier"]
                        or not container_start <= edge["specifierStart"] < edge["specifierEnd"] <= container_end):
                    raise QualityError("unsupported or forged import specifier")
            edges.append(edge)
        if [(edge["start"], edge["end"]) for edge in entry["imports"]] != coverage[original["path"]]:
            raise QualityError("import relationships omitted or invented against original source coverage")
        for diagnostic in entry["unresolved"]:
            _located(diagnostic, inputs)
            if (set(diagnostic) != {"path", "line", "reason"}
                    or diagnostic["path"] != original["path"]
                    or not isinstance(diagnostic["reason"], str) or not diagnostic["reason"]):
                raise QualityError("invalid import grammar diagnostic")
            unresolved.append(diagnostic)
    return edges, unresolved


def _compiler_mount(root, name, configurations):
    """A bounded source identity mapping, never a claim about emitted bytes."""
    if name not in configurations:
        configurations[name] = _read_source(root, name)
    data = json.loads(configurations[name]["source"])
    if not isinstance(data, dict):
        raise TypeError("compiler configuration must be an object")
    inherited = {}
    if name == "tsconfig.styleguide.json":
        if data.get("extends") != "./tsconfig.browser.json":
            raise ValueError("unsupported compiler configuration inheritance")
        _compiler_mount(root, "tsconfig.browser.json", configurations)
        inherited = json.loads(configurations["tsconfig.browser.json"]["source"])["compilerOptions"]
    elif "extends" in data:
        raise ValueError("unsupported compiler configuration inheritance")
    if not isinstance(data.get("compilerOptions"), dict):
        raise TypeError("missing compiler options")
    options = {**inherited, **data["compilerOptions"]}
    if (options.get("module") != "NodeNext" or options.get("moduleResolution") != "NodeNext"
            or any(key in options for key in ("paths", "rootDirs", "outFile", "moduleSuffixes", "jsx"))
            or any(key in options and type(options[key]) is not bool
                   for key in ("noEmit", "emitDeclarationOnly"))
            or options.get("noEmit") is True or options.get("emitDeclarationOnly") is True):
        raise ValueError("unsupported compiler source mapping")
    source, output = options.get("rootDir"), options.get("outDir")
    if (not isinstance(source, str) or not isinstance(output, str)
            or not source or not output or output == "."):
        raise ValueError("missing compiler source/output directories")
    if source != ".":
        _safe_path(root, source)
    _safe_path(root, output)
    return source, output


def _original_path(root, path):
    """Apply one acquisition policy to direct and compiler-mapped originals."""
    if {"node_modules", ".git", ".runs", ".the-way", "dist"}.intersection(PurePosixPath(path).parts):
        return None
    return _safe_path(root, path)


def _generated_source(root, target, configurations):
    for name in ("tsconfig.browser.json", "tsconfig.styleguide.json"):
        try:
            source, output = _compiler_mount(root, name, configurations)
        except (QualityError, ValueError, TypeError, KeyError):
            continue
        if not target.startswith(output + "/"):
            continue
        relative = target[len(output) + 1:]
        original = posixpath.normpath(posixpath.join(source, relative))
        suffix = PurePosixPath(original).suffix
        extensions = {".js": [".ts", ".tsx"], ".mjs": [".mts"], ".cjs": [".cts"]}.get(suffix)
        if extensions:
            for extension in extensions:
                candidate = original[:-len(suffix)] + extension
                physical = _original_path(root, candidate)
                if physical is not None and physical.is_file():
                    return candidate, name
    return None, None


def _resolve_import(root, edge, configurations):
    specifier = edge["specifier"]
    if edge["kind"] == "unsupported" or specifier is None:
        return "unresolved", None, "runtime import relation is unsupported"
    if (not specifier or re.search(r"[\\:\x00-\x20%?#]", specifier)
            or specifier.startswith("/") or not specifier.startswith(".")):
        if specifier in {"node:assert/strict", "node:fs", "node:fs/promises", "node:test",
                         "node:child_process", "node:url", "node:path"} and edge["path"].startswith("tests/"):
            return "tooling", None, "Node builtin used by test tooling; no local source acquisition"
        return "unresolved", None, "nonlocal or unsafe import is outside bounded acquisition"
    target = posixpath.normpath(posixpath.join(posixpath.dirname(edge["path"]), specifier))
    if target == ".." or target.startswith("../"):
        return "unresolved", None, "import escapes repository root"
    parts = PurePosixPath(target).parts
    if parts[0] in {"dist", ".runs"} and edge["path"].startswith("tests/"):
        original, _configuration = _generated_source(root, target, configurations)
        if original is not None:
            return "generated", original, "compiler-mapped original only; generated bytes are not inspected source"
        return "unresolved", None, "generated import lacks a verified compiler configuration/original-source relation"
    if _original_path(root, target) is None:
        return "unresolved", None, "import targets an excluded acquisition boundary"
    suffix = PurePosixPath(target).suffix
    if suffix in {".js", ".mjs", ".cjs"}:
        stem = target[:-len(suffix)]
        substitutions = {".js": [".ts", ".tsx", ".d.ts", ".js", ".jsx"],
                         ".mjs": [".mts", ".d.mts", ".mjs"],
                         ".cjs": [".cts", ".d.cts", ".cjs"]}
        candidates = [stem + extension for extension in substitutions[suffix]]
    elif suffix in {".ts", ".tsx", ".mts", ".cts", ".jsx"}:
        candidates = [target]
    else:
        return "unresolved", None, "import extension is unsupported (explicit module extension required)"
    for candidate in candidates:
        if re.search(r"\.d\.[cm]?ts$", candidate) and not edge["kind"].endswith("-type"):
            continue
        physical = _original_path(root, candidate)
        if physical is not None and physical.is_file():
            return "local", candidate, None
    return "unresolved", None, "imported original source is missing"


def _acquire(root, requested):
    originals = {entry["path"]: entry for entry in requested}
    frontier = [entry for entry in requested if entry["kind"] == "typescript"]
    imports, unresolved, configurations = [], [], {}
    while frontier:
        parsed = _call(root, "imports", frontier)
        original_coverage = _call(root, "coverage", frontier)
        edges, diagnostics = _validate_imports(parsed, frontier, original_coverage)
        unresolved.extend(diagnostics)
        following = {}
        for edge in edges:
            resolution, target, reason = _resolve_import(root, edge, configurations)
            imports.append({**edge, "resolution": resolution, "target": target, "reason": reason})
            if resolution == "unresolved":
                unresolved.append({"path": edge["path"], "line": edge["line"], "reason": reason})
            if target is not None and target not in originals and target not in following:
                if len(originals) + len(following) >= 4096:
                    raise QualityError("import graph exceeds bounded acquisition limit")
                following[target] = _read_source(root, target)
        frontier = [following[path] for path in sorted(following)]
        originals.update(following)
        if len(originals) > 4096:
            raise QualityError("import graph exceeds bounded acquisition limit")
    governed = {entry["path"] for entry in requested}
    dependencies = [originals[path] for path in sorted(originals) if path not in governed]
    return dependencies, imports, unresolved, [configurations[name] for name in sorted(configurations)]


def _located(record, files):
    if (not isinstance(record, dict) or not isinstance(record.get("path"), str)
            or record["path"] not in files):
        raise QualityError("source evidence has no inventoried path")
    line = record.get("line")
    source = files[record["path"]]["source"]
    if type(line) is not int or source is None or not 1 <= line <= max(1, len(source.splitlines())):
        raise QualityError("source evidence has no in-range original source line")


def _validate_facts(report, requested, dependencies=(), imports=(), unresolved=(), configurations=()):
    if (not isinstance(report, dict) or set(report) != {"schema", "files", "dependencies", "imports", "unresolved", "configurations"}
            or type(report["schema"]) is not int or report["schema"] != 3):
        raise QualityError("unsupported source-fact protocol")
    if any(json.dumps(report[key], sort_keys=True) != json.dumps(list(expected), sort_keys=True)
           for key, expected in (("dependencies", dependencies), ("imports", imports),
                                 ("unresolved", unresolved), ("configurations", configurations))):
        raise QualityError("dependency evidence omitted, duplicated, forged or stale")
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
                    if set(fact) != {"path", "line", "property", "value", "selector", "context", "priority"}:
                        raise QualityError("incomplete declaration evidence")
                    if any(not isinstance(fact[field], str) for field in (
                            "property", "selector", "context")) or not fact["property"]:
                        raise QualityError("invalid declaration name/context")
                    if fact["value"] is not None and not isinstance(fact["value"], str):
                        raise QualityError("invalid declaration value")
                    if fact["priority"] is not None and (
                            not isinstance(fact["priority"], str)
                            or fact["priority"] not in {"normal", "important"}):
                        raise QualityError("invalid declaration priority")
                    if (fact["value"] is None or fact["priority"] is None) and not any(
                            diagnostic.get("path") == fact["path"]
                            and diagnostic.get("line") == fact["line"]
                            for diagnostic in entry["unresolved"] if isinstance(diagnostic, dict)):
                        raise QualityError("unresolved declaration without diagnostic")
                elif set(fact) != {"path", "line", "kind", "expression"} or any(
                        not isinstance(fact[field], str) for field in ("kind", "expression")):
                    raise QualityError("invalid DOM construction evidence")
    return report


def _invoke(root, operation):
    root = Path(root).resolve()
    requested = _snapshot(root)
    dependencies, imports, unresolved, configurations = _acquire(root, requested)
    if operation != "sources" and unresolved:
        raise QualityError("operation has unresolved import acquisition: " + json.dumps(unresolved))
    report = _call(root, operation, requested, dependencies, imports, unresolved, configurations)
    for original in [*requested, *dependencies, *configurations]:
        if _read_source(root, original["path"]) != original:
            raise QualityError("source bytes changed during dependency acquisition")
    if operation == "sources":
        return _validate_facts(report, requested, dependencies, imports, unresolved, configurations)
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
        unresolved = [*facts["unresolved"],
                      *(item for entry in facts["files"] for item in entry["unresolved"])]
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
