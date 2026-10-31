"""Invariant account-save-backup-failure-notice: Every failed step of the backup script — the command
in the container, a container that is not running included, the encryption, and the send, which
also replaces the oldest backup — ends in a call of `pusher`.

The check drives the repository's script `deploy/loop2-backup` as a black box through the seam of
`tests/deploy/backup_script_support.py`: a temporary copy in which only the marked constants block
is replaced, with stand-ins for its tools.

Reading of the sentence:
- every failed step: the steps the sentence names, and each other way the script can end non-zero,
  made to happen in turn: the key absent, the log unwritable, the lock's file unopenable, the lock
  not free, no temporary directory, the encrypted file empty or missing, the lock not released, the
  date failing or giving no weekday. D-227 asks for the same notice at any failed end;
- a signal, from any cause: during the stream HUP, INT, USR1, USR2, ALRM and TERM, each of which
  the script traps, and which its log and its exit code name by their own number; VTALRM, which it
  does not trap, during the stream and during the send, so its bash ends it through the handler
  with `$?` still 0; TERM during the send. SIGPIPE comes from a real pipe: a reader of the script's
  standard output leaves at once or after the first line, and the next line the script prints
  raises it, with its own number too;
- ends in a call of `pusher`: exactly one call, also where `pusher` itself fails, with one fixed
  subject and text that hold no tool's output and no step's name (D-227), and the log never says a
  backup was sent that was not: its last line, where it has one, says the run failed, with a
  non-zero exit.

A positive control runs a whole night and asserts no call of `pusher`, so a call above answers the
failure, not the run. A second one has the reader leave after the line with the size, so the send
goes on and the file really goes: that run ends in success, with no notice, and says so.

Does NOT cover: delivery, which a stand-in cannot prove (D-229): the published `pusher` exits 0 on an
HTTP error, so its exit status says little; a schedule that did not start and a host that is down,
which D-227 leaves without a message; a script killed by SIGKILL, which no handler can see; SIGQUIT,
which bash itself ignores in a script, so it ends no run; the other signals no trap names, which
take the path VTALRM shows.

A machine without Git or Git's own bash skips these tests, so the invariant reports unchecked,
never passed.
"""

import os
import re
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "deploy"))

import backup_script_support as support

TOOL_TEXT = "tool-error-text-of-the-stand-in-71b2"
TOOL_ERROR = (TOOL_TEXT + "\n").encode()
SHORT_STREAM = {"STREAM_WAIT_SECONDS": "1", "KILL_WAIT_SECONDS": "1"}
SHORT_SEND = {"SEND_WAIT_SECONDS": "1", "KILL_WAIT_SECONDS": "1"}


def key_absent(fixture):
    os.remove(fixture.key_file)


def log_cannot_be_written(fixture):
    fixture.write_copy(LOG_FILE=support.deploy_support.shell_path(
        fixture.path("no-such-directory", "loop2-backup.log")))


def lock_file_cannot_be_opened(fixture):
    fixture.write_copy(LOCK_FILE=support.deploy_support.shell_path(
        fixture.path("no-such-directory", "loop2-deploy.lock")))


def lock_not_free_in_time(fixture):
    fixture.answer("flock", exit_code=1, stderr=TOOL_ERROR, match="*--wait*")


def temporary_directory_cannot_be_made(fixture):
    fixture.write_copy(TEMPORARY_ROOT=support.deploy_support.shell_path(
        fixture.path("no-such-directory")))


def container_stopped(fixture):
    fixture.answer("docker", exit_code=1, stderr=TOOL_ERROR)


def command_fails(fixture):
    fixture.answer("docker", exit_code=70, stderr=TOOL_ERROR)


def command_killed(fixture):
    fixture.answer("docker", action="kill")


def command_hangs(fixture):
    fixture.write_copy(**SHORT_STREAM)
    fixture.answer("docker", action="hang")


def encryption_fails(fixture):
    fixture.answer("age", exit_code=1, stderr=TOOL_ERROR)


