"""The failure watcher `deploy/loop2-watch` and its schedule (D-356).

The script runs as a black box through the seam of `watch_script_support.py`: stand-ins for
`docker`, `pusher`, `flock` and `date`, a clock the test sets, and a state directory, a log and two
locks in a temporary directory. The stand-ins prove the script's reactions to an answer, never what
Docker's `inspect` and `logs` return nor that `pusher` delivers (D-235). The invariant of the
message, that a marker in a log line or in Docker's output never reaches `pusher`, a file or the
log, has its own file, `test_loop2_watch_message.py`.

What the tests below prove, by group:
- the five kinds each raise one call of `pusher` with their own fixed notice, a flood of browser
  lines moves only the browser kind, and a line counts only by its anchored prefix;
- the window: from the end of the last run to the start of this one, never more than 24 hours, left
  open by a run that dropped it, and "from now" when the state is missing or damaged;
- the state: strict, never sourced, rewritten by every quiet run, a replaced container recorded
  silently;
- the deployment's lock: looked at twice, never created and never opened for writing;
- the watcher's own lock, the throttles, the Docker commands, the time limits, the abnormal ends,
  the log and the schedule.
"""

import os
import re
import unittest

import watch_script_support as support

deploy_support = support.deploy_support
GAME, TUNNEL = support.GAME, support.TUNNEL
T0 = support.T0
FIVE_MINUTES = 5 * support.MINUTES
HOUR = 60 * support.MINUTES
DAY = 24 * HOUR


def failure_line(word="database", place="open"):
    return f'{{"failure":"{word}","kind":"SqliteError","code":"SQLITE_BUSY","place":"{place}"}}\n'


BROWSER_LINE = '{"failure":"browser","kind":"TypeError","code":"none","place":"app.main"}\n'
LIMITED_LINE = '{"failure":"browser","kind":"ReasonedFailure","code":"LIMITED","place":"browser"}\n'
EVENT_LINE = '{"event":"signed-in","accountId":7}\n'


def notice(kind):
    subject, text = support.NOTICES[kind]
    return subject, text + "\n"


def state_text(window_end, containers=None, last=None, messages=()):
    """A state file written out by hand in the format the script writes: `key value` lines."""
    if containers is None:
        containers = {GAME: (support.GAME_ID, support.STARTED),
                      TUNNEL: (support.TUNNEL_ID, support.STARTED)}
    lines = [f"window_end {window_end}"]
    lines += [f"container {name} {cid} {started}" for name, (cid, started) in containers.items()]
    lines += [f"last {kind} {time}" for kind, time in (last or {}).items()]
    lines += [f"message {time}" for time in messages]
    return "\n".join(lines) + "\n"


STATE_LINE = re.compile(
    r"^(window_end [1-9][0-9]{9,10}"
    r"|container (loop2|loop2-cloudflared) [0-9a-f]{64} \d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d{1,9})?Z"
    r"|last (down|unhealthy|restarted|failures|browser) [1-9][0-9]{9,10}"
    r"|message [1-9][0-9]{9,10})$")


class WithFixture(unittest.TestCase):

    def fixture(self):
        fixture = support.WatchFixture()
        self.addCleanup(fixture.remove)
        return fixture

    def primed(self):
        """A fixture whose first run has written the state at T0."""
        fixture = self.fixture()
        fixture.prime()
        return fixture

    def run_logged(self, fixture, epoch):
        """(the result of a run at `epoch`, the lines it added to the log)."""
        before = len(fixture.log_text().splitlines())
        result = fixture.run_at(epoch)
        return result, result.log.splitlines()[before:]

    def assert_quiet(self, result):
        self.assertEqual(result.code, 0, result)
        self.assertEqual(result.of("pusher"), [], result)

    def assert_sent(self, result, *kinds):
        self.assertEqual(result.code, 0, result)
        self.assertEqual(result.messages(), [notice(kind) for kind in kinds], result)


