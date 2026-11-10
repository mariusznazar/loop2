# Handoff — Slice 3

You are the executor of Slice 3 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `1a79cc2069614f654eab42983b22768d745d8fde`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

### Slice 3 — The page of all states draws tile icons as the game does

- **Goal:** the tile samples of the kitchen-sink page take the placement of icons on a tile, and the
  tile size, from the code the game draws with, so that they change with the game (To do 4): the
  game's `iconPlaces` of `src/browser/view/terrain-picture.ts` (two icons a row, centred, each half
  the icons' square, a third of it where the icons take three rows) is exported together with the
  default tile size and the size of the icons' square, `terrainPicture` keeps its output unchanged,
  and `drawSample` of `src/browser/kitchen-sink/kitchen-sink.ts` calls them instead of its own
  `TILE_SIZE` and its icon size of 0.7. The page imports nothing that reaches a `.tsx` file (D-269)
  and builds no game state (D-04, D-45). Second, the sample "Wyczerpane" no longer claims that a
  resource's stock does not fall to zero in the game (To do 5): gathering takes stock off the tile
  (`src/browser/sim/run.ts` near the line reading `here.stock`) and the game dims the icon at stock
  zero (`dimmed` in `terrain-picture.ts`); the executor keeps the sample, drops or corrects the note
  to what the code shows, and invents no new claim. The failing test comes first: a case in
  `tests/view/terrain-picture.test.mjs` that imports the exported placement and checks, from the
  rule above and not from the function's output, the side and the place of the icons for two, four
  and five icons on one tile; it fails before the export exists. The look of the samples is checked
  in a browser by the user-interface check of `make-change` through `npm run kitchen-sink`
  (`loop2-play`).
- **Change:** `src/browser/view/terrain-picture.ts` · `src/browser/kitchen-sink/kitchen-sink.ts` ·
  `tests/view/terrain-picture.test.mjs`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:32-33` To do, items 4 and 5 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/part_map.md:3-28` browser-view ·
  `foundations/decisions.md:52-124` D-04 · `foundations/decisions.md:883-896` D-41 ·
  `foundations/decisions.md:913-926` D-43 · `foundations/decisions.md:943-956` D-45 ·
  `foundations/decisions.md:1380-1393` D-70 · `foundations/decisions.md:5620-5644` D-269 ·
  `foundations/invariants.md:499-507` application-build-kitchen-sink ·
  `foundations/invariants.md:355-363` terrain-drawing-numbers ·
  `foundations/invariants.md:459-467` browser-view-token-values ·
  `src/browser/view/terrain-drawing.tsx:1-70` the component that draws the game's picture ·
  `src/browser/sim/run.ts:190-225` the gathering that takes stock off a tile ·
  `tests/invariants/test_application_build_kitchen_sink.py:1-40`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/view/terrain-picture.test.mjs` exits 0, the new case
  seen failing first; `python -B scripts/test.py tests/invariants/test_application_build_kitchen_sink.py`
  exits 0 (it compiles the page once); `python -B scripts/test.py tests/invariants/test_cross_part_imports.py`
  exits 0; `python -B scripts/test.py tests/invariants/test_browser_view_token_values.py` exits 0;
  `python -B scripts/test.py tests/invariants/test_terrain_drawing_numbers.py` exits 0;
  `npm run typecheck` exits 0 (it runs `node scripts/build.mjs --check`; the orchestrator corrected the planner's path, which named no compiler); one
  screenshot of the tile samples from `npm run kitchen-sink`, or the reason none was made
- **Depends on:** none

**Notes of the orchestrator for this slice.**
- This slice changes the user interface (the page of all states). Read `.the-way/task-cycle/change/ui_check.md` when `make-change` names it, and the product's `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md` and `.claude/skills/loop2-play/SKILL.md` (all in *Read*). Keep every screenshot out of git and out of the record's copy: save it under the worktree's ignored `.runs/` (for example `.runs/screenshots/`), and report its address, never the file.
- `npm run typecheck` is the type check (the plan's path to a compiler named no compiler; the orchestrator corrected it).
- Your failing test comes first (seen failing before the export exists). Report the failing run and the passing run of that test, each with command and exit code.

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-3-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
