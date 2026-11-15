# Handoff — executor of slice 1 (a slice, or the retry of a slice)

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. You return to the orchestrator, never to the human; no go-ahead you get is the human's approval. A rule or value in the plan or in the task that does not survive your own check against the code and the foundation is to be reported, not fitted: say so in your report instead of bending your judgment to it.

## Where you work

- The worktree: `the task's worktree` — work from its root, on branch `task/testy-wskazuja-zdania-decyzji`. Nobody else writes in it while you work. Your slice's base commit is `394ca859caa5d8316eafdb33145f243ddf5c3bac`; your range of commits starts there. The pin of the-way is `ec7929d02164c8754f0236d93db52624688967e6` (the worktree's `.the-way`; use it, never another copy).
- Your stage: `Slice 1 — code-quality and test-gate decisions`, the variant "a slice, or the retry of a slice" of the method `.the-way/task-cycle/change/SKILL.md`. Read that `SKILL.md` whole and follow it; read a file it names inside `.the-way` only when the step that names it comes. You are the executor of this slice only: you do not run the full gate (`npm test` without a file), you start no other slice, you open no request.
- Your directory for working copies: `.runs/executor-1/`.
- Your report: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-1-report.md`.
- Commit your work in this worktree, by path (`git add <path> …`, never `git add -A`, `.` or `git commit -a`), with a message in English in the form of the repository's earlier commits (`test: :white_check_mark: …` for lines added to tests, `docs: :memo: …` for the log; one commit or a few, as you judge). Check the author address with `git log -1 --format=%ae` after the first commit.

## Working copies (copied word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed.
The files that a product's own tools and tests make by themselves are no working copy of the agent
and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a
worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside
its report what the report needs, and states in the report where each copy stood and that it was
removed. Where a removal fails, the agent finishes all the same and names in the report the
remainder, with its full path and the reason it stayed.

## The task and the plan

- The whole frozen task: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md`. The plan: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md`. No spec. Task questions 1–4 are answered; the choice that a mention of a decision number stays beside the new line `decision:` is the cycle's (plan "Work of every slice", item 1).
- Answers of the cycle's step 4: no trust boundary touched, no irreversible operation. The pin of the-way was not moved.
- **Every judgment whether a test holds a decision's sentence — in whole, in part, or not at all — is yours, on the model you run on, the strongest available, as the task's question 3 settles. You hand none to another agent.**
- Foundation entries are written through their skill: before you edit any *Verification* field, read `.the-way/elements/decisions/skill/SKILL.md` whole (it is short). The task, accepted by the human, asks for the pairs `complies:` / `violates:` you add or rewrite; list each in your report, so that the human accepts them at the merge.
- Base facts: `python -B .the-way/elements/common/foundation_check.py` on the base: exit 0, `0 errors`, 23 decisions `listed: … held by nothing`. `test_ruff_source_rules` and `test_shellcheck_source_rules` of `tests/quality/test_quality_invariants.py` fail with `FileNotFoundError` on the base: report them as failing at the base, not as caused by the slice. Dependencies are installed in the worktree (`node_modules`); `npm test -- <file>` runs one test file.
- Earlier slices have added lines `decision:` and rewritten *Verification* fields; the line numbers of the log below are current for your base. Follow what earlier slices did in form (read `git log --oneline` of the branch and the diff of one earlier slice if one stands).

## Work of every slice (copied word for word from the plan, lines 16-74)

## Work of every slice

Each slice's agent gets this section with its own. It holds what the task asks of each decision and
how the slice writes it down.

1. **What changes, and what never does.** A slice changes two things only: lines `decision:` added
   at tests, and the field *Verification* of its own decisions in `foundations/decisions.md`. The
   question in the heading, the binding sentences, *Scope*, *Based on*, *Relations*, *Origin*,
   *Rationale* and *Rejected* of every decision stay word for word as at the base: the wording of a
   decision in the log is never changed, also where you find it stale or wrong against the code —
   say so in your report instead. No test's code, name or assertion changes; no test, invariant or
   script is added; no invariant changes; no mention of a decision number is removed from code or
   tests. A mention of a decision number in a comment at a test that gets a line `decision:` stays
   where it is, and the line stands beside it.
2. **Judging a decision.** For each binding sentence of the decision (the paragraphs before its
   first field; a sentence ends at a full stop followed by a space), find the tests that check it.
   Search the tests by the content of the sentence — its terms, the functions, data identifiers and
   screen texts it concerns — not only by the decision's number: a test that cites the number may
   only mention it, and a test that holds the sentence may cite nothing (the sentence of D-176 on
   the mage's nature energy at the start of a map run is held by a case of
   `tests/sim/body.test.mjs` that cites no decision). Read each candidate case and judge whether it
   holds the sentence in whole, in part or not at all: it holds what it would fail on if the code
   broke that sentence, and a test narrower than the sentence holds only that part. Read the
   invariants the decision names after `invariants:` and judge which part of the sentences they
   hold. Every judgment is yours: none goes to an agent on another model, and none is checked only
   on a sample.
3. **Lines `decision:`.** Every test that holds a sentence, in whole or in part, carries a line
   `decision:` at the test case, directly above it, in the comment form the file uses for its lines
   `invariant:` (`// ` in JavaScript, `# ` in Python): `decision: D-NN "<quotation>"`, the number as
   the heading writes it. The quotation stands in straight double quotation marks to the end of the
   line, begins at the start of the sentence the test holds, holds at least three words and no `"`,
   and matches the binding sentences once every run of spaces and line breaks is one space; it may
   run to the end of the sentence or stop earlier. A test that holds two sentences carries two
   lines. A line already standing is judged like any other: keep it where its test holds the
   sentence, and report one whose test does not.
