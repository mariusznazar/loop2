# Handoff — review-10: a reviewer of Slice 10

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back by returning `questions`.

## What you review and where

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. You are read-only: you change no tracked file and make no commit. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`).
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), variant: a planned slice. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes. You are an agent that did not make the change.
- Range to review: `75df8a09..8f896859` (`git diff 75df8a09..8f896859`; read the full diff of the range). Slice: Slice 10.
- The author's report (the executor's, which you read with the range): `docs/task-cycles/wyposazenie-postaci/reports/executor-10-report.md`.
- Step 4 answers: trust boundary **yes** — `src/browser/sim/saved-game.ts`, `src/browser/view/judging-cache.ts` and `assets/icons/**` are trust boundaries; check crafted input at the boundary this slice touches (a saved state or stored value with a wrong type, a slot an item does not fit, an unknown item, a non-integer or negative count, a missing or extra field, a prototype key), and that every refusal is whole and throws nothing. Irreversible operation: no.
- The mechanical check made by the orchestrator found, as information for you and not a finding: the files of the range outside the slice's *Change* are listed in the executor's report under "Files outside the slice's *Change*"; judge each against the Goal.

- Gap to judge (the executor's report, **Unread material**): the executor did not open the guideline files its handoff names (`guidelines/coding.md`, `coding-browser-module.md`, `testing.md`, the styleguide and `src/browser/AGENTS.md`, as the slice's *Read* lists) and followed the conventions of the existing files instead. Read the guidelines that bear on `src/browser/view/judging-cache.ts`, `maps-entry.ts` and the new test file, and judge the change against them (code and test conventions; the file-size and function-size rules; the rule \"New tests in new files, listed where the part adopts mutation testing\").


- Your report: `docs/task-cycles/wyposazenie-postaci/reports/%s-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its FIRST line is `PASS <sha>` or `FAIL <sha>` (the head you reviewed, or `questions`), as your method gives; it holds each blocking finding with its grade, its place `file:line` and the reviewer's mark of contradiction with the settlements where it has one, Minor findings and findings outside the task's scope apart, the checks you ran with command and exit code, **Unread material**, **Searches not found or unclear** (each `none` where none) and the line on your working copies. Return that first line, the report's path and a one-line check result.
- Your directory for working copies: `.runs/review-10/`.

Working copies (the first paragraph of the section "Working copies" of the cycle's skill, word for word):

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way` populated, and the dependencies those checks need installed as the product's own rules give, before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and command of a probe that shows a finding among them, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## What binds, and what to read

- The record directory `docs/task-cycles/wyposazenie-postaci/` also holds `cycle.md` and other agents' handoffs and reports: not yours to read unless named here. Frozen task (Polish): `docs/task-cycles/wyposazenie-postaci/task_frozen.md`; plan: `docs/task-cycles/wyposazenie-postaci/plan.md`; no spec.
- The foundation entries of this task are written (D-451–D-463, the changed decisions, the glossary term `gear`, the fact `game-icons-gloves-title`); the plan's names F1–F34 are mapped to them below; F32 is the new decision D-463. `python -B .the-way/elements/common/foundation_check.py` reports a known count of `decision:` citation errors of tests that Slices 4, 4b and 18 fix; any other error is a finding.
- The slice's text and what its executor was given to read follow, with current ranges of the entries; you read what you need to judge the slice against the task, the plan's slice and the foundation (select your own foundation and guidelines by the parts the diff touches, as your method gives).

## Your slice, from `plan.md`, word for word

### Slice 10 — A gear change the player makes erases the character's remembered judgings

- **Goal:** As F13 and F32 give: the value of a remembered judging holds, beside what it holds today, the count of gear changes the player made of its character in the game state the judging read (Slice 1, raised by the acts of Slice 2); a remembered judging stands beside „Program:” only while its character's count in the game state at hand equals the one stored; the opening removes the values whose count stands above that of their character in the loaded game, as it removes those above its generation number; the version of the stored form rises, and a value under a key of an earlier version is neither read, written nor removed, as version 1's. A change the character comes back with from a map run — a refill, „Załóż”, a use — and the death of a character with no practice that takes its gear raise no count, so erase nothing; a death that takes the practice erases as before (row 6, *To do* 9). The count is kept and compared by `src/browser/view/judging-cache.ts`, so the record of the simulation (`src/browser/sim/judging-record.ts`) stays as it is; `src/browser/view/maps-entry.ts` gives the cache the count where it stores a judging, if the cache cannot read it from the state it is given. Crafted stored values — the count missing, of another type, negative, fractional or beyond the safe integers — read as none, throw nothing and stay where they are (`judging-cache-reading`), as cases of `tests/view/judging-cache.test.mjs`; the rest in `tests/view/judging-cache-gear.test.mjs` (new).
- **Change:** `tests/view/judging-cache.test.mjs` · `src/browser/view/judging-cache.ts` · `src/browser/view/maps-entry.ts` ·
  `tests/view/judging-cache-gear.test.mjs`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:47-47` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:265-265` Settlements to record ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:12511-12551` D-440 ·
  `foundations/decisions.md:12552-12605` D-441 · `foundations/invariants.md:1468-1477` judging-cache-reading ·
  F13 · F32 · `tests/view/judging-cache.test.mjs:1-160` · `tests/view/judging-cache.test.mjs:845-900` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — the reading of a trust boundary changes its stored form against the state of the simulation.
- **Risk:** trust boundary — `src/browser/view/judging-cache.ts`
- **Checks:** `npm test -- tests/view/judging-cache-gear.test.mjs` (written first, failing) · `npm test -- tests/view/judging-cache.test.mjs` ·
  `npm test -- tests/view/judging-cache-record.test.mjs` · `npm test -- tests/view/judging-cache-page.test.mjs` ·
  `npm test -- tests/view/maps-record.test.mjs` · `npm run typecheck`
- **Depends on:** Slice 9 · Slice 2 · F13 · F32

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F13 | `D-440` in `foundations/decisions.md` | 12591-12638 |
| F32 | `D-463` in `foundations/decisions.md` | 12878-12893 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/part_map.md` | browser-view | 3-33 | 3-32 |
| `foundations/decisions.md` | D-440 | 12511-12551 | 12591-12638 |
| `foundations/decisions.md` | D-441 | 12552-12605 | 12640-12692 |
| `foundations/invariants.md` | judging-cache-reading | 1468-1477 | 1468-1476 |