class TheFiveKinds(WithFixture):

    def test_each_kind_calls_pusher_once_with_its_own_fixed_notice(self):
        # The break: a notice paired with the wrong kind, or two calls for one trouble.
        arrangements = {
            "down": lambda f: f.set_container(support.GAME, support.GAME_ID, status="exited"),
            "unhealthy": lambda f: f.set_container(support.GAME, support.GAME_ID,
                                                   health="unhealthy"),
            "restarted": lambda f: f.set_container(support.TUNNEL, support.TUNNEL_ID,
                                                   started=support.RESTARTED),
            "failures": lambda f: f.set_log(failure_line()),
            "browser": lambda f: f.set_log(BROWSER_LINE),
        }
        self.assertEqual(set(arrangements), set(support.KINDS))
        for kind, arrange in arrangements.items():
            with self.subTest(kind):
                fixture = self.primed()
                arrange(fixture)
                result = fixture.run_at(T0 + FIVE_MINUTES)
                self.assert_sent(result, kind)

    def test_the_five_notices_differ_and_none_is_the_backups(self):
        subjects = [subject for subject, _text in support.NOTICES.values()]
        texts = [text for _subject, text in support.NOTICES.values()]
        self.assertEqual(len(set(subjects)), 5)
        self.assertEqual(len(set(texts)), 5)
        self.assertNotIn("kopia_bazy_loop2_nieudana", subjects)

    def test_a_container_that_is_not_running_is_down_whatever_it_is_doing_instead(self):
        for status in ("created", "paused", "restarting", "removing", "exited", "dead"):
            with self.subTest(status):
                fixture = self.primed()
                fixture.set_container(support.TUNNEL, support.TUNNEL_ID, status=status)
                self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "down")

    def test_a_missing_container_is_down(self):
        for name in (support.GAME, support.TUNNEL):
            with self.subTest(name):
                fixture = self.primed()
                fixture.remove_container(name)
                self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "down")

    def test_docker_that_cannot_be_read_is_down_and_only_down(self):
        fixture = self.primed()
        fixture.answer("docker", exit_code=1)
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "down")

    def test_an_answer_off_the_expected_shape_is_down_and_never_used(self):
        # The break: an id or a time taken as it comes, into the state or a command.
        shapes = ("", "not a container line\n", "0123 running none 2026-11-08T22:00:00Z\n",
                  f"{support.GAME_ID} running none 2026-11-08T22:00:00Z extra\n",
                  f"{support.GAME_ID} flying none 2026-11-08T22:00:00Z\n",
                  f"{support.GAME_ID} running none yesterday\n",
                  f"{support.GAME_ID.upper()} running none 2026-11-08T22:00:00Z\n",
                  f"{support.GAME_ID} running none 2026-11-08T22:00:00Z\nsecond line\n",
                  f"{support.GAME_ID} running none 2026-11-08T22:00:00Z; touch pwned\n")
        for shape in shapes:
            with self.subTest(shape):
                fixture = self.primed()
                fixture.set_container_output(support.GAME, shape)
                before = fixture.state_text()
                self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "down")
                self.assertFalse(os.path.exists(fixture.path("pwned")))
                after = fixture.state_text()
                self.assertIn(f"container loop2 {support.GAME_ID} {support.STARTED}", after)
                self.assertEqual(
                    [line for line in after.splitlines() if line.startswith("container")],
                    [line for line in before.splitlines() if line.startswith("container")])

    def test_a_service_that_is_unhealthy_is_reported_and_one_that_is_starting_is_not(self):
        fixture = self.primed()
        fixture.set_container(support.GAME, support.GAME_ID, health="starting")
        self.assert_quiet(fixture.run_at(T0 + FIVE_MINUTES))
        fixture.set_container(support.TUNNEL, support.TUNNEL_ID, health="unhealthy")
        self.assert_sent(fixture.run_at(T0 + 2 * FIVE_MINUTES), "unhealthy")

    def test_a_flood_of_browser_lines_and_the_limited_line_raise_the_browser_kind_only(self):
        # The break: browser reports counted with the server's failures, so a flood spends the
        # server kind's budget.
        fixture = self.primed()
        fixture.set_log(BROWSER_LINE * 200 + LIMITED_LINE)
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "browser")

    def test_failure_lines_of_the_server_raise_the_failures_kind_only(self):
        fixture = self.primed()
        fixture.set_log(failure_line("database") + failure_line("mail") + EVENT_LINE)
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "failures")

    def test_a_word_that_only_begins_like_browser_is_a_failure_of_the_server(self):
        # The break: a prefix cut before its closing quote.
        fixture = self.primed()
        fixture.set_log(failure_line("browsers") + failure_line("browser-extra"))
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "failures")

    def test_both_log_kinds_in_one_window_go_in_order_each_once(self):
        fixture = self.primed()
        fixture.set_log(BROWSER_LINE + failure_line() + BROWSER_LINE + failure_line())
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "failures", "browser")

    def test_every_kind_due_at_once_goes_in_the_order_of_the_table(self):
        fixture = self.primed()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.set_container(support.TUNNEL, support.TUNNEL_ID, health="unhealthy",
                              started=support.RESTARTED)
        fixture.set_log(BROWSER_LINE + failure_line())
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assert_sent(result, "down", "unhealthy", "restarted", "failures", "browser")

    def test_only_a_line_that_begins_as_a_failure_object_counts(self):
        # The break: a match anywhere in the line, so a player's text or a quoted object counts.
        quoted = '{"event":"link-issued","note":"{\\"failure\\":\\"x\\"}"}\n'
        fixture = self.primed()
        fixture.set_log(' {"failure":"database"}\n' + 'x{"failure":"database"}\n'
                        + 'about {"failure":"browser"} here\n' + quoted
                        + '{"failure": "database"}\n' + '{"event":"x","failure":"database"}\n')
        self.assert_quiet(fixture.run_at(T0 + FIVE_MINUTES))

    def test_a_line_on_the_standard_error_counts_like_one_on_the_standard_output(self):
        fixture = self.primed()
        fixture.set_log("", errors=failure_line())
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "failures")

    def test_a_quiet_healthy_run_calls_nothing_but_the_readings(self):
        fixture = self.primed()
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assert_quiet(result)
        self.assertEqual(set(result.tools()), {"docker", "flock", "date"}, result)
        self.assertEqual(set(result.tools()) & set(support.NEVER_CALLED), set(), result)


