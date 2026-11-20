**Status:** `done with concerns`

# Slice 13 executor report: the clock's tests settle deaths and first solvings on the uses

Task `zapas-i-wskrzeszenie`, slice 13 (plan item "The clock's tests settle deaths and first solvings on the uses"). Base `fe59bd56`, branch `task/zapas-i-wskrzeszenie`, worktree `the root of the task's worktree`.

## Commits

- `fd5eb418` test: :white_check_mark: read the clock's resurrection cases as the team's uses, with the quoted sentences of D-190 and D-242 as they stand

## Files changed

| File | Added | Removed |
|---|---|---|
| `tests/view/clock.test.mjs` | 72 | 43 |
| `src/browser/view/clock.ts` | 4 | 4 |

`clock.ts` changed only its comments (the flush doc comment, and the two comments inside `flush`). Its code is unchanged, so the behaviour is unchanged.

## What the slice did

- The renewal constant was stale: it said 480 real minutes (8 hours), but D-190 and `src/browser/sim/data/balance.ts` (`resurrectionRenewalRealMinutes: 240`) give 4 hours. It is now 240 minutes, `14_400_000` ms.
- New helpers `withUses(state, spent, nextReturnMs)` set `team.resurrectionUsesSpent` and `team.resurrectionNextReturnAtMs`. `lastMinute`, `oneMinuteFromSolving` and the two-deaths case use them. No case reads or sets `resurrectionReadyAtMs` any more.
- Expectations now match the current model in `types.ts` and `game.ts`:
  - a death that spends a use expects `{ kind: "resurrectionUsed", usesSpent: N }` and the uses spent and the next return;
  - a death with no use left expects `progressLost` and the generation number;
  - a completion expects `resurrectionRenewed` or `resurrectionReady` and the uses it leaves.
- Cases rewritten:
  - "a flush in which the character dies hands the store one result…": full stock, expects `usesSpent: 1` and the next return at reading + 4 h.
  - "a death is settled against the reading of its flush, not an earlier one": three uses spent, next return at the flush moment (or one millisecond later). Expects `resurrectionUsed` at the moment and `progressLost` a millisecond later.
  - "…no practice dies settles the death as none to pay for": loops over a full stock and a stock with three spent. Expects the uses unchanged.
  - "…solves its map for the first time…": renamed to "returns a use at that reading, once". Starts with two uses spent, next return at the reading's own moment, so the completion must run after the return. Expects zero spent and no next return. Before this change the case asserted the old field.
  - "…solves its map finds the team's stock of uses full and says so": renamed (was "finds a ready resurrection ready and says so"). Full stock, expects `resurrectionReady` and the stock unchanged.
  - Earning-loop two-deaths case: renamed to "takes the last use". Starts with two uses spent, so Ola's loop death takes the last one (three spent, next return at her minute plus 4 h). Ala's manual death then finds none and gets `progressLost` with generation 2.
  - "an earning loop's end is settled at the minute's own moment": expects one use spent and the next return at the minute plus 4 h.
- Decision lines updated to the sentences as they stand in `foundations/decisions.md`:
  - D-190, first sentence (three cases, changed by one replace-all): "A character's death takes what it carried … when the resurrection has no use left … uses up no use of the resurrection, whether one is left or not, and does not stop its earning loop".
  - D-190, "The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop." (two-deaths case).
  - D-190, "The first completion of a map the account has not solved yet returns one use at once while the stock is not full, once for each map, the clock running on as it was, and a full stock stays full." (completion cases).
  - D-242, "In the open game a reading passes … so that of two deaths for the account's last use of the resurrection … and the clock of the returns runs from the moment of the death that started it" (two-deaths case).
- Comments of `clock.ts`: "the team's resurrection" became "the team's uses of the resurrection" and "the return of a use" where the completion settles a return. The renewal wording in the doc of `flush` is unchanged in meaning.
- Test comments reworded where they described "ready" (the moment-of-reading comment, the two-deaths comment, the RENEWAL_MS comment).
- `npx prettier --write tests/view/clock.test.mjs` was run on the test file after the edits. The base file was already prettier-clean, so only the edited lines moved.

## Checks

