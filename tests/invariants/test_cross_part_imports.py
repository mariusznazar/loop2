"""Invariant cross-part-imports: No file of a part imports a file of another part, unless the
*Depends on* of its part names that part, the importing file stands under `tests/` and the
imported file belongs to the part `test-helpers`, or an invariant "the part `<X>` does not depend
on `<Y>`" reading `Violated: yes` says that the part `<X>` of the importing file depends on the
part `<Y>` of the imported file today.

The parts come from the part map: git matches the *Files* patterns of `foundations/part_map.md` to
every file the repository holds (`file_owners` of `loop2_invariant_support.py`), and the *Depends
on* field of each part gives the parts it may import from. Any file under `tests/` counts as a
test, helpers and stand-ins included (D-351).

Reading of "imports", by the code of a file and never by its strings or comments:
- TypeScript and JavaScript (`.ts .tsx .mts .cts .js .jsx .mjs .cjs`): `import ... from`,
  `export ... from`, a bare `import '...'` and `import('...')` with a string literal. A specifier
  that starts with `.` is matched to a file git lists against the importing file's directory, by its
  own name, by its source with `.js`, `.mjs` or `.cjs` read as `.ts`/`.tsx`, `.mts` or `.cts`, by
  adding an extension, and by `index`; an import of a built file `dist/browser/...`,
  `dist/server/...` or `dist/kitchen-sink/...` (which git does not list) is matched to its source
  under `src/`. A package or a `node:` specifier is no file of any part;
- Python (`.py`): `import` and `from ... import` statements anywhere in the file, found with `ast`.
  A module name is searched in the importing file's directory, in the repository's root and in each
  directory the file adds to `sys.path` with `sys.path.insert`, `.append`, `+= [...]` or a slice
  assignment, where the directory is written out of `__file__`, a module-level constant, `Path`,
  `os.path` and string operations. A module that resolves to no file of the repository (the
  standard library, a package) is no file of any part. A directory the file adds to `sys.path`
  from a value known only at run time adds nothing the check can see;
- a relative import, in either language, that matches no file git lists fails the check, with the
  file and the line.

Covers: every code file of the repository, by the reading above; a control of the reading, made-up
files each holding one of the forms above, with the imports they must and must not give.

Does NOT cover: a process one file starts from another (`node <file>`, `python <file>`, `spawn`,
`subprocess`), `runpy`, `exec`, `importlib.import_module` and `__import__`, `require`, an
`import()` of anything but a string literal, the pages and style sheets (HTML and CSS) and the
`<script>` and `@import` references in them; a Python import of an ancestor package's
`__init__.py` that the imported module's name implies.
"""

import ast
import os
import posixpath
import re
import unittest

import loop2_invariant_support as support

HELPER_PART = "test-helpers"
UNSPECIFIED = "unspecified"

SCRIPT_SUFFIXES = (".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs")
CODE_SUFFIXES = SCRIPT_SUFFIXES + (".py",)
# The source a built file of this extension comes from, by the extension the compiler gives it.
SOURCE_EXTENSIONS = {".js": (".ts", ".tsx"), ".jsx": (".tsx",), ".mjs": (".mts",),
                     ".cjs": (".cts",)}
TRIED_EXTENSIONS = (".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs", ".json")
# Built files are not listed by git; each folder of the build comes from the source folder in
# tsconfig.browser.json, tsconfig.server.json and tsconfig.kitchen-sink.json (rootDir src/browser).
BUILT_FROM = (("dist/browser/", "src/browser/"), ("dist/server/", "src/server/"),
              ("dist/kitchen-sink/", "src/browser/"))
# A word after which a `/` starts a regular expression and not a division.
REGEX_AFTER_WORDS = {"return", "typeof", "case", "do", "else", "in", "of", "new", "delete",
                     "void", "throw", "yield", "await", "instanceof"}


# --- TypeScript and JavaScript ---------------------------------------------------------------


