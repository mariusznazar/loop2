# Slice 2 report - `account-backup` says the truth when only its cleanup failed

Status: **done with concerns** (the concerns are questions for the orchestrator, listed at the end; none blocks the slice).

Worktree: `the root of the repository`, branch `task/porzadki-z-uwag-pr`.
Base and start: `048b4b8`. Pinned `.the-way`: `294af7fde45323ac1851c014a03071a97fc38d96` (checked, matches).

## Commit

- `2a58095` fix: :bug: report a whole backup whose temporary directory cannot be removed as its own failure

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/server/account-backup.ts` | 34 | 7 |
| `tests/account-backup.test.mjs` | 70 | 0 |
| `tests/account-database-check-standin.mjs` | 21 | 0 |

Total: 125 added, 7 removed (`git diff --stat 048b4b8..HEAD`).

## What changed

- `account-backup.ts`: the `rm` of the temporary directory moved out of a `throw`-capable `finally`. A failed removal is recorded. If the whole backup had already left (`whole`), the command writes one `backup-cleanup` failure line with the removal's error (kind and code only, through `writeFailure`), then one English sentence saying the backup went out whole and its temporary copy was left in the container, and exits 1 (the code it gave before). Every other path is as before: an output failure still ends with exit 4 and its `backup-output` line; a database failure, and a removal failure without a whole backup, still write `backup-database` with "No backup was made" and exit 1.
- `account-database-check-standin.mjs`: the stand-in now also substitutes `mkdtemp` and `rm` of `node:fs/promises` for `account-backup.js` (the resolve hook gained a second branch). Mode `cleanup-fails` makes `rm` throw an `EBUSY` error whose message quotes the path; other modes delegate to the real `fs/promises`.
- `account-backup.test.mjs`: new helper `runBackupWithStandin` and new case "a whole backup whose temporary directory cannot be removed is one failure of its own, with its cause and one sentence, and exits 1". It checks: exit 1; the stdout is a whole backup (integrity ok, all `SEEDED + 1` rows); exactly one JSON line `{failure: "backup-cleanup", kind: "Error", code: "EBUSY", place: "account-backup.run"}`; the sentence says "went out whole"; no "No backup was made"; stderr names no temporary path; the temporary copy is left in place (one entry in the temporary directory).

## Checks

Test written first, extended stand-in in place, code still at the base:

- `npm test -- tests/account-backup.test.mjs`, exit 1. 9 pass, 1 fail: the new case, on `failure` (got `backup-database`, expected `backup-cleanup`). Log: `a temporary file outside the repository (s2-base.log)`.

After the change:

- `npm test -- tests/account-backup.test.mjs`, exit 0. 10 of 10 pass. Log: `...\scratchpad\s2-fixed-backup.log`.
- `npm test -- tests/account-database-check.test.mjs`, exit 0. 8 of 8 pass (the stand-in changed). Log: `...\scratchpad\s2-check.log`.
- `npx prettier --check` on the three files, exit 0.
- `npx eslint` on the three files: first run exit 1, `no-unsafe-finally` on the `throw` I first put in the `finally`. Fixed by restructuring (no throw in `finally`). Second run exit 0.
- `npx tsc --noEmit -p tsconfig.server.json`, exit 0. (The repository has no root `tsconfig.json`; the first attempt with the default config failed on that missing file, not on the code.)

Own-work check (section 3):

- Requirement most likely not met: the output-failure path with a failing removal must keep today's outcome (it is the one path the new branch could have changed by accident). Check: a temporary copy of the test file with one extra case (a reader that goes away, stand-in mode `cleanup-fails`), run as `npm test -- tests/tmp-owncheck.test.mjs`.
  - First run, exit 1. My expectation of one JSON line was wrong: the output failure writes its own `backup-output` line (`EPIPE`) before the `backup-database` line (`EBUSY`). The exit-1 and "No backup was made" assertions had passed. The base flow writes the same two lines.
  - Second run with the corrected expectation (two lines in that order), exit 0, 11 of 11 pass.
  - The temporary file `tests/tmp-owncheck.test.mjs` was deleted; the commit does not contain it.
- Requirement: the failure line and the sentence must not quote a path or error text (D-252, D-233). Covered by the new case's "names no path" assertion, which passes; the stand-in's message quotes the path on purpose, so the assertion is a real test.

Not run, with reasons:

- `npm test` without arguments: not run (forbidden for this slice; the handoff says report it as a mismatch if a text names it). Its *Checks* list only the two `npm test -- <file>` commands.
- `python -B .the-way/elements/common/foundation_check.py`: not in this slice's *Checks*; not run.
- `.the-way/task-cycle/change/ui_check.md`: not read, because this change alters no screen.
- Stryker mutation run: not run; the testing guidelines use it for `simulation` files only, and this change touches `account-server`.

## Reaches beyond the handoff (section 1)

- `guidelines/coding.md` and `guidelines/testing.md`, whole (named by the handoff).
- `src/server/log-line.ts`, whole (named).
- `tests/account-backup.test.mjs` and `tests/account-database-check-standin.mjs`, whole (files I change).
- `foundations/decisions.md`: D-352, D-353, D-354 whole (named), and D-252, D-253, D-228, D-231, D-233 by their ranges (named).
- `foundations/invariants.md:1099-1108` (`account-save-backup`) and `foundations/part_map.md:62-82` (`account-server`) read as named.
- `.claude/skills/loop2-deploy/references/backup_and_restore.md:26-70` read (named).
- `deploy/loop2-backup`: read by `grep` for exit and failure lines only, not whole. Lines 160-215 (the stage handling) are not read in full; see unclear items.
- Outside the repository: `the author's private rules note on scripts` and `...\.ai\rules\git.md`, read because the instructions require them before any script and before a commit.

