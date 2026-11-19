"""The environment of the quality tools is judged and made as D-424 gives it.

The commands that would reach the Python Package Index are replaced by a stand-in that records
every command and answers `pip list`, `--version`, `venv` and `pip install` from a scenario; the
files of the environment are real files in a temporary directory. What the tests prove is which
commands the code runs and what it raises, not what pip installs.
"""

import json
from pathlib import Path
import subprocess
import tempfile
import unittest

import quality_environment as environment

ROOT = Path(__file__).resolve().parents[2]
PINS = "ruff==1.2.3 \\\n    --hash=sha256:aa \\\n    --hash=sha256:bb\nshellcheck_py==4.5.6.7 \\\n    --hash=sha256:cc\nshfmt-py==8.9.1 \\\n    --hash=sha256:dd\n"
PINNED = [
    {"name": "ruff", "version": "1.2.3"},
    {"name": "shellcheck-py", "version": "4.5.6.7"},
    {"name": "shfmt-py", "version": "8.9.1"},
]
EVERYTHING = ("python", "ruff", "shellcheck", "shfmt")


class Scenario:
    """A stand-in for the commands: what `pip list` shows, whether the install works, and the
    files that `venv` and `pip install` leave behind."""

    def __init__(self, root, listed=None, install_code=0, installs=EVERYTHING, broken=None):
        self.root = root
        self.broken = broken
        self.listed = PINNED if listed is None else listed
        self.install_code = install_code
        self.installs = installs
        self.commands = []

    def touch(self, *names):
        for name in names:
            path = (
                environment.venv_python(self.root)
                if name == "python"
                else environment.venv_tool(self.root, name)
            )
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("", encoding="utf-8")

    def __call__(self, command, cwd):
        self.commands.append([str(part) for part in command])
        shown = self.commands[-1]
        if "list" in shown:
            return subprocess.CompletedProcess(command, 0, json.dumps(self.listed), "")
        if "venv" in shown:
            self.touch("python")
            return subprocess.CompletedProcess(command, 0, "", "")
        if "install" in shown:
            if self.install_code == 0:
                self.touch(*self.installs)
                self.listed = PINNED
                self.broken = None
            return subprocess.CompletedProcess(
                command,
                self.install_code,
                "Collecting ruff\n",
                "ERROR: Could not find a version that satisfies the requirement ruff\n"
                if self.install_code
                else "",
            )
        if self.broken and "--version" in shown and Path(shown[0]).stem == self.broken:
            return subprocess.CompletedProcess(command, 1, "", "cannot run")
        return subprocess.CompletedProcess(command, 0, "version\n", "")

    def ran(self, word):
        return [command for command in self.commands if word in command]


