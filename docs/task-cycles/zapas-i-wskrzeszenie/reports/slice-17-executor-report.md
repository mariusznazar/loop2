**Status:** `done with concerns`

# Slice 17 — the screen of a run of a solved map says what holds now

## Status and commits

- Status `done with concerns`: the slice is made and its focused checks pass. The concern: the walk through the running game and the screenshot are not made, as the handoff says they are a dedicated step after this slice (see "The walk and the screenshot").
- Base: `114189c5`. Commit: `0419a56e fix: :bug: say on a manual run of a solved map that it pays no practice and takes from the chest, as the line of D-215 gives (D-215, D-189)`. Committed by path, on `task/zapas-i-wskrzeszenie`.
- Diff of the commit: `src/browser/view/trip-lines.ts` +1/−1 line changed (the wording and the comment), `tests/view/trip.test.mjs` +2/−2, `tests/view/world-area.test.mjs` +28/−17. Total 32 insertions, 21 deletions.

## Check result (one line)

Failed: none in the focused checks. Did not run: `npm test` bare, the full gate, `check_instructions.py`, and the `foundation_check.py` run without `--skip-test-citations`. Foundation check (`--skip-test-citations`) exits 1 with 6 errors, all in `tests/view/account-screen.test.mjs` (slice 18's, as the plan stands); none in the three files of the change.

## What the change does

- The line of D-215 on the screen of a manual run of a solved map now reads the wording of D-215 as it stands: „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.” The old wording, „nic nie płaci i nic nie bierze ze skrzynki”, was false since slice 3. Its place (under the body row and the backpack, above „Wprawa w tym przejściu”) and its role (`text-secondary`, the class `trip-result` in `src/browser/run-screen.css:159`) are unchanged.
- The world-area test case that expected the preview „Wyniesie: nic” on a going-on solved run now expects „Wyniesie: patyk 3” (see choices).
- The test helper `died` in `tests/view/world-area.test.mjs` set the old field `resurrectionReadyAtMs`, which the state does not hold. It now sets the uses fields (`resurrectionUsesSpent`, `resurrectionNextReturnAtMs`), as `tests/view/trip.test.mjs` already does.
- The comment at the no-practice case quoted the old no-practice line. It now quotes the line of D-216 as it stands.

## Red and green runs (command and exit code)

- Before any change, `npm test -- tests/view/trip.test.mjs`: exit 0, 9 of 9 pass (the orchestrator's observation holds: the "six screens" case held the old constant, so it passed).
- Before any change, `npm test -- tests/view/world-area.test.mjs`: exit 1, 22 of 23 pass. The failing case is „the world area stands from the top …”: `Error: expected "Wyniesie: nic", got "Wyniesie: patyk 3"`. This was already red at the base, not caused by my edits.
- After the test edit and before the code change, `npm test -- tests/view/trip.test.mjs`: exit 1, 8 of 9 pass. The failing case is „the six screens of a map run …”: actual `Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.`, expected the new wording. This is the red for the new line, seen failing for the expected reason.
- After the code change, `npm test -- tests/view/trip.test.mjs`: exit 0, 9 of 9 pass.
- After the code change, `npm test -- tests/view/world-area.test.mjs`: exit 0, 23 of 23 pass.
- `npx prettier --check` on the three files: exit 0. `npx eslint` on the three files: exit 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 1, 6 errors, all in `tests/view/account-screen.test.mjs` (lines 3133, 3134, 3260, 5152), slice 18's.

No invariant test was changed or added in these files; no invariant test needed a seen-failing run.

## The own-work check (section 3 of the method)

- Requirement most likely unmet: the line must stand on a solved run from game minute zero until „Restart” or „Zakończ”, in the same place, and nowhere on a run that pays. Check: the six-screens case in `tests/view/trip.test.mjs` (going on, completed, dead, marked and unmarked) and the world-area case that lists the classes and texts of the parts from the top. Both pass. The solved line stays after a completion and after a death on a marked run, as the old test already expected; D-215 names „Restart” or „Zakończ” as its end and the code does not end it earlier.
- The line's role: `.trip-result` is `color: var(--text-secondary)` in `src/browser/run-screen.css`, which I read; the element is the same as before.
- Nothing in the code shows the line by minute; `solvedRunText` depends only on `run.solvedMapRun`, as D-215's „from game minute zero” requires.

## The walk and the screenshot

- Walkthrough (`.the-way/task-cycle/change/walkthrough.md`): judged that the change alters a line the user sees, so a walk applies. Not performed in this slice, as the handoff says the walk through the running game is a dedicated step after this slice. The plan of cases for that step, all unchecked for that reason:
  1. Going on on a solved map, from minute 0: the line stands below the body row and the backpack, above „Wprawa w tym przejściu”, in `text-secondary`, and the preview „Wyniesie: …” below it.
  2. Completion on a solved map: the line stays, the preview is gone, no deposit line.
  3. Death on a solved map, settled: the line stays in the world area; the settlement line sits in the end window.
  4. A run on an unsolved map: no solved line.
  5. Side observation: the first walk should also look at the line's wrapping on a narrow window, which no test reads.
- Screenshot (`.the-way/task-cycle/change/ui_check.md`): read. The change alters what the screen shows, so the states of the changed component were checked in code: the line is plain text in an existing element without states of its own. No screenshot was taken and none is kept. I did not read the foundation's settled place for screenshots (it is part of the walk step), so that place is not named here.

## Choices made

- The new wording is the sentence of D-215 as it stands, copied exactly, rather than a shorter paraphrase. Rejected: a shorter „nie płaci wprawy” alone, which would not match the decision and would leave the test quote out of step with the foundation. Cost if wrong: none known.
- The going-on solved run's preview: the expected value in the world-area case is now `Wyniesie: patyk 3`, as D-186 and the six-screens case of `trip.test.mjs` already say. Rejected: keeping `Wyniesie: nic` and hiding the preview on solved runs, which would contradict D-186 (the preview is shown on any map run, D-189 covers the take of a solved map) and the code that already shows it. Cost if wrong: a wrong value would show in the test rather than the product; the product draws `patyk 3` today.
- The `died` helper: the mapping `usesSpent = 0` for the old "ready" and `usesSpent = BALANCE.resurrectionUses` for the old "not ready" keeps every caller's meaning. The import of `BALANCE` from `dist/browser/sim/data/balance.js` is new in `world-area.test.mjs`. Rejected: keeping the old field, since the state does not hold it and the test would pass for the wrong reason.
- Commit type `fix:` rather than `feat:`: the product said a false thing, and the change corrects it. Cost if wrong: only the history label.

## Adaptations of section 4 and mismatches with the plan

- One small mismatch: the handoff describes the world-area case as one that "expected the old rule of the run (no deposit, no preview)". The case in fact expected a preview with the wrong text, `Wyniesie: nic`, and the code gives `Wyniesie: patyk 3`. I changed the expected value only; the no-deposit assertions were already right.
- No structural mismatch: the code and the plan agreed on the place and role of the line.

## Reaches beyond the dispatch (section 1 of the method)

- `.the-way/task-cycle/change/slice.md`: read, as my method names it for a slice.
- `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md`: read, as my method names them for a change that alters a user-visible screen. The walk itself is deferred (above).
- The decision index (`python -B .the-way/elements/common/decision_index.py --decision N`) for D-214, D-311, D-201, D-334, D-335, D-147 and D-216, written under the working directory, to read the decisions the altered cases quote by a `decision:` line. Where the index gives the decision's sentence, I read the sentence; I did not read each of these entries whole (see Unread material).

## Working copies

- `.runs/slice-17-executor/` (ignored `.runs/` of the worktree): held the decision index files for D-147, D-201, D-214, D-216, D-311, D-334, D-335, the test and lint logs. It is removed, by its full path, before I return; the results it held are in this report. No worktree and no clone were made, so there was nothing for `git worktree remove`.
- Session scratch directory, outside the worktree: two baseline logs (`trip-baseline.txt`, `world-baseline.txt`) and the `world-baseline` line used above. Not a working copy of the cycle's rule; left in place.

## Unread material

- `foundations/decisions.md` D-214, D-311, D-201, D-334, D-335, D-147 and D-216: read through the decision index's text of each, not whole to the next heading.
- `.claude/skills/loop2-play/SKILL.md`: not read (the walk is deferred).
- The foundation's settled place for screenshots: not read (the walk and the screenshot are deferred).
- `task.md`: read only lines 78-81 (the passage the handoff names).
- `foundations/invariants.md`: not read; no invariant is cited by the altered cases in a way that needed it.
- `guidelines/styleguide-browser-view.md` and `guidelines/testing.md`: read whole, in three and two pages.

## Searches not found or unclear

- `resurrectionReadyAtMs`: found only in `tests/view/world-area.test.mjs`; no product code uses it (the state holds `resurrectionUsesSpent` and `resurrectionNextReturnAtMs`).
- The `--skip-test-citations` flag of the foundation check: its name suggests that quotations are not checked, but the quotation errors in `account-screen.test.mjs` show that the quotation check runs. My quotations in the two test files and in the trip lines show no error in that run. Unclear whether the flag's scope covers test citations of the three files as the gate's run would; the gate's run was not made.
- Nothing else looked for was not found.

## Problems as observed

- At the base, `tests/view/world-area.test.mjs` already failed one case (see the red runs above). It was not caused by the slice; the slice fixed it.
