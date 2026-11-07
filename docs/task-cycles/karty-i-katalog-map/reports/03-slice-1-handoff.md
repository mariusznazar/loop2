# Handoff - slice 1 (stage: make-change, "a slice, or the retry of a slice")

You make slice 1 of the plan of the task cycle `karty-i-katalog-map` (screen Mapy, card of a map, section "Kto idzie"). You are a fresh executor; the model class set for you by the plan is `cheaper`.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. Never ask the human. A question you cannot settle from your reading goes back in your report with the status `questions`; an open design choice the code shows returns with the status `returned` and no code (see the method).

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`; the slice's base is `afe592060eefe7a33c120b62250b13bdc91f1fe4`. The-way is the worktree's `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for a slice (a file the method names only when the step that names it comes). Its project skill is `the-way-make-change`.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/03-slice-1-report.md`. Return only: status, your commits, a one-line check result naming what failed or did not run, and the report path. The report must hold each check with its command and exit code, the section **Searches not found or unclear** (items or `none`), the own-work check the method asks for, every reach beyond this handoff (what, where, why) and your questions and concerns.
- Commit on the task branch with `git add <path> ...` by path (never `git add -A`, `git add .` or `git commit -a`), in English in the form of this repository's commits (`feat: :sparkles: ...`, `test: :white_check_mark: ...`, `docs: :memo: ...`, `refactor: :recycle: ...`; see `git log` for the form), each message ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean.
- The checks of your slice are the focused checks its section names, run as it names them; you run no full `npm test` (the orchestrator runs the gate). `npm test -- <one file>` runs exactly one file.
- Project rules: read `AGENTS.md`; the guideline files named in your slice's *Read* each whole.
- Product language: code, identifiers, comments and commit messages in English; game text, test names and guideline prose in the language of the files you change (Polish where they are Polish). Do not rewrite files into another language.

## Names of foundation entries since the plan was written

The foundation entries were written before slice 1 by the foundation step (commit `afe5920`). In your *Read*, "Settlement 1..6" and "(new) ..." entries have these identifiers: (new) What does the screen Mapy show? = D-325; (new) What does the game say before an earning loop that earns nothing? = D-326; Settlement 1 = D-327; Settlement 2 = D-328; Settlement 3 = D-329; Settlement 4 = D-330; Settlement 5 = D-331; Settlement 6 = D-332. Read each entry the section names whole, from its `### D-nnn` heading to the next `###` heading.

Current line ranges in `foundations/decisions.md` (they differ from the ranges in the copied section; the current ones hold; find an entry by its heading when in doubt): `D-38` lines 831-845 | `D-39` lines 846-860 | `D-40` lines 861-875 | `D-43` lines 906-920 | `D-44` lines 921-935 | `D-134` lines 2547-2565 | `D-166` lines 3049-3068 | `D-188` lines 3394-3406 | `D-217` lines 4037-4049 | `D-244` lines 4865-4883 | `D-251` lines 5077-5099 | `D-274` lines 5745-5783 | `D-275` lines 5784-5810 | `D-276` lines 5811-5848 | `D-277` lines 5849-5868 | `D-279` lines 5892-5915 | `D-280` lines 5916-5963 | `D-281` lines 5964-5999 | `D-282` lines 6000-6025 | `D-287` lines 6110-6137 | `D-325` lines 7057-7071 | `D-326` lines 7072-7086 | `D-327` lines 7087-7101 | `D-328` lines 7102-7116 | `D-329` lines 7117-7131 | `D-330` lines 7132-7146 | `D-331` lines 7147-7161 | `D-332` lines 7162-7176.

## Your slice, copied word for word from `docs/task-cycles/karty-i-katalog-map/plan.md`

### Slice 1 — Styleguide of the screen Mapy and of the main look of „Wejdź”

- **Goal:** `guidelines/styleguide-browser-view.md` carries the look of what this task adds (To do
  9), written as the column „The cycle's author, in `implement-task`” of the project skill
  `the-way-maintain-styleguide` gives — the file written from the task document after
  `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md`,
  each rule citing its decisions by the identifiers the plan's *Foundation entries* got. The rule
  "Menu bar, the menu „Konto” and the list of programs" holds the item „Mapy” between „Siedziba” and
  „Programy”, a link to `#/mapy`, marked on `#/mapy` and on `#/mapy/{map}` (To do 1). A rule of the
  screen Mapy gives the look of its two areas: the list of maps — each row a link with the map's name
  and, for a solved map, „rozwiązana” in `positive` after it; the picked row as the picked program on
  the list of programs, text in `text-strong` and a bar in `selected` on its left; the right area
  before a pick, „Wybierz mapę z listy.” in `text-secondary`; the card of a map with its heading and
  parts as To do 4 gives them; and the section „Kto idzie” with its lines at each character as To do
  5 and 6 give them. Where the task names no role for a part, the rule takes the role whose meaning
  D-39 or D-40 already gives (a name of a section in `text-label`, a description in
  `text-secondary`, what fails to happen in `warning`), never a new role, meaning or token value. The
  rules "Main button, secondary action and tab" and "States of shared controls" take the settlement
  the first left to the task of the screen: „Wejdź” at each character in „Kto idzie” has the main look
  though it sends no form, drawn by the new kind `main` of the shared button
  (`createButton(text, { kind: "main" })`, `<ReactButton kind="main">`, the class `main`), which
  slice 3 adds, and „Puść w pętlę” beside it stays the plain button (D-274 as rewritten). A look the
  task and the decisions do not settle is no rule: the agent names it in its report.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:27-73` To do ·
  `docs/task-cycles/karty-i-katalog-map/task.md:112-127` Questions to settle, questions 6 to 8 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:167-176` Context ·
  `docs/task-cycles/karty-i-katalog-map/task.md:193-281` Decisions in play ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlements 1, 3, 4 and 5, (new) What does the screen Mapy show?, (new) What
  does the game say before an earning loop that earns nothing?, D-134, D-188, D-251, D-280, D-281,
  D-287, D-274, D-217 and D-244 as written ·
  `foundations/decisions.md:831-845` D-38 · `foundations/decisions.md:846-860` D-39 ·
  `foundations/decisions.md:861-875` D-40 · `foundations/decisions.md:906-920` D-43 ·
  `foundations/decisions.md:921-935` D-44 · `foundations/decisions.md:3048-3067` D-166 ·
  `foundations/decisions.md:5743-5777` D-274 · `foundations/decisions.md:5778-5804` D-275 ·
  `foundations/decisions.md:5805-5842` D-276 · `foundations/decisions.md:5843-5862` D-277 ·
  `foundations/decisions.md:5886-5909` D-279 · `foundations/decisions.md:5910-5953` D-280 ·
  `foundations/decisions.md:5954-5986` D-281 · `foundations/decisions.md:5987-6011` D-282 ·
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:118-133` agent-workflow ·
  `.claude/skills/the-way-maintain-styleguide/SKILL.md` ·
  `.the-way/product-guidelines/styleguide/SKILL.md` · `.the-way/product-guidelines/template.md` ·
  `.the-way/product-guidelines/styleguide/template.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/menu-bar.tsx:60-82` · `src/browser/styles.css:660-800` ·
  `src/browser/view/controls/button.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** the plan's *Foundation entries*

## Plan's Choices and notes

The plan's *Choices* (plan.md lines 641-660) bind where your slice's *Read* names them. The orchestrator's notes at the end of plan.md (section "Orchestrator's notes") apply.
