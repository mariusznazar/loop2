"""The nightly backup script `deploy/loop2-backup` and its schedule (D-224, D-225, D-226, D-227).

The script runs as a black box through the seam of `backup_script_support.py`. Its refusals to
send and its notice have their own tests, those of the invariants account-save-backup-encrypted and
account-save-backup-failure-notice; here stand the order of its steps, what it hands each tool,
what its log holds and leaves out, and the schedule read as cron reads it. The stand-ins prove the
script's reactions, not that Strych or `pusher` accept them (D-229).
"""

import os
import re
import unittest

import backup_script_support as support

SENTINEL_LOGIN = "sentinel-login-3f9a"
# The notice as the owner settled it, on 2026-10-31 through the cycle's orchestrator.
NOTICE_BYTES = b"Kopia bazy loop2 nie uda\xc5\x82a si\xc4\x99.\n"
# Options of rsync that delete on the receiving side, or leave a broken file in place of the older
# backup (rsync manual, options summary, the commit D-224 cites).
DELETING = re.compile(r"^--(del|delete.*|remove-source-files|max-delete.*|force|prune-empty-dirs)$")
IN_PLACE = {"--inplace", "--partial", "--append", "--append-verify"}
LISTING = {"--list-only"}


def split_rsync(arguments):
    """(options, the other words) of an rsync call."""
    return ([a for a in arguments if a.startswith("-")],
            [a for a in arguments if not a.startswith("-")])


def ssh_options(arguments):
    """{name: value} of the `-o` options of rsync's remote shell, and its first word."""
    command = next(a for a in arguments if a.startswith("--rsh=")).removeprefix("--rsh=").split()
    pairs = dict(word.split("=", 1) for word in command[1:] if word != "-o")
    return command[0], pairs


class WithFixture(unittest.TestCase):

    def fixture(self):
        fixture = support.BackupFixture()
        self.addCleanup(fixture.remove)
        return fixture


class OrderOfTheSteps(WithFixture):

    def test_the_lock_spans_the_pipe_and_ends_before_the_send(self):
        result = self.fixture().run()
        self.assertEqual(result.code, 0, result)
        steps = result.tools()
        first_lock, last_lock = steps.index("flock"), len(steps) - 1 - steps[::-1].index("flock")
        self.assertLess(first_lock, steps.index("docker"), result)
        self.assertLess(first_lock, steps.index("age"), result)
        self.assertLess(steps.index("docker"), last_lock, result)
        self.assertLess(steps.index("age"), last_lock, result)
        self.assertLess(last_lock, steps.index("rsync"), result)
        self.assertEqual(steps.count("flock"), 2, result)
        self.assertEqual(result.of("flock")[0][:3], ["--exclusive", "--wait", "900"], result)
        self.assertIn("--unlock", result.of("flock")[1], result)

    def test_the_send_holds_no_descriptor_of_the_lock(self):
        # The break: a long send would keep a deployment waiting, as children inherit the lock.
        result = self.fixture().run()
        self.assertEqual(result.code, 0, result)
        self.assertFalse(result.lock_open, result)

    def test_the_lock_and_its_wait_are_the_deployments(self):
        backup = support.deploy_support.constants(support.deploy_support.read_bytes(support.SCRIPT))
        deployment = support.deploy_support.constants()
        self.assertEqual(backup["LOCK_FILE"], deployment["LOCK_FILE"])
        self.assertEqual(backup["LOCK_WAIT_SECONDS"], deployment["LOCK_WAIT_SECONDS"])

    def test_the_stream_is_short_enough_for_a_deployment_to_wait_it_out(self):
        # The break: a stream's limit past the deployment's wait of 900 seconds fails a deployment.
        block = support.deploy_support.constants(support.deploy_support.read_bytes(support.SCRIPT))
        self.assertLess(int(block["STREAM_WAIT_SECONDS"]), int(block["LOCK_WAIT_SECONDS"]))

    def test_an_unreadable_key_stops_the_run_before_the_lock(self):
        fixture = self.fixture()
        os.remove(fixture.key_file)
        result = fixture.run()
        self.assertEqual(result.code, 3, result)
        self.assertEqual([t for t in result.tools() if t != "date"], ["pusher"], result)

    def test_the_weekday_file_and_the_size_stand_in_the_log_before_rsync_starts(self):
        # A send that never returns must find them there: the rsync stand-in keeps the log it saw.
        fixture = self.fixture()
        fixture.set_weekday("4")
        result = fixture.run()
        self.assertRegex(result.log_at_send,
                         rf"loop2-accounts-4\.sqlite\.age.*\b{support.CIPHERTEXT_SIZE}\b", result)

    def test_an_argument_is_refused_before_anything_runs(self):
        # A hand run with `--dry-run` must not replace a backup.
        result = self.fixture().run(["--dry-run"])
        self.assertEqual(result.code, 2, result)
        self.assertEqual([t for t in result.tools() if t != "date"], ["pusher"], result)


