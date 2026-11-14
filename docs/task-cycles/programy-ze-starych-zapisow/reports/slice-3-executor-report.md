# Slice 3 — executor report

**Status:** done

**Commit:** `d946a58b` on branch `task/programy-ze-starych-zapisow` (base `41d80c2e`). Message: `feat: :sparkles: add the operator command that grants and revokes the previous-save privilege`.

**Check line:** `npm test -- tests/account-storage.test.mjs` exit 0, 82 of 82 pass; `npm run typecheck` exit 0. Not run by me: the product's gate (`npm test` without a file) and `foundation_check.py`, as the handoff says.

## Files changed

| File | Added | Removed | Note |
|---|---|---|---|
| `src/server/account-previous-save.ts` | 95 | 0 | new; empty stub `export {};` first, then the command |
| `tests/account-storage.test.mjs` | 255 | 1 | six new tests; helper `runBlockCommand` now delegates to `runOwnerCommand(script, args, databasePath, mode)`; one line of the old helper changed (`[script, ...args]`) |
| `guidelines/coding.md` | 4 | 2 | `account-previous-save` added beside `account-block` and `account-backup` in *Recording a failure* (two places); two events added to *Logging scope* |

Line endings: all three files are LF in git; the appended lines are LF.

## Checks run

1. Red, stub module (first run): `npm test -- tests/account-storage.test.mjs`, exit 1. Five new tests failed on their assertions (`grants and revokes`, `writes one event`, `database failure`, `what no code handled`, `changes nothing on a usage error`). The sixth (`leaves a block, a session and an emailed link as they were`) passed against the stub at first, because it never checked that the grant happened; I added an assertion that the flag is set after a grant.
2. Red, stub module (second run, after that strengthening): `npm test -- tests/account-storage.test.mjs`, exit 1, 6 failing, 76 passing. The committed module was then restored (`git checkout HEAD -- src/server/account-previous-save.ts`); the tree was clean.
3. Green: `npm test -- tests/account-storage.test.mjs`, exit 0, `ℹ tests 82`, `ℹ pass 82`, `ℹ fail 0` (run after the formatter change, and again on the restored committed code).
4. `npm run typecheck`, exit 0 (before and after the formatter change).
5. `npx prettier --check` on the two TS/JS files: the first run flagged `tests/account-storage.test.mjs` (three of my lines); I ran `npx prettier --write` on that file only. HEAD's version of the file was clean, so the diff of the formatter touched only my lines. Prettier check after the write: clean on both files. ESLint not run (gate scope).

## The new tests (all in `tests/account-storage.test.mjs`, appended after the block tests)

- grants and revokes by address beside an open connection and says which outcome it reached: exit 0 for grant, repeated grant, revoke, repeated revoke; exit 4 for an unknown address with `No account has the address ... Nothing changed.`; the four outcome sentences differ and name the account; the normalized address `" Player@EXAMPLE.test "` is accepted.
- writes one event with the account's number for a change, none for no change, and no address: `account-previous-save-granted` and `account-previous-save-revoked` with the account's identifier (another account exists in the fixture); no line for a repeated command or an unknown address.
- database failure adds kind and code and nothing of its text: `failure: account-previous-save`, `kind: Error`, `code: ERR_SQLITE_ERROR`, `errcode: 26`, `place: account-previous-save.change`; no text of the file's name or of SQLite's message.
- what no code handled ends with one line: `failure: uncaught`, `kind: RangeError`, `code: ERR_STANDIN_FAULT`, `place: account-previous-save`, exit 1, nothing of the fault's message in stderr.
- changes nothing on a usage error, an unknown address or an unusable database, and creates none: exit 2 for no arguments, no address, an extra argument, an unknown action, an invalid address; exit 4 for unknown addresses to grant and to revoke; exit 3 for unset, empty, `:memory:` and absent paths (the absent file is not created); exit 1 for a busy database (`BEGIN IMMEDIATE` held by another connection). The privilege, the block and the session stay as they were after each.
- leaves a block, a session and an emailed link as they were: grant ends no session and stops no link; the block command then blocks and ends the session and stops the link; revoke leaves the block, the session count and the link's spent state as they were.

## Own-work check (section 3)

- Requirement most likely not met: the event line. The spec says one JSON event line with the account's identifier for a change and none for no change, and the event must not carry the address. The check: the event test with a second account in the database; it compares the full JSON line with `deepEqual` against `{ event, accountId }` and asserts no `example.test` in any JSON line. Run: passed (exit 0).
- Mutations thought through, each caught by a named assertion: wrong event name (the `deepEqual` on the event); event written for a no-change run (the `[]` assertions); address not normalized (the `" Player@EXAMPLE.test "` grant); swapped exit codes 3 and 4 (the code assertions); no `installLastResort` (the uncaught test); wrong failure place (the `deepEqual` on the failure line); the command ending a session or stopping a link (the session and link counts); the sentence written as a JSON line (the event filter and `deepEqual` would see it).
- Not run: a real mutation in the worktree. Mutations were reasoned, as the method asks.

