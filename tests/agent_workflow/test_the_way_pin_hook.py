"""Checks of the SessionStart hook that warns when `.the-way` stands on another commit than the one
the repository pins. The hook runs as `.claude/settings.json` declares it, with Node.js, on made-up
repositories that hold a real submodule. Standard library only, with git and Node.js."""

import json
import os
import shutil
import stat
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SETTINGS = ROOT / ".claude" / "settings.json"
PLACEHOLDER = "${CLAUDE_PROJECT_DIR}/"
REPAIR = "git submodule update --init -- .the-way"
# The names carry a space, quotes and an ampersand: nothing of a path may reach a shell.
CLONE_NAME = "work tree {} 'it' & more"

GIT_ENVIRONMENT = {
    **{name: value for name, value in os.environ.items() if not name.startswith("GIT_")},
    "GIT_CONFIG_GLOBAL": os.devnull,
    "GIT_CONFIG_NOSYSTEM": "1",
}
GIT_OPTIONS = ["-c", "protocol.file.allow=always", "-c", "user.name=Test",
               "-c", "user.email=test@example.invalid", "-c", "commit.gpgsign=false"]


def git(directory, *args):
    run = subprocess.run(["git", *GIT_OPTIONS, *args], cwd=directory, env=GIT_ENVIRONMENT,
                         capture_output=True, encoding="utf-8", check=False, timeout=60)
    if run.returncode:
        raise AssertionError(f"git {' '.join(args)} failed: {run.stdout}{run.stderr}")
    return run.stdout.strip()


def commit_file(directory, name, text):
    (directory / name).write_text(text, encoding="utf-8", newline="\n")
    git(directory, "add", "--", name)
    git(directory, "commit", "-m", text)
    return git(directory, "rev-parse", "HEAD")


def make_writable_then_remove(function, path, _error):
    os.chmod(path, stat.S_IWRITE)
    function(path)


def declared_handler():
    """The one command hook that settings.json declares for the start of a session."""
    declared = json.loads(SETTINGS.read_text(encoding="utf-8"))["hooks"]["SessionStart"]
    return declared[0]["hooks"][0]


def hook_command(root):
    """The command of the hook as Claude Code starts it for the project at `root`: the
    placeholder replaced in each argument, no shell."""
    handler = declared_handler()
    return [handler["command"], *[argument.replace(PLACEHOLDER, str(root) + os.sep)
                                  for argument in handler["args"]]]


def run_hook(command, directory, environment=None):
    return subprocess.run(command, cwd=directory, env=environment or GIT_ENVIRONMENT,
                          stdin=subprocess.DEVNULL, capture_output=True, encoding="utf-8",
                          check=False, timeout=60)