def skip_template(text, start):
    """The index after the template literal that opens with the backtick at `start`."""
    i, n = start + 1, len(text)
    while i < n:
        if text[i] == "\\":
            i += 2
        elif text[i] == "`":
            return i + 1
        elif text.startswith("${", i):
            i = skip_substitution(text, i + 2)
        else:
            i += 1
    return n


def skip_substitution(text, start):
    """The index after the brace that closes a `${` whose contents begin at `start`."""
    i, n, depth = start, len(text), 1
    while i < n and depth:
        c = text[i]
        if c in "'\"":
            i += 1
            while i < n and text[i] != c and text[i] != "\n":
                i += 2 if text[i] == "\\" else 1
        elif c == "`":
            i = skip_template(text, i) - 1
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
        i += 1
    return i


def script_tokens(text):
    """The code of a TypeScript or JavaScript file as (kind, value, line) tokens, with comments
    left out and a string kept as its contents; a template literal and a regular expression are
    one token with no value."""
    tokens = []
    i, n, line = 0, len(text), 1
    while i < n:
        c = text[i]
        if c == "\n":
            line += 1
            i += 1
        elif c.isspace():
            i += 1
        elif text.startswith("//", i):
            j = text.find("\n", i)
            i = n if j < 0 else j
        elif text.startswith("/*", i):
            j = text.find("*/", i + 2)
            j = n if j < 0 else j + 2
            line += text.count("\n", i, j)
            i = j
        elif c in "'\"":
            j = i + 1
            while j < n and text[j] != c and text[j] != "\n":
                j += 2 if text[j] == "\\" else 1
            tokens.append(("string", text[i + 1:j], line))
            i = j + 1
        elif c == "`":
            j = skip_template(text, i)
            tokens.append(("template", "", line))
            line += text.count("\n", i, j)
            i = j
        elif c == "/" and regex_may_start(tokens):
            j, in_class = i + 1, False
            while j < n and text[j] != "\n" and (in_class or text[j] != "/"):
                if text[j] == "\\":
                    j += 1
                elif text[j] == "[":
                    in_class = True
                elif text[j] == "]":
                    in_class = False
                j += 1
            if j < n and text[j] == "/":
                j += 1
                while j < n and (text[j].isalnum() or text[j] == "_"):
                    j += 1
                tokens.append(("regex", "", line))
                i = j
            else:  # no regular expression ends on this line: it was a `/` of JSX, say
                tokens.append(("punct", c, line))
                i += 1
        else:
            word = re.compile(r"[A-Za-z_$][\w$]*").match(text, i)
            if word:
                tokens.append(("word", word.group(), line))
                i = word.end()
            elif c.isdigit():
                number = re.compile(r"[\w.]+").match(text, i)
                tokens.append(("number", number.group(), line))
                i = number.end()
            else:
                tokens.append(("punct", c, line))
                i += 1
    return tokens


def regex_may_start(tokens):
    if not tokens:
        return True
    kind, value, _ = tokens[-1]
    if kind == "word":
        return value in REGEX_AFTER_WORDS
    if kind == "punct":
        return value not in ")]}"
    return False


def script_specifiers(text):
    """(line, specifier) of each import of a TypeScript or JavaScript file, by the forms in the
    module docstring."""
    tokens = script_tokens(text)
    found = []

    def at(k):
        return tokens[k] if k < len(tokens) else ("end", "", 0)

    def clause_specifier(k):
        """The specifier of `<clause> from '<specifier>'` whose clause starts at token k."""
        for j in range(k, min(k + 400, len(tokens))):
            kind, value, _ = tokens[j]
            if kind == "word" and value == "from" and at(j + 1)[0] == "string":
                return tokens[j + 1]
            if kind not in ("word", "punct") or (kind == "punct" and value not in "{},*"):
                return None
        return None

    for k, (kind, value, line) in enumerate(tokens):
        if kind != "word" or value not in ("import", "export"):
            continue
        if k and tokens[k - 1][:2] == ("punct", "."):
            continue  # a member named import or export
        following = at(k + 1)
        if value == "import" and following[:2] == ("punct", "("):
            if at(k + 2)[0] == "string" and at(k + 3)[1] in (")", ","):
                found.append((line, tokens[k + 2][1]))
        elif value == "import" and following[0] == "string":
            found.append((line, following[1]))
        elif (value == "import" and following[:2] != ("punct", ".")) or (
                value == "export" and (following[:2] in (("punct", "*"), ("punct", "{"))
                                       or following[:2] == ("word", "type"))):
            specifier = clause_specifier(k + 1)
            if specifier:
                found.append((line, specifier[1]))
    return sorted(set(found))


