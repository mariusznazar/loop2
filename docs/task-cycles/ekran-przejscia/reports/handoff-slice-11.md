# Handoff — Slice 11 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 11; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `0f96357` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-11.md`. If the harness refuses
  that write, return the whole report as text in your final message instead.
- Read every guideline file your handoff names **whole**: where a file is too large for one read, read it in parts until its end (`guidelines/testing.md` is about 66 kB). A guideline read in part is a gap your report must name.
- Do not run the whole gate (`npm test` with no argument); your checks are the slice's *Checks*.
  The tools of `tests/quality` are installed in `.runs/quality-venv`.

## Answers of step 4 (binding)

- Trust boundary: yes for the cycle — `assets/sprites/**` of the part `browser-view` (Slice 1 adds
  the PNG of the forest frame there; its review checks, as D-273 gives, that the file holds pixels
  alone and that the build copies from `assets/sprites/` only PNG files, only into what
  `npm run build` writes). A slice whose *Risk* is none touches no trust boundary; if yours comes to
  touch one, or `src/browser/sim/saved-game.ts`, say so in your report.
- Irreversible operation: no. Open design choice: none. Reserved choice: none.
- Answers the orchestrator gave (cycle record, questions table): the saved game state keeps its
  shape and `SAVED_GAME_VERSION` stays 3; „Dodaj regułę z tym” is disabled where the copy holds no
  rule group; the committed scene size is 672 × 304 (scale constant 2) until the human picks, the
  other size reached only locally; new rows of `guidelines/coding-browser-module.md` take the status
  `copy`.

## Environment

Windows 11; shells: Git Bash and PowerShell. Python's console output uses the ANSI code page: write
Polish text a script produces to a UTF-8 file rather than printing it, use forward slashes in paths
inside Python literals, and keep line endings when a script rewrites an existing file
(`newline=''`). Commit messages in English in the repository's style (`feat: :sparkles: …`,
`test: :white_check_mark: …`, `refactor: :recycle: …`, `docs: :memo: …`), files added by path —
never `git add -A`, `git add .` or `git commit -a`.

## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or
`blocked`), your commits, a one-line check result naming what failed or did not run, and the
report's path (or that the report is in your message). The report holds every check you ran with
its command and exit code, your own-work check, your questions and concerns, each reach beyond this
handoff, and **Searches not found or unclear** — each thing looked for and not found or unclear, or
`none`.

## Orchestrator's notes for this slice

- Slice 9 (commit `6c2f520`) moved the screen to `src/browser/view/run-screen.tsx`, which uses `TerrainDrawing` and `TileTable` of Slice 6; check with `git grep` that nothing imports `terrain-panel` or `createTileListView` before removing.
- Slice 9 kept the stylesheet rules `.terrain-panel` and `.rule-panel-host`: your goal says change no stylesheet — leave them; the whole-change review judges dead rules.
- Long lines of `guidelines/testing.md` can be cut by your reading tool; read them another way (e.g. `sed -n`) so the file is read whole.

## The slice's section of the plan, word for word (`plan.md`)

### Slice 11 — The terrain panel's DOM module goes

- **Goal:** with no module importing it after Slice 9, remove `src/browser/view/terrain-panel.ts`, and remove `createTileListView` with its type `TileListView` from `src/browser/view/tile-list.ts`, keeping `tileList`, `tileKey` and the pure function of the line of a tile of Slice 6. In `tests/view/tile-list.test.mjs` remove the DOM case „on the panel the campfire's icon stands in its tile and the state in the row of the same key” and its stand-in document, carried by the case of `tests/view/world-area.test.mjs` (Slice 6), its cause in the commit message as in Slice 10. In `tests/invariants/test_browser_view_token_values.py` the control `test_control_the_population_is_the_part_less_the_token_file` names `src/browser/view/terrain-drawing.tsx` (Slice 6), which holds the geometry of the drawing, in place of the file removed; cause: the file is gone (task item 8). In `src/browser/kitchen-sink/kitchen-sink.ts` the comment that points at `terrain-panel.ts` for the room around the tiles points at the module that now holds it (`terrain-drawing.tsx`), the page's code unchanged (D-269: it imports no `.tsx`). Change no stylesheet and nothing the screen shows.
- **Change:** `src/browser/view/terrain-panel.ts` · `src/browser/view/tile-list.ts` · `tests/view/tile-list.test.mjs` · `tests/invariants/test_browser_view_token_values.py` · `src/browser/kitchen-sink/kitchen-sink.ts`
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:53-55` To do ·
  `foundations/decisions.md:402-427` D-19 · `foundations/decisions.md:1362-1376` D-70 · `foundations/decisions.md:897-911` D-43 · `foundations/decisions.md:5555-5580` D-269 · `foundations/invariants.md:459-468` browser-view-token-values · `foundations/invariants.md:355-364` terrain-drawing-numbers ·
  Foundation entries E2, E18 ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/tile-list.test.mjs`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_terrain_drawing_numbers.py`; `npm test -- tests/invariants/test_application_build_kitchen_sink.py`; `git grep -n -E "createTerrainPanel|createTileListView|terrain-panel" -- src tests` exiting 1; `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 7 · Slice 9

## What you read

The ranges below are current at 0f96357; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-19 — `foundations/decisions.md:402-429`
- D-70 — `foundations/decisions.md:1364-1378`
- D-43 — `foundations/decisions.md:899-913`
- D-269 — `foundations/decisions.md:5563-5588`
- browser-view-token-values — `foundations/invariants.md:459-468`
- terrain-drawing-numbers — `foundations/invariants.md:355-364`

### Entries written by the cycle's foundation step

- E2 — D-19 (rewritten whole in the projected wording) — read it whole in `foundations/decisions.md` — `foundations/decisions.md:402-429`
- E18 — invariant terrain-drawing-numbers (sentence reworded) — read it whole in `foundations/invariants.md` — `foundations/invariants.md:355-364`

### Files (whole unless a range is given)

- `src/browser/AGENTS.md`
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`

### Passages of the frozen task, word for word (`.runs/task-cycles/ekran-przejscia/task.md`)

#### task.md:53-55 — To do

8. Ekran przejścia jest ekranem w React i dalej dostaje przejście jako parametr, zamiast sam czytać je ze stanu gry.
   - Przyciski nagłówka i pasa są wspólnymi kontrolkami w postaci React (D-265).
   - „Restart” i „Zakończ” biorą postać React przycisku niszczącego, którą dokłada zadanie 4; gdyby jej przy starcie cyklu nie było, dokłada ją to zadanie z przypadkiem w teście porównującym obie postaci.
