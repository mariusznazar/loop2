"""The deployment script from the checkout to the build (spec § 5, steps 7–9 and 12).

- the installed script compared with the checked-out `deploy/loop2-deploy`: a difference is a
  warning, with the rollback wording, and the run goes on with the installed copy; a commit
  without the script's source is a warning too, never a crash, and such a commit (it has no
  `compose.yaml` either) fails at the build with exit 7;
- the resource gate before any build: `MemAvailable` at least 1024 MiB and at least 4 GiB free on
  the filesystem of Docker's root directory, that one field read from `docker info`; both values
  logged on every run; below either, or unreadable, exit 5 and no `docker compose` at all;
- the build: `docker compose --project-name loop2 -f <checkout>/compose.yaml build app` with
  `LOOP2_COMMIT` set to the commit; a failure gives exit 7 and never calls `up`; `MemAvailable`
  logged again after a build;
- the old game's container state logged after a failed build.
"""

import unittest

import deploy_script_support as support

MIB_KB = 1024
GIB_KB = 1024 * 1024
MEMINFO = "MemTotal:        4456448 kB\nMemFree:          200000 kB\nMemAvailable: {kb:>12} kB\n"


class DeployBuildTestCase(unittest.TestCase):

    def setUp(self):
        self.fixture = support.DeployFixture()
        self.addCleanup(self.fixture.remove)

    def set_mem_available_kb(self, kb):
        support.write_bytes(self.fixture.meminfo, MEMINFO.format(kb=kb).encode())

    def deploy(self, sha):
        return self.fixture.run(ssh_original_command=sha)

    def compose_calls(self, result, subcommand):
        return [call for call in result.calls["docker"]
                if call[:1] == ["compose"] and subcommand in call]

    def log_lines(self):
        return self.fixture.log_text().splitlines()

    def index_of(self, needle, lines=None):
        lines = self.log_lines() if lines is None else lines
        found = [number for number, line in enumerate(lines) if needle in line]
        self.assertTrue(found, f"no log line holds {needle!r}:\n" + "\n".join(lines))
        return found[0]


class InstalledScriptComparison(DeployBuildTestCase):

    def test_installed_copy_equal_to_the_source_gives_no_warning(self):
        sha = self.fixture.deployable_commit()
        self.fixture.install()
        self.fixture.answer_passing_run()
        result = self.deploy(sha)
        self.assertEqual(result.code, 0, result)
        self.assertNotIn("warning", result.output)

    def test_difference_warns_with_the_rollback_wording_and_continues(self):
        sha = self.fixture.deployable_commit()
        self.fixture.install(support.read_bytes(support.SCRIPT) + b"# a line only installed\n")
        self.fixture.answer_passing_run()
        result = self.deploy(sha)
        self.assertEqual(result.code, 0, result)
        warning = [line for line in result.stdout.splitlines() if "warning" in line]
        self.assertEqual(len(warning), 1, result)
        self.assertIn("differs", warning[0])
        self.assertIn(sha, warning[0])
        self.assertIn("reinstall", warning[0])
        self.assertIn("rollback", warning[0])
        self.assertIn(warning[0], self.fixture.log_text())
        self.assertEqual(len(self.compose_calls(result, "build")), 1, result)
        self.assertLess(self.index_of("differs"), self.index_of("build of"))

    def test_commit_without_the_script_warns_then_fails_the_build_with_7(self):
        sha = self.fixture.commit("main", "from before the deployment existed")
        self.fixture.install()
        self.fixture.answer_passing_run()
        result = self.deploy(sha)
        self.assertEqual(result.code, 7, result)
        warning = [line for line in result.stdout.splitlines() if "warning" in line]
        self.assertEqual(len(warning), 1, result)
        self.assertIn("deploy/loop2-deploy", warning[0])
        self.assertIn("missing", warning[0])
        self.assertEqual(self.compose_calls(result, "up"), [], result)
        self.assertIn("build", self.log_lines()[-1])
        self.assertIn("(exit 7)", self.log_lines()[-1])


