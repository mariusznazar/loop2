"""Keep every Node test file in the repository's one test command (D-83)."""

import json
from pathlib import Path
import shlex
import unittest

ROOT = Path(__file__).resolve().parents[2]


class NodeTestSelection(unittest.TestCase):

    def test_every_node_test_file_is_selected_by_npm_test(self):
        # invariant: node-test-selection
        package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
        commands = [shlex.split(command) for command in package["scripts"]["test"].split("&&")]
        runners = [command for command in commands if command[:2] == ["node", "--test"]]
        self.assertEqual(len(runners), 1, "inspect Node selection if the gate's shape changes")
        patterns = runners[0][2:]
        self.assertTrue(patterns, "the gate must explicitly select its Node test files")
        selected = set()
        for pattern in patterns:
            # The current gate uses relative paths and * globs. Refuse syntax whose
            # shell/Node meaning this check does not model, rather than claim coverage.
            self.assertTrue(pattern.startswith("tests/"), pattern)
            self.assertNotIn("..", Path(pattern).parts, pattern)
            self.assertFalse(any(character in pattern for character in "{}[]?!|;&"), pattern)
            self.assertNotIn("**", pattern, "inspect Node semantics before adding recursive globs")
            matched = {path.relative_to(ROOT).as_posix() for path in ROOT.glob(pattern)
                       if path.is_file()}
            self.assertTrue(matched, f"Node test pattern matches no file: {pattern}")
            selected.update(matched)
        present = {path.relative_to(ROOT).as_posix()
                   for path in (ROOT / "tests").rglob("*.test.mjs") if path.is_file()}
        self.assertTrue(present, "no Node tests found under tests/")
        self.assertFalse(present - selected,
                         f"Node test files omitted by npm test: {sorted(present - selected)}")


if __name__ == "__main__":
    unittest.main()
