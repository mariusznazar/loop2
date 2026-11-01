"""Checks of the loop2-play skill: its two copies and the script that writes frames to files.
Standard library only, with Node.js for the script."""

import base64
import json
import os
import re
import subprocess
import tempfile
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CLAUDE_COPY = os.path.join(ROOT, ".claude", "skills", "loop2-play")
AGENTS_COPY = os.path.join(ROOT, ".agents", "skills", "loop2-play")
FILES = ["SKILL.md", "frames.js", "save-frames.mjs"]
SAVE_FRAMES = os.path.join(CLAUDE_COPY, "save-frames.mjs")


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
    return values[0][len("description:"):].strip()


def save_frames(frames, directory):
    return subprocess.run(["node", SAVE_FRAMES], input=json.dumps(frames).encode(), cwd=directory,
                          capture_output=True, timeout=30, check=False)


class Loop2PlaySkill(unittest.TestCase):

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

    def test_each_frame_comes_out_as_its_own_bytes_with_its_time_since_the_first(self):
        frames = [{"timestamp": 1000.0, "data": base64.b64encode(b"first").decode()},
                  {"timestamp": 1250.4, "data": base64.b64encode(b"second").decode()}]
        with tempfile.TemporaryDirectory() as directory:
            result = save_frames(frames, directory)
            self.assertEqual(result.returncode, 0, result.stderr)
            folder = os.path.join(directory, ".playwright-cli", "frames")
            self.assertEqual(sorted(os.listdir(folder)), ["000.jpeg", "001.jpeg"])
            self.assertEqual(read_bytes(folder, "001.jpeg"), b"second")
            self.assertIn(b"+250 ms", result.stdout)

    def test_a_run_with_no_frames_fails_and_keeps_the_frames_of_the_run_before(self):
        frame = [{"timestamp": 1.0, "data": base64.b64encode(b"kept").decode()}]
        with tempfile.TemporaryDirectory() as directory:
            self.assertEqual(save_frames(frame, directory).returncode, 0)
            self.assertEqual(save_frames([], directory).returncode, 1)
            folder = os.path.join(directory, ".playwright-cli", "frames")
            self.assertEqual(read_bytes(folder, "000.jpeg"), b"kept")


if __name__ == "__main__":
    unittest.main()
