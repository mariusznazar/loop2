"""Static checks of the loop2-deploy skill (spec § 7). Standard library only."""

import os
import re
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CLAUDE_COPY = os.path.join(ROOT, ".claude", "skills", "loop2-deploy")
AGENTS_COPY = os.path.join(ROOT, ".agents", "skills", "loop2-deploy")

FILES = ["SKILL.md", "references/setup_and_secrets.md", "references/troubleshooting.md"]

IPV6_LITERAL = re.compile(r"(?<![0-9A-Za-z:])(?:[0-9A-Fa-f]{1,4}:){2,7}[0-9A-Fa-f]{0,4}(?![0-9A-Za-z])|::")
MIKRUS_NAME = re.compile(r"\b[a-z]+\d+\.mikrus\.(?:cloud|xyz|pl)\b|\bmikr\.us\b", re.IGNORECASE)


def read_bytes(directory, name):
    with open(os.path.join(directory, *name.split("/")), "rb") as handle:
        return handle.read()


def listing(directory):
    found = []
    for folder, _dirs, names in os.walk(directory):
        for name in names:
            found.append(os.path.relpath(os.path.join(folder, name), directory).replace(os.sep, "/"))
    return sorted(found)


def description(directory):
    text = read_bytes(directory, "SKILL.md").decode("utf-8")
    match = re.match(r"---\r?\n(.*?)\r?\n---\r?\n", text, re.DOTALL)
    if match is None:
        raise AssertionError("SKILL.md has no frontmatter")
    lines = match.group(1).splitlines()
    values = [line for line in lines if line.startswith("description:")]
    if len(values) != 1:
        raise AssertionError("the frontmatter must hold exactly one description line")
    return values[0][len("description:"):].strip()


class Loop2DeploySkill(unittest.TestCase):

    def test_both_copies_hold_the_same_files(self):
        self.assertEqual(listing(CLAUDE_COPY), sorted(FILES))
        self.assertEqual(listing(AGENTS_COPY), sorted(FILES))

    def test_both_copies_are_byte_identical(self):
        for name in FILES:
            self.assertEqual(read_bytes(CLAUDE_COPY, name), read_bytes(AGENTS_COPY, name), name)

    def test_description_is_short_and_yaml_safe(self):
        for directory in (CLAUDE_COPY, AGENTS_COPY):
            value = description(directory)
            self.assertTrue(value, "empty description")
            self.assertLess(len(value), 400)
            self.assertNotIn(": ", value)
            self.assertNotIn(" #", value)
            self.assertNotIn("\t", value)
            self.assertFalse(value[0] in "\"'>|[{&*!%@`")

    def test_frontmatter_names_the_skill_and_does_not_hide_it_from_the_model(self):
        text = read_bytes(CLAUDE_COPY, "SKILL.md").decode("utf-8")
        self.assertRegex(text, r"(?m)^name: loop2-deploy\r?$")
        self.assertNotIn("disable-model-invocation", text)

    def test_no_ipv6_literal_and_no_mikrus_server_name(self):
        for name in FILES:
            text = read_bytes(CLAUDE_COPY, name).decode("utf-8")
            self.assertIsNone(IPV6_LITERAL.search(text), name)
            self.assertIsNone(MIKRUS_NAME.search(text), name)


if __name__ == "__main__":
    unittest.main()
