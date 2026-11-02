"""Invariant browser-view-framework: The browser view renders its screens with React and browser
APIs, with no other UI framework in its code or runtime dependencies.

Covers, in the working tree being checked:
- the browser view's source (`src/browser`, as README.md places it) holds TypeScript files (.ts,
  .mts, .cts, .tsx) and no code file of another language or template format (.js, .jsx, .vue,
  .svelte, ...);
- its browser compilation names the libraries it compiles against and they include the DOM:
  tsconfig.browser.json `compilerOptions.lib` must be present and hold `DOM` (any case) — an
  absent `lib` fails, since the check then cannot see what the compilation is told about;
- its source uses a browser API to render: in at least one of its TypeScript files, with comments
  removed and the text of string and template literals emptied, `document.` is followed by one of
  the DOM members DOM_RENDERING_MEMBERS lists below (creating, finding or inserting elements);
- no UI framework from the list below (React is not on it) is a runtime dependency — in
  package.json `dependencies`, in what an `npm:` alias there installs, or in any package-lock.json
  entry not marked `dev`, by its key and by its `name` — or is imported or loaded by the browser
  source, by package name or by URL; nor is a library built on React: a package-lock.json entry
  not marked `dev`, other than react and react-dom, whose `peerDependencies` name react, as a
  runtime dependency or as an import of the browser source;
- what `npm run build` places in `dist/public` imports only its own files (relative or
  root-relative specifiers, no bare package and no URL), also in the minified form `import"x"`
  of the bundle, loads no script from another origin, and
  holds none of the global markers the listed frameworks leave in their built code (React's
  markers are not among them: the bundle holds React).

Does NOT cover: a UI framework absent from the list; a library built on React that declares no
peer dependency on react in the lock file; a framework copied into the source under
another name that leaves none of the listed markers; whether the page renders correctly in a
browser (no browser runs in this check); code inside `${...}` of a template literal, which is
emptied with the literal.
"""

import json
import os
import re
import unittest

import loop2_invariant_support as support

BROWSER_SOURCE = "src/browser"
BUILT_PAGE = "dist/public"

# UI frameworks other than React, as npm package names. A library built on React is not named
# here: refused_names() finds it in the lock file by its peer dependency on react.
UI_FRAMEWORKS = (
    "preact", "vue", "@vue/runtime-dom", "@vue/runtime-core", "svelte",
    "@sveltejs/kit", "solid-js", "@angular/core", "@angular/platform-browser", "lit", "lit-html",
    "lit-element", "@lit/reactive-element", "mithril", "inferno", "hyperapp", "alpinejs",
    "htmx.org", "ember-source", "@builder.io/qwik", "@stencil/core", "backbone", "knockout",
    "riot", "marko", "petite-vue", "@preact/signals", "next", "nuxt", "@remix-run/react",
    "astro", "uhtml", "hyperhtml", "million", "van", "vanjs-core", "@hotwired/stimulus",
    "@hotwired/turbo", "aurelia", "@aurelia/runtime-html", "cycle", "@cycle/dom", "elm",
)
# React itself, which the view is built with.
REACT_ITSELF = ("react", "react-dom")
# Global names the listed frameworks leave in their built code.
FRAMEWORK_MARKERS = (
    "__VUE_PROD_DEVTOOLS__", "__VUE_OPTIONS_API__", "__PREACT_DEVTOOLS__", "ngDevMode",
    "litHtmlVersions", "litElementVersions", "reactiveElementVersions", "__svelte",
    "_$HY", "Alpine.start", "htmx.config",
)
# Code formats other than TypeScript.
FOREIGN_CODE_EXTENSIONS = (
    ".js", ".mjs", ".cjs", ".jsx", ".vue", ".svelte", ".astro", ".marko", ".riot",
    ".coffee", ".elm", ".dart", ".hbs", ".handlebars", ".ejs", ".pug", ".njk",
)
TYPESCRIPT_EXTENSIONS = (".ts", ".mts", ".cts", ".tsx")
TEXT_EXTENSIONS = (".ts", ".mts", ".cts", ".js", ".mjs", ".cjs", ".html", ".htm", ".css",
                   ".json", ".svg", ".jsx", ".tsx", ".vue", ".svelte")