def script_candidates(path):
    """The paths a relative specifier, once joined to the importer's directory, may name."""
    stem, extension = posixpath.splitext(path)
    yield path
    for swapped in SOURCE_EXTENSIONS.get(extension, ()):
        yield stem + swapped
    for built, source in BUILT_FROM:
        if path.startswith(built):
            base = source + path[len(built):]
            base_stem, base_extension = posixpath.splitext(base)
            yield base
            for swapped in SOURCE_EXTENSIONS.get(base_extension, ()):
                yield base_stem + swapped
    for suffix in TRIED_EXTENSIONS:
        yield path + suffix
    for suffix in TRIED_EXTENSIONS:
        yield path + "/index" + suffix


def script_targets(importer, specifier, tracked):
    """The files of the repository a specifier names: a list, empty for a package or a `node:`
    specifier; None where a relative specifier matches no file."""
    if re.match(r"[A-Za-z][A-Za-z0-9+.-]*:", specifier) or not specifier.startswith((".", "/")):
        return []
    if specifier.startswith("/"):
        return None
    path = posixpath.normpath(posixpath.join(posixpath.dirname(importer), specifier))
    if path.startswith(".."):
        return None
    for candidate in script_candidates(path):
        if candidate in tracked:
            return [candidate]
    return None


# --- Python ----------------------------------------------------------------------------------


class Unevaluable(Exception):
    """A path expression whose value the check cannot work out from the file alone."""


def join_path(first, *rest):
    joined = posixpath.normpath(posixpath.join(first, *rest))
    if joined.startswith(("..", "/")):
        raise Unevaluable
    return joined


def up(path, steps):
    for _ in range(steps):
        if path in ("", "."):
            raise Unevaluable
        path = posixpath.dirname(path) or "."
    return path


def dotted(node):
    """`a.b.c` as "a.b.c" for a chain of names and attributes, else None."""
    if isinstance(node, ast.Name):
        return node.id
    if isinstance(node, ast.Attribute):
        base = dotted(node.value)
        return base and base + "." + node.attr
    return None


def evaluate(node, importer, names):
    """The repository-relative path an expression of `importer` gives, from `__file__`, constants
    `names` of its module level, `Path`, `os.path` and string operations; Unevaluable otherwise."""
    if isinstance(node, ast.Constant) and isinstance(node.value, str):
        return node.value
    if isinstance(node, ast.Name):
        if node.id == "__file__":
            return importer
        if node.id in names:
            return names[node.id]
        raise Unevaluable
    if isinstance(node, ast.BinOp) and isinstance(node.op, ast.Div):
        return join_path(evaluate(node.left, importer, names),
                         evaluate(node.right, importer, names))
    if isinstance(node, ast.Attribute) and node.attr == "parent":
        return up(evaluate(node.value, importer, names), 1)
    if (isinstance(node, ast.Subscript) and isinstance(node.value, ast.Attribute)
            and node.value.attr == "parents" and isinstance(node.slice, ast.Constant)
            and isinstance(node.slice.value, int) and node.slice.value >= 0):
        return up(evaluate(node.value.value, importer, names), node.slice.value + 1)
    if isinstance(node, ast.Call):
        name = dotted(node.func)
        arguments = [evaluate(argument, importer, names) for argument in node.args]
        if name in ("Path", "pathlib.Path", "PurePath", "pathlib.PurePath", "os.path.join",
                    "posixpath.join") and arguments:
            return join_path(*arguments)
        if name in ("str", "os.fspath", "os.path.abspath", "os.path.realpath",
                    "os.path.normpath") and len(arguments) == 1:
            return join_path(arguments[0])
        if name == "os.path.dirname" and len(arguments) == 1:
            return up(arguments[0], 1)
        if (isinstance(node.func, ast.Attribute) and not node.args
                and node.func.attr in ("resolve", "absolute", "as_posix")):
            return join_path(evaluate(node.func.value, importer, names))
    raise Unevaluable


