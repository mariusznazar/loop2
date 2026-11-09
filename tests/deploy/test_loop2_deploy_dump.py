"""The dump of the log of both loop2 services in the deployment script (decision D-355, invariant
loop2-deploy-log-dump).

- after the build and before `up --force-recreate` removes the containers, the script appends one
  header line and then the whole output of `docker compose ... logs --no-color --timestamps app
  cloudflared` (no `--tail`) to the dump file;
- the header holds the time, `loop2-deploy` and the two commit names, nothing else;
- the deploy log (which reaches the GitHub Actions log) and the console get one `dump:` line with
  the size of the dump file before and after, never any dumped content; Docker's standard error
  goes to the deploy log file alone;
- a dump that fails (Docker exits non-zero, the file cannot be written, `timeout` cuts a stuck
  Docker) gives one `warning:` line naming the file and the exit status, and the deployment goes
  on to `up` and ends 0;
- a deployment that stops before `up` dumps nothing.

Docker is a recording stand-in: what it prints and its exit status are the test's, so these tests
prove the script's reactions, not what Docker's `logs` really returns.
"""

import os
import re
import time
import unittest

import deploy_script_support as support

PREVIOUS = "0123456789abcdef0123456789abcdef01234567"
# What the stand-in `docker compose logs` prints; the markers must reach the dump file and nowhere
# else.
APP_LINE = "loop2  | 2026-11-08T10:00:00.000000000Z STAND-IN-APP-LINE"
TUNNEL_LINE = "loop2-cloudflared  | 2026-11-08T10:00:01.000000000Z STAND-IN-TUNNEL-LINE"
LOGS_OUTPUT = APP_LINE + "\n" + TUNNEL_LINE + "\n"
ERROR_MARKER = "STAND-IN-DOCKER-ERROR"
OLDER_CONTENT = "an earlier generation's line\n"
LOGS_PATTERN = "compose * logs *"
TIMESTAMP = r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z"


class DumpTestCase(unittest.TestCase):

    def setUp(self):
        self.fixture = support.DeployFixture()
        self.addCleanup(self.fixture.remove)
        self.sha = self.fixture.deployable_commit()
        self.fixture.install()

    def fresh_fixture(self):
        self.fixture = support.DeployFixture()
        self.addCleanup(self.fixture.remove)
        self.sha = self.fixture.deployable_commit()
        self.fixture.install()

    def deploy(self, running=PREVIOUS):
        self.fixture.answer_passing_run(running=running)
        return self.fixture.run(ssh_original_command=self.sha)

    def compose_calls(self, result, subcommand):
        return [call for call in result.calls["docker"]
                if call[:1] == ["compose"] and subcommand in call]

    def dump_calls(self, result):
        return self.compose_calls(result, "logs")

    def log_lines(self):
        return self.fixture.log_text().splitlines()

    def index_of(self, needle):
        found = [number for number, line in enumerate(self.log_lines()) if needle in line]
        self.assertTrue(found, f"no log line holds {needle!r}")
        return found[0]

    def dump_text(self):
        self.assertTrue(os.path.exists(self.fixture.dump_file), "the dump file was not written")
        return support.read_bytes(self.fixture.dump_file).decode("utf-8")

    def warning_lines(self, result):
        return [line for line in result.stdout.splitlines() if "warning" in line]

    def assert_marker_nowhere_but_in_the_dump(self, result):
        for marker in ("STAND-IN-APP-LINE", "STAND-IN-TUNNEL-LINE"):
            self.assertNotIn(marker, result.output)
            self.assertNotIn(marker, self.fixture.log_text())