class TheWindow(WithFixture):

    def logs_calls(self, result):
        return [call for call in result.of("docker") if call[:1] == ["logs"]]

    def test_the_window_runs_from_the_end_of_the_last_run_to_the_start_of_this_one(self):
        # The break: a window that starts at the end of the run, or ends when the reading does.
        fixture = self.primed()
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assertEqual(self.logs_calls(result),
                         [["logs", "--since", str(T0), "--until", str(T0 + FIVE_MINUTES), "loop2"]],
                         result)
        self.assertIn(f"window_end {T0 + FIVE_MINUTES}\n", fixture.state_text())
        result = fixture.run_at(T0 + 2 * FIVE_MINUTES + 17)
        self.assertEqual(self.logs_calls(result),
                         [["logs", "--since", str(T0 + FIVE_MINUTES), "--until",
                           str(T0 + 2 * FIVE_MINUTES + 17), "loop2"]], result)

    def test_a_window_is_never_longer_than_24_hours(self):
        fixture = self.primed()
        fixture.write_state(state_text(T0 - 3 * DAY))
        result = fixture.run_at(T0)
        self.assertEqual(self.logs_calls(result),
                         [["logs", "--since", str(T0 - DAY), "--until", str(T0), "loop2"]], result)

    def test_a_window_of_exactly_24_hours_is_read_whole(self):
        fixture = self.primed()
        fixture.write_state(state_text(T0 - DAY))
        result = fixture.run_at(T0)
        self.assertEqual(self.logs_calls(result),
                         [["logs", "--since", str(T0 - DAY), "--until", str(T0), "loop2"]], result)

    def test_a_log_that_cannot_be_read_leaves_the_window_open_and_reports_nothing(self):
        fixture = self.primed()
        fixture.answer("docker", exit_code=1, match="logs *", stdout=failure_line().encode())
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assert_quiet(result)
        self.assertIn(f"window_end {T0}\n", fixture.state_text())
        fixture.clear_answers("docker")
        fixture.set_log(failure_line())
        result = fixture.run_at(T0 + 2 * FIVE_MINUTES)
        self.assertEqual(self.logs_calls(result),
                         [["logs", "--since", str(T0), "--until", str(T0 + 2 * FIVE_MINUTES),
                           "loop2"]], result)
        self.assert_sent(result, "failures")

    def test_a_game_container_that_cannot_be_read_leaves_the_window_open_too(self):
        fixture = self.primed()
        fixture.remove_container(support.GAME)
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assertEqual(self.logs_calls(result), [], result)
        self.assertIn(f"window_end {T0}\n", fixture.state_text())

    def test_a_clock_that_stands_still_reads_no_window(self):
        fixture = self.primed()
        result = fixture.run_at(T0)
        self.assertEqual(self.logs_calls(result), [], result)
        self.assert_quiet(result)

    def test_a_state_from_the_future_reads_no_window_and_restarts_from_now(self):
        fixture = self.primed()
        fixture.write_state(state_text(T0 + HOUR))
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assertEqual(self.logs_calls(result), [], result)
        self.assert_quiet(result)
        self.assertIn(f"window_end {T0 + FIVE_MINUTES}\n", fixture.state_text())

    def test_the_end_of_a_window_is_the_start_of_the_run_not_the_end_of_the_readings(self):
        # The break: lines written during the readings would fall in no window. The clock stands at
        # the run's start for the whole run, so the end the state keeps is that start.
        fixture = self.primed()
        fixture.set_log(failure_line())
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assertEqual(result.of("date"), [["-u", "+%s"]], "the time is read once, at the start")
        self.assertIn(f"window_end {T0 + FIVE_MINUTES}\n", fixture.state_text())
        self.assertEqual(self.logs_calls(result)[0][4], str(T0 + FIVE_MINUTES))


