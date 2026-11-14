"""Invariant failure-watcher-message: Every message the failure watcher sends through `pusher` has a
fixed subject and a fixed text that say only which kind of trouble it found, with nothing of a
player and nothing of a tool's output.

The check drives the repository's script `deploy/loop2-watch` as a black box through the seam of
`tests/deploy/watch_script_support.py`: a temporary copy in which only the marked constants block
is replaced, with stand-ins for its tools.

Reading of the sentence:
- every message: one for each of the six kinds (down, unhealthy, restarted, failures, backup,
  browser), made to happen in turn, and all six in one run;
- a fixed subject and a fixed text: the subject is the call's only argument, ASCII and made of the
  characters a URL path takes without escaping; the text is the one line `pusher` reads from its
  standard input; both are the same bytes whatever the stand-in tools printed (the same notice as
  a run with no marker at all), the six kinds differ from each other and from the backup script's;
- nothing of a player and nothing of a tool's output: a marker, made to look like a player's
  address, stands in the lines of the stand-in log (the lines the watcher counts, and a line it
  does not), in the standard output and the standard error of the stand-in `docker` for `inspect`
  (an answer of the right shape on the standard error; an answer off the shape that exits 0; a
  failed command) and for `logs`, in the lines of the log of the backup (lines that look like the
  end of a sent night and are not, and one that is) and in a damaged state file; it
  reaches no argument and no standard input of `pusher`, nor the watcher's standard output, its
  standard error, its log, its state file, the log of the backup, which the watcher only reads, or
  any other file of the machine the run used. A precondition shows that the marker was really put
  before the watcher: the stand-in `docker` was asked for the reading that holds it, and the
  watcher's decision about the backup changes with the exact line that stands beside the marker.

A positive control runs a quiet night and asserts no call of `pusher`, so a call above answers
the trouble, not the run.

Does NOT cover: that `pusher` delivers or what it does with a subject and a text (D-235,
`mikrus-pusher-mail`); the files of the stand-in tools themselves, which hold the marker as the
test put it there.

A machine without Git or Git's own bash skips these tests, so the invariant reports unchecked,
never passed.
"""

import os
import re
import unittest

import watch_script_support as support

GAME, TUNNEL = support.GAME, support.TUNNEL
T0 = support.T0
LATER = T0 + 5 * support.MINUTES
MARKER = "attacker-marker-8d3f@example.invalid"
SUBJECT_CHARACTERS = re.compile(r"^[a-z0-9_]+$")
BACKUP_SUBJECT = "kopia_bazy_loop2_nieudana"

BROWSER_LINE = (f'{{"failure":"browser","kind":"{MARKER}","code":"{MARKER}",'
                f'"place":"{MARKER}"}}\n')
FAILURE_LINE = (f'{{"failure":"database","kind":"SqliteError","code":"{MARKER}","place":"open",'
                f'"accountId":"{MARKER}"}}\n')
UNCOUNTED_LINE = f"{MARKER} wrote a line that begins with no failure object\n"
SENT_AGO = LATER - 3600
# Lines of the log of the backup that hold the marker where a line of the real log never does (the
# error text of a tool, a file name, a stage); none is the end of a sent night as the script writes it.
BACKUP_LOOK_ALIKES = (
    f"{support.stamp(SENT_AGO)} loop2-backup: end: sent {MARKER}\n"
    f"{support.stamp(SENT_AGO)} loop2-backup: end: sent loop2-accounts-1.sqlite.age {MARKER}\n"
    f"{support.stamp(SENT_AGO)} loop2-backup: {MARKER}: end: sent loop2-accounts-1.sqlite.age\n"
    f"{MARKER} {support.stamp(SENT_AGO)} loop2-backup: end: sent loop2-accounts-1.sqlite.age\n"
    f"{support.stamp(SENT_AGO)} loop2-backup: stage stream: docker exit 1, age exit 1 "
    f"(exit 6) {MARKER}\n"
    f"{MARKER}\n"
)
EXACT_BACKUP_LINE = support.sent_line(SENT_AGO)


