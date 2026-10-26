"""The deployment script from the switch to its end (spec § 5, steps 10–13, "Never").

- the switch: `docker compose --project-name loop2 -f <checkout>/compose.yaml up -d --no-build
  --no-deps --remove-orphans --force-recreate --wait --wait-timeout 120 app cloudflared`; a container that does not become
  healthy gives exit 8, the last container log lines in the log file and the restore line naming
  the previous commit;
- the internal Node HTTP probe of 127.0.0.1:3000: `/` must answer 200 and an unknown `/api/` path a JSON 404,
  else exit 8 with the same restore line;
- the old game's container: its name, status and health logged after the build stage, on
  success and after exit 8, never its port;
- on success only, a prune of the dangling images labelled `org.opencontainers.image.title=loop2`,
  then "deployed <sha>, previously <sha>" and exit 0; a repeated deployment of the running commit
  succeeds;
- never in the output: the whole of `docker info`, `hostname` or `uname -n`; never a command with
  `down`, another Compose project or an unfiltered prune.
"""

import socket
import unittest

import deploy_script_support as support

PREVIOUS = "0123456789abcdef0123456789abcdef01234567"
PRUNE = ["image", "prune", "--force", "--filter", "label=org.opencontainers.image.title=loop2"]
WHOLE_DOCKER_INFO = ("Client:\n Version: 28.1.1\nServer:\n Name: " + support.SENTINEL_HOST
                     + "\n Docker Root Dir: /var/lib/docker\n")


class DeploySwitchTestCase(unittest.TestCase):

    def setUp(self):
        self.fixture = support.DeployFixture()
        self.addCleanup(self.fixture.remove)
        self.sha = self.fixture.deployable_commit()
        self.fixture.install()

    def deploy(self, running=PREVIOUS):
        """A forced-path run of the deployable commit, after any rule the test gave first."""
        self.fixture.answer_passing_run(running=running)
        # Any other `docker info` gets the whole of it, which must never reach the output.
        self.fixture.answer("docker", stdout=WHOLE_DOCKER_INFO, match="info*")
        return self.fixture.run(ssh_original_command=self.sha)

    def compose_calls(self, result, subcommand):
        return [call for call in result.calls["docker"]
                if call[:1] == ["compose"] and subcommand in call]

    def log_lines(self):
        return self.fixture.log_text().splitlines()

    def index_of(self, needle):
        lines = self.log_lines()
        found = [number for number, line in enumerate(lines) if needle in line]
        self.assertTrue(found, f"no log line holds {needle!r}:\n" + "\n".join(lines))
        return found[0]

    def restore_line(self, previous=PREVIOUS):
        return (f"previously running commit: {previous}; to restore run loop2-deploy {previous} "
                "on the server")

    def assert_old_game_logged_after_the_build(self, result):
        old_game = self.index_of("old game")
        line = self.log_lines()[old_game]
        self.assertIn("loop running healthy", line)
        self.assertLess(self.index_of("build of"), old_game)
        self.assertIn(line, result.stdout)
        reads = [c for c in result.calls["docker"] if c[-1:] == ["loop"]]
        self.assertEqual(len(reads), 1, result)
        self.assertEqual(reads[0][:3], ["inspect", "--type", "container"])
        self.assertNotIn("Port", " ".join(reads[0]))
        self.assertNotIn("NetworkSettings", " ".join(reads[0]))

    def assert_failed_start(self, result):
        self.assertEqual(result.code, 8, result)
        self.assertIn(self.restore_line(), result.stdout)
        self.assertIn("Cloudflare route", result.stdout)
        self.assertIn(self.restore_line(), self.fixture.log_text())
        self.assertIn("(exit 8)", self.log_lines()[-1])
        self.assertEqual([c for c in result.calls["docker"] if "prune" in c], [], result)
        self.assertNotIn("deployed", self.fixture.log_text())
        self.assert_old_game_logged_after_the_build(result)


