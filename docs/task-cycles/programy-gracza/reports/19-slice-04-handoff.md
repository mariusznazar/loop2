# Slice 4 handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`. Slice base, written in the record before this dispatch: `a303ad5` (Slice 3's head). Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. Your method: read `.the-way/task-cycle/change/SKILL.md` whole (entry point `.claude/skills/the-way-make-change/SKILL.md`); your variant, in the words of its row: **"a slice, or the retry of a slice"**. Read a file the method names only when the step or variant naming it comes. Stage: this slice only — make its *Change*, run its *Checks*, commit by path (`git add <path>`, English messages like the repository's: `feat: :sparkles: …`, `test: :test_tube: …`, `docs: :memo: …`), and return; do not start Slice 5. Do not run the gate (`npm test` with no arguments). Questions go to the orchestrator in your report, never to the human. Do not read `cycle.md`. Of the foundation, change only the part map, and only through the project skill `the-way-update-part-map` (`.claude/skills/the-way-update-part-map/SKILL.md`, read it whole when you come to that line), in the same commit as the check file it names.

Two questions at start: trust boundary — no; irreversible operation — no.

Quality tools: before `tests/quality/...` checks, put the pinned tools first on PATH: `export PATH="$PWD/.runs/quality-venv/Scripts:$PATH"` (Git Bash).

The orchestrator added `stryker.config.json` to your *Change*: `tests/quality/test_mutation_test_selection.py` requires every `tests/sim/*.test.mjs` to be listed there, as Slice 1 found for `tests/sim/copy.test.mjs`. Run `npm test -- tests/quality/test_mutation_test_selection.py` too.

Report at `.runs/task-cycles/programy-gracza/reports/20-slice-04-report.md`: each check with its command and exit code, the first failing case and its passing run, the new invariant check seen failing (with its control) and passing, every reach beyond your *Read*. Return status, commits, a one-line check result naming what failed or did not run, and the report path.

## What earlier slices built

Slice 1 (its report `reports/13-slice-01-report.md`, lines 30–33, quoted):