class WhatEachToolIsHanded(WithFixture):

    def test_docker_exec_gets_the_fixed_word_and_no_terminal(self):
        result = self.fixture().run()
        self.assertEqual(result.of("docker"), [
            ["exec", "loop2", "node", "dist/server/account-backup.js", "--to-standard-output"]],
            result)

    def test_pusher_gets_the_polish_notice_as_these_bytes(self):
        # The break: the script saved in another encoding, or a locale that rewrites the text. The
        # expected bytes are the owner's text in UTF-8, by hand: l with stroke is C5 82, e with
        # ogonek is C4 99. The subject goes into a URL path, so it is ASCII.
        fixture = self.fixture()
        fixture.answer("rsync", exit_code=12)
        result = fixture.run()
        self.assertEqual(result.of("pusher"), [["kopia_bazy_loop2_nieudana"]], result)
        self.assertEqual(result.notice_input, NOTICE_BYTES, result)

    def test_rsync_replaces_one_file_whole_keeping_its_time(self):
        result = self.fixture().run()
        self.assertEqual(result.code, 0, result)
        options, _words = split_rsync(result.of("rsync")[0])
        self.assertIn("--whole-file", options, result)
        self.assertIn("--times", options, result)

    def test_no_option_deletes_leaves_a_broken_file_or_lists(self):
        result = self.fixture().run()
        options, _words = split_rsync(result.of("rsync")[0])
        names = [option.split("=", 1)[0] for option in options]
        self.assertEqual([n for n in names if DELETING.match(n)], [], result)
        self.assertEqual(set(names) & (IN_PLACE | LISTING), set(), result)

    def test_rsync_is_called_once_with_one_file_to_one_computed_name_and_no_login(self):
        # With no destination rsync lists; a login or a port in the destination is an access value.
        fixture = self.fixture()
        fixture.set_weekday("3")
        result = fixture.run()
        self.assertEqual(len(result.of("rsync")), 1, result)
        _options, words = split_rsync(result.of("rsync")[0])
        self.assertEqual(len(words), 2, result)
        self.assertEqual(words[1], "strych.mikr.us:loop2-accounts-3.sqlite.age", result)

    def test_no_tool_reaches_strych_but_the_one_rsync(self):
        result = self.fixture().run()
        self.assertEqual(set(result.tools()) & set(support.NEVER_CALLED), set(), result)

    def test_seven_names_over_a_week_by_the_utc_date(self):
        # The date stand-in gives another day to a call without -u, which would name no file.
        fixture = self.fixture()
        names = []
        for day in "1234567":
            fixture.set_weekday(day)
            result = fixture.run()
            self.assertEqual(result.code, 0, result)
            names.append(split_rsync(result.of("rsync")[0])[1][1].split(":", 1)[1])
        self.assertEqual(sorted(names), sorted(support.WEEKDAY_FILES))

    def test_a_day_of_no_weekday_file_is_refused(self):
        for answer in ("0", "8", "12", "", "3 ; id"):
            with self.subTest(answer):
                fixture = self.fixture()
                fixture.set_weekday(answer)
                result = fixture.run()
                self.assertEqual(result.of("rsync"), [], result)
                self.assertEqual(result.code, 9, result)

    def test_the_host_key_options_stand(self):
        fixture = self.fixture()
        result = fixture.run()
        program, options = ssh_options(result.of("rsync")[0])
        self.assertEqual(program, "ssh", result)
        self.assertEqual(options["BatchMode"], "yes", result)
        self.assertEqual(options["StrictHostKeyChecking"], "yes", result)
        self.assertEqual(options["UserKnownHostsFile"],
                         support.deploy_support.shell_path(fixture.known_hosts), result)
        self.assertEqual(options["GlobalKnownHostsFile"], "/dev/null", result)
        self.assertNotIn("Port", options, result)
        self.assertNotIn("User", options, result)

    def test_the_constants_name_the_design_s_own_files(self):
        # The seam replaces these, so a wrong path would show nowhere else.
        block = support.deploy_support.constants(support.deploy_support.read_bytes(support.SCRIPT))
        self.assertEqual(block["LOG_FILE"], "/var/log/loop2-backup.log")
        self.assertEqual(block["ENCRYPTION_KEY_FILE"], "/etc/loop2/backup-encryption-key")
        self.assertEqual(block["STRYCH_KNOWN_HOSTS_FILE"], "/etc/loop2/strych-known-hosts")
        self.assertEqual(block["STRYCH_HOST"], "strych.mikr.us")

    def test_both_time_limits_of_the_send_are_asked_for(self):
        result = self.fixture().run()
        options, _words = split_rsync(result.of("rsync")[0])
        _program, ssh = ssh_options(result.of("rsync")[0])
        timeouts = [o for o in options if o.startswith("--timeout=")]
        self.assertEqual(len(timeouts), 1, result)
        self.assertGreater(int(timeouts[0].split("=", 1)[1]), 0, result)
        self.assertGreater(int(ssh["ConnectTimeout"]), 0, result)


