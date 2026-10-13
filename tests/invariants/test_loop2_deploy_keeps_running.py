"""Invariant loop2-deploy-keeps-running/1: A deployment that stops before it starts the new
container — at its input, the commit, the lock, the reading of memory and disk, the fetch, the
checkout, the type check or the build — leaves the running loop2 container in service.

The check drives the repository's script `deploy/loop2-deploy` as a black box through the seam of
`tests/deploy/deploy_script_support.py`: a temporary copy in which only the marked constants block
is replaced, recording stubs for docker, curl, flock and df, and a temporary Git repository standing
in for GitHub with a clone of it standing in for the server's checkout. In every run a loop2
container is running: the docker stub answers the script's question for its revision label.

Reading of the sentence:
- a deployment that stops before it starts the new container: each stop is made to happen in turn
  — a malformed input, a commit of no accepted branch, a held lock, too little memory, too little
  disk, a failed fetch, a failed checkout, a failed type check inside the build, a failed build —
  and the run must end with that stage's non-zero exit;
- leaves the running loop2 container in service: across the whole run the script issued no docker
  command holding a word that stops, removes or replaces a container (STOPPING_WORDS), whether as
  `docker compose …` or as `docker container …`, `docker rm`, `docker stop` and the like.

Does NOT cover: the real container on the server (nothing runs there); a container stopped by
something other than a docker command (a signal to its process, the kernel killing it for lack of
memory); a stop after the new container starts, which the sentence leaves out.

A positive control runs a deployment that gets through to the switch and asserts the same reader
sees its `up`, so an empty finding above is the script's, not the reader's.

A machine without Git or Git's own bash skips these tests, so the invariant reports unchecked,
never passed.
"""

import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "deploy"))

import deploy_script_support as support  # noqa: E402

# Words of a docker command that stop, remove or replace a running container.
STOPPING_WORDS = {"up", "down", "rm", "stop", "kill", "restart", "create", "pause", "remove",
                  "run"}

# The revision label of the loop2 container running before every deployment here.
RUNNING_REVISION = "fedcba9876543210fedcba9876543210fedcba98"

MEMINFO_512_MIB = b"MemTotal:        4456448 kB\nMemAvailable:     524288 kB\n"
DF_1_GIB = " Avail\n1048576\n"


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

    def stopping_calls(self, result):
        return [call for call in result.calls["docker"] if STOPPING_WORDS.intersection(call)]

    def assert_stopped_and_kept(self, result, code):
        self.assertEqual(result.code, code, result)
        self.assertEqual(self.stopping_calls(result), [], result)

    def test_stop_at_the_input(self):
        # invariant: loop2-deploy-keeps-running/1
        result = self.run_with_passing_answers(
            ssh_original_command="0123456789ABCDEF0123456789ABCDEF01234567")
        self.assert_stopped_and_kept(result, 2)

    def test_stop_at_the_commit(self):
        # invariant: loop2-deploy-keeps-running/1
        feature = self.fixture.commit("feature", "only on feature", parent=self.fixture.first,
                                      files={"compose.yaml": b"name: loop2\n"})
        result = self.run_with_passing_answers(ssh_original_command=feature)
        self.assert_stopped_and_kept(result, 3)

    def test_stop_at_the_lock(self):
        # invariant: loop2-deploy-keeps-running/1
        self.fixture.answer("flock", exit_code=1)
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 4)

    def test_stop_at_the_memory_reading(self):
        # invariant: loop2-deploy-keeps-running/1
        support.write_bytes(self.fixture.meminfo, MEMINFO_512_MIB)
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 5)

    def test_stop_at_unreadable_memory(self):
        # invariant: loop2-deploy-keeps-running/1
        support.write_bytes(self.fixture.meminfo, b"MemTotal:        4456448 kB\n")
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 5)

    def test_stop_at_the_disk_reading(self):
        # invariant: loop2-deploy-keeps-running/1
        self.fixture.answer("df", stdout=DF_1_GIB)
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 5)

    def test_stop_at_unreadable_disk(self):
        # invariant: loop2-deploy-keeps-running/1
        self.fixture.answer("df", exit_code=1)
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 5)

    def test_stop_at_the_fetch(self):
        # invariant: loop2-deploy-keeps-running/1
        unreachable = os.path.join(self.fixture.root, "github-unreachable")
        self.fixture.git("-C", self.fixture.checkout, "remote", "set-url", "origin", unreachable)
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 6)

    def test_stop_at_the_checkout(self):
        # A lock on the clone's index leaves the fetch and the commit stage alone and makes the
        # checkout fail.
        # invariant: loop2-deploy-keeps-running/1
        support.write_bytes(os.path.join(self.fixture.checkout, ".git", "index.lock"), b"")
        result = self.run_with_passing_answers()
        self.assert_stopped_and_kept(result, 6)
        self.assertIn("fetch", result.git_trace, result)

    def test_stop_at_the_type_check(self):
        # invariant: loop2-deploy-keeps-running/1
        self.fixture.answer("docker", exit_code=1,
                            stdout="#12 ERROR: process \"npm run typecheck\" did not complete "
                                   "successfully: exit code: 2\n",
                            match="compose * build *")
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 7)

    def test_stop_at_the_build(self):
        # invariant: loop2-deploy-keeps-running/1
        self.fixture.answer("docker", exit_code=1,
                            stdout="#14 ERROR: process \"npm run build\" did not complete "
                                   "successfully: exit code: 1\n",
                            match="compose * build *")
        self.assert_stopped_and_kept(self.run_with_passing_answers(), 7)

    def test_stop_at_a_commit_without_compose_file(self):
        # A commit from before the deployment existed: no compose.yaml, no script source.
        # invariant: loop2-deploy-keeps-running/1
        old = self.fixture.commit("main", "from before the deployment existed")
        result = self.run_with_passing_answers(ssh_original_command=old)
        self.assert_stopped_and_kept(result, 7)

    def test_reader_sees_the_switch_of_a_deployment_that_gets_there(self):
        # A positive control of the reader: a run with every stage passing does issue `up`.
        # invariant: loop2-deploy-keeps-running/1
        result = self.run_with_passing_answers()
        self.assertEqual(result.code, 0, result)
        self.assertTrue([call for call in self.stopping_calls(result) if "up" in call], result)


if __name__ == "__main__":
    unittest.main()
