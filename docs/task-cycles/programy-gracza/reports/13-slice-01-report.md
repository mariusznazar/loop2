# Slice 1 report — programy-gracza

- **Status:** done with concerns (one file beyond the plan's *Change*, `stryker.config.json`; see Adaptations)
- **Variant:** a slice (Slice 1 — the copy of a manual map run and the player's programs in the game state)
- **Branch / base:** `task/programy-gracza`, slice base `7ed5cc0`

## Commits

- `572cc7b` feat: :sparkles: carry out a copy of the player's program in a manual map run
- `9624537` test: :test_tube: protect the copy of a manual map run and the player's programs

## Files changed (added / removed lines, `git diff --numstat 7ed5cc0 HEAD`)

| File | + | − |
|---|---|---|
| `guidelines/coding-simulation-module.md` | 1 | 0 |
| `src/browser/sim/game.ts` | 172 | 68 |
| `src/browser/sim/programs.ts` (new) | 68 | 0 |
| `src/browser/sim/types.ts` | 39 | 3 |
| `src/browser/view/game-view.ts` | 34 | 11 |
| `src/browser/view/program-editor.ts` | 14 | 6 |
| `stryker.config.json` | 1 | 0 |
| `tests/sim/copy.test.mjs` (new) | 325 | 0 |
| `tests/sim/discovery.test.mjs` | 19 | 6 |
| `tests/sim/flow.test.mjs` | 14 | 6 |
| `tests/sim/program-counts.test.mjs` | 3 | 1 |

## What was made

- `types.ts`: `ProgramId`, `SavedProgram`, `ProgramCopy` (`program`, `programId | null`, `deletedName | null`, `base`), `GameMapRun = MapRun & { copy }`. `GameState` loses `program` and gains `programs`, `nextProgramId`, `pickedPrograms`, `lastUsedPrograms` (both `Partial<Record<CharacterId, ProgramId>>`), `lastEnteredProgram`, `countsProgram`; `run` is `GameMapRun | null`. `run.ts`'s `MapRun`, `newMapRun` and the minute functions are unchanged.
- `programs.ts` (new, row of status `copy` in the guideline's table): `FIRST_PROGRAM_NAME`, `emptyProgram`, `programById`, `teamProgram` (entered with last while on the list, else the first), `rowProgram` (pick → used last → `teamProgram`, each only while on the list), `withProgramContent`.
- `game.ts`: `newGame` holds program 1 „Program” with the empty group, next number 2. `send` takes an optional `programId`; absent → `rowProgram`; a number not on the list throws; copy and base = the program's content; sets used last and entered with last, clears the character's pick; counts start at zero. `setProgram` in a map run edits the copy (checked against the run's map, counts reconciled against the copy, streak and beaten attacks zeroed where the copy differs and the run has not ended); outside a map run it edits `teamProgram`, reconciling counts only where `countsProgram` is that program. `restart` passes the copy record as it is. `end` reconciles counts against the copy's program and sets `countsProgram`, or clears both where the copy's program is gone. The first chill writes `withFirstChillRule` into the copy, its base and the copy's program while on the list. `reconcileCounts(counts, previous, next)` and `programOf(state, program, characterId)` take explicit inputs.
- View: `ProgramEditor.update(state, program, counts)`. `game-view.ts` shows the copy with its counts during a map run, otherwise `teamProgram` with counts only where `countsProgram` is its number.

## Checks

| Command | Exit |
|---|---|
| First failing case: `npm test -- tests/sim/copy.test.mjs` (only the case "an edit during a map run leaves program 1 as it was while the map run carries out the edited copy", before any code) | 1 — `AssertionError` at `copy.test.mjs:41`, `actual: undefined, expected: {groups: …}` (program 1 not held apart from the run) |
| Same command after the code (that case passing; then 11, finally 12 cases) | 0 |
| `npm run typecheck` | 0 |
| `npm test -- tests/sim/copy.test.mjs` | 0 (12 pass) |
| `npm test -- tests/sim/flow.test.mjs` | 0 (12 pass) |
| `npm test -- tests/sim/discovery.test.mjs` | 0 (31 pass) |
| `npm test -- tests/sim/program-counts.test.mjs` | 0 (11 pass) |
| `npm test -- tests/sim/streak.test.mjs` | 0 |
| `npm test -- tests/sim/team.test.mjs` | 0 |
| `npm test -- tests/invariants/test_restart_seed.py` | 0 (Ran 2, OK) |
| `npm test -- tests/invariants/test_map_run_repeatability.py` | 0 (Ran 3, OK) |
| `npm test -- tests/invariants/test_action_in_progress.py` | 0 (Ran 2, OK) |
| `npm test -- tests/invariants/test_streak_program_change.py` | 0 (Ran 4, OK) |
| `npm test -- tests/invariants/test_minute_span_split.py` | 0 (Ran 9, OK) |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 (Ran 5, OK) |
| `npm test -- tests/quality/test_quality_invariants.py` (pinned tools first on PATH) | 0 (Ran 5, OK) |
| `npm test -- tests/quality/test_mutation_test_selection.py` (beyond the *Checks*, for the new test file) | 0 (Ran 1, OK) |
| `npx eslint --max-warnings 0` and Prettier `--check` on `tests/sim/copy.test.mjs` after its last case was appended (the quality run preceded that case) | 0 / 0 |

The flow, discovery and program-counts failures seen first after the code (4, 3 and 1 failing cases) were the expectations reading `state.program`; each changed expectation names its To do of the task "programy-gracza" in a comment. Three discovery cases (`later.state.program` vs `first.program`, `result.state.program` vs `state.program`, `stepMinute(…, dead.program)`) passed vacuously on `undefined` after the code; they were changed too, to read the copy and the programs.

Not run: the gate `npm test` with no arguments (the handoff and the method leave it to the cycle); the Stryker run (the reviewer's, `guidelines/testing.md`); no invariant test was written or changed, so no invariant test had to be seen failing.

Test files outside the *Checks* seen red, informationally, by `node --test <file>` on the build of this slice (not via `npm test`): `tests/sim/campfire.test.mjs` (1 failing), `conditions.test.mjs` (5), `data.test.mjs` (3), `encounters.test.mjs` (3), `gather.test.mjs` (1), `program.test.mjs` (5), `purity.test.mjs` (1), `repertoire.test.mjs` (3), `tests/view/program-editor.test.mjs` (11). All other `tests/sim/*.test.mjs` and `tests/view/*.test.mjs` passed that way. The Python invariant tests outside the *Checks* were not run.

## Own-work check (section 3)

- **Requirement most likely missed:** "The simulation carries out the copy reduced to the character's repertoire, as `programOf` reduces the one program today" — the copy is a new path into `programOf`, and no check of the slice drove a copy holding a rule outside the repertoire.
- **Check:** case "a copy rule outside the character's repertoire is passed over and stays in the copy" in `tests/sim/copy.test.mjs`: a new game (no action known) with program 1 „Zawsze → Eksploruj”, sent; the character waits at minute 0 and the copy still holds the rule.
- **Result:** passes (`npm test -- tests/sim/copy.test.mjs`, exit 0). Mutation in the head: carrying out `copy.program` unreduced makes the character explore at minute 0, which the case catches.
- Mutations considered and caught by `copy.test.mjs`: chill written into program 1 rather than the copy's program (case with program 3); chill missing the base; `end` reconciling against the copy instead of the program; counts not cleared for a gone program; pick not cleared at send; a wrong order in `rowProgram` (nine variants); `setProgram` outside a run editing the first program instead of the entered-with-last one; `restart` taking a fresh copy.

## UI check (`ui_check.md`; D-75, D-88)

Route: `LOOP2_LISTEN_PORT=34517 npm run dev` started in the worktree (build, then `node dist/server/main.js`, ready line `Loop: http://127.0.0.1:34517`, log `.runs/task-cycles/programy-gracza/reports/13-slice-01-dev-server.log`). Without account configuration the server answers `/api/account` 503; Playwright MCP intercepted only `**/api/account` with 200 JSON `{id:"qa-local-programs1",email:"slice1@example.invalid"}` and header `x-qa-slice: programy-1`, which a fetch from the page read back. No product module was replaced; no real account, no server write. Viewport 1600×1000. Console after the session (`all: true`, level warning): 0 errors, 0 warnings. The server process (PID 22708, the listener on 34517) was stopped after the session; no other process was touched.

Journey and states inspected (screenshots, each viewed):

1. Character „Ala” created, sent to Las at pace 16×; first chill at minute 84 writes „Zawsze → Eksploruj” into the panel with „1×” — `14-slice-01-01-chill-copy.png`.
2. During the map run (in the discovery pause) the rule's action changed to „Wędruj”, resumed: at minute 104 the status row reads „Wędruje” and the rule shows „1×” — the edit acts in the map run — `14-slice-01-02-edit-acts.png`.
3. „Restart”: the new map run wanders from its start and the panel still shows „Zawsze → Wędruj” (counts started anew) — the edit survives „Restart” — `14-slice-01-03-after-restart.png` (paused at minute 85, „18×”).
4. „Zakończ”: the headquarters shows; the panel shows program 1 as „Zawsze → Eksploruj”, without the edit, with „0×” beside the edited rule — `14-slice-01-04-after-end.png`.
5. „Wyślij” again: the new map run explores („Eksploruje”), the panel shows „Zawsze → Eksploruj” with „1×” — `14-slice-01-05-send-again.png`.

All screenshots are in `.runs/task-cycles/programy-gracza/reports/` (taken under the Playwright workspace root `C:/Storage/repos/loop2/.scratch/` and moved here; the main checkout left clean).

States left unchecked: after „Zakończ”, a rule of program 1 keeping a non-zero count beside it — program 1 held one rule, the edited one, so only the „0×” branch was on screen (the other branch is covered by the copy test "Zakończ keeps a count …"); the screens after death and after a completion; real keyboard focus after the edit. The styleguide's states of shared controls are not affected: no control, class, role or token changed.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` and `ui_check.md` — named by the method for this variant and for a screen change.
- `src/browser/sim/understanding.ts` (`editorRepertoire`, `withFirstChillRule`), `src/browser/sim/run.ts` whole, `tests/sim/streak.test.mjs`, `tests/invariants/program_fixture.py` and the grep of `tests/invariants/*.py` for `program` — to see which checks read `state.program` and that the run functions spread the run, so the `copy` field survives them.
- `tests/quality/test_mutation_test_selection.py` and `stryker.config.json` — a new `tests/sim/*.test.mjs` must be listed there.
- `src/server/main.ts`, `src/server/configuration.ts` (environment names only), `src/browser/sim/data/balance.ts` (pace and minutes per second), `src/browser/view/headquarters.ts` and `status-row.ts` (button texts) — for the browser check.
- The archived cycle `docs/task-cycles/walka-w-glebi-lasu/` at `1933a3f` (by `git grep`) — for "an intercepted session as in the earlier cycle".
- The user's skill `playwright-mcp` and its references (grounding, session setup, route mocking, reading the page, false positives, timing, selectors) — before driving the browser.

## Choices, with the way rejected and its cost if wrong

- **The copy record:** `programId: ProgramId | null` plus `deletedName: string | null`, rather than a union `{ id } | { deletedName }`. Cost if wrong: a type change touching `send`, `end`, the chill write and later the delete operation.
- **The records of decision 4** as `Partial<Record<CharacterId, ProgramId>>` objects, rather than arrays of pairs or `Map`s (a `Map` would not survive `structuredClone`/JSON equality in tests and saves). Cost: none foreseen.
- **Cleared counts** are `ruleCounts: null` with `countsProgram: null`, the same as before the first run (the panel shows no counts). Cost if a later slice needs to tell "cleared" from "never": one field.
- **`countsProgram` is null during a map run** and set only at „Zakończ”. The game view shows counts outside a run only where `countsProgram` is the shown program's number.
- **`setProgram` outside a run reconciles counts only where they stand beside the edited program.** Before this slice it reconciled whenever counts existed; with one program the effect is the same.
- **`teamProgram` and `rowProgram` live in `programs.ts`; `sameData` and the program check stay in `game.ts`.** The comparisons of spec decision 3 (unsaved changes, changes the copy lacks) belong to later slices and were not added.
- **The first failing case's assertions used optional chaining** (`state.programs?.[0]?.program`) so that, on the unchanged code, the case stopped at its assertion rather than on a `TypeError`; the chaining was removed once the shape existed.

## Adaptations of section 4 (plan vs code)

- Small: adding `tests/sim/copy.test.mjs` requires listing it in `stryker.config.json`, which `tests/quality/test_mutation_test_selection.py` enforces; the plan's *Change* does not list that file. One line added there; the orchestrator may want the plan's *Change* to name it.
- Small: `requireRun` in `game.ts` now returns `GameMapRun`; `advanceMinutes` keeps the copy in a local variable and re-attaches it to the run at the end of the span, since the minute functions return `run.ts`'s `MapRun`.

## Problems observed

- `Get-NetTCPConnection -LocalPort 34517 -State Listen` reported no listener while `netstat -ano` showed PID 22708 listening on `127.0.0.1:34517` — the same symptom as the known baseline failure of `tests/invariants/test_loop2_one_serving_process.py`. Cause not verified.
- The background job running `npm run dev` ended with exit code 127 after the server process was stopped by its PID; that exit code comes from stopping the process, not from a failure while serving (the log shows the ready line and no error).
