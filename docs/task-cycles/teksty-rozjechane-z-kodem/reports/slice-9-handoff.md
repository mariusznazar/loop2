# Handoff — Slice 9

You are the executor of Slice 9 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `c2cfc04bb59937642757dad4375e60092ec9dc0f`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

### Slice 9 — The testing guidelines: the gate's patterns and the level of the page-document test

- **Goal:** `guidelines/testing.md`, written through the project skill
  `the-way-maintain-testing-guidelines` as the cycle's author writes the file (its `SKILL.md` and
  `template.md` in *Read*), says two things right. (a) The rule "Test files in the gate" says that
  the full run of `scripts/test.py` hands Node patterns, not "files and patterns" (`NODE_TESTS` holds
  patterns only) — To do 9. (b) `tests/view/page-document.test.mjs`, which starts processes
  (`spawnSync`), stands under the level whose rules fit it, the integration test, and not among the
  unit tests that the recipe's *Files* line lists by the directory `tests/view/`; the level follows
  the resources a test uses, not its directory (D-81) — To do 10. The file's other lines stay; the
  executor changes a *Where in code* line only if one of these two edits needs it.
- **Change:** `guidelines/testing.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:40-41` To do, items 9 and 10 ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/testing/template.md` ·
  `.the-way/product-guidelines/testing/SKILL.md` · `scripts/test.py` ·
  `tests/view/page-document.test.mjs` · `tests/view/memory-limit.test.mjs` ·
  `foundations/part_map.md:118-133` agent-workflow · `foundations/decisions.md:1425-1436` D-73 ·
  `foundations/decisions.md:1477-1490` D-77 · `foundations/decisions.md:1531-1542` D-81 ·
  `foundations/decisions.md:1557-1568` D-83 · `foundations/decisions.md:5444-5474` D-264 ·
  `foundations/decisions.md:5575-5618` D-268 · `foundations/invariants.md:1189-1197`
  document-test-memory-limit · `foundations/invariants.md:579-587` node-test-selection ·
  `foundations/glossary.md:93-103` unit test, integration test
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`;
  `python -B scripts/test.py tests/quality/test_node_test_selection.py` exits 0 (the gate's file
  selection the edited rule describes); `git diff --check` exits 0
- **Depends on:** none
Run .mjs test files as 'npm test -- <file>'; a test_*.py file runs with 'python -B scripts/test.py <file>'.

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-9-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
