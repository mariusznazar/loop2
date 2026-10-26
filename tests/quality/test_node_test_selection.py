"""Keep every Node test file in the repository's one test command (D-83)."""

import unittest

from gate_fixture import GateFixture, ROOT


class NodeTestSelection(unittest.TestCase):

    def test_every_node_test_file_is_selected_by_npm_test(self):
        # invariant: node-test-selection
        present = {path.relative_to(ROOT).as_posix()
                   for path in (ROOT / "tests").rglob("*.test.mjs") if path.is_file()}
        self.assertTrue(present, "no Node tests found under tests/")
        gate = GateFixture(self)
        for name in present:
            gate.node_test(name)
        result = gate.run()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        # Actual Node execution chooses the files; the test does not model its glob syntax.
        omitted = {name for name in present if not (gate.root / (name + ".ran")).exists()}
        self.assertFalse(omitted, f"Node test files omitted by npm test: {sorted(omitted)}")
        self.assertTrue((gate.root / "python-stage").exists())
        self.assertTrue((gate.root / "foundation-stage").exists())


if __name__ == "__main__":
    unittest.main()