class TheWayPinHook(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.base = Path(tempfile.mkdtemp())
        cls.counter = 0
        submodule = cls.base / "the-way-origin"
        submodule.mkdir()
        git(submodule, "init", "--initial-branch=main")
        cls.older = commit_file(submodule, "file.txt", "older\n")
        cls.pinned = commit_file(submodule, "file.txt", "pinned\n")
        cls.origin = cls.base / "origin"
        cls.origin.mkdir()
        git(cls.origin, "init", "--initial-branch=main")
        commit_file(cls.origin, "README.md", "the repository\n")
        git(cls.origin, "submodule", "add", str(submodule), ".the-way")
        git(cls.origin, "commit", "-m", "pin the-way")
        cls.hook_path = declared_handler()["args"][0].removeprefix(PLACEHOLDER)

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(cls.base, onexc=make_writable_then_remove)

    def clone(self, initialized):
        """A clone of the repository with the hook in place, and its submodule checked out where
        `initialized` is true."""
        type(self).counter += 1
        directory = self.base / CLONE_NAME.format(self.counter)
        git(self.base, "clone", str(self.origin), str(directory))
        if initialized:
            git(directory, "submodule", "update", "--init", "--", ".the-way")
        self.install_hook(directory)
        return directory

    def install_hook(self, directory):
        target = directory / self.hook_path
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / self.hook_path, target)

    def test_a_checkout_at_the_pinned_commit_prints_nothing(self):
        # decision: D-414 "At the start of a Claude Code session started in the repository root"
        directory = self.clone(initialized=True)
        precondition = git(directory / ".the-way", "rev-parse", "HEAD")
        self.assertEqual(precondition, self.pinned)
        run = run_hook(hook_command(directory), directory)
        self.assertEqual((run.returncode, run.stdout, run.stderr), (0, "", ""))

    def test_a_checkout_on_another_commit_warns_the_agent_and_the_human_and_blocks_nothing(self):
        # decision: D-414 "Where they differ, or `.the-way` is not initialized, the hook warns the agent"
        directory = self.clone(initialized=True)
        git(directory / ".the-way", "checkout", "--detach", self.older)
        run = run_hook(hook_command(directory), directory)
        self.assertEqual(run.returncode, 0, run.stderr)
        output = json.loads(run.stdout)
        self.assertEqual(sorted(output), ["hookSpecificOutput", "systemMessage"])
        self.assertEqual(output["hookSpecificOutput"]["hookEventName"], "SessionStart")
        for message in (output["systemMessage"], output["hookSpecificOutput"]["additionalContext"]):
            for expected in (self.pinned, self.older, REPAIR):
                self.assertIn(expected, message)

    def test_an_uninitialized_submodule_warns_and_does_not_take_the_repository_for_it(self):
        # decision: D-414 "Where they differ, or `.the-way` is not initialized, the hook warns the agent"
        directory = self.clone(initialized=False)
        own_commit = git(directory, "rev-parse", "HEAD")
        precondition = git(directory / ".the-way", "rev-parse", "HEAD")
        self.assertEqual(precondition, own_commit, "git finds the repository around the empty folder")
        run = run_hook(hook_command(directory), directory)
        self.assertEqual(run.returncode, 0, run.stderr)
        output = json.loads(run.stdout)
        for message in (output["systemMessage"], output["hookSpecificOutput"]["additionalContext"]):
            self.assertIn(self.pinned, message)
            self.assertIn(REPAIR, message)
            self.assertNotIn(own_commit, message)

    def test_a_checkout_git_cannot_read_warns_as_an_uninitialized_one(self):
        directory = self.clone(initialized=False)
        (directory / ".the-way" / ".git").write_text("gitdir: nowhere\n", encoding="utf-8")
        run = run_hook(hook_command(directory), directory)
        self.assertEqual(run.returncode, 0, run.stderr)
        self.assertIn(self.pinned, json.loads(run.stdout)["systemMessage"])

    def test_a_session_started_in_a_subdirectory_checks_the_same_repository(self):
        directory = self.clone(initialized=True)
        git(directory / ".the-way", "checkout", "--detach", self.older)
        inner = directory / "inner folder"
        inner.mkdir()
        run = run_hook(hook_command(directory), inner)
        self.assertEqual(run.returncode, 0, run.stderr)
        self.assertIn(self.older, json.loads(run.stdout)["systemMessage"])

    def test_with_no_git_the_hook_says_nothing_and_ends_with_0(self):
        # decision: D-414 "The hook is a Node.js script, started by the same command on Windows, Linux and macOS"
        directory = self.clone(initialized=True)
        git(directory / ".the-way", "checkout", "--detach", self.older)
        empty_path = self.base / "no programs"
        empty_path.mkdir(exist_ok=True)
        environment = {**GIT_ENVIRONMENT, "PATH": str(empty_path)}
        command = [shutil.which("node"), *hook_command(directory)[1:]]
        run = run_hook(command, directory, environment)
        self.assertEqual((run.returncode, run.stdout), (0, ""))

    def test_where_the_repository_pins_nothing_the_hook_says_nothing_and_ends_with_0(self):
        # decision: D-414 "At the start of a Claude Code session started in the repository root"
        cases = {"no repository at all": (False, False),
                 "a repository with no submodule": (True, False),
                 "a repository with no submodule beside a repository in .the-way": (True, True)}
        for name, (is_repository, has_checkout) in cases.items():
            with self.subTest(name):
                type(self).counter += 1
                directory = self.base / CLONE_NAME.format(self.counter)
                directory.mkdir()
                if is_repository:
                    git(directory, "init", "--initial-branch=main")
                if has_checkout:
                    (directory / ".the-way").mkdir()
                    git(directory / ".the-way", "init", "--initial-branch=main")
                    commit_file(directory / ".the-way", "file.txt", "a checkout\n")
                self.install_hook(directory)
                run = run_hook(hook_command(directory), directory)
                self.assertEqual((run.returncode, run.stdout), (0, ""))


if __name__ == "__main__":
    unittest.main()