def healthy_line(container_id, health="none", status="running", started=support.STARTED):
    return f"{container_id} {status} {health} {started}\n"


def arrange_down(fixture):
    fixture.answer("docker", exit_code=1, stdout=(MARKER + "\n").encode(),
                   stderr=(MARKER + "\n").encode(), match="inspect * loop2-cloudflared")


def arrange_unhealthy(fixture):
    fixture.answer("docker", stdout=healthy_line(support.GAME_ID, health="unhealthy").encode(),
                   stderr=(MARKER + "\n").encode(), match="inspect * loop2")


def arrange_restarted(fixture):
    fixture.answer("docker", stdout=healthy_line(support.TUNNEL_ID,
                                                 started=support.RESTARTED).encode(),
                   stderr=(MARKER + "\n").encode(), match="inspect * loop2-cloudflared")


def arrange_failures(fixture):
    fixture.set_log(FAILURE_LINE + UNCOUNTED_LINE, errors=MARKER + "\n")


def arrange_backup(fixture):
    fixture.write_backup_log(BACKUP_LOOK_ALIKES)


def arrange_browser(fixture):
    fixture.set_log(BROWSER_LINE * 3 + UNCOUNTED_LINE, errors=MARKER + "\n")


ARRANGEMENTS = {"down": arrange_down, "unhealthy": arrange_unhealthy,
                "restarted": arrange_restarted, "failures": arrange_failures,
                "backup": arrange_backup, "browser": arrange_browser}


def noise(fixture):
    """The marker on the standard error of every healthy reading and of `logs`, put after any
    arrangement so the arrangement's answer, which comes first, wins where it applies."""
    fixture.answer("docker", stdout=healthy_line(support.GAME_ID, health="healthy").encode(),
                   stderr=(MARKER + "\n").encode(), match="inspect * loop2")
    fixture.answer("docker", stdout=healthy_line(support.TUNNEL_ID).encode(),
                   stderr=(MARKER + "\n").encode(), match="inspect * loop2-cloudflared")


