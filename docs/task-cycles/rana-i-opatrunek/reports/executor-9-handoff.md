# Handoff — the executor of a slice of the task rana-i-opatrunek, Slice 9

You make one slice of a planned change in a task cycle of the-way, as an agent of the type `the-way-stage`.

## Delegation and boundary

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator. You never ask the human; a question goes back to the orchestrator in your report (status `questions`, as `make-change` section 6 gives), each with the answer you recommend. What the orchestrator answers is never the human's approval.

- You make: **slice 9** (`make-change` variant „a slice, or the retry of a slice”). Read `.the-way/task-cycle/change/SKILL.md` whole and, because you make a slice, `.the-way/task-cycle/change/slice.md` whole; read `ui_check.md` and `walkthrough.md` beside the `SKILL.md` only where its sections 3 and 6 send you to them for what your slice changes.
- Worktree and working directory: `the worktree's root` (branch `task/rana-i-opatrunek`). The pinned the-way is the worktree's `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`. Work only on this branch, one agent at a time on it.
- The base of this slice: `8829f36f208efa93b124ad950a343908f4bdbb2c` (`git rev-parse HEAD` shows it when you start). Your range is from it to your head.
- Your directory for working copies: `.runs/executor-9/` (relative to the worktree).
- Your report: `.runs/task-cycles/rana-i-opatrunek/reports/executor-9-report.md` (that file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it, so its name begins with the role; where your tool refuses the write, return the report whole as your answer). The cycle record `cycle.md` and the other files of the record directory — other agents' handoffs, reports, findings, the plan — are not yours to read.
- The frozen task: `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` (sha256 `55c86eaf63df7156`); you open only the passages copied below. The plan is not yours to open: your section is copied below.
- Answers of the cycle's start: the change touches a trust boundary (the part map names `src/browser/sim/saved-game.ts`); this slice's *Risk* is stated in its section. Where it names the boundary, a reviewer of its own checks crafted input there.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## Notes of the orchestrator

- The tests of this slice are run one file at a time as the *Checks* name them (`npm test -- <file>`; a Python test through the command the testing guidelines give). Where a command of the *Checks* does not run as written, find the way in `guidelines/testing.md`, run it, and report the command you actually ran. **Never run the product's whole suite** (`npm test` with no file): its run is the cycle's own, after the start signal of the day's advisor, and CI's.
- `node_modules` in the worktree is a junction to the main checkout's; leave it. The first run of a Python test may make the environment `.runs/quality-venv` (needs network access to the Python Package Index); that is a file the product's tools make, no working copy of yours.
- Commit by path (`git add <file>…`; never `git add -A`, `git add .` or `git commit -a`), run the checks after `git add` of every file you create, and commit in English as the repository's earlier commits are worded (a type, an emoji, a sentence, the decisions in brackets). Do not push. Write code, identifiers and comments in English; what the game shows the player stays in Polish.
- Make this slice only. Where the plan and the code disagree in a structural way, stop and report (`slice.md`).

## Your section of the plan (word for word)

### Slice 9 — Ucisk in the pick of the program editor

