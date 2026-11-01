"""The launcher of the restore trial, `scripts/restore-trial.mjs` (D-234).

The owner runs the launcher once on his computer, on a decrypted backup of the database and an
image built from the same commit. It starts one container from the image on fresh volumes holding
that file, logs in as the test account through the server's own HTTP port, reads the saved game
state, prints a verdict and removes what it made.

Three groups of tests. The refusals run on any machine without Docker: the launcher is started with
no `docker` on its path, and a refusal must come before the first Docker call. The end of a trial
runs there too, on a test-owned stand-in for `docker` that fails as a daemon that went away does,
which proves how the launcher reacts and nothing of Docker. The run needs a Docker daemon: it
builds the image from the working tree, makes a database with the image's own code (a synthetic
account registered through HTTP, a saved game state written through `AccountDatabase`, a backup
taken by the backup command), and runs the launcher on that file for a right password, a wrong
one, an absent marker and an interruption. Where no daemon answers, the run is skipped and says
what stays unchecked.

Does NOT cover: a backup fetched from Strych or decrypted with `age` (the owner does both before
the launcher); a database of an older or later schema than the image's; a database of the size of
a real one; building a new server or restoring over a live volume.
"""

import json
import os
import pathlib
import re
import shutil
import signal
import subprocess
import tempfile
import time
import unittest
import uuid

from tests.deploy import test_account_storage as storage
from tests.invariants import account_container_support as support
from tests.invariants import loop2_invariant_support as compose

LAUNCHER = os.path.join(support.ROOT, "scripts", "restore-trial.mjs")
DOCKER_STANDIN = pathlib.Path(__file__).with_name("restore-trial-docker-standin.mjs").as_uri()
PREFIX = "loop2-restore-trial-"
NODE = shutil.which("node")

EMAIL = "restore-trial-check@example.com"
PASSWORD = "synthetic-password-4b1e7c0d9a"
MARKER = "Marker-Wolfsbane-81c3"
OTHER_GAME_TEXT = "Gameplay-Text-Quokka-5d2f"
SQLITE_HEADER = b"SQLite format 3\x00"

FAILED = 1
REFUSED = 2
NOT_RUN = 3
LEFT_BEHIND = 4
INTERRUPTED = 130

LAUNCHER_TIMEOUT = 240   # seconds for one run of the launcher
APPEARS_TIMEOUT = 120    # seconds for the launcher's first container to appear before an interrupt


def launch(arguments, password, path_dirs=None, timeout=60, docker_standin=None):
    """(exit code, standard output, standard error) of the launcher, which gets `password` on its
    standard input. With `path_dirs` it finds only the programs in those directories. With
    `docker_standin`, the settings of the stand-in, that stand-in answers in place of `docker`."""
    environment = dict(os.environ)
    if path_dirs is not None:
        environment = {"PATH": os.pathsep.join(path_dirs),
                       "SystemRoot": os.environ.get("SystemRoot", "")}
    node = [NODE]
    if docker_standin is not None:
        environment["LOOP2_DOCKER_STANDIN"] = json.dumps(docker_standin)
        node += ["--import", DOCKER_STANDIN]
    result = subprocess.run([*node, LAUNCHER, *arguments], input=password.encode("utf-8"),
                            capture_output=True, timeout=timeout, env=environment,
                            cwd=support.ROOT)
    return (result.returncode, result.stdout.decode("utf-8", "replace"),
            result.stderr.decode("utf-8", "replace"))


def arguments_of(image="loop2-check:1", database=None, marker=MARKER, email=EMAIL):
    return ["--image", image, "--database", database, "--marker", marker, "--email", email]


