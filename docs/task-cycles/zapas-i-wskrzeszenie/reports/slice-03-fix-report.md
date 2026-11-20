**Status:** done

# Slice 3 fix report: findings of the grouped review of slices 3-4

Findings file: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/findings-s34.md`. It holds two blocking findings, both Important, both from slice 3. It holds no Minor finding, so none is in this fix.

Fix range: from `0fde9df0` (slice 4). Commit of this fix: `a007dd9b`, on `task/zapas-i-wskrzeszenie`.

## Findings

### I-1: stale D-214 quotation at `tests/sim/trip.test.mjs:670`

- **Fixed.** The `decision:` line of the case "a run records at its start whether its map was solved, and a restart after the solving completion records it anew" now quotes D-214 as it stands: "A map run restart after the completion that solved the map is such a run: it takes its equipment from the chest and pays no practice."
- **Check:** `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` no longer reports any line of `tests/sim/trip.test.mjs`. Before the fix it reported line 670 with "the quotation stands in no binding sentence of `D-214`". Output: `.runs/slice-03-fix/fc-after.txt` (removed below).

### I-2: stale comment on `clippedTake` in `src/browser/sim/trip.ts`

- **Fixed.** The comment no longer says the take list is "as a run of a solved map takes it (D-189)". It now says: the take list cut by the carrying capacity and the map's entry cap in list order, the list's own counts standing in for the stock; no start of a map run uses it now (D-189), and the view's line of a solved map does. No code changed.
- **Check:** `npm test -- tests/sim/trip.test.mjs`: exit 0, 29 of 29 pass. `npx prettier --check` and `npx eslint` on `src/browser/sim/trip.ts` and `tests/sim/trip.test.mjs`: both exit 0.

## Sweep for other old wording, as the coordinator asked

Searched `tests/sim/trip.test.mjs`, `tests/sim/run-record.test.mjs`, and the comments of `src/browser/sim/trip.ts`, `game.ts` and `types.ts`, for "nowhere", "pays nothing", "takes nothing from the chest" and the old D-189 and D-214 sentences. Fixed what the sweep found, beyond the two findings:
- `tests/sim/trip.test.mjs`, comment above the `sendTake` cases: it said a solved one takes "from nowhere". It now says every start passes the chest, and the cases with no chest are the view's solved-map line.
- `tests/sim/trip.test.mjs`, test name "sendTake at a solved map takes the take list from nowhere, clipped by capacity 12 only": renamed to "sendTake with no chest, the view's solved-map line, cuts the take list by capacity 12 only". The name stated a rule no start follows.
- `tests/sim/trip.test.mjs`, test name "the backpack of a solved map's run is the entries sendTake gives from nowhere": renamed to "takeFromNowhere gives the entries of a list cut by capacity and entry cap, with no chest". The same reason.

Left as they are, because they are correct as they stand:
- `tests/sim/trip.test.mjs` case "a death on a manual run of a solved map takes what the character carried and pays nothing": "pays nothing" is a death rule (D-190, D-189), not the old take rule.
- `src/browser/sim/game.ts` advance comment "a death pays nothing": a death rule, correct.
- `src/browser/sim/trip.ts` `takeFromNowhere` and `sendTake` comments: they say no start calls it now, which is true.
- `src/browser/sim/types.ts`: no old wording left.
- `tests/sim/run-record.test.mjs`: no old wording left; its D-189 quote was fixed in slice 3.

The foundation check finds no quotation error in `trip.ts`, `game.ts`, `types.ts` or `run-record.test.mjs`.

## Outside this fix, reported and not fixed

The foundation check still exits 1, with 75 quotation errors, all in files of other slices. Full list in `.runs/slice-03-fix/fc-after.txt` (removed below); the notable ones are:
- `tests/view/trip.test.mjs:175`: a D-189 quotation stands in no binding sentence. That file is in Slice 17's Change list, and the view is Slice 15 or 17's business.
- `tests/sim/completion.test.mjs:585`: a D-214 quotation stands in no binding sentence. Its file is in Slice 2 or 8's business. I did not verify which, so it is a question for the orchestrator.
- `tests/sim/loop.test.mjs:760`, `:941`, `:1058`, `:1115`, `:1389`, `tests/sim/death.test.mjs:308`, `tests/view/account-screen.test.mjs:3130`, `tests/view/maps-screen.test.mjs:749`: D-189 quotations that stand in no binding sentence. These files are in other slices' lists (8, 9, 15, 17, 18). I did not check which slice owns each line.
- Also `foundations/invariants.md:1068`: `resurrection-renewal` is changed and no file citing it changed. That is outside slice 3.

## Own-work check

- Requirement: the review's two findings are fixed, the trip cases still match the rule, and no quotation of the old sentences is left in the named files.
- Check: the foundation check run above, which no longer lists a line of `tests/sim/trip.test.mjs`; the focused trip test, which passes 29 of 29; prettier and eslint on the two changed files.
- Result: the two findings and the sweep are done. The fix changed comments and test names only, no behaviour.

## Working copies

- `.runs/slice-03-fix/` held the foundation-check outputs and the logs of the checks above. It is removed at the end of this run by its full path. It is not a git worktree.

## Unread material

- `.the-way/task-cycle/change/fix.md`: read in full for this report's format.
- `.runs/task-cycles/zapas-i-wskrzeszenie/reports/review-s34-report.md`: not read. The findings file quotes it, and the fix does not need it.
- The rest of `trip.test.mjs`: read earlier in slice 3, and searched again for this fix by grep, not re-read whole.

## Searches not found or unclear

- Whether the owner of `tests/sim/completion.test.mjs:585` (a D-214 quotation) is Slice 2 or Slice 8. Unclear from the plan without reading it, so not checked.
- Whether the D-189 quotations in `tests/sim/loop.test.mjs` and `tests/sim/death.test.mjs` predate my slice or came from Slice 1's rewrite. Not checked, since they are outside this fix.
