# Handoff — Slice 12 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 12; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `ebce3d3` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-12.md`. If the harness refuses
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

- Your section of the plan was amended by the orchestrator after Slice 11 (the *Amendment* line in it): you also remove the dead stylesheet rules `.status-row`, `.status-text`, `.status-text.positive`, `.discovery-text`, `.terrain-panel` from `src/browser/styles.css` — check with `git grep` first that nothing else uses them; `.rule-panel-host` stays.
- The table of `guidelines/coding-browser-module.md` also loses the rows of the removed `src/browser/view/terrain-panel.ts` and `src/browser/view/run-screen.ts` (now `run-screen.tsx`), as your goal says, and gains a row for each new module: `discovery-band.tsx`, `discovery-rule.ts`, `run-header.tsx`, `run-screen.tsx`, `terrain-drawing.tsx`, `tile-table.tsx`, `world-area.tsx`, each with status `copy` (orchestrator's answer Q4).
- Slice 10's report notes that the example „Kontrolki w DOM i ich aktualizacja” and `## Where in code` name `status-row.ts`, which builds no element any more.
- Long lines of `guidelines/testing.md` can be cut by your reading tool; read them another way (e.g. `sed -n`) so the file is read whole.

## The slice's section of the plan, word for word (`plan.md`)

### Slice 12 — The guidelines follow the change

- **Goal:** `guidelines/coding-browser-module.md` follows the change (task item 9): the table *Files of this kind* gains a row for each new module of the view — `src/browser/view/discovery-band.tsx`, `discovery-rule.ts`, `run-header.tsx`, `run-screen.tsx`, `terrain-drawing.tsx`, `tile-table.tsx`, `world-area.tsx` — in the table's order, each with the status `copy` and `—` as its decision, as the table gives every React module but the exemplar, unless the orchestrator's answer to the planner's open question says otherwise; it loses the rows of `src/browser/view/run-screen.ts` and `src/browser/view/terrain-panel.ts`, which are gone. The example „Kontrolki w DOM i ich aktualizacja”, which stands on `status-row.ts`, a module that after Slices 9 and 10 builds no element, points at a module that after this change still builds its buttons once in the DOM and updates them in place: read the candidates, `src/browser/view/headquarters.ts` first, name the one chosen and why in the report, and rewrite the paragraph's first sentences for it; `## Where in code` follows. Read `guidelines/styleguide-browser-view.md`, `guidelines/testing.md` and `guidelines/coding.md` for a passage this change made untrue — such as one on where the rule panel or the status row stands on the screen of a map run — and correct it in this slice (WAY-172); the planner found none, so name what was checked. This slice is the cycle's author of `the-way-maintain-coding-guidelines` (the column „The cycle's author” of `.the-way/product-guidelines/coding/SKILL.md`): it writes by `.the-way/product-guidelines/coding/template.md`, section „Writing the files”, and the form of `.the-way/product-guidelines/template.md`, takes every row and status from the task and the orchestrator's answers, runs none of that skill's steps of refinement and holds no conversation with the human; a choice neither settles is returned as a question to the orchestrator, never written as a row.
- **Change:** `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `src/browser/styles.css`
- **Amendment (orchestrator, after Slice 11):** Slices 10 and 11 left, by their goals, the stylesheet rules that only the removed DOM forms used. This slice also removes from `src/browser/styles.css` the rules `.status-row`, `.status-text`, `.status-text.positive`, `.discovery-text` and `.terrain-panel` (and a selector list or `@media` block that names only them), after `git grep` shows no file of `src/` or `tests/` other than the stylesheet uses the class; `.rule-panel-host` stays (`rule-panel.tsx:594` uses it). Removing them changes nothing the screen shows. Change gains `src/browser/styles.css`; Checks gain `npm test -- tests/invariants/test_browser_view_token_values.py`, `npm test -- tests/quality/test_quality_invariants.py` and `git grep -n -E "createTerrainPanel|createTileListView|terrain-panel" -- src tests` exiting 1.
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:56-57` To do ·
  `foundations/decisions.md:792-806` D-36 · `foundations/decisions.md:5411-5452` D-265 · `foundations/decisions.md:5481-5509` D-267 · `foundations/decisions.md:5555-5580` D-269 · `foundations/decisions.md:39-51` D-03 ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `.the-way/product-guidelines/coding/SKILL.md:1-60` · `.the-way/product-guidelines/coding/template.md` · `.the-way/product-guidelines/template.md` ·
  `src/browser/view/headquarters.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`; `git ls-files -- src/browser/view` compared with the table's rows, every row naming a file git tracks
- **Depends on:** Slice 10 · Slice 11

## What you read

The ranges below are current at ebce3d3; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-36 — `foundations/decisions.md:794-808`
- D-265 — `foundations/decisions.md:5419-5460`
- D-267 — `foundations/decisions.md:5489-5517`
- D-269 — `foundations/decisions.md:5563-5588`
- D-03 — `foundations/decisions.md:39-51`

### Files (whole unless a range is given)

- `guidelines/coding.md`
- `guidelines/testing.md`
- `.the-way/product-guidelines/coding/SKILL.md:1-60`
- `.the-way/product-guidelines/coding/template.md`
- `.the-way/product-guidelines/template.md`
- `src/browser/view/headquarters.ts`

### Passages of the frozen task, word for word (`.runs/task-cycles/ekran-przejscia/task.md`)

#### task.md:56-57 — To do

9. `guidelines/coding-browser-module.md` dostaje wiersze nowych plików, a jego przykład „Kontrolki w DOM i ich aktualizacja”, który stoi na `src/browser/view/status-row.ts`, wskazuje moduł, który po tej zmianie dalej jest w DOM; zmiany idą przez `the-way-maintain-coding-guidelines`.
10. Fundament dostaje wszystko, co *Decisions in play* oznacza do zapisania w tym zadaniu, poprawiony przykład D-46 oraz zdania o miejscu w D-147, D-185 i D-216 (pytanie 7).
