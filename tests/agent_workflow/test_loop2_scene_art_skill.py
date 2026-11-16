"""Checks of the loop2-scene-art skill: its two copies, the pointers to it, and that the commands
its text gives are the ones its scripts take. The scripts have their own tests,
`test_scene_art_*.py`. Standard library only, with Node.js for the scripts."""

import os
import re
import unittest

import scene_art_support as support

ROOT = support.ROOT
CLAUDE_COPY = support.SKILL
AGENTS_COPY = os.path.join(ROOT, ".agents", "skills", "loop2-scene-art")
SCRIPTS = ["contrast.mjs", "flashes.mjs", "grid.mjs", "preview.mjs", "recolor.mjs", "sheet-frames.mjs"]
LIBRARIES = ["cli.mjs", "colour.mjs", "image.mjs", "jpeg.mjs", "png.mjs"]
FILES = ["SKILL.md", *SCRIPTS, *LIBRARIES]
COMMAND = re.compile(r"node \.claude/skills/loop2-scene-art/([\w-]+\.mjs)(.*)")


def read_bytes(directory, name):
    with open(os.path.join(directory, name), "rb") as handle:
        return handle.read()


def skill_text():
    return read_bytes(CLAUDE_COPY, "SKILL.md").decode("utf-8")


def description(directory):
    text = read_bytes(directory, "SKILL.md").decode("utf-8")
    match = re.match(r"---\r?\n(.*?)\r?\n---\r?\n", text, re.DOTALL)
    if match is None:
        raise AssertionError("SKILL.md has no frontmatter")
    values = [line for line in match.group(1).splitlines() if line.startswith("description:")]
    if len(values) != 1:
        raise AssertionError("the frontmatter must hold exactly one description line")
    return values[0][len("description:"):].strip()


def commands_of_the_text():
    """Each command of a code block of SKILL.md that runs a script of the skill: its script and the
    options it names."""
    found, inside = [], False
    for line in skill_text().splitlines():
        if line.strip().startswith("```"):
            inside = not inside
            continue
        match = COMMAND.search(line) if inside else None
        if match:
            found.append((match.group(1), re.findall(r"(?<=\s)--[a-z-]+", match.group(2))))
    return found


class Loop2SceneArtSkill(unittest.TestCase):

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
            self.assertNotIn(": ", value)
            self.assertNotIn(" #", value)
            self.assertNotIn("\t", value)

    def test_the_agent_instructions_send_a_task_about_the_scene_to_the_skill(self):
        with open(os.path.join(ROOT, "AGENTS.md"), encoding="utf-8") as handle:
            text = handle.read()
        self.assertIn("`.claude/skills/loop2-scene-art/SKILL.md`", text)

    def test_the_text_names_each_of_the_six_scripts_and_a_command_that_runs_it(self):
        named = {script for script, _ in commands_of_the_text()}
        self.assertEqual(named, set(SCRIPTS))

    def test_every_option_the_commands_of_the_text_use_is_one_its_script_takes(self):
        commands = commands_of_the_text()
        self.assertTrue(commands, "precondition: the text has commands")
        for script, options in commands:
            for option in options:
                with self.subTest(script=script, option=option):
                    result = support.run_script(script, option)
                    self.assertNotIn("unknown option", result.stderr)

    def test_a_script_given_an_option_it_does_not_take_says_so_and_exits_with_1(self):
        # The test above reads that message, so it is shown here to be the one a script gives.
        result = support.run_script("recolor.mjs", "--no-such-option")
        self.assertEqual(result.returncode, 1)
        self.assertIn("error: unknown option --no-such-option", result.stderr)


if __name__ == "__main__":
    unittest.main()
