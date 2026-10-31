# Slice 1 report — the backup command

**Status:** done with concerns (one finding about the writer's load, below; nothing blocks).

**Commit:** `49bfb74` on `task/kopia-bazy` (base `b7dd37d`).

**Files** (all new except the two edited): `src/server/database.ts` (+15 -1: `backupTo(path)`, constant `backupRate = 2**31 - 1`, import of `backup`), `src/server/account-backup.ts` (+~105, new), `tests/account-backup.test.mjs` (new, 6 tests), `tests/deploy/test_account_backup_stream.py` (new, 1 test), `foundations/part_map.md` (+1 line: `tests/account-backup.test.mjs` in the Files of `account-server`; the `tests/deploy/**` and `src/server/**` patterns already claim the other two).

## Checks (command, exit code)

| Check | Result |
|---|---|
| `npm test -- tests/account-backup.test.mjs` | 0, 6 of 6 pass; run 7 times in a row after the writer was given its 3 ms pause, all passing |
| `npm test -- tests/account-storage.test.mjs` | 0, 51 of 51 |
| `npm test -- tests/deploy/test_account_backup_stream.py` | 0, ran (not skipped) against Docker 29.7.2; first run 118 s (image build), second 4.6 s (cached) |
| `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" (run after the commit; before it, the new test pattern matched no tracked file) |
| `npx prettier --check` on the three TS/MJS files; `npx eslint` on them | 0 and 0 |
| `.runs/quality-venv/Scripts/ruff.exe check tests/deploy/test_account_backup_stream.py` | 0 (after removing an unused import and a PIPE pair it first flagged) |
| Build and type check | passed inside every `npm test -- <file>` (it runs `npm run build` first) |
| Full `npm test` | not run, as the handoff says (the gate is the orchestrator's) |

The handoff names `npm test -- tests/deploy/test_account_backup_stream.py` as a check of slice 1; it works that way (`scripts/test.py` accepts one Python file). No mismatch.

## Seen failing (mutations in the worktree, each restored before the commit)

The first test was not written before the code; the command was written first, then each test was shown to catch its break:

- Output failure turned into exit 0 (`return exitOutputFailure` -> `return 0`): the "reader that goes away" test fails.
- Temporary directory not removed: the writer test, the unopenable-database test and the reader test fail (they assert an empty temporary directory).
- Argument check removed (`false` for the condition): the refusal test fails (`[] on <db path>`).
- Backup replaced by copying the database file alone (no `backup()`): the writer test fails at "the row held only in the log is in".

Not run as a mutation: a default `rate`. The handoff says whether it finishes depends on the disk, so no test asserts its failure.

## Own-work check (section 3)

Requirement most likely not met: "exit 0 only after the last byte is out; a reader that goes away gives a non-zero exit". Check: the test destroys the reader's end after the first chunk of a ~9 MB backup. Result: non-zero exit by the command itself, standard output shorter than the whole backup, temporary directory empty. The mutation above (output failure mapped to 0) makes it fail.

## Finding about the writer's load (concerns)

The handoff says: if the separate-writer test fails, stop and report. It failed at first, and the cause is not the backup. A writer that commits back to back with no pause (full synchronization, WAL, busy timeout 1000 ms) starves any second connection that wants the write lock, and the command's own opening of the database does want it (`AccountDatabase` constructor: `BEGIN IMMEDIATE` for the schema check, then pruning). Evidence: a script that opened `AccountDatabase` 30 times beside such a writer failed 10 of 30 times with "database is locked", every time during the open at about 1100 ms; the `backupTo` step itself took 1 to 5 ms in all 20 successful runs on a small database, and failed never. SQLite's busy handler polls rather than queues, so a saturated writer wins. The command then exits 1 with its fixed message and writes nothing, so the failure is clean and the next night's run is a retry; but a real writer would have to commit continuously without gaps to reach this, and the server's writes are sparse. Choice made: the test's writer pauses 3 ms between commits (comment in the test says why) and still commits continuously through the backup (the test asserts its count rose while the command ran, and that it saw no busy error). Rejected: weakening the command to retry the open (not asked; touches `AccountDatabase`'s opening rules, D-112); keeping the saturated writer (a flaky test of a load that is not the server's). Cost if wrong: if the real server ever writes in a saturated way, the nightly command fails at the open and the script's notice fires; a question for the orchestrator is whether D-112's bounded busy timeout is enough for the backup, I recommend yes.

## Choices

- Exit codes: 0 done, 1 database failure (open, backup or temporary directory), 2 usage, 3 no database file, 4 output failure (reader gone, write error). Rejected: reusing `account-block.ts`'s numbers for the same meanings only partly (its 4 means "no account"); they are the command's own.
- `rate` is `2**31 - 1`: Node takes a 32-bit integer there (2**31 gives `ERR_INVALID_ARG_TYPE`, checked on 24.17.0), and -1 is rejected by the design.
- Streaming: `pipeline(createReadStream(file), process.stdout, { end: false })`, then an empty write whose callback must report before exit 0. Rejected: reading the file into memory (the design's 100 MiB room).
- No signal handlers (SIGTERM/SIGINT) that remove the directory: the handoff names failure and a vanished reader, not signals, and handlers cannot be tested on this Windows machine. Cost if wrong: a `docker exec` killed by a signal leaves a directory in the container's `/tmp` until the container is replaced.
- Refusal tests check "before it opens the database" by exit code: a garbage file would give exit 1 and a missing file exit 3 if the open came first; they also assert the database bytes and the directory listing unchanged.
- The test for "no SQL and no `node:sqlite` import outside `database.ts`" is a text scan of `src/server/*.ts` in `tests/account-backup.test.mjs`; it is a pattern check, not a parser.
- Tests cite no invariant: the invariants the slice touches (`account-save-sqlite-access`, `account-save-backup`) have the method `review`; the decisions are named in comments (D-112, D-215, D-217).

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md`: the method's own reading, named by `SKILL.md`.
- `foundations/invariants.md` (the `account-save-backup` group) and `foundations/decisions.md` D-217: to see which invariants the tests could cite and what the command must do; both were in the handoff's ranges or adjacent.
- `.the-way/elements/part-map/skill/write.md` and `decide_entry.md`: for the one-line part map change. I edited the line by hand instead of invoking the skill `the-way-update-part-map` for a single file path added to an existing part; if the orchestrator wants the skill's full run, that line is the only change to repeat.

## Searches not found or unclear

- A skill-driven step for the part map change: the handoff says `account-server` claims the test "through `the-way-update-part-map`"; I could not call the skill as a tool from this subagent context and used its rules by hand (see above). Unclear whether that is acceptable.
- No test in the repository asserts "`node:sqlite` stands only in `database.ts`"; I added the scan above rather than finding one.
- The handoff's *Read* lists `tests/account-storage.test.mjs:1751-1795`; the block-command helper there started at about 1751 and ran to about 1795 as expected.

## Problems observed

- The first full run of the writer test failed on EBUSY at cleanup (the test's own `rm` ran before the server connection closed). Cause verified: the `t.after` hooks ran in registration order. Fixed by closing connections in the sandbox's cleanup before removal.
- Docker test: node prints the SQLite experimental warning on standard error only; standard output starts with the file's magic bytes, so the stream is not affected.