class TheState(WithFixture):

    # Each is a state the strict reading must refuse as a whole.
    DAMAGED = {
        "garbage": "garbage\n",
        "no window": state_text(T0).split("\n", 1)[1],
        "window not digits": state_text("yesterday"),
        "window with a command": f"window_end {T0}; touch pwned\n",
        "window with substitution": "window_end $(touch pwned)\n",
        "window twice": state_text(T0) + f"window_end {T0}\n",
        "window with a leading zero": state_text("0" + str(T0)),
        "window too short": state_text("12345"),
        "unknown key": state_text(T0) + "mode relaxed\n",
        "unknown container": state_text(T0) + f"container other {support.GAME_ID} "
                             f"{support.STARTED}\n",
        "container id too short": state_text(T0, {GAME: ("abc123", support.STARTED)}),
        "container id not hexadecimal": state_text(T0, {GAME: ("g" * 64, support.STARTED)}),
        "container id in capitals": state_text(T0, {GAME: (support.GAME_ID.upper(),
                                                           support.STARTED)}),
        "container time off the shape": state_text(T0, {GAME: (support.GAME_ID, "last tuesday")}),
        "container time with a command": state_text(
            T0, {GAME: (support.GAME_ID, "2026-11-08T22:00:00Z; touch pwned")}),
        "container twice": state_text(T0) + f"container loop2 {support.GAME_ID} "
                           f"{support.STARTED}\n",
        "kind unknown": state_text(T0, last={"sleeping": T0}),
        "kind time not digits": state_text(T0) + "last down soon\n",
        "kind twice": state_text(T0, last={"down": T0 - HOUR}) + f"last down {T0 - 2 * HOUR}\n",
        "message not digits": state_text(T0) + "message now\n",
        "message with a command": state_text(T0) + "message 1 $(touch pwned)\n",
        "a blank line": state_text(T0) + "\n",
        "a line with a space in front": state_text(T0) + f" message {T0}\n",
        "a carriage return": state_text(T0).replace("\n", "\r\n"),
        "far too many lines": state_text(T0) + f"message {T0 - HOUR}\n" * 500,
    }

    def test_a_missing_state_sends_nothing_and_writes_one_that_works(self):
        # The break: a lost state file that reads as an outage and floods the owner.
        fixture = self.fixture()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.set_log(failure_line() + BROWSER_LINE)
        result = fixture.run_at(T0)
        self.assert_quiet(result)
        self.assertEqual([c for c in result.of("docker") if c[:1] == ["logs"]], [], result)
        self.assertIsNotNone(fixture.state_text(), result)
        self.assertEqual(fixture.state_text().splitlines()[0], f"window_end {T0}")
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "down", "failures", "browser")

    def test_a_damaged_state_sends_nothing_runs_nothing_and_is_replaced(self):
        for name, damaged in self.DAMAGED.items():
            with self.subTest(name):
                fixture = self.fixture()
                fixture.write_state(damaged)
                fixture.set_container(support.GAME, support.GAME_ID, status="exited")
                fixture.set_log(failure_line())
                result = fixture.run_at(T0)
                self.assert_quiet(result)
                self.assertFalse(os.path.exists(fixture.path("pwned")), result)
                self.assertEqual([c for c in result.of("docker") if c[:1] == ["logs"]], [],
                                 result)
                text = fixture.state_text()
                self.assertIsNotNone(text, result)
                self.assertEqual(text.splitlines()[0], f"window_end {T0}", text)
                for line in text.splitlines():
                    self.assertRegex(line, STATE_LINE)

    def test_the_state_is_plain_key_value_lines_of_digits_hexadecimal_and_a_time(self):
        fixture = self.primed()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.run_at(T0 + FIVE_MINUTES)
        lines = fixture.state_text().splitlines()
        self.assertTrue(lines, "the state is empty")
        for line in lines:
            self.assertRegex(line, STATE_LINE)
        self.assertEqual(fixture.state_text(), state_text(
            T0 + FIVE_MINUTES, last={"down": T0 + FIVE_MINUTES}, messages=[T0 + FIVE_MINUTES]))

    def test_a_quiet_run_rewrites_the_state_so_its_age_shows_the_watcher_lives(self):
        fixture = self.primed()
        fixture.run_at(T0 + FIVE_MINUTES)
        self.assertEqual(fixture.state_text(), state_text(T0 + FIVE_MINUTES))
        fixture.run_at(T0 + 2 * FIVE_MINUTES)
        self.assertEqual(fixture.state_text(), state_text(T0 + 2 * FIVE_MINUTES))

    def test_the_state_directory_is_made_when_missing(self):
        fixture = self.fixture()
        self.assertFalse(os.path.exists(fixture.state_directory))
        fixture.prime()
        self.assertTrue(os.path.isdir(fixture.state_directory))

    def test_a_replaced_container_raises_no_restarted_and_is_recorded(self):
        # The break: a deployment's new container taken for a restart of the old one.
        fixture = self.primed()
        fixture.set_container(support.GAME, support.OTHER_ID, health="healthy",
                              started=support.RESTARTED)
        self.assert_quiet(fixture.run_at(T0 + FIVE_MINUTES))
        self.assertIn(f"container loop2 {support.OTHER_ID} {support.RESTARTED}\n",
                      fixture.state_text())
        fixture.set_container(support.GAME, support.OTHER_ID, health="healthy",
                              started="2026-11-09T00:20:00.000000000Z")
        self.assert_sent(fixture.run_at(T0 + 2 * FIVE_MINUTES), "restarted")

    def test_a_restart_is_reported_once(self):
        fixture = self.primed()
        fixture.set_container(support.TUNNEL, support.TUNNEL_ID, started=support.RESTARTED)
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "restarted")
        self.assert_quiet(fixture.run_at(T0 + 2 * FIVE_MINUTES))

    def test_a_container_new_to_the_state_is_recorded_silently(self):
        fixture = self.primed()
        fixture.write_state(state_text(T0, containers={
            GAME: (support.GAME_ID, support.STARTED)}))
        self.assert_quiet(fixture.run_at(T0 + FIVE_MINUTES))
        self.assertIn(f"container loop2-cloudflared {support.TUNNEL_ID} {support.STARTED}\n",
                      fixture.state_text())

    def test_a_container_that_cannot_be_read_keeps_its_old_entry(self):
        fixture = self.primed()
        fixture.remove_container(support.TUNNEL)
        fixture.run_at(T0 + FIVE_MINUTES)
        self.assertIn(f"container loop2-cloudflared {support.TUNNEL_ID} {support.STARTED}\n",
                      fixture.state_text())

    def test_the_state_records_a_message_sent_and_nothing_older_than_its_need(self):
        fixture = self.primed()
        fixture.write_state(state_text(T0, last={"failures": T0 - 7 * HOUR},
                                       messages=[T0 - DAY - 1, T0 - HOUR]))
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "down")
        self.assertEqual(fixture.state_text(), state_text(
            T0 + FIVE_MINUTES, last={"down": T0 + FIVE_MINUTES, "failures": T0 - 7 * HOUR},
            messages=[T0 - HOUR, T0 + FIVE_MINUTES]))


