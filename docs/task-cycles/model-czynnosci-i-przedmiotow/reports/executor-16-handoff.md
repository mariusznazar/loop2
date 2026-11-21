# Handoff — executor of slice 16 (`make-change`, a slice)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`. **Your base** (the head of the branch when you start): `301f9856d4bff0517c712b9c24465b26cf85aec6`; commit only on this branch; never reset it, never rebase, never touch another worktree. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; your variant is **"a slice, or the retry of a slice"**: read `.the-way/task-cycle/change/slice.md` whole as that row gives. Read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface (the slices that touch `src/browser/view/` do not need a screenshot unless their section says so) — a state check by code and tests is what the plan asks. Do not call a skill; read the files.
- Your stage and its boundary: make **only this slice** (its section below), run its focused checks, commit, and return. Nothing of another slice; no foundation entry beyond what this section names; no change of the plan or the spec (a disagreement of the plan and the code is `slice.md`'s case).
- Your directory for working copies: `.runs/executor-16/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-16-report.md`; its first line is yours (status). It holds what `make-change` section 6 gives: the checks with their command and exit code, the own-work check, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs, reports and findings — are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`); irreversible operation **no**. This slice's risk: none.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks named in the section's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); run only those and the typecheck, ESLint and Prettier on the files you change. Before you return also run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` and make sure that no error it lists comes from a file you changed (a `decision:` or `invariant:` line in a test must quote exact words that begin a binding sentence of the entry as the log holds it now; the listed errors of other files and the one of `tests/view/rule-editor.test.mjs` for Slice 15 are not yours). Never skip a hook or a check. Commit by path (`git add <path> …`), never `git add -A`, `git add .` or `git commit -a`; the message in English, the first line in the style of the repository's commits (type, emoji, what and why).
- Where the slice leaves a test failing that a later slice owns (the section says which), do not change that test and do not make it pass by code of this slice that the section does not give; name it in your report.
- **Sorting of the changed files (the task's *To do* 14; your section may say 'the report sorts each changed file').** The request's cost table counts files of code and of tests the trial changed, in two parts: (1) **one-time for the model of actions and items** -- a file changed so that any later item of the same sort can be a row of data (types, the module of targets, the program check, the repertoire, the editor's logic and its panel, the scene's branches, the instrument's description and trace, the invariant tests that write kinds or lists out by hand, the saved game's version) and the tests of that shape; (2) **the bandage alone** -- a file changed for the bandage itself (its row, words, recipe and healing numbers, its tests, its revelation). A file changed for both counts in (1). Icons, foundation entries and guideline files stand beside and are outside the count. In your report give a table of each file you changed with its added/removed lines and its part, (1) or (2), with one sentence of the reason where it is not obvious.
- The size rule of D-425 (200 lines of code for a function, 800 for a file, comments and blank lines not counted) binds every file you change: run `node tests/quality/eslint-size-rules.mjs` on the tree before you return, and name the result.

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your slice (the plan's section, copied word for word)

### Slice 16 — The scene at „Wytwórz” and „Opatrz”

- **Goal:** `tests/view/scene-picture.test.mjs` shows what Slice 7 wrote in `src/browser/view/scene-picture.ts`:
  at „Wytwórz — Opatrunek” and „Opatrz — Opatrunek” the mage stays where it stands (D-318 as row 5 changes it),
  the plaque over its head shows the icon of the verb, and the end of either in a reading starts no effect of a
  gathering there, since both take pieces out of the backpack (D-317, D-367); the plaque of a discovery of the
  bandage shows the bandage's icon from its row. The scene gets no new picture or effect. `scene-picture.ts`
  changes only where these cases show the two verbs handled otherwise than those decisions give. The report sorts
  each changed file as one-time for the model or for the bandage alone (*To do* 14).
- **Change:** `tests/view/scene-picture.test.mjs` · `src/browser/view/scene-picture.ts`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:41-41` To do, item 7, the scene ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:258-262` Decision 3 — The verb with a target, unit 8 ·
  `foundations/decisions.md:11507-11534` D-318, as row 5 changes it · `foundations/decisions.md:11416-11505` D-317 ·
  `foundations/decisions.md:11756-11767` D-367 ·
  `foundations/part_map.md:3-32` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/scene-picture.test.mjs`
- **Depends on:** Slices 7, 12 · Foundation entries row 5

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:41-41` To do, item 7, the scene

```text
   - Scena: przy obu czynnościach mag stoi tam, gdzie stał, jak przy „Zjedz — jagoda”; scena nie dostaje nowego obrazka ani efektu.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:258-262` Decision 3 — The verb with a target, unit 8

```text
8. **The scene and the credits** (`src/browser/view/scene-picture.ts`, `credit-lines.ts`,
   `credits.ts`). The mage stays where it stands at both verbs (D-318); both kinds join the hand-written
   set of the actions whose end takes pieces out of the backpack (`USES_BACKPACK`), so the effect of a
   gathering is not read from a net change. The credits name the two new icons once each; the items'
   icons come from the items' rows.
```

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:11604-11642` D-318
- `foundations/decisions.md:11513-11603` D-317
- `foundations/decisions.md:11863-11875` D-367
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/part_map.md:3-32` browser-view

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files you change (the slice's *Change*; read each whole before you change it; a file that does not exist yet you create)

- `tests/view/scene-picture.test.mjs`
- `src/browser/view/scene-picture.ts`

## Other files of code and tests to read (whole, or in the range named)



## What you return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. Commit everything of the slice before you return; leave the worktree clean.
