"""Keep the mutation runner's explicit list complete as simulation tests are added."""

import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[2]


class MutationTestSelection(unittest.TestCase):

    def test_every_simulation_test_except_source_rules_is_listed(self):
        # invariant: mutation-test-selection
        # Adding a test without registering it must fail, not silently reduce mutation coverage.
        config = json.loads((ROOT / "stryker.config.json").read_text(encoding="utf-8"))
        expected = {path.relative_to(ROOT).as_posix()
                    for path in (ROOT / "tests/sim").glob("*.test.mjs")
                    if path.is_file() and path.name != "rules.test.mjs"}
        self.assertTrue(expected, "no simulation tests found")
        self.assertEqual(set(config["tap"]["testFiles"]), expected)


if __name__ == "__main__":
    unittest.main()
