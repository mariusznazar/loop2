# Slice 2 handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`. Slice base, written in the record before this dispatch: `9624537` (Slice 1's head). Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. Your method: read `.the-way/task-cycle/change/SKILL.md` whole (entry point `.claude/skills/the-way-make-change/SKILL.md`); your variant, in the words of its row: **"a slice, or the retry of a slice"**. Read a file the method names only when the step or variant naming it comes. Stage: this slice only — make its *Change*, run its *Checks*, commit by path (`git add <path>`, English messages like the repository's, e.g. `test: :test_tube: …`), and return; do not start Slice 3. Do not run the gate (`npm test` with no arguments). Questions go to the orchestrator in your report, never to the human. Do not read `cycle.md`. Change no product file and no foundation file; a product fault the migration shows goes back in your report.

Two questions at start: trust boundary — no; irreversible operation — no.

Quality tools: before `tests/quality/...` checks, put the pinned tools first on PATH: `export PATH="$PWD/.runs/quality-venv/Scripts:$PATH"` (Git Bash).

Report at `.runs/task-cycles/programy-gracza/reports/16-slice-02-report.md`: each check with its command and exit code, each changed expectation with its To do, every reach beyond your *Read*. Return status, commits, a one-line check result naming what failed or did not run, and the report path.

## What Slice 1 built (its report `reports/13-slice-01-report.md`, lines 30–33, quoted)

- `types.ts`: `ProgramId`, `SavedProgram`, `ProgramCopy` (`program`, `programId | null`, `deletedName | null`, `base`), `GameMapRun = MapRun & { copy }`. `GameState` loses `program` and gains `programs`, `nextProgramId`, `pickedPrograms`, `lastUsedPrograms` (both `Partial<Record<CharacterId, ProgramId>>`), `lastEnteredProgram`, `countsProgram`; `run` is `GameMapRun | null`. `run.ts`'s `MapRun`, `newMapRun` and the minute functions are unchanged.
- `programs.ts` (new, row of status `copy` in the guideline's table): `FIRST_PROGRAM_NAME`, `emptyProgram`, `programById`, `teamProgram` (entered with last while on the list, else the first), `rowProgram` (pick → used last → `teamProgram`, each only while on the list), `withProgramContent`.
- `game.ts`: `newGame` holds program 1 „Program” with the empty group, next number 2. `send` takes an optional `programId`; absent → `rowProgram`; a number not on the list throws; copy and base = the program's content; sets used last and entered with last, clears the character's pick; counts start at zero. `setProgram` in a map run edits the copy (checked against the run's map, counts reconciled against the copy, streak and beaten attacks zeroed where the copy differs and the run has not ended); outside a map run it edits `teamProgram`, reconciling counts only where `countsProgram` is that program. `restart` passes the copy record as it is. `end` reconciles counts against the copy's program and sets `countsProgram`, or clears both where the copy's program is gone. The first chill writes `withFirstChillRule` into the copy, its base and the copy's program while on the list. `reconcileCounts(counts, previous, next)` and `programOf(state, program, characterId)` take explicit inputs.
- View: `ProgramEditor.update(state, program, counts)`. `game-view.ts` shows the copy with its counts during a map run, otherwise `teamProgram` with counts only where `countsProgram` is its number.

Slice 1 saw these files red after its change (`node --test` on its build): `tests/sim/campfire.test.mjs` (1 failing), `conditions.test.mjs` (5), `data.test.mjs` (3), `encounters.test.mjs` (3), `gather.test.mjs` (1), `program.test.mjs` (5), `purity.test.mjs` (1), `repertoire.test.mjs` (3), `tests/view/program-editor.test.mjs` (11). In Slice 1 three discovery cases passed vacuously on `undefined` after the change; look for the same in your files — an expectation comparing two `state.program` reads that are both `undefined` now passes without checking anything, and must read the copy or the program list.

## The slice's section of the plan, copied word for word from `.runs/task-cycles/programy-gracza/plan.md` (heading „Slice 2 — the JavaScript tests read the program list and the copy”)

### Slice 2 — the JavaScript tests read the program list and the copy

- **Goal:** The JavaScript tests that read the game state's one program or call the editor's
  `update` with a game state alone pass again against Slice 1: where a test reads `state.program`,
  it reads the copy of the game state's map run during a map run, or the program of the list by
  its number outside one; where it calls the program editor's `update`, it passes the program to
  show and its counts. Each changed expectation keeps the strength of its check and names its reason
  in the task's To do 1, 6 or 7, as `guidelines/testing.md`, “Changing an existing test”, asks. No
  test is deleted, skipped or weakened. The slice changes no product file; a product fault the
  migration shows goes back to the orchestrator in the report.
- **Change:** `tests/sim/campfire.test.mjs` · `tests/sim/conditions.test.mjs` · `tests/sim/data.test.mjs` ·
  `tests/sim/encounters.test.mjs` · `tests/sim/gather.test.mjs` · `tests/sim/program.test.mjs` ·
  `tests/sim/purity.test.mjs` · `tests/sim/repertoire.test.mjs` · `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:14-27` To do ·
  `.runs/task-cycles/programy-gracza/spec.md:84-110` 3. The copy belongs to the map run ·
  `.runs/task-cycles/programy-gracza/spec.md:124-146` 5. Operations of the simulation ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F13 · F17 · F18 ·
  `foundations/glossary.md:18-30` map run · program ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/view/program-editor.ts` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/campfire.test.mjs` · `npm test -- tests/sim/conditions.test.mjs` ·
  `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/encounters.test.mjs` ·
  `npm test -- tests/sim/gather.test.mjs` · `npm test -- tests/sim/program.test.mjs` ·
  `npm test -- tests/sim/purity.test.mjs` · `npm test -- tests/sim/repertoire.test.mjs` ·
  `npm test -- tests/view/program-editor.test.mjs` · `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1


## Current ranges of the *Read* (worktree at `9624537`; where they differ from the plan's, these hold)

- Frozen task and spec: the plan's ranges hold (`task.md:14-27`; `spec.md:84-110`, `:124-146`).
- Plan's *Choices*: `.runs/task-cycles/programy-gracza/plan.md:581-593` (heading „Choices”).
- F13 → glossary `copy` `foundations/glossary.md:175-179`; F17 → D-153 `foundations/decisions.md:2756-2770`; F18 → D-152 `:2741-2755`. Glossary `map run` · `program` `foundations/glossary.md:18-30`.
- Code: `src/browser/sim/types.ts`, `src/browser/sim/game.ts`, `src/browser/sim/programs.ts` (new, beyond the plan's *Read*, needed for `programById`), `src/browser/view/program-editor.ts` — whole, as Slice 1 left them. Guidelines whole as the plan names.
