"""Invariant application-build-output: Building the application compiles both the browser and the
server TypeScript configurations and bundles the browser's code into the file the page loads.

Building the application is `npm run build`, as README.md gives it. Each run happens in a fresh
temporary copy of the working tree, which holds no `dist` (git ignores it, so the copy leaves it
out); the real tree is never written. The two configurations, their source and their output
directories are written out below as literals, not read from the configurations at run time. The
browser configuration's source is `src/browser` without `src/browser/kitchen-sink/`, the sources
of the kitchen-sink page, which `tsconfig.browser.json` excludes and a configuration of their own
compiles outside the application's build (D-45).

Covers:
- on the unchanged copy, `npm run build` exits 0 and, for each configuration, emits a JavaScript
  file for every TypeScript file of its source, at the same relative path below its output
  directory, which `node --check` accepts;
- made-up `.tsx` source written out below, with JSX, is compiled by `npm run build` into a
  JavaScript file at the same relative path below `dist/browser` (the marker kept, the JSX gone,
  `node --check` accepting it), and `npm run typecheck` fails, naming the file and TypeScript's
  `TS2322`, on made-up `.tsx` source that holds a type error;
- made-up source written out below, one file per configuration, that compiles only under that
  configuration's own settings — the browser file uses a DOM type and `document`, the server
  file uses Node's `process` — is compiled by `npm run build` into that configuration's output
  directory as JavaScript (the marker string kept, the TypeScript-only `interface` gone,
  `node --check` accepting it);
- the configurations stay apart: `npm run build` fails when the browser source uses Node's
  `process` (the browser configuration loads no Node.js types), and when the server source uses
  `document` (the server configuration has no DOM library); each failed build's output must
  name the probe file placed and TypeScript's `Cannot find name '<name>'` for each name the
  configuration lacks, so that a failure for another reason does not count;
- the bundle: with made-up browser source written out below, which `main.ts` imports and which
  imports React's packages, the built page's one script is the one JavaScript file of `dist/public`
  and joins that code: it holds the probe's marker and React, imports nothing and leaves no
  `process.env`, which a browser does not have (the file the page loads);
- a build starts from neither `dist/public` nor `dist/browser`: a module left in either by an
  earlier build is gone after `npm run build`, and `npm run typecheck` leaves both alone (D-266).

Does NOT cover: what the compiled code does when run; files the build copies rather than compiles
(the HTML page); that the bundle is minified or which language level it targets, which are choices
and no behaviour; a configuration other than the two named; the kitchen-sink page's sources,
left out of the browser's source here, and whether the build leaves them out of its output
(application-build-kitchen-sink); whether the build's output is up to date with sources changed
after it ran.
"""

import os
import re
import shutil
import unittest

import loop2_invariant_support as support

# (name, configuration file, source directory, output directory), as the repository gives them.
CONFIGURATIONS = (
    ("browser", "tsconfig.browser.json", "src/browser", "dist/browser"),
    ("server", "tsconfig.server.json", "src/server", "dist/server"),
)
# Directories of a configuration's source directory that are not its source: the kitchen-sink
# page's sources, which tsconfig.browser.json excludes (D-45).
LEFT_OUT = {"browser": ("src/browser/kitchen-sink/",), "server": ()}
EMITTED_EXTENSION = {".ts": ".js", ".mts": ".mjs", ".cts": ".cjs", ".tsx": ".js"}

PROBE_NAME = "invariant_check_build_probe"

# Made-up source that compiles under the browser configuration only: a DOM type and `document`.
BROWSER_PROBE = (
    "// Written by the invariant check application-build-output.\n"
    "interface InvariantCheckBrowserProbeShape {\n"
    "  readonly marker: string;\n"
    "  readonly root: HTMLElement | null;\n"
    "}\n"
    "export function invariantCheckBrowserProbe(): InvariantCheckBrowserProbeShape {\n"
    "  return { marker: \"application-build-output-browser-probe\", "
    "root: document.querySelector<HTMLElement>(\"main\") };\n"
    "}\n"
)
BROWSER_MARKER = "application-build-output-browser-probe"