class TheDeploymentLock(WithFixture):

    def shared_calls(self, result):
        return [call for call in result.of("flock") if "--shared" in call]

    def test_a_held_lock_ends_the_run_before_any_reading_and_leaves_the_state_alone(self):
        # The break: a run during a deployment, which reads containers that are being replaced.
        fixture = self.primed()
        before = fixture.state_text()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.hold_deploy_lock_from(1)
        result, lines = self.run_logged(fixture, T0 + FIVE_MINUTES)
        self.assert_quiet(result)
        self.assertNotIn("docker", result.tools(), result)
        self.assertEqual(fixture.state_text(), before)
        self.assertEqual(len(lines), 1, result)
        self.assertRegex(lines[0], r"skipped.*(deployment|lock)", result)

    def test_a_lock_taken_during_the_readings_drops_them_and_leaves_the_window_open(self):
        fixture = self.primed()
        before = fixture.state_text()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.set_log(failure_line() + BROWSER_LINE)
        fixture.hold_deploy_lock_from(2)
        result, lines = self.run_logged(fixture, T0 + FIVE_MINUTES)
        self.assert_quiet(result)
        self.assertIn("docker", result.tools(), "precondition: the readings were made")
        self.assertEqual(fixture.state_text(), before)
        self.assertEqual(len(lines), 1, result)
        self.assertRegex(lines[0], r"dropped", result)
        fixture.release_deploy_lock()
        result = fixture.run_at(T0 + 2 * FIVE_MINUTES)
        self.assertEqual([c for c in result.of("docker") if c[:1] == ["logs"]],
                         [["logs", "--since", str(T0), "--until", str(T0 + 2 * FIVE_MINUTES),
                           "loop2"]], result)
        self.assert_sent(result, "down", "failures", "browser")

    def test_the_log_line_of_a_held_lock_says_held_and_that_of_a_broken_flock_names_its_status(self):
        # The break: any non-zero status of `flock` named a held lock, so a host without `flock`
        # looked like a deployment that never ends.
        held = self.primed()
        held.hold_deploy_lock_from(1)
        _result, lines = self.run_logged(held, T0 + FIVE_MINUTES)
        self.assertEqual(len(lines), 1, lines)
        self.assertRegex(lines[0], r"skipped: the deployment lock is held \(flock exit 1\)")
        late = self.primed()
        late.hold_deploy_lock_from(2)
        _result, lines = self.run_logged(late, T0 + FIVE_MINUTES)
        self.assertEqual(len(lines), 1, lines)
        self.assertRegex(lines[0], r"dropped: the deployment lock is held \(flock exit 1\)")
        for status in (2, 127):
            with self.subTest(status):
                broken = self.primed()
                before = broken.state_text()
                broken.answer("flock", exit_code=status, match="*--shared*")
                result, lines = self.run_logged(broken, T0 + FIVE_MINUTES)
                self.assert_quiet(result)
                self.assertEqual(broken.state_text(), before)
                self.assertEqual(len(lines), 1, lines)
                self.assertRegex(lines[0], rf"skipped: .*\(flock exit {status}\)")
                self.assertNotRegex(lines[0], r"is held|holds")

    def test_the_lock_is_only_asked_for_shared_and_without_waiting_by_its_descriptor(self):
        # The break: `flock` called on the path, which would create the file as root; or a wait.
        fixture = self.primed()
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assertEqual(len(self.shared_calls(result)), 2, result)
        for call in self.shared_calls(result):
            self.assertEqual(call, ["--shared", "--nonblock", "8"], result)
        for call in result.of("flock"):
            self.assertNotIn("loop2-deploy.lock", " ".join(call), result)
            self.assertNotIn(fixture.deploy_lock, call, result)
            self.assertNotIn("--wait", call, result)

    def test_a_lock_that_was_free_is_let_go_at_once(self):
        fixture = self.primed()
        calls = fixture.run_at(T0 + FIVE_MINUTES).of("flock")
        shared = [i for i, call in enumerate(calls) if "--shared" in call]
        for index in shared:
            self.assertEqual(calls[index + 1], ["--unlock", "8"], calls)

    def test_a_missing_lock_file_means_no_deployment_and_is_not_created(self):
        # The break: the file made by the watcher as root, which locks the deploy account out.
        fixture = self.primed()
        os.remove(fixture.deploy_lock)
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "down")
        self.assertFalse(os.path.exists(fixture.deploy_lock))

    def test_the_lock_file_is_never_opened_for_writing_or_changed(self):
        # A file that cannot be written: opening it for writing would fail the run.
        fixture = self.primed()
        deploy_support.write_bytes(fixture.deploy_lock, b"held by the deployment account\n")
        os.chmod(fixture.deploy_lock, 0o444)
        self.addCleanup(os.chmod, fixture.deploy_lock, 0o644)
        before = os.stat(fixture.deploy_lock).st_mtime_ns
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "down")
        self.assertEqual(deploy_support.read_bytes(fixture.deploy_lock),
                         b"held by the deployment account\n")
        self.assertEqual(os.stat(fixture.deploy_lock).st_mtime_ns, before)

    def test_the_script_has_no_writing_redirection_to_the_deployment_lock(self):
        text = deploy_support.read_bytes(support.SCRIPT).decode()
        uses = [line for line in text.splitlines()
                if "DEPLOY_LOCK_FILE" in line and not line.startswith("readonly")]
        for line in uses:
            self.assertNotRegex(line, r">>?\s*\"?\$DEPLOY_LOCK_FILE", line)
            self.assertNotRegex(line, r"(touch|flock)\s+.*DEPLOY_LOCK_FILE", line)

    def test_the_lock_is_the_deployments_own(self):
        watcher = deploy_support.constants(deploy_support.read_bytes(support.SCRIPT))
        self.assertEqual(watcher["DEPLOY_LOCK_FILE"], deploy_support.constants()["LOCK_FILE"])


class TheWatchersOwnLock(WithFixture):

    def test_a_second_run_ends_at_once_and_touches_nothing(self):
        fixture = self.primed()
        before = fixture.state_text()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.answer("flock", exit_code=1, match="*--exclusive*")
        result, lines = self.run_logged(fixture, T0 + FIVE_MINUTES)
        self.assert_quiet(result)
        self.assertEqual(result.tools(), ["flock"], result)
        self.assertEqual(fixture.state_text(), before)
        self.assertEqual(len(lines), 1, result)
        self.assertRegex(lines[0], r"skipped", result)

    def test_the_log_line_of_a_taken_lock_says_so_and_that_of_a_broken_flock_names_its_status(self):
        # The break: any non-zero status of `flock` named another run, so a host without `flock`
        # looked like a run that is always in the way.
        taken = self.primed()
        taken.answer("flock", exit_code=1, match="*--exclusive*")
        _result, lines = self.run_logged(taken, T0 + FIVE_MINUTES)
        self.assertEqual(len(lines), 1, lines)
        self.assertRegex(lines[0], r"skipped: another run holds .*\(flock exit 1\)")
        for status in (2, 127):
            with self.subTest(status):
                broken = self.primed()
                before = broken.state_text()
                broken.answer("flock", exit_code=status, match="*--exclusive*")
                result, lines = self.run_logged(broken, T0 + FIVE_MINUTES)
                self.assert_quiet(result)
                self.assertEqual(broken.state_text(), before)
                self.assertEqual(len(lines), 1, lines)
                self.assertRegex(lines[0], rf"skipped: .*\(flock exit {status}\)")
                self.assertNotRegex(lines[0], r"is held|holds")

    def test_the_lock_is_exclusive_without_waiting_and_is_the_first_call(self):
        # The break: a wait on its own lock, which stacks runs up behind a stuck one.
        fixture = self.fixture()
        result = fixture.run_at(T0)
        self.assertTrue(result.of("flock"), result)
        self.assertEqual(result.of("flock")[0], ["--exclusive", "--nonblock", "7"], result)
        self.assertEqual(result.tools()[0], "flock", result)

    def test_a_lock_file_that_cannot_be_opened_is_a_failed_run_with_no_notice(self):
        fixture = self.primed()
        fixture.write_copy(OWN_LOCK_FILE=deploy_support.shell_path(
            fixture.path("no-such-directory", "loop2-watch.lock")))
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assertEqual(result.code, 3, result)
        self.assertEqual(result.of("pusher"), [], result)
        self.assertRegex(result.log.splitlines()[-1], r"end: failed \(exit 3\)$", result)


