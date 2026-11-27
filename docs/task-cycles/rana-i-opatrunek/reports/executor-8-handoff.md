# Handoff — the executor of a slice of the task rana-i-opatrunek, Slice 8

You make one slice of a planned change in a task cycle of the-way, as an agent of the type `the-way-stage`.

## Delegation and boundary

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator. You never ask the human; a question goes back to the orchestrator in your report (status `questions`, as `make-change` section 6 gives), each with the answer you recommend. What the orchestrator answers is never the human's approval.

- You make: **slice 8** (`make-change` variant „a slice, or the retry of a slice”). Read `.the-way/task-cycle/change/SKILL.md` whole and, because you make a slice, `.the-way/task-cycle/change/slice.md` whole; read `ui_check.md` and `walkthrough.md` beside the `SKILL.md` only where its sections 3 and 6 send you to them for what your slice changes.
- Worktree and working directory: `the worktree's root` (branch `task/rana-i-opatrunek`). The pinned the-way is the worktree's `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`. Work only on this branch, one agent at a time on it.
- The base of this slice: `82da905e5b0c5a6b5edf057ae961f78ffe64b6f1` (`git rev-parse HEAD` shows it when you start). Your range is from it to your head.
- Your directory for working copies: `.runs/executor-8/` (relative to the worktree).
- Your report: `.runs/task-cycles/rana-i-opatrunek/reports/executor-8-report.md` (that file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it, so its name begins with the role; where your tool refuses the write, return the report whole as your answer). The cycle record `cycle.md` and the other files of the record directory — other agents' handoffs, reports, findings, the plan — are not yours to read.
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
- Q3 (the orchestrator's answer, an autonomous choice recorded in the cycle): the units of the previews are in the data (Slice 2 wrote them): „zdrowia” for „Mocniejszy zwój”, „min” for „Wprawna dłoń”, „zdrowia na minutę” for „Szybkie gojenie”; the view reads them from the data and names none by a literal.

## Your section of the plan (word for word)

### Slice 8 — The values of the numerical branches on the screen Postać

- **Goal:** `branchText` of `src/browser/view/character-skills.ts` writes a value of a numerical
  branch with the decimal comma where it has a fraction and with no trace of the computer's
  rounding — „Szybkie gojenie” reads „teraz 0,05 … → po kupnie 0,1 …” and „0,15”, never
  „0.15000000000000002” (To do, item 4; the styleguide's sentence on a number with a fraction in
  the sentence of a rule) — and gives Ucisk its price and no before-and-after values, as
  „Obchód”, „Czysty płomień” and „Zwiad” (D-199). New cases, written first, in
  `tests/view/character-skills.test.mjs` hold the words of the four branches of „Opatrywanie małych
  ran” at each rank, their descriptions from the data, and the values of the existing branches as
  they read today.
- **Change:** `src/browser/view/character-skills.ts` · `tests/view/character-skills.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/data/skills.ts` · `src/browser/view/character-trees.tsx` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:32-32` To do, item 4 ·
  `foundations/decisions.md:7433-7462` D-199 · `foundations/decisions.md:7549-7575` D-379 ·
  `foundations/part_map.md:3-33` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/character-skills.test.mjs` (its new cases written first,
  failing on the base of the slice) · `npm test -- tests/view/character-screen.test.mjs` ·
  `npm test -- tests/view/knowledge-screen.test.mjs` · `npm run typecheck`
- **Depends on:** Slice 4 · D-199

## Current ranges of the foundation entries your section's *Read* names

The foundation step changed `foundations/decisions.md` before your base, so the lines moved. The ranges below hold; the entry is the range from its heading to the next heading. Invariants, the glossary and the part map stand as the plan gives them.

- D-199: `foundations/decisions.md:7458-7490` (the plan's base range 7433-7462)
- D-379: `foundations/decisions.md:7577-7612` (the plan's base range 7549-7575)

## Passages of the task your section's *Read* names (word for word)

#### `task_frozen.md:32-32` — To do, item 4

4. Ekran Postać pokazuje nowe drzewo i jego gałęzie tak jak pozostałe (D-199), a Ucisk jako gałąź, która nie jest liczbą: z ceną, bez wartości „teraz → po kupnie”. Gałęzie liczbowe mają opisy ze starej gry (umiejętność `tending`, pole `hint`): „Mocniejszy zwój” — „Opatrunek leczy więcej.”, „Wprawna dłoń” — „Opatrujesz szybciej.”, „Szybkie gojenie” — „Rany schodzą same szybciej — cecha, działa zawsze.”; Ucisk ma za opis zdanie koncepcji gry: „Opatrzenie w trakcie starcia, za turę zamiast za dziesięć minut.” Wartości „Szybkiego gojenia” stoją z przecinkiem dziesiętnym, jak liczby z ułamkiem w innych miejscach gry (`guidelines/styleguide-browser-view.md`, zdanie „Liczba z ułamkiem w zdaniu reguły stoi z przecinkiem dziesiętnym”), i bez śladu zaokrąglania liczb przez komputer: „0,15”, nie „0.15000000000000002”.

## What to read, besides those

The guideline files and the code and test files your section's *Read* names, each whole (a file given with a range of lines: that range), before you change them; reach for more only as `make-change` section 1 says, and name each reach in your report.