def encryption_leaves_an_empty_file(fixture):
    fixture.answer("age", output=b"")


def encryption_leaves_no_file(fixture):
    fixture.answer("age")


def encryption_killed(fixture):
    fixture.answer("age", action="kill")


def lock_cannot_be_released(fixture):
    fixture.answer("flock", exit_code=1, stderr=TOOL_ERROR, match="*--unlock*")


def date_fails(fixture):
    fixture.answer("date", exit_code=1, match="*%u*")


def date_gives_no_weekday(fixture):
    fixture.set_weekday("8")


def send_fails(fixture):
    fixture.answer("rsync", exit_code=12, stderr=TOOL_ERROR)


def send_refused_by_a_changed_host_key(fixture):
    fixture.answer("rsync", exit_code=255, stderr=TOOL_ERROR)


def send_finds_no_room_for_the_new_file(fixture):
    fixture.answer("rsync", exit_code=11, stderr=TOOL_ERROR)


def send_killed(fixture):
    fixture.answer("rsync", action="kill")


def send_hangs(fixture):
    fixture.write_copy(**SHORT_SEND)
    fixture.answer("rsync", action="hang")


def terminated(fixture):
    fixture.answer("docker", action="TERM")


def hung_up(fixture):
    fixture.answer("docker", action="HUP")


def interrupted(fixture):
    fixture.answer("docker", action="INT")


def terminated_while_sending(fixture):
    fixture.answer("rsync", action="TERM")


def alarm(fixture):
    fixture.answer("docker", action="ALRM")


def first_user_signal(fixture):
    fixture.answer("docker", action="USR1")


def second_user_signal(fixture):
    fixture.answer("docker", action="USR2")


def signal_the_script_has_no_trap_for(fixture):
    fixture.answer("docker", action="VTALRM")


def signal_with_no_trap_while_sending(fixture):
    fixture.answer("rsync", action="VTALRM")


FAILED_ENDS = (key_absent, log_cannot_be_written, lock_file_cannot_be_opened, lock_not_free_in_time,
               temporary_directory_cannot_be_made, container_stopped, command_fails,
               command_killed, command_hangs, encryption_fails, encryption_leaves_an_empty_file,
               encryption_leaves_no_file, encryption_killed, lock_cannot_be_released, date_fails,
               date_gives_no_weekday, send_fails, send_refused_by_a_changed_host_key,
               send_finds_no_room_for_the_new_file, send_killed, send_hangs, terminated, hung_up,
               interrupted, terminated_while_sending, alarm, first_user_signal, second_user_signal,
               signal_the_script_has_no_trap_for, signal_with_no_trap_while_sending)

STAGE = re.compile(r"stage (\w+):")
FAILED_LAST_LINE = r"end: failed \(exit [1-9][0-9]*\)$"
# 128 plus the signal's number on Linux, the server's system; the script writes them out, so they
# hold on Windows too. The spec's log holds the exit code of a failure.
EXIT_CODE_OF_SIGNAL = {"HUP": 129, "INT": 130, "USR1": 138, "USR2": 140, "ALRM": 142, "TERM": 143}
EXIT_CODE_OF_SIGPIPE = 141


