# Planner report — task `rozwiazanie-lasu`

- Status: done with concerns
- Plan: `.runs/task-cycles/rozwiazanie-lasu/plan.md`
- Size report: `.runs/task-cycles/rozwiazanie-lasu/plan-size.md` — `slice_size.py` exit 0, all six
  slices `fits` (largest read: Slice 5, about 78,700 estimated tokens; most files changed: 7).
- Check result: no slice too large or unchecked; nothing failed. The plan's commands were not run —
  they are the slices' checks, run when each slice is made.
- Base: `c0c51a0`. No code, test or foundation entry written; nothing committed.

## Open design choice

None. Reading the code showed no choice beyond the spec and the task: every choice the plan takes
is one of how to make what they settle, listed under the plan's *Choices*.

## The plan in short

1. Pace in the simulation (`pace` in the game state, `setPace`, list of paces in `balance.ts`,
   `passRealTime` scaled by the pace; the pace invariant test without its completion words).
2. Pace buttons in the status row (`status-row.ts`, wiring in `game-view.ts`).
3. The streak counted each game minute (map row fields `solving`, `solvingText`,
   `completionText`; `bodyMinute` reports a loss; `MapRun.streak`).
4. An edit that changes the program zeroes the streak (`setProgram`), with the new invariant test
   `tests/invariants/test_streak_program_change.py`.
5. Completion and solved maps (`MapRun.completion`, the ended-run predicate, the check at the
   place of the pick, `solvedMaps`, carry dropped at completion; both invariant tests in their new
   wordings).
6. Screens of the streak, the completion and the solved map (status row, headquarters,
   `styles.css`).

Every slice: model `cheaper`, risk `none` (no file of the change is a trust boundary of the part
map; nothing cannot be undone).

## Foundation entries the plan names that the orchestrator should look at

- A part-map change follows from the plan's choice of check: the part `simulation` lists each of
  its invariant tests by name, so the new file `tests/invariants/test_streak_program_change.py`
  needs a line in its *Files*. The plan lists it as a foundation entry for Slice 4.
- The projected invariant is written in the task as `streak-program-change/1`; the foundation check
  reads a heading `identifier/V` as an older form. The plan names it `streak-program-change`; its
  final identifier is the foundation step's to set (the-way-record-invariant).
- The projected entries "(new) — How is a map solved, and what opens the next one?" and
  "(new) — How fast does the earning loop go?" are made partly true by this change, but the task
  assigns their writing to tasks 8 and 18; the plan does not list them for the foundation step and
  says so under its table.

## Finding from a probe of the current build

To learn whether existing tests change behaviour once a streak of 480 ends a map run, I ran a
throw-away script (in the session's scratchpad, not in the repository) against the build in
`dist/public/sim/` — modified 2026-10-28 18:40, while `src/` is unchanged since `6540e4c` — playing
the ACCEPTANCE program of `tests/sim/acceptance.test.mjs` minute by minute on the two seeds the
tests use. ALIVE (send at 1760000800000, 480 minutes): first minute with a loss to cold or hunger is
84, 126 minutes of loss in all, longest run without loss 83, streak 26 at minute 480. DIES_BUSY
(send at 1760000000000): dies in minute 347. Every other long test scenario dies of cold from
minute 84 or runs at most 240 minutes. So no existing scenario completes; the spec's remark that
the ALIVE scenario and `acceptance.test.mjs` "may" now end in a completion does not hold, and the
plan keeps their expectations and has completion cases start from explicit state (Slice 5's
*Goal* says so).

## Guidelines found missing or uncertain

- `guidelines/coding-simulation-module.md`, *Files of this kind*, does not list
  `src/browser/sim/body.ts` (changed by Slice 3), `character.ts`, `understanding.ts` or
  `world.ts`, though the kind's *When to read* covers every simulation module outside the data.
- `guidelines/coding-browser-module.md`, *Files of this kind*, does not list
  `src/browser/view/game-view.ts` (changed by Slice 2), `body-row.ts` or `account-screen.ts`.
- `guidelines/coding-content-data.md`, *Files of this kind*, does not list `items.ts`,
  `campfire.ts`, `revelations.ts`, `skills.ts` or `traits.ts` of `src/browser/sim/data/`; the
  files this change touches, `maps.ts` and `balance.ts`, are listed.
- None of these changes what a slice's agent reads: each slice's *Read* names the guideline files
  by their *Applies to* and kind rows, which do match.

## Order of the slices and the styleguide's example

The styleguide's *Plan of a user-interface change* goes environment and library, then values in
their source, then one screen, then its states. This change brings no font, token, role or shared
control, so its first two steps have nothing to do; each half goes simulation first and screen
second (Slices 1 then 2, Slices 3–5 then 6), and the screens reuse the shared button, the
`selected` look and the existing `positive` token.

## Reaches beyond the dispatch

- `foundations/decisions.md:795-808` D-40 — the meaning of `selected`, for the pace buttons of
  Slice 2; put into Slice 2's *Read*.
- `src/browser/view/game-view.ts` — the handoff names `app.ts`, but the status row's controls and
  the clock's `flush` are wired in `game-view.ts`; `app.ts` only builds the game view, and no slice
  changes it.
- `tests/invariants/test_simulation_inputs.py` docstring and table — to learn whether a new export
  (`setPace`, the ended-run predicate) needs a row: it does not, the check calls every untabled
  export.
- `.the-way/elements/common/foundation_check.py:15-45` — how a test cites an invariant (a comment
  line `invariant: <identifier>`), for Slice 4's new test.
- `.the-way/product-guidelines/reading.md` — to select the guideline files of each slice.
- `src/browser/styles.css` (status row, headquarters and selected-button rules) and
  `src/browser/tokens.css:20-31` — to confirm that `positive` exists and no new token is needed.
- The probe above, run on the existing build with a scratchpad script.

## Questions

None open.