class FixedMessages(unittest.TestCase):

    def fixture(self):
        fixture = support.WatchFixture()
        self.addCleanup(fixture.remove)
        fixture.prime()
        return fixture

    def everywhere(self, fixture, result):
        """Every text and every file the run could have put the marker in, but the stand-ins' own
        directory and the one of the backup log, whose files hold what the test put there."""
        files = fixture.every_file(outside=(fixture.stubs, os.path.dirname(fixture.backup_log)))
        texts = [result.stdout, result.stderr, result.log, str(result.calls),
                 str(result.pusher_inputs), str(result.messages())]
        texts += [data.decode("utf-8", "replace") for data in files.values()]
        return texts, files

    def assert_one_fixed_notice(self, result, kind):
        subject, text = support.NOTICES[kind]
        self.assertEqual(result.code, 0, result)
        self.assertEqual(result.messages(), [(subject, text + "\n")], result)
        self.assertEqual(result.of("pusher"), [[subject]], result)
        self.assertEqual(result.pusher_inputs, [(text + "\n").encode("utf-8")], result)

    def test_each_kind_sends_its_fixed_notice_and_nothing_a_tool_printed(self):
        # invariant: failure-watcher-message
        # The break: a log line, a count or Docker's text in the subject or the text, or in the
        # state or the log the next reader of the machine trusts.
        for kind, arrange in ARRANGEMENTS.items():
            with self.subTest(kind):
                fixture = self.fixture()
                arrange(fixture)
                noise(fixture)
                fixture.set_clock(LATER)
                backup_log = support.deploy_support.read_bytes(fixture.backup_log)
                result = fixture.run()
                self.assert_one_fixed_notice(result, kind)
                self.assertEqual(support.deploy_support.read_bytes(fixture.backup_log),
                                 backup_log, "the watcher wrote into the log of the backup")
                texts, files = self.everywhere(fixture, result)
                for text in texts:
                    self.assertNotIn(MARKER, text)
                self.assertNotIn("example.invalid", " ".join(texts))
                self.assertTrue(files, "precondition: the run left files to read")

    def test_the_marker_was_put_before_the_watcher_which_asked_for_the_reading(self):
        # invariant: failure-watcher-message
        # A precondition of the test above: the marker stood in what the watcher read.
        for kind in ("failures", "browser"):
            with self.subTest(kind):
                fixture = self.fixture()
                ARRANGEMENTS[kind](fixture)
                result = fixture.run_at(LATER)
                stand_in_output = support.deploy_support.read_bytes(
                    os.path.join(fixture.stubs, "log-output")).decode()
                self.assertIn(MARKER, stand_in_output)
                self.assertEqual([c for c in result.of("docker") if c[:1] == ["logs"]],
                                 [["logs", "--since", str(T0), "--until", str(LATER), "loop2"]],
                                 result)
        fixture = self.fixture()
        arrange_down(fixture)
        result = fixture.run_at(LATER)
        self.assertEqual(sum(c[:1] == ["inspect"] for c in result.of("docker")), 2, result)
        rule = os.path.join(fixture.stubs, "answers", "docker", "000", "stdout")
        self.assertIn(MARKER, support.deploy_support.read_bytes(rule).decode())

    def test_the_log_of_the_backup_is_read_and_a_marker_beside_the_exact_line_reaches_nothing(self):
        # invariant: failure-watcher-message
        # The marker stands in lines that look like the end of a sent night; where one line is
        # exact the watcher has no trouble to report, and the marker reaches nothing it writes.
        fixture = self.fixture()
        fixture.write_backup_log(BACKUP_LOOK_ALIKES + EXACT_BACKUP_LINE)
        self.assertIn(MARKER, support.deploy_support.read_bytes(fixture.backup_log).decode())
        result = fixture.run_at(LATER)
        self.assertEqual(result.code, 0, result)
        self.assertEqual(result.of("pusher"), [], result)
        texts, files = self.everywhere(fixture, result)
        for text in texts:
            self.assertNotIn(MARKER, text)
        self.assertTrue(files, "precondition: the run left files to read")

    def test_all_six_kinds_in_one_run_send_six_fixed_notices_and_nothing_else(self):
        # invariant: failure-watcher-message
        fixture = self.fixture()
        arrange_down(fixture)
        arrange_backup(fixture)
        fixture.answer("docker", stdout=healthy_line(support.GAME_ID, health="unhealthy").encode(),
                       stderr=(MARKER + "\n").encode(), match="inspect * loop2")
        fixture.set_log(FAILURE_LINE + BROWSER_LINE + UNCOUNTED_LINE, errors=MARKER + "\n")
        # The tunnel is down in this run, so `restarted` rides on the game container, whose
        # start time the state remembers: the state is rewritten with it first.
        fixture.write_state(f"window_end {T0}\ncontainer loop2 {support.GAME_ID} "
                            f"{support.STARTED.replace('22:00', '21:00')}\n"
                            f"container loop2-cloudflared {support.TUNNEL_ID} {support.STARTED}\n")
        result = fixture.run_at(LATER)
        self.assertEqual(result.messages(), [(support.NOTICES[kind][0], support.NOTICES[kind][1]
                                              + "\n") for kind in support.KINDS], result)
        texts, _files = self.everywhere(fixture, result)
        for text in texts:
            self.assertNotIn(MARKER, text)

    def test_the_subject_is_one_word_a_url_path_takes_and_no_two_notices_are_alike(self):
        # invariant: failure-watcher-message
        subjects, texts = [], []
        for kind, arrange in ARRANGEMENTS.items():
            with self.subTest(kind):
                fixture = self.fixture()
                arrange(fixture)
                result = fixture.run_at(LATER)
                self.assertEqual(len(result.of("pusher")), 1, result)
                arguments = result.of("pusher")[0]
                self.assertEqual(len(arguments), 1, result)
                self.assertRegex(arguments[0], SUBJECT_CHARACTERS)
                self.assertNotEqual(arguments[0], BACKUP_SUBJECT)
                self.assertEqual(len(result.pusher_inputs[0].decode("utf-8").splitlines()), 1)
                subjects.append(arguments[0])
                texts.append(result.pusher_inputs[0])
        self.assertEqual(len(set(subjects)), 6, subjects)
        self.assertEqual(len(set(texts)), 6, texts)

    def test_a_damaged_state_file_with_the_marker_reaches_nothing_the_run_writes(self):
        # invariant: failure-watcher-message
        fixture = self.fixture()
        fixture.write_state(f"window_end {T0}\ncontainer loop2 {MARKER} {MARKER}\n{MARKER}\n")
        arrange_failures(fixture)
        result = fixture.run_at(LATER)
        self.assertEqual(result.of("pusher"), [], result)
        texts, _files = self.everywhere(fixture, result)
        for text in texts:
            self.assertNotIn(MARKER, text)

    def test_docker_text_on_a_failed_reading_reaches_nothing(self):
        # invariant: failure-watcher-message
        fixture = self.fixture()
        fixture.answer("docker", exit_code=1, stdout=(MARKER + "\n").encode(),
                       stderr=(MARKER + "\n").encode())
        result = fixture.run_at(LATER)
        self.assert_one_fixed_notice(result, "down")
        texts, _files = self.everywhere(fixture, result)
        for text in texts:
            self.assertNotIn(MARKER, text)

    def test_an_inspect_that_succeeds_with_an_answer_off_the_shape_reaches_nothing(self):
        # invariant: failure-watcher-message
        # The break: the watcher quotes the raw answer of a successful `docker inspect`, which it
        # holds whole when the answer does not fit the expected shape, in its log or a message.
        shapes = {
            "the marker alone": MARKER + "\n",
            "the marker for the id": healthy_line(MARKER),
            "the marker for the status": healthy_line(support.GAME_ID, status=MARKER),
            "the marker for the health": healthy_line(support.GAME_ID, health=MARKER),
            "the marker for the start": healthy_line(support.GAME_ID, started=MARKER),
            "a good line and the marker after it": healthy_line(support.GAME_ID) + MARKER + "\n",
            "a good line with the marker appended": healthy_line(support.GAME_ID).rstrip("\n")
                                                    + " " + MARKER + "\n",
        }
        for name, answer in shapes.items():
            with self.subTest(name):
                fixture = self.fixture()
                fixture.answer("docker", stdout=answer.encode(), stderr=(MARKER + "\n").encode(),
                               match="inspect * loop2-cloudflared")
                noise(fixture)
                result = fixture.run_at(LATER)
                self.assert_one_fixed_notice(result, "down")
                rule = os.path.join(fixture.stubs, "answers", "docker", "000", "stdout")
                self.assertIn(MARKER, support.deploy_support.read_bytes(rule).decode(),
                              "precondition: the marker stands in the answer")
                self.assertTrue(
                    any(c[:1] == ["inspect"] and c[-1] == "loop2-cloudflared"
                        for c in result.of("docker")), "precondition: the answer was asked for")
                texts, _files = self.everywhere(fixture, result)
                for text in texts:
                    self.assertNotIn(MARKER, text)

    def test_control_a_quiet_run_with_the_marker_in_the_noise_calls_no_pusher(self):
        # invariant: failure-watcher-message
        fixture = self.fixture()
        fixture.set_log(UNCOUNTED_LINE, errors=MARKER + "\n")
        noise(fixture)
        result = fixture.run_at(LATER)
        self.assertEqual(result.code, 0, result)
        self.assertEqual(result.of("pusher"), [], result)
        texts, _files = self.everywhere(fixture, result)
        for text in texts:
            self.assertNotIn(MARKER, text)


if __name__ == "__main__":
    unittest.main()
