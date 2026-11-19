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
import sys
import tempfile
import time
import unittest
from unittest import mock

from docker_standin import DockerStandIn
from gate_fixture import ROOT, GateFixture
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
            LOOP2_DOCKER_RUN_STATE=os.fspath(Path(state.name) / "state.json"),
        )
        patch = mock.patch.dict(os.environ, environment)
        patch.start()
        self.addCleanup(patch.stop)

    def test_a_daemon_that_answers_is_used_and_nothing_is_started(self):
        # decision: D-390 "The test is skipped only when no daemon has answered by then"
        docker = DockerStandIn(self, answers=True)
        self.use(docker)
        self.assertIsNone(docker_gate.daemon_gap())
        self.assertEqual(docker.starts(), [])

    def test_a_stopped_docker_desktop_is_started_once_awaited_and_left_running(self):
        # decision: D-390 "A test of the gate that needs a Docker daemon, finding none answering on a computer that has Docker Desktop, starts Docker Desktop and waits until a daemon answers"
        # decision: D-391 "The Docker Desktop that the gate started stays running after the run"
        docker = DockerStandIn(self, rise_after_polls=2)
        self.use(docker)
        self.assertIsNone(docker_gate.daemon_gap())
        self.assertEqual(len(docker.starts()), 1)
        self.assertIsNone(docker_gate.daemon_gap())
        self.assertEqual(len(docker.starts()), 1, "a daemon that answers is started no second time")
        self.assertEqual(docker.stops(), [])

    def test_a_daemon_that_does_not_rise_in_the_limit_gives_a_gap_after_the_limit_only(self):
        # decision: D-390 "A test of the gate that needs a Docker daemon, finding none answering on a computer that has Docker Desktop, starts Docker Desktop and waits until a daemon answers"
        # decision: D-390 "The test is skipped only when no daemon has answered by then"
        docker = DockerStandIn(self)
        self.use(docker, limit="2")
        began = time.monotonic()
        gap = docker_gate.daemon_gap()
        waited = time.monotonic() - began
        self.assertIsNotNone(gap)
        self.assertGreaterEqual(waited, 2)
        self.assertLess(waited, 20)
        self.assertEqual(len(docker.starts()), 1)

    def test_a_version_that_docker_desktops_cache_answers_is_no_answer_of_the_daemon(self):
        # Docker Desktop in Resource Saver stops the virtual machine of its daemon and answers
        # `docker version` from a cache, so the version names a server that is not running; the
        # first command of the test then starts the machine, while Docker Desktop may rewrite the
        # context file that the commands then running read.
        # Breaking it: ask the daemon `docker version` again, and the gate gives no gap at once,
        # the stand-in's daemon never having answered.
        docker = DockerStandIn(self, cached_version=True)
        self.use(docker, limit="2")
        self.assertIsNotNone(docker_gate.daemon_gap())
        self.assertEqual(len(docker.starts()), 1)

    def test_a_daemon_that_hangs_instead_of_refusing_is_waited_for_within_the_limit_alone(self):
        # decision: D-390 "A test of the gate that needs a Docker daemon, finding none answering on a computer that has Docker Desktop, starts Docker Desktop and waits until a daemon answers"
        # A daemon that neither answers nor refuses holds every ask of `docker system df` until
        # the ask's own time limit; the real `docker` is not hung for the test, the ask is
        # cut at the limit it was given, as the helper's own limit cuts it.
        docker = DockerStandIn(self)
        self.use(docker, limit="6")
        run = subprocess.run
        asked = []

        def hang_on_the_question(command, *arguments, **options):
            if command[1:3] != ["system", "df"]:
                return run(command, *arguments, **options)
            asked.append(options["timeout"])
            time.sleep(options["timeout"])
            raise subprocess.TimeoutExpired(command, options["timeout"])

        began = time.monotonic()
        with mock.patch.object(subprocess, "run", hang_on_the_question):
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
        # decision: D-390 "On a computer with no Docker Desktop, such as one running Linux or a container in a cloud, the test is skipped at once"
        docker = DockerStandIn(self, plugin=False)
        self.use(docker, limit="60")
        began = time.monotonic()
        self.assertIsNotNone(docker_gate.daemon_gap())
        self.assertLess(time.monotonic() - began, 30)
        self.assertEqual(docker.starts(), [])

    def test_a_daemon_that_answers_on_a_computer_without_docker_desktop_is_used(self):
        # decision: D-390 "On a computer with no Docker Desktop, such as one running Linux or a container in a cloud, the test is skipped at once where no daemon answers, with a message that says what stays unchecked, and runs where a daemon answers"
        # Breaking it: ask for Docker Desktop before asking the daemon, and a machine of CI with
        # Linux, where a daemon answers and there is no Docker Desktop, skips its tests.
        docker = DockerStandIn(self, answers=True, plugin=False)
        self.use(docker)
        self.assertIsNone(docker_gate.daemon_gap())
        docker_gate.require_daemon(self, "whether the checked thing works stays unchecked")
        self.assertEqual(docker.starts(), [])

    def test_without_a_docker_command_there_is_a_gap_at_once(self):
        # decision: D-390 "On a computer with no Docker Desktop, such as one running Linux or a container in a cloud, the test is skipped"
        empty = tempfile.TemporaryDirectory(prefix="loop2-no-docker-")
        self.addCleanup(empty.cleanup)
        state = Path(empty.name) / "state.json"
        patch = mock.patch.dict(
            os.environ, {"PATH": empty.name, "LOOP2_DOCKER_RUN_STATE": os.fspath(state)}
        )
        patch.start()
        self.addCleanup(patch.stop)
        self.assertIsNotNone(docker_gate.daemon_gap())

    def test_the_skip_names_what_stays_unchecked_and_tells_a_start_from_no_start(self):
        # decision: D-390 "The test is skipped only when no daemon has answered by then, and its message says that the start was tried and did not finish and what stays unchecked"
        # decision: D-390 "On a computer with no Docker Desktop, such as one running Linux or a container in a cloud, the test is skipped at once where no daemon answers, with a message that says what stays unchecked"
        unchecked = "whether the checked thing works stays unchecked"
        reasons = {}
        for name, docker, limit in (
            ("no desktop", DockerStandIn(self, plugin=False), "20"),
            ("start tried", DockerStandIn(self), "1"),
        ):
            with self.subTest(name=name):
                self.use(docker, limit)
                with self.assertRaises(unittest.SkipTest) as skipped:
                    docker_gate.require_daemon(self, unchecked)
                reasons[name] = str(skipped.exception)
                self.assertIn(unchecked, reasons[name])
        self.assertIn("tried to start Docker Desktop", reasons["start tried"])
        self.assertNotIn("tried to start Docker Desktop", reasons["no desktop"])


