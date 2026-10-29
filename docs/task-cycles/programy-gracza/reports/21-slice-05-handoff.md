# Slice 5 handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`. Slice base, written in the record before this dispatch: `bf7e827` (Slice 4's head). Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. Your method: read `.the-way/task-cycle/change/SKILL.md` whole (entry point `.claude/skills/the-way-make-change/SKILL.md`); your variant, in the words of its row: **"a slice, or the retry of a slice"**. Read a file the method names only when the step or variant naming it comes. Stage: this slice only — make its *Change*, run its *Checks*, commit by path (`git add <path>`, English messages like the repository's: `feat: :sparkles: …`, `test: :test_tube: …`, `refactor: :recycle: …`), and return; do not start Slice 6. Do not run the gate (`npm test` with no arguments). Questions go to the orchestrator in your report, never to the human. Do not read `cycle.md`. Of the foundation, change only the part map, and only through the project skill `the-way-update-part-map` (`.claude/skills/the-way-update-part-map/SKILL.md`, read it whole when you come to that line), in the same commit as the check file it names.

Two questions at start: trust boundary — no; irreversible operation — no.

Quality tools: before `tests/quality/...` checks, put the pinned tools first on PATH: `export PATH="$PWD/.runs/quality-venv/Scripts:$PATH"` (Git Bash).

The orchestrator added `stryker.config.json` to your *Change*: `tests/quality/test_mutation_test_selection.py` requires every `tests/sim/*.test.mjs` to be listed there. Run `npm test -- tests/quality/test_mutation_test_selection.py` too.

**An orchestrator's ruling before you start (autonomous choice C14):** Slice 4 left an import cycle — `src/browser/sim/programs.ts` imports `checkProgram` and `reconcileCounts` from `game.ts`, and `game.ts` imports from `programs.ts`. As your first commit, a refactor with no change of behaviour, move `checkProgram`, `reconcileCounts` and the comparison `sameData` (which your two measures need) from `game.ts` into `programs.ts`, so that `programs.ts` imports nothing from `game.ts` (a type-only import of `GameResult` may stay, or move the type to `types.ts`) and `game.ts` imports them from `programs.ts`. Keep their behaviour; update the imports of any test that imported them from `game.ts` only if one does (name it in your report; it is then a file beyond your *Change*). Run `npm run typecheck` and the tests of `tests/sim/copy.test.mjs`, `program-list.test.mjs`, `program-counts.test.mjs` after that commit.

Report at `.runs/task-cycles/programy-gracza/reports/22-slice-05-report.md`: each check with its command and exit code, the first failing case and its passing run, the new invariant check and the changed `streak-program-change` check each seen failing (with its control) and passing, every reach beyond your *Read*. Return status, commits, a one-line check result naming what failed or did not run, and the report path.

## What earlier slices built

Slice 1 (its report `reports/13-slice-01-report.md`, lines 30–33, quoted):

