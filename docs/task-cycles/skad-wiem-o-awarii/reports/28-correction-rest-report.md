# Report 28 — correction: the other items worth fixing

Status: done (one choice to name, item 5; see "Choices").

Worktree `the root of the repository`, branch `task/skad-wiem-o-awarii`, `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96` (checked with `git -C .the-way rev-parse HEAD`). Not pushed.

## Commits

| Commit | Items | Files |
|---|---|---|
| `3155d4d` | 1, 2, 3 (D-356), 5, 6 | `foundations/decisions.md`, `foundations/environment_facts.md` |
| `5e9d763` | 4 | `foundations/part_map.md` |
| `19fbab8` | 3 (skill), 7 | `.claude/skills/loop2-deploy/SKILL.md`, `.agents/skills/loop2-deploy/SKILL.md` |
| `4a43945` | 8 | `deploy/loop2-watch`, `tests/deploy/test_loop2_watch.py` |
| `43c46cd` | 9 | `tests/http.test.mjs` |

## Per item

### 1. D-356 names the one failure line (`3155d4d`)

Old, binding sentence 2: "...which limits the reports it accepts and writes each as a failure line that the watcher counts and reports."
New: "...which limits the reports it accepts, writes each as a failure line that the watcher counts and reports, and at the first refusal of an hour writes one failure line of its own, `LIMITED`, as the notice that reports were dropped."
I put it into the existing sentence, not as a fourth sentence, because the template allows one to three binding sentences and D-356 had three.
Also added: to *Verification* "complies" a route that writes the one `LIMITED` line at the first refusal of an hour and nothing at the refusals after it; to "violates" a removal of the `LIMITED` line in the name of D-353; to *Rationale* the sentence "The one `LIMITED` line is kept although D-353 leaves the expected refusals without a line: it records no refused request of a player but that reports were dropped, and without it a flood past the limit would look like a quiet hour."
Check: the code at `src/server/account-routes.ts:420-433` writes the line only for `admission === "refused-first"`; the test "over its limit the route answers 429 and writes nothing, one LIMITED line at the first refusal of an hour..." in `tests/http.test.mjs` pins it and passes (below).

### 2. D-355 *Rationale* (`3155d4d`)

Old: "...keeps it, costs nothing and depends on nothing about the server that nobody has checked, and the `local` driver..."
New: "...keeps it, costs nothing and depends on nothing about the server that this repository does not carry, except two things nobody has checked, that `logrotate` runs daily there and which release of Compose the server has, and the `local` driver..."
The two things are those of review 25, M4.

### 3. "Leaves room" -> the number (`3155d4d`, `19fbab8`)

The real rule, read in `deploy/loop2-watch`: `KIND_INTERVAL_SECONDS=21600` (one message per kind in six hours), `DAY_MESSAGE_LIMIT=6` over a rolling `DAY_SECONDS=86400`, `KINDS` in the order down, unhealthy, restarted, failures, browser. So the browser kind goes four times in 24 hours at most, and the six of the day leave at least two for the others.
Skill, both copies (old): "...takes four of the day's six messages at most and leaves room for the server kinds." New: "...takes at most four of the day's six messages and leaves at least two for the server kinds."
D-356 had no "leaves room", only "so that the messages of the server kinds still go" in the first "complies" example. New: "...raises the browser kind of message once in six hours at most, so that it takes at most four of the day's six messages and leaves at least two for the server kinds". The number stands in *Verification*, a field, because *Rationale* may name no count.
I wrote "at least two", not "two" as the handoff has it: the browser kind may send fewer than four.

### 4. Part map, "the last two" (`5e9d763`)

Old: "...the failure watcher and its schedule and the scheduled check of the public address, the last two telling the owner when the running game fails."
New: "...the failure watcher with its schedule, and the scheduled check of the public address, the watcher and the check both telling the owner when the running game fails."

### 5. Fact `logrotate-rotation-rules` (`3155d4d`)

I read the source again: the archived page `web.archive.org/web/20261009164358/https://manpages.ubuntu.com/manpages/jammy/man8/logrotate.8.html`, fetched with `curl` and the passages found in its text (DESCRIPTION; `rotate count`; `maxsize size`). The quotations and the archive address are kept as they stood.
Old, one entry, one sentence joining three claims, the last as "removes it" without "or mailed".
New, two entries (see "Choices"):
- `logrotate-rotation-triggers`: "On Ubuntu 22.04, `logrotate` can handle each log file daily, weekly, monthly or when it grows too large, and with `maxsize` it rotates a file that has grown bigger than that size even before the time interval ends." Source: DESCRIPTION and `maxsize` passages.
- `logrotate-rotation-count`: "On Ubuntu 22.04, `logrotate` rotates a log `count` times, the number that the `rotate` directive gives, before it removes the log or mails it to the address that a `mail` directive specifies." Source: the `rotate` passage ("...before being removed or mailed to the address specified in a mail directive.").
D-355 *Based on* now names both. Nothing else named the old identifier (`grep` over the repository without `.git`, `node_modules`, `.runs`). The old identifier never reached `main` (`git show main:foundations/environment_facts.md` has no `logrotate`), so by `elements/common/rules.md` it goes without a withdrawn-identifier row.
`github-schedule-shortest-interval` untouched.

