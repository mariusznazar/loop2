**Status:** `done with concerns`

# Slice 16 executor report: nothing in the simulation takes from nowhere

Base: `0f810761`. Branch: `task/zapas-i-wskrzeszenie`, worktree `the root of the task's worktree`.

## Commit

- `114189c5` refactor: :recycle: let sendTake take the chest always and drop takeFromNowhere and clippedTake with the cases that held them, as no start or view calls them now (D-189)

## Files changed

- `src/browser/sim/trip.ts`: sendTake takes a `Chest`, not `Chest | null`; its null branch goes; `clippedTake` and `takeFromNowhere` are removed; the doc comment of sendTake loses the sentence about a `null` chest. Net -40 lines (mostly removals).
- `tests/sim/trip.test.mjs`: the imports of `clippedTake` and `takeFromNowhere` go; five cases go (two `takeFromNowhere` cases, one `clippedTake` case with its D-251 comment, and the two `sendTake` cases with a `null` chest); the comment above the `sendTake` cases is rewritten so it no longer speaks of cases with no chest; a stray trailing blank line at the end of the file is removed. 5 insertions, 122 deletions across both files.

Nothing else changed. `git status` is clean after the commit.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Typecheck | `npm run typecheck` | 0 | passes |
| Simulation trip cases | `npm test -- tests/sim/trip.test.mjs` | 0 | 24 pass, 0 fail |
| View trip cases | `npm test -- tests/view/trip.test.mjs` | 0 | 9 pass, 0 fail |
| Format of the two files | `npx prettier --check src/browser/sim/trip.ts tests/sim/trip.test.mjs` | 0 | passes |
| Lint of the two files | `npx eslint src/browser/sim/trip.ts tests/sim/trip.test.mjs` | 0 | passes |
| Foundation | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 | 6 errors, none for `trip.ts` or `trip.test.mjs` (see below) |

No run failed and was then rerun, so no failing-then-passing pair exists to report.

Foundation check, the 6 errors, all in `tests/view/account-screen.test.mjs` (slice 18's file, not my change):
- lines 2746, 3129, 3134: `D-251` is withdrawn; name its successor;
- line 3133: the quotation stands in no binding sentence of `D-189`;
- lines 3260, 5152: the quotation stands in no binding sentence of `D-217`.

Not run:
- The full suite and the full gate (`npm test` without a file): out of this slice's boundary by the handoff.
- The foundation check's test-citation part: skipped by the orchestrator's flag. The 6 errors above would be the citation check's to report; I did not run that part.
- A mutation tool run: the testing guideline leaves it to the reviewer for `simulation`.

## Own-work check (section 3)

- Requirement: `sendTake` takes a chest always, the removed functions leave, and no behaviour of the game changes.
- Check 1: `git grep` over the repository, excluding `.the-way` and `.runs`, found `takeFromNowhere`, `clippedTake` and `sendTake` only in `src/browser/sim/trip.ts` and `tests/sim/trip.test.mjs` before my change, and `sendTake` in `src/browser/view/trip-lines.ts` (line 29), which passes a chest. `balance/` has no caller. The typecheck confirms no `null` chest is passed anywhere.
- Check 2: the sim file's chest-based `sendTake` cases still cover what the removed ones cut: the stock cut (unsolved map, first case), the capacity of 12 shared down the list with a partial row (second case), and the map's entry cap of 4 (third case). The zero entry cap is covered through `takeTrip` in the case "entry caps, including zero, affect equipment independently of exit caps". All of them pass.
- Mutation in my head: a `sendTake` that ignored the chest's stock would fail the first chest-based case; one that dropped the partial row would fail the second.

## Reasons for the removed cases

- The cause is on the requirement side: D-189 says a manual run of a solved map takes from the chest like any run, and the view and every start pass the chest, so the functions that took from nowhere have no caller. The five cases tested those functions, and the case with the D-251 comment named the withdrawn decision. Under the testing guideline, removing a case needs such a cause and its source; both are given here.
- The `solved-map-manual-run` invariant was cited by one of the removed cases (`takeFromNowhere`). Its other citing cases in `tests/sim/trip.test.mjs` stay, and the invariant's sentence ("adds no practice") is not something the removed cases checked.

## Choices

- `sendTake` keeps its `clipTrip` call and its parameters; only the `null` branch goes. Rejected: keeping `takeFromNowhere` for the tests only. Cost if wrong: none found; the slice said to remove it.
- The sentence "A solved map takes the same way (D-189)" was added to the doc comment of `sendTake`, so a reader of the function sees the solved-map case without the removed text. Cost if wrong: a comment that repeats D-189; trivial.

## Reach beyond the dispatch

- Foundation entries read beyond the dispatch: `solved-map-manual-run` (invariants.md:1058, read whole) because the removed `takeFromNowhere` case cited it; `D-18` and `D-64` through `decision_index.py --decision` (both listed in full; their sentences do not bear on the removal).
- `tests/sim/trip.test.mjs` read whole before the edit, as the method requires.

## Working copies

- `.runs/slice-16-executor/`: a directory of mine holding the decision index output and the check logs. Removed with `rm -rf` by its full path; `ls` afterwards confirmed it is gone. No git worktree was made. Remainder: none.

## Unread material

- `foundations/part_map.md`: read lines 33-64 only, the range the slice names.
- `D-251`: it has no heading of its own; I read the withdrawn-table row at `foundations/decisions.md:11712` with its header (lines 11710-11713), which is where it stands.
- Not read, and why: `walkthrough.md` and `ui_check.md` (the change alters no behaviour a user sees, as the view and the game state are the same); `task.md` and `plan.md` (the handoff's copied slice text was enough); `reserved_choices.md` (no technology choice).

## Searches not found or unclear

- A heading `### D-251` in `foundations/decisions.md`: not found. D-251 stands only as a row of the withdrawn table at `foundations/decisions.md:11712`.
- The handoff expected `tests/view/trip.test.mjs` to have a failing case (the solved-run line, slice 17). At this base it passes, 9 of 9. I did not investigate why; it is a discrepancy with the handoff, not something my change touched.
- `git grep` for the three functions: found only the places listed above; nothing unclear.

## Questions and concerns

- No questions for the orchestrator.
- Concern: `tests/view/account-screen.test.mjs` still quotes `D-251` (lines 2746, 3129, 3134) and quotes `D-189` and `D-217` without a binding sentence (lines 3133, 3260, 5152). That is the foundation check's error list above; it is slice 18's file, and I did not change it.
- Observation: the first `git commit` call was blocked once by the session's rules hook, which asked me to read the git rules of the user's global instructions; I read them, then ran the same commit unchanged.
- Observation: the commit's author address is the private address that the user's git config gives this account (per the git rules); I did not change it.
