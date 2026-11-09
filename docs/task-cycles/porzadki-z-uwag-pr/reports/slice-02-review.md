PASS 2a580959494ae31c7a20c7ab94bd5f754e430d05

# Review of Slice 2 (`account-backup` says the truth when only its cleanup failed)

Range `048b4b8..2a58095` (one commit, `2a58095`); `git rev-parse HEAD` is `2a580959494ae31c7a20c7ab94bd5f754e430d05`. Worktree `the root of the repository`. No invariant test changed. No temporary edit was left in the worktree (`git status --short` empty at the end).

## Blocking findings

None.

## Minor findings

1. **Inside the task, Minor.** `tests/account-backup.test.mjs` (the new case, last assertion, "the temporary copy is left in place", one entry in `box.temporary`). The stand-in's `rm` throws without removing anything, so the directory stays by construction of the stand-in, not because of anything the command does. The assertion cannot fail through a defect of `account-backup.ts`; it only documents the sentence's claim. Harmless (the other assertions carry the case: exit 1, whole backup, one JSON line with the new name, the sentence, no "No backup was made", no path on standard error), and it is the only way to show the claim without an unremovable directory on Windows.
2. **Outside the task (plan-mandated), Minor.** `.claude/skills/loop2-deploy/references/backup_and_restore.md:58`, row for exit 6: "`docker` 1: ... or a failed backup; Docker's own text stands in the line before it in the log and says which". The new case (docker exit 1 after a whole backup, cleanup failed) is a "failed backup" only in a loose sense, and the log line that says which is now the command's own stderr (`backup-cleanup` JSON line plus the sentence), not Docker's text. The plan's Choices keep the skill unchanged for this slice, so this is the executor's question 2; a later slice or task may add one clause.

## Task and plan, checked

- Goal met. A whole backup plus a failed `rm` now gives exactly one JSON line `{"failure":"backup-cleanup","kind":"Error","code":"EBUSY","place":"account-backup.run"}` through `writeFailure`, then one sentence ("The backup went out whole to standard output; only the removal of its temporary copy failed, so that copy was left in the container."), exit 1 (`exitDatabaseFailure`, the code the base gave). "No backup was made" is not written. This is D-354 (JSON line plus sentence are one record) and Settlement 3 / "Recording a failure" as written in `guidelines/coding.md:113-130`.
- The `finally` no longer throws (`no-unsafe-finally` respected, no lint suppression); a removal error is held in `removal` and handled after the `finally`.

## Questions of risk, computed

1. **Paths and error text on exit paths.** `writeFailure` (`src\server\log-line.ts`) reads only `name`, `code`, `errcode` of an error (matched against closed patterns), never `message` or `stack`. Every failure line and both operator sentences are fixed text; no path of the temporary directory is written on any path. The new test's stand-in puts the path in the error message on purpose and asserts `stderr` does not include `box.temporary`, so it would catch a switch to `message`. The `installLastResort` handler is unchanged.
2. **Combinations (traced, then two run).** Base behaviour: a `throw` from `finally` replaces the return or throw in flight.
   - database fails, removal ok: both versions: `backup-database` with the database error, "No backup was made", exit 1. Same.
   - database fails, removal fails: base: the removal error replaces the database error, so `backup-database` with the removal's kind/code, exit 1. New: the thrown database error reaches the outer `catch`, which writes `removal.error` when `removal` is set. Same. Run: garbage file as the database with stand-in `cleanup-fails`: exit 1, one line `backup-database`/`EBUSY`, "No backup was made" (and without the stand-in: `ERR_SQLITE_ERROR` errcode 26, exit 1).
   - output fails, removal ok: both: `backup-output` line + "could not be written out" sentence, exit 4. Same (flag `outputFailed`, return after the `finally`).
   - output fails, removal fails: base: `backup-output` line, its sentence, then the `finally` throw replaces `return 4`, so `backup-database` line (removal error), "No backup was made", exit 1. New: `whole` is false, so `throw removal.error` reaches the same `catch`: the same two lines and sentences, exit 1. Same. (The executor ran this with a temporary test and removed it; I traced it, I did not rerun it.)
   - whole backup, removal ok: exit 0, as before.
   - whole backup, removal fails: the only changed case (exit 1 kept; line name and sentence changed).