4. **The field *Verification*.** In the order and form of the template's section "Verification":
   `invariants: <identifiers>.` stays as it stands; `tests: <the parts of the sentences the tests
   hold, in words>.` names what the lines `decision:` hold, with no path, no test name and no number;
   a pair `complies:` / `violates:` follows only for the part of the sentences that no test and no
   invariant holds, and speaks only of that part. The three outcomes:
   - held in whole by tests, invariants or both: the pair goes;
   - held in part: the pair stays for the part nothing holds, rewritten where it speaks of more;
   - held by nothing: the pair stays as it is; a decision that has no pair gets one — `complies:` a
     change that keeps the decision, `violates:` code that goes against it while its entry stays as
     it is, never a change that replaces the decision together with its code.
   A decision whose field your judgment leaves as it is is not touched.
5. **A test in a file your *Change* does not name.** A test that holds a sentence of your decisions
   may stand in another test file. Add its line there too; before that, read the guidelines of that
   file's part that your *Read* does not hold (`guidelines/styleguide-browser-view.md` for a file of
   `browser-view`: `tests/view/**`, `tests/account-api.test.mjs` and the files of `tests/invariants/`
   the part map gives that part), run that file's focused test, and name the file in one line of your
   report. Lines are added only for your own decisions; a test of another slice's decision is left as
   it is.
6. **Report.** Besides what your method asks, your report holds one row for each of your
   decisions: its number; the sentences held in whole and in part by tests, each with the tests as
   `path:line` and the case's name; the part held by invariants; the part held by nothing; and what
   its *Verification* became (unchanged, pair removed, pair rewritten, pair added). List apart each
   pair you added or rewrote, with its words: the human accepts it at the merge.

## Your slice (copied word for word from the plan, lines 77-86)

### Slice 1 — code-quality and test-gate decisions

