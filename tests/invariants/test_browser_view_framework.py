"""Invariant browser-view-framework/1: The browser view uses TypeScript and browser APIs to render
its screens, with no UI framework in its code or runtime dependencies.

Covers, in the working tree being checked:
- the browser view's source (`src/browser`, as README.md places it) holds TypeScript files and no
  code file of another language or template format (.js, .jsx, .tsx, .vue, .svelte, ...);
- its browser compilation names the libraries it compiles against and they include the DOM:
  tsconfig.browser.json `compilerOptions.lib` must be present and hold `DOM` (any case) — an
  absent `lib` fails, since the check then cannot see what the compilation is told about;
- its source uses a browser API to render: in at least one of its TypeScript files, with comments
  removed and the text of string and template literals emptied, `document.` is followed by one of
  the DOM members DOM_RENDERING_MEMBERS lists below (creating, finding or inserting elements);
- no UI framework from the list below is a runtime dependency — in package.json `dependencies` or
  in any package-lock.json entry not marked `dev` — or is imported or loaded by the browser
  source, by package name or by URL;
- what `npm run build` places in `dist/public` imports only its own files (relative or
  root-relative specifiers, no bare package and no URL), loads no script from another origin, and
  holds none of the global markers the listed frameworks leave in their built code.

Does NOT cover: a UI framework absent from the list; a framework copied into the source under
another name that leaves none of the listed markers; whether the page renders correctly in a
browser (no browser runs in this check); code inside `${...}` of a template literal, which is
emptied with the literal. A `.tsx` file counts as a framework's format (JSX), not
as TypeScript the sentence allows.
"""

import json
import os
import re
import unittest

import loop2_invariant_support as support

BROWSER_SOURCE = "src/browser"
BUILT_PAGE = "dist/public"

# UI frameworks and component libraries, as npm package names.
UI_FRAMEWORKS = (
    "react", "react-dom", "preact", "vue", "@vue/runtime-dom", "@vue/runtime-core", "svelte",
    "@sveltejs/kit", "solid-js", "@angular/core", "@angular/platform-browser", "lit", "lit-html",
    "lit-element", "@lit/reactive-element", "mithril", "inferno", "hyperapp", "alpinejs",
    "htmx.org", "ember-source", "@builder.io/qwik", "@stencil/core", "backbone", "knockout",
    "riot", "marko", "petite-vue", "@preact/signals", "next", "nuxt", "@remix-run/react",
    "astro", "uhtml", "hyperhtml", "million", "van", "vanjs-core", "@hotwired/stimulus",
    "@hotwired/turbo", "aurelia", "@aurelia/runtime-html", "cycle", "@cycle/dom", "elm",
)
# Global names the listed frameworks leave in their built code.
FRAMEWORK_MARKERS = (
    "__REACT_DEVTOOLS_GLOBAL_HOOK__", "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",
    "__VUE_PROD_DEVTOOLS__", "__VUE_OPTIONS_API__", "__PREACT_DEVTOOLS__", "ngDevMode",
    "litHtmlVersions", "litElementVersions", "reactiveElementVersions", "__svelte",
    "_$HY", "Alpine.start", "htmx.config",
)
# Code formats other than TypeScript.
FOREIGN_CODE_EXTENSIONS = (
    ".js", ".mjs", ".cjs", ".jsx", ".tsx", ".vue", ".svelte", ".astro", ".marko", ".riot",
    ".coffee", ".elm", ".dart", ".hbs", ".handlebars", ".ejs", ".pug", ".njk",
)
TYPESCRIPT_EXTENSIONS = (".ts", ".mts", ".cts")
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
    r"""(?:\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*|\bimport\s+)["']([^"']+)["']""")
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


class BrowserSourceIsTypeScript(unittest.TestCase):

    def test_browser_source_holds_typescript_and_no_other_code(self):
        # invariant: browser-view-framework/1
        files = support.files_under(BROWSER_SOURCE, support.ROOT)
        typescript = [p for p in files if p.endswith(TYPESCRIPT_EXTENSIONS)]
        self.assertTrue(typescript, f"{BROWSER_SOURCE} holds no TypeScript file")
        foreign = [p for p in files if p.lower().endswith(FOREIGN_CODE_EXTENSIONS)]
        self.assertEqual(foreign, [])

    def test_browser_compilation_declares_the_dom_library(self):
        # invariant: browser-view-framework/1
        libraries = load_json("tsconfig.browser.json").get("compilerOptions", {}).get("lib")
        self.assertIsNotNone(libraries, "tsconfig.browser.json sets no compilerOptions.lib")
        self.assertIn("dom", [str(x).lower() for x in libraries],
                      f"tsconfig.browser.json lib is {libraries!r}, without DOM")

    def test_browser_source_renders_through_document_in_code(self):
        # invariant: browser-view-framework/1
        rendering = [p for p, text in text_files(BROWSER_SOURCE, support.ROOT)
                     if p.endswith(TYPESCRIPT_EXTENSIONS)
                     and DOM_RENDERING_CALL.search(code_only(text))]
        self.assertTrue(rendering, f"no TypeScript file of {BROWSER_SOURCE} uses one of "
                                   f"{DOM_RENDERING_MEMBERS} on document outside comments "
                                   "and strings")


class NoUiFramework(unittest.TestCase):

    def test_no_ui_framework_in_runtime_dependencies(self):
        # invariant: browser-view-framework/1
        declared = set(load_json("package.json").get("dependencies", {}))
        self.assertEqual(sorted(declared & set(UI_FRAMEWORKS)), [])
        locked = set()
        for key, entry in load_json("package-lock.json").get("packages", {}).items():
            if key and not entry.get("dev", False):
                locked.add(key.rsplit("node_modules/", 1)[-1])
        self.assertEqual(sorted(locked & set(UI_FRAMEWORKS)), [],
                         "package-lock.json holds a UI framework outside development")

    def test_browser_source_imports_no_ui_framework(self):
        # invariant: browser-view-framework/1
        found = []
        for relative, text in text_files(BROWSER_SOURCE, support.ROOT):
            for specifier in IMPORT_SPECIFIER.findall(text) + SCRIPT_SOURCE.findall(text):
                hit = names_in(specifier) & set(UI_FRAMEWORKS)
                if hit:
                    found.append((relative, specifier))
            found += [(relative, m) for m in FRAMEWORK_MARKERS if m in text]
        self.assertEqual(found, [])

    def test_built_page_loads_only_its_own_code_and_no_framework(self):
        # invariant: browser-view-framework/1
        copy = support.built_copy()
        built = list(text_files(BUILT_PAGE, copy.path))
        self.assertTrue([p for p, _ in built if p.endswith((".js", ".mjs"))],
                        f"`npm run build` places no JavaScript in {BUILT_PAGE}")
        self.assertTrue([p for p, _ in built if p.endswith((".html", ".htm"))],
                        f"`npm run build` places no HTML in {BUILT_PAGE}")
        problems = []
        for relative, text in built:
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
        self.assertEqual(problems, [])


if __name__ == "__main__":
    unittest.main()
