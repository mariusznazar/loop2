Status: done

# Slice 18 — executor report

## Commits and files

- `ad90dd33` test: hold the account screen's cases to the team's uses of the resurrection (base `0419a56e`).
- `tests/view/account-screen.test.mjs`: +35 / -61.

## What changed

- The comment of the section "the character's row" no longer names D-251.
- The case "the mark of a rehearsal the earning loop cannot repeat ..." is removed with its comment, its `decision:` lines of D-329, D-189 (old sentence) and D-251, and its helper constant. Reason: D-251 is withdrawn, and the card has no mark to test. No other case of this file had a manual run of a solved map against the chest (searched `solvedMaps`, `pieces:`, `chest`), so no case needed to be moved to the take from the chest.
- `renewing(at, left)` sets `resurrectionUsesSpent: 3` and `resurrectionNextReturnAtMs: at + left`, not `resurrectionReadyAtMs`.
- The two clock-tick cases (headquarters; headquarters/Postać/Mapy while a manual run waits) expect the lines of question 6: at zero uses "Wskrzeszenie drużyny: użycia 0 z 3, następne za 1 godz. 0 min czasu realnego — śmierć zabierze ..." in `danger`; at 59 min the same with "59 min"; at the moment the first use returns "użycia 1 z 3, następne za 4 godz. 0 min czasu realnego" with no `danger`. The first case also goes on eight hours more and expects the full stock "Wskrzeszenie drużyny: użycia 3 z 3" and no next return, one write each step.
- The death case "a game minute that ends the map run in a death is saved at once, settled" expects `{ kind: "resurrectionUsed", usesSpent: 1 }` (as the handoff gives: the settlement stores the uses spent) and `team.resurrectionUsesSpent` 1 in the saved game.
- Both `decision: D-217` lines quote the first sentence of D-217 as it stands now (full sentence).
- Version lines (`VERSION`, `OLDER_VERSION`) were already taken from `SAVED_GAME_VERSION` (8) and `SAVED_GAME_VERSION - 1` by the fix agent; checked, left as they are. The comment of `OLDER_VERSION` ("a team held its one resurrection as a moment of readiness") is true of version 7 and stays.
- D-240 `decision:` lines (2272, 2297) already passed the foundation check; unchanged. No `decision: D-251` line remains.

## Checks

- Before: `npm test -- tests/view/account-screen.test.mjs` failed 4 cases (the mark case, the death case, both clock-tick cases); `python -B .the-way/elements/common/foundation_check.py` reported 6 errors, all in this file.
- After: `npm test -- tests/view/account-screen.test.mjs` exit 0 (132 pass, 0 fail); `python -B .the-way/elements/common/foundation_check.py` exit 0, "0 errors" (no skip switch); `npx prettier --check` and `npx eslint` on the file clean.
- Not run: the full gate (`npm test` bare), by the handoff.

## Own-work check

- Requirement most likely missed: the new D-217 lines for the middle (part stock, `text-secondary`) and the full stock at the page level, since the old cases only had "not ready" and "ready". Check: the tick case now walks 0 -> 1 -> 3 uses and asserts text and the absence of `danger` at each; it passed. The expected values are literals written from question 6 / D-217 (3 uses, 240 min span), not computed by code.
- Mutations considered: a line that kept `danger` at one use, a wrong count from the data, a missing next-return at the full stock, and a death settlement with no `usesSpent` — each fails one of the assertions above.
- Trust boundary (answer of step 4 was yes for `saved-game.ts`): this slice changes only a test of the page and no loader code; the crafted-input cases of the load (counts above the data's, negative or non-finite numbers, a moment with no use spent, wrong types) belong to the earlier slice's `tests/sim/saved-game.test.mjs`, which I did not touch or re-verify.

## Walkthrough

The change alters no behaviour a user sees: it edits one test file only. The walk through the running game is the dedicated step after this slice, as the handoff says; I made none.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` (named by the method's table). Source reads for the lines' wording: `src/browser/view/team-lines.ts` (the line function), `src/browser/sim/game.ts:70-135` (how uses return, to derive the 0 -> 1 -> 3 steps), `src/browser/sim/saved-game.ts` (names of the saved fields), `tests/view/team-lines.test.mjs`, the diff of `fd5eb418` (clock tests) as a pattern. Decisions D-189, D-190, D-215, D-216, D-217, D-218, D-219, D-240, D-242, D-329 through `decision_index.py` (I read D-189, D-215, D-216, D-217, D-240 in full). All because the handoff's *Read* named rows but not the whole set the file's cases quote.

## Working copies

`.runs/slice-18-executor/` (the decision indexes) stood in the worktree and was removed with `rm -r` by its full path; no remainder.

## Unread material

- `guidelines/styleguide-browser-view.md` (94 000 characters) and `guidelines/coding-browser-module.md` (27 000) not read: the slice changes no view code, only a test file. `src/browser/AGENTS.md` and `foundations/part_map.md:3-31` not read for the same reason.
- `guidelines/testing.md` read whole; `guidelines/coding.md` read whole.
- `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md` not read (no screen change, no walk by this slice).
- `tests/view/account-screen.test.mjs` itself was read by ranges, as the handoff says (about lines 1890-1905, 2735-2750, 3100-3420 and 5110-5260).
- task.md beyond the copied passage; plan.md: not read, not named.

## Searches not found or unclear

- A case in `tests/view/account-screen.test.mjs` that expects a run of a solved map to leave the chest as it was (the plan's Goal): searched `chest`, `solvedMaps`, `pieces:`, `from nowhere`, `already solved`: not found; the only such case was the removed mark case (it asserted the mark, not the chest). So nothing was changed for Slice 3 there.
- The Goal says "the settlement of a death that spent a use holds its uses left"; the handoff (a) says it now stores `usesSpent`. I followed the handoff and `src/browser/sim/types.ts:295`.

## Questions and concerns

None blocking. One note: the removed mark case was the only case of this file that put a take list over a chest stock on a solved map; the line above „Wejdź” counting that take from the chest is held by `tests/view/maps-screen.test.mjs` and `tests/view/trip.test.mjs` (slices 15 and 17), not by this file.
