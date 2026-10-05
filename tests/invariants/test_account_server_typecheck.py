"""Invariant account-server-typecheck/1: The account and save server's TypeScript types are
checked before deployment.

The sentence is about a check, so the check feeds it input made up for it (WAY-61): in a
temporary copy of the working tree, a type error written out below is appended to every
TypeScript file of the server's source (`src/server`, as README.md places it), and the product's
own commands are run on the copy. The real tree is never written.

Covers:
- `npm run typecheck` passes on the unchanged copy and fails once the server's source holds the
  type error;
- `npm run build` — the command that produces what `npm start` runs, and so what a deployment
  would ship — passes on the unchanged copy, and with the type error fails and leaves no
  `dist/server/main.js` to start;
- the repository holds no deployment file whose route to production this check has not read.

Does NOT cover: a deployment defined outside this repository, or one that skips `npm run build`.
While the repository holds no deployment file — the skeleton has none — "before deployment" is
read as "before the build a deployment would run produces anything"; once a deployment file
appears, the last test fails on purpose until the check is extended to read that file.
"""

import os
import unittest

import loop2_invariant_support as support

# The made-up input: a value of the wrong type under TypeScript's strict checking.
DELIBERATE_TYPE_ERROR = (
    "\n// Appended by the invariant check account-server-typecheck/1.\n"
    "const invariantCheckDeliberateTypeError: number = \"not a number\";\n"
    "void invariantCheckDeliberateTypeError;\n"
)
SERVER_SOURCE = "src/server"
SERVER_ENTRY_BUILT = "dist/server/main.js"


def append_type_error(copy):
    targets = [p for p in support.files_under(SERVER_SOURCE, copy.path)
               if p.endswith((".ts", ".mts", ".cts")) and not p.endswith(".d.ts")]
    if not targets:
        raise AssertionError(f"{SERVER_SOURCE} holds no TypeScript file")
    for relative in targets:
        with open(copy.file(relative), "a", encoding="utf-8", newline="\n") as handle:
            handle.write(DELIBERATE_TYPE_ERROR)
    return targets


class ServerTypesCheckedBeforeDeployment(unittest.TestCase):

    def setUp(self):
        self.copies = []

    def tearDown(self):
        for copy in self.copies:
            copy.remove()

    def fresh_copy(self):
        copy = support.TreeCopy()
        self.copies.append(copy)
        return copy

    def test_typecheck_command_rejects_server_type_error(self):
        # invariant: account-server-typecheck/1
        clean = self.fresh_copy()
        code, output = clean.npm("run", "typecheck")
        self.assertEqual(code, 0, f"`npm run typecheck` fails on the unchanged tree:\n{output}")
        broken = self.fresh_copy()
        targets = append_type_error(broken)
        code, output = broken.npm("run", "typecheck")
        self.assertNotEqual(code, 0, f"`npm run typecheck` exits 0 although {targets} hold a "
                                     f"type error:\n{output}")

    def test_build_refuses_server_type_error(self):
        # invariant: account-server-typecheck/1
        clean = self.fresh_copy()
        code, output = clean.npm("run", "build")
        self.assertEqual(code, 0, f"`npm run build` fails on the unchanged tree:\n{output}")
        self.assertTrue(os.path.isfile(clean.file(SERVER_ENTRY_BUILT)),
                        f"`npm run build` on the unchanged tree leaves no {SERVER_ENTRY_BUILT}")
        broken = self.fresh_copy()
        targets = append_type_error(broken)
        code, output = broken.npm("run", "build")
        self.assertNotEqual(code, 0, f"`npm run build` exits 0 although {targets} hold a "
                                     f"type error:\n{output}")
        self.assertFalse(os.path.exists(broken.file(SERVER_ENTRY_BUILT)),
                         f"`npm run build` with a server type error still leaves "
                         f"{SERVER_ENTRY_BUILT} to start")

    def test_no_deployment_route_left_unread(self):
        # invariant: account-server-typecheck/1
        found = support.deployment_files()
        self.assertEqual(found, [], "deployment files exist that this check does not read; "
                                    "extend it to show their route runs the type check first")


if __name__ == "__main__":
    unittest.main()
