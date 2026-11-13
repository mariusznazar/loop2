"""The gate starts Docker Desktop for a test that needs a Docker daemon, and waits for it once
(D-390, D-391).

Every case runs against a stand-in `docker` that stands first on PATH (`docker_standin.py`): it
never starts or stops the Docker Desktop of the computer the tests run on. What the cases prove
is the gate's reaction to a daemon that answers, rises after a start, never rises, or has no
Docker Desktop to start; they do not prove that the real `docker desktop start` brings a real
daemon up. The wait is shortened to seconds through `LOOP2_DOCKER_START_LIMIT`; the limit of
three minutes itself is not exercised.
"""

import os
from pathlib import Path
import subprocess
import tempfile
import time
import unittest
from unittest import mock

from docker_standin import DockerStandIn
from gate_fixture import GateFixture
from scripts import docker_gate

NEEDS_DOCKER = """\
import unittest

from scripts import docker_gate


class NeedsDocker(unittest.TestCase):

    def test_needs_docker(self):
        docker_gate.require_daemon(self, "whether the checked thing works stays unchecked")
"""


def skipped_lines(output):
    """The lines in which the-way's runner names a skipped test and its reason."""
    return [line for line in output.splitlines() if line.startswith("skipped:")]


class DaemonGap(unittest.TestCase):
    """`daemon_gap` in one process, with the wait cut to a few seconds."""

    def use(self, docker, limit="20"):
        state = tempfile.TemporaryDirectory(prefix="loop2-docker-state-")
        self.addCleanup(state.cleanup)
        environment = docker.environment(
            LOOP2_DOCKER_START_LIMIT=limit,
            LOOP2_DOCKER_RUN_STATE=os.fspath(Path(state.name) / "state.json"))
        patch = mock.patch.dict(os.environ, environment)
        patch.start()
        self.addCleanup(patch.stop)

    def test_a_daemon_that_answers_is_used_and_nothing_is_started(self):
        docker = DockerStandIn(self, answers=True)
        self.use(docker)
        self.assertIsNone(docker_gate.daemon_gap())
        self.assertEqual(docker.starts(), [])

    def test_a_stopped_docker_desktop_is_started_once_awaited_and_left_running(self):
        docker = DockerStandIn(self, rise_after_polls=2)
        self.use(docker)
        self.assertIsNone(docker_gate.daemon_gap())
        self.assertEqual(len(docker.starts()), 1)
        self.assertIsNone(docker_gate.daemon_gap())
        self.assertEqual(len(docker.starts()), 1, "a daemon that answers is started no second time")
        self.assertEqual(docker.stops(), [])

    def test_a_daemon_that_does_not_rise_in_the_limit_gives_a_gap_after_the_limit_only(self):
        docker = DockerStandIn(self)
        self.use(docker, limit="2")
        began = time.monotonic()
        gap = docker_gate.daemon_gap()
        waited = time.monotonic() - began
        self.assertIsNotNone(gap)
        self.assertGreaterEqual(waited, 2)
        self.assertLess(waited, 20)
        self.assertEqual(len(docker.starts()), 1)

    def test_a_daemon_that_hangs_instead_of_refusing_is_waited_for_within_the_limit_alone(self):
        # A daemon that neither answers nor refuses holds every ask of `docker version` until
        # the ask's own time limit; the real `docker` is not hung for the test, the ask is
        # cut at the limit it was given, as the helper's own limit cuts it.
        docker = DockerStandIn(self)
        self.use(docker, limit="6")
        run = subprocess.run
        asked = []

        def hang_on_version(command, *arguments, **options):
            if command[1:2] != ["version"]:
                return run(command, *arguments, **options)
            asked.append(options["timeout"])
            time.sleep(options["timeout"])
            raise subprocess.TimeoutExpired(command, options["timeout"])

        began = time.monotonic()
        with mock.patch.object(subprocess, "run", hang_on_version):
            gap = docker_gate.daemon_gap()
        waited = time.monotonic() - began
        self.assertIsNotNone(gap)
        self.assertLess(waited, 6 + 6, f"asks of the daemon were given the time limits {asked}")
        self.assertEqual(len(docker.starts()), 1)

    def test_after_a_start_that_did_not_finish_the_next_ask_gives_the_gap_at_once(self):
        docker = DockerStandIn(self)
        self.use(docker, limit="4")
        first = docker_gate.daemon_gap()
        began = time.monotonic()
        second = docker_gate.daemon_gap()
        self.assertEqual(second, first)
        self.assertLess(time.monotonic() - began, 3)
        self.assertEqual(len(docker.starts()), 1)

    def test_without_the_docker_desktop_plugin_nothing_is_started_and_nothing_is_awaited(self):
        docker = DockerStandIn(self, plugin=False)
        self.use(docker, limit="60")
        began = time.monotonic()
        self.assertIsNotNone(docker_gate.daemon_gap())
        self.assertLess(time.monotonic() - began, 30)
        self.assertEqual(docker.starts(), [])

    def test_without_a_docker_command_there_is_a_gap_at_once(self):
        empty = tempfile.TemporaryDirectory(prefix="loop2-no-docker-")
        self.addCleanup(empty.cleanup)
        state = Path(empty.name) / "state.json"
        patch = mock.patch.dict(os.environ, {"PATH": empty.name,
                                             "LOOP2_DOCKER_RUN_STATE": os.fspath(state)})
        patch.start()
        self.addCleanup(patch.stop)
        self.assertIsNotNone(docker_gate.daemon_gap())

    def test_the_skip_names_what_stays_unchecked_and_tells_a_start_from_no_start(self):
        unchecked = "whether the checked thing works stays unchecked"
        reasons = {}
        for name, docker, limit in (("no desktop", DockerStandIn(self, plugin=False), "20"),
                                    ("start tried", DockerStandIn(self), "1")):
            with self.subTest(name=name):
                self.use(docker, limit)
                with self.assertRaises(unittest.SkipTest) as skipped:
                    docker_gate.require_daemon(self, unchecked)
                reasons[name] = str(skipped.exception)
                self.assertIn(unchecked, reasons[name])
        self.assertIn("tried to start Docker Desktop", reasons["start tried"])
        self.assertNotIn("tried to start Docker Desktop", reasons["no desktop"])


