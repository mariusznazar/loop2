"""Invariant application-build-kitchen-sink: Nothing `npm run build` writes holds the
kitchen-sink page of the browser view or code compiled from `src/browser/kitchen-sink/`.

Building the application is `npm run build`, as README.md gives it; it writes below `dist/`. The
page and its entry module each carry the marker string written out below (spec Decision 4): the
page's HTML in a `<meta>` content value, the entry as a string constant that its compiled module
keeps. A file below `dist/` holding the marker is the page, or code compiled from its sources;
`dist/kitchen-sink/`, where the page's own command assembles it, must not exist after the build.
Each run happens in a fresh temporary copy of the working tree, which holds no `dist` (git ignores
it, so the copy leaves it out); the real tree is never written.

Covers:
- on the unchanged copy, `npm run build` exits 0, writes the game's page, and leaves no file
  below `dist/` holding the marker and no `dist/kitchen-sink/`;
- made-up game source written out below, which imports the page's entry module — the way the
  page's code would reach the build despite `tsconfig.browser.json` excluding its directory —
  makes the same search find the marker below `dist/` after `npm run build`, so the search sees
  compiled page code where the build holds it;
- positive control: `npm run kitchen-sink -- --build-only` exits 0 — the one compile of the page
  in `npm test`, which fails on a type error of the page — and the same search finds the marker
  in the page's HTML and in its compiled entry module below `dist/kitchen-sink/`; the command
  writes nothing outside `dist/kitchen-sink/` (spec Decision 6).

Does NOT cover: copies of the page's code without its marker (a function of the entry moved into a
game module, for one), which review keeps out (spec Decision 4); what the account server serves
beyond `dist/public`; the page served by `npm run kitchen-sink` without `--build-only`.
"""

import os
import unittest

import loop2_invariant_support as support

MARKER = b"loop2-kitchen-sink-page"
OUTPUT = "dist"
PAGE_OUTPUT = "dist/kitchen-sink"
GAME_PAGE = "dist/public/index.html"
PAGE_HTML = "dist/kitchen-sink/index.html"
PAGE_ENTRY = "dist/kitchen-sink/kitchen-sink/kitchen-sink.js"

# Made-up game source that imports the page's entry module, so the browser configuration compiles
# that module into the game's output although it excludes the page's directory.
PROBE_FILE = "src/browser/invariant_check_kitchen_sink_probe.ts"
PROBE = (
    "// Written by the invariant check application-build-kitchen-sink.\n"
    'import { PAGE_MARKER } from "./kitchen-sink/kitchen-sink.js";\n'
    "export const invariantCheckKitchenSinkProbe = PAGE_MARKER;\n"
)


def files_with_marker(copy, directory):
    """Relative paths of the files below directory of the copy whose bytes hold the marker."""
    found = []
    for relative in support.files_under(directory, copy.path):
        with open(copy.file(relative), "rb") as handle:
            if MARKER in handle.read():
                found.append(relative)
    return found


def tree_state(copy):
    """Each file of the copy outside node_modules, with its size and modification time."""
    state = {}
    for current, directories, files in os.walk(copy.path):
        if os.path.samefile(current, copy.path) and "node_modules" in directories:
            directories.remove("node_modules")
        for name in files:
            path = os.path.join(current, name)
            relative = os.path.relpath(path, copy.path).replace(os.sep, "/")
            status = os.stat(path)
            state[relative] = (status.st_size, status.st_mtime_ns)
    return state


class BuildHoldsNoKitchenSinkPage(unittest.TestCase):

    def setUp(self):
        self.copies = []

    def tearDown(self):
        for copy in self.copies:
            copy.remove()

    def fresh_copy(self):
        copy = support.TreeCopy()
        self.copies.append(copy)
        self.assertFalse(os.path.exists(copy.file(OUTPUT)),
                         "the fresh copy already holds dist, so its output would prove nothing")
        return copy

    def test_build_writes_no_file_of_the_page(self):
        # invariant: application-build-kitchen-sink
        copy = self.fresh_copy()
        code, output = copy.npm("run", "build")
        self.assertEqual(code, 0, f"`npm run build` fails on the unchanged tree:\n{output}")
        self.assertTrue(os.path.isfile(copy.file(GAME_PAGE)),
                        f"the build wrote no {GAME_PAGE}, so its output was not searched")
        self.assertEqual(files_with_marker(copy, OUTPUT), [],
                         "files `npm run build` writes hold the kitchen-sink page's marker")
        self.assertFalse(os.path.exists(copy.file(PAGE_OUTPUT)),
                         f"`npm run build` wrote {PAGE_OUTPUT}")

    def test_search_finds_page_code_the_game_pulls_into_the_build(self):
        # invariant: application-build-kitchen-sink
        copy = self.fresh_copy()
        with open(copy.file(PROBE_FILE), "w", encoding="utf-8", newline="\n") as handle:
            handle.write(PROBE)
        code, output = copy.npm("run", "build")
        self.assertEqual(code, 0, f"`npm run build` fails with {PROBE_FILE}:\n{output}")
        self.assertIn("dist/public/kitchen-sink/kitchen-sink.js", files_with_marker(copy, OUTPUT),
                      "the search does not find the page's entry the game's source pulled "
                      "into the build")

    def test_page_command_builds_the_page_with_its_marker(self):
        # invariant: application-build-kitchen-sink
        copy = self.fresh_copy()
        before = tree_state(copy)
        code, output = copy.npm("run", "kitchen-sink", "--", "--build-only", timeout=180)
        self.assertEqual(code, 0, f"`npm run kitchen-sink -- --build-only` fails:\n{output}")
        found = files_with_marker(copy, OUTPUT)
        for expected in (PAGE_HTML, PAGE_ENTRY):
            with self.subTest(file=expected):
                self.assertIn(expected, found,
                              f"{expected} is missing or holds no marker, so the search of "
                              f"the build's output would not see the page")
        after = tree_state(copy)
        written = sorted(path for path, state in after.items()
                         if before.get(path) != state
                         and not path.startswith(PAGE_OUTPUT + "/"))
        removed = sorted(path for path in before if path not in after)
        self.assertEqual(written + removed, [],
                         "`npm run kitchen-sink -- --build-only` changed files outside "
                         f"{PAGE_OUTPUT}/")


if __name__ == "__main__":
    unittest.main()