class Success(DeploySwitchTestCase):

    def test_switch_probe_prune_and_last_line(self):
        result = self.deploy()
        self.assertEqual(result.code, 0, result)
        compose_file = support.shell_path(self.fixture.checkout) + "/compose.yaml"
        self.assertEqual(self.compose_calls(result, "up"), [
            ["compose", "--project-name", "loop2", "-f", compose_file, "up", "-d", "--no-build",
             "--no-deps", "--remove-orphans", "--force-recreate", "--wait", "--wait-timeout",
             "120", "app", "cloudflared"]], result)
        probes = [call for call in result.calls["docker"] if call[:1] == ["exec"]]
        self.assertEqual(len(probes), 1, result)
        self.assertEqual(probes[0][:4], ["exec", "loop2", "node", "-e"], result)
        self.assertEqual(result.calls["curl"], [], result)
        docker = result.calls["docker"]
        prunes = [c for c in docker if "prune" in c]
        self.assertEqual(prunes, [PRUNE], result)
        self.assertGreater(docker.index(PRUNE), docker.index(self.compose_calls(result, "up")[0]))
        last = self.log_lines()[-1]
        self.assertTrue(last.endswith(f"deployed {self.sha}, previously {PREVIOUS}"), last)
        self.assertIn(last, result.stdout)
        self.assert_old_game_logged_after_the_build(result)

    def test_first_deployment_names_no_previous_commit(self):
        result = self.deploy(running=None)
        self.assertEqual(result.code, 0, result)
        self.assertTrue(self.log_lines()[-1].endswith(f"deployed {self.sha}, previously none"))

    def test_repeated_deployment_of_the_running_commit_succeeds(self):
        result = self.deploy(running=self.sha)
        self.assertEqual(result.code, 0, result)
        self.assertTrue(self.log_lines()[-1].endswith(f"deployed {self.sha}, previously "
                                                      f"{self.sha}"))
        self.assertEqual(len(self.compose_calls(result, "build")), 1, result)
        self.assertEqual(len(self.compose_calls(result, "up")), 1, result)

    def test_old_game_not_found_is_logged_and_the_deployment_still_succeeds(self):
        self.fixture.answer("docker", exit_code=1, stdout="Error: No such container: loop\n",
                            match="inspect --type container * loop")
        result = self.deploy()
        self.assertEqual(result.code, 0, result)
        line = self.log_lines()[self.index_of("old game")]
        self.assertIn("not found", line)
        self.assertNotIn("Error", result.output)

    def test_failed_prune_is_a_warning_not_a_failure(self):
        self.fixture.answer("docker", exit_code=1, match="image prune *")
        result = self.deploy()
        self.assertEqual(result.code, 0, result)
        self.assertIn("prune", " ".join(l for l in self.log_lines() if "warning" in l))
        self.assertIn(f"deployed {self.sha}", self.log_lines()[-1])