# Made-up source with JSX, which compiles only in a `.tsx` file, under the browser configuration.
TSX_PROBE = (
    "// Written by the invariant check application-build-output.\n"
    "export const invariantCheckTsxProbe = "
    "<p>application-build-output-tsx-probe</p>;\n"
)
TSX_MARKER = "application-build-output-tsx-probe"
# Made-up `.tsx` source with a type error: a string where a number is declared.
TSX_TYPE_ERROR = (
    "// Written by the invariant check application-build-output.\n"
    "export const invariantCheckTsxTypeError: number = \"not a number\";\n"
)

# Made-up source that compiles under the server configuration only: Node's `process`.
SERVER_PROBE = (
    "// Written by the invariant check application-build-output.\n"
    "interface InvariantCheckServerProbeShape {\n"
    "  readonly marker: string;\n"
    "  readonly variable: string | undefined;\n"
    "}\n"
    "export function invariantCheckServerProbe(): InvariantCheckServerProbeShape {\n"
    "  return { marker: \"application-build-output-server-probe\", "
    "variable: process.env.LOOP2_INVARIANT_CHECK };\n"
    "}\n"
)
SERVER_MARKER = "application-build-output-server-probe"

# Made-up source for the bundle: code main.ts reaches only through an import, which reaches React's
# packages in turn, so the file the page loads can hold them only if the build joined them.
BUNDLE_PROBE = (
    "// Written by the invariant check application-build-output.\n"
    "import { createElement } from \"react\";\n"
    "import { createRoot } from \"react-dom/client\";\n"
    "createRoot(document.createElement(\"main\")).render(\n"
    "  createElement(\"p\", null, \"application-build-output-bundle-probe\"),\n"
    ");\n"
)
BUNDLE_MARKER = "application-build-output-bundle-probe"
# A global name react-dom's own code uses: it stands in the file only if React was joined into it.
REACT_MARKER = "__REACT_DEVTOOLS_GLOBAL_HOOK__"
SERVED_DIRECTORY = "dist/public"
BUILT_PAGE = "dist/public/index.html"
# The script the built page loads, root-relative as src/browser/index.html writes it.
PAGE_SCRIPT = re.compile(r"""<script\b[^>]*\bsrc\s*=\s*["']/([^"']+)["']""")
# A module specifier left in JavaScript, minified or not: `from"x"`, `import"x"`, `import("x")`.
MODULE_SPECIFIER = re.compile(r"""(?:\bfrom\s*|\bimport\s*\(?\s*)["']([^"']+)["']""")

PROBES = {"browser": (BROWSER_PROBE, BROWSER_MARKER), "server": (SERVER_PROBE, SERVER_MARKER)}
# Where each probe is placed to cross the configurations: the browser probe into the server's
# source and the server probe into the browser's.
CROSSED = {"browser": SERVER_PROBE, "server": BROWSER_PROBE}

TYPESCRIPT_ONLY = "interface InvariantCheck"

# What the failed build must name for each crossing, so that the failure is the one meant: the
# probe file placed into the configuration's source, and TypeScript's report of each name that
# configuration does not give it.
CROSSED_FAILURE = {
    "browser": ("src/browser/invariant_check_build_probe.ts",
                ("Cannot find name 'process'",)),
    "server": ("src/server/invariant_check_build_probe.ts",
               ("Cannot find name 'HTMLElement'", "Cannot find name 'document'")),
}
ANSI_ESCAPE = re.compile(r"\x1b\[[0-9;]*m")


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def configuration(name):
    return next(c for c in CONFIGURATIONS if c[0] == name)


def write_probe(copy, source_directory, text, extension=".ts"):
    relative = f"{source_directory}/{PROBE_NAME}{extension}"
    with open(copy.file(relative), "w", encoding="utf-8", newline="\n") as handle:
        handle.write(text)
    return relative


def emitted_path(relative_source, source_directory, output_directory):
    stem, extension = os.path.splitext(relative_source[len(source_directory) + 1:])
    return f"{output_directory}/{stem}{EMITTED_EXTENSION[extension]}"


