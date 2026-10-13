# Design phase B — mag-w-lesie

Skill: superpowers:brainstorming 6.4.1 (adapter rules of the cycle). Input: the orchestrator's phase-B answers (provisional go-ahead under the user's delegation, not a human approval).

## Output

Spec: `C:\Storage\repos\loop2-mag-w-lesie\.runs\task-cycles\mag-w-lesie\spec.md` (not committed; `.runs/` is ignored).

Sections: 1 outcome and success · 2 sources and assumptions A1–A3 with sources · 3 architecture, file tree, spec rule S1 (sim imports only sim; no DOM, Node, timers or system time; draws only via `random.ts`) · 4 simulation: types and game-state shape, data files with numbers and sources, public functions returning `{ state, events }`, generator (mulberry32, per-kind streams `layout`/`wander` from the seed, `mixSeed` pure hash, `INITIAL_SEED = 1`), layout draw order as a contract (row-major tiles × resource array order, then minimum guarantee from loop `resources.test.ts`, entrance fixed; a drawn entrance would come after), program evaluation, feasibility/start/duration/finish per action, minute step and time flow (pause, catch-up, edits apply at the next free minute) · 5 view: program panel, send panel, status row, terrain panel with pure `terrainPicture`, tile list, footer credits · 6 icons and the untrusted-SVG rules · 7 build and test script changes, README · 8 error handling · 9 tests: unit tests of sim and view, and the designed methods of both invariant checks (two separate Node processes for repeatability; static scan + throwing stubs with a positive control for randomness), to be written by another agent (WAY-69) · 10 part-map changes · 11 foundation entries named for the foundation step · 12 choices table (Q1–Q9 as answered, plus C1–C8 autonomous choices) · 13 out of scope.

## Self-review (fixed inline)

- Placeholders: `INITIAL_SEED` had no value → set to 1; footer text template made explicit. No TBD/TODO left.
- Consistency: `realMsCarry` bound corrected to `0 ≤ x < 1000` (scaled ms); the "1000 × 1 ms equals 1000 ms" claim restricted to integer inputs (float sums of `performance.now` deltas may differ by rounding).
- Ambiguity: tile label fixed as 0-based offset `(col, row)`; N = 0 for „Tu leży mniej niż” stated to never hold; activity choice timing fixed (C1: same minute as the finish, minute 0 at start).
- Scope: everything maps to task items 1–8 or to the orchestrator's answers; later tasks listed in § 13.

## Choices made autonomously (in the spec's table, C1–C8)

C1 activity chosen in the finishing minute (no dead minute); C2 tile-list order for neighbours and ties; C3 `setProgram` throws on an invalid program; C4 tile label `(col, row)`; C5 „—” for a resource the tile lacks; C6 inline styles; C7 six event kinds; C8 mulberry32.

## Remaining questions for the orchestrator

1. C1 — choosing the next activity in the same minute the previous one finishes. Loop's engine was not read, so loop's exact timing is unknown; this choice shifts every later timing by one minute per action against the other variant. Recommendation: keep C1.
2. The spec rule S1 check is a unit test in `tests/sim/` (written by the code's author), separate from the invariant checks; confirm that is acceptable, or move it to the randomness check's agent.
3. Failure modes of the new part `simulation` (and of `browser-view` after the change) are left to the foundation step.