# Members of `document` that create, find or insert elements: the browser API rendering uses.
DOM_RENDERING_MEMBERS = (
    "createElement", "createElementNS", "createTextNode", "createDocumentFragment",
    "getElementById", "getElementsByClassName", "getElementsByTagName", "querySelector",
    "querySelectorAll", "append", "prepend",
    "replaceChildren", "adoptNode", "importNode",
)
DOM_RENDERING_CALL = re.compile(
    r"\bdocument\s*\.\s*(?:" + "|".join(DOM_RENDERING_MEMBERS) + r")\b")

IMPORT_SPECIFIER = re.compile(
    r"""(?:\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*|\bimport\s*)["']([^"']+)["']""")
SCRIPT_SOURCE = re.compile(r"""<script\b[^>]*\bsrc\s*=\s*["']?([^"'\s>]+)""", re.IGNORECASE)


def load_json(relative):
    with open(os.path.join(support.ROOT, relative), encoding="utf-8") as handle:
        return json.load(handle)


def names_in(specifier):
    """Package names a specifier or URL may name: a bare specifier's package, or each path
    segment (and scoped pair) of a URL with any @version stripped."""
    if re.match(r"^(?:[a-z]+:)?//", specifier, re.IGNORECASE):
        path = re.sub(r"^(?:[a-z]+:)?//[^/]*", "", specifier, flags=re.IGNORECASE)
        segments = [re.sub(r"@[^/@]*$", "", s) for s in path.split("?")[0].split("/") if s]
        segments = [s for s in segments if s]
        names = set(segments)
        names |= {f"{a}/{b}" for a, b in zip(segments, segments[1:]) if a.startswith("@")}
        names |= {re.sub(r"(\.min)?\.m?js$", "", s) for s in segments}
        return names
    if specifier.startswith((".", "/")):
        return set()
    if specifier.startswith("@"):
        return {"/".join(specifier.split("/")[:2])}
    return {specifier.split("/")[0]}


def alias_target(version):
    """The package an `npm:name@range` alias of package.json really installs, else None."""
    if not version.startswith("npm:"):
        return None
    target = version[4:]
    at = target.rfind("@")
    return target[:at] if at > 0 else target


def runtime_names(manifest, lock):
    """Every package name that is a runtime dependency: the keys of `dependencies` and what an
    alias there installs, and each lock entry not marked `dev` by its key and by its `name`
    (an aliased entry such as `node_modules/react` holds the real name there)."""
    names = set()
    for key, version in manifest.get("dependencies", {}).items():
        names.add(key)
        target = alias_target(str(version))
        if target:
            names.add(target)
    for key, entry in lock.get("packages", {}).items():
        if key and not entry.get("dev", False):
            names.add(key.rsplit("node_modules/", 1)[-1])
            if entry.get("name"):
                names.add(entry["name"])
    return names


def react_libraries(lock):
    """Libraries built on React that are runtime dependencies: each lock entry not marked `dev`,
    other than react and react-dom, whose `peerDependencies` name react."""
    found = set()
    for key, entry in lock.get("packages", {}).items():
        name = entry.get("name") or key.rsplit("node_modules/", 1)[-1]
        if (key and not entry.get("dev", False) and name not in REACT_ITSELF
                and "react" in entry.get("peerDependencies", {})):
            found.add(name)
    return found


def refused_names(lock):
    """The package names the guard refuses: the listed frameworks and the libraries built on React
    that the lock holds."""
    return set(UI_FRAMEWORKS) | react_libraries(lock)


