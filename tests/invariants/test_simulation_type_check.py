"""Invariant simulation-type-check: The simulation's TypeScript files are type-checked under a
configuration of their own, which covers every file under `src/browser/sim/`, holds only the
library of the JavaScript language and no ambient types, and which `npm run typecheck` and
`npm run build` both run.

The sentence is about a check, so the check feeds it input made up for it (WAY-61): in a temporary
copy of the working tree, a use of each of four names that the browser adds to those of the
JavaScript language is appended to a file of the simulation, and the product's own commands are
run on the copy. The real tree is never written. The names are written out below: the page
(`document`), a timer (`setTimeout`), the console (`console`) and `structuredClone`. The browser's
configuration passes all four, since its libraries hold the page, so only a configuration of the
simulation's own can refuse them.

Covers:
- `npm run typecheck` passes on the unchanged copy, and fails once the simulation holds a use of
  each of the four names, with the error code the compiler gives that name at the line of the use,
  so the browser configuration, whose libraries hold the page, is not what stopped it;
- `npm run build` fails on the same copy, and leaves no `dist/public/main.js` to serve;
- `npm run build` on the unchanged copy writes no `.js`, `.d.ts`, map or build-info file beside the
  sources of the simulation, since the configuration only checks;
- the configuration lists every file under `src/browser/sim/` that is TypeScript, read from the
  compiler's own list of the files it takes (`--listFilesOnly`) against the files found on disk.

Does NOT cover: a name of the JavaScript language that is not a value of the simulation's
(`Date.now()` and `new Date()` stand in the language and pass: `simulation-isolation` refuses
them); an import of a package that has types of its own; a file outside `src/browser/sim/`.
"""

import os
import re
import unittest

import loop2_invariant_support as support

SIMULATION_SOURCE = "src/browser/sim"
PLANTED_FILE = "src/browser/sim/hex.ts"
SIMULATION_CONFIG = "tsconfig.sim.json"
COMPILER = "node_modules/typescript-compiler/bin/tsc"
BUILT_ENTRY = "dist/public/main.js"

# The made-up input: one use of each name, each the compiler cannot find when the configuration
# holds no library of the browser, with the error code the compiler gives it.
PLANTED_USES = (
    ("document", "export const plantedPage = document.title;", "TS2584"),
    ("setTimeout", "export const plantedTimer = setTimeout(() => undefined, 0);", "TS2304"),
    ("console", "console.log(\"planted\");", "TS2584"),
    ("structuredClone", "export const plantedClone = structuredClone({});", "TS2304"),
)
# What the compiler writes beside the sources when it is allowed to emit.
EMITTED_SUFFIXES = (".js", ".d.ts", ".js.map", ".tsbuildinfo")
# An error of the compiler as `npm run typecheck` prints it: file(line,column): error TSnnnn:
ERROR_LINE = re.compile(re.escape(PLANTED_FILE) + r"\((\d+),\d+\): error (TS\d+):")


def plant_uses(copy):
    """Appends the uses to the file; gives the line each stands on, by name."""
    with open(copy.file(PLANTED_FILE), "a", encoding="utf-8", newline="\n") as handle:
        handle.write("\n// Appended by the invariant check simulation-type-check.\n")
        handle.writelines(line + "\n" for _name, line, _code in PLANTED_USES)
    with open(copy.file(PLANTED_FILE), encoding="utf-8") as handle:
        lines = handle.read().splitlines()
    return {name: lines.index(line) + 1 for name, line, _code in PLANTED_USES}


class SimulationTypeCheck(unittest.TestCase):

    def setUp(self):
        self.copies = []

    def tearDown(self):
        for copy in self.copies:
            copy.remove()

    def fresh_copy(self):
        copy = support.TreeCopy()
        self.copies.append(copy)
        return copy

    def test_typecheck_command_refuses_a_name_the_simulation_has_no_right_to(self):
        # invariant: simulation-type-check
        clean = self.fresh_copy()
        code, output = clean.npm("run", "typecheck")
        self.assertEqual(code, 0, f"`npm run typecheck` fails on the unchanged tree:\n{output}")
        broken = self.fresh_copy()
        lines = plant_uses(broken)
        code, output = broken.npm("run", "typecheck")
        self.assertNotEqual(code, 0, f"`npm run typecheck` exits 0 although {PLANTED_FILE} uses "
                                     f"names outside the JavaScript language:\n{output}")
        # Each name is refused at its own line with its error code, as a name the compiler cannot
        # find, so the browser configuration, which passes all four, is not what stopped it.
        refused = {(int(line), error) for line, error in ERROR_LINE.findall(output)}
        for name, _line, error in PLANTED_USES:
            self.assertIn((lines[name], error), refused,
                          f"`npm run typecheck` does not refuse a use of `{name}` at line "
                          f"{lines[name]} of {PLANTED_FILE} with {error}:\n{output}")

    def test_build_refuses_it_too_and_leaves_nothing_to_serve(self):
        # invariant: simulation-type-check
        broken = self.fresh_copy()
        plant_uses(broken)
        code, output = broken.npm("run", "build")
        self.assertNotEqual(code, 0, f"`npm run build` exits 0 although {PLANTED_FILE} uses "
                                     f"names outside the JavaScript language:\n{output}")
        self.assertFalse(os.path.exists(broken.file(BUILT_ENTRY)),
                         f"`npm run build` with such a use still leaves {BUILT_ENTRY} to serve")

    def test_the_build_writes_nothing_beside_the_sources_of_the_simulation(self):
        # invariant: simulation-type-check
        copy = self.fresh_copy()
        code, output = copy.npm("run", "build")
        self.assertEqual(code, 0, f"`npm run build` fails on the unchanged tree:\n{output}")
        written = [path for path in support.files_under(SIMULATION_SOURCE, copy.path)
                   if path.endswith(EMITTED_SUFFIXES)]
        self.assertEqual(written, [], f"`npm run build` writes files beside {SIMULATION_SOURCE}: "
                                      f"{SIMULATION_CONFIG} emits what it should only check")

    def test_the_configuration_takes_every_typescript_file_of_the_simulation(self):
        # invariant: simulation-type-check
        copy = self.fresh_copy()
        code, output = support.run(["node", copy.file(COMPILER), "-p", SIMULATION_CONFIG,
                                    "--listFilesOnly"], copy.path)
        self.assertEqual(code, 0, f"the compiler cannot read {SIMULATION_CONFIG}:\n{output}")
        # The compiler prints absolute paths; the copy's own directory may be spelled another way
        # than it was made, so each is read from `src/browser/sim/` on.
        taken = set()
        for line in output.splitlines():
            line = line.strip().replace(chr(92), "/")
            if SIMULATION_SOURCE + "/" in line:
                taken.add(line[line.index(SIMULATION_SOURCE + "/"):])
        expected = {path for path in support.files_under(SIMULATION_SOURCE, copy.path)
                    if path.endswith(".ts")}
        self.assertTrue(expected, f"{SIMULATION_SOURCE} holds no TypeScript file")
        self.assertEqual(sorted(expected - taken), [],
                         f"{SIMULATION_CONFIG} leaves out files of the simulation")


if __name__ == "__main__":
    unittest.main()