class WithoutDocker(unittest.TestCase):
    """The launcher started where no `docker` program exists."""

    def setUp(self):
        self.directory = tempfile.mkdtemp(prefix="restore-trial-test-")
        self.addCleanup(shutil.rmtree, self.directory, True)
        self.empty_path = os.path.join(self.directory, "no-programs")
        os.mkdir(self.empty_path)
        self.database = os.path.join(self.directory, "accounts.sqlite")
        with open(self.database, "wb") as handle:
            handle.write(SQLITE_HEADER + b"\x00" * 100)

    def assert_refused(self, arguments, password=PASSWORD):
        code, out, err = launch(arguments, password, [self.empty_path])
        shown = out + err
        self.assertEqual(code, REFUSED, shown)
        self.assertNotIn("PASS", shown)
        for secret in (PASSWORD, EMAIL, MARKER, self.directory):
            self.assertNotIn(secret, shown, "a refusal shows what it was given")

    def test_a_password_given_as_an_argument_is_refused_and_not_shown(self):
        base = arguments_of(database=self.database)
        for extra in (["--password", PASSWORD], ["--password=" + PASSWORD], [PASSWORD]):
            with self.subTest(extra=extra[0][:10]):
                self.assert_refused(base + extra, password="")
                self.assert_refused(base + extra)

    def test_a_missing_option_is_refused(self):
        for name in ("--image", "--database", "--marker", "--email"):
            arguments = arguments_of(database=self.database)
            index = arguments.index(name)
            with self.subTest(missing=name):
                self.assert_refused(arguments[:index] + arguments[index + 2:])

    def test_an_option_given_twice_or_without_a_value_is_refused(self):
        base = arguments_of(database=self.database)
        self.assert_refused(base + ["--marker", MARKER])
        self.assert_refused(base[:-1])

    def test_an_empty_password_is_refused(self):
        for password in ("", "\n", "\r\n"):
            with self.subTest(password=repr(password)):
                self.assert_refused(arguments_of(database=self.database), password=password)

    def test_a_marker_or_address_that_cannot_be_what_the_trial_needs_is_refused(self):
        for marker in ("", "   ", "line\nbreak", "x" * 201):
            with self.subTest(marker=marker[:12]):
                self.assert_refused(arguments_of(database=self.database, marker=marker))
        for email in ("", "not-an-address", "two@@example.com", "spa ce@example.com",
                      "a@b.c" + "x" * 300):
            with self.subTest(email=email[:12]):
                self.assert_refused(arguments_of(database=self.database, email=email))

    def test_an_image_that_docker_would_read_as_an_option_is_refused(self):
        for image in ("", "--privileged", "-v", "name with space"):
            with self.subTest(image=image):
                self.assert_refused(arguments_of(image=image, database=self.database))

    def test_a_database_that_is_not_a_decrypted_sqlite_file_is_refused(self):
        encrypted = os.path.join(self.directory, "accounts.sqlite.age")
        with open(encrypted, "wb") as handle:
            handle.write(b"age-encryption.org/v1\n-> X25519 " + b"A" * 60)
        empty = os.path.join(self.directory, "empty.sqlite")
        open(empty, "wb").close()
        for database in (os.path.join(self.directory, "absent.sqlite"), self.directory,
                         encrypted, empty):
            with self.subTest(database=os.path.basename(database)):
                self.assert_refused(arguments_of(database=database))

    def test_valid_input_without_docker_fails_without_a_verdict_and_shows_no_secret(self):
        code, out, err = launch(arguments_of(database=self.database), PASSWORD,
                                [self.empty_path])
        shown = out + err
        self.assertEqual(code, NOT_RUN, shown)
        self.assertIn("FAIL", shown)
        self.assertNotIn("PASS", shown)
        for secret in (PASSWORD, EMAIL, MARKER):
            self.assertNotIn(secret, shown)