class FailedStart(DeploySwitchTestCase):

    def test_failed_health_wait_exits_8_with_the_restore_line_and_container_logs(self):
        for failure in ("container loop2 is unhealthy",
                        "container loop2-cloudflared is unhealthy", "secret file is missing"):
            with self.subTest(failure=failure):
                self.fixture = support.DeployFixture()
                self.addCleanup(self.fixture.remove)
                self.sha = self.fixture.deployable_commit()
                self.fixture.install()
                self.fixture.answer("docker", exit_code=1, stdout=failure + "\n",
                                    match="compose * up *")
                self.fixture.answer("docker", stdout="LAST-CONTAINER-LINE listening failed\n",
                                    match="compose * logs *")
                result = self.deploy()
                self.assert_failed_start(result)
                self.assertEqual([c for c in result.calls["docker"] if c[:1] == ["exec"]], [], result)
                logs = self.compose_calls(result, "logs")
                self.assertEqual(len(logs), 1, result)
                self.assertEqual(logs[0][:5], ["compose", "--project-name", "loop2", "-f",
                                               support.shell_path(self.fixture.checkout)
                                               + "/compose.yaml"])
                self.assertEqual(logs[0][-2:], ["app", "cloudflared"])
                self.assertIn("LAST-CONTAINER-LINE", self.fixture.log_text())
                self.assertNotIn("LAST-CONTAINER-LINE", result.output)
                self.assertNotIn("unhealthy", result.output)

    def test_failed_probe_exits_8_with_the_restore_line(self):
        cases = {
            "root not 200": (0, "502 text/html\n404 application/json"),
            "api path not 404": (0, "200 text/html\n200 text/html"),
            "api 404 not JSON": (0, "200 text/html\n404 text/html"),
            "api 404 another subtype": (0, "200 text/html\n404 application/jsonp"),
            "exec or HTTP fails": (1, ""),
            "exec times out": (124, ""),
        }
        for name, (exit_code, answer) in cases.items():
            with self.subTest(case=name):
                self.fixture = support.DeployFixture()
                self.addCleanup(self.fixture.remove)
                self.sha = self.fixture.deployable_commit()
                self.fixture.install()
                self.fixture.answer("docker", exit_code=exit_code, stdout=answer,
                                    match="exec loop2 node -e *")
                result = self.deploy()
                self.assert_failed_start(result)
                self.assertIn("probe", self.log_lines()[-1])

    def test_failed_start_without_a_previous_commit_says_none_existed(self):
        self.fixture.answer("docker", exit_code=1, match="compose * up *")
        result = self.deploy(running=None)
        self.assertEqual(result.code, 8, result)
        self.assertIn("previously running commit: none", result.stdout)
        self.assertNotIn("loop2-deploy none", result.stdout)


class NeverInTheOutputOrTheCommands(DeploySwitchTestCase):

    def runs(self):
        """A success, a failed build, a failed start and a failed probe."""
        results = [self.deploy()]
        for rule in (("docker", 1, "compose * build *"), ("docker", 1, "compose * up *"),
                     ("docker", 0, "exec loop2 node -e *")):
            self.fixture = support.DeployFixture()
            self.addCleanup(self.fixture.remove)
            self.sha = self.fixture.deployable_commit()
            self.fixture.install()
            tool, code, match = rule
            self.fixture.answer(tool, exit_code=code, stdout="500 text/html", match=match)
            results.append(self.deploy())
        self.assertEqual([r.code for r in results], [0, 7, 8, 8], results)
        return results

    def test_no_whole_docker_info_hostname_or_uname(self):
        real_name = socket.gethostname()
        for result in self.runs():
            self.assertEqual(result.calls["hostname"] + result.calls["uname"], [], result)
            infos = [c for c in result.calls["docker"] if c[:1] == ["info"]]
            self.assertEqual(infos, [["info", "--format", "{{.DockerRootDir}}"]], result)
            self.assertNotIn(support.SENTINEL_HOST, result.output)
            self.assertNotIn("Server:", result.output)
            if real_name:
                self.assertNotIn(real_name, result.output)

    def test_no_down_no_other_project_no_unfiltered_prune(self):
        compose_file = support.shell_path(self.fixture.checkout)
        for result in self.runs():
            for call in result.calls["docker"]:
                with self.subTest(call=call):
                    self.assertNotIn("down", call)
                    self.assertNotIn("-p", call)
                    if call[:1] == ["compose"]:
                        self.assertEqual(call[1:3], ["--project-name", "loop2"])
                        self.assertEqual(call[3], "-f")
                        self.assertTrue(call[4].endswith("/srv/loop2/compose.yaml"), call)
                    if "prune" in call:
                        self.assertEqual(call, PRUNE)
                    if "loop" in call:
                        self.assertEqual(call[:3], ["inspect", "--type", "container"])
                    self.assertNotIn("system", call)
                    self.assertNotIn("builder", call)
        self.assertTrue(compose_file.endswith("/srv/loop2"))


if __name__ == "__main__":
    unittest.main()
