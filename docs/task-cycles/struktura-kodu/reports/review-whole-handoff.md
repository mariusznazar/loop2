# Handoff — reviewer of the whole change

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; no answer of the orchestrator is that person's approval. You review only; you change nothing in the reviewed worktree. Questions go back to the orchestrator in your report (section 4 of your method). You are a fresh agent that made none of this change.

## What you review

- The whole change of task `struktura-kodu`: range `a3d913dac87160f56b194ce863c60145a551765a..11d266bc` (base: `origin/main` at the start of the cycle; head: `11d266bc`, the last commit; confirm `git rev-parse HEAD` in the worktree is `11d266bc…` before you go on, as your method says). Compute the diff and the log yourself (`git diff a3d913da..11d266bc`, `git log a3d913da..11d266bc`).
- Worktree (read-only for you): `<worktree root>`, branch `task/struktura-kodu`. The process pin `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a` (not moved by the task).
- Your method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole, and `.the-way/task-cycle/review/whole_change.md`, read whole, as the SKILL says: your variant is "the whole change". You select your own foundation and guidelines (parts the change touches: browser-view, account-server, build-tools, agent-workflow, product-foundation) by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and by `.the-way/product-guidelines/reading.md`, you write the index of your selection of decisions with `elements/common/decision_index.py` into your directory for working copies and read it, and you count the decisions of the index you read whole for your report (WAY-150). The orchestrator's own selection, which you need not follow, is in `.runs/orchestrator/index.md`.
- Your directory for working copies: `.runs/review-whole/`. You need there the worktrees of the base and of the head that `whole_change.md` asks for (to run the test of the invariant with its expected-failure mark taken off, in the base and in the head); a worktree you make has no `node_modules`: run `npm ci` in it (or reuse the reviewed worktree's installed `node_modules` by a junction if that works) and remove each worktree with `git worktree remove --force` and `git worktree prune` before you return, naming it in your report. Run no full gate (`npm test` without an argument): it is the orchestrator's run. A focused run `npm test -- <one file>` is yours to make.
- Report: `.runs/task-cycles/struktura-kodu/reports/review-whole-report.md`; its first line `PASS <sha>` or `FAIL <sha>` as your method gives it (`<sha>` the full head you reviewed).

## The task, the plan, the slices

- Frozen task: `.runs/task-cycles/struktura-kodu/task-frozen.md` (read whole). No spec (no open design choice). Plan: `.runs/task-cycles/struktura-kodu/plan.md` (read whole; the planner's report is `.runs/task-cycles/struktura-kodu/reports/planner-report.md`).
- Answers of the cycle's step 4: no trust boundary, no irreversible operation. The task did not move the process pin.
- Slices and ranges. **No slice had a review of its own**: you judge each as section 2 of your method judges a slice, its executor's own-work check included (WAY-164), and for each blocking finding you name the slice it comes from (number and commit), or that it spans slices, or that it comes from none:

| Slice | Range | Executor's report |
|---|---|---|
| Foundation entries (D-425, invariant `function-and-file-size`, D-426) | `a3d913da..e1e6b127` | `reports/foundation-entries-report.md` |
| 1 — the test of the rule, its configuration, the rule in `guidelines/coding.md` | `e1e6b127..78f081b5` | `reports/executor-1-report.md` |
| 2 — `Scene` | `78f081b5..2fc6b1e0` | `reports/executor-2-report.md` |
| 3 — `RuleListView` | `2fc6b1e0..2935e093` | `reports/executor-3-report.md` (with `reports/executor-3-manual-check.txt`) |
| 4 — `RulePanelView` | `2935e093..e0cd12e5` | `reports/executor-4-report.md` (with `executor-4-log-base.txt`, `executor-4-log-new.txt`, `executor-4-steps.sh`) |
| 5 — `ProgramPanelView` | `e0cd12e5..d7493a85` | `reports/executor-5-report.md` |
| 6 — the function of `tests/transport.test.mjs` | `d7493a85..11d266bc` | `reports/executor-6-report.md` |

  (All report paths are under `.runs/task-cycles/struktura-kodu/`.) The reports are claims to verify, not evidence. Mismatches the orchestrator's mechanical check passed on: slice 4's first return had no report file (repaired once; the agent also had left the greyed cell and a base-versus-new comparison unchecked, which the repair did); slice 6's agent wrote two comparison files into the main checkout's `.runs/` and deleted them (the orchestrator checked: none remain); the plan's literal check for slice 6, `git diff --stat a3d913da -- src` empty, named the wrong base and cannot be empty (slices 2–5 changed `src/browser/view/`); the agent used the slice's own base instead. There are no Minor or out-of-scope findings of slice reviews to list.
- No screenshot is kept anywhere (nothing the player sees changes); the four view slices carry manual checks in a real browser described in their reports.

## Choices of the orchestrator that bind (judge the change against them, and judge the choices too)

- **Q1** (set above the threshold after the task's splits): the base holds, besides the task's named functions, `createProgramsEntry` with its method `build` (`src/browser/view/programs-entry.ts`) and `src/browser/kitchen-sink/kitchen-sink.tsx` (890 lines) above a threshold, and `startApp` (`src/browser/view/app.ts`); `createGameView` is no longer above the limit (its split has been merged), so the task's text naming `createGameView` as a violator does not fit the code. The invariant is *Violated* `yes` and its test an expected failure for that set; no exception is written for them and none is split (the task's *Out of scope*); the request will put the two new ones before the human.
- **Q3**: the set that keeps the invariant violated is named in a comment at the marking of the expected failure in `tests/quality/test_function_and_file_size.py` and in slice 1's report, not in the invariant's entry (the template gives *Violated* `yes` or `no`).
- **Q4**: the rule reaches every file the linter of D-29 lints; the file rule the same files outside `tests/`.
- **Q5**: the plan's *Choices* (12 rows) are adopted; slices 2–6 measure with the rule's own run.
- Deviations to judge: D-425's *Relations* reads `derives from D-28` and the standing beside D-29 stands in its binding sentences and *Verification*, because the template's *Relations* take a closed list (the task's *Decisions in play* asked that the new decision say so in its *Relations*); slice 1 set `IIFEs: true` on `max-lines-per-function` (D-425 says "a function"), and its control case cites no invariant; slices 2, 3, 4, 5 divided more than the verdict's cut (new files `scene-memory.ts`, `rule-drag.ts`; helper components) as the plan allows.

## Gaps carried to you (what the executors left unread, which you can judge)

- Slice 1's executor did not read: the task's ranges and the foundation-entries report, D-28, D-32, D-73, D-77, D-82, D-83 as entries, and the invariants `ruff-source-rules`, `prettier-source-format`, `cross-part-imports`, `eslint-source-rules` as entries; it read the testing guidelines whole.
- Slice 3's executor did not read the eleven invariants of its *Read* (browser-view-framework, content-identifiers, browser-view-token-values, browser-view-focus-outline, eslint-source-rules, prettier-source-format, cross-part-imports, rule-state-from-pick, streak-program-change, saved-program-edit, copy-save), the four glossary entries (program, program rule, rule group, copy) and lines 609–717 and 761–1175 of `guidelines/styleguide-browser-view.md`.
- Slice 5's executor did not read `plan.md`'s two foundation rows, `guidelines/testing.md`, `foundations/part_map.md` and most of the glossary; slice 4's did not read `guidelines/testing.md` and `program-editor.ts` in part (no test written); slice 6's did not read D-425 and the invariant, nor `tests/transport.test.mjs` outside lines 1–300 and 530–795.
- The planner read the view files in outline only and `foundations/invariants.md` by heading and first sentence.

## What to pay attention to

- Behaviour preserved in the four views (what the player sees, exports, hooks at the top level of components and custom Hooks, effects with every value among their dependencies and cleanups, D-267); the new files `scene-memory.ts` and `rule-drag.ts` against `guidelines/coding-browser-module.md` and the part map (they stand under `src/browser/view/**`, browser-view).
- The rule's run `tests/quality/eslint-size-rules.mjs`: that it reads exactly the scope D-425 gives, that the two exceptions drop only what the decision names, that it can hide nothing (inline comments, suppressions file), and the test `tests/quality/test_function_and_file_size.py`: the expected-failure marking, the control case, that the comment at the marking names the true set.
- The foundation entries against the task's rows 1–3 (source fidelity; nothing invented), and `guidelines/coding.md`'s new rule against the pinned template.
- The structure of the code the change leaves, as `whole_change.md` asks, with the numbers from your own runs (the size test of the invariant with its mark taken off in worktrees of the base and of the head).
- The case of `tests/transport.test.mjs` keeps its name, its `invariant:` and decision lines and every route, variant, assertion and message (nothing proves less).

## What you return

Your method's report with the first line `PASS <sha>` or `FAIL <sha>`; the changed files with their line counts; coverage of every task item, settlement row and the source fidelity; the blocking findings with the slice each comes from; the Minor findings listed with their place in the code and their own words, saying where one lies outside the task; **Unread material** (what this handoff names, or that you selected yourself, that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), the count of decisions you read whole, each reach beyond what you selected, the checks you ran with command and exit code, and the working copies' line. Return: the first line of the report, one line of check result, the report's path.

Working copies (word for word from the cycle): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