class Dump(DumpTestCase):

    def test_a_deployment_appends_the_log_of_the_containers_it_replaces(self):
        # invariant: loop2-deploy-log-dump
        support.write_bytes(self.fixture.dump_file, OLDER_CONTENT.encode())
        self.fixture.answer("docker", stdout=LOGS_OUTPUT, match=LOGS_PATTERN)
        result = self.deploy()
        self.assertEqual(result.code, 0, result)
        compose_file = support.shell_path(self.fixture.checkout) + "/compose.yaml"
        self.assertEqual(self.dump_calls(result), [
            ["compose", "--project-name", "loop2", "-f", compose_file, "logs", "--no-color",
             "--timestamps", "app", "cloudflared"]], result)
        docker = result.calls["docker"]
        build = self.compose_calls(result, "build")[0]
        up = self.compose_calls(result, "up")[0]
        dump = self.dump_calls(result)[0]
        self.assertLess(docker.index(build), docker.index(dump))
        self.assertLess(docker.index(dump), docker.index(up))
        lines = self.dump_text().splitlines()
        self.assertEqual(lines[0], OLDER_CONTENT.strip(), "the dump replaced the file's content")
        self.assertRegex(lines[1], f"^{TIMESTAMP} loop2-deploy \\| previous commit {PREVIOUS}, "
                                   f"new commit {self.sha}$")
        self.assertEqual(lines[2:], [APP_LINE, TUNNEL_LINE])

    def test_the_header_of_a_first_deployment_names_no_previous_commit(self):
        self.fixture.answer("docker", stdout=LOGS_OUTPUT, match=LOGS_PATTERN)
        result = self.deploy(running=None)
        self.assertEqual(result.code, 0, result)
        lines = self.dump_text().splitlines()
        self.assertRegex(lines[0], f"^{TIMESTAMP} loop2-deploy \\| previous commit none, "
                                   f"new commit {self.sha}$")
        self.assertEqual(lines[1:], [APP_LINE, TUNNEL_LINE])

    def test_the_deploy_log_gets_byte_counts_and_no_content(self):
        support.write_bytes(self.fixture.dump_file, OLDER_CONTENT.encode())
        self.fixture.answer("docker", stdout=LOGS_OUTPUT, match=LOGS_PATTERN)
        result = self.deploy()
        self.assertEqual(result.code, 0, result)
        lines = self.log_lines()
        dump_lines = [line for line in lines if "loop2-deploy: dump:" in line]
        self.assertEqual(len(dump_lines), 1, lines)
        counts = re.search(r"from (\d+) to (\d+) bytes", dump_lines[0])
        self.assertIsNotNone(counts, dump_lines[0])
        self.assertEqual(int(counts.group(1)), len(OLDER_CONTENT.encode()))
        self.assertEqual(int(counts.group(2)), len(support.read_bytes(self.fixture.dump_file)))
        self.assertGreater(int(counts.group(2)), len(OLDER_CONTENT.encode()) + len(LOGS_OUTPUT))
        self.assertIn(os.path.basename(self.fixture.dump_file), dump_lines[0])
        self.assertIn(dump_lines[0], result.stdout)
        position = lines.index(dump_lines[0])
        self.assertGreater(position, self.index_of("build of"))
        self.assertLess(position, self.index_of("switch:"))
        self.assert_marker_nowhere_but_in_the_dump(result)
        self.assertEqual(self.warning_lines(result), [], result)

    def test_docker_standard_error_goes_to_the_deploy_log_file_only(self):
        self.fixture.answer("docker", stdout=LOGS_OUTPUT, stderr=ERROR_MARKER + "\n",
                            match=LOGS_PATTERN)
        result = self.deploy()
        self.assertEqual(result.code, 0, result)
        self.assertIn(ERROR_MARKER, self.fixture.log_text())
        self.assertNotIn(ERROR_MARKER, result.output)
        self.assertNotIn(ERROR_MARKER, self.dump_text())