- `types.ts`: `ProgramId`, `SavedProgram`, `ProgramCopy` (`program`, `programId | null`, `deletedName | null`, `base`), `GameMapRun = MapRun & { copy }`. `GameState` loses `program` and gains `programs`, `nextProgramId`, `pickedPrograms`, `lastUsedPrograms` (both `Partial<Record<CharacterId, ProgramId>>`), `lastEnteredProgram`, `countsProgram`; `run` is `GameMapRun | null`. `run.ts`'s `MapRun`, `newMapRun` and the minute functions are unchanged.
- `programs.ts` (new, row of status `copy` in the guideline's table): `FIRST_PROGRAM_NAME`, `emptyProgram`, `programById`, `teamProgram` (entered with last while on the list, else the first), `rowProgram` (pick → used last → `teamProgram`, each only while on the list), `withProgramContent`.
- `game.ts`: `newGame` holds program 1 „Program” with the empty group, next number 2. `send` takes an optional `programId`; absent → `rowProgram`; a number not on the list throws; copy and base = the program's content; sets used last and entered with last, clears the character's pick; counts start at zero. `setProgram` in a map run edits the copy (checked against the run's map, counts reconciled against the copy, streak and beaten attacks zeroed where the copy differs and the run has not ended); outside a map run it edits `teamProgram`, reconciling counts only where `countsProgram` is that program. `restart` passes the copy record as it is. `end` reconciles counts against the copy's program and sets `countsProgram`, or clears both where the copy's program is gone. The first chill writes `withFirstChillRule` into the copy, its base and the copy's program while on the list. `reconcileCounts(counts, previous, next)` and `programOf(state, program, characterId)` take explicit inputs.
- View: `ProgramEditor.update(state, program, counts)`. `game-view.ts` shows the copy with its counts during a map run, otherwise `teamProgram` with counts only where `countsProgram` is its number.

Slice 4 (`c908faf`, `bf7e827`) added to `programs.ts` the name rule, the suggested name, create, rename, delete, the edit of a saved program (`editProgram`) and the row's pick, with `tests/sim/program-list.test.mjs` and `tests/invariants/test_saved_program_edit.py`; read its report `reports/20-slice-04-report.md` for the names it exported. Slices 2 and 3 migrated the older tests; `tests/invariants/program_fixture.py` has helpers for the copy and the list.

## The slice's section of the plan, copied word for word from `.runs/task-cycles/programy-gracza/plan.md` (heading „Slice 5 — the saves, the discard and the switch of the copy”)

### Slice 5 — the saves, the discard and the switch of the copy

- **Goal:** The simulation gains the operations on a manual map run's copy and the two measures of
  its record, each operation a function that takes the game state, returns a `GameResult`, changes
  nothing passed to it and throws on a call the game does not allow (spec decision 5, the
  operations on the manual map run):
  - the measure „the copy has unsaved changes”: the copy differs from its base, or its program is
    gone; and the measure „the copy's program has changes the copy lacks”: that program is on the
    list and its content differs from the base. Both compare as `setProgram` compares programs
    today, the rule and group identity counters included, so a rule added and then deleted counts
    as a change in both (the spec re-review's note on spec decision 3);
  - save the copy into its program: refused without unsaved changes or with its program gone; the
    program's content and the base become the copy; the copy, streak, beaten attacks and counts
    stay; no confirmation, also where the program has changes the copy lacks (To do 8, 9; F8, F15);
  - save the copy as a new program, with a name by the name rules of Slice 4: refused without
    unsaved changes; the new program, at the end of the list with the next number, takes the
    copy's content; the copy takes the new program's number and its base becomes the copy; the
    character's program used last becomes the new program; copy, streak, beaten attacks and counts
    stay, and this is no switch (To do 8; F6, F15);
  - discard the copy's changes: refused without unsaved changes or with its program gone; the copy
    becomes its base as an edit of the copy does — counts reconciled, the streak and the beaten
    attacks of a map run not ended set to zero where the copy changes (To do 8; F21);
  - switch the character to another program: refused without a map run, with a map run ended in
    death or a completion, for a program not on the list and for the program the copy belongs to.
    The map run gets a fresh copy record of that program; the streak and the beaten attacks become
    zero; every count of the new copy's rules starts from zero; the character's program used last
    becomes it. The seed, the minute, the map, the body, the backpack, the action in progress
    (D-20) and the pause, the pause at a discovery included, stay as they are (To do 12; F12, F19).
  The rule written at the first chill is neither an unsaved change nor a change the save announces,
  shown with a program and a copy that start equal (To do 11). The check of F15 is written with its
  control — a switch in the same scenario sets the streak to zero — and its file is added by name
  to the *Files* of the part `simulation` through `the-way-update-part-map`, in the same commit. The
  check of `streak-program-change` gains a switch, to a program of other rules and to one of the
  same rules, each setting the streak to zero, and its docstring reads the sentence for the copy as
  F20 words it.
- **Change:** `src/browser/sim/programs.ts` · `src/browser/sim/game.ts` · `src/browser/sim/types.ts` ·
  `tests/sim/copy-actions.test.mjs` · `stryker.config.json` ·
  `tests/invariants/test_copy_save.py` · `tests/invariants/test_streak_program_change.py` ·
  `foundations/part_map.md`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:21-27` To do, items 6–12 ·
  `.runs/task-cycles/programy-gracza/task.md:160-181` Settlements to record ·
  `.runs/task-cycles/programy-gracza/task.md:149-150` Decisions in play, „How is a map solved” and streak-program-change/1 ·
  `.runs/task-cycles/programy-gracza/spec.md:84-110` 3. The copy belongs to the map run ·
  `.runs/task-cycles/programy-gracza/spec.md:136-155` 5. Operations of the simulation, on the manual map run, 6. Firing counts follow the copy ·
  `.runs/task-cycles/programy-gracza/spec.md:226-231` Foundation entries, streak-program-change to the part-map change ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F3 · F6 · F8 · F11 · F12 · F13 · F15 · F17 · F18 · F19 · F20 · F21 · F23 · F25 ·
  `foundations/decisions.md:401-414` D-20 · `foundations/decisions.md:450-474` D-22 ·
  `foundations/decisions.md:1632-1666` D-93 · `foundations/decisions.md:2112-2146` D-122 ·
  `foundations/decisions.md:2338-2363` D-131 · `foundations/decisions.md:2450-2475` D-136 ·
  `foundations/invariants.md:187-196` action-in-progress · `foundations/invariants.md:214-234` simulation-isolation · simulation-inputs ·
  `foundations/invariants.md:309-317` restart-seed · `foundations/invariants.md:828-836` streak-program-change ·
  `foundations/part_map.md:28-56` simulation ·
  `foundations/glossary.md:18-30` map run · program · `foundations/glossary.md:65-71` map run restart ·
  `foundations/glossary.md:131-155` manual map run · completion · solved map · streak ·
  `foundations/glossary.md:163-167` beaten attack ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/understanding.ts:309-339` withFirstChillRule ·
  `tests/invariants/program_fixture.py` · `tests/sim/program-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a failing case in `tests/sim/copy-actions.test.mjs`: „Zapisz w programie” after
  an edit of the copy gives the program the copy's content and leaves the streak. Then
  `npm run typecheck` · `npm test -- tests/sim/copy-actions.test.mjs` ·
  `npm test -- tests/invariants/test_copy_save.py` · `npm test -- tests/invariants/test_streak_program_change.py` ·
  `npm test -- tests/invariants/test_action_in_progress.py` · `npm test -- tests/invariants/test_restart_seed.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 4 · F3 · F6 · F8 · F11 · F12 · F15 · F19 · F20 · F21 · F23


## Current ranges of the *Read* (worktree at `bf7e827`; where they differ from the plan's, these hold)

- Frozen task and spec: the plan's ranges hold.
- Plan's *Choices*: `.runs/task-cycles/programy-gracza/plan.md:581-593`.
- Foundation entries, for the plan's F-names: F3 → D-156 `foundations/decisions.md:2801-2815`; F6 → D-159 `:2846-2860`; F8 → D-160 `:2861-2875`; F11 → D-123 `:2160-2192`; F12 → D-93 `:1632-1679` and D-131 `:2360-2393`; F13 → glossary `copy` `foundations/glossary.md:175-179`; F15 → invariant `copy-save` `foundations/invariants.md:848-857` (check file `tests/invariants/test_copy_save.py`); F17 → D-153 `:2756-2770`; F18 → D-152 `:2741-2755`; F19 → D-136 `:2479-2507`; F20 → invariant `streak-program-change` `foundations/invariants.md:828-837`; F21 → D-131 `:2360-2393`; F23 → D-93 `:1632-1679`; F25 → part map `simulation` `foundations/part_map.md:28-58`. Also D-162 (the switch) `:2891-2904`.
- Other decisions: D-20 `:401-415`; D-22 `:450-475`; D-93 `:1632-1679`; D-122 `:2124-2159`; D-131 `:2360-2393`; D-136 `:2479-2507`.
- Invariants: action-in-progress `foundations/invariants.md:187-197`; simulation-isolation · simulation-inputs `:214-235`; restart-seed `:309-318`; streak-program-change `:828-837`.
- Glossary: `:18-30`, `:65-72` map run restart, `:131-156` manual map run · completion · solved map · streak, `:163-168` beaten attack.
- Code: `src/browser/sim/understanding.ts:309-339` withFirstChillRule; `src/browser/sim/programs.ts`, `game.ts`, `types.ts` whole as Slice 4 left them; `tests/invariants/program_fixture.py`, `tests/sim/program-fixture.mjs`, `tests/invariants/test_streak_program_change.py`, `stryker.config.json`. Guidelines whole as the plan names.