## Choices made

1. **Test helper.** Added `runOwnerCommand(script, args, databasePath, mode)` and kept `runBlockCommand` as a one-line wrapper. Rejected: copying the helper, which would duplicate about 35 lines. Cost if wrong: one changed line in the block helper, easy to revert.
2. **Sentences in English.** The block command's sentences are English, so the new command's are too ("in the manner of the block command's"). The spec gives no wording. Rejected: Polish sentences, which would make the two commands read differently to the operator. Cost if wrong: a change of string literals only; the tests match on `nothing changed`, the account's address and the exit codes, not on the rest of the wording.
3. **Revoke sentence.** It adds that "the previous save stays in place", which the spec does not ask for but D-394 and the spec's section 5 imply. Cost if wrong: one sentence.
4. **Usage error sentence.** The usage line is `Usage: node dist/server/account-previous-save.js grant|revoke <email address>`, the block command's pattern with the new action words.

## Adaptations of section 4 (plan and code disagree)

None. The plan's names matched the code: `setPreviousSavePrivilege(email, granted)` returns `PreviousSavePrivilegeOutcome` with `granted`, `already-granted`, `revoked`, `not-granted`, `unknown`, and `accountId` on the known outcomes.

## Spec and foundation differences

None found for the command. D-394 (`foundations/decisions.md:9650-9664`) and the spec's section 5 agree on exit codes, outcomes and events. The sentence-as-no-log-line rule (D-354) is followed: the sentence goes to stdout or stderr and the JSON line is the only log record of a failure.

## Reach beyond the handoff

- `.the-way/task-cycle/change/slice.md`: named by the variant in the method. I read it before the commit; I did not read it at the start. It gave no step beyond what I did.
- `tests/account-database-check-standin.mjs`: read to understand the `uncaught` mode the test uses (the existing block test already uses it).
- `scripts/test.py` and `scripts/build.mjs`: read to confirm that `npm test -- <file>` builds first and that `tsc` covers `src/server/`.
- `the author's rule file on writing scripts` and `git.md`: the hook delivered them before a Bash heredoc and the commit; I followed both (LF files, paths-only add, English message, task branch rather than main).
- `foundations/decisions.md` lines 2870-2889 (D-137), `foundations/invariants.md` 858-867, `foundations/part_map.md` 63-84 and 30-62, `foundations/glossary.md` 255-268: all in the handoff; read in full at the stated ranges.
- The rest of `guidelines/coding.md`, read whole, as the handoff names.

## Unread material

- `src/server/database.ts`: read in part only: lines 25-49 (outcome types), 440-500 (`blockAccount`, `unblockAccount`, the start of `issueLink`), and 760-792 (`setPreviousSavePrivilege`, whole). Not read: the constructor, `transaction`, `findAccountByEmail`, `findAccountById`, and the rest of the file. The new command depends on the constructor's opening rules and on `transaction`, which I used through `setPreviousSavePrivilege` only.
- `src/server/account-policy.ts` (`normalizeEmail`): not read; used through the block command's pattern.
- `foundations/decisions.md` D-354 and D-355: read at their actual ranges, `8945-8970` and `8971-8985`. The plan gave `8926-8951` and `8952-8966` for these two entries, which are stale; the handoff's ranges are correct.
- `foundations/part_map.md` `simulation` entry: read lines 30-62 whole.
- `project-level/technology/reserved_choices.md`: not read. The method asks for it where the work needs a language, framework, library, store, login or place that the task, spec and foundation do not settle. This slice adds none of them, so I did not read it.
- `task.md`: not read. The handoff's passages of the task are the spec's; the task is named for the cycle, not for this slice.
- Entries E19 to E21, E24 and the spec's other sections: not read; outside this slice.

## Searches not found or unclear

- The plan's line ranges for D-354 and D-355 (`8926-8951`, `8952-8966`) do not match the worktree (`8945-8970`, `8971-8985`). Fixed by reading at the handoff's ranges.
- The sentence wording of the spec is not given; I chose it (choice 2).
- The `loop2-deploy` skill section and `references/troubleshooting.md` named in the spec's section 5: out of this slice's scope (slice 4 or later), not touched, not read.
- Searches for `account-previous-save` in `src/` and `tests/` before the change: found only the foundation and the spec's text, as expected; no code.

## Questions

None.
