**Status:** done with concerns

# Slice 9 report: the catch-up and the earning loops spend and return uses in the list's order

Worktree: `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`, base `3c621606`.
Method: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice", with `slice.md`.

## Commits and files

- Commit `b0353afa` (`test: :white_check_mark: hold the catch-up and the open game to the uses of the resurrection ...`), three files added by path:
  - `src/browser/sim/loop.ts`: comments only (16 lines), no change of behaviour. The comments of `endLoopRun` and `catchUp` now speak of uses and of the clock, not of "the one resurrection" and "ready".
  - `tests/sim/catch-up.test.mjs`: 199 lines changed.
  - `tests/sim/loop.test.mjs`: 118 lines changed.
- Whole stat: 205 insertions, 128 deletions. `game.ts` and every other file are untouched.

## Checks

- `npm test -- tests/sim/catch-up.test.mjs`: exit 0, 35 of 35 pass. Before the edits: exit 1, 14 failing (all on the old single-resurrection field and the 8-hour renewal).
- `npm test -- tests/sim/loop.test.mjs`: exit 0, 46 of 46 pass. Before the edits: exit 1, 6 failing (same cause).
- `npx prettier --check` on the three files: clean. The two test files were formatted with `prettier --write`; the committed versions before my change were clean too.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 1, 9 errors, none in the three files of my change. All 9 are quotations in `tests/view/` (`account-screen.test.mjs:3130` D-189; `clock.test.mjs:320, 392, 538, 581, 582` D-190 and `585` D-242; `maps-screen.test.mjs:749` D-189; `trip.test.mjs:175` D-189). They are in files of later slices, which the plan stands by.
- Not run: the full gate (`npm test` without a file), which is the orchestrator's or CI's; ESLint and the typecheck of `loop.ts` (comment-only change).

## Own-work check (section 3)

- Requirement: a character later on the list that died earlier in real time finds the uses and the clock as the earlier character left them, and the clock does not move back (D-240, `catch-up-death-moment`, `resurrection-renewal`).
- New case: "a character later on the list that died earlier in real time finds the uses and the clock as the character earlier on the list left them". It passes on the unchanged code. No code change in `game.ts` or `loop.ts` behaviour was needed.
- Check that it discriminates: I broke the clock rule in `game.ts` for a moment (`nextReturnMs ?? momentAfter(nowMs, RENEWAL_MS)` replaced by `momentAfter(nowMs, RENEWAL_MS)`). The case failed on the clock assertion: actual minute 241 (`1760015260000`), expected minute 483 (`1760029780000`). Three cases failed in that run. I restored `game.ts`; `git status` shows it clean again, and the committed file is the one before my change.
- The state hand-derived from the sentences of D-240 and D-190 agrees with the run (for example, the alone character's second death at minute 486 is covered, and the run number reads 3 at minute 600).

## Choices, with the way rejected

1. The case of the character later on the list is the first case of the slice, as the handoff asks. Its setup is fresh uses (none spent), Ala dying in minute 243 and Ola dying in minute 1; the reading is minute 243 plus 30 s, so Ola's second death (about minute 244) is outside the span. Rejected: a longer reading, where Ola's second run death would need hand-deriving with a cold-death minute I have not checked for later runs.
2. The cases that were about one use left now start from two uses spent with the clock at minute 10 000 (`oneLeft`), and "all uses spent until a moment" is `usedUpUntil` (both helpers in `catch-up.test.mjs`; `usedUpUntil` also in `loop.test.mjs`). Rejected: reaching the same stock through earlier deaths, which needs more than three deaths and the same reasoning twice.
3. The case "a death in game minute 243 ... whatever the reading" lost its second half. The old second death (243 minutes later, "takes the character") is now covered: the first use returns 240 minutes after the first death, before the second death at minute 486. The uncovered second death is covered by the case with all uses spent. Rejected: keeping a second death at a time when the stock is still one short.
4. "covered then uncovered" became "covered then covered" in the relation case: a character alone with three uses lives on through two cold deaths; the run number is 3 at minute 600.
5. The report field `resurrectionUsed` (a boolean on a line of the away report) is kept: the slice does not name it and the view reads it.
6. Quotations: each `decision:` line of the altered cases quotes the current sentence of D-189, D-190, D-240 or D-242, copied from `foundations/decisions.md`; the D-190 "eight hours" sentence is replaced by the "uses up one use" sentence in the cases about a death, and the "clock" sentence is quoted only where a case holds the clock. The foundation check passes for these quotations.

## Concerns and questions

1. Question: are the two "last use" cases (`oneLeft`, clock at minute 10 000) an acceptable fixture? I recommend yes: it is the exact state the sentence of D-240 describes ("one use left for two deaths"), without a made-up path through play. Answer needed only if the orchestrator wants the stock reached by deaths.
2. Question: is the removal of the second half of the first death case acceptable? I recommend yes, for the reason in choice 3.
3. The nine foundation errors in `tests/view/` stand by the plan (slices 12 to 15, 17, 18), as the handoff says.
4. Problem as observed: my first baseline log went into the system temp directory before I moved it into `.runs/slice-09-executor/` within the same command. Nothing was left in the temp directory.

## Unread material

- `foundations/part_map.md:33-64` (simulation part): not read; the handoff's *Read* names it, and it does not change what the slice does.
- `decision_index.py`: not run, so the entries of decisions that my altered cases quote but I did not edit (D-212, D-239, D-241, D-246, D-250, D-386, D-140, D-243, D-245, D-22) are checked by the foundation check only, not read whole for their sentences.
- `foundations/decisions.md`: D-190, D-189, D-242 and D-246 were read in their paragraphs and their Verification fields, not every line of each entry; D-240 was read whole.
- `foundations/invariants.md`: `trip-transfer`, `trip-run-end`, `resurrection-renewal` and `catch-up-death-moment` read in their sentences; `catch-up-state` and `catch-up-minutes` read in their sentences too; `loop-practice-payment` read whole.
- `src/browser/sim/game.ts`: read at lines 60 to 195 and 610 to 760 (renewal, death, completion, settling); lines 195 to 610 not read.
- `.runs/task-cycles/zapas-i-wskrzeszenie/task.md`: not read; the handoff copies the passages the slice needs.
- `guidelines/coding-simulation-module.md`, `guidelines/coding.md`, `guidelines/testing.md`: read whole.
- `a file of the author's private notes`: read (the hook asked for it before the commit).

## Searches not found or unclear

- Searched for `resurrectionReadyAtMs` after the edits in the three files: none left.
- Searched the foundation for the sentence "A manual map run that first solves its map pays practice and loot ...": not in the catch-up file (only in the loop file, where it was replaced).
- Unclear: whether the handoff's "reading note" (decision index for each quoted decision) binds for decisions I did not change. I did not run `decision_index.py`; the foundation check passes for my files.

## Working copies

- `.runs/slice-09-executor/`: my log files of the test runs (baseline, after-edit, mutation, final) and the foundation check outputs. Removed before this report was finished (`rm -rf` by the full path); nothing of it is kept, since this report holds the results. No git worktree was made by me.
