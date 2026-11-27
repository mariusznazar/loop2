# Handoff — the executor of a slice of the task rana-i-opatrunek, Slice 7

You make one slice of a planned change in a task cycle of the-way, as an agent of the type `the-way-stage`.

## Delegation and boundary

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator. You never ask the human; a question goes back to the orchestrator in your report (status `questions`, as `make-change` section 6 gives), each with the answer you recommend. What the orchestrator answers is never the human's approval.

- You make: **slice 7** (`make-change` variant „a slice, or the retry of a slice”). Read `.the-way/task-cycle/change/SKILL.md` whole and, because you make a slice, `.the-way/task-cycle/change/slice.md` whole; read `ui_check.md` and `walkthrough.md` beside the `SKILL.md` only where its sections 3 and 6 send you to them for what your slice changes.
- Worktree and working directory: `the worktree's root` (branch `task/rana-i-opatrunek`). The pinned the-way is the worktree's `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`. Work only on this branch, one agent at a time on it.
- The base of this slice: `e2850d3ffdf2379e794513a2f40994d959b08e28` (`git rev-parse HEAD` shows it when you start). Your range is from it to your head.
- Your directory for working copies: `.runs/executor-7/` (relative to the worktree).
- Your report: `.runs/task-cycles/rana-i-opatrunek/reports/executor-7-report.md` (that file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it, so its name begins with the role; where your tool refuses the write, return the report whole as your answer). The cycle record `cycle.md` and the other files of the record directory — other agents' handoffs, reports, findings, the plan — are not yours to read.
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
- Q1 (the orchestrator's answer, an autonomous choice recorded in the cycle): the words of the refill of an empty pocket stand in `GEAR_PLACES.pocket.refill` of `src/browser/sim/data/gear.ts` as „bierze opatrunek z plecaka do kieszeni”; the paragraph then reads „Mag bierze opatrunek z plecaka do kieszeni” and the chronicle „Bierze opatrunek z plecaka do kieszeni” (no actor). D-340 is not changed: its general sentence covers a pocket.
- Q2 (the orchestrator's answer, an autonomous choice recorded in the cycle): the element of the encounter's paragraph for a turn of Ucisk is „Mag uciska ranę: zdrowie {h}/{pełne}”, with the mage's health after the turn (from the turn's record, `characterHealth`); the action's `status` „Uciska ranę” is Slice 4's, in the data.

## Your section of the plan (word for word)

### Slice 7 — Ucisk and the refill of a pocket in the paragraph of an encounter and in the chronicle

- **Goal:** The paragraph of an encounter (D-147) gives a turn of Ucisk as an element of its own,
  „Mag …” in the words and with the health that question 2 of the planner's report settles (the
  orchestrator gives them in the handoff), and a turn whose piece was taken from the backpack into
  an empty pocket first gives the refill as an element before it, as the refill of the main hand
  is given today (D-457); the chronicle gives that refill as an entry of its own with no actor, at
  the minute the turns resolve (D-340). The refill's words stand in the row of the place `pocket`
  of `GEAR_PLACES` in `src/browser/sim/data/gear.ts` (`refill`), as question 1 of the planner's
  report settles them; `src/browser/view/combat-line.ts` and `src/browser/view/chronicle-entries.ts`
  read the words of the place the refilled action takes its piece from instead of the main hand's
  alone, and name no item or place by a literal (content-identifiers). New cases, written first, in
  `tests/view/gear-words.test.mjs` and `tests/view/combat-line.test.mjs` hold both; the cases of the
  main hand stay as they are.
- **Change:** `src/browser/sim/data/gear.ts` · `src/browser/view/combat-line.ts` ·
  `src/browser/view/chronicle-entries.ts` · `tests/view/gear-words.test.mjs` ·
  `tests/view/combat-line.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:31-31` To do, item 3 ·
  `foundations/decisions.md:7074-7106` D-147 · `foundations/decisions.md:11595-11639` D-340 ·
  `foundations/decisions.md:12787-12799` D-457 · `foundations/decisions.md:7007-7035` D-144 ·
  `foundations/invariants.md:236-247` content-identifiers · `foundations/part_map.md:3-33`
  browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/gear-words.test.mjs` · `npm test -- tests/view/combat-line.test.mjs`
  (their new cases written first, failing on the base of the slice) ·
  `npm test -- tests/view/chronicle-entries.test.mjs` · `npm test -- tests/view/chronicle.test.mjs` ·
  `npm test -- tests/sim/rules.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm run typecheck`
- **Depends on:** Slice 4

## Current ranges of the foundation entries your section's *Read* names

The foundation step changed `foundations/decisions.md` before your base, so the lines moved. The ranges below hold; the entry is the range from its heading to the next heading. Invariants, the glossary and the part map stand as the plan gives them.

- D-147: `foundations/decisions.md:7093-7125` (the plan's base range 7074-7106)
- D-340: `foundations/decisions.md:11634-11678` (the plan's base range 11595-11639)
- D-457: `foundations/decisions.md:12826-12838` (the plan's base range 12787-12799)
- D-144: `foundations/decisions.md:7012-7048` (the plan's base range 7007-7035)

## Passages of the task your section's *Read* names (word for word)

#### `task_frozen.md:31-31` — To do, item 3

3. Kupiona gałąź Ucisk otwiera czynność walki „Ucisk — {rzecz}”, tak jak gałąź „Obchód” otwiera „Obchód — {zasób}” (pytanie Q1); jej cele to przedmioty, którym dane gry dają leczenie — dziś sam opatrunek. W turze walki zużywa jedną sztukę z kieszeni pasa — miejsca „pod ręką” wyposażenia postaci, które wnosi zadanie 8 — a pusta kieszeń uzupełnia się z plecaka tak, jak zadanie 8 uzupełnia miejsca pod ręką; „Opatrz” poza walką dalej bierze opatrunek z plecaka (pytanie Q5). Dane opatrunku mówią, że pasuje do kieszeni pasa, jeśli nie mówi tego już zadanie 8. Ucisk przywraca tyle zdrowia, co „Opatrz” tym samym przedmiotem — dziś 25, więcej o kupione stopnie „Mocniejszego zwoju” — nigdy ponad pełne zdrowie; przy pełnym zdrowiu się nie wykonuje (pytanie Q7, część 1). „Opatrz” dalej nie działa w walce (D-140, D-145). Gracz widzi przy Ucisku to, co reguły gry dają każdej czynności: czas „tura” (D-293); w komórce wyboru czynności bez ceny, a przy celu i przy wybranej czynności cenę, np. „Ucisk — Opatrunek (1 opatrunek)” (D-363); powody odmowy „zdrowie pełne” przed „brakuje {ile} × {rzecz}”, ten drugi wtedy, gdy opatrunku nie ma ani w kieszeni, ani w plecaku, z którego kieszeń się uzupełnia (D-380); poza walką regułę bursztynową z powodem „tylko w walce” (D-309); bez kupionej gałęzi powód „gałąź niewykupiona” (D-289). Ucisk ma tę samą ikonę co „Opatrz”, `bandage-roll` (pytanie Q7, część 2), i stoi w wyborze czynności w grupie „Żywność i walka”, za „Odskocz” (pytanie Q7, ustawienie domyślne).

## What to read, besides those

The guideline files and the code and test files your section's *Read* names, each whole (a file given with a range of lines: that range), before you change them; reach for more only as `make-change` section 1 says, and name each reach in your report.