def code_only(text):
    """TypeScript text with comments removed and the text of string and template literals
    emptied, so that a word there is not read as code."""
    out, i, n = [], 0, len(text)
    while i < n:
        c = text[i]
        if text.startswith("//", i):
            end = text.find("\n", i)
            i = n if end < 0 else end
        elif text.startswith("/*", i):
            end = text.find("*/", i + 2)
            i = n if end < 0 else end + 2
            out.append(" ")
        elif c in "'\"`":
            j = i + 1
            while j < n and text[j] != c:
                j += 2 if text[j] == "\\" else 1
            out.append(c + c)
            i = j + 1
        else:
            out.append(c)
            i += 1
    return "".join(out)


def text_files(directory, root):
    for relative in support.files_under(directory, root):
        if relative.lower().endswith(TEXT_EXTENSIONS):
            yield relative, support.read_text(os.path.join(root, *relative.split("/")))


def built_file_problems(relative, text):
    """What a file of the built output does that the guard refuses, as (file, problem)."""
    problems = []
    # An HTML script source is a URL: its own when it names no scheme and no host.
    for source in SCRIPT_SOURCE.findall(text):
        if re.match(r"^(?:[a-z][a-z0-9+.-]*:|//)", source, re.IGNORECASE):
            problems.append((relative, "loads script " + source))
    # A module specifier is its own only when relative or root-relative; a bare one
    # names a package. Inline module scripts of an HTML file are read the same way.
    if relative.endswith((".js", ".mjs", ".html", ".htm")):
        for specifier in IMPORT_SPECIFIER.findall(text):
            own = specifier.startswith(("./", "../")) or (
                specifier.startswith("/") and not specifier.startswith("//"))
            if not own:
                problems.append((relative, "imports " + specifier))
    problems += [(relative, "holds marker " + m) for m in FRAMEWORK_MARKERS if m in text]
    return problems


class BrowserSourceIsTypeScript(unittest.TestCase):

    def test_browser_source_holds_typescript_and_no_other_code(self):
        # invariant: browser-view-framework
        files = support.files_under(BROWSER_SOURCE, support.ROOT)
        typescript = [p for p in files if p.endswith(TYPESCRIPT_EXTENSIONS)]
        self.assertTrue(typescript, f"{BROWSER_SOURCE} holds no TypeScript file")
        foreign = [p for p in files if p.lower().endswith(FOREIGN_CODE_EXTENSIONS)]
        self.assertEqual(foreign, [])

    def test_browser_compilation_declares_the_dom_library(self):
        # invariant: browser-view-framework
        libraries = load_json("tsconfig.browser.json").get("compilerOptions", {}).get("lib")
        self.assertIsNotNone(libraries, "tsconfig.browser.json sets no compilerOptions.lib")
        self.assertIn("dom", [str(x).lower() for x in libraries],
                      f"tsconfig.browser.json lib is {libraries!r}, without DOM")

    def test_browser_source_renders_through_document_in_code(self):
        # invariant: browser-view-framework
        rendering = [p for p, text in text_files(BROWSER_SOURCE, support.ROOT)
                     if p.endswith(TYPESCRIPT_EXTENSIONS)
                     and DOM_RENDERING_CALL.search(code_only(text))]
        self.assertTrue(rendering, f"no TypeScript file of {BROWSER_SOURCE} uses one of "
                                   f"{DOM_RENDERING_MEMBERS} on document outside comments "
                                   "and strings")