class TheThrottles(WithFixture):

    def test_a_kind_is_not_sent_again_within_six_hours_and_is_sent_after_them(self):
        # The break: a message per run for a trouble that stays.
        fixture = self.fixture()
        fixture.write_state(state_text(T0, last={"down": T0 - 3 * HOUR}))
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        self.assert_quiet(fixture.run_at(T0 + FIVE_MINUTES))
        fixture.write_state(state_text(T0, last={"down": T0 + FIVE_MINUTES - 6 * HOUR + 1}))
        self.assert_quiet(fixture.run_at(T0 + FIVE_MINUTES))
        fixture.write_state(state_text(T0, last={"down": T0 + FIVE_MINUTES - 6 * HOUR}))
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "down")

    def test_a_kind_held_back_does_not_hold_back_another(self):
        fixture = self.fixture()
        fixture.write_state(state_text(T0, last={"down": T0 - HOUR}))
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.set_log(failure_line())
        self.assert_sent(fixture.run_at(T0 + FIVE_MINUTES), "failures")

    def test_at_most_six_messages_go_in_a_rolling_24_hours(self):
        fixture = self.fixture()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        last_old = T0 - 7 * HOUR
        sent_in_day = [T0 - 6 * HOUR + n * FIVE_MINUTES for n in range(6)]
        fixture.write_state(state_text(T0, last={"down": last_old}, messages=sent_in_day))
        self.assert_quiet(fixture.run_at(T0 + FIVE_MINUTES))

    def test_the_budget_counts_a_message_the_second_before_it_leaves_the_day_but_not_after(self):
        now = T0 + DAY
        fixture = self.fixture()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        inside = [now - DAY + 1] + [now - HOUR] * 5
        fixture.write_state(state_text(now - FIVE_MINUTES, messages=inside))
        self.assert_quiet(fixture.run_at(now))
        outside = [now - DAY] + [now - HOUR] * 5
        fixture.write_state(state_text(now - FIVE_MINUTES, messages=outside))
        self.assert_sent(fixture.run_at(now), "down")

    def test_kinds_due_together_go_in_order_until_the_budget_ends(self):
        fixture = self.fixture()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.set_container(support.TUNNEL, support.TUNNEL_ID, health="unhealthy")
        fixture.set_log(failure_line() + BROWSER_LINE)
        recent = [T0 - HOUR] * 4
        fixture.write_state(state_text(T0, messages=recent))
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assert_sent(result, "down", "unhealthy")
        self.assertEqual(fixture.state_text(), state_text(
            T0 + FIVE_MINUTES, last={"down": T0 + FIVE_MINUTES, "unhealthy": T0 + FIVE_MINUTES},
            messages=recent + [T0 + FIVE_MINUTES] * 2))

    def test_what_is_held_back_is_counted_in_the_log_only(self):
        fixture = self.fixture()
        fixture.write_state(state_text(T0, last={"down": T0 - HOUR}))
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        result, lines = self.run_logged(fixture, T0 + FIVE_MINUTES)
        self.assert_quiet(result)
        self.assertEqual(len(lines), 1, result)
        self.assertRegex(lines[0], r"held.*down", result)

    def test_a_message_that_pusher_reports_as_failed_still_counts_as_sent(self):
        # The break: a retry on the next run, which is a flood when pusher stays down.
        fixture = self.primed()
        fixture.answer("pusher", exit_code=6)
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assert_sent(result, "down")
        self.assertRegex(result.log, r"\b6\b", result)
        self.assertIn(f"last down {T0 + FIVE_MINUTES}\n", fixture.state_text())
        self.assert_quiet(fixture.run_at(T0 + 2 * FIVE_MINUTES))

    def test_a_message_that_pusher_never_finishes_is_cut_off_and_counts_as_sent(self):
        fixture = self.primed()
        fixture.write_copy(PUSHER_WAIT_SECONDS="1", KILL_WAIT_SECONDS="1")
        fixture.answer("pusher", action="hang")
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assertEqual(result.code, 0, result)
        self.assertEqual(len(result.of("pusher")), 1, result)
        self.assertIn(f"last down {T0 + FIVE_MINUTES}\n", fixture.state_text())

    def test_one_pusher_call_goes_for_each_message_and_none_for_the_watcher_itself(self):
        fixture = self.primed()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.set_log(BROWSER_LINE)
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assertEqual(len(result.of("pusher")), 2, result)