class WhatTheLogHolds(WithFixture):

    def test_a_whole_run_logs_its_start_its_end_the_weekday_file_and_the_size(self):
        fixture = self.fixture()
        fixture.set_weekday("2")
        result = fixture.run()
        lines = result.log.splitlines()
        self.assertRegex(lines[0], r"\bstart\b", result)
        self.assertRegex(lines[-1], r"\bend\b", result)
        self.assertRegex(result.log, rf"loop2-accounts-2\.sqlite\.age.*\b{support.CIPHERTEXT_SIZE}\b",
                         result)

    def test_a_failed_run_logs_its_start_its_end_its_stage_and_the_exit_code(self):
        fixture = self.fixture()
        fixture.answer("age", exit_code=5, stderr=b"age: error: stand-in text\n")
        result = fixture.run()
        lines = result.log.splitlines()
        self.assertRegex(lines[0], r"\bstart\b", result)
        self.assertRegex(lines[-1], r"\bend\b", result)
        self.assertRegex(result.log, r"stage stream.*age exit 5", result)

    def test_the_marker_of_the_database_reaches_nothing_but_age(self):
        fixture = self.fixture()
        for arrange in (lambda _fixture: None,
                        lambda fixture: fixture.answer("rsync", exit_code=12),
                        lambda fixture: fixture.answer("age", exit_code=1)):
            arrange(fixture)
            result = fixture.run()
            self.assertIn(support.PLAIN_MARKER.encode(), result.age_input, "precondition: the "
                          "marker reached age")
            self.assertNotIn(support.PLAIN_MARKER, result.log, result)
            self.assertNotIn(support.PLAIN_MARKER, result.stdout + result.stderr, result)
            self.assertNotIn(support.PLAIN_MARKER.encode(), result.notice_input, result)
            self.assertNotIn(support.PLAIN_MARKER, str(result.calls), result)
            self.assertNotIn(support.PLAIN_MARKER.encode(), result.sent or b"", result)

    def test_a_refused_login_reaches_no_file_and_the_log_keeps_stage_code_and_size(self):
        fixture = self.fixture()
        text = f"{SENTINEL_LOGIN}@strych.mikr.us: Permission denied (publickey).\n".encode()
        fixture.answer("rsync", exit_code=23, stdout=text, stderr=text)
        result = fixture.run()
        self.assertEqual(result.code, 8, result)
        self.assertNotIn(SENTINEL_LOGIN, result.log, result)
        self.assertNotIn(SENTINEL_LOGIN, result.stdout + result.stderr, result)
        self.assertNotIn(SENTINEL_LOGIN.encode(), result.notice_input, result)
        self.assertNotIn(SENTINEL_LOGIN, str(result.of("pusher")), result)
        self.assertRegex(result.log, r"stage send.*\b23\b", result)
        self.assertRegex(result.log, rf"\b{support.CIPHERTEXT_SIZE}\b", result)

    def test_the_text_of_docker_age_and_flock_goes_to_the_log_alone(self):
        for tool, match, exit_code in (("docker", "*", 1), ("age", "*", 1),
                                       ("flock", "*--wait*", 1)):
            with self.subTest(tool):
                fixture = self.fixture()
                text = f"text-of-{tool}-0e6d"
                fixture.answer(tool, exit_code=exit_code, stderr=(text + "\n").encode(),
                               match=match)
                result = fixture.run()
                self.assertIn(text, result.log, result)
                self.assertNotIn(text, result.stdout + result.stderr, result)


class TheScheduleAsCronReadsIt(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.data = support.deploy_support.read_bytes(support.SCHEDULE)
        cls.lines = [line for line in cls.data.decode().splitlines()
                     if line.strip() and not line.lstrip().startswith("#")]

    def test_one_line_starts_the_installed_script_at_03_17_daily_as_root(self):
        schedules = [line.split() for line in self.lines if "=" not in line]
        self.assertEqual(schedules, [["17", "3", "*", "*", "*", "root",
                                      "/usr/local/bin/loop2-backup"]])

    def test_mail_is_off_before_the_schedule_line(self):
        self.assertEqual(self.lines[0], 'MAILTO=""')

    def test_cron_can_read_the_file(self):
        # cron ignores a last line with no newline, and a carriage return breaks the command.
        self.assertTrue(self.data.endswith(b"\n"))
        self.assertNotIn(b"\r", self.data)


if __name__ == "__main__":
    unittest.main()
