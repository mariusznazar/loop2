# Handoff - slice 4 (stage: make-change, "a slice, or the retry of a slice")

You make slice 4 of the plan of the task cycle `karty-i-katalog-map` (screen Mapy, card of a map, section "Kto idzie"). You are a fresh executor; the model class set for you by the plan is `cheaper`.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. Never ask the human. A question you cannot settle from your reading goes back in your report with the status `questions`; an open design choice the code shows returns with the status `returned` and no code (see the method).

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`; the slice's base is `00b807ce90cd09787beada4485264d4b3464684a`. The-way is the worktree's `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for a slice (a file the method names only when the step that names it comes). Its project skill is `the-way-make-change`.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/06-slice-4-report.md`. Return only: status, your commits, a one-line check result naming what failed or did not run, and the report path. The report must hold each check with its command and exit code, the section **Searches not found or unclear** (items or `none`), the own-work check the method asks for, every reach beyond this handoff (what, where, why) and your questions and concerns.
- Commit on the task branch with `git add <path> ...` by path (never `git add -A`, `git add .` or `git commit -a`), in English in the form of this repository's commits (`feat: :sparkles: ...`, `test: :white_check_mark: ...`, `docs: :memo: ...`, `refactor: :recycle: ...`; see `git log` for the form), each message ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean.
- The checks of your slice are the focused checks its section names, run as it names them; you run no full `npm test` (the orchestrator runs the gate). `npm test -- <one file>` runs exactly one file.
- Project rules: read `AGENTS.md`; the guideline files named in your slice's *Read* each whole.
- Product language: code, identifiers, comments and commit messages in English; game text, test names and guideline prose in the language of the files you change (Polish where they are Polish). Do not rewrite files into another language.

## Names of foundation entries since the plan was written

The foundation entries were written before slice 1 by the foundation step (commit `afe5920`). In your *Read*, "Settlement 1..6" and "(new) ..." entries have these identifiers: (new) What does the screen Mapy show? = D-325; (new) What does the game say before an earning loop that earns nothing? = D-326; Settlement 1 = D-327; Settlement 2 = D-328; Settlement 3 = D-329; Settlement 4 = D-330; Settlement 5 = D-331; Settlement 6 = D-332. Read each entry the section names whole, from its `### D-nnn` heading to the next `###` heading.

Current line ranges in `foundations/decisions.md` (they differ from the ranges in the copied section; the current ones hold; find an entry by its heading when in doubt): `D-18` lines 390-408 | `D-36` lines 801-815 | `D-170` lines 3114-3128 | `D-217` lines 4037-4049 | `D-218` lines 4050-4066 | `D-244` lines 4865-4883 | `D-245` lines 4884-4911 | `D-265` lines 5455-5496 | `D-269` lines 5599-5624 | `D-325` lines 7057-7071 | `D-326` lines 7072-7086 | `D-327` lines 7087-7101 | `D-328` lines 7102-7116 | `D-329` lines 7117-7131 | `D-330` lines 7132-7146 | `D-331` lines 7147-7161 | `D-332` lines 7162-7176.

## Your slice, copied word for word from `docs/task-cycles/karty-i-katalog-map/plan.md`

### Slice 4 — The pure lines leave headquarters.ts

- **Goal:** the pure functions of `src/browser/view/headquarters.ts` that other screens use move to
  two modules that import no DOM, no React and no `.tsx` file, with no change of behaviour (carried
  question 3): `src/browser/view/team-lines.ts` holds `generationLabel`, `resurrectionLine` with
  `ResurrectionLine`, `loopLine`, `stoppedLoopLine`, `runWaitingSentence`, `programPositions` with
  `ProgramPositions`, and `chestLines`; `src/browser/view/map-lines.ts` holds `sendMaps` and
  `solvingSentence`. `headquarters.ts` imports them and keeps `mapLabel` and
  `EMPTY_NAME_MESSAGE`. `character-screen.tsx` and `program-editor.ts` import from the new modules,
  and the comment of `offeredResources` names the first map of the list of maps rather than the
  headquarters. The cases of `tests/view/headquarters.test.mjs` move with their expectations
  unchanged: those of the moved functions to `tests/view/team-lines.test.mjs` and
  `tests/view/map-lines.test.mjs`, each of which imports in Node with no document as the old file
  did; `headquarters.test.mjs` keeps the case of `mapLabel` and the case of an import touching no DOM.
- **Change:** `src/browser/view/team-lines.ts` · `src/browser/view/map-lines.ts` ·
  `src/browser/view/headquarters.ts` · `src/browser/view/character-screen.tsx` ·
  `src/browser/view/program-editor.ts` · `tests/view/headquarters.test.mjs` ·
  `tests/view/team-lines.test.mjs` · `tests/view/map-lines.test.mjs`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:164-165` Context ·
  `docs/task-cycles/karty-i-katalog-map/task.md:182-187` Questions carried to cycle ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  `foundations/decisions.md:390-408` D-18 · `foundations/decisions.md:801-815` D-36 ·
  `foundations/decisions.md:3113-3127` D-170 · `foundations/decisions.md:4034-4046` D-217 ·
  `foundations/decisions.md:4047-4063` D-218 · `foundations/decisions.md:4863-4881` D-244 ·
  `foundations/decisions.md:4882-4909` D-245 · `foundations/decisions.md:5453-5494` D-265 ·
  `foundations/decisions.md:5597-5622` D-269 ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:1049-1058` resurrection-renewal ·
  `foundations/invariants.md:579-588` node-test-selection ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/team-lines.test.mjs` · `npm test -- tests/view/map-lines.test.mjs` ·
  `npm test -- tests/view/headquarters.test.mjs` · `npm test -- tests/view/character-screen.test.mjs` ·
  `npm test -- tests/view/program-editor.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` ·
  `npm test -- tests/quality/test_node_test_selection.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** none

## Plan's Choices and notes

The plan's *Choices* (plan.md lines 641-660) bind where your slice's *Read* names them. The orchestrator's notes at the end of plan.md (section "Orchestrator's notes") apply.
