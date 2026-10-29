# Slice 3 handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`. Slice base, written in the record before this dispatch: `c5f4058` (Slice 2's head). Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. Your method: read `.the-way/task-cycle/change/SKILL.md` whole (entry point `.claude/skills/the-way-make-change/SKILL.md`); your variant, in the words of its row: **"a slice, or the retry of a slice"**. Read a file the method names only when the step or variant naming it comes. Stage: this slice only — make its *Change*, run its *Checks*, commit by path (`git add <path>`, English messages like the repository's, e.g. `test: :test_tube: …`), and return; do not start Slice 4. Do not run the gate (`npm test` with no arguments). Questions go to the orchestrator in your report, never to the human. Do not read `cycle.md`. Change no product file and no foundation file; a product fault the migration shows goes back in your report.

Two questions at start: trust boundary — no; irreversible operation — no.

Quality tools: before `tests/quality/...` checks (Ruff for Python), put the pinned tools first on PATH: `export PATH="$PWD/.runs/quality-venv/Scripts:$PATH"` (Git Bash).

Report at `.runs/task-cycles/programy-gracza/reports/18-slice-03-report.md`: each check with its command and exit code, the state of each check before and after your change, each changed expectation with its To do, and every reach beyond your *Read*. Where an invariant check's control (a made-up violation that must make the check fail) exists, show it still fails. Return status, commits, a one-line check result naming what failed or did not run, and the report path.

## What Slice 1 built (its report `reports/13-slice-01-report.md`, lines 30–33, quoted)

- `types.ts`: `ProgramId`, `SavedProgram`, `ProgramCopy` (`program`, `programId | null`, `deletedName | null`, `base`), `GameMapRun = MapRun & { copy }`. `GameState` loses `program` and gains `programs`, `nextProgramId`, `pickedPrograms`, `lastUsedPrograms` (both `Partial<Record<CharacterId, ProgramId>>`), `lastEnteredProgram`, `countsProgram`; `run` is `GameMapRun | null`. `run.ts`'s `MapRun`, `newMapRun` and the minute functions are unchanged.
- `programs.ts` (new, row of status `copy` in the guideline's table): `FIRST_PROGRAM_NAME`, `emptyProgram`, `programById`, `teamProgram` (entered with last while on the list, else the first), `rowProgram` (pick → used last → `teamProgram`, each only while on the list), `withProgramContent`.
- `game.ts`: `newGame` holds program 1 „Program” with the empty group, next number 2. `send` takes an optional `programId`; absent → `rowProgram`; a number not on the list throws; copy and base = the program's content; sets used last and entered with last, clears the character's pick; counts start at zero. `setProgram` in a map run edits the copy (checked against the run's map, counts reconciled against the copy, streak and beaten attacks zeroed where the copy differs and the run has not ended); outside a map run it edits `teamProgram`, reconciling counts only where `countsProgram` is that program. `restart` passes the copy record as it is. `end` reconciles counts against the copy's program and sets `countsProgram`, or clears both where the copy's program is gone. The first chill writes `withFirstChillRule` into the copy, its base and the copy's program while on the list. `reconcileCounts(counts, previous, next)` and `programOf(state, program, characterId)` take explicit inputs.
- View: `ProgramEditor.update(state, program, counts)`. `game-view.ts` shows the copy with its counts during a map run, otherwise `teamProgram` with counts only where `countsProgram` is its number.

Beware expectations that now pass vacuously: a read of `state.program` that is `undefined` on both sides compares equal without checking anything; such a read must move to the copy (`state.run.copy.program`) or the list (`state.programs`).

## The slice's section of the plan, copied word for word from `.runs/task-cycles/programy-gracza/plan.md` (heading „Slice 3 — the invariant checks read the program list and the copy”)

### Slice 3 — the invariant checks read the program list and the copy

- **Goal:** The Python invariant checks whose Node drivers read the game state's one program pass
  again against Slice 1. A driver that records `state.program` records the copy of the map run
  during a map run, or the program of the list by number outside one, so each check still reads
  the program its invariant names: for `program-closed-lists` the program the simulation accepted,
  for `program-rule-pick` the program the map run carries out, which keeps every rule it passes
  over, for `program-world-reference` every program the simulation holds — the list's programs
  and the copy. The made-up control of `test_simulation_inputs.py` that pushes onto a program's
  rules pushes onto a program of the new shape, so the control still fails as it should. Each
  check's docstring, its reading of the sentence included, says what it now reads. Each changed
  expectation names its reason in the task's To do 1 or 6; no check is weakened. The slice changes
  no product file.
- **Change:** `tests/invariants/test_program_closed_lists.py` · `tests/invariants/test_program_rule_pick.py` ·
  `tests/invariants/test_program_world_reference.py` · `tests/invariants/test_simulation_inputs.py` ·
  `tests/invariants/program_fixture.py`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:14-27` To do ·
  `.runs/task-cycles/programy-gracza/spec.md:84-110` 3. The copy belongs to the map run ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F13 · F17 · F18 ·
  `foundations/invariants.md:214-262` simulation-isolation · simulation-inputs · program-rule-pick ·
  `foundations/invariants.md:364-373` program-closed-lists · `foundations/invariants.md:386-395` program-world-reference ·
  `foundations/glossary.md:18-30` map run · program ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` ·
  `tests/invariants/loop2_invariant_support.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_program_closed_lists.py` ·
  `npm test -- tests/invariants/test_program_rule_pick.py` ·
  `npm test -- tests/invariants/test_program_world_reference.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1


## Current ranges of the *Read* (worktree at `c5f4058`; where they differ from the plan's, these hold)

- Frozen task and spec: the plan's ranges hold (`task.md:14-27`; `spec.md:84-110`).
- Plan's *Choices*: `.runs/task-cycles/programy-gracza/plan.md:581-593`.
- F13 → glossary `copy` `foundations/glossary.md:175-179`; F17 → D-153 `foundations/decisions.md:2756-2770`; F18 → D-152 `:2741-2755`.
- Invariants: simulation-isolation · simulation-inputs `foundations/invariants.md:214-235`; program-rule-pick `:248-263`; program-closed-lists `:364-374`; program-world-reference `:386-396`. Glossary `foundations/glossary.md:18-30`.
- Code: `src/browser/sim/types.ts`, `src/browser/sim/game.ts`, `src/browser/sim/programs.ts` (new in Slice 1, beyond the plan's *Read*), `tests/invariants/loop2_invariant_support.py`, and the files of your *Change*. Guidelines whole as the plan names.
