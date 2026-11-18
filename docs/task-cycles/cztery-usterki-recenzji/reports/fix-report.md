# Fix report — cztery-usterki-recenzji (fix of FAIL b76678a7)

**Status: done.** Not pushed; the full gate was not run.

Commits (fix range from `b76678a7`):
- `ec7004e1` — code and tests (I-2, comment of I-1)
- `f775999a` — D-112, D-153, D-431 and both skill copies (I-1, I-2 text, M-1, M-2, M-3)

## Findings

**I-1 — fixed (way a).** The rule is now stated for the two commands that keep it, and the other two are named.
- D-112 third paragraph: "Beyond the rules above, the blocking command of D-137 and the backup command of D-231 never set up a new database: … refuse … with the exit code 3 of a missing file and a sentence that names that case, and write nothing in it. The commands of D-400 and D-410 are not bound by this: they still set up a new database in a file that holds none." The first paragraph's "under the same rules" is kept (the third paragraph says it adds a rule "beyond the rules above", so nothing contradicts it; I kept the words because three older `decision:` quotations contain them).
- D-112 *Rationale*: "The blocking command and the backup command never set up a new database, because …; the commands of D-400 and D-410 still do."
- `src/server/database.ts` comment of `existingOnly`: says an opening with the option never sets up a database and that only the blocking and backup commands use it.
- Both skill copies (`SKILL.md`, exit-3 clause of the block command): the command never sets up a database; `account-previous-save` and `account-role` do not refuse such a file and set up a new database in it. Copies identical (`diff -r` clean).
- Places searched for the broad sentence (`only the server sets|sets a new one up|server alone`): D-112 (paragraph, *Rationale*), `database.ts:211`, both skill copies; no other hit. D-430 (its *Rationale* already says it binds these two commands) and D-231 (its sentence binds the backup command only) agree with the new wording, checked by reading. The D-112 test quotations I had written (`The blocking command … open only a file …`) were replaced by `Beyond the rules above, the blocking command of D-137 and the backup command of D-231 never set up a new database` in three test comments. The two commands of D-400 and D-410 were not given `existingOnly`.

**I-2 — fixed (way a).** `account-block.ts` and `account-backup.ts` hold two sentences, both at exit 3: the missing file keeps `LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.` (`… Nothing was written.` for the backup); the file the server never set up gets `LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.` (`… Nothing was written.`), used only for `NOT_ACCOUNT_DATABASE`. Tests: the refused-file cases (empty, non-SQLite, foreign SQLite) assert the new sentence and that "names no existing" is absent; the missing-file cases of both commands now assert the old sentence and exit 3 (backup: all six targets; block: the four targets of its loop). The skill's exit-3 clause and the backup reference row (`references/backup_and_restore.md`, both copies) name the case. D-112 *Rejected* ("the message already says [a wrong path from a wrong file]") reread against the code: true now. The nightly script reads no sentence and no code number (`deploy/loop2-backup` takes any non-zero stage status as failure): unchanged. Seen failing first: `node --test tests/account-storage.test.mjs` → exit 1 and `tests/account-backup.test.mjs` → exit 1, each on the refused-file case only, with the code at `b76678a7`; passing after the code change.

**M-1 — fixed.** D-153 *Rationale* last sentence is now "That both message types reach an external mailbox is checked by no test: a person checks it (D-163)."

**M-2 — fixed, the first way.** One sentence back, from the two facts and not from memory: "The game's log holds, for each kind of message, the events `link-issued` and `message-sent` and no line `"failure":"mail"`, which shows that the application handed both kinds of message to the mail service without a failure; it does not show which of them were his, and arrival is his observation." It states no date, so it does not contradict the unknown date of the reset attempt in point 7. Both facts stay in *Based on*. `foundation_check.py` stays at 0 errors.

**M-3 — fixed.** D-431 *Rationale* gains: "Risk taken, a hypothesis for the releases after the one the start was written on: the channel `net.server.socket` of `node:diagnostics_channel`, on which the proof rests, is marked by the documentation of Node.js 24 as Stability 1, experimental; a release that renames or drops it makes every start fail, after the wait for its server, with the failure `SERVER_NOT_READY`, which the test of the start shows at once." I checked the documentation myself (https://nodejs.org/docs/latest-v24.x/api/diagnostics_channel.html, read 2026-11-18): the NET subsection that holds `net.server.socket` states "Stability: 1 - Experimental".

## Checks (command → exit code)

- `node --test tests/account-storage.test.mjs` → 0; `tests/account-backup.test.mjs` → 0; `tests/account-owner.test.mjs` → 0; `tests/startup.test.mjs` → 0.
- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` → 0; `npm test -- tests/quality/test_quality_invariants.py` → 0; `npm test -- tests/quality/test_function_and_file_size.py` → 0 (the expected failure stays).
- `python -B .the-way/elements/common/foundation_check.py` → 0, "0 errors".
- `npx eslint src tests/account-storage.test.mjs tests/account-backup.test.mjs` → 0; `npx prettier --check src tests/account-*.test.mjs` → 0.
- Not re-run: `tests/invariants/test_local_start_access.py` (no code or test change there; only D-431's prose changed), the http/owner-routes tests (no change in what they exercise), the Docker tests.

## Reaches beyond the handoff

- The Node documentation page above (for M-3), through the fetch tool.
- `foundations/environment_facts.md` lines 888-900 (the two facts of M-2).

## Working copies

`.runs/author/` held edit scripts; all removed (the directory is empty).

## Unread material

`reports/review-whole-report.md` and `review-whole-probe-wal.txt`: not read; the findings file was enough.

## Searches not found or unclear

None. (M-4 and O-1 are not mine, as the handoff says.)
