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
  each of the four names, with an error that names the name as one the compiler cannot find, so the
  browser configuration, whose libraries hold the page, is not what stopped it;
- `npm run build` fails on the same copy, and leaves no `dist/public/main.js` to serve;
- the configuration lists every file under `src/browser/sim/` that is TypeScript, read from the
  compiler's own list of the files it takes (`--listFilesOnly`) against the files found on disk.

Does NOT cover: a name of the JavaScript language that is not a value of the simulation's
(`Date.now()` and `new Date()` stand in the language and pass: `simulation-isolation` refuses
them); an import of a package that has types of its own; a file outside `src/browser/sim/`.
"""

import os
import unittest

import loop2_invariant_support as support

SIMULATION_SOURCE = "src/browser/sim"
PLANTED_FILE = "src/browser/sim/hex.ts"
SIMULATION_CONFIG = "tsconfig.sim.json"
COMPILER = "node_modules/typescript-compiler/bin/tsc"
BUILT_ENTRY = "dist/public/main.js"

# The made-up input: one use of each name, each the compiler cannot find when the configuration
# holds no library of the browser.
PLANTED_USES = (
    ("document", "export const plantedPage = document.title;"),
    ("setTimeout", "export const plantedTimer = setTimeout(() => undefined, 0);"),
    ("console", "console.log(\"planted\");"),
    ("structuredClone", "export const plantedClone = structuredClone({});"),
)


def plant_uses(copy):
    with open(copy.file(PLANTED_FILE), "a", encoding="utf-8", newline="\n") as handle:
        handle.write("\n// Appended by the invariant check simulation-type-check.\n")
        handle.writelines(line + "\n" for _name, line in PLANTED_USES)


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
        plant_uses(broken)
        code, output = broken.npm("run", "typecheck")
        self.assertNotEqual(code, 0, f"`npm run typecheck` exits 0 although {PLANTED_FILE} uses "
                                     f"names outside the JavaScript language:\n{output}")
        for name, _line in PLANTED_USES:
            self.assertIn(f"Cannot find name '{name}'", output,
                          f"`npm run typecheck` does not refuse a use of `{name}` in "
                          f"{PLANTED_FILE}:\n{output}")

    def test_build_refuses_it_too_and_leaves_nothing_to_serve(self):
        # invariant: simulation-type-check
        broken = self.fresh_copy()
        plant_uses(broken)
        code, output = broken.npm("run", "build")
        self.assertNotEqual(code, 0, f"`npm run build` exits 0 although {PLANTED_FILE} uses "
                                     f"names outside the JavaScript language:\n{output}")
        self.assertFalse(os.path.exists(broken.file(BUILT_ENTRY)),
                         f"`npm run build` with such a use still leaves {BUILT_ENTRY} to serve")

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