def path_additions(tree, importer):
    """The repository-relative directories a Python file adds to `sys.path`, anywhere in it, where
    their value follows from the file alone."""
    names = {}
    for statement in tree.body:
        if isinstance(statement, ast.Assign) and len(statement.targets) == 1 \
                and isinstance(statement.targets[0], ast.Name):
            try:
                names[statement.targets[0].id] = evaluate(statement.value, importer, names)
            except Unevaluable:
                pass
    expressions = []
    for node in ast.walk(tree):
        if (isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute)
                and dotted(node.func.value) == "sys.path"):
            if node.func.attr == "insert" and len(node.args) == 2:
                expressions.append(node.args[1])
            elif node.func.attr == "append" and len(node.args) == 1:
                expressions.append(node.args[0])
        elif isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Subscript) and dotted(target.value) == "sys.path" \
                        and isinstance(node.value, ast.List):
                    expressions.extend(node.value.elts)
        elif isinstance(node, ast.AugAssign) and dotted(node.target) == "sys.path" \
                and isinstance(node.value, ast.List):
            expressions.extend(node.value.elts)
    directories = []
    for expression in expressions:
        try:
            directories.append(evaluate(expression, importer, names))
        except Unevaluable:
            pass
    return directories


def python_module(parts, base, tracked, directories):
    """What the dotted module `parts` names below the directory `base`: ("file", path) for a
    module or a package's `__init__.py`, ("directory", path) for a directory of the repository
    without one, None where nothing is named."""
    path = join_path(base, *parts) if parts else base
    if parts and path + ".py" in tracked:
        return "file", path + ".py"
    if posixpath.join(path, "__init__.py") in tracked:
        return "file", posixpath.join(path, "__init__.py")
    if path in directories:
        return "directory", path
    return None


def imported_files(named, imported, tracked, directories):
    """(files, missing) of `from <module> import <names>` once the module is `named`: the files
    it reads, and the names that are no submodule of a directory without `__init__.py`."""
    kind, path = named
    files = [path] if kind == "file" else []
    if kind == "file" and not path.endswith("__init__.py"):
        return files, []
    folder = path if kind == "directory" else posixpath.dirname(path)
    missing = []
    for name in imported:
        submodule = python_module([name], folder, tracked, directories)
        if submodule and submodule[0] == "file":
            files.append(submodule[1])
        elif submodule is None and kind == "directory":
            missing.append(name)
    return files, missing


def python_specifiers(importer, text, tracked, directories):
    """(line, specifier, targets) of each import of a Python file; targets is a list of the files
    of the repository, empty for the standard library or a package, None where a relative import
    matches no file."""
    tree = ast.parse(text, filename=importer)
    own = posixpath.dirname(importer) or "."
    search = [own, "."] + path_additions(tree, importer)
    found = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            requests = [(alias.name, 0, []) for alias in node.names]
        elif isinstance(node, ast.ImportFrom):
            names = [alias.name for alias in node.names if alias.name != "*"]
            requests = [(node.module or "", node.level, names)]
        else:
            continue
        for module, level, names in requests:
            parts = module.split(".") if module else []
            written = "." * level + module
            try:
                bases = [up(own, level - 1)] if level else search
            except Unevaluable:
                found.append((node.lineno, written, None))
                continue
            named = None
            for base in bases:
                try:
                    named = python_module(parts, base, tracked, directories)
                except Unevaluable:
                    continue
                if named:
                    break
            if named is None:
                found.append((node.lineno, written, None if level else []))
                continue
            files, missing = imported_files(named, names, tracked, directories)
            found.append((node.lineno, written, files))
            if level:
                found.extend((node.lineno, written + ("." if module else "") + name, None)
                             for name in missing)
    return sorted(found, key=lambda item: (item[0], item[1]))


