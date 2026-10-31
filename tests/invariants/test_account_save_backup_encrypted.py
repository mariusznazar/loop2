"""Invariant account-save-backup-encrypted: A backup of the account and save server's database does
not leave the game server host unencrypted.

The check drives the repository's script `deploy/loop2-backup` as a black box through the seam of
`tests/deploy/backup_script_support.py`: a temporary copy in which only the marked constants block
is replaced, with stand-ins for its tools.

Reading of the sentence:
- leaves the host: the script's one way out is its `rsync` call, so a run in which the stand-in
  `rsync` records no call sends nothing;
- unencrypted: whatever `age` did not finish for the whole input. Each way that can happen is made
  to happen in turn: the key absent, empty or no file, `age` missing, failing, killed or hanging,
  leaving a partial file, an empty file or none, and the command before it in the pipe failing,
  killed, hanging or finding its container stopped while `age` itself ends well on a shortened
  input, which `age` cannot tell from a whole one.

A positive control runs a whole night and asserts that `rsync` got exactly the file `age` wrote,
so an empty finding above is the script's, not the stand-in's.

Does NOT cover: that the real `age` encrypts, which rests on age-file-encryption; a key that reads
well but is a wrong one; `age` run on the owner's computer at a restore. The stand-ins prove the
script's reaction to each answer, not what a real tool does (D-221). A real run of the script with
the real `age` is the human's H2.

A machine without Git or Git's own bash skips these tests, so the invariant reports unchecked,
never passed.
"""

import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "deploy"))

import backup_script_support as support

SHORT_WAITS = {"STREAM_WAIT_SECONDS": "1", "KILL_WAIT_SECONDS": "1"}
PARTIAL_PLAIN = support.PLAIN_DATABASE[:8]
PARTIAL_CIPHERTEXT = support.CIPHERTEXT[:32]


def key_absent(fixture):
    os.remove(fixture.key_file)


def key_empty(fixture):
    support.deploy_support.write_bytes(fixture.key_file, b"")


def key_no_file(fixture):
    os.remove(fixture.key_file)
    os.makedirs(fixture.key_file)


def age_missing(fixture):
    # 127 is what `timeout` exits with for a command it cannot find.
    fixture.answer("age", exit_code=127)


def age_fails_leaving_part(fixture):
    fixture.answer("age", exit_code=1, stderr=b"age: error: stand-in\n",
                   output=PARTIAL_CIPHERTEXT)


def age_ends_well_on_an_empty_file(fixture):
    fixture.answer("age", output=b"")


def age_ends_well_on_no_file(fixture):
    fixture.answer("age")


def age_killed(fixture):
    fixture.answer("age", action="kill", output=PARTIAL_CIPHERTEXT)


def age_hangs(fixture):
    fixture.write_copy(**SHORT_WAITS)
    fixture.answer("age", action="hang", output=PARTIAL_CIPHERTEXT)


def command_fails_after_part_of_the_database(fixture):
    fixture.answer("docker", exit_code=70, stdout=PARTIAL_PLAIN)


def container_stopped(fixture):
    fixture.answer("docker", exit_code=1,
                   stderr=b"Error response from daemon: container is not running\n")


def command_killed_after_part_of_the_database(fixture):
    fixture.answer("docker", action="kill", stdout=PARTIAL_PLAIN)


def command_hangs_after_part_of_the_database(fixture):
    fixture.write_copy(**SHORT_WAITS)
    fixture.answer("docker", action="hang", stdout=PARTIAL_PLAIN)


NOTHING_LEAVES = (key_absent, key_empty, key_no_file, age_missing, age_fails_leaving_part,
                  age_ends_well_on_an_empty_file, age_ends_well_on_no_file, age_killed, age_hangs,
                  command_fails_after_part_of_the_database, container_stopped,
                  command_killed_after_part_of_the_database,
                  command_hangs_after_part_of_the_database)


class NoBackupLeavesUnencrypted(unittest.TestCase):

    def fixture(self):
        fixture = support.BackupFixture()
        self.addCleanup(fixture.remove)
        return fixture

    def test_a_run_that_does_not_finish_the_encryption_sends_nothing(self):
        # invariant: account-save-backup-encrypted
        for arrange in NOTHING_LEAVES:
            with self.subTest(arrange.__name__):
                fixture = self.fixture()
                arrange(fixture)
                result = fixture.run()
                self.assertEqual(result.of("rsync"), [], result)
                self.assertIsNone(result.sent, result)
                self.assertNotEqual(result.code, 0, result)
                self.assertEqual(fixture.left_in_temporary_root(), [], result)

    def test_control_a_whole_run_sends_exactly_the_file_age_wrote(self):
        # invariant: account-save-backup-encrypted
        fixture = self.fixture()
        result = fixture.run()
        self.assertEqual(result.code, 0, result)
        self.assertEqual(result.age_input, support.PLAIN_DATABASE, result)
        self.assertEqual(len(result.of("age")), 1, result)
        age = result.of("age")[0]
        self.assertIn("--encrypt", age, "an identity file is a key only with an explicit -e "
                                        "(age-file-encryption)")
        self.assertEqual(age[age.index("--identity") + 1],
                         support.deploy_support.shell_path(fixture.key_file), result)
        self.assertEqual(len(result.of("rsync")), 1, result)
        rsync = result.of("rsync")[0]
        output = age[age.index("--output") + 1]
        self.assertEqual(next(a for a in rsync if not a.startswith("-")), output, result)
        self.assertEqual(result.sent, support.CIPHERTEXT, result)
        self.assertEqual(fixture.left_in_temporary_root(), [], result)


if __name__ == "__main__":
    unittest.main()
