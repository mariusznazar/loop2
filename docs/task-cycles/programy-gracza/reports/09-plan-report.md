# Planner's report — programy-gracza

Status: **done with concerns**

- Plan: `.runs/task-cycles/programy-gracza/plan.md`
- Size report: `.runs/task-cycles/programy-gracza/plan-size.md` (last run, exit 0, every slice `fits`)
- Method: `.the-way/task-cycle/plan/SKILL.md`, read whole, entered through
  `.claude/skills/the-way-plan-task/SKILL.md`. `cycle.md` was not read. No product file, test,
  foundation entry or guideline was changed; `git status --short` is clean at
  `4bfb9623e9310220e335377df7fbb4c9ad413406`.

## The plan in short

There are 25 foundation entries, F1–F25. F1–F16 are the task's rows. F17 is the new decision on
program numbers. F18 is the projected entry „(new) — Who owns a program?”. F19–F24 are the changes
of D-136, `streak-program-change`, D-131, D-44, D-93 and D-123. F25 is the part-map change. The
foundation step writes F1–F24 before Slice 1. F25 is written in Slices 4 and 5 (see Concerns, 2).

The eight slices are made one after another:

1. The copy of a manual map run and the programs list in the game state. Send, „Restart”,
   „Zakończ”, `setProgram`, the first-chill write and the counts. Also the least view change that
   keeps the game building and playable. Model `same`.
2. Migration of the JavaScript tests that read the one program. This includes
   `tests/view/program-editor.test.mjs`. Model `cheaper`.
3. Migration of the four Python invariant checks whose drivers read `state.program`. Model
   `cheaper`.
4. The operations on the list: names, create, rename, delete, edit of a saved program, the row's
   pick. Also the check of F9 and its part-map line. Model `cheaper`.
5. The saves, the discard and the switch, and the two measures. Also the check of F15, the switch
   in `streak-program-change` and the part-map line. Model `cheaper`.
6. The program panel: the list, its actions, the name field and the program it shows. Model
   `same`.
7. The controls of the copy in the panel: the heading, the two warning lines, the three buttons
   and the switch button. Also the styleguide's list of destructive buttons. Model `cheaper`.
8. The headquarters row's „Program:” list and the send with its program number. Model `cheaper`.

No slice touches a trust boundary or holds an operation that cannot be undone. The part map's
trust boundaries are `assets/icons/**` and `assets/fonts/**`, and no slice changes them. No pin
moves.

The re-review's note is carried into Slice 5. The measure "the copy has unsaved changes" compares
the same way as the measure "the program has changes the copy lacks": both include the identity
counters.

The browser journeys are checked by hand under D-75 and D-88. Slices 1, 6, 7 and 8 each name the
states to inspect by screenshot, through `npm run dev` with an intercepted session. Each slice
names in its report the states it left unchecked. Slice 7 already names one: a completion of
Las — głębiej.

## Order and the styleguide's example

The styleguide's example (`guidelines/styleguide-browser-view.md:295-302`, "Plan of a
user-interface change") runs in this order: environment and library, then values in their source,
then one screen, then its states. The plan follows it for the view. The change adds no library and
no token value, so the view starts at the screen (Slice 6), then its states (Slice 7), then the
second screen (Slice 8). Before the view comes the simulation (Slices 1, 4, 5). The test migration
(Slices 2, 3) is placed right after Slice 1, so the tests are green again before new behaviour is
added.

## Concerns

1. **The build forces Slice 1 across both parts.**
   - `npm test -- <file>` builds the whole game first, and two lines of the view read
     `state.program`: `src/browser/view/game-view.ts:73` and
     `src/browser/view/program-editor.ts:1042`.
   - So Slice 1 cannot remove `GameState.program` without also changing the editor's `update` and
     the game view.
   - Slice 1 is the heaviest slice: 9 files changed, about 120k estimated tokens to read. It fits
     the script's limits, but it is the slice most likely to come back as too large. If it does,
     `too_large.md` applies. A natural cut is the first-chill write and the counts at „Zakończ”
     (with `tests/sim/discovery.test.mjs` and `tests/sim/program-counts.test.mjs`).
2. **F25 is not written in the foundation step.**
   - The method puts a part-map change for an added file in the foundation step. But
     `foundation_check.py` reports an error for a *Files* pattern that matches no file git tracks
     (`.the-way/elements/common/foundation_check.py:47`, `:552`).
   - So each of the two lines is written through `the-way-update-part-map` in the slice that
     creates its check file, in the same commit. Commit `9dd8306` did the same for
     `tests/invariants/test_streak_program_change.py`.
3. **Red tests between Slice 1 and Slices 2–3.**
   - After Slice 1, the 8 JavaScript sim tests, `tests/view/program-editor.test.mjs` and the 4
     Python checks named in Slices 2 and 3 fail until those slices migrate them.
   - Slice 1 says so, and its checks leave those files out.
   - If a file outside those lists also fails for the same reason, Slices 2 and 3 report it rather
     than change it silently. The lists come from grep at the base, not from running the tests
     against the new shape.