- `types.ts`: `ProgramId`, `SavedProgram`, `ProgramCopy` (`program`, `programId | null`, `deletedName | null`, `base`), `GameMapRun = MapRun & { copy }`. `GameState` loses `program` and gains `programs`, `nextProgramId`, `pickedPrograms`, `lastUsedPrograms` (both `Partial<Record<CharacterId, ProgramId>>`), `lastEnteredProgram`, `countsProgram`; `run` is `GameMapRun | null`. `run.ts`'s `MapRun`, `newMapRun` and the minute functions are unchanged.
- `programs.ts` (new, row of status `copy` in the guideline's table): `FIRST_PROGRAM_NAME`, `emptyProgram`, `programById`, `teamProgram` (entered with last while on the list, else the first), `rowProgram` (pick → used last → `teamProgram`, each only while on the list), `withProgramContent`.
- `game.ts`: `newGame` holds program 1 „Program” with the empty group, next number 2. `send` takes an optional `programId`; absent → `rowProgram`; a number not on the list throws; copy and base = the program's content; sets used last and entered with last, clears the character's pick; counts start at zero. `setProgram` in a map run edits the copy (checked against the run's map, counts reconciled against the copy, streak and beaten attacks zeroed where the copy differs and the run has not ended); outside a map run it edits `teamProgram`, reconciling counts only where `countsProgram` is that program. `restart` passes the copy record as it is. `end` reconciles counts against the copy's program and sets `countsProgram`, or clears both where the copy's program is gone. The first chill writes `withFirstChillRule` into the copy, its base and the copy's program while on the list. `reconcileCounts(counts, previous, next)` and `programOf(state, program, characterId)` take explicit inputs.
- View: `ProgramEditor.update(state, program, counts)`. `game-view.ts` shows the copy with its counts during a map run, otherwise `teamProgram` with counts only where `countsProgram` is its number.

Slices 2 and 3 migrated the tests that read the one program (`c5f4058`, `a303ad5`); `tests/invariants/program_fixture.py` now has helpers for the copy and the list — read it before writing `test_saved_program_edit.py`.

## The slice's section of the plan, copied word for word from `.runs/task-cycles/programy-gracza/plan.md` (heading „Slice 4 — the operations on the player's program list”)

### Slice 4 — the operations on the player's program list

- **Goal:** The simulation's module of the player's programs, which Slice 1 adds as
  `src/browser/sim/programs.ts`, gains the operations on the list, each a function that takes the
  game state, returns a `GameResult`, changes nothing passed to it and throws on a call the game
  does not allow, outside a map run and during one alike (spec decision 5, list operations):
  - the name a program takes from typed text, as `characterName` does for a character: trimmed,
    and refused, with which of the two reasons, when empty after trimming or when another program's
    name equals it regardless of letter case — a program's own name in another letter case does not
    block its rename — with no length limit (To do 4);
  - the suggested name „Program n”, for the smallest n from 2 that no program's name takes, letter
    case ignored;
  - create a program: the suggested name, the next number, one empty rule group „Program” under
    „Zawsze”, at the end of the list; the caller finds its number through the state;
  - rename a program, by number, keeping its place;
  - delete a program, by number, refused while the list holds one program. Where the map run's copy
    belongs to it, the copy's number becomes none and the copy keeps the name the program had.
    Where the counts stand beside it after „Zakończ”, they are cleared. Records of spec decision 4
    that name it simply find no program from then on (To do 3);
  - edit a saved program, by number, checked against the resources of every map, as a program
    outside a map run is checked today. Where the counts stand beside it after „Zakończ”, they are
    reconciled with the new content. It never changes a map run, its copy, its streak, its beaten
    attacks or its counts (To do 9; F9);
  - pick the program of a headquarters row: a character number and a program number on the list,
    kept until that character is sent.
  The row's program of Slice 1 is tested here through each fallback of spec decision 4: the pick,
  the program used last, the game-wide program entered with last, the first program of the list,
  each passed over once its program is deleted, and a pick kept through the creation of another
  character and cleared by the send (To do 5). „Zakończ” after the deletion of the copy's program
  clears the counts. The check of F9 is written with its control — an edit of the copy in the same
  scenario sets the streak to zero — so it can fail, and the edit of the program the copy came
  from is among its cases. Its file is added by name to the *Files* of the part `simulation`
  through `the-way-update-part-map`, in the same commit.
- **Change:** `src/browser/sim/programs.ts` · `src/browser/sim/game.ts` · `src/browser/sim/types.ts` ·
  `tests/sim/program-list.test.mjs` · `stryker.config.json` ·
  `tests/invariants/test_saved_program_edit.py` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:16-24` To do, items 1–9 ·
  `.runs/task-cycles/programy-gracza/task.md:160-181` Settlements to record ·
  `.runs/task-cycles/programy-gracza/spec.md:52-82` 1. A program is told apart by a number given when it is created, 2. The player's program list ·
  `.runs/task-cycles/programy-gracza/spec.md:112-134` 4. The game's records of which program a character goes with, 5. Operations of the simulation, list operations ·
  `.runs/task-cycles/programy-gracza/spec.md:148-155` 6. Firing counts follow the copy ·
  `.runs/task-cycles/programy-gracza/spec.md:231-231` Foundation entries, the part-map change ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F2 · F3 · F4 · F5 · F9 · F13 · F17 · F18 · F21 · F25 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:998-1020` D-52 ·
  `foundations/decisions.md:1044-1061` D-54 · `foundations/decisions.md:1083-1108` D-56 ·
  `foundations/decisions.md:1592-1608` D-91 · `foundations/decisions.md:1632-1666` D-93 ·
  `foundations/decisions.md:2338-2363` D-131 ·
  `foundations/invariants.md:214-234` simulation-isolation · simulation-inputs ·
  `foundations/invariants.md:828-836` streak-program-change ·
  `foundations/part_map.md:28-56` simulation ·
  `foundations/glossary.md:18-30` map run · program · `foundations/glossary.md:87-92` headquarters ·
  `foundations/glossary.md:150-155` streak ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `tests/invariants/test_streak_program_change.py` ·
  `tests/invariants/program_fixture.py` · `tests/sim/program-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a failing case in `tests/sim/program-list.test.mjs`: a second created program is
  named „Program 2” and takes the number 2. Then `npm run typecheck` ·
  `npm test -- tests/sim/program-list.test.mjs` · `npm test -- tests/invariants/test_saved_program_edit.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Slice 3 · F2 · F3 · F4 · F5 · F9 · F17 · F21


## Current ranges of the *Read* (worktree at `a303ad5`; where they differ from the plan's, these hold)

- Frozen task and spec: the plan's ranges hold.
- Plan's *Choices*: `.runs/task-cycles/programy-gracza/plan.md:581-593`.
- Foundation entries the foundation step wrote, for the plan's F-names: F2 → D-155 `foundations/decisions.md:2786-2800`; F3 → D-156 `:2801-2815`; F4 → D-157 `:2816-2830`; F5 → D-158 `:2831-2845`; F9 → invariant `saved-program-edit` `foundations/invariants.md:838-847` (check file `tests/invariants/test_saved_program_edit.py`); F13 → glossary `copy` `foundations/glossary.md:175-179`; F17 → D-153 `:2756-2770`; F18 → D-152 `:2741-2755`; F21 → D-131 `:2360-2393`; F25 → the part map's `simulation` *Files* `foundations/part_map.md:28-56`.
- Other decisions: D-04 `:57-93`; D-52 `:998-1021`; D-54 `:1044-1062`; D-56 `:1083-1109`; D-91 `:1592-1609`; D-93 `:1632-1679`; D-131 `:2360-2393`.
- Invariants: simulation-isolation · simulation-inputs `foundations/invariants.md:214-235`; streak-program-change `:828-837`.
- Glossary: `foundations/glossary.md:18-30` map run · program; `:87-93` headquarters; `:150-156` streak.
- Code: `src/browser/sim/programs.ts`, `game.ts`, `types.ts` whole as Slice 1 left them; `tests/invariants/test_streak_program_change.py`, `tests/invariants/program_fixture.py`, `tests/sim/program-fixture.mjs`; `stryker.config.json`. Guidelines whole as the plan names.
