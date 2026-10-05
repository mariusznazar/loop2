"""Invariant application-build-output/1: Building the application compiles both the browser and the
server TypeScript configurations.

Building the application is `npm run build`, as README.md gives it. Each run happens in a fresh
temporary copy of the working tree, which holds no `dist` (git ignores it, so the copy leaves it
out); the real tree is never written. The two configurations, their source and their output
directories are written out below as literals, not read from the configurations at run time.

Covers:
- on the unchanged copy, `npm run build` exits 0 and, for each configuration, emits a JavaScript
  file for every TypeScript file of its source, at the same relative path below its output
  directory, which `node --check` accepts;
- made-up source written out below, one file per configuration, that compiles only under that
  configuration's own settings — the browser file uses a DOM type and `document`, the server
  file uses Node's `process` — is compiled by `npm run build` into that configuration's output
  directory as JavaScript (the marker string kept, the TypeScript-only `interface` gone,
  `node --check` accepting it);
- the configurations stay apart: `npm run build` fails when the browser source uses Node's
  `process` (the browser configuration loads no Node.js types), and when the server source uses
  `document` (the server configuration has no DOM library); each failed build's output must
  name the probe file placed and TypeScript's `Cannot find name '<name>'` for each name the
  configuration lacks, so that a failure for another reason does not count.

Does NOT cover: what the compiled code does when run; files the build copies rather than compiles
(the HTML page); a configuration other than the two named; whether the build's output is
up to date with sources changed after it ran.
"""

import os
import re
import shutil
import unittest

import loop2_invariant_support as support

# (name, configuration file, source directory, output directory), as the repository gives them.
CONFIGURATIONS = (
    ("browser", "tsconfig.browser.json", "src/browser", "dist/public"),
    ("server", "tsconfig.server.json", "src/server", "dist/server"),
)
EMITTED_EXTENSION = {".ts": ".js", ".mts": ".mjs", ".cts": ".cjs"}

PROBE_NAME = "invariant_check_build_probe"

# Made-up source that compiles under the browser configuration only: a DOM type and `document`.
BROWSER_PROBE = (
    "// Written by the invariant check application-build-output/1.\n"
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

# Made-up source that compiles under the server configuration only: Node's `process`.
SERVER_PROBE = (
    "// Written by the invariant check application-build-output/1.\n"
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


def write_probe(copy, source_directory, text):
    relative = f"{source_directory}/{PROBE_NAME}.ts"
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
        # invariant: application-build-output/1
        copy = self.fresh_copy()
        code, output = copy.npm("run", "build")
        self.assertEqual(code, 0, f"`npm run build` fails on the unchanged tree:\n{output}")
        for name, _config, source, out in CONFIGURATIONS:
            sources = [p for p in support.files_under(source, copy.path)
                       if p.endswith(tuple(EMITTED_EXTENSION)) and not p.endswith(".d.ts")]
            with self.subTest(configuration=name):
                self.assertTrue(sources, f"{source} holds no TypeScript file")
                for relative in sources:
                    self.assert_javascript(copy, emitted_path(relative, source, out))

    def test_build_compiles_made_up_source_under_each_configuration(self):
        # invariant: application-build-output/1
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

    def test_each_configuration_rejects_source_only_the_other_accepts(self):
        # invariant: application-build-output/1
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


if __name__ == "__main__":
    unittest.main()