- **Goal:** The rule panel shows Ucisk as the rules of the game give it to every action, which the
  view already computes from the data: in the group „Żywność i walka” after „Odskocz” and before
  „Załóż” (D-290), with the icon of „Opatrz” (row 10), no price at its cell and the price at its
  target, „Opatrunek (1 opatrunek)”, and at the chosen action, „Ucisk — Opatrunek (1 opatrunek)”
  (D-363), the time „tura” (D-293), greyed „gałąź niewykupiona” during a map run of a character
  without the branch and „wybierzesz w przejściu postaci, która ją kupiła” with none (D-289), a
  rule of it amber „tylko w walce” outside the minutes of an attack (D-309). A new
  `tests/view/pressure-pick.test.mjs` holds each of these; where the view does not give one, the
  slice reports it rather than changing a view module, which this slice does not list. The test of
  `tests/view/program-editor.test.mjs` that lists the cells of the groups (lines 1068 to 1118 at the
  plan's base) holds Ucisk in its place and passes again.
- **Change:** `tests/view/pressure-pick.test.mjs` · `tests/view/program-editor.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `tests/view/program-editor.test.mjs:1-80` imports and helpers ·
  `tests/view/program-editor.test.mjs:1068-1118` the cells of the groups ·
  `src/browser/view/program-editor.ts:700-911` the pick of actions, time and price ·
  `src/browser/view/item-target-pick.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:31-31` To do, item 3 ·
  `foundations/decisions.md:9968-9996` D-290 · `foundations/decisions.md:10309-10323` D-363 ·
  `foundations/decisions.md:9635-9665` D-293 · `foundations/decisions.md:9916-9967` D-289 ·
  `foundations/decisions.md:10206-10245` D-309 · `foundations/decisions.md:7377-7400` D-196 ·
  `foundations/part_map.md:3-33` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/pressure-pick.test.mjs` · `npm test -- tests/view/program-editor.test.mjs` ·
  `npm test -- tests/view/item-verb-panel.test.mjs` · `npm test -- tests/view/gear-rule-panel.test.mjs`
- **Depends on:** Slice 4 · D-290 · D-363

## Current ranges of the foundation entries your section's *Read* names

The foundation step changed `foundations/decisions.md` before your base, so the lines moved. The ranges below hold; the entry is the range from its heading to the next heading. Invariants, the glossary and the part map stand as the plan gives them.

- D-290: `foundations/decisions.md:10005-10033` (the plan's base range 9968-9996)
- D-363: `foundations/decisions.md:10346-10362` (the plan's base range 10309-10323)
- D-293: `foundations/decisions.md:9672-9702` (the plan's base range 9635-9665)
- D-289: `foundations/decisions.md:9953-10004` (the plan's base range 9916-9967)
- D-309: `foundations/decisions.md:10243-10282` (the plan's base range 10206-10245)
- D-196: `foundations/decisions.md:7402-7425` (the plan's base range 7377-7400)

## Passages of the task your section's *Read* names (word for word)

#### `task_frozen.md:31-31` — To do, item 3

3. Kupiona gałąź Ucisk otwiera czynność walki „Ucisk — {rzecz}”, tak jak gałąź „Obchód” otwiera „Obchód — {zasób}” (pytanie Q1); jej cele to przedmioty, którym dane gry dają leczenie — dziś sam opatrunek. W turze walki zużywa jedną sztukę z kieszeni pasa — miejsca „pod ręką” wyposażenia postaci, które wnosi zadanie 8 — a pusta kieszeń uzupełnia się z plecaka tak, jak zadanie 8 uzupełnia miejsca pod ręką; „Opatrz” poza walką dalej bierze opatrunek z plecaka (pytanie Q5). Dane opatrunku mówią, że pasuje do kieszeni pasa, jeśli nie mówi tego już zadanie 8. Ucisk przywraca tyle zdrowia, co „Opatrz” tym samym przedmiotem — dziś 25, więcej o kupione stopnie „Mocniejszego zwoju” — nigdy ponad pełne zdrowie; przy pełnym zdrowiu się nie wykonuje (pytanie Q7, część 1). „Opatrz” dalej nie działa w walce (D-140, D-145). Gracz widzi przy Ucisku to, co reguły gry dają każdej czynności: czas „tura” (D-293); w komórce wyboru czynności bez ceny, a przy celu i przy wybranej czynności cenę, np. „Ucisk — Opatrunek (1 opatrunek)” (D-363); powody odmowy „zdrowie pełne” przed „brakuje {ile} × {rzecz}”, ten drugi wtedy, gdy opatrunku nie ma ani w kieszeni, ani w plecaku, z którego kieszeń się uzupełnia (D-380); poza walką regułę bursztynową z powodem „tylko w walce” (D-309); bez kupionej gałęzi powód „gałąź niewykupiona” (D-289). Ucisk ma tę samą ikonę co „Opatrz”, `bandage-roll` (pytanie Q7, część 2), i stoi w wyborze czynności w grupie „Żywność i walka”, za „Odskocz” (pytanie Q7, ustawienie domyślne).

## What to read, besides those

The guideline files and the code and test files your section's *Read* names, each whole (a file given with a range of lines: that range), before you change them; reach for more only as `make-change` section 1 says, and name each reach in your report.
