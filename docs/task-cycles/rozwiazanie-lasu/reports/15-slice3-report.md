# Slice 3 report — the streak counted in each game minute

**Status:** done

## Files and commits
- src/browser/sim/data/maps.ts (+19): `SolvingDef`, `solving` / `solvingText` / `completionText` on `MapDef` and Las.
- src/browser/sim/body.ts (+6/-3): `bodyMinute` also returns `lostHealth` (chilled or starving after the step).
- src/browser/sim/types.ts (+5): `MapRun.streak`.
- src/browser/sim/run.ts (+18/-3): `streak: 0` in `newMapRun` (send and restart both go through it); `streakAfter`; set in all three return paths of `minuteBeforePick` (death, mid-activity, activity end).
- tests/sim/streak.test.mjs (new), tests/sim/body.test.mjs (+16), tests/sim/data.test.mjs (+19).
- Commit: see the branch head (one commit, `feat: :sparkles: count the streak in each game minute`).

## Checks (command, exit code)
- Failing run first: `npm test -- tests/sim/streak.test.mjs` exit 1 (streak stayed 0 / 7 / 41 / 479 / 5, assertion failures, not missing module; field and `streak: 0` existed as stub).
- `npm test -- tests/sim/streak.test.mjs` 0; `tests/sim/body.test.mjs` 0; `tests/sim/data.test.mjs` 0; `tests/sim/acceptance.test.mjs` 0; `tests/sim/purity.test.mjs` 0.
- `tests/invariants/test_minute_span_split.py` 0; `test_map_run_repeatability.py` 0; `test_simulation_inputs.py` 0; `test_content_identifiers.py` 0.
- Also: prettier --check and eslint --max-warnings 0 on the changed files, exit 0.
- Not run: the full gate (`npm test` without a file), per the handoff.

## Own-work check
Requirement most likely missed: a map run ended in death holds streak 0 and the loss is read from the body step's report, not from a health comparison. Test "a map run ended in death holds a streak of 0" (start streak 5, dies in minute 2, holds 0), and "wounded but neither chilled nor starving" in body.test.mjs shows the report is independent of health. Both pass. Also split-call equality (100 single-minute calls equal one 100-minute call).

## Choices
- Report field named `lostHealth` (boolean) on `bodyMinute`'s result. Rejected: comparing health before/after (spec forbids). Cost if wrong: one rename.
- `SolvingDef` typed as `{ streak: number }` (required in this slice; task 8 makes it optional per spec).
- `stepMinute` needs no change (it uses `minuteBeforePick`).

## Reach beyond the dispatch
None. Plan/code mismatches: none. The handoff's Checks name no full-gate run; no mismatch.