4. **The test compatibility rests on two choices a reviewer may reject** (*Choices*, first two
   rows).
   - `setProgram` outside a map run edits the program a character with no pick and no program used
     last would be sent with.
   - `send` takes the program number as an optional field.
   - Together they keep about 25 test files and step scripts unchanged. From Slice 6 the product
     itself uses `setProgram` only within a map run, so its outside-run meaning serves the tests.
   - If the review rejects this, those files have to be migrated in about three more slices of up
     to ten files each.
5. **The styleguide line changes in Slice 7, not with D-44.** From the foundation step until Slice
   7, D-44 (F22) and the styleguide's list of destructive buttons (`:196-197`) differ.
6. **The identifiers of F9 and F15 are proposals.** I proposed `saved-program-edit` and
   `copy-save`. If the foundation step records others, the paths in Slices 4 and 5 are renamed in
   their handoffs.

## Guidelines found missing or uncertain

- None missing. Every file whose *Applies to* names `simulation` or `browser-view` was read whole:
  `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
  `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`, plus `src/browser/AGENTS.md`.
- `coding-content-data.md` and `coding-browser-api-client.md` apply to those parts, but their
  *When to read* does not match this work.
- Uncertain:
  - `guidelines/coding-browser-module.md` and `guidelines/coding-simulation-module.md` list their
    files of the kind as `copy`. Neither says whether a new module, such as
    `src/browser/sim/programs.ts` or `src/browser/view/program-panel.ts`, must be added to that
    table. Slices 1 and 6 do not plan that edit. The orchestrator should decide whether those
    slices add a row.
  - The styleguide (`guidelines/**`) belongs to the part `agent-workflow`. Slice 7 reaches it, and
    the guidelines that apply to that part (`coding.md`, `testing.md`) are already in its reading.

## Reaches beyond the dispatch

- `.the-way/task-cycle/slice_size.py`, lines 1–200: the method's script, to learn the *Change*
  limit (10 files) and how *Read* is parsed.
- `.the-way/product-guidelines/reading.md`: the method names it to select the guidelines for
  *Read*.
- `.the-way/elements/common/foundation_check.py`, lines 20–80, plus a grep for "exist" and "matches
  no": to learn whether a part-map line may name a file that does not exist yet. It may not, so
  Concern 2 follows.
- `git log -S` on `foundations/part_map.md`, and `--diff-filter=A` for
  `tests/invariants/test_streak_program_change.py` and `test_character_team.py`: to see how the
  earlier cycles placed part-map lines.
- `package.json` scripts: to learn the commands `npm run dev`, `npm run typecheck` and
  `npm run kitchen-sink`.
- Code read beyond the dispatch's list:
  - `src/browser/view/controls/select-list.ts`, and the export lines of the other controls;
  - `src/browser/styles.css`, lines 60–80 and 215–230;
  - `tests/view/headquarters.test.mjs`, lines 1–60;
  - `tests/view/program-editor.test.mjs`, the passages at 255–330 and its grep hits;
  - `tests/view/status-row.test.mjs`, lines 1–30;
  - `tests/sim/rules.test.mjs`, lines 1–40;
  - `tests/invariants/test_simulation_inputs.py`, lines 1–80;
  - the `test(` lines of `tests/sim/purity.test.mjs`, `team.test.mjs`, `program-counts.test.mjs`
    and `streak.test.mjs`.

  Each was read to see how the tests drive and read the program, so that the migration slices
  could be cut.
- The guideline headers (*Applies to*) of every file under `guidelines/`, and the `guidelines/**`
  line of the part map.
- `run.ts` was read by grep and at lines 270–320, not whole. `understanding.ts` was read at 100–139
  and 280–339. `program.ts` and `character.ts` were read through their export lines only.

## Questions

None waits for an answer. These two choices are the orchestrator's to confirm or overturn before
dispatch; neither blocks the plan:

- Confirm the compatibility choices for `setProgram` outside a map run and the optional program
  number of `send` (Concern 4).
  - Proposed answer: keep them. Evidence: the spec leaves "a compatibility wrapper or rewritten" to
    the maker (`spec.md:238`). About 25 of the 41 test files call `setProgram` only before a
    `send`, and the per-slice limit is ten changed files.
- Should Slices 1 and 6 add the new modules to the "Files of this kind" tables of the two kind
  guidelines?
  - Proposed answer: yes, as rows of status `copy`. That would add one guideline file to each
    slice's *Change*, and both slices stay within the limits.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `git status --short`, `git log --oneline -3`, `git ls-files --stage -- .the-way`, `git -C .the-way rev-parse HEAD` | 0 | clean; pin gitlink and checkout both `3aee7d958835cc19b95519f4d21b37538b78e3e1` |
| `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/programy-gracza/plan.md` (first run) | 1 | Slice 5 `unchecked`: headings in backticks were read as paths; fixed |
| the same, second run, written to `plan-size.md` | 0 | all eight slices `fits` |
| `git rev-parse HEAD` | 0 | `4bfb9623e9310220e335377df7fbb4c9ad413406` |
| `git check-ignore -q .runs/task-cycles/programy-gracza/plan.md` | 0 | the plan is ignored, as `.gitignore` must keep `.runs/` |

Not run: `npm test` (the gate), `python -B .the-way/elements/common/foundation_check.py`,
`npm run typecheck` and every focused check of the slices. The stage is planning only, and no
product or foundation file changed.