Reason for the stand-in substitution: the handoff says the stand-in gets a mode "where the directory's removal fails if it needs one". It needs one: a directory cannot be made unremovable on Windows reliably with permissions, and a held file does not block `rm` there with the handle sharing Node uses. So the test substitutes `rm` for the one module (`dist/server/account-backup.js`) that calls it.

## Choices

- **Substitute `rm` and `mkdtemp` in the stand-in via a second resolve-hook branch, scoped to `account-backup.js`.** Rejected: making the directory unremovable with permissions or open files (platform-dependent, unreliable on Windows). Cost if wrong: the test depends on Node's module-resolution hook API; if that API changes, the test fails loudly, not silently.
- **Failure name `backup-cleanup`.** Rejected: `backup-output` (it is not an output failure) and `backup-database` (the task says it must not be that). Cost if wrong: one string in one place and one test expectation to rename.
- **Operator sentence in English**, like the other sentences of the command. Rejected: a Polish sentence alone, which would mix languages in one command's messages. Cost: the human may want the whole command in Polish; that is a separate decision (see questions).
- **Exit code 1 kept** (the plan's choice; `exitDatabaseFailure`). Rejected: exit 0 after a whole backup (the nightly script would send it, and the plain copy would reach no notice) and a new exit code (the skill table would change in two copies). Cost if wrong: one night's backup is not sent each time only the cleanup fails, as the plan's choice table states.
- **Restructure around the `finally` instead of a `throw` in it.** Rejected: a `throw` in `finally` (lint `no-unsafe-finally`, and silencing the rule is forbidden by the coding guidelines). Cost: a few more lines; the removal-only-failure path reaches the same handler as before.

## Adaptations of the plan to the code (section 4)

- The plan's line references match the base: `account-backup.ts:90`-`:93` (the `finally`) and `:94`-`:99` (the outer `catch`). No other mismatch found.
- The plan says the new case "is written first and seen failing on the base": done, and the failing run is recorded above.

## Searches not found or unclear (section 6)

- Whether the nightly script (`deploy/loop2-backup`) writes the command's own standard-error lines to `/var/log/loop2-backup.log`: I did not verify this from the script's lines 160-215. `backup_and_restore.md` says Docker's own text stands in the log before the stage line, which suggests the command's stderr lines are carried, but I did not confirm that. Not verified.
- `backup_and_restore.md:58`: the row "docker 1 ... or a failed backup" does not mention the new case (a whole backup whose copy was left). This slice does not change the skill, as the plan's choice says.
- No root `tsconfig.json`: the server typecheck uses `tsconfig.server.json`.
- No foundation entry names the failure `backup-cleanup`; it is my choice, not a settled name.

## Questions for the orchestrator (with the answer I recommend)

1. The output-failure path with a failing removal still ends with "No backup was made" (true, since the output was not whole) and writes no note about the copy left in the container. Recommended answer: leave it for this slice (the plan says other paths stay); record it as a follow-up for a later slice.
2. `backup_and_restore.md:58` ("docker 1 ... or a failed backup") now also covers the new case. Recommended answer: one line added to that table in a later slice, so a reader of the log knows exit 1 may follow a whole backup; not in this slice, per the plan's choice.
3. The operator sentence is English, while the vault's instruction says text the product writes for a person stays Polish, and the repository's neighbouring sentences are English. Recommended answer: keep English here, and decide the language of the whole command's messages once, as a separate decision.
