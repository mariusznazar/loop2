"""Checks of the loop2-balance skill: its two copies and the shape of its description.
Standard library only."""

import os
import re
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CLAUDE_COPY = os.path.join(ROOT, ".claude", "skills", "loop2-balance")
AGENTS_COPY = os.path.join(ROOT, ".agents", "skills", "loop2-balance")
FILES = ["SKILL.md"]


def read_bytes(directory, name):
    with open(os.path.join(directory, name), "rb") as handle:
        return handle.read()


def description(directory):
    text = read_bytes(directory, "SKILL.md").decode("utf-8")
    match = re.match(r"---\r?\n(.*?)\r?\n---\r?\n", text, re.DOTALL)
    if match is None:
        raise AssertionError("SKILL.md has no frontmatter")
    values = [line for line in match.group(1).splitlines() if line.startswith("description:")]
    if len(values) != 1:
        raise AssertionError("the frontmatter must hold exactly one description line")
    return values[0][len("description:") :].strip()


class Loop2BalanceSkill(unittest.TestCase):
    def test_both_copies_hold_the_same_files(self):
        self.assertEqual(sorted(os.listdir(CLAUDE_COPY)), sorted(FILES))
        self.assertEqual(sorted(os.listdir(AGENTS_COPY)), sorted(FILES))

    def test_both_copies_are_byte_identical(self):
        for name in FILES:
            self.assertEqual(read_bytes(CLAUDE_COPY, name), read_bytes(AGENTS_COPY, name), name)

    def test_description_is_short_and_yaml_safe(self):
        for directory in (CLAUDE_COPY, AGENTS_COPY):
            value = description(directory)
            self.assertTrue(value, "empty description")
            self.assertLess(len(value), 400)
            self.assertRegex(value, r"^[A-Za-z]", "a plain scalar starts with a letter")
            self.assertNotIn(": ", value)
            self.assertNotIn(" #", value)
            self.assertNotIn("\t", value)


if __name__ == "__main__":
    unittest.main()