class GateRuns(unittest.TestCase):
    """The real `scripts/test.py` and, for a whole run, the real runner of the-way, which runs
    each directory of Python tests in a process of its own."""

    def setUp(self):
        self.gate = GateFixture(self)

    def write_needing_docker(self, *directories):
        for directory in directories:
            self.gate.write(f"tests/{directory}/test_needs_docker.py", NEEDS_DOCKER)

    def run_whole(self, docker, limit="3"):
        self.gate.use_real_python_runner()
        self.write_needing_docker("one", "two")
        self.gate.track_files()
        return self.gate.run(environment=docker.environment(LOOP2_DOCKER_START_LIMIT=limit),
                             timeout=120)

    def test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once(self):
        # invariant: gate-docker-start-waits-once
        # Breaking it: forget the failed start between the two directories' processes and the
        # second directory starts Docker Desktop and waits again, the stand-in seeing two starts.
        docker = DockerStandIn(self)
        result = self.run_whole(docker)
        output = result.stdout + result.stderr
        self.assertEqual(result.returncode, 0, output)
        self.assertEqual(len(docker.starts()), 1, output)
        skipped = skipped_lines(output)
        self.assertEqual(len(skipped), 2, output)
        for line in skipped:
            self.assertIn("tried to start Docker Desktop", line)
            self.assertIn("whether the checked thing works stays unchecked", line)

    def test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing(self):
        docker = DockerStandIn(self, rise_after_polls=1)
        result = self.run_whole(docker, limit="30")
        output = result.stdout + result.stderr
        self.assertEqual(result.returncode, 0, output)
        self.assertEqual(len(docker.starts()), 1, output)
        self.assertEqual(docker.stops(), [], output)
        self.assertEqual(skipped_lines(output), [], output)

    def test_a_whole_run_on_a_computer_without_docker_desktop_skips_at_once(self):
        docker = DockerStandIn(self, plugin=False)
        began = time.monotonic()
        result = self.run_whole(docker, limit="120")
        output = result.stdout + result.stderr
        self.assertEqual(result.returncode, 0, output)
        self.assertEqual(docker.starts(), [], output)
        self.assertEqual(len(skipped_lines(output)), 2, output)
        self.assertLess(time.monotonic() - began, 100)

    def test_one_selected_test_file_starts_a_stopped_docker_desktop_too(self):
        docker = DockerStandIn(self, rise_after_polls=1)
        self.write_needing_docker("one")
        result = self.gate.run("tests/one/test_needs_docker.py",
                               environment=docker.environment(LOOP2_DOCKER_START_LIMIT="30"))
        output = result.stdout + result.stderr
        self.assertEqual(result.returncode, 0, output)
        self.assertEqual(len(docker.starts()), 1, output)
        self.assertEqual(skipped_lines(output), [], output)


if __name__ == "__main__":
    unittest.main()