# --- the part map ----------------------------------------------------------------------------


def part_dependencies(part_map):
    """part -> set of the parts its *Depends on* names, read from the text of the part map."""
    dependencies = {}
    for section in re.split(r"(?m)^## ", part_map)[1:]:
        name, _, body = section.partition("\n")
        field = re.search(r"(?m)^- \*\*Depends on:\*\* (.*)$", body)
        if field:
            value = field.group(1).strip()
            dependencies[name.strip()] = (set() if value == "none"
                                          else {item.strip() for item in value.split("·")})
    return dependencies


def accepted_pairs(invariants):
    """(X, Y) for each invariant "the part `X` does not depend on `Y`" that reads `Violated: yes`
    in the text of the invariants file."""
    pairs = set()
    for section in re.split(r"(?m)^## ", invariants)[1:]:
        _, _, body = section.partition("\n")
        sentence = " ".join(body.split("\n- **")[0].split())
        stated = re.fullmatch(r"the part `([a-z][a-z0-9-]*)` does not depend on "
                              r"`([a-z][a-z0-9-]*)`\.?", sentence, re.IGNORECASE)
        if stated and re.search(r"(?m)^- \*\*Violated:\*\* yes$", body):
            pairs.add(stated.groups())
    return pairs


# --- the check -------------------------------------------------------------------------------


def import_failures(texts, tracked, owners, dependencies, accepted):
    """One message for each import of the code files `texts` (path -> text) that the part map does
    not allow or that matches no file, with the file and the line."""
    directories = {"."}
    for path in tracked:
        folder = posixpath.dirname(path)
        while folder:
            directories.add(folder)
            folder = posixpath.dirname(folder)
    failures = []
    for path in sorted(texts):
        if path.endswith(".py"):
            imports = python_specifiers(path, texts[path], tracked, directories)
        else:
            imports = [(line, specifier, script_targets(path, specifier, tracked))
                       for line, specifier in script_specifiers(texts[path])]
        for line, specifier, targets in imports:
            if targets is None:
                failures.append(f"{path}:{line} imports {specifier!r}, which matches no file "
                                "git lists")
                continue
            for target in sorted(set(targets)):
                reason = refusal(path, target, owners, dependencies, accepted)
                if reason:
                    failures.append(f"{path}:{line} imports {specifier!r} ({target}): {reason}")
    return failures


def refusal(importer, imported, owners, dependencies, accepted):
    """Why the part map does not let `importer` import `imported`, or None where it does."""
    source, target = owners.get(importer, UNSPECIFIED), owners.get(imported, UNSPECIFIED)
    if UNSPECIFIED in (source, target):
        claimless = importer if source == UNSPECIFIED else imported
        return f"{claimless} belongs to no part of the part map"
    if source == target or target in dependencies.get(source, ()):
        return None
    if target == HELPER_PART and importer.startswith("tests/"):
        return None
    if (source, target) in accepted:
        return None
    return f"the part {source} does not list the part {target} in Depends on"


class CrossPartImports(unittest.TestCase):

    def test_every_import_of_the_repository_stays_within_the_part_map(self):
        # invariant: cross-part-imports
        root = support.ROOT
        listed = support.listed_files(root)
        tracked = set(listed)
        owners = support.file_owners(root, tracked)
        dependencies = part_dependencies(
            support.read_text(os.path.join(root, "foundations", "part_map.md")))
        accepted = accepted_pairs(
            support.read_text(os.path.join(root, "foundations", "invariants.md")))
        texts = {path: support.read_text(os.path.join(root, path))
                 for path in listed if path.endswith(CODE_SUFFIXES)}
        self.assertIn("src/browser/sim/game.ts", texts, "the check reads no code of the game")
        self.assertIn("tests/sim/encounters.test.mjs", texts)
        self.assertEqual(import_failures(texts, tracked, owners, dependencies, accepted), [])