### 6. D-347 *Rationale* wrapping (`3155d4d`)

The paragraph (8 lines of 101, 99, 100, 91, **110**, 99, 97, 36 characters) rewrapped with `textwrap` at 100 to 94, 97, 99, 99, 99, 99, 96, 50; the check in the script `assert ' '.join(new) == text` proved no word changed. D-347 as it stands on this branch (main's text merged).

### 7. `account-block` refuses an address with a line break (`19fbab8`)

The command now reads (both copies, identical):

```sh
email='<email>'
case $email in
  *$'\n'* | *$'\r'*)
    echo "refused: the address holds a line feed or a carriage return; nothing was run" >&2 ;;
  *)
    out=$(docker exec loop2 node dist/server/account-block.js block "$email" 2>&1); status=$?
    ...same filter and append as before...
    echo "exit $status" ;;
esac
```

It is a `case`, not an `exit`, so a pasted command does not close the human's terminal. Added a sentence that the address goes between the single quotes (and a single quote in it is written `'\''`). Residual-risk sentence, old: "an address with a line break inside ... passes the filter and lands in the file ... Type the address as it is registered, or check it for a line break before pasting it." New: the check refuses such an address; what remains is "an address that reaches the command another way, such as a command typed without the check or the address put into a different variable than `email`", which the filter alone does not stop.

Trial by hand in Git Bash (GNU bash 5.3.15, Cygwin build), the block cut from the skill file by `awk`, `docker` replaced by a function that prints "Account <address> is now blocked." and one JSON line, the dump path replaced by a scratchpad file. For the first line see the note below.

| Address | Output | Dump file |
|---|---|---|
| `player@example.com` | the sentence, the JSON line, `exit 0` | one line: `<UTC time> account-block \| {"event":"account-blocked","accountId":"a1"}` |
| `a@x`, line feed, `{"event":"account-forged","accountId":"zz"}`, line feed, `b@y` | `refused: the address holds a line feed or a carriage return; nothing was run` | empty |
| `a@x`, carriage return, the same forged JSON, carriage return, `b@y` | the same refusal | empty |
| control: the old command (no check), the line feed address | | two lines appended, the first the forged `{"event":"account-forged",...}` line |

Note on the trial: Git Bash strips a carriage return from quoted text it reads as source (a test with `eval` lost the CR). So the trial replaced only the first line, `email='<email>'`, with `email=$TRIAL_ADDRESS` (address from the environment, which keeps CR); the rest of the block ran as it stands in the skill. On the Linux server bash keeps a CR inside single quotes, which I could not run here (WSL has only `docker-desktop`). `bash -n` on the block: exit 0.
Test: `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 0 (5 tests; copies identical, no IPv6 literal, no `mikr.us` name, description under 400).

### 8. Watcher: a missing `flock` is not a held lock (`4a43945`)

Code, `deploy/loop2-watch`:
- own lock: status 1 (flock's answer for a taken lock) keeps `skipped: another run holds <file> (flock exit 1)`; any other non-zero status now logs `skipped: flock could not take <file> (flock exit N); nothing was read`. Exit code of the run unchanged (0, DONE=yes), as before.
- deployment lock: `deploy_lock_is_held` sets `DEPLOY_LOCK_WHY` (`is held (flock exit 1)`, `could not be looked at, flock failed (flock exit N)`, `file cannot be opened for reading`); the two log lines read `skipped: the deployment lock $DEPLOY_LOCK_WHY; nothing was read` and `dropped: the deployment lock $DEPLOY_LOCK_WHY after the readings; the state is not advanced`. Old lines: "...is held or cannot be read" and "...was taken during the readings". Return values of the function unchanged.
Tests, `tests/deploy/test_loop2_watch.py`: `TheDeploymentLock.test_the_log_line_of_a_held_lock_says_held_and_that_of_a_broken_flock_names_its_status` (held at the first look, held at the second look, flock failing with 2 and 127: one quiet log line with the status, no "is held" or "holds", state unchanged) and `TheWatchersOwnLock.test_the_log_line_of_a_taken_lock_says_so_and_that_of_a_broken_flock_names_its_status` (taken with 1; failing with 2 and 127). Break caught: any non-zero status named as a held lock.
Red first: `npm test -- tests/deploy/test_loop2_watch.py` on the unchanged script, 3 failures out of 78 (non-zero exit; my wrapper printed the exit of `tail`, so the code was not recorded): the deployment test failed at the first assertion on "held or cannot be read", the own-lock test failed for status 2 and 127 on "another run holds".
Green: after the script change, same command, 78 tests OK, exit 0 (log line `EXIT 0`).
The message and the state are untouched: `npm test -- tests/deploy/test_loop2_watch_message.py` exit 0 (8 tests); `npm test -- tests/quality/test_quality_invariants.py` exit 0 (5 tests, includes the shellcheck test).

### 9. Constructor check of the report limit (`43c46cd`)

Test "a policy is refused a browser report limit that is no whole number from one up, which would leave the flood unlimited or the route shut" in `tests/http.test.mjs`, put before the route test of the limit (no sibling message of the constructor, "Invalid limiter capacity" and "Invalid sending deadline", is tested anywhere in `tests/`; I searched `tests/` for both). It builds `new AccountPolicy({ browserReportLimit })` with 0, -1, 1.5, NaN, Infinity, 2**53 and "30", expecting a throw matching `/browser report limit/`, and with 1 and 30 expecting none. Break caught: a constructor that takes NaN or a text, so that the count never reaches the limit and no report is refused.
Red first: the throw line in `src/server/account-policy.ts` replaced by `void 0;` for a moment, `npm test -- tests/http.test.mjs` exit 1, the new test failing with `expected: /browser report limit/`; restored with `git checkout src/server/account-policy.ts` before the commit (`git status` shows no change to `src`).
Green: `npm test -- tests/http.test.mjs` exit 0 (89 tests, 0 failed).

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors" (after each foundation edit and at the end).
- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`: exit 0.
- `npm test -- tests/deploy/test_loop2_watch.py`: red then exit 0 (above).
- `npm test -- tests/deploy/test_loop2_watch_message.py`: exit 0.
- `npm test -- tests/quality/test_quality_invariants.py`: exit 0.
- `npm test -- tests/http.test.mjs`: red then exit 0.
- Not run: the whole gate (`npm test`), as the handoff says.

## Own-work check

Requirement most likely not met: "the script must not change what the message or the state hold" (item 8). Check: `test_loop2_watch_message.py` and the `TheWindow`/state cases of `test_loop2_watch.py` (78 tests) pass; the diff of `deploy/loop2-watch` touches only the two lock functions, their log lines and one global. Second: the two skill copies byte-identical, `cmp` exit 0 and the skill test exit 0.

## Choices

- Item 5: two entries instead of "sentences" in one entry. The template (`elements/environment-facts/template.md`, "The sentence") says one entry is one fact in one sentence and that two facts about different things stand as two entries; the review (M1) suggested the same split. Rejected: three sentences in one entry (breaks the template; cost if wrong: a reviewer of the foundation finds the entry against the template again). Cost of mine if wrong: the identifier `logrotate-rotation-rules` is gone, but nothing else named it and it was not on `main`.
- Item 1: the sentence lies inside the existing binding sentence, not as a fourth (template: one to three sentences).
- Item 3: "at least two", not "two".
- Item 8: status 1 is taken as the held lock; flock(1) uses 1 for a conflict by default (`-E`), the other codes come from failures. The stand-in answers 1 for held, as the tests did before.

## Reaches beyond the handoff

- Read `guidelines/testing.md` whole (AGENTS.md demands it before a test is written): the rule "do not fix the exact refusal text without a requirement" shaped item 9 (the regex names the setting only, so that the throw is that check's and no other).
- Read `src/server/account-routes.ts:395-445` and `src/server/account-policy.ts:50-60,180-210` to state items 1 and 9 truly.
- Read `.the-way/elements/common/way_of_working.md`, `rules.md` and the templates and skills of decisions, part map and environment facts, as the handoff names the skills.
- `D-355` *Based on* edited for item 5 (a consequence of the split), in the same commit as the entries.

## Searches not found or unclear

- The sibling messages of item 9 ("Invalid limiter capacity", "Invalid sending deadline") are tested nowhere in `tests/`, so "beside the sibling checks" had no place to point at; I put the case before the route test of the report limit in `tests/http.test.mjs`.
- The handoff says D-356 holds "leaves room" (item 3); it does not, only the skill does (once, line 291, in both copies). D-356 had the softer "so that the messages of the server kinds still go".
- A Linux bash to run the carriage return trial on was not available (see item 7); the carriage return case was run with the address from the environment.
- `npm test` through `tail` gave the exit code of `tail` in one run (the red watcher run); the failures are in the output (3 failures), the code was not recorded.
