Status: done

# Slice 2 executor report: the load admits the deposit of a completed run of a solved map

## Status and commits

- Status: `done`.
- Commit: `814cb8b1` on `task/zapas-i-wskrzeszenie`, base `f30dffb7`. Author address is the private one that the repository's remote rule gives (`mariusznn@gmail.com`), as the git rule of the vault says for this account.
- Files changed (commit numstat):
  - `src/browser/sim/saved-game.ts`: 3 added, 10 removed.
  - `tests/sim/saved-game.test.mjs`: 41 added, 8 removed.
- `SAVED_GAME_VERSION` stays 7; the document shape is unchanged.

## What changed

- `src/browser/sim/saved-game.ts`:
  - `deposited` lost its `marked` parameter and the refusal of a non-empty deposit on a marked run. A completion of a marked run now reads its deposit by the same rule as any other completion: entries of the frozen bring plan in its order, each at most its planned count, an empty list allowed.
  - The doc comment of `deposited` now says a manual run of a solved map completes by the same rule (D-189). The call in `mapRun` drops the `solvedMapRun` argument.
- `tests/sim/saved-game.test.mjs`:
  - Removed the case `"a deposit at the completion of a marked run"` from the `CRAFTED` table (it was refused as `shape`; the reason was that a marked run deposits nothing, which D-189 no longer says).
  - Added the test `a completion of a marked run depositing its planned counts loads, and a deposit beyond them is refused as shape`, with `// decision:` lines quoting D-189 and D-179 and `// invariant: solved-map-manual-run`. It loads the marked completion depositing berry 5 and stick 20 (the planned counts of the document), and asserts `shape` for a deposit above the planned count (berry 6), for an item the frozen bring plan lacks (moss 1), and for a deposit out of the bring plan's order (stick 4 then berry 2).

## Checks

- Failing run first, on the base code with the new test added (the case that loads a completed marked run with a deposit from its bring plan):
  - command: `npm test -- tests/sim/saved-game.test.mjs`; exit 1. The new test failed with `{ ok: false, reason: 'shape' }` where `{ ok: true, state: ... }` was expected. Log kept in the executor's working directory, now removed.
- Passing run after the change:
  - command: `npm test -- tests/sim/saved-game.test.mjs`; exit 0. `tests 41, pass 41, fail 0, skipped 0, todo 0`.
- `npx prettier --check src/browser/sim/saved-game.ts tests/sim/saved-game.test.mjs`: exit 0.
- `npx eslint src/browser/sim/saved-game.ts tests/sim/saved-game.test.mjs`: exit 0.
- Not run: the full gate (`npm test` bare), `foundation_check.py`, `check_instructions.py`, the quality tests and the size rule test `tests/quality/test_function_and_file_size.py`. The slice's *Checks* name only the focused file, and the handoff forbids the full gate. The size rule: the change removes lines from `saved-game.ts` (1411 lines, already over the threshold per the file; the change does not add to it), so no new size debt is introduced, but the size test was not run.

## Own-work check (make-change section 3)

- Requirement: the load admits a completed manual run of a solved map with a deposit from its bring plan by the same rule as any completion, and refuses everything else it refuses today (D-189, D-214, D-386, invariant `solved-map-manual-run`).
- The likeliest miss: the marked run's deposit check still refusing, or the check dropping the planned-count or order limit for marked runs. The new test covers both: the positive exact case loads, and the three refusals (above count, unplanned item, wrong order) return `shape`. Both kinds of mistake fail this test.
- Mental mutation: a dropped `completed` check for marked runs (a deposit without a completion) is still refused by the existing `"a deposit before a completion"` case; a dropped `null` check for a marked completion is covered by `"a marked completion without its deposit"`.
- Walkthrough (`walkthrough.md`): not read and not applied. The change alters no behaviour a user sees in the running product on its own; the load now admits a state that the game will make only after Slice 3. Stated because the cycle's rule asks for it: the change does alter what the load accepts, but no screen or command changes in this slice.
- `ui_check.md`: not applicable, no screen changed.

## Invariant test

- `solved-map-manual-run`: its method is `test`. The test cited by the new case was seen failing on the base code (run above) and passing after the change (run above). Command and exit code are recorded in *Checks*.

## Choices and reaches

- Choice: one new test instead of editing the existing `CRAFTED` case into a positive assertion, because the `CRAFTED` table asserts refusal for all of its entries. The `CRAFTED` entry was removed, and the positive and refusal cases live in the new test. Way rejected: keep the `CRAFTED` table with a special case for marked runs; it would mix admitted and refused entries in one table.
- Choice: the `marked` parameter of `deposited` removed, since its only use was the refusal being removed. Way rejected: keep the parameter and pass `false`; it would leave a dead argument.
- Reaches beyond the dispatch: `decision_index.py` run for D-179, D-369 and D-50 (the reading note's altered-case decisions). D-179 applies (it says a completion puts only what the frozen list names into the chest) and was read; D-369 and D-50 do not speak to the deposit and were not applied. The index files were written under the executor's working directory and removed with it.

## Concerns and questions

1. Stale comments outside this slice's *Change*: `src/browser/sim/types.ts`, the doc of `deposited` on the `GameMapRun` type (line 333), says `[]` for a marked run, and the doc of `solvedMapRun` (lines 336-339) says a marked run "takes its equipment from nowhere, deposits nothing and pays no practice". After this commit a marked run's deposit is no longer `[]` by rule, so line 333 is now wrong, and line 336-339 is wrong on the deposit part. Recommended: the orchestrator decides whether Slice 3 (which lets such a run bring items out) or a fix of its own corrects `types.ts`. I did not edit it, per the boundary.
2. No other file of the product mentions the marked run's deposit as empty; the test at `tests/sim/saved-game.test.mjs` (the case "a map run of a solved map comes back marked, and its completion with the empty deposit", about line 925) still holds, since an empty deposit is still admitted.

## Unread material

- `src/browser/sim/types.ts`: read in part only, through `grep` with context around `TripEntry`, `TripPlan`, `GameMapRun` (lines 75-78, 313-358) and `Game` run field (lines 451-457). Not read whole. Its comments at 333 and 336-339 are the stale ones in concern 1.
- `foundations/decisions.md` D-179: read through its `Origin` line (8350-8361) and not its Rationale and Rejected, which the cycle's read list does not name.
- `foundations/decisions.md` D-206: read whole through its Rationale (3888-3920, the Rejected part after line 3920 unread).
- `foundations/decisions.md` D-369 and D-50: read through `decision_index.py` output only (the index's full entry text), not as file passages.
- `task.md`: read lines 25-46 only (the To do items 1, 2 and Question 1 passages), as the handoff names.

## Searches not found or unclear

- `python -B .the-way/elements/common/decision_index.py --decision 179` (the number without the `D-` prefix): fails with `no decision 179`; the script takes `--decision D-179`. Used the prefixed form.
- The reading note's altered-case decisions: found D-179 as the one that holds the case; no other was clearly applicable.
- Nothing else looked for was missing.

## Working copies

- The executor's working directory `.runs/slice-02-executor/` held the decision indexes and the two test logs. It is removed; no worktree was made, so no `git worktree remove` was needed.