class NoUiFramework(unittest.TestCase):

    def test_no_ui_framework_in_runtime_dependencies(self):
        # invariant: browser-view-framework
        manifest, lock = load_json("package.json"), load_json("package-lock.json")
        self.assertEqual(sorted(runtime_names(manifest, lock) & refused_names(lock)), [],
                         "a UI framework or a library built on React is a runtime dependency")

    def test_browser_source_imports_no_ui_framework(self):
        # invariant: browser-view-framework
        found = []
        refused = refused_names(load_json("package-lock.json"))
        for relative, text in text_files(BROWSER_SOURCE, support.ROOT):
            for specifier in IMPORT_SPECIFIER.findall(text) + SCRIPT_SOURCE.findall(text):
                hit = names_in(specifier) & refused
                if hit:
                    found.append((relative, specifier))
            found += [(relative, m) for m in FRAMEWORK_MARKERS if m in text]
        self.assertEqual(found, [])

    def test_control_the_dependency_check_reads_what_an_entry_really_is(self):
        # invariant: browser-view-framework
        react = {"name": "loop2", "dependencies": {"react": "19.3.1", "react-dom": "19.3.1"}}
        lock = {"packages": {
            "": {"name": "loop2"},
            "node_modules/react": {"version": "19.3.1"},
            "node_modules/react-dom": {"peerDependencies": {"react": "^19.3.1"}},
            "node_modules/scheduler": {"version": "0.28.0"},
            "node_modules/@mui/material": {"dev": True, "peerDependencies": {"react": "^19"}},
        }}
        # The tree as it is: React, react-dom, scheduler, a development library on React.
        self.assertEqual(runtime_names(react, lock) & refused_names(lock), set())
        crafted = {
            "an alias in package.json to a listed framework": (
                {"dependencies": {"react": "npm:preact@10.0.0"}},
                {"packages": {"node_modules/react": {"version": "10.0.0"}}}),
            "an alias in package.json without a version": (
                {"dependencies": {"react": "npm:vue"}}, {"packages": {}}),
            "an alias in package.json to a scoped framework": (
                {"dependencies": {"react": "npm:@vue/runtime-dom@3.0.0"}}, {"packages": {}}),
            "a lock entry named after a listed framework": (
                {"dependencies": {"react": "19.3.1"}},
                {"packages": {"node_modules/react": {"name": "preact", "version": "10.0.0"}}}),
            "a nested lock entry named after a listed framework": (
                {"dependencies": {}},
                {"packages": {"node_modules/a/node_modules/x": {"name": "vue"}}}),
            "a component library on React": (
                {"dependencies": {"react": "19.3.1", "@mui/material": "7.0.0"}},
                {"packages": {"node_modules/@mui/material": {"peerDependencies": {"react": "^19"}}}}),
            "a component library on React that only the lock holds": (
                {"dependencies": {"react": "19.3.1"}},
                {"packages": {"node_modules/ui-kit": {"peerDependencies": {"react": "^19"}}}}),
        }
        for name, (manifest, crafted_lock) in crafted.items():
            with self.subTest(case=name):
                hit = runtime_names(manifest, crafted_lock) & refused_names(crafted_lock)
                self.assertNotEqual(hit, set())
        # A source import of a library on React found in the lock is refused.
        refused = refused_names(crafted["a component library on React"][1])
        self.assertEqual(names_in("@mui/material/Button") & refused, {"@mui/material"})

    def test_built_page_loads_only_its_own_code_and_no_framework(self):
        # invariant: browser-view-framework
        copy = support.built_copy()
        built = list(text_files(BUILT_PAGE, copy.path))
        self.assertTrue([p for p, _ in built if p.endswith((".js", ".mjs"))],
                        f"`npm run build` places no JavaScript in {BUILT_PAGE}")
        self.assertTrue([p for p, _ in built if p.endswith((".html", ".htm"))],
                        f"`npm run build` places no HTML in {BUILT_PAGE}")
        problems = []
        for relative, text in built:
            problems += built_file_problems(relative, text)
        self.assertEqual(problems, [])

    def test_control_the_built_file_check_reads_a_minified_bundle(self):
        # invariant: browser-view-framework
        # The bundle is minified: `import"x"` has no white space after `import`.
        minified = {
            "an import with no white space": 'var a=1;import"vue";a++;',
            "an export from a package": 'var a=1;export{a as b}from"preact";',
            "a dynamic import": 'var a=1;import("lit");a++;',
            "an import of a URL": 'var a=1;import"https://cdn.example/x.js";',
        }
        for name, text in minified.items():
            with self.subTest(case=name):
                self.assertNotEqual(built_file_problems("dist/public/main.js", text), [])
        own = 'var a=1;import"./chunk.js";import("/more.js");a++;'
        self.assertEqual(built_file_problems("dist/public/main.js", own), [])


if __name__ == "__main__":
    unittest.main()
