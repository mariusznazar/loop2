# Handoff — executor of slice 11 (`make-change`, a slice)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`. **Your base** (the head of the branch when you start): `856fa86063c3b23533ee75ce556c5db47c475d61`; commit only on this branch; never reset it, never rebase, never touch another worktree. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; your variant is **"a slice, or the retry of a slice"**: read `.the-way/task-cycle/change/slice.md` whole as that row gives. Read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface (the slices that touch `src/browser/view/` do not need a screenshot unless their section says so) — a state check by code and tests is what the plan asks. Do not call a skill; read the files.
- Your stage and its boundary: make **only this slice** (its section below), run its focused checks, commit, and return. Nothing of another slice; no foundation entry beyond what this section names; no change of the plan or the spec (a disagreement of the plan and the code is `slice.md`'s case).
- Your directory for working copies: `.runs/executor-11/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-11-report.md`; its first line is yours (status). It holds what `make-change` section 6 gives: the checks with their command and exit code, the own-work check, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs, reports and findings — are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`); irreversible operation **no**. This slice's risk: trust boundary — `src/browser/sim/saved-game.ts`.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks named in the section's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); run only those and the typecheck, ESLint and Prettier on the files you change. Never skip a hook or a check. Commit by path (`git add <path> …`), never `git add -A`, `git add .` or `git commit -a`; the message in English, the first line in the style of the repository's commits (type, emoji, what and why).
- Where the slice leaves a test failing that a later slice owns (the section says which), do not change that test and do not make it pass by code of this slice that the section does not give; name it in your report.
- The size rule of D-425 (200 lines of code for a function, 800 for a file, comments and blank lines not counted) binds every file you change: run `node tests/quality/eslint-size-rules.mjs` on the tree before you return, and name the result.

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your slice (the plan's section, copied word for word)

### Slice 11 — The saved game state's shape at version 10

- **Goal:** `SAVED_GAME_VERSION` in `src/browser/sim/saved-game.ts` rises to 10, since a new item changes
  `Backpack` and two new ordinary actions change the keys of `minutesByAction` (`guidelines/coding-saved-game.md`,
  „Wersja podnoszona razem z kształtem”). In `tests/sim/saved-game.test.mjs` the document of the current version is
  written anew at version 10, filling every optional branch with the new shape — backpacks and the chest holding
  the bandage, `minutesByAction` holding `craft` and `tend`, programs, a copy and an earning loop's program holding
  rules of both verbs with the bandage as their target, an activity of each — and loads into the state it
  describes; the document of version 9 stays in the test, refused as `version` as the earlier ones are. Crafted
  documents of version 10 are refused whole as `shape`: „Wytwórz” or „Opatrz” with a target the data do not give
  the verb (moss, a resource of no recipe, an identifier the data lack, no `item`, a field beyond `kind` and
  `item`) in a program, a copy, a base, an earning loop's program or an activity; a backpack whose keys are not
  exactly the data's items, the bandage missing included; a tile whose stock names the bandage; the cases of
  today kept. No value a document can hold throws, the new fields included. The report sorts each changed file as
  one-time for the model (*To do* 14).
- **Change:** `src/browser/sim/saved-game.ts` · `tests/sim/saved-game.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-saved-game.md` ·
  `guidelines/coding-simulation-module.md` · `src/browser/AGENTS.md` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/actions.ts` ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:138-139` Context ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:85-87` Constraints ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:359-367` Trust boundary — crafted input ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:381-384` Irreversible operation ·
  `foundations/decisions.md:3905-3956` D-206 · `foundations/decisions.md:675-718` D-213 ·
  `foundations/invariants.md:1048-1056` save-version · `foundations/part_map.md:34-65` simulation
- **Model:** same — the saved game's shape and its crafted-input refusals, against a test file of 157 000 characters
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** first the failing case of the current version's document at version 10; then
  `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/previous-programs.test.mjs`
- **Depends on:** Slice 10

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:138-139` Context

```text
- Każda zmiana kształtu stanu gry podnosi wersję zapisu, a gra odrzuca zapis innej wersji (D-206); definicja przyjmuje to wprost: „każda zmiana kształtu stanu w tym projekcie kasuje zapis”.
- Opatrunek jest nowym przedmiotem danych, a „Wytwórz” i „Opatrz” nowymi zwykłymi czynnościami, więc wersja kształtu zapisu rośnie (`src/browser/sim/saved-game.ts`, komentarz przy `SAVED_GAME_VERSION`; `guidelines/coding-saved-game.md`).
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:85-87` Constraints

```text
- The saved game state's version rises: a new item changes `Backpack`, and two new ordinary actions
  change the keys of `minutesByAction` (`guidelines/coding-saved-game.md`, „Wersja podnoszona razem
  z kształtem”; D-206; *Context*).
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:359-367` Trust boundary — crafted input

```text
### Trust boundary — crafted input

- `src/browser/sim/saved-game.ts`: a program, a copy, a base or an earning loop's program holding
  „Wytwórz” or „Opatrz” with a target the data do not give the verb (moss, a resource of no recipe, an
  identifier the data lack, no `item`, an extra field), an activity holding such an action, a backpack,
  chest, trip list, burning item or Understanding naming an item the data lack, a backpack whose keys are
  not exactly the data's items (the bandage missing included), a tile whose stock names the bandage —
  each refused whole as `shape`; a document of version 9 refused as `version`. Nothing throws for a
  value a document can hold.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:381-384` Irreversible operation

```text
### Irreversible operation

None in this cycle. The raised version clears the players' saved games once deployed, which the task
accepts (*Context*, D-206) and the cycle does not do.
```

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:3905-3957` D-206
- `foundations/decisions.md:675-719` D-213
- `foundations/invariants.md:1048-1057` save-version
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/part_map.md:34-65` simulation

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/coding-saved-game.md`
- `guidelines/coding-simulation-module.md`
- `src/browser/AGENTS.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files you change (the slice's *Change*; read each whole before you change it; a file that does not exist yet you create)

- `src/browser/sim/saved-game.ts`
- `tests/sim/saved-game.test.mjs`

## Other files of code and tests to read (whole, or in the range named)

- `src/browser/sim/data/items.ts`
- `src/browser/sim/data/actions.ts`


## What you return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. Commit everything of the slice before you return; leave the worktree clean.
