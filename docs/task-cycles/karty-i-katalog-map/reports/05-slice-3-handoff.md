# Handoff - slice 3 (stage: make-change, "a slice, or the retry of a slice")

You make slice 3 of the plan of the task cycle `karty-i-katalog-map` (screen Mapy, card of a map, section "Kto idzie"). You are a fresh executor; the model class set for you by the plan is `same`.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. Never ask the human. A question you cannot settle from your reading goes back in your report with the status `questions`; an open design choice the code shows returns with the status `returned` and no code (see the method).

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`; the slice's base is `284641e2ceebc7fd48ef45a4b6d0b06ec51a1df5`. The-way is the worktree's `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for a slice (a file the method names only when the step that names it comes). Its project skill is `the-way-make-change`.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/05-slice-3-report.md`. Return only: status, your commits, a one-line check result naming what failed or did not run, and the report path. The report must hold each check with its command and exit code, the section **Searches not found or unclear** (items or `none`), the own-work check the method asks for, every reach beyond this handoff (what, where, why) and your questions and concerns.
- Commit on the task branch with `git add <path> ...` by path (never `git add -A`, `git add .` or `git commit -a`), in English in the form of this repository's commits (`feat: :sparkles: ...`, `test: :white_check_mark: ...`, `docs: :memo: ...`, `refactor: :recycle: ...`; see `git log` for the form), each message ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean.
- The checks of your slice are the focused checks its section names, run as it names them; you run no full `npm test` (the orchestrator runs the gate). `npm test -- <one file>` runs exactly one file.
- Project rules: read `AGENTS.md`; the guideline files named in your slice's *Read* each whole.
- Product language: code, identifiers, comments and commit messages in English; game text, test names and guideline prose in the language of the files you change (Polish where they are Polish). Do not rewrite files into another language.

## Names of foundation entries since the plan was written

The foundation entries were written before slice 1 by the foundation step (commit `afe5920`). In your *Read*, "Settlement 1..6" and "(new) ..." entries have these identifiers: (new) What does the screen Mapy show? = D-325; (new) What does the game say before an earning loop that earns nothing? = D-326; Settlement 1 = D-327; Settlement 2 = D-328; Settlement 3 = D-329; Settlement 4 = D-330; Settlement 5 = D-331; Settlement 6 = D-332. Read each entry the section names whole, from its `### D-nnn` heading to the next `###` heading.

Current line ranges in `foundations/decisions.md` (they differ from the ranges in the copied section; the current ones hold; find an entry by its heading when in doubt): `D-43` lines 906-920 | `D-44` lines 921-935 | `D-45` lines 936-950 | `D-47` lines 966-980 | `D-265` lines 5455-5496 | `D-269` lines 5599-5624 | `D-274` lines 5745-5783 | `D-279` lines 5892-5915 | `D-325` lines 7057-7071 | `D-326` lines 7072-7086 | `D-327` lines 7087-7101 | `D-328` lines 7102-7116 | `D-329` lines 7117-7131 | `D-330` lines 7132-7146 | `D-331` lines 7147-7161 | `D-332` lines 7162-7176.

## Your slice, copied word for word from `docs/task-cycles/karty-i-katalog-map/plan.md`

### Slice 3 — The main look of the shared button outside a form

- **Goal:** the shared button gains the kind `main` in both its forms (D-265):
  `createButton(text, { kind: "main" })` in `src/browser/view/controls/button.ts` and
  `<ReactButton kind="main">` in `src/browser/view/controls/react-button.tsx` draw one element of
  the type `button`, never `submit`, with the class `main`. `src/browser/styles.css` draws
  `.button.main` with the main look the rules of `.button[type="submit"]` give — at rest, under the
  pointer, at the focus and disabled — from the same declarations, with no new value (D-274 as
  rewritten, D-43). `tests/view/react-controls.test.mjs` compares the two forms of the kind at rest
  and disabled. The kitchen-sink page shows the DOM form of the kind beside its main button of a
  form, its samples staying in DOM (D-269). The report holds the state check of the control: the
  component, the states drawn, the method — the kitchen-sink page in a real browser through
  `npm run kitchen-sink` — and the evidence.
- **Change:** `src/browser/view/controls/button.ts` · `src/browser/view/controls/react-button.tsx` ·
  `src/browser/styles.css` · `tests/view/react-controls.test.mjs` ·
  `src/browser/kitchen-sink/kitchen-sink.ts`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:66-67` To do, item 7 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:112-116` Questions to settle, question 6 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:252-254` Decisions in play, D-274 ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: D-274 as written ·
  `foundations/decisions.md:906-920` D-43 · `foundations/decisions.md:921-935` D-44 ·
  `foundations/decisions.md:936-950` D-45 · `foundations/decisions.md:966-980` D-47 ·
  `foundations/decisions.md:5453-5494` D-265 · `foundations/decisions.md:5597-5622` D-269 ·
  `foundations/decisions.md:5743-5777` D-274 · `foundations/decisions.md:5886-5909` D-279 ·
  `foundations/invariants.md:459-468` browser-view-token-values ·
  `foundations/invariants.md:469-478` browser-view-focus-outline ·
  `foundations/invariants.md:499-508` application-build-kitchen-sink ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/kitchen-sink/index.html` · `src/browser/kitchen-sink/kitchen-sink.css` ·
  `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/react-controls.test.mjs` (the case of the kind written first,
  failing) · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py` · `npm run kitchen-sink`, the page looked
  at in a real browser as `.claude/skills/loop2-play/SKILL.md` gives
- **Depends on:** Slice 1

## Plan's Choices and notes

The plan's *Choices* (plan.md lines 641-660) bind where your slice's *Read* names them. The orchestrator's notes at the end of plan.md (section "Orchestrator's notes") apply.
