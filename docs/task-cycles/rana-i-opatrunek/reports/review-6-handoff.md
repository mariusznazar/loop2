# Handoff — the reviewer of Slice 6 of the task rana-i-opatrunek

You review one slice of a planned change in a task cycle of the-way, with `review-change`, as an agent of the type `the-way-stage` that did not make it. You are read-only on the reviewed worktree.

## What you review and how

- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; the slice is not the whole change, so `whole_change.md` and `fix.md` are not yours.
- Range: base `17a80c095368a46b97a7ca549ebac3f1757d6596` to head `e2850d3ffdf2379e794513a2f40994d959b08e28`. Compute the diff yourself: `git diff 17a80c09..e2850d3f` and `git log 17a80c09..e2850d3f`; `git rev-parse HEAD` in the worktree must show the head `e2850d3ffdf2379e794513a2f40994d959b08e28` — on a mismatch ask as a question.
- Worktree: `the worktree's root` (branch `task/rana-i-opatrunek`). Never change it, its index or its branch. Run checks that need changed files in a worktree of the head commit in `.runs/review-6/` (relative to the worktree; `.the-way` populated by `git submodule update --init -- .the-way`, `node_modules` a junction to the main checkout's `the `node_modules` of the main checkout`), and remove it before you return (remove the junction first with `rmdir`, never recursively through it).
- Report: `.runs/task-cycles/rana-i-opatrunek/reports/review-6-report.md`, first line `PASS <head sha>` or `FAIL <head sha>` and nothing else (the report file is the input of the cycle's scripts; its name begins with the role). The executor's report, to verify as claims and not as evidence: `.runs/task-cycles/rana-i-opatrunek/reports/executor-6-report.md`. The cycle record `cycle.md` and the other files of the record directory are not yours.
- **Risk of this slice: trust boundary — `src/browser/sim/saved-game.ts` (the version of the shape rises 11 to 12 here)**
- The frozen task: `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` (sha256 `55c86eaf63df7156`); you open only the passages copied below. You judge the slice against those passages, not the plan alone. The answers of step 4: the change touches a trust boundary (the part map names `src/browser/sim/saved-game.ts`); no irreversible operation.
- Run the mutation tool the testing guidelines adopt on the changed simulation ranges where the guidelines ask the reviewer to (with a narrowed configuration of your own in `.runs/review-6/`, not the repository's, if the repository's would abort on a test of a later slice).

## What the orchestrator tells you

- Check crafted input at the boundary: a document of the current version (12) that holds a combat record with a turn of Ucisk with damage other than 0, Ucisk as an ordinary activity of a map run, a rank of a branch of the tree „Opatrywanie małych ran” above its prices or in a tree the Understanding lacks; a document of version 11 and older must be refused as `version`, whole. The reader is a reader of shape (`guidelines/coding-saved-game.md`).
- The test file `tests/sim/saved-game.test.mjs` changed by 461 lines; judge that the document of version 11 stays written out as an old one and that the document of version 12 is not a copy that passes whatever the reader does (a test must fail when the reader accepts what it must refuse).
- Known, not a finding of this slice: Minor findings of Slice 4's own review (a saved fight with turns of Ucisk loads for a character who never bought the branch — M-1; the crafted documents of Ucisk stand in `pressure.test.mjs` — M-2); the executor of this slice walked a version-11 save through the running game in a real browser and says so in its report (verify the claim as a claim).
- The decisions D-144, D-150, D-145, D-380, D-363, D-290, D-379 and D-120 were changed by the foundation step before Slice 1; the code must agree with them as they stand.


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

## The slice's section of the plan (word for word) — what the executor was given

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

## What the executor read, and what you read

The guideline files and the code and test files your section's *Read* names, each whole (a file given with a range of lines: that range), before you change them; reach for more only as `make-change` section 1 says, and name each reach in your report.