3. **Failure name `backup-cleanup`.** `grep -rn "backup-cleanup|backup-database|backup-output"` over the worktree (without `node_modules`, `.git`, `dist`) finds the names only in `src\server\account-backup.ts`, `tests\account-backup.test.mjs` and `.runs\` files. No test, list, invariant or document enumerates failure names, so the new name breaks nothing and leaves nothing stale. (The logging scope list in `guidelines/coding.md` names events, not failure names.)
4. **`deploy/loop2-backup`.** `stream_through_age` runs `docker exec ... node dist/server/account-backup.js --to-standard-output 2>>"$LOG_FILE" | ... age ...` and keeps `PIPESTATUS`. Docker exit 1 gives `COMMAND_STATUS=1`, so `require_whole_file` calls `fail 6 stream "docker exit 1, age exit 0; nothing was sent"`; `on_exit` sees a non-zero code, calls `send_notice` once and logs `end: failed (exit 6)`. So "nothing sent, owner notified" is what happens for the new case, as D-233 gives; and the command's stderr (the JSON line and the sentence) goes to `/var/log/loop2-backup.log`, so the log shows the reason (the point the executor left unverified, now verified from lines 160-215 of the script).
5. **Stand-in's second resolve-hook branch.** The branch fires only when `specifier === "node:fs/promises"` and the parent URL ends with `/dist/server/account-backup.js`. The other user of the stand-in, `tests\account-database-check.test.mjs`, runs `account-database-check.js` (parent is `database.js` for the first branch only), so it never reaches the new branch; its 8 cases pass. In `tests\account-backup.test.mjs` the one earlier case that uses the stand-in ("what no code of the command handled ends it with one line ...", mode `uncaught`) now gets `mkdtemp` and `rm` through the stand-in too, but both delegate to the real `node:fs/promises` unless the mode is `cleanup-fails`; the case passes. `account-backup.ts` imports only `mkdtemp` and `rm` from that module, which the stand-in exports.

## Against the foundation and guidelines

- D-354 (comment in the code cites it; code does what the entry says: JSON line then sentence, no removal of either, sentence not counted as a second record). D-252 (kind/code/place only, no message). D-233 and `deploy/loop2-backup` behaviour as above. D-231/D-228: the output still carries only the backup's bytes; nothing new on standard output. Invariant `account-save-backup` unaffected (a whole backup still goes out).
- `guidelines/coding.md` "Recording a failure": one record per failure, with its cause. "Hiding a failure": nothing turned into success; exit stays non-zero. Code and comments in English; prettier and eslint pass.
- `guidelines/testing.md`: the new test is on real files and a real child process with real SQLite; only the failure of `rm` is stood in, justified by the plan ("the stand-in extended with a mode where the directory's removal fails") and by Windows, where a directory cannot be made unremovable reliably. The test names its fault, was seen failing on the base (per the report), and asserts the exact failure line, so it does not compute its expected value from the code. Trust boundary `src/server/**`: the command takes no input beyond the fixed word and `LOOP2_DATABASE_PATH` (unchanged); crafted-input check for this slice is that an error's message (which quotes the path) never reaches the output, covered by the test.
- No reserved choice settled; no UI; no irreversible operation.

## Declined to judge

- The output-fails-and-removal-fails path writes no note that the plain copy stayed in the container beyond "No backup was made" (executor's question 1): same as the base and the plan says other paths stay as they are.
- Language of the operator sentence (English, like every other sentence of the command and file): a separate decision (executor's question 3); the task and D-354 do not set the language.

## Checks run

- `npm test -- tests/account-backup.test.mjs`: exit 0, 10 of 10 pass (includes the new case). Log: `a temporary file outside the repository (r2-backup.log)`.
- `npm test -- tests/account-database-check.test.mjs`: exit 0, 8 of 8 pass. Log: `...\scratchpad\r2-check.log`.
- `npx prettier --check` and `npx eslint` on the three changed files: exit 0 and exit 0.
- Scratch run of `node --import tests/account-database-check-standin.mjs dist/server/account-backup.js --to-standard-output` with a garbage database file and mode `cleanup-fails`, and the same without the stand-in: exit 1 both, lines as in question 2 above. Scratch files only in the scratchpad (`garbage.sqlite`, `combo1.err`, `combo2.err`).
- Not re-run by me: the executor's "seen failing on the base" run (command `npm test -- tests/account-backup.test.mjs`, exit 1, new case failing on `failure`: got `backup-database`, expected `backup-cleanup`); the logic is confirmed by trace (on the base the removal error goes to the `backup-database` catch). Not run: full `npm test`, `foundation_check.py` (not in this slice's Checks), the executor's temporary output-failure-with-failing-removal case (traced instead).

## Reaches beyond the handoff

- `src\server\account-backup.ts` (whole), `tests\account-database-check-standin.mjs` (diff and file), `deploy\loop2-backup` whole: needed for question 4 (handoff named lines 1-60 and 160-215; I read it whole).
- `foundations/decisions.md` D-354 and D-352/353 (named), D-252, D-253, D-228, D-231, D-233 by their ranges; `foundations/invariants.md:1099-1108`, `foundations/part_map.md:62-82`, `backup_and_restore.md:26-70`, `guidelines/coding.md` ("Recording a failure", "Hiding a failure", "Linter", "Formatter" headings) and `guidelines/testing.md` ("Choosing the level", "Trust boundaries"): selectively, to compare rules the change reaches.
- `grep` over the worktree for the failure names (question 3).
- Did not read `task.md` or `plan.md` directly; used the passages the handoff quotes word for word.

## Searches not found or unclear

- none (the executor's open point on whether the script logs the command's stderr is resolved above: it does, via `2>>"$LOG_FILE"` on `docker exec`).
