# Handoff — review-9: a reviewer of Slice 9

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back by returning `questions`.

## What you review and where

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. You are read-only: you change no tracked file and make no commit. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`).
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), variant: a planned slice. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes. You are an agent that did not make the change.
- Range to review: `04a81323..75df8a09` (`git diff 04a81323..75df8a09`; read the full diff of the range). Slice: Slice 9.
- The author's report (the executor's, which you read with the range): `docs/task-cycles/wyposazenie-postaci/reports/executor-9-report.md`.
- Step 4 answers: trust boundary **yes** — `src/browser/sim/saved-game.ts`, `src/browser/view/judging-cache.ts` and `assets/icons/**` are trust boundaries; check crafted input at the boundary this slice touches (a saved state or stored value with a wrong type, a slot an item does not fit, an unknown item, a non-integer or negative count, a missing or extra field, a prototype key), and that every refusal is whole and throws nothing. Irreversible operation: no.
- The mechanical check made by the orchestrator found, as information for you and not a finding: the files of the range outside the slice's *Change* are listed in the executor's report under "Files outside the slice's *Change*"; judge each against the Goal.

- Your report: `docs/task-cycles/wyposazenie-postaci/reports/%s-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its FIRST line is `PASS <sha>` or `FAIL <sha>` (the head you reviewed, or `questions`), as your method gives; it holds each blocking finding with its grade, its place `file:line` and the reviewer's mark of contradiction with the settlements where it has one, Minor findings and findings outside the task's scope apart, the checks you ran with command and exit code, **Unread material**, **Searches not found or unclear** (each `none` where none) and the line on your working copies. Return that first line, the report's path and a one-line check result.
- Your directory for working copies: `.runs/review-9/`.

Working copies (the first paragraph of the section "Working copies" of the cycle's skill, word for word):

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way` populated, and the dependencies those checks need installed as the product's own rules give, before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and command of a probe that shows a finding among them, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## What binds, and what to read

- The record directory `docs/task-cycles/wyposazenie-postaci/` also holds `cycle.md` and other agents' handoffs and reports: not yours to read unless named here. Frozen task (Polish): `docs/task-cycles/wyposazenie-postaci/task_frozen.md`; plan: `docs/task-cycles/wyposazenie-postaci/plan.md`; no spec.
- The foundation entries of this task are written (D-451–D-463, the changed decisions, the glossary term `gear`, the fact `game-icons-gloves-title`); the plan's names F1–F34 are mapped to them below; F32 is the new decision D-463. `python -B .the-way/elements/common/foundation_check.py` reports a known count of `decision:` citation errors of tests that Slices 4, 4b and 18 fix; any other error is a finding.
- The slice's text and what its executor was given to read follow, with current ranges of the entries; you read what you need to judge the slice against the task, the plan's slice and the foundation (select your own foundation and guidelines by the parts the diff touches, as your method gives).

## Your slice, from `plan.md`, word for word

### Slice 9 — The icon of „Załóż”

- **Goal:** The icon file that F33 records, from the commit of game-icons/icons that `src/browser/view/credits.ts` names for the other icons (or from its page where that commit lacks it, as `wood-pile.svg` was taken), stands in `assets/icons/` changed as the other icon files are and holding nothing `icon-file-content` forbids; its credit stands in the section „Autorzy grafiki” among the actions' icons in the order of the data, with its title, author, page, licence and how the file differs from its source (`icon-credits`, F34); its author and title stand in the lists of `tests/invariants/test_icon_credits.py`. `tests/view/icons.test.mjs` passes again (failing since Slice 7), and so do the view tests that draw the credits and fail since Slice 7 with `credit-lines: no credit for the icon gloves` — `tests/view/account-screen.test.mjs` and `tests/view/end-window-game.test.mjs` are known; run every other test file of `tests/view/` that fails with that message and report it (the orchestrator's addition after Slice 7's report).
- **Change:** `assets/icons/*.svg` · `src/browser/view/credits.ts` · `tests/invariants/test_icon_credits.py` ·
  `tests/view/icons.test.mjs`
- **Read:** `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:4945-4999` D-27 ·
  `foundations/decisions.md:9953-9986` D-291 · `foundations/invariants.md:319-330` icon-file-content ·
  `foundations/invariants.md:331-342` icon-credits · F33 · F34 · `src/browser/sim/data/actions.ts` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** trust boundary — `assets/icons/**`
- **Checks:** `npm test -- tests/view/icons.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs` · `npm test -- tests/invariants/test_icon_file_content.py` ·
  `npm test -- tests/invariants/test_icon_credits.py` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 8 · F33 · F34

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F33 | fact `game-icons-gloves-title` in `foundations/environment_facts.md` | 247-251 |
| F34 | invariant `icon-credits` in `foundations/invariants.md` | 331-341 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/part_map.md` | browser-view | 3-33 | 3-32 |
| `foundations/decisions.md` | D-27 | 4945-4999 | 4952-5005 |
| `foundations/decisions.md` | D-291 | 9953-9986 | 10004-10036 |
| `foundations/invariants.md` | icon-file-content | 319-330 | 319-329 |
| `foundations/invariants.md` | icon-credits | 331-342 | 331-341 |
