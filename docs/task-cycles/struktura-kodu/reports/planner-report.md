# Planner report — struktura-kodu

- Status: done with concerns
- Plan: `.runs/task-cycles/struktura-kodu/plan.md`
- Size report: `.runs/task-cycles/struktura-kodu/plan-size.md` — six slices, all `fits` (61 000 to 92 000 estimated tokens to read, 1 to 3 files to change), exit 0
- Check result: slice_size.py exit 0, every slice fits; `python -B .the-way/elements/common/foundation_check.py` on the base: 0 errors; nothing else run (no gate, no test)

## What the plan holds

- *Foundation entries*: rows 1 and 3 (decisions) and row 2 (invariant, *Violated* `yes`), all three written by the agent of the entries before any slice, with `foundation_check.py --skip-test-citations` until Slice 1 writes the invariant's test. No part-map change.
- Slice 1 (`same`): `tests/quality/eslint-size-rules.mjs` (the separate ESLint run, size rules alone, the two exceptions), `tests/quality/test_function_and_file_size.py` (main case citing row 2, marked `unittest.expectedFailure`, plus an unmarked control case on made-up files), and `### Size of a function and a file` in `guidelines/coding.md`.
- Slice 2 `Scene` (`strongest`, new `scene-memory.ts`), Slice 3 `RuleListView` (`same`, new `rule-drag.ts`), Slice 4 `RulePanelView` (`cheaper`), Slice 5 `ProgramPanelView` (`cheaper`), Slice 6 the function of `tests/transport.test.mjs` (`cheaper`). No two slices share a file; Slices 2–6 depend on Slice 1 only, to measure with the rule's own run.
- No slice carries a risk (the cycle's answers: no trust boundary, nothing irreversible).

## Q1: measured again at the head, and how Slice 1 takes the set

The head of the branch is the base, `a3d913da`. I ran `node .runs/orchestrator/size.mjs` there: the set is the same as in Q1. Functions over 200: `startApp` 449 (`app.ts:248`), `createProgramsEntry` 245 and its method `build` 225 (`programs-entry.ts:81`, `:102`), `ProgramPanelView` 293, `RuleListView` 511, `RulePanelView` 345, `Scene` 366, `accountRoutes` 444 (exception), and the async arrow function at `tests/transport.test.mjs:537`, 238. Files over 800 outside `tests/`: `saved-game.ts` 1154 (exception) and `kitchen-sink.tsx` 890. Scripts: none. Of the agent-workflow and root config files that `eslint.config.mjs` also lints, none is over a threshold (checked with the same rules), so the wider scope in Choices adds no exception.

Slice 1 takes the set from the first failing run of its own test, before it adds the marking. The comment at the marking names the set that stays once Slices 2–6 are made — today `startApp`, `createProgramsEntry` with `build`, and `kitchen-sink.tsx`. Where that run shows another set, the comment names the set found and the report says so. Q1 says the set is "named in the invariant's marking". I read "marking" as the expected-failure marking of the test, because the invariant template gives *Violated* only `yes` or `no`. That reading is the open question below.

Two more figures for the view slices: `scene.tsx` holds 736 lines of code of the 800 the file rule allows. `program-panel.tsx` holds 639, `rule-list.tsx` 644 and `rule-panel.tsx` 487. That is why `Scene`'s step goes to a new file.

## Questions still open (none blocks the plan)

1. Where does the set that keeps the invariant violated get its name? (Q1: "named in the invariant's marking")
   - Proposed answer: in a comment at `unittest.expectedFailure` in `tests/quality/test_function_and_file_size.py`, in Slice 1's report, and in the request.
   - Evidence: `.the-way/elements/invariants/template.md:157-165` gives *Violated* only `yes`/`no`, and the sentence must not name code that goes stale.
   - If the orchestrator meant the request alone, Slice 1 drops the comment and keeps the set in its report.
2. Does the rule reach every file `eslint.config.mjs` lints?
   - Proposed answer: yes. The plan's Choices read row 1's "aplikacja, skrypty, testy" as every file the linter reaches. That includes deployment's and agent-workflow's JavaScript and the two root config files. The file rule covers the same files outside `tests/`.
   - The agent of the entries words row 1 to match.
   - If the orchestrator prefers `src/`, `scripts/` and `tests/` only, Slice 1's run needs a list of its own and the decision says so.

## Concerns

- The plan's *Foundation entries* puts all three entries with the agent of the entries, not with Slice 1. A slice whose *Change* names `foundations/invariants.md` or `foundations/decisions.md` counts the whole file as reading: the decisions log is 1.27 MB, so `slice_size.py` would mark it too large. As a result the invariant reads `test` for one stage before any test cites it (WAY-61 allows this).
- The handoff names `the-way-update-part-map` for To do 6. No part-map change is planned: To do 6 applies only if the configuration "stands outside `tests/quality/`", and the plan puts it inside (Choices row 1).
- Each view slice runs a manual check in a real browser (D-88) through `.claude/skills/loop2-play/SKILL.md`. That costs time in four slices. I kept it because the tests on jsdom do not prove real dragging, focus or the scene's animations.
- The transport slice is told to break a guard of `src/server/` for a moment so its changed test is seen failing, then restore it byte for byte. Its check `git diff --stat <base> -- src` shows nothing is left behind.

## Guidelines found missing or uncertain

- `guidelines/coding.md` has no `### Size of a function and a file`. The pinned template requires it (`.the-way/product-guidelines/coding/template.md:50`, `:73-78`). Slice 1 adds it, as To do 5 asks.
- `guidelines/testing.md` does not say how the test of a violated invariant is marked in this product (`unittest.expectedFailure`, or `test.fails` / `{ todo }` for Node). It also does not say that an expected failure hides a broken run unless something controls it. The plan takes both from `.the-way/elements/invariants/template.md:163-165` and its own control case. This is no blocker, but a candidate for the testing guidelines.
- `guidelines/testing.md` does not say how a test that is only restructured (Slice 6) is seen failing. The plan applies the handoff's product rule through the invariants template's "against that behaviour broken for a moment" (`.the-way/elements/invariants/template.md:64-66`).
- The styleguide's order-of-work example (`guidelines/styleguide-browser-view.md:1161-1168`: environment and library, values, one screen, its states) is not followed. This change alters nothing the player sees: the foundation entries and the rule's test come first, then the screens' code is only divided. The departure stands in Choices.

## Reaches beyond the handoff

- `.the-way/product-guidelines/coding/template.md:40-84`, `:225-264` — the required form and content of the size rule, to describe Slice 1's guideline section.
- `.the-way/product-guidelines/coding/task_document.md` (whole) — whether a task cycle writes the size rule directly or through `maintain-coding-guidelines`. It does: the task's *To do*.
- `.the-way/product-guidelines/reading.md` (whole) — which guideline files go into each slice's *Read*.
- `.the-way/elements/invariants/template.md:25-180` — *Violated*, the expected-failure marking, and seeing a test fail.
- `.the-way/elements/invariants/skill/SKILL.md` (grep only) and `.claude/skills/the-way-record-invariant/SKILL.md:1-20` — what "marked violated" means.
- `.the-way/task-cycle/skill/foundation_step.md` (whole) — who writes the plan's *Foundation entries*.
- `.the-way/task-cycle/slice_size.py:1-80` — the limits and how *Change* is counted.
- `.the-way/task-cycle/change/ui_check.md:1-40` — whether the view slices owe a screenshot. They do not: nothing the player sees changes.
- `foundations/decisions.md:1021-1035` D-88, `:1489-1491` D-417 (heading and first sentence), `:1585-1587` D-420 (heading and sentence), `:1425-1454` D-405 and D-406, `:901-915` D-78 (range only, for *Read*), `:976-990` D-84 (range only) — the manual browser check and the gate's stages.
- `git show` of `docs/task-cycles/luki-w-testach-z-przegladu/plan.md` from history, first 60 lines — the form an earlier plan of this product gave its *Foundation entries*.
- `src/server/account-routes.ts` (top-level function list) — whether turning the rule off for the whole file would exempt more than `accountRoutes`. It would: ten other functions.
- `package.json` scripts — `npm run typecheck` for the slices' checks.
- `.claude/skills/loop2-play/SKILL.md` (headings only) — whether the skill can run the game for the manual checks.

## Unread material

- The four view files were read in outline (imports, top-level declarations, the statements of the large functions), not whole. Their tests under `tests/view/` were read for import lines only.
- `tests/transport.test.mjs` was read at lines 1-230 (declarations, by grep) and 530-794 whole.
- `foundations/invariants.md` was read as the heading and first sentence of every entry. `eslint-source-rules` (408-417) was read whole. The other invariants the slices' *Read* names were not read whole by me.
- `.runs/orchestrator/sections.md` was not read; the handoff does not name it.
- Decisions: D-29, D-28, D-32, D-36, D-73, D-77, D-83 and D-267 were read whole. D-264 was not opened. The view slices change no test and D-267 already carries what it says of React's development build. D-265 and D-407 were not opened: no slice adds a root, a screen or a shared control. The other entries of the section *Browser view: screens, navigation and their code* were not opened: none bears on a split that changes nothing the player sees.
- `guidelines/coding.md`, `testing.md`, `coding-browser-module.md`, `styleguide-browser-view.md` (in three reads), `src/browser/AGENTS.md`, `foundations/part_map.md` and `foundations/glossary.md` were read whole.

## Searches not found or unclear

- Expected-failure marking in the product: no `expectedFailure`, `violated` or "expected failure" in `foundations/invariants.md`, `tests/**/*.py` or `guidelines/*.md`. No invariant of loop2 is marked violated today, so Slice 1 sets the first example.
- `Size of a function` in any `.py` file of `.the-way`: no match. No check of the-way requires the heading, so `foundation_check.py` will not catch its absence or a malformed form. Review keeps it.
- Unclear: whether row 1's "aplikacja, skrypty, testy" means the directories or everything the linter lints. See question 2.
- Unclear: whether ESLint 10.12's API can limit a run on `eslint.config.mjs` to two rules (for example a rule filter), and whether its API applies a bulk-suppressions file by default. Slice 1's agent settles both in the code. The plan states only the outcome.

## Working copies

All stood in `.runs/planner/` of the worktree, and the directory was removed before return:

- `filesize.mjs` — an ESLint run with lower limits, to measure the four views' file sizes and the agent-workflow and root config files.
- `inv-sentences.txt` — the first sentence of each invariant.
- `decisions-read.txt` — D-36, D-73, D-77, D-83, D-267.

Nothing was kept in `reports/`; the figures the report needs are quoted above. `git status` of the worktree was clean after removal.