class EveryFailedEndCallsPusher(unittest.TestCase):

    def fixture(self):
        fixture = support.BackupFixture()
        self.addCleanup(fixture.remove)
        return fixture

    def test_each_failed_end_calls_pusher_once_with_the_one_fixed_notice(self):
        # invariant: account-save-backup-failure-notice
        notices = set()
        for arrange in FAILED_ENDS:
            with self.subTest(arrange.__name__):
                fixture = self.fixture()
                arrange(fixture)
                result = fixture.run()
                self.assertNotEqual(result.code, 0, result)
                self.assertEqual(len(result.of("pusher")), 1, result)
                notice = (tuple(result.of("pusher")[0]), result.notice_input)
                notices.add(notice)
                text = " ".join(notice[0]) + notice[1].decode("utf-8", "replace")
                self.assertTrue(notice[1].strip(), result)
                self.assertNotIn(TOOL_TEXT, text, result)
                self.assertNotIn(support.PLAIN_MARKER, text, result)
                for stage in STAGE.findall(result.log):
                    self.assertNotRegex(text, rf"\b{stage}\b", result)
                self.assert_log_says_failed(result)
        self.assertEqual(len(notices), 1, f"the notice is not one fixed text: {notices}")

    def assert_log_says_failed(self, result):
        self.assertNotIn("end: sent", result.log, result)
        if result.log:
            self.assertRegex(result.log.splitlines()[-1], FAILED_LAST_LINE, result)

    def test_a_reader_that_leaves_before_the_size_ends_the_run_with_one_notice(self):
        # invariant: account-save-backup-failure-notice
        for lines in (0, 1):
            with self.subTest(lines=lines):
                result = self.fixture().run(reader_lines=lines)
                self.assertNotEqual(result.code, 0, result)
                self.assertEqual(len(result.of("pusher")), 1, result)
                self.assertEqual(result.of("rsync"), [], result)
                self.assert_log_says_failed(result)
                self.assertEqual(result.code, EXIT_CODE_OF_SIGPIPE, result)
                self.assertIn(f"(exit {EXIT_CODE_OF_SIGPIPE})", result.log.splitlines()[-1], result)

    def test_a_signal_with_a_trap_is_named_by_its_exit_code_in_the_log_too(self):
        # invariant: account-save-backup-failure-notice
        for signal_name, exit_code in EXIT_CODE_OF_SIGNAL.items():
            with self.subTest(signal_name):
                fixture = self.fixture()
                fixture.answer("docker", action=signal_name)
                result = fixture.run()
                self.assertEqual(result.code, exit_code, result)
                self.assertIn(f"(exit {exit_code})", result.log.splitlines()[-1], result)

    def test_the_line_that_meets_a_gone_reader_stands_in_the_log(self):
        # invariant: account-save-backup-failure-notice
        result = self.fixture().run(reader_lines=1)
        self.assertRegex(result.log, rf"\b{support.CIPHERTEXT_SIZE}\b", result)

    def test_control_a_reader_that_leaves_after_the_size_leaves_a_sent_backup_and_no_notice(self):
        # invariant: account-save-backup-failure-notice
        result = self.fixture().run(reader_lines=2, reader_awaited_by="rsync")
        self.assertEqual(result.code, 0, result)
        self.assertEqual(result.sent, support.CIPHERTEXT, result)
        self.assertEqual(result.of("pusher"), [], result)
        self.assertRegex(result.log.splitlines()[-1], r"end: sent \S+", result)

    def test_a_failing_pusher_is_logged_and_called_once(self):
        # invariant: account-save-backup-failure-notice
        fixture = self.fixture()
        fixture.answer("rsync", exit_code=12)
        fixture.answer("pusher", exit_code=6)
        result = fixture.run()
        self.assertEqual(result.code, 8, "the send's own exit code stays the run's")
        self.assertEqual(len(result.of("pusher")), 1, result)
        self.assertRegex(result.log, r"pusher.*\b6\b", result)

    def test_a_hanging_pusher_ends_the_run(self):
        # invariant: account-save-backup-failure-notice
        fixture = self.fixture()
        fixture.write_copy(NOTICE_WAIT_SECONDS="1", KILL_WAIT_SECONDS="1")
        fixture.answer("rsync", exit_code=12)
        fixture.answer("pusher", action="hang")
        result = fixture.run()
        self.assertEqual(result.code, 8, result)
        self.assertEqual(len(result.of("pusher")), 1, result)
        self.assertRegex(result.log, r"pusher", result)

    def test_control_a_whole_run_calls_no_pusher(self):
        # invariant: account-save-backup-failure-notice
        result = self.fixture().run()
        self.assertEqual(result.code, 0, result)
        self.assertEqual(result.of("pusher"), [], result)


if __name__ == "__main__":
    unittest.main()
