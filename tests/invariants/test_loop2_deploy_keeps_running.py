"""Invariant loop2-deploy-keeps-running: A deployment that stops before it starts the new
container — at its input, the commit, the lock, the reading of memory and disk, the fetch, the
checkout, the type check or the build — leaves the running loop2 containers in service.

The check drives the repository's script `deploy/loop2-deploy` as a black box through the seam of
`tests/deploy/deploy_script_support.py`: a temporary copy in which only the marked constants block
is replaced, recording stubs for docker, curl, flock, df, hostname and uname, and a temporary Git
repository standing in for GitHub with a clone of it standing in for the server's checkout. In
every run a loop2 container is running: the docker stub answers the script's question for its
revision label.

Reading of the sentence:
- a deployment that stops before it starts the new containers: each stop is made to happen in turn
  — a malformed input, a commit of no accepted branch, a held lock, too little or unreadable
  memory, too little or unreadable disk, a failed fetch, a failed checkout, a failed build, a commit
  with no `compose.yaml` — and the run must end with that stage's non-zero exit. The type check
  runs inside the image build (the Dockerfile's `npm run typecheck`), so the script sees a failed
  type check as one failed `docker compose … build`; one test covers both;
- leaves the running loop2 containers in service: every docker call the run recorded is on an
  allow-list of calls that only read (READ_ONLY_DOCKER, and READ_ONLY_COMPOSE for
  `docker compose <options> <subcommand>`); a stop at the build stage may also have called
  `docker compose … build`, which makes an image and touches no container. Any other call — `up`,
  `down`, `stop`, `rm`, `scale`, `kill`, `restart`, `update`, a call the list does not know — fails
  the check.

Does NOT cover: the real container on the server (nothing runs there); a container stopped by
something other than a docker call (a signal to its process, the kernel killing it for lack of
memory); a stop after the new containers start, which the sentence leaves out.

A positive control runs a deployment that gets through to the switch and asserts the same reader
finds its `up` off the list, so an empty finding above is the script's, not the reader's.

A machine without Git or Git's own bash skips these tests, so the invariant reports unchecked,
never passed.
"""

import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "deploy"))

import deploy_script_support as support  # noqa: E402

# Docker calls that only read, by their first word or, for a management command, their first two.
READ_ONLY_DOCKER = {("inspect",), ("info",), ("ps",), ("images",), ("logs",), ("version",),
                    ("image", "ls"), ("image", "inspect"),
                    ("container", "ls"), ("container", "inspect"), ("container", "logs")}
# Subcommands of `docker compose` that only read.
READ_ONLY_COMPOSE = {"ps", "logs", "config", "images", "ls", "version"}
# The subcommand a stop at the build stage may also have called.
BUILD = "build"
# Options of `docker compose` before its subcommand that take the next word as their value.
COMPOSE_OPTIONS_WITH_VALUE = {"--project-name", "-p", "--file", "-f", "--project-directory",
                              "--env-file", "--profile", "--ansi", "--progress", "--parallel"}

# The revision label of the loop2 container running before every deployment here.
RUNNING_REVISION = "fedcba9876543210fedcba9876543210fedcba98"

MEMINFO_512_MIB = b"MemTotal:        4456448 kB\nMemAvailable:     524288 kB\n"
DF_1_GIB = " Avail\n1048576\n"


def compose_subcommand(arguments):
    """The subcommand of `docker compose <arguments>`, or None when there is none."""
    words = iter(arguments)
    for word in words:
        if word in COMPOSE_OPTIONS_WITH_VALUE:
            next(words, None)
        elif not word.startswith("-"):
            return word
    return None


def off_the_list(calls, build_started):
    """The docker calls that are not on the allow-list of a stop before the new containers."""
    allowed_compose = READ_ONLY_COMPOSE | ({BUILD} if build_started else set())
    found = []
    for call in calls:
        if call[:1] == ["compose"]:
            allowed = compose_subcommand(call[1:]) in allowed_compose
        else:
            allowed = tuple(call[:1]) in READ_ONLY_DOCKER or tuple(call[:2]) in READ_ONLY_DOCKER
        if not allowed:
            found.append(call)
    return found