class EndOfAPassingTrial(unittest.TestCase):
    """The cleanup after a trial the stand-in for `docker` lets pass. The data volume holds the
    plain database, so PASS and exit 0 stand only when Docker showed that all of it is gone."""

    EVERY_REMOVAL = ["rm", "volume rm"]
    EVERY_LISTING = ["ps", "volume ls"]

    def setUp(self):
        self.directory = tempfile.mkdtemp(prefix="restore-trial-end-")
        self.addCleanup(shutil.rmtree, self.directory, True)
        self.empty_path = os.path.join(self.directory, "no-programs")
        os.mkdir(self.empty_path)
        self.database = os.path.join(self.directory, "accounts.sqlite")
        with open(self.database, "wb") as handle:
            handle.write(SQLITE_HEADER + b"\x00" * 100)
        self.log = os.path.join(self.directory, "calls.jsonl")

    def finish(self, **settings):
        """(exit code, standard output, standard error) of a trial on the stand-in."""
        return launch(arguments_of(database=self.database), PASSWORD, [self.empty_path],
                      docker_standin={"log": self.log, **settings})

    def commands_called(self):
        with open(self.log, encoding="utf-8") as handle:
            return [json.loads(line)["command"] for line in handle]

    def assert_exit_4_naming(self, result, kinds):
        code, out, err = result
        shown = out + err
        self.assertEqual(code, LEFT_BEHIND, shown)
        self.assertNotRegex(out, r"(?m)^PASS")
        self.assertRegex(out.splitlines()[-1], r"^FAIL")
        named = set(re.findall(PREFIX + r"(data|secrets|setup|app)-[0-9a-f]{12}", out))
        self.assertEqual(named, set(kinds), shown)
        for secret in (PASSWORD, EMAIL, MARKER):
            self.assertNotIn(secret, shown)

    def test_control_a_cleanup_docker_confirms_keeps_the_pass(self):
        code, out, err = self.finish()
        self.assertEqual(code, 0, out + err)
        self.assertRegex(out, r"(?m)^PASS$")
        self.assertNotIn(PREFIX, out + err)
        self.assertEqual(set(self.commands_called()) & {"ps", "volume ls"}, {"ps", "volume ls"})

    def test_a_daemon_gone_at_the_cleanup_is_exit_4_naming_what_was_made(self):
        result = self.finish(fails=self.EVERY_REMOVAL + self.EVERY_LISTING)
        self.assert_exit_4_naming(result, ["data", "secrets", "setup", "app"])

    def test_a_listing_that_failed_shows_nothing_gone_though_each_removal_exited_0(self):
        result = self.finish(fails=self.EVERY_LISTING)
        self.assert_exit_4_naming(result, ["data", "secrets", "setup", "app"])

    def test_a_removal_that_failed_shows_nothing_gone_though_the_listings_are_empty(self):
        result = self.finish(fails=self.EVERY_REMOVAL, actsFirst=True)
        self.assert_exit_4_naming(result, ["data", "secrets", "setup", "app"])

    def test_a_volume_docker_still_lists_is_named_and_the_container_it_removed_is_not(self):
        result = self.finish(fails=["volume rm"])
        self.assert_exit_4_naming(result, ["data", "secrets"])

    def test_a_cleanup_that_fails_once_and_then_answers_keeps_the_pass(self):
        code, out, err = self.finish(fails=self.EVERY_REMOVAL + self.EVERY_LISTING, times=1)
        self.assertEqual(code, 0, out + err)
        self.assertRegex(out, r"(?m)^PASS$")


class PasswordReading(unittest.TestCase):
    """`cleanPassword`, run in Node.js on the text the launcher read from standard input."""

    def clean(self, text):
        """(exit code, standard output) of `cleanPassword(text)`; the output is the JSON of the
        result, or the message of the refusal."""
        script = ("import(process.argv[1]).then(m => { try { console.log(JSON.stringify("
                  "m.cleanPassword(JSON.parse(process.argv[2])))) } catch (e) { "
                  "console.log('refused: ' + e.message); process.exitCode = 5 } })")
        result = subprocess.run(
            [NODE, "-e", script, "file:///" + LAUNCHER.replace(os.sep, "/"), json.dumps(text)],
            capture_output=True, timeout=30)
        return result.returncode, result.stdout.decode("utf-8").strip()

    def test_a_byte_order_mark_that_a_console_put_before_the_password_is_dropped(self):
        # Windows PowerShell 5.1 under code page 65001 writes U+FEFF before piped text.
        for text in ("\ufeffascii-pass-1\r\n", "\ufeffascii-pass-1\n", "\ufeffascii-pass-1"):
            with self.subTest(text=repr(text)):
                self.assertEqual(self.clean(text), (0, '"ascii-pass-1"'))

    def test_every_leading_mark_is_dropped_and_a_mark_inside_or_none_is_unchanged(self):
        self.assertEqual(self.clean("ascii-pass-1\r\n"), (0, '"ascii-pass-1"'))
        self.assertEqual(self.clean("\ufeff\ufeffx\n"), (0, '"x"'))
        self.assertEqual(self.clean("pa ss-\ufeff1\n"), (0, '"pa ss-\ufeff1"'))

    def test_a_mark_alone_is_an_empty_password_and_is_refused(self):
        code, shown = self.clean("\ufeff\r\n")
        self.assertEqual(code, 5, shown)
        self.assertIn("empty", shown)


class SettingsAreProductions(unittest.TestCase):

    def test_the_launcher_runs_the_database_and_secrets_where_compose_yaml_puts_them(self):
        path, mount = storage.compose_account_storage()
        script = ("import(process.argv[1]).then(m => console.log(JSON.stringify("
                  "m.PRODUCTION_ENVIRONMENT)))")
        result = subprocess.run([NODE, "-e", script, "file:///" + LAUNCHER.replace(os.sep, "/")],
                                capture_output=True, timeout=30)
        self.assertEqual(result.returncode, 0, result.stderr.decode("utf-8", "replace"))
        environment = json.loads(result.stdout.decode("utf-8"))
        self.assertEqual(environment["LOOP2_DATABASE_PATH"], path)
        self.assertEqual(os.path.dirname(path), mount)
        _top, services = compose.compose_outline(compose.read_required("compose.yaml"))
        app = services["app"]
        expected = compose._yaml_mapping(app["environment"].block, app["environment"].line + 1)
        for key in ("LOOP2_DATABASE_PATH", "LOOP2_SESSION_SECRET_FILE", "LOOP2_PUBLIC_ORIGIN",
                    "LOOP2_PROXY_MODE", "LOOP2_SMTP_PASSWORD_FILE"):
            self.assertEqual(environment[key], expected[key].value, key)