# --- controls --------------------------------------------------------------------------------

# A made-up repository of four parts: `view` may import from `core`, `tools` and `core` from
# nothing, and `test-helpers` is the part of test helpers.
CONTROL_DEPENDENCIES = {"core": set(), "view": {"core"}, "tools": set(), HELPER_PART: set()}
CONTROL_FILES = (
    "src/core/rules.ts", "src/core/data.json", "src/view/screen.tsx", "src/view/more.tsx",
    "src/browser/core/rules.ts", "src/browser/view/stage.tsx", "src/server/app.ts",
    "scripts/build.mjs", "tests/support/shared.py", "tests/support/tool.mjs",
    "tests/core/test_rules.py", "tests/tools/test_build.py",
)
CONTROL_PARTS = (
    ("src/browser/core/", "core"), ("src/core/", "core"), ("tests/core/", "core"),
    ("src/browser/view/", "view"), ("src/view/", "view"), ("tests/view/", "view"),
    ("src/server/", "tools"), ("scripts/", "tools"), ("tests/tools/", "tools"),
    ("tests/support/", HELPER_PART),
)


def control_failures(sources, accepted=(), owners=None):
    """The failures for made-up files `sources` (path -> text) added to the made-up repository."""
    tracked = set(CONTROL_FILES) | set(sources)
    given = {path: next(part for prefix, part in CONTROL_PARTS if path.startswith(prefix))
             for path in tracked}
    given.update(owners or {})
    return import_failures(sources, tracked, given, CONTROL_DEPENDENCIES, set(accepted))