class FailedDump(DumpTestCase):

    def assert_warned_and_went_on(self, result, exit_status):
        self.assertEqual(result.code, 0, result)
        warning = self.warning_lines(result)
        self.assertEqual(len(warning), 1, result)
        self.assertIn(os.path.basename(self.fixture.dump_file), warning[0])
        self.assertIn(f"exit {exit_status}", warning[0])
        self.assertIn(warning[0], self.fixture.log_text())
        self.assertNotIn("loop2-deploy: dump:", self.fixture.log_text())
        self.assertEqual(len(self.compose_calls(result, "up")), 1, result)
        self.assertTrue(self.log_lines()[-1].endswith(f"deployed {self.sha}, previously "
                                                      f"{PREVIOUS}"), self.log_lines()[-1])
        self.assert_marker_nowhere_but_in_the_dump(result)

    def test_a_failing_dump_warns_and_the_deployment_still_starts_the_containers(self):
        # invariant: loop2-deploy-log-dump
        self.fixture.answer("docker", exit_code=3, stdout=LOGS_OUTPUT, stderr=ERROR_MARKER + "\n",
                            match=LOGS_PATTERN)
        result = self.deploy()
        self.assert_warned_and_went_on(result, 3)
        docker = result.calls["docker"]
        self.assertLess(docker.index(self.dump_calls(result)[0]),
                        docker.index(self.compose_calls(result, "up")[0]))
        self.assertIn(ERROR_MARKER, self.fixture.log_text())
        self.assertNotIn(ERROR_MARKER, result.output)

    def test_a_dump_file_that_cannot_be_written_warns_and_the_deployment_goes_on(self):
        missing = os.path.join(self.fixture.root, "no-such-directory", "loop2-app.log")
        self.fixture.write_copy(DUMP_FILE=support.shell_path(missing))
        self.fixture.answer("docker", stdout=LOGS_OUTPUT, match=LOGS_PATTERN)
        result = self.deploy()
        self.assertEqual(result.code, 0, result)
        warning = self.warning_lines(result)
        self.assertEqual(len(warning), 1, result)
        self.assertIn("no-such-directory/loop2-app.log", warning[0])
        self.assertIn("exit 1", warning[0])
        self.assertEqual(len(self.compose_calls(result, "up")), 1, result)
        self.assertFalse(os.path.exists(missing))
        self.assertNotIn("STAND-IN", result.output + self.fixture.log_text())

    def test_a_stuck_docker_is_cut_off_by_the_time_limit_and_the_deployment_goes_on(self):
        self.fixture.write_copy(DUMP_TIMEOUT_SECONDS="1")
        self.fixture.answer("docker", stdout=LOGS_OUTPUT, hang_seconds=30, match=LOGS_PATTERN)
        started = time.monotonic()
        result = self.deploy()
        self.assertLess(time.monotonic() - started, 25, "the dump was not cut off")
        self.assert_warned_and_went_on(result, 124)


class NothingDumpedBeforeAStop(DumpTestCase):

    def test_a_deployment_that_stops_before_up_dumps_nothing(self):
        stops = {
            "a failed build": (7, lambda: self.fixture.answer("docker", exit_code=1,
                                                              match="compose * build *")),
            "too little memory": (5, lambda: support.write_bytes(
                self.fixture.meminfo, b"MemTotal: 4456448 kB\nMemAvailable: 524288 kB\n")),
            "a held lock": (4, lambda: self.fixture.answer("flock", exit_code=1)),
        }
        for name, (code, make_stop) in stops.items():
            with self.subTest(stop=name):
                self.fresh_fixture()
                self.fixture.answer("docker", stdout=LOGS_OUTPUT, match=LOGS_PATTERN)
                make_stop()
                result = self.deploy()
                self.assertEqual(result.code, code, result)
                self.assertEqual(self.dump_calls(result), [], result)
                self.assertFalse(os.path.exists(self.fixture.dump_file))
                self.assertNotIn("dump:", self.fixture.log_text())

    def test_a_commit_of_no_accepted_branch_dumps_nothing(self):
        feature = self.fixture.commit("feature", "only on feature", parent=self.fixture.first)
        self.fixture.answer("docker", stdout=LOGS_OUTPUT, match=LOGS_PATTERN)
        self.fixture.answer_passing_run(running=PREVIOUS)
        result = self.fixture.run(ssh_original_command=feature)
        self.assertEqual(result.code, 3, result)
        self.assertEqual(self.dump_calls(result), [], result)
        self.assertFalse(os.path.exists(self.fixture.dump_file))


if __name__ == "__main__":
    unittest.main()
