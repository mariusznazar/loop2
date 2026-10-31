"""The bytes of the backup command through `docker exec` open as the database (D-225).

The backup script reads the finished backup from the standard output of
`docker exec loop2 node dist/server/account-backup.js --to-standard-output`, run without a
terminal. A terminal, or any layer of Docker that rewrote bytes, would damage the stream and the
damage would show only at a restore. This test builds the image from the working tree, starts its
normal command on fresh volumes as the production settings give it, puts one synthetic account
into the database through the image's own `AccountDatabase`, runs the command the way the script
does, and opens the captured bytes with Python's SQLite: the integrity check passes, the schema
version is the code's, and the account is in it. Nothing else is left in the container's
temporary directory.

Where no Docker daemon answers, the test is skipped and says what stays unchecked.

Does NOT cover: the backup script (its tests use stand-ins); encryption, sending, the server's
Docker volume and Docker release; a database larger than this test's; a terminal (the command is
never run with `-t`).
"""

import json
import os
import sqlite3
import subprocess
import tempfile
import unittest
import uuid

from tests.invariants import account_container_support as support
from tests.deploy import test_account_storage as storage

WORD = "--to-standard-output"
EMAIL = "backup-stream-check@example.com"
BUILD_TIMEOUT = storage.BUILD_TIMEOUT
COMMAND_TIMEOUT = storage.COMMAND_TIMEOUT

# Run inside the container by its own Node.js: one account with a synthetic address and a
# synthetic stand-in for a password hash, written through the image's own database class.
ADD_ACCOUNT = r"""
(async () => {
const { AccountDatabase } = await import('/app/dist/server/database.js');
const database = new AccountDatabase(process.env.LOOP2_DATABASE_PATH);
const account = database.createAccount(process.env.CHECK_EMAIL, 'synthetic-hash-for-the-check');
database.close();
if (!account) process.exitCode = 1;
})().catch(() => { process.exitCode = 1; });
"""

LIST_TEMPORARY = "console.log(JSON.stringify(require('node:fs').readdirSync('/tmp')))"


class BackupBytesThroughDockerExec(unittest.TestCase):

    def test_bytes_of_docker_exec_without_a_terminal_open_as_the_database(self):
        if not storage.docker_answers():
            self.skipTest("no Docker daemon answers; whether the bytes of `docker exec` open as "
                          "the database stays unchecked")
        suffix = uuid.uuid4().hex[:12]
        tag = "loop2-backup-stream-check:" + suffix
        self.addCleanup(storage.docker_run, "image", "rm", "-f", tag)
        code, output = storage.docker_run("build", "--build-arg",
                                          "LOOP2_COMMIT=backup-stream-check", "-t", tag, ".",
                                          timeout=BUILD_TIMEOUT)
        self.assertEqual(code, 0, f"`docker build` failed:\n{output}")
        data_volume, secret_volume = support.create_account_volumes(self, tag)
        name = "loop2-backup-stream-" + suffix
        support.start_application(self, tag, name, data_volume, secret_volume)
        support.verify_account_resources(self, name, data_volume, secret_volume)

        added = subprocess.run(
            [storage.docker(), "exec", "-i", "-e", "CHECK_EMAIL=" + EMAIL, name, "node", "-"],
            input=ADD_ACCOUNT.encode("utf-8"), capture_output=True, timeout=COMMAND_TIMEOUT)
        self.assertEqual(added.returncode, 0, added.stderr.decode("utf-8", "replace"))

        # No -t and no -i: standard input is closed, standard output is a pipe, as in the script.
        result = subprocess.run(
            [storage.docker(), "exec", name, "node", "dist/server/account-backup.js", WORD],
            stdin=subprocess.DEVNULL, capture_output=True, timeout=COMMAND_TIMEOUT)
        self.assertEqual(result.returncode, 0, result.stderr.decode("utf-8", "replace"))
        self.assertEqual(result.stdout[:16], b"SQLite format 3\x00",
                         "standard output holds the database from its first byte")

        with tempfile.TemporaryDirectory() as directory:
            path = os.path.join(directory, "backup.sqlite")
            with open(path, "wb") as handle:
                handle.write(result.stdout)
            connection = sqlite3.connect("file:" + path.replace("\\", "/") + "?mode=ro", uri=True)
            try:
                self.assertEqual(connection.execute("PRAGMA integrity_check").fetchall(),
                                 [("ok",)])
                self.assertEqual(connection.execute("PRAGMA user_version").fetchone(), (4,))
                self.assertEqual(
                    connection.execute("SELECT email FROM accounts").fetchall(), [(EMAIL,)])
            finally:
                connection.close()

        listing = subprocess.run(
            [storage.docker(), "exec", name, "node", "-e", LIST_TEMPORARY],
            capture_output=True, timeout=COMMAND_TIMEOUT)
        self.assertEqual(listing.returncode, 0, listing.stderr.decode("utf-8", "replace"))
        left = [entry for entry in json.loads(listing.stdout.decode("utf-8"))
                if entry.startswith("loop2-backup-")]
        self.assertEqual(left, [], "the command left its temporary directory in the container")


if __name__ == "__main__":
    unittest.main()
