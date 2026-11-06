# Handoff — Slice 10 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 10; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `6c2f520` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-10.md`. If the harness refuses
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

- Slice 9 (commit `6c2f520`) moved the screen to `src/browser/view/run-screen.tsx`; the DOM forms you remove are no longer imported by the screen — check with `git grep` before removing.
- The React cases that now carry the removed DOM cases: `tests/view/run-header.test.mjs` (Slice 5), `tests/view/world-area.test.mjs` (Slice 6), `tests/view/discovery-band.test.mjs` (Slice 8; it carries `status-row.test.mjs` cases at base lines 442 and 582). Name in each commit message the case that now carries each removed behaviour.
- Slice 9 kept the stylesheet rules `.status-row`, `.status-text`, `.discovery-text` for you: your goal says change no stylesheet — leave them; the whole-change review judges dead rules.
- Long lines of `guidelines/testing.md` can be cut by your reading tool; read them another way (e.g. `sed -n`) so the file is read whole.

## The slice's section of the plan, word for word (`plan.md`)

### Slice 10 — The DOM forms of the status row, body row, combat line and trip lines go

- **Goal:** with no module importing them after Slice 9, remove `createStatusRow` with its type `StatusRow` from `src/browser/view/status-row.ts`, `createBodyRow` with `BodyRow` from `body-row.ts`, `createCombatLine` with `CombatLine` from `combat-line.ts` and `createTripLines` from `trip-lines.ts`; their pure functions stay as they are (`statusText`, `pauseLabel`, `discoveryText`, `bodyValues`, `backpackText`, `combatText`, `tripWarning`, `rehearsalMark`, `tripTexts`, `solvedRunText`, `deathSettlementLine` and the rest), and so do the type `StatusRowControls`, which the header and the screen use, and the pure cases. Remove the DOM cases of their tests and the stand-in documents only they use: in `tests/view/status-row.test.mjs` the cases at lines 338, 442, 495, 516, 550, 582 and 607 at the base, in `tests/view/body-row.test.mjs` the case at line 154, in `tests/view/combat-line.test.mjs` the case at line 49. Each removal names its cause in the commit message — the screen moved to React (task item 8, D-265) — and the case that now carries its behaviour, in `tests/view/run-header.test.mjs`, `tests/view/discovery-band.test.mjs` or `tests/view/world-area.test.mjs` (written by Slices 5, 6 and 8); a behaviour none of those cases carries is a finding of the report, and its case stays. Change no stylesheet and nothing the screen shows.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/body-row.ts` · `src/browser/view/combat-line.ts` · `src/browser/view/trip-lines.ts` · `tests/view/status-row.test.mjs` · `tests/view/body-row.test.mjs` · `tests/view/combat-line.test.mjs`
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:53-55` To do ·
  `foundations/decisions.md:5411-5452` D-265 · `foundations/decisions.md:39-51` D-03 ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/view/headquarters.ts:1-30` · `tests/sim/encounters.test.mjs:1-30`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/status-row.test.mjs`; `npm test -- tests/view/body-row.test.mjs`; `npm test -- tests/view/combat-line.test.mjs`; `npm test -- tests/view/trip.test.mjs`; `npm test -- tests/sim/encounters.test.mjs`; `npm test -- tests/view/headquarters.test.mjs`; `git grep -n -E "createStatusRow|createBodyRow|createCombatLine|createTripLines" -- src tests` exiting 1; `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 9

## What you read

The ranges below are current at 6c2f520; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-265 — `foundations/decisions.md:5419-5460`
- D-03 — `foundations/decisions.md:39-51`

### Files (whole unless a range is given)

- `src/browser/AGENTS.md`
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/view/headquarters.ts:1-30`
- `tests/sim/encounters.test.mjs:1-30`

### Passages of the frozen task, word for word (`.runs/task-cycles/ekran-przejscia/task.md`)

#### task.md:53-55 — To do

8. Ekran przejścia jest ekranem w React i dalej dostaje przejście jako parametr, zamiast sam czytać je ze stanu gry.
   - Przyciski nagłówka i pasa są wspólnymi kontrolkami w postaci React (D-265).
   - „Restart” i „Zakończ” biorą postać React przycisku niszczącego, którą dokłada zadanie 4; gdyby jej przy starcie cyklu nie było, dokłada ją to zadanie z przypadkiem w teście porównującym obie postaci.