# Run inside the container by its own Node.js: one account's saved game state, written through the
# image's own database class.
WRITE_SAVE = r"""
(async () => {
const { AccountDatabase } = await import('/app/dist/server/database.js');
const database = new AccountDatabase(process.env.LOOP2_DATABASE_PATH);
const game = JSON.stringify({ characters: [{ name: process.env.CHECK_MARKER }],
  notes: process.env.CHECK_TEXT });
const outcome = database.writeSavedGame(process.env.CHECK_ID, { version: 1, basedOn: 0, game });
database.close();
if (outcome.outcome !== 'saved') process.exitCode = 1;
})().catch(() => { process.exitCode = 1; });
"""


def leftovers():
    """Names of containers and volumes with the launcher's prefix."""
    names = []
    for listing in (["ps", "-a"], ["volume", "ls"]):
        _code, output = storage.docker_run(
            *listing, "--filter", "name=" + PREFIX, "--format",
            "{{.Names}}" if listing[0] == "ps" else "{{.Name}}")
        names += output.split()
    return names


def remove_leftovers():
    """Force-remove what `leftovers` names; the assertions come before it."""
    for name in leftovers():
        storage.docker_run("rm", "-f", "-v", name)
        storage.docker_run("volume", "rm", "-f", name)


class RunOnARealBackup(unittest.TestCase):

    def request(self, name, path, body):
        spec = {"path": path, "body": body, "cookie": None, "origin": storage.ORIGIN,
                "name": storage.COOKIE}
        script = storage.REQUEST_PROBE.replace("SPEC", json.dumps(json.dumps(spec)), 1)
        result = subprocess.run([storage.docker(), "exec", "-i", name, "node", "-"],
                                input=script.encode("utf-8"), capture_output=True,
                                timeout=storage.COMMAND_TIMEOUT)
        self.assertEqual(result.returncode, 0, result.stderr.decode("utf-8", "replace"))
        return json.loads(result.stdout.decode("utf-8").strip().splitlines()[-1])

    def wait_until_serving(self, name):
        deadline = time.monotonic() + storage.SERVE_WAIT
        while subprocess.run(
                [storage.docker(), "exec", name, "node", "-e",
                 "fetch('http://127.0.0.1:3000/').then(r => process.exit(r.status === 200 ? 0 "
                 ": 1), () => process.exit(1))"],
                capture_output=True, timeout=storage.COMMAND_TIMEOUT).returncode != 0:
            self.assertLess(time.monotonic(), deadline, f"{name} does not serve")
            time.sleep(1)

    def make_backup(self, tag, directory):
        """A backup file of a database holding the synthetic account and its saved game state."""
        data_volume, secret_volume = support.create_account_volumes(self, tag)
        name = "loop2-restore-source-" + uuid.uuid4().hex[:8]
        support.start_application(self, tag, name, data_volume, secret_volume)
        self.wait_until_serving(name)
        created = self.request(name, "/api/accounts", {
            "email": EMAIL, "password": PASSWORD, "passwordConfirmation": PASSWORD})
        self.assertEqual(created["status"], 201, created["body"])
        written = subprocess.run(
            [storage.docker(), "exec", "-i", "-e", "CHECK_ID=" + created["body"]["id"],
             "-e", "CHECK_MARKER=" + MARKER, "-e", "CHECK_TEXT=" + OTHER_GAME_TEXT,
             name, "node", "-"],
            input=WRITE_SAVE.encode("utf-8"), capture_output=True, timeout=storage.COMMAND_TIMEOUT)
        self.assertEqual(written.returncode, 0, written.stderr.decode("utf-8", "replace"))
        backup = subprocess.run(
            [storage.docker(), "exec", name, "node", "dist/server/account-backup.js",
             "--to-standard-output"],
            stdin=subprocess.DEVNULL, capture_output=True, timeout=storage.COMMAND_TIMEOUT)
        self.assertEqual(backup.returncode, 0, backup.stderr.decode("utf-8", "replace"))
        path = os.path.join(directory, "accounts.sqlite")
        with open(path, "wb") as handle:
            handle.write(backup.stdout)
        storage.docker_run("rm", "--force", name)
        return path

    def assert_clean(self, shown):
        for secret in (PASSWORD, EMAIL, MARKER, OTHER_GAME_TEXT):
            self.assertNotIn(secret, shown, "the launcher printed what it must not")
        self.assertEqual(leftovers(), [], "the launcher left a container or a volume")

    def test_pass_fail_on_wrong_password_fail_on_absent_marker_and_interruption(self):
        if not storage.docker_answers():
            self.skipTest("no Docker daemon answers; whether the launcher restores a backup, "
                          "judges it and removes its container and volumes stays unchecked")
        tag = "loop2-restore-trial-check:" + uuid.uuid4().hex[:12]
        self.addCleanup(storage.docker_run, "image", "rm", "-f", tag)
        self.addCleanup(remove_leftovers)
        directory = tempfile.mkdtemp(prefix="restore-trial-run-")
        self.addCleanup(shutil.rmtree, directory, True)
        code, output = storage.docker_run("build", "--build-arg",
                                          "LOOP2_COMMIT=restore-trial-check", "-t", tag, ".",
                                          timeout=storage.BUILD_TIMEOUT)
        self.assertEqual(code, 0, f"`docker build` failed:\n{output}")
        database = self.make_backup(tag, directory)
        with open(database, "rb") as handle:
            self.assertEqual(handle.read(16), SQLITE_HEADER)
        self.assertEqual(leftovers(), [], "the preparation left a container or a volume")

        with self.subTest("the right password and the marker"):
            code, out, err = launch(arguments_of(tag, database), PASSWORD,
                                    timeout=LAUNCHER_TIMEOUT)
            self.assertEqual(code, 0, out + err)
            self.assertRegex(out, r"(?m)^Node\.js v\d+\.\d+\.\d+$")
            self.assertRegex(out, r"(?m)^login status: 200$")
            self.assertRegex(out, r"(?m)^save revision: 1$")
            self.assertRegex(out, r"(?m)^marker in the saved game state: yes$")
            self.assertRegex(out, r"(?m)^PASS$")
            self.assertNotIn("FAIL", out + err)
            self.assert_clean(out + err)

        with self.subTest("a wrong password"):
            code, out, err = launch(arguments_of(tag, database), PASSWORD + "x",
                                    timeout=LAUNCHER_TIMEOUT)
            self.assertEqual(code, FAILED, out + err)
            self.assertRegex(out, r"(?m)^login status: 401$")
            self.assertRegex(out, r"(?m)^FAIL")
            self.assertNotRegex(out, r"(?m)^PASS")
            self.assertNotIn("marker in the saved game state: yes", out)
            self.assert_clean(out + err)

        with self.subTest("a marker the saved game state does not hold"):
            code, out, err = launch(arguments_of(tag, database, marker=MARKER + "-absent"),
                                    PASSWORD, timeout=LAUNCHER_TIMEOUT)
            self.assertEqual(code, FAILED, out + err)
            self.assertRegex(out, r"(?m)^login status: 200$")
            self.assertRegex(out, r"(?m)^save revision: 1$")
            self.assertRegex(out, r"(?m)^marker in the saved game state: no$")
            self.assertRegex(out, r"(?m)^FAIL")
            self.assertNotRegex(out, r"(?m)^PASS")
            self.assert_clean(out + err)

        with self.subTest("an interruption"):
            flags = subprocess.CREATE_NEW_PROCESS_GROUP if os.name == "nt" else 0
            process = subprocess.Popen([NODE, LAUNCHER, *arguments_of(tag, database)],
                                       stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                       stderr=subprocess.PIPE, cwd=support.ROOT,
                                       creationflags=flags)
            self.addCleanup(process.kill)
            process.stdin.write(PASSWORD.encode("utf-8"))
            process.stdin.close()
            deadline = time.monotonic() + APPEARS_TIMEOUT
            while not leftovers():
                self.assertIsNone(process.poll(), "the launcher ended before it made anything")
                self.assertLess(time.monotonic(), deadline, "the launcher made nothing")
                time.sleep(0.2)
            process.send_signal(signal.CTRL_BREAK_EVENT if os.name == "nt" else signal.SIGINT)
            try:
                out, err = process.communicate(timeout=LAUNCHER_TIMEOUT)
            except subprocess.TimeoutExpired:
                process.kill()
                process.communicate()
                self.fail("the launcher did not end after the interruption")
            shown = out.decode("utf-8", "replace") + err.decode("utf-8", "replace")
            self.assertEqual(process.returncode, INTERRUPTED, shown)
            self.assertNotRegex(shown, r"(?m)^PASS")
            self.assert_clean(shown)


if __name__ == "__main__":
    unittest.main()