- **Goal:** The decisions on the code-quality tools, the dependency audit, the selection and limits of tests and mutation testing carry their tests or a pair. Each of the decisions D-28, D-29, D-30, D-31, D-32, D-33, D-77, D-79, D-83, D-94, D-95 is judged, sentence by sentence, as "Work of every slice" gives it: every test that holds one of its binding sentences carries a line `decision:` quoting the start of that sentence, its *Verification* names those tests by the clause `tests:` and keeps its invariants, and a pair `complies:` / `violates:` stands only for the part of its sentences no test and no invariant holds; nothing else of the entry changes.
- **Change:** `foundations/decisions.md` · `tests/quality/test_quality_invariants.py` · `tests/quality/test_source_tool_scope.py` · `tests/quality/test_test_gate.py` · `tests/quality/test_node_test_selection.py` · `tests/quality/test_audit_dependencies.py` · `tests/quality/test_mutation_test_selection.py`
- **Read:** `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73` Work of every slice · `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md:30-37` To do · `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md:39-42` Acceptance criteria · `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md:99-104` Out of scope · `.the-way/elements/decisions/template.md:111-127` Binding sentences · `.the-way/elements/decisions/template.md:162-166` Decision or invariant · `.the-way/elements/decisions/template.md:220-260` Verification · `.the-way/elements/decisions/skill/SKILL.md:29-43` Draft · `guidelines/testing.md` · `guidelines/coding.md` · `foundations/part_map.md` · `foundations/glossary.md` · `foundations/decisions.md:818-831` D-28 · `foundations/decisions.md:833-846` D-29 · `foundations/decisions.md:848-859` D-30 · `foundations/decisions.md:861-874` D-31 · `foundations/decisions.md:876-889` D-32 · `foundations/decisions.md:891-902` D-33 · `foundations/decisions.md:1629-1642` D-77 · `foundations/decisions.md:1657-1668` D-79 · `foundations/decisions.md:1698-1709` D-83 · `foundations/decisions.md:1913-1926` D-94 · `foundations/decisions.md:1928-1941` D-95 · `foundations/decisions.md:1577-1588` D-73 · `foundations/decisions.md:1683-1696` D-82 · `foundations/invariants.md:408-416` eslint-source-rules · `foundations/invariants.md:418-426` ruff-source-rules · `foundations/invariants.md:428-436` shellcheck-source-rules · `foundations/invariants.md:438-446` prettier-source-format · `foundations/invariants.md:448-456` introduced-npm-vulnerabilities · `foundations/invariants.md:548-556` dependency-audit-refusal · `foundations/invariants.md:588-596` focused-test-execution · `foundations/invariants.md:578-586` node-test-selection · `foundations/invariants.md:598-606` mutation-test-selection
- **Model:** strongest — every judgment whether a test holds a decision's sentence in whole, in part or not at all is made on the strongest available model, as the task's answered question 3 settles.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors` and lists none of D-28, D-29, D-30, D-31, D-32, D-33, D-77, D-79, D-83, D-94, D-95 as `held by nothing`; `npm test -- <file>` for each test file the slice changed, one run per file: `tests/quality/test_quality_invariants.py`, `tests/quality/test_source_tool_scope.py`, `tests/quality/test_test_gate.py`, `tests/quality/test_node_test_selection.py`, `tests/quality/test_audit_dependencies.py`, `tests/quality/test_mutation_test_selection.py` and every file reached beyond them; `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>` on each `.mjs` file the slice changed, where it changed one; `git diff -U0 <the slice's base commit> -- foundations/decisions.md`, read: every changed line lies in the *Verification* field of one of D-28, D-29, D-30, D-31, D-32, D-33, D-77, D-79, D-83, D-94, D-95; `test_ruff_source_rules` and `test_shellcheck_source_rules` of `tests/quality/test_quality_invariants.py` fail with `FileNotFoundError` on the base too: report them as failing at the base, not as caused by the slice
- **Depends on:** none

## Current ranges of the entries of your *Read* in the log as it stands at your base

- `foundations/decisions.md:818-831` D-28
- `foundations/decisions.md:833-846` D-29
- `foundations/decisions.md:848-859` D-30
- `foundations/decisions.md:861-874` D-31
- `foundations/decisions.md:876-889` D-32
- `foundations/decisions.md:891-902` D-33
- `foundations/decisions.md:1629-1642` D-77
- `foundations/decisions.md:1657-1668` D-79
- `foundations/decisions.md:1698-1709` D-83
- `foundations/decisions.md:1913-1926` D-94
- `foundations/decisions.md:1928-1941` D-95
- `foundations/decisions.md:1577-1588` D-73
- `foundations/decisions.md:1683-1696` D-82

(The other ranges of your *Read* hold as the plan gives them, except the files of the log and invariants, where earlier slices may have shifted lines: find an entry again by its heading.)

## Also read, beyond the plan's *Read*

- `.the-way/elements/decisions/skill/SKILL.md` whole, as above.
- The check of your decisions at the start: `grep`-style search of the tests for the content of each binding sentence, not only the number, as "Work of every slice" item 2 says.

## Report

Return, as your method gives it: your status, your commits, a one-line check result naming what failed or did not run, the report path, your own-work check, your **Unread material** and your **Searches not found or unclear** (`none` is an answer; a missing section is not). Every check you ran carries its command and exit code. The report holds the table of rows of item 6 of "Work of every slice", and the list of the pairs you added or rewrote.