class ReadingOfImports(unittest.TestCase):

    def test_control_each_form_of_a_script_import_is_read_with_its_line(self):
        # invariant: cross-part-imports
        text = ("import a from '../../src/view/screen.js';\n"
                "import { b, c as d } from \"../../src/view/more.js\";\n"
                "import type { T } from '../../src/view/screen.js';\n"
                "import * as e from '../../src/view/screen.js';\n"
                "import '../../src/view/more.js';\n"
                "export * from '../../src/view/screen.js';\n"
                "export { f } from '../../src/view/more.js';\n"
                "const g = await import('../../src/view/screen.js');\n"
                "import(\n  '../../src/view/more.js'\n);\n")
        failures = control_failures({"tests/core/forms.test.mjs": text})
        self.assertEqual([failure.split(" imports ")[0] for failure in failures],
                         [f"tests/core/forms.test.mjs:{line}" for line in range(1, 10)])
        self.assertEqual(failures[0], "tests/core/forms.test.mjs:1 imports "
                         "'../../src/view/screen.js' (src/view/screen.tsx): the part core does "
                         "not list the part view in Depends on")

    def test_control_comments_strings_templates_and_expressions_give_no_import(self):
        # invariant: cross-part-imports
        text = ("// import a from '../../src/view/screen.js';\n"
                "/* import('../../src/view/screen.js');\n"
                "   import b from '../../src/view/more.js'; */\n"
                "const text = \"import c from '../../src/view/screen.js'\";\n"
                "const other = 'export * from \"../../src/view/screen.js\"';\n"
                "const code = `import d from '../../src/view/screen.js'\n"
                "${\"}\" + `import('../../src/view/more.js')`}`;\n"
                "const pattern = /import e from '..\\/view'/;\n"
                "const half = a / 2 / b; const call = load(import_value);\n"
                "const dynamic = await import(name);\n"
                "const member = module.import('../../src/view/screen.js');\n"
                "export const value = 1;\nexport function run() {}\n")
        self.assertEqual(control_failures({"tests/core/quiet.test.mjs": text}), [])

    def test_control_a_package_or_a_node_module_is_no_file_of_any_part(self):
        # invariant: cross-part-imports
        text = ("import fs from 'node:fs';\nimport react from 'react';\n"
                "import assert from \"node:assert/strict\";\n"
                "import x from 'https://example.org/x.js';\n")
        self.assertEqual(control_failures({"src/core/external.ts": text}), [])

    def test_control_a_built_file_is_matched_to_its_source_and_its_part(self):
        # invariant: cross-part-imports
        sources = {
            "tests/core/built.test.mjs":
                "import { stage } from '../../dist/browser/view/stage.js';\n"
                "import { app } from '../../dist/server/app.js';\n",
            "tests/view/built.test.mjs":
                "import { rules } from '../../dist/browser/core/rules.js';\n",
        }
        self.assertEqual(control_failures(sources), [
            "tests/core/built.test.mjs:1 imports '../../dist/browser/view/stage.js' "
            "(src/browser/view/stage.tsx): the part core does not list the part view in "
            "Depends on",
            "tests/core/built.test.mjs:2 imports '../../dist/server/app.js' (src/server/app.ts): "
            "the part core does not list the part tools in Depends on"])

    def test_control_a_relative_import_matching_no_file_fails_with_file_and_line(self):
        # invariant: cross-part-imports
        script = {"tests/core/lost.test.mjs":
                  "import a from 'react';\n\nimport b from './missing.js';\n"
                  "import c from '../../dist/browser/nothing.js';\n"
                  "import d from '/absolute.js';\n"}
        self.assertEqual(control_failures(script), [
            "tests/core/lost.test.mjs:3 imports './missing.js', which matches no file git lists",
            "tests/core/lost.test.mjs:4 imports '../../dist/browser/nothing.js', which matches "
            "no file git lists",
            "tests/core/lost.test.mjs:5 imports '/absolute.js', which matches no file git lists"])
        python = {"tests/core/test_lost.py":
                  "import os\nfrom . import missing\nfrom .test_rules import thing\n"
                  "from .. import nothing\n"}
        self.assertEqual(control_failures(python), [
            "tests/core/test_lost.py:2 imports '.missing', which matches no file git lists",
            "tests/core/test_lost.py:4 imports '..nothing', which matches no file git lists"])

    def test_control_the_map_the_helpers_and_the_accepted_invariants_decide_what_passes(self):
        # invariant: cross-part-imports
        same_part = {"src/view/screen.tsx": "import m from './more.js';\n"}
        listed_part = {"src/view/more.tsx": "import r from '../core/rules.js';\n"}
        helpers_from_tests = {
            "tests/core/helpers.test.mjs": "import { tool } from '../support/tool.mjs';\n",
            "tests/tools/test_helpers.py": "from tests.support import shared\n",
        }
        for sources in (same_part, listed_part, helpers_from_tests):
            self.assertEqual(control_failures(sources), [], sources)
        code_importing_helpers = {"scripts/build.mjs":
                                  "import { tool } from '../tests/support/tool.mjs';\n"}
        self.assertEqual(control_failures(code_importing_helpers), [
            "scripts/build.mjs:1 imports '../tests/support/tool.mjs' (tests/support/tool.mjs): "
            "the part tools does not list the part test-helpers in Depends on"])
        backward = {"src/core/rules.ts": "import s from '../view/screen.js';\n"}
        self.assertEqual(len(control_failures(backward)), 1)
        self.assertEqual(control_failures(backward, accepted={("core", "view")}), [])
        self.assertEqual(len(control_failures(backward, accepted={("view", "core")})), 1)
        unclaimed = {"tests/core/new.test.mjs": "import a from '../../src/core/rules.js';\n"}
        self.assertEqual(
            control_failures(unclaimed, owners={"tests/core/new.test.mjs": UNSPECIFIED}), [
                "tests/core/new.test.mjs:1 imports '../../src/core/rules.js' (src/core/rules.ts): "
                "tests/core/new.test.mjs belongs to no part of the part map"])

    def test_control_the_map_and_the_invariants_give_the_dependencies_and_the_accepted(self):
        # invariant: cross-part-imports
        invariants = (
            "# Invariants\n\n## core-leans-on-view\n\nThe part `core` does not depend on\n"
            "`view`.\n\n- **Method:** test\n- **Violated:** yes\n\n"
            "## view-leans-on-core\n\nThe part `view` does not depend on `core`.\n\n"
            "- **Method:** test\n- **Violated:** no\n\n"
            "## other\n\nNo file of the part `view` imports a file of `core`.\n\n"
            "- **Violated:** yes\n\n## Withdrawn identifiers\n\n| Identifier | Why |\n")
        self.assertEqual(accepted_pairs(invariants), {("core", "view")})
        part_map = ("# Part map\n\n## core\n\nSentence.\n\n- **Files:** src/core/**\n"
                    "- **Depends on:** none\n- **Trust boundary:** none\n\n## view\n\n"
                    "Sentence.\n\n- **Files:** src/view/**\n- **Depends on:** core · tools\n"
                    "- **Trust boundary:** none\n\n## External context\n\n| Partner |\n")
        self.assertEqual(part_dependencies(part_map), {"core": set(), "view": {"core", "tools"}})

    def test_control_a_python_import_is_read_from_the_code_and_the_directories_it_adds(self):
        # invariant: cross-part-imports
        sources = {
            "tests/core/test_ok.py":
                "import os\nimport json, unittest\nfrom tests.support import shared\n"
                "from tests.tools import test_build\nimport tests.tools.test_build\n"
                "from tests.tools.test_build import *\n",
            "tests/tools/test_build.py":
                "import sys\nimport os\nsys.path.insert(\n    0, os.path.join(os.path.dirname("
                "os.path.abspath(__file__)), '..', 'core'))\nimport test_rules\n",
            "tests/core/test_text.py":
                "TEXT = '''\nimport tests.tools.test_build\n'''\n"
                "# import tests.tools.test_build\nNAME = 'from tests.tools import test_build'\n",
        }
        self.assertEqual(control_failures(sources), [
            "tests/core/test_ok.py:4 imports 'tests.tools' (tests/tools/test_build.py): the part "
            "core does not list the part tools in Depends on",
            "tests/core/test_ok.py:5 imports 'tests.tools.test_build' (tests/tools/test_build.py)"
            ": the part core does not list the part tools in Depends on",
            "tests/core/test_ok.py:6 imports 'tests.tools.test_build' (tests/tools/test_build.py)"
            ": the part core does not list the part tools in Depends on",
            "tests/tools/test_build.py:5 imports 'test_rules' (tests/core/test_rules.py): the "
            "part tools does not list the part core in Depends on"])

    def test_control_a_directory_added_to_sys_path_is_written_out_of_the_file(self):
        # invariant: cross-part-imports
        expressions = [
            "str(Path(__file__).resolve().parents[1] / 'core')",
            "str(ROOT / 'tests' / 'core')",
            "os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'core')",
        ]
        for expression in expressions:
            text = ("import sys\nfrom pathlib import Path\nimport os\n"
                    "ROOT = Path(__file__).resolve().parents[2]\n"
                    f"sys.path.append({expression})\nimport test_rules\n")
            failures = control_failures({"tests/tools/test_path.py": text})
            self.assertEqual(len(failures), 1, expression)
            self.assertIn("tests/tools/test_path.py:6 imports 'test_rules'", failures[0])
        runtime = ("import sys\ndef add(path):\n    sys.path[:0] = [str(path.parent)]\n"
                   "import test_rules\n")
        self.assertEqual(control_failures({"tests/tools/test_runtime.py": runtime}), [])


if __name__ == "__main__":
    unittest.main()