ASK = f"""import sys

sys.path.insert(0, {os.fspath(ROOT)!r})
from scripts import docker_gate

print(docker_gate.daemon_gap())
"""

# The same, but its first ask of the daemon is held until a file appears and then says no, as
# an ask that began while Docker Desktop was coming up and ended after the start was done.
ASK_HELD = f"""import os
import sys
import time
from pathlib import Path

sys.path.insert(0, {os.fspath(ROOT)!r})
from scripts import docker_gate

answers = docker_gate.daemon_answers
held = []


def first_ask_held(timeout=docker_gate.ANSWER_LIMIT):
    if held:
        return answers(timeout)
    held.append(True)
    Path(os.environ["LOOP2_TEST_ASKED"]).write_text("asked")
    while not Path(os.environ["LOOP2_TEST_RELEASE"]).exists():
        time.sleep(0.05)
    return False


docker_gate.daemon_answers = first_ask_held
print(docker_gate.daemon_gap())
"""


class ProcessesAtOnce(unittest.TestCase):
    """`daemon_gap` in several processes of one run, which share one state file, as the processes
    of the directories of Python tests do when they run at the same time."""

    def setUp(self):
        self.running = []

    def tearDown(self):
        for process in self.running:
            process.kill()
            process.communicate()

    def environment(self, docker, limit):
        state = tempfile.TemporaryDirectory(prefix="loop2-docker-state-")
        self.addCleanup(state.cleanup)
        return docker.environment(
            LOOP2_DOCKER_START_LIMIT=limit,
            LOOP2_DOCKER_RUN_STATE=os.fspath(Path(state.name) / "state.json"),
        )

    def ask(self, environment, program=ASK):
        process = subprocess.Popen(
            [sys.executable, "-B", "-c", program],
            env=environment,
            stdin=subprocess.DEVNULL,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        self.running.append(process)
        return process

    def wait_for_a_start(self, docker):
        deadline = time.monotonic() + 30
        while not docker.starts():
            self.assertLess(time.monotonic(), deadline, "no process started Docker Desktop")
            time.sleep(0.05)

    def answer_of(self, process):
        output, errors = process.communicate(timeout=60)
        self.assertEqual(process.returncode, 0, errors)
        return output.strip()

    def test_a_process_that_asks_during_a_start_of_another_waits_for_that_start_alone(self):
        # decision: D-390 "In one run of the gate, whichever of its processes need a daemon, Docker Desktop is started at most once"
        # decision: D-391 "The Docker Desktop that the gate started stays running after the run"
        # Breaking it: let the second process start Docker Desktop for itself while the first
        # one's start is not finished, the stand-in seeing two starts.
        docker = DockerStandIn(self, rise_after_polls=8)
        environment = self.environment(docker, "60")
        first = self.ask(environment)
        self.wait_for_a_start(docker)
        second = self.ask(environment)
        self.assertEqual(self.answer_of(first), "None")
        self.assertEqual(self.answer_of(second), "None")
        self.assertEqual(len(docker.starts()), 1)
        self.assertEqual(docker.stops(), [])

    def test_a_process_whose_first_ask_ends_after_a_start_is_done_does_not_start_again(self):
        # decision: D-390 "In one run of the gate, whichever of its processes need a daemon, Docker Desktop is started at most once"
        # Breaking it: ask the daemon again after the lock only where the process had to wait
        # for it, so that the process that takes the lock at once starts Docker Desktop a
        # second time, the stand-in seeing two starts.
        docker = DockerStandIn(self, rise_after_polls=2)
        environment = self.environment(docker, "60")
        signals = tempfile.TemporaryDirectory(prefix="loop2-docker-signals-")
        self.addCleanup(signals.cleanup)
        asked, release = Path(signals.name) / "asked", Path(signals.name) / "release"
        late = self.ask(
            dict(
                environment,
                LOOP2_TEST_ASKED=os.fspath(asked),
                LOOP2_TEST_RELEASE=os.fspath(release),
            ),
            ASK_HELD,
        )
        deadline = time.monotonic() + 30
        while not asked.exists():
            self.assertLess(time.monotonic(), deadline, "the held process never asked")
            time.sleep(0.05)
        self.assertEqual(self.answer_of(self.ask(environment)), "None")
        self.assertEqual(len(docker.starts()), 1)
        release.write_text("go")
        self.assertEqual(self.answer_of(late), "None")
        self.assertEqual(len(docker.starts()), 1)

    def test_a_wait_for_a_start_that_never_lets_go_ends_in_the_limit_with_the_gap(self):
        # invariant: gate-docker-start-waits-once
        # decision: D-390 "In one run of the gate, whichever of its processes need a daemon, Docker Desktop is started at most once: a test that asks for a daemon while a start begun by another process of the run has not finished waits for that start, within its limit, and starts none of its own"
        # Breaking it: wait for the lock without the limit of the one that waits, so that a
        # holder that stays alive and does nothing holds the process on for as long as it lives.
        docker = DockerStandIn(self)
        environment = self.environment(docker, "3")
        held = os.open(environment["LOOP2_DOCKER_RUN_STATE"] + ".lock", os.O_RDWR | os.O_CREAT)
        self.addCleanup(os.close, held)
        self.assertTrue(docker_gate.try_lock(held))
        began = time.monotonic()
        waiting = self.ask(environment)
        gap = self.answer_of(waiting)
        self.assertLess(time.monotonic() - began, 3 + 20, "the wait for the lock had no limit")
        self.assertIn("within 3 seconds", gap)
        self.assertEqual(docker.starts(), [])
        self.assertEqual(
            self.answer_of(self.ask(environment)), gap, "the gap is recorded for the run"
        )

    def test_a_process_that_asks_during_a_start_that_does_not_finish_gets_its_gap_after_it(self):
        # invariant: gate-docker-start-waits-once
        # decision: D-390 "In one run of the gate, whichever of its processes need a daemon, Docker Desktop is started at most once: a test that asks for a daemon while a start begun by another process of the run has not finished waits for that start, within its limit, and starts none of its own"
        # Breaking it: let the second process wait for a start of its own after the first one
        # recorded the gap, the stand-in seeing two starts and the second answer coming later.
        docker = DockerStandIn(self)
        environment = self.environment(docker, "4")
        began = time.monotonic()
        first = self.ask(environment)
        self.wait_for_a_start(docker)
        second = self.ask(environment)
        gaps = [self.answer_of(first), self.answer_of(second)]
        self.assertIn("tried to start Docker Desktop", gaps[0])
        self.assertEqual(gaps[1], gaps[0])
        self.assertEqual(len(docker.starts()), 1)
        self.assertLess(time.monotonic() - began, 4 + 4 + 20, "the second process waited again")

    def test_a_start_whose_process_died_is_started_again_by_the_next_process_that_asks(self):
        # decision: D-390 "In one run of the gate, whichever of its processes need a daemon, Docker Desktop is started at most once: a test that asks for a daemon while a start begun by another process of the run has not finished waits for that start, within its limit, and starts none of its own; where the process that began the start ended before it finished, the next test to ask starts Docker Desktop again"
        # Breaking it: leave the start marked for good when its process dies and the second
        # process waits for a start that nobody is making, until the test's own time limit.
        docker = DockerStandIn(self, rise_after_polls=8)
        environment = self.environment(docker, "60")
        first = self.ask(environment)
        self.wait_for_a_start(docker)
        first.kill()
        first.communicate()
        second = self.ask(environment)
        self.assertEqual(self.answer_of(second), "None")
        self.assertEqual(len(docker.starts()), 2)


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
        return self.gate.run(
            environment=docker.environment(LOOP2_DOCKER_START_LIMIT=limit), timeout=120
        )

    def test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once(self):
        # invariant: gate-docker-start-waits-once
        # decision: D-390 "A test of the gate that needs a Docker daemon, finding none answering on a computer that has Docker Desktop, starts Docker Desktop and waits until a daemon answers, for at most 3 minutes, in a run of the whole gate"
        # decision: D-390 "The test is skipped only when no daemon has answered by then, and its message says that the start was tried and did not finish and what stays unchecked"
        # decision: D-406 "A run of the gate with the directories at the same time starts Docker Desktop at most once and waits for it at most once"
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
        # decision: D-390 "A test of the gate that needs a Docker daemon, finding none answering on a computer that has Docker Desktop, starts Docker Desktop and waits until a daemon answers, for at most 3 minutes, in a run of the whole gate"
        # decision: D-390 "In one run of the gate, whichever of its processes need a daemon, Docker Desktop is started at most once"
        # decision: D-391 "The Docker Desktop that the gate started stays running after the run"
        # decision: D-406 "A run of the gate with the directories at the same time starts Docker Desktop at most once and waits for it at most once"
        # Breaking it: let the directories' processes, running at the same time, each find no
        # daemon and no record and start Docker Desktop, the stand-in seeing two starts.
        docker = DockerStandIn(self, rise_after_polls=1)
        result = self.run_whole(docker, limit="30")
        output = result.stdout + result.stderr
        self.assertEqual(result.returncode, 0, output)
        self.assertEqual(len(docker.starts()), 1, output)
        self.assertEqual(docker.stops(), [], output)
        self.assertEqual(skipped_lines(output), [], output)

    def test_a_whole_run_on_a_computer_without_docker_desktop_skips_at_once(self):
        # decision: D-390 "On a computer with no Docker Desktop, such as one running Linux or a container in a cloud, the test is skipped at once"
        docker = DockerStandIn(self, plugin=False)
        began = time.monotonic()
        result = self.run_whole(docker, limit="120")
        output = result.stdout + result.stderr
        self.assertEqual(result.returncode, 0, output)
        self.assertEqual(docker.starts(), [], output)
        self.assertEqual(len(skipped_lines(output)), 2, output)
        self.assertLess(time.monotonic() - began, 100)

    def test_a_whole_run_on_a_computer_without_docker_desktop_but_with_a_daemon_skips_nothing(self):
        # decision: D-390 "On a computer with no Docker Desktop, such as one running Linux or a container in a cloud, the test is skipped at once where no daemon answers, with a message that says what stays unchecked, and runs where a daemon answers"
        docker = DockerStandIn(self, answers=True, plugin=False)
        result = self.run_whole(docker, limit="120")
        output = result.stdout + result.stderr
        self.assertEqual(result.returncode, 0, output)
        self.assertEqual(docker.starts(), [], output)
        self.assertEqual(skipped_lines(output), [], output)

    def test_one_selected_test_file_starts_a_stopped_docker_desktop_too(self):
        # decision: D-390 "A test of the gate that needs a Docker daemon, finding none answering on a computer that has Docker Desktop, starts Docker Desktop and waits until a daemon answers, for at most 3 minutes, in a run of the whole gate and in a run of one test file alike"
        docker = DockerStandIn(self, rise_after_polls=1)
        self.write_needing_docker("one")
        result = self.gate.run(
            "tests/one/test_needs_docker.py",
            environment=docker.environment(LOOP2_DOCKER_START_LIMIT="30"),
        )
        output = result.stdout + result.stderr
        self.assertEqual(result.returncode, 0, output)
        self.assertEqual(len(docker.starts()), 1, output)
        self.assertEqual(skipped_lines(output), [], output)


if __name__ == "__main__":
    unittest.main()