class TheDockerCommands(WithFixture):

    def test_every_docker_command_is_a_read_of_the_two_containers_in_one_fixed_form(self):
        # The break: a command that changes a container, or a second form of the reading.
        fixture = self.primed()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.set_log(failure_line())
        result = fixture.run_at(T0 + FIVE_MINUTES)
        commands = result.of("docker")
        inspects = [c for c in commands if c[:1] == ["inspect"]]
        logs = [c for c in commands if c[:1] == ["logs"]]
        self.assertEqual(len(inspects) + len(logs), len(commands), commands)
        self.assertEqual(len(inspects), 2, commands)
        self.assertEqual(len(logs), 1, commands)
        formats = set()
        for command in inspects:
            self.assertEqual(command[:4], ["inspect", "--type", "container", "--format"], command)
            self.assertEqual(len(command), 6, command)
            formats.add(command[4])
        self.assertEqual({command[5] for command in inspects}, {"loop2", "loop2-cloudflared"})
        self.assertEqual(len(formats), 1, "the two readings use two formats")
        for field in ("{{.Id}}", "{{.State.Status}}", "{{.State.Health", "{{.State.StartedAt}}"):
            self.assertIn(field, next(iter(formats)))
        self.assertEqual(logs[0], ["logs", "--since", str(T0), "--until", str(T0 + FIVE_MINUTES),
                                   "loop2"])

    def test_the_commands_the_script_holds_are_only_these_two_reads(self):
        # The safeguard of the invariant test that does not cover the watcher: what the script can
        # run, not only what one run did.
        text = deploy_support.read_bytes(support.SCRIPT).decode()
        commands = support.process_support.docker_commands(text)
        self.assertTrue(commands, "the script holds no Docker command to read")
        for number, words in commands:
            self.assertIn(words[:1], (["inspect"], ["logs"]), f"line {number}: {words}")

    def test_every_call_of_docker_and_pusher_stands_under_timeout_with_a_kill_delay(self):
        text = deploy_support.read_bytes(support.SCRIPT).decode()
        joined = re.sub(r"\\\n\s*", " ", text)
        calls = [line.strip() for line in joined.splitlines()
                 if re.search(r"(^|[\s$(])(docker|pusher)\s+(\w+|\"\$subject\")", line)
                 and not line.lstrip().startswith(("#", "readonly", "log", "fail", "notes"))]
        self.assertEqual(len(calls), 3, calls)
        for line in calls:
            self.assertRegex(line, r"timeout --kill-after=\"\$KILL_WAIT_SECONDS\" "
                                   r"\"\$(DOCKER|PUSHER)_WAIT_SECONDS\"", line)

    def test_a_docker_that_never_answers_is_cut_off_and_read_as_down(self):
        for pattern in ("inspect *", "logs *"):
            with self.subTest(pattern):
                fixture = self.primed()
                fixture.write_copy(DOCKER_WAIT_SECONDS="1", KILL_WAIT_SECONDS="1")
                fixture.answer("docker", action="hang", match=pattern)
                result = fixture.run_at(T0 + FIVE_MINUTES)
                self.assertEqual(result.code, 0, result)
                if pattern.startswith("inspect"):
                    self.assert_sent(result, "down")
                else:
                    self.assertEqual(result.of("pusher"), [], result)
                    self.assertIn(f"window_end {T0}\n", fixture.state_text())

    def test_the_standard_error_of_docker_reaches_nowhere(self):
        fixture = self.primed()
        fixture.answer("docker", exit_code=1, stderr=b"daemon-error-text-3c1f\n")
        fixture.set_log("", errors="log-error-text-3c1f\n")
        result = fixture.run_at(T0 + FIVE_MINUTES)
        for text in (result.stdout, result.stderr, result.log, fixture.state_text()):
            self.assertNotIn("3c1f", text, result)

    def test_no_tool_that_reaches_another_machine_is_called(self):
        fixture = self.primed()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.set_log(failure_line() + BROWSER_LINE)
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assertEqual(set(result.tools()) & set(support.NEVER_CALLED), set(), result)
        self.assertLessEqual(set(result.tools()), {"docker", "pusher", "flock", "date"})