class QualityEnvironmentTests(unittest.TestCase):
    def setUp(self):
        folder = tempfile.TemporaryDirectory()
        self.addCleanup(folder.cleanup)
        self.root = Path(folder.name)
        (self.root / "requirements-quality.txt").write_text(PINS, encoding="utf-8")

    def scenario(self, present=EVERYTHING, **options):
        scenario = Scenario(self.root, **options)
        scenario.touch(*present)
        return scenario

    def test_the_pins_are_read_by_normalised_name_whatever_follows_them(self):
        self.assertEqual(
            environment.pinned(self.root),
            {"ruff": "1.2.3", "shellcheck-py": "4.5.6.7", "shfmt-py": "8.9.1"},
        )
        # An empty reading would make every environment complete, so the real file is read too.
        self.assertTrue({"ruff", "shellcheck-py", "shfmt-py"} <= set(environment.pinned(ROOT)))

    def test_an_environment_complete_at_the_pinned_versions_is_left_as_it_is(self):
        # decision: D-424 "Before its first check, the test of the quality checks makes the environment `.runs/quality-venv` of Ruff, ShellCheck and shfmt whenever it is absent, half made or not at the versions `requirements-quality.txt` pins, by installing that file with `pip install --require-hashes`, and it makes nothing and fetches nothing where the environment is complete and at the pinned versions"
        scenario = self.scenario()
        environment.ensure_quality_environment(self.root, run=scenario, python="python")
        self.assertEqual(scenario.ran("venv"), [])
        self.assertEqual(scenario.ran("install"), [])

    def test_an_environment_with_a_tool_missing_is_made_again_before_it_is_taken_for_ready(self):
        # decision: D-424 "Before its first check, the test of the quality checks makes the environment `.runs/quality-venv` of Ruff, ShellCheck and shfmt whenever it is absent, half made or not at the versions `requirements-quality.txt` pins, by installing that file with `pip install --require-hashes`, and it makes nothing and fetches nothing where the environment is complete and at the pinned versions"
        scenario = self.scenario(present=("python", "ruff"))
        environment.ensure_quality_environment(self.root, run=scenario, python="python")
        order = [
            ("venv" in command, "install" in command)
            for command in scenario.commands
            if "venv" in command or "install" in command
        ]
        self.assertEqual(order, [(True, False), (False, True)])
        install = scenario.ran("install")[0]
        self.assertEqual(install[-3:], ["--require-hashes", "-r", "requirements-quality.txt"])
        self.assertTrue(environment.venv_tool(self.root, "shellcheck").is_file())

    def test_a_tool_at_the_pinned_version_that_does_not_run_is_made_again(self):
        # decision: D-424 "Before its first check, the test of the quality checks makes the environment `.runs/quality-venv` of Ruff, ShellCheck and shfmt whenever it is absent, half made or not at the versions `requirements-quality.txt` pins, by installing that file with `pip install --require-hashes`, and it makes nothing and fetches nothing where the environment is complete and at the pinned versions"
        scenario = self.scenario(broken="shellcheck")
        environment.ensure_quality_environment(self.root, run=scenario, python="python")
        self.assertEqual(len(scenario.ran("venv")), 1)
        self.assertEqual(len(scenario.ran("install")), 1)

    def test_an_environment_whose_shfmt_is_missing_or_does_not_run_is_made_again(self):
        # decision: D-424 "Before its first check, the test of the quality checks makes the environment `.runs/quality-venv` of Ruff, ShellCheck and shfmt whenever it is absent, half made or not at the versions `requirements-quality.txt` pins, by installing that file with `pip install --require-hashes`, and it makes nothing and fetches nothing where the environment is complete and at the pinned versions"
        for options in ({"present": ("python", "ruff", "shellcheck")}, {"broken": "shfmt"}):
            scenario = self.scenario(**options)
            environment.ensure_quality_environment(self.root, run=scenario, python="python")
            self.assertEqual(len(scenario.ran("venv")), 1, options)
            self.assertEqual(len(scenario.ran("install")), 1, options)
        self.assertTrue(environment.venv_tool(self.root, "shfmt").is_file())

    def test_an_absent_directory_and_a_package_at_another_version_are_made_again(self):
        # decision: D-424 "Before its first check, the test of the quality checks makes the environment `.runs/quality-venv` of Ruff, ShellCheck and shfmt whenever it is absent, half made or not at the versions `requirements-quality.txt` pins, by installing that file with `pip install --require-hashes`, and it makes nothing and fetches nothing where the environment is complete and at the pinned versions"
        absent = self.scenario(present=())
        environment.ensure_quality_environment(self.root, run=absent, python="python")
        self.assertEqual(len(absent.ran("install")), 1)
        older = self.scenario(
            listed=[{"name": "ruff", "version": "1.2.2"}, *PINNED[1:]], install_code=0
        )
        environment.ensure_quality_environment(self.root, run=older, python="python")
        self.assertEqual(len(older.ran("install")), 1)

    def test_an_install_that_leaves_the_environment_half_made_is_no_success(self):
        # decision: D-424 "Where the environment cannot be made, the test fails with the one message that says so, naming `.runs/quality-venv` and the command that installs it, and no check is skipped"
        scenario = self.scenario(present=("python",), installs=("python", "ruff"))
        with self.assertRaises(environment.EnvironmentNotMade) as caught:
            environment.ensure_quality_environment(self.root, run=scenario, python="python")
        message = str(caught.exception)
        self.assertIn("after the install", message)
        self.assertRegex(message, r"shellcheck(\.exe)? is missing")

    def test_a_failed_install_ends_in_the_one_message_with_the_directory_the_command_and_the_output(
        self,
    ):
        # decision: D-424 "Where the environment cannot be made, the test fails with the one message that says so, naming `.runs/quality-venv` and the command that installs it, and no check is skipped"
        scenario = self.scenario(present=(), install_code=1)
        with self.assertRaises(environment.EnvironmentNotMade) as caught:
            environment.ensure_quality_environment(self.root, run=scenario, python="python")
        message = str(caught.exception)
        self.assertIn(".runs/quality-venv", message)
        self.assertIn("-m pip install --require-hashes -r requirements-quality.txt", message)
        self.assertIn("Could not find a version that satisfies the requirement ruff", message)
        self.assertEqual(len(scenario.ran("install")), 1)


if __name__ == "__main__":
    unittest.main()
