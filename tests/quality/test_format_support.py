"""The support of the format checks finds what the format checks of D-433 have to read.

The detector of comments that switch the formatter is run on made-up sources, with each expected
answer written out from what Ruff's formatter does with the comment; the file listing is run on a
made-up tree beside a copy of the real `ruff.toml`, and on the real tree for every Python file git
tracks.
"""

from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

import format_support
import quality_environment

ROOT = Path(__file__).resolve().parents[2]


class SwitchingComments(unittest.TestCase):
    def test_every_form_ruff_takes_for_a_switch_is_found(self):
        source = (
            "# fmt: off\n"
            "#fmt:on\n"
            "#   fmt:   off\n"
            "x = 1  # fmt: skip\n"
            "y = 2  # noqa: E501  # fmt: skip\n"
            "# yapf: disable\n"
            "#yapf:enable\n"
        )
        self.assertEqual(
            [line for line, _ in format_support.switching_comments(source)],
            [1, 2, 3, 4, 5, 6, 7],
        )

    def test_comments_that_only_resemble_a_switch_and_strings_are_not_found(self):
        source = (
            "# fmt: offline\n"
            "# fmt: skipped\n"
            "# format: off\n"
            "# yapf: disabled\n"
            "# fmt:\n"
            "# the fmt: off comment is forbidden\n"
            'text = "# fmt: off"\n'
            'other = """\n'
            "# yapf: disable\n"
            '"""\n'
        )
        self.assertEqual(format_support.switching_comments(source), [])


class ListedFiles(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        try:
            quality_environment.ensure_quality_environment(ROOT)
        except quality_environment.EnvironmentNotMade as error:
            raise AssertionError(str(error)) from None
        cls.ruff = quality_environment.venv_tool(ROOT, "ruff")

    def test_the_listing_holds_python_files_under_the_real_exclusions_and_nothing_else(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            shutil.copy(ROOT / "ruff.toml", root / "ruff.toml")
            for name in [
                "a.py",
                "pkg/b.pyi",
                "c.md",
                "notes.txt",
                ".runs/excluded.py",
                ".the-way/excluded.py",
            ]:
                (root / name).parent.mkdir(parents=True, exist_ok=True)
                (root / name).write_text("x = 1\n", encoding="utf-8")
            self.assertEqual(format_support.python_sources(root, self.ruff), ["a.py", "pkg/b.pyi"])

    def test_every_python_file_git_tracks_is_in_the_listing(self):
        # invariant: ruff-source-format
        # data: ruff.toml
        tracked = subprocess.run(
            ["git", "ls-files", "-z", "--", "*.py", "*.pyi"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=True,
        ).stdout
        names = {name for name in tracked.split("\0") if name}
        listed = set(format_support.python_sources(ROOT, self.ruff))
        self.assertTrue(names, "git lists no Python file")
        self.assertEqual(sorted(names - listed), [], "a Python file Ruff does not read")


if __name__ == "__main__":
    unittest.main()