class TheAbnormalEnds(WithFixture):

    LAST_LINE = r"end: failed \(exit {code}\)$"

    def assert_failed_end(self, result, code):
        self.assertEqual(result.code, code, result)
        self.assertEqual(result.of("pusher"), [], result)
        self.assertRegex(result.log.splitlines()[-1], self.LAST_LINE.format(code=code), result)

    def test_a_clock_that_cannot_be_read_is_a_failed_run_with_no_notice(self):
        fixture = self.primed()
        fixture.answer("date", exit_code=1)
        self.assert_failed_end(fixture.run_at(T0 + FIVE_MINUTES), 5)

    def test_a_clock_that_gives_no_seconds_is_a_failed_run(self):
        for answer in (b"", b"soon\n", b"1794182400 ; id\n", b"0794182400\n", b"12\n"):
            with self.subTest(answer):
                fixture = self.primed()
                fixture.answer("date", stdout=answer)
                self.assert_failed_end(fixture.run_at(T0 + FIVE_MINUTES), 5)

    def test_an_argument_is_refused_before_anything_runs(self):
        fixture = self.primed()
        result = fixture.run(["--dry-run"])
        self.assert_failed_end(result, 2)
        self.assertNotIn("docker", result.tools(), result)

    def test_a_state_that_cannot_be_written_is_a_failed_run_and_sends_nothing(self):
        # The break: a message sent whose bookkeeping failed, which repeats at every run.
        fixture = self.primed()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        os.makedirs(fixture.state_file + ".new")
        self.assert_failed_end(fixture.run_at(T0 + FIVE_MINUTES), 6)

    def test_a_state_directory_that_cannot_be_made_is_a_failed_run(self):
        fixture = self.fixture()
        fixture.write_copy(STATE_DIRECTORY=deploy_support.shell_path(
            fixture.path("var", "no-such-directory", "deeper", "loop2-watch")))
        deploy_support.write_bytes(fixture.path("var", "no-such-directory"), b"a file\n")
        self.assert_failed_end(fixture.run_at(T0), 4)

    def test_a_signal_names_its_exit_in_the_log_and_sends_no_notice(self):
        codes = {"HUP": 129, "INT": 130, "USR1": 138, "USR2": 140, "ALRM": 142, "TERM": 143}
        for name, code in codes.items():
            with self.subTest(name):
                fixture = self.primed()
                fixture.set_container(support.GAME, support.GAME_ID, status="exited")
                fixture.answer("docker", action=name, match="logs *")
                self.assert_failed_end(fixture.run_at(T0 + FIVE_MINUTES), code)

    def test_a_signal_with_no_trap_still_leaves_the_exit_line(self):
        fixture = self.primed()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.answer("docker", action="VTALRM", match="logs *")
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assertNotEqual(result.code, 0, result)
        self.assertEqual(result.of("pusher"), [], result)
        self.assertRegex(result.log.splitlines()[-1], r"end: failed \(exit [1-9][0-9]*\)$", result)

    def test_no_failed_run_leaves_a_half_written_state_behind(self):
        fixture = self.primed()
        fixture.answer("docker", action="TERM", match="logs *")
        fixture.run_at(T0 + FIVE_MINUTES)
        self.assertFalse(os.path.exists(fixture.state_file + ".new"))
        self.assertEqual(fixture.state_text(), state_text(T0))


class TheLog(WithFixture):

    def test_a_quiet_healthy_run_writes_no_line(self):
        fixture = self.primed()
        result, lines = self.run_logged(fixture, T0 + FIVE_MINUTES)
        self.assertEqual(lines, [], result)
        self.assertEqual(result.stdout, "", result)

    def test_an_eventful_run_writes_one_line_with_the_time_the_kinds_and_the_counts(self):
        fixture = self.primed()
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        fixture.set_log(failure_line() + failure_line("mail") + failure_line("mail")
                        + BROWSER_LINE * 5)
        result, lines = self.run_logged(fixture, T0 + FIVE_MINUTES)
        self.assertEqual(len(lines), 1, result)
        # 2026-11-09T00:05:00Z, by hand: five minutes after the clock's start.
        self.assertRegex(lines[0], r"^2026-11-09T00:05:00Z loop2-watch: ", result)
        for kind in ("down", "failures", "browser"):
            self.assertIn(kind, lines[0])
        self.assertRegex(lines[0], r"\b3\b", result)
        self.assertRegex(lines[0], r"\b5\b", result)
        self.assertEqual(result.stdout.splitlines()[-1], lines[0], result)

    def test_the_first_run_says_so_in_one_line(self):
        result = self.fixture().run_at(T0)
        self.assertEqual(len(result.log.splitlines()), 1, result)
        self.assertRegex(result.log, r"^2026-11-09T00:00:00Z loop2-watch: .*first run", result)

    def test_a_log_that_cannot_be_written_is_said_once_and_does_not_stop_the_run(self):
        fixture = self.primed()
        fixture.write_copy(LOG_FILE=deploy_support.shell_path(
            fixture.path("no-such-directory", "loop2-watch.log")))
        fixture.set_container(support.GAME, support.GAME_ID, status="exited")
        result = fixture.run_at(T0 + FIVE_MINUTES)
        self.assert_sent(result, "down")
        self.assertEqual(result.stderr.count("cannot write the log file"), 1, result)

    def test_a_log_that_cannot_be_read_is_one_line_of_its_own(self):
        fixture = self.primed()
        fixture.answer("docker", exit_code=1, match="logs *")
        result, lines = self.run_logged(fixture, T0 + FIVE_MINUTES)
        self.assertEqual(len(lines), 1, result)
        self.assertRegex(lines[0], r"logs.*unreadable", result)


class TheScheduleAsCronReadsIt(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.data = deploy_support.read_bytes(support.SCHEDULE)
        cls.lines = [line for line in cls.data.decode().splitlines()
                     if line.strip() and not line.lstrip().startswith("#")]

    def test_one_line_starts_the_installed_script_every_five_minutes_as_root(self):
        schedules = [line.split() for line in self.lines if "=" not in line]
        self.assertEqual(schedules, [["*/5", "*", "*", "*", "*", "root",
                                      "/usr/local/bin/loop2-watch"]])

    def test_mail_is_off_before_the_schedule_line(self):
        self.assertEqual(self.lines[0], 'MAILTO=""')

    def test_cron_can_read_the_file(self):
        # cron ignores a last line with no newline, and a carriage return breaks the command.
        self.assertTrue(self.data.endswith(b"\n"))
        self.assertNotIn(b"\r", self.data)


class TheConstants(unittest.TestCase):

    def test_the_constants_name_the_design_s_own_files_and_containers(self):
        # The seam replaces the paths, so a wrong one would show nowhere else.
        block = deploy_support.constants(deploy_support.read_bytes(support.SCRIPT))
        self.assertEqual(block["LOG_FILE"], "/var/log/loop2-watch.log")
        self.assertEqual(block["STATE_DIRECTORY"], "/var/lib/loop2-watch")
        self.assertEqual(block["OWN_LOCK_FILE"], "/run/loop2-watch.lock")
        self.assertEqual(block["GAME_CONTAINER"], "loop2")
        self.assertEqual(block["TUNNEL_CONTAINER"], "loop2-cloudflared")


if __name__ == "__main__":
    unittest.main()