class BuildCompilesBothConfigurations(unittest.TestCase):

    def setUp(self):
        self.copies = []

    def tearDown(self):
        for copy in self.copies:
            copy.remove()

    def fresh_copy(self):
        copy = support.TreeCopy()
        self.copies.append(copy)
        self.assertFalse(os.path.exists(copy.file("dist")),
                         "the fresh copy already holds dist, so its output would prove nothing")
        for _name, config_file, _source, _output in CONFIGURATIONS:
            self.assertTrue(os.path.isfile(copy.file(config_file)),
                            f"the working tree holds no {config_file}")
        return copy

    def assert_javascript(self, copy, relative):
        self.assertTrue(os.path.isfile(copy.file(relative)), f"the build emitted no {relative}")
        code, output = support.run([node(), "--check", copy.file(relative)], copy.path)
        self.assertEqual(code, 0, f"`node --check` rejects {relative}:\n{output}")

    def test_build_emits_every_source_file_of_both_configurations(self):
        # invariant: application-build-output
        # invariant: application-build-layout
        copy = self.fresh_copy()
        code, output = copy.npm("run", "build")
        self.assertEqual(code, 0, f"`npm run build` fails on the unchanged tree:\n{output}")
        for name, _config, source, out in CONFIGURATIONS:
            sources = [p for p in support.files_under(source, copy.path)
                       if p.endswith(tuple(EMITTED_EXTENSION)) and not p.endswith(".d.ts")
                       and not p.startswith(LEFT_OUT[name])]
            with self.subTest(configuration=name):
                self.assertTrue(sources, f"{source} holds no TypeScript file")
                for relative in sources:
                    self.assert_javascript(copy, emitted_path(relative, source, out))

    def test_build_compiles_made_up_source_under_each_configuration(self):
        # invariant: application-build-output
        # invariant: application-build-layout
        copy = self.fresh_copy()
        for name, (text, _marker) in PROBES.items():
            write_probe(copy, configuration(name)[2], text)
        code, output = copy.npm("run", "build")
        self.assertEqual(code, 0, f"`npm run build` fails with the probes, which each compile "
                                  f"under their own configuration:\n{output}")
        for name, (_text, marker) in PROBES.items():
            _name, _config, source, out = configuration(name)
            emitted = f"{out}/{PROBE_NAME}.js"
            with self.subTest(configuration=name):
                self.assert_javascript(copy, emitted)
                text = support.read_text(copy.file(emitted))
                self.assertIn(marker, text, f"{emitted} does not hold the probe's marker")
                self.assertNotIn(TYPESCRIPT_ONLY, text,
                                 f"{emitted} still holds TypeScript, so it was not compiled")

    def test_build_compiles_made_up_tsx_source_into_javascript(self):
        # invariant: application-build-output
        copy = self.fresh_copy()
        placed = write_probe(copy, "src/browser", TSX_PROBE, ".tsx")
        code, output = copy.npm("run", "build")
        self.assertEqual(code, 0, f"`npm run build` fails with {placed}, which compiles under "
                                  f"the browser configuration:\n{output}")
        emitted = emitted_path(placed, "src/browser", "dist/browser")
        self.assertEqual(emitted, f"dist/browser/{PROBE_NAME}.js")
        self.assert_javascript(copy, emitted)
        text = support.read_text(copy.file(emitted))
        self.assertIn(TSX_MARKER, text, f"{emitted} does not hold the probe's marker")
        self.assertNotIn("<p>", text, f"{emitted} still holds JSX, so it was not compiled")

    def test_typecheck_fails_on_a_type_error_in_a_tsx_file(self):
        # invariant: application-build-output
        copy = self.fresh_copy()
        placed = write_probe(copy, "src/browser", TSX_TYPE_ERROR, ".tsx")
        code, output = copy.npm("run", "typecheck")
        self.assertNotEqual(code, 0, f"`npm run typecheck` exits 0 although {placed} holds a "
                                     f"type error:\n{output}")
        plain = ANSI_ESCAPE.sub("", output).replace("\\", "/")
        self.assertIn(placed, plain, f"the failed check does not name {placed}, so it may have "
                                     f"failed for another reason:\n{output}")
        self.assertIn("TS2322", plain,
                      f"the failed check does not report the type error:\n{output}")

    def test_each_configuration_rejects_source_only_the_other_accepts(self):
        # invariant: application-build-output
        for name, crossed_text in CROSSED.items():
            source = configuration(name)[2]
            with self.subTest(configuration=name):
                copy = self.fresh_copy()
                placed = write_probe(copy, source, crossed_text)
                code, output = copy.npm("run", "build")
                self.assertNotEqual(code, 0, f"`npm run build` exits 0 although {placed} uses "
                                             f"what the {name} configuration does not give "
                                             f"it:\n{output}")
                plain = ANSI_ESCAPE.sub("", output).replace("\\", "/")
                expected_file, missing_names = CROSSED_FAILURE[name]
                self.assertIn(expected_file, plain,
                              f"the failed build does not name {expected_file}, so it may have "
                              f"failed for another reason:\n{output}")
                for missing in missing_names:
                    self.assertIn(missing, plain,
                                  f"the failed build does not report {missing!r}, so it may "
                                  f"have failed for another reason:\n{output}")

    def test_the_page_loads_one_file_that_joins_the_browsers_code(self):
        # invariant: application-build-output
        copy = self.fresh_copy()
        write_probe(copy, "src/browser", BUNDLE_PROBE)
        with open(copy.file("src/browser/main.ts"), "a", encoding="utf-8", newline="\n") as handle:
            handle.write(f'import "./{PROBE_NAME}.js";\n')
        code, output = copy.npm("run", "build")
        self.assertEqual(code, 0, f"`npm run build` fails with a module that imports React, "
                                  f"which the browser's code may do:\n{output}")
        scripts = PAGE_SCRIPT.findall(support.read_text(copy.file(BUILT_PAGE)))
        self.assertEqual(scripts, ["main.js"], f"{BUILT_PAGE} does not load the one script")
        loaded = f"{SERVED_DIRECTORY}/{scripts[0]}"
        text = support.read_text(copy.file(loaded))
        self.assertEqual(MODULE_SPECIFIER.findall(text), [],
                         f"{loaded} imports other files, so it is not a bundle")
        self.assertIn(BUNDLE_MARKER, text, f"{loaded} does not hold code main.ts imports")
        self.assertIn(REACT_MARKER, text, f"{loaded} does not hold the React that code imports")
        self.assertNotIn("process.env", text, f"{loaded} reads what a browser does not have")
        served = [p for p in support.files_under(SERVED_DIRECTORY, copy.path)
                  if p.endswith((".js", ".mjs", ".cjs"))]
        self.assertEqual(served, [loaded], f"{SERVED_DIRECTORY} hands out JavaScript no page loads")

    def test_a_build_leaves_nothing_of_an_earlier_build(self):
        # D-266: a module left by an earlier build would be served or imported silently.
        copy = self.fresh_copy()
        left_over = [f"{directory}/{PROBE_NAME}.js"
                     for directory in (SERVED_DIRECTORY, "dist/browser")]
        for relative in left_over:
            os.makedirs(os.path.dirname(copy.file(relative)), exist_ok=True)
            with open(copy.file(relative), "w", encoding="utf-8", newline="\n") as handle:
                handle.write("export {};\n")
        code, output = copy.npm("run", "typecheck")
        self.assertEqual(code, 0, f"`npm run typecheck` fails on the unchanged tree:\n{output}")
        for relative in left_over:
            with self.subTest(after="typecheck", file=relative):
                self.assertTrue(os.path.isfile(copy.file(relative)),
                                f"`npm run typecheck`, which writes nothing, removed {relative}")
        code, output = copy.npm("run", "build")
        self.assertEqual(code, 0, f"`npm run build` fails on the unchanged tree:\n{output}")
        for relative in left_over:
            with self.subTest(after="build", file=relative):
                self.assertFalse(os.path.exists(copy.file(relative)),
                                 f"`npm run build` left {relative} of an earlier build")


if __name__ == "__main__":
    unittest.main()