class StopBeforeTheNewContainerKeepsTheRunningOne(unittest.TestCase):

    def setUp(self):
        self.fixture = support.DeployFixture()
        self.addCleanup(self.fixture.remove)
        self.sha = self.fixture.deployable_commit()
        self.fixture.install()

    def run_with_passing_answers(self, **run):
        """A forced-path run (unless `run` says otherwise) after any rule the test gave first,
        with answers under which every later stage would pass."""
        self.fixture.answer_passing_run(running=RUNNING_REVISION)
        if not run:
            run = {"ssh_original_command": self.sha}
        return self.fixture.run(**run)

    def assert_stopped_and_kept(self, result, code, build_started=False):
        self.assertEqual(result.code, code, result)
        self.assertEqual(off_the_list(result.calls["docker"], build_started), [], result)

    def test_stop_at_the_input(self):
        # invariant: loop2-deploy-keeps-running
        result = self.run_with_passing_answers(
            ssh_original_command="0123456789ABCDEF0123456789ABCDEF01234567")
        self.assert_stopped_and_kept(result, 2)

    def test_stop_at_the_commit(self):
        # invariant: loop2-deploy-keeps-running
        feature = self.fixture.commit("feature", "only on feature", parent=self.fixture.first,
                                      files={"compose.yaml": b"name: loop2\n"})
        result = self.run_with_passing_answers(ssh_original_command=feature)
        self.assert_stopped_and_kept(result, 3)

    def test_stop_at_the_lock(self):
        # invariant: loop2-deploy-keeps-running
        self.fixture.answer("flock", exit_code=1)
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 4)

    def test_stop_at_the_memory_reading(self):
        # invariant: loop2-deploy-keeps-running
        support.write_bytes(self.fixture.meminfo, MEMINFO_512_MIB)
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 5)

    def test_stop_at_unreadable_memory(self):
        # invariant: loop2-deploy-keeps-running
        support.write_bytes(self.fixture.meminfo, b"MemTotal:        4456448 kB\n")
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 5)

    def test_stop_at_the_disk_reading(self):
        # invariant: loop2-deploy-keeps-running
        self.fixture.answer("df", stdout=DF_1_GIB)
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 5)

    def test_stop_at_unreadable_disk(self):
        # invariant: loop2-deploy-keeps-running
        self.fixture.answer("df", exit_code=1)
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 5)

    def test_stop_at_the_fetch(self):
        # invariant: loop2-deploy-keeps-running
        unreachable = os.path.join(self.fixture.root, "github-unreachable")
        self.fixture.git("-C", self.fixture.checkout, "remote", "set-url", "origin", unreachable)
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 6)

    def test_stop_at_the_checkout(self):
        # A lock on the clone's index leaves the fetch and the commit stage alone and makes the
        # checkout fail.
        # invariant: loop2-deploy-keeps-running
        support.write_bytes(os.path.join(self.fixture.checkout, ".git", "index.lock"), b"")
        result = self.run_with_passing_answers()
        self.assert_stopped_and_kept(result, 6)
        self.assertIn("fetch", result.git_trace, result)

    def test_stop_at_the_build_or_its_type_check(self):
        # The type check runs inside the image build, so its failure is the build's failure.
        # invariant: loop2-deploy-keeps-running
        self.fixture.answer("docker", exit_code=1,
                            stdout="#12 ERROR: process \"npm run typecheck\" did not complete "
                                   "successfully: exit code: 2\n",
                            match="compose * build *")
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 7, build_started=True)

    def test_stop_at_a_commit_without_compose_file(self):
        # A commit from before the deployment existed: no compose.yaml, no script source.
        # invariant: loop2-deploy-keeps-running
        old = self.fixture.commit("main", "from before the deployment existed")
        result = self.run_with_passing_answers(ssh_original_command=old)
        self.assert_stopped_and_kept(result, 7, build_started=True)

    def test_reader_finds_the_switch_of_a_deployment_that_gets_there(self):
        # A positive control of the reader: a run with every stage passing issues `up`, and the
        # allow-list of a stop at the build stage does not let it through.
        # invariant: loop2-deploy-keeps-running
        result = self.run_with_passing_answers()
        self.assertEqual(result.code, 0, result)
        found = off_the_list(result.calls["docker"], build_started=True)
        self.assertTrue([call for call in found if compose_subcommand(call[1:]) == "up"], result)

    def test_reader_on_written_out_calls(self):
        # The reader itself, on calls written out: read-only calls pass, a build passes only at
        # the build stage, and calls that stop, remove or replace the container are found.
        # invariant: loop2-deploy-keeps-running
        read_only = [
            ["inspect", "--type", "container", "--format", "{{ .State.Status }}", "loop2"],
            ["info", "--format", "{{.DockerRootDir}}"],
            ["compose", "--project-name", "loop2", "-f", "/srv/loop2/compose.yaml", "logs",
             "--tail", "50", "app"],
            ["compose", "-p", "loop2", "ps"],
        ]
        build = ["compose", "--project-name", "loop2", "-f", "/srv/loop2/compose.yaml", "build",
                 "app"]
        mutating = [
            ["compose", "--project-name", "loop2", "-f", "/srv/loop2/compose.yaml", "up", "-d",
             "app"],
            ["compose", "--project-name", "loop2", "-f", "/srv/loop2/compose.yaml", "scale",
             "app=0"],
            ["compose", "-p", "loop2", "stop", "app"],
            ["compose", "-p", "loop2", "down"],
            ["compose", "--project-name", "loop2", "--dry-run", "rm", "-f", "app"],
            ["rm", "-f", "loop2"],
            ["stop", "loop2"],
            ["update", "--memory", "6m", "loop2"],
            ["container", "kill", "loop2"],
            ["container", "kill", "loop2-cloudflared"],
            ["image", "prune", "--force", "--filter",
             "label=org.opencontainers.image.title=loop2"],
            ["compose"],
        ]
        self.assertEqual(off_the_list(read_only, build_started=False), [])
        self.assertEqual(off_the_list([build], build_started=False), [build])
        self.assertEqual(off_the_list([build], build_started=True), [])
        self.assertEqual(off_the_list(mutating, build_started=True), mutating)


if __name__ == "__main__":
    unittest.main()