- Baseline before any edit, `npm test -- tests/view/clock.test.mjs`: exit 1. Five cases failed on the stale field: "a flush in which the character dies hands the store one result…", "a death is settled against the reading of its flush, not an earlier one", "a flush in which the map run solves its map for the first time settles the renewal…", "in a reading that ends an earning loop's map run in a death and the manual run in another…", "an earning loop's end is settled at the minute's own moment…".
- After the edits, `npm test -- tests/view/clock.test.mjs`: exit 0, 27 tests, 27 pass, 0 fail (run twice; the second after prettier).
- `npx prettier --check tests/view/clock.test.mjs src/browser/view/clock.ts`: passes.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 1, 33 errors. None is in `tests/view/clock.test.mjs` or `src/browser/view/clock.ts`. The errors sit in files of later slices (`D-251` withdrawn references, and "the quotation stands in no binding sentence" in `tests/view/account-screen`, `end-window*`, `maps-screen`, `trip`).
- `python -B .the-way/elements/common/foundation_check.py` (without the skip flag): exit 1, the same 33 errors. The citation check does run in it, and it passes both quotations of the two files. Note: with `--skip-test-citations` it still reported the same citation errors, so that flag did not suppress them in this run.
- Not run, as the handoff says: the full gate (`npm test` without a file). Not run: `check_instructions.py` (the gate's, not mine).

## Own-work check (section 3 of `make-change`)

- Requirement: every case of `tests/view/clock.test.mjs` that set or expected one resurrection now reads the uses; its decision lines hold the sentences as they stand; the comments of `clock.ts` speak of uses; behaviour unchanged.
- Check: grep for `resurrectionReadyAtMs`, `readyAtMs` and `eight`/`480` in both files returns nothing. The test file passes 27 of 27. The citation check passes both files. `clock.ts` has only comment lines in its diff.
- Result: as expected. The completion case starts with two uses spent and the next return at T0 + 1 s, the reading's moment. If the completion were settled at the clock's start (T0), that use would not yet be back, and the stock would end at one spent, not zero, so the case pins the settlement to the reading.
- I did not run a code mutation. `testing.md` names the StrykerJS run for simulation files only, so for these browser-view files I checked by reasoning only: a clock that settles the death or the completion before the reading, or in the wrong order, would fail the death case, the moment case or the two-deaths case.

## User-visible walkthrough

This slice changes no behaviour a user sees: the test file and comments only. The state check of the changed components is the jsdom tests of these files. The walk through the running game with screenshots is the dedicated step after slice 17, as the orchestrator's handoff says.

## Working copies

- `.runs/slice-13-executor/` held my check outputs (baseline and after-run logs, a foundation-check log, decision index files for D-239, D-241 and D-246, and one copy of the base test file made to check prettier). It was removed with `rm -rf` by its full path. No worktree was made by me.

## Choices made

- Two uses spent is the start for the two-deaths case, so that one use is left for two deaths; that is the same situation the old single-field test described.
- The completion case starts with two uses spent and the next return at the reading's moment, not with a full stock. A full stock would not tell a settlement at the reading from one at the start.
- Three test names changed to describe uses and not "ready". Cause: the requirement changed (D-190 as Slice 1 rewrote it, with the uses model of Slice 6). Not a weakened assertion.
- The renewal constant changed from 8 h to 4 h. Cause: D-190 and the balance data, not a code change.

## Unread material

- The frozen task `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` and the plan `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md`: not read beyond the passages copied in the handoff, as the slice does not send me to them.
- `src/browser/sim/types.ts`: read only its resurrection parts (the `DeathSettlement`, `CompletionSettlement` and `Team` types, and the comment lines about the uses), by search, not whole.
- `src/browser/sim/data/balance.ts`: searched for the resurrection lines only.
- `foundations/decisions.md` D-246 (the report after being away): read from its heading to about line 8880; its rationale and its later parts were not read.
- `foundations/decisions.md` D-239 and D-241: read whole, through the decision index for D-239, D-241 and D-246 that the reading note asks for.
- `foundations/invariants.md`: read the entries of `resurrection-renewal`, `catch-up-minutes` and `catch-up-death-moment` whole; no other invariant.
- Guidelines: `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` and `src/browser/AGENTS.md` read whole. `.the-way/task-cycle/change/SKILL.md` and `slice.md` read whole.
- Vault rule `a file of the author's private notes`: read when the commit hook asked for it, before the commit.

## Searches not found or unclear

- The citation check under `--skip-test-citations` still reported the citation errors; I could not tell from the output whether the flag is meant to suppress them. Not in my files, so left as it is.
- None of the things I looked for in my two files was missing: `resurrectionReadyAtMs` and the 480-minute constant are gone from both files.

## Remarks for the orchestrator

- The commit author shown by `git log` is `mariusznn@gmail.com`, the identity configured in this checkout. I did not change it.