class ResourceGate(DeployBuildTestCase):

    def assert_gate_refused(self, result):
        self.assertEqual(result.code, 5, result)
        self.assertEqual([c for c in result.calls["docker"] if c[:1] == ["compose"]], [], result)
        last = self.log_lines()[-1]
        self.assertIn("(exit 5)", last)
        self.assertIn("resource", last)

    def resources_line(self):
        return self.log_lines()[self.index_of("MemAvailable")]

    def test_memory_below_1024_mib_exits_5_without_a_build(self):
        sha = self.fixture.deployable_commit()
        self.fixture.install()
        self.set_mem_available_kb(1024 * MIB_KB - 1)
        self.fixture.answer_passing_run()
        result = self.deploy(sha)
        self.assert_gate_refused(result)
        line = self.resources_line()
        self.assertIn("MemAvailable 1023 MiB", line)
        self.assertIn(f"{22 * 1024} MiB", line, "the disk value is not logged on a refusal")

    def test_disk_below_4_gib_exits_5_without_a_build(self):
        sha = self.fixture.deployable_commit()
        self.fixture.install()
        self.fixture.answer("df", stdout=f"Avail\n{4 * GIB_KB - 1}\n")
        self.fixture.answer_passing_run()
        result = self.deploy(sha)
        self.assert_gate_refused(result)
        line = self.resources_line()
        self.assertIn("4095 MiB", line)
        self.assertIn("MemAvailable 3700 MiB", line, "the memory value is not logged on a refusal")

    def test_exact_thresholds_pass(self):
        sha = self.fixture.deployable_commit()
        self.fixture.install()
        self.set_mem_available_kb(1024 * MIB_KB)
        self.fixture.answer("df", stdout=f"Avail\n{4 * GIB_KB}\n")
        self.fixture.answer_passing_run()
        result = self.deploy(sha)
        self.assertEqual(result.code, 0, result)

    def test_both_values_logged_on_a_pass_and_docker_info_read_as_one_field(self):
        sha = self.fixture.deployable_commit()
        self.fixture.install()
        self.fixture.answer_passing_run()
        result = self.deploy(sha)
        self.assertEqual(result.code, 0, result)
        line = self.resources_line()
        self.assertIn("MemAvailable 3700 MiB", line)
        self.assertIn(f"{22 * 1024} MiB", line)
        self.assertIn(line, result.stdout)
        infos = [c for c in result.calls["docker"] if c[:1] == ["info"]]
        self.assertEqual(infos, [["info", "--format", "{{.DockerRootDir}}"]], result)
        self.assertEqual(len(result.calls["df"]), 1, result)
        self.assertEqual(result.calls["df"][0][-1], support.DOCKER_ROOT, result)
        self.assertLess(self.index_of("MemAvailable"), self.index_of("build of"))

    def test_unreadable_values_exit_5(self):
        cases = {
            "docker info fails": lambda: self.fixture.answer("docker", exit_code=1,
                                                             match="info *"),
            "docker root not a path": lambda: self.fixture.answer("docker", stdout="\n",
                                                                  match="info *"),
            "df fails": lambda: self.fixture.answer("df", exit_code=1),
            "df not a number": lambda: self.fixture.answer("df", stdout="Avail\n12G\n"),
            "no MemAvailable": lambda: support.write_bytes(self.fixture.meminfo,
                                                           b"MemTotal: 4456448 kB\n"),
        }
        for name, make_unreadable in cases.items():
            with self.subTest(case=name):
                self.fixture = support.DeployFixture()
                self.addCleanup(self.fixture.remove)
                sha = self.fixture.deployable_commit()
                self.fixture.install()
                make_unreadable()
                self.fixture.answer_passing_run()
                result = self.deploy(sha)
                self.assert_gate_refused(result)
                self.assertIn("MemAvailable", self.fixture.log_text())

    def test_memavailable_logged_again_after_the_build(self):
        sha = self.fixture.deployable_commit()
        self.fixture.install()
        self.fixture.answer_passing_run()
        result = self.deploy(sha)
        self.assertEqual(result.code, 0, result)
        lines = self.log_lines()
        after_build = lines[self.index_of("build of"):]
        self.assertTrue(any("MemAvailable" in line for line in after_build), lines)


class Build(DeployBuildTestCase):

    def test_build_command_and_commit(self):
        sha = self.fixture.deployable_commit()
        self.fixture.install()
        self.fixture.answer_passing_run()
        result = self.deploy(sha)
        self.assertEqual(result.code, 0, result)
        compose_file = support.shell_path(self.fixture.checkout) + "/compose.yaml"
        builds = [(call, env) for call, env in result.calls_with_env("docker")
                  if call[:1] == ["compose"] and "build" in call]
        self.assertEqual(builds, [(["compose", "--project-name", "loop2", "-f", compose_file,
                                    "build", "app"], sha)], result)
        docker = result.calls["docker"]
        self.assertLess(docker.index(builds[0][0]), docker.index(self.compose_calls(result,
                                                                                    "up")[0]))

    def test_failed_build_exits_7_never_calls_up_and_logs_the_old_game(self):
        sha = self.fixture.deployable_commit()
        self.fixture.install()
        self.fixture.answer("docker", exit_code=1, stdout="#9 ERROR: npm run typecheck\n",
                            match="compose * build *")
        self.fixture.answer_passing_run()
        result = self.deploy(sha)
        self.assertEqual(result.code, 7, result)
        self.assertEqual(len(self.compose_calls(result, "build")), 1, result)
        self.assertEqual(self.compose_calls(result, "up"), [], result)
        self.assertEqual(result.calls["curl"], [], result)
        self.assertEqual([c for c in result.calls["docker"] if "prune" in c], [], result)
        lines = self.log_lines()
        self.assertIn("(exit 7)", lines[-1])
        self.assertIn("build", lines[-1])
        old_game = self.index_of("old game")
        self.assertIn("loop running healthy", lines[old_game])
        self.assertLess(self.index_of("MemAvailable"), old_game)
        self.assertIn(lines[old_game], result.stdout)
        # Docker's own output goes to the log file only.
        self.assertIn("npm run typecheck", self.fixture.log_text())
        self.assertNotIn("npm run typecheck", result.output)


if __name__ == "__main__":
    unittest.main()
