# Handoff - slice 10 (stage: make-change, "a slice, or the retry of a slice")

You make slice 10 of the plan of the task cycle `karty-i-katalog-map` (screen Mapy, card of a map, section "Kto idzie"). You are a fresh executor; the model class set for you by the plan is `cheaper`.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. Never ask the human. A question you cannot settle from your reading goes back in your report with the status `questions`; an open design choice the code shows returns with the status `returned` and no code (see the method).

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`; the slice's base is `d16b01d20ea52d625ff91586451d972481e43091`. The-way is the worktree's `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for a slice (a file the method names only when the step that names it comes). Its project skill is `the-way-make-change`.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/12-slice-10-report.md`. Return only: status, your commits, a one-line check result naming what failed or did not run, and the report path. The report must hold each check with its command and exit code, the section **Searches not found or unclear** (items or `none`), the own-work check the method asks for, every reach beyond this handoff (what, where, why) and your questions and concerns.
- Commit on the task branch with `git add <path> ...` by path (never `git add -A`, `git add .` or `git commit -a`), in English in the form of this repository's commits (`feat: :sparkles: ...`, `test: :white_check_mark: ...`, `docs: :memo: ...`, `refactor: :recycle: ...`; see `git log` for the form), each message ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean.
- The checks of your slice are the focused checks its section names, run as it names them; you run no full `npm test` (the orchestrator runs the gate). `npm test -- <one file>` runs exactly one file.
- Project rules: read `AGENTS.md`; the guideline files named in your slice's *Read* each whole.
- Product language: code, identifiers, comments and commit messages in English; game text, test names and guideline prose in the language of the files you change (Polish where they are Polish). Do not rewrite files into another language.

## Names of foundation entries since the plan was written

The foundation entries were written before slice 1 by the foundation step (commit `afe5920`). In your *Read*, "Settlement 1..6" and "(new) ..." entries have these identifiers: (new) What does the screen Mapy show? = D-325; (new) What does the game say before an earning loop that earns nothing? = D-326; Settlement 1 = D-327; Settlement 2 = D-328; Settlement 3 = D-329; Settlement 4 = D-330; Settlement 5 = D-331; Settlement 6 = D-332. Read each entry the section names whole, from its `### D-nnn` heading to the next `###` heading.

Current line ranges in `foundations/decisions.md` (they differ from the ranges in the copied section; the current ones hold; find an entry by its heading when in doubt): `D-28` lines 685-699 | `D-34` lines 771-785 | `D-35` lines 786-800 | `D-36` lines 801-815 | `D-133` lines 2525-2546 | `D-165` lines 3034-3048 | `D-170` lines 3114-3128 | `D-265` lines 5455-5496 | `D-325` lines 7057-7071 | `D-326` lines 7072-7086 | `D-327` lines 7087-7101 | `D-328` lines 7102-7116 | `D-329` lines 7117-7131 | `D-330` lines 7132-7146 | `D-331` lines 7147-7161 | `D-332` lines 7162-7176.

## Your slice, copied word for word from `docs/task-cycles/karty-i-katalog-map/plan.md`

### Slice 10 — Guidelines and instructions follow the change

- **Goal:** the coding guidelines describe the files as they stand (To do 10), written as the column
  „The cycle's author, in `implement-task`” of the project skill `the-way-maintain-coding-guidelines`
  gives, after `.the-way/product-guidelines/template.md` and
  `.the-way/product-guidelines/coding/template.md`: `guidelines/coding-browser-module.md` holds rows
  of `headquarters.tsx`, `maps-screen.tsx`, `team-lines.ts` and `map-lines.ts`, no row of the gone
  `headquarters.ts`, the row of `away-report.ts` with the status its pure content now has; its example
  „Ekran w Reactcie: Postać” names `loopLine` of `team-lines.ts`; its example „Kontrolki w DOM i ich
  aktualizacja” stands on a module still built in DOM after the change, such as `app.ts`, no longer on
  `headquarters.ts`; and its *Where in code* names no gone file. `guidelines/coding-simulation-module.md`
  holds the row of `map-card.ts`. The instructions that walk an agent into a map run say the new way:
  steps 3 and 5 of „The way into a map run” in both byte-identical copies of the skill `loop2-play`
  lead through „Mapy”, the row of Las and „Wejdź”, and the manual check of `README.md` sends a
  character the same way. The comments of the simulation that place the pick of a program in the
  headquarters row — `game.ts` at `send`, `programs.ts` at `rowProgram` and `pickProgram`, `types.ts`
  at `pickedPrograms`, and `data/maps.ts` at `solvingText` — name the character and the card of the
  map instead (D-165, D-170 and D-133 as written); no code, type or field changes.
- **Change:** `guidelines/coding-browser-module.md` · `guidelines/coding-simulation-module.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `.agents/skills/loop2-play/SKILL.md` · `README.md` ·
  `src/browser/sim/game.ts` · `src/browser/sim/programs.ts` · `src/browser/sim/types.ts` ·
  `src/browser/sim/data/maps.ts`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:72-73` To do, items 10 and 11 ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: D-133, D-165 and D-170 as written · src/browser/view/headquarters.tsx,
  src/browser/view/maps-screen.tsx, src/browser/view/team-lines.ts, src/browser/view/map-lines.ts and
  src/browser/sim/map-card.ts as the earlier slices left them ·
  `foundations/decisions.md:685-699` D-28 · `foundations/decisions.md:771-815` D-34, D-35, D-36 ·
  `foundations/decisions.md:5453-5494` D-265 ·
  `foundations/part_map.md:3-60` browser-view, simulation · `foundations/part_map.md:84-133`
  build-tools, agent-workflow ·
  `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` ·
  `.the-way/product-guidelines/coding/SKILL.md` · `.the-way/product-guidelines/template.md` ·
  `.the-way/product-guidelines/coding/template.md` ·
  `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/testing.md` ·
  `src/browser/view/app.ts` · `src/browser/view/away-report.ts` ·
  `tests/agent_workflow/test_loop2_play_skill.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` ·
  `npm test -- tests/agent_workflow/test_loop2_play_skill.py` · `npm run typecheck` ·
  `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 2 · Slice 4 · Slice 7 · Slice 9

## Plan's Choices and notes

The plan's *Choices* (plan.md lines 641-660) bind where your slice's *Read* names them. The orchestrator's notes at the end of plan.md (section "Orchestrator's notes") apply.
