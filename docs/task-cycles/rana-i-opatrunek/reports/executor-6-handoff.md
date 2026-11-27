# Handoff — the executor of a slice of the task rana-i-opatrunek, Slice 6

You make one slice of a planned change in a task cycle of the-way, as an agent of the type `the-way-stage`.

## Delegation and boundary

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator. You never ask the human; a question goes back to the orchestrator in your report (status `questions`, as `make-change` section 6 gives), each with the answer you recommend. What the orchestrator answers is never the human's approval.

- You make: **slice 6** (`make-change` variant „a slice, or the retry of a slice”). Read `.the-way/task-cycle/change/SKILL.md` whole and, because you make a slice, `.the-way/task-cycle/change/slice.md` whole; read `ui_check.md` and `walkthrough.md` beside the `SKILL.md` only where its sections 3 and 6 send you to them for what your slice changes.
- Worktree and working directory: `the worktree's root` (branch `task/rana-i-opatrunek`). The pinned the-way is the worktree's `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`. Work only on this branch, one agent at a time on it.
- The base of this slice: `17a80c095368a46b97a7ca549ebac3f1757d6596` (`git rev-parse HEAD` shows it when you start). Your range is from it to your head.
- Your directory for working copies: `.runs/executor-6/` (relative to the worktree).
- Your report: `.runs/task-cycles/rana-i-opatrunek/reports/executor-6-report.md` (that file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it, so its name begins with the role; where your tool refuses the write, return the report whole as your answer). The cycle record `cycle.md` and the other files of the record directory — other agents' handoffs, reports, findings, the plan — are not yours to read.
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

### Slice 6 — The version of the saved game's shape rises to 12

- **Goal:** `SAVED_GAME_VERSION` of `src/browser/sim/saved-game.ts` is 12 (To do, item 9; D-206):
  a saved game of version 11 in which „Wytwórz” is already discovered would never get the tree
  `tending`, which enters only with a pair discovered in a minute (D-195), and a combat record may
  now hold a turn of Ucisk. The comment over the constant says so. In `tests/sim/saved-game.test.mjs`
  the document of version 11 stays, written out, as an old one, refused as `version` like those
  before it; the document of the current version, version 12, is version 11 with what the change
  adds, filling each new optional branch: a character with practice and bought ranks of `tending`,
  Ucisk among them, the tree among the known ones, a combat record with a turn of Ucisk that
  refilled an empty pocket and one that took from a pocket, practice of `tending` in the map run
  and in its combat; it loads into the state it describes. Crafted documents of version 12 are
  refused whole as `shape`: a turn of Ucisk with damage other than 0, Ucisk as the ordinary activity
  of a map run, a rank of a branch of `tending` above its prices or in a tree the Understanding
  lacks. In `tests/sim/previous-programs.test.mjs` the table of readable versions gains version 12
  and its precondition names it the current version. The header comment of the saved-game test
  tells version 12 as the others are told.
- **Change:** `src/browser/sim/saved-game.ts` · `tests/sim/saved-game.test.mjs` ·
  `tests/sim/previous-programs.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-saved-game.md` · `guidelines/testing.md` ·
  `tests/sim/saved-game.test.mjs:1-264` header, programs and skills ·
  `tests/sim/saved-game.test.mjs:945-1172` the document of version 10, the gear, the current
  document and its first tests · `tests/sim/saved-game.test.mjs:1387-1600` the refusal of each old
  version · `tests/sim/saved-game.test.mjs:2982-3210` the crafted documents of the gear and the
  combat record · `tests/sim/previous-programs.test.mjs:120-290` the readable versions ·
  `src/browser/sim/types.ts` · `src/browser/sim/data/skills.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:41-41` To do, item 9 ·
  `foundations/decisions.md:3918-3970` D-206 · `foundations/decisions.md:7359-7376` D-195 ·
  `foundations/decisions.md:7279-7299` D-191 · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/invariants.md:1378-1387` previous-save-programs-reader ·
  `foundations/part_map.md:34-66` simulation
- **Model:** same — the reader at the trust boundary and its long test are judged together
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` (the current document of version 12
  written first, refused on the base of the slice) · `npm test -- tests/sim/previous-programs.test.mjs` ·
  `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/sim/loop-record.test.mjs` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm run typecheck`
- **Depends on:** Slice 5

## Current ranges of the foundation entries your section's *Read* names

The foundation step changed `foundations/decisions.md` before your base, so the lines moved. The ranges below hold; the entry is the range from its heading to the next heading. Invariants, the glossary and the part map stand as the plan gives them.

- D-206: `foundations/decisions.md:3918-3970` (the plan's base range 3918-3970)
- D-195: `foundations/decisions.md:7384-7401` (the plan's base range 7359-7376)
- D-191: `foundations/decisions.md:7304-7324` (the plan's base range 7279-7299)

## Passages of the task your section's *Read* names (word for word)

#### `task_frozen.md:41-41` — To do, item 9

9. Wersja kształtu zapisanego stanu gry rośnie o jeden. Zapis, w którym „Wytwórz” jest już odkryte, nie dostałby nowego drzewa: drzewo wchodzi do Zrozumienia z czynnością odkrytą w tej chwili (D-195; `src/browser/sim/understanding.ts`, drzewa wyliczane z czynności, których Zrozumienie jeszcze nie ma), a gra odrzuca zapis innej wersji (D-206). Wytyczna `guidelines/coding-saved-game.md` mówi o zmianie umiejętności postaci i gałęzi ich drzew, że „nie podnosi wersji sama” — tu podnosi ją ten skutek, tak jak zadanie 5 podniosło wersję przy „Wytwórz” i „Opatrz”.

## What to read, besides those

The guideline files and the code and test files your section's *Read* names, each whole (a file given with a range of lines: that range), before you change them; reach for more only as `make-change` section 1 says, and name each reach in your report.
