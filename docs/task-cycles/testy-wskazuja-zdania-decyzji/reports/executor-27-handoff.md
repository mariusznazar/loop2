# Handoff — executor of slice 27 (a slice, or the retry of a slice)

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. You return to the orchestrator, never to the human; no go-ahead you get is the human's approval. A rule or value in the plan or in the task that does not survive your own check against the code and the foundation is to be reported, not fitted: say so in your report instead of bending your judgment to it.

## Where you work

- The worktree: `the task's worktree` — work from its root, on branch `task/testy-wskazuja-zdania-decyzji`. Nobody else writes in it while you work. Your slice's base commit is `88695aeb73dd01e7f7c1446918f1268b97baef66`; your range of commits starts there. The pin of the-way is `ec7929d02164c8754f0236d93db52624688967e6` (the worktree's `.the-way`; use it, never another copy).
- Your stage: `Slice 27 — programs, the copy and the program list`, the variant "a slice, or the retry of a slice" of the method `.the-way/task-cycle/change/SKILL.md`. Read that `SKILL.md` whole and follow it; read a file it names inside `.the-way` only when the step that names it comes. You are the executor of this slice only: you do not run the full gate (`npm test` without a file), you start no other slice, you open no request.
- Your directory for working copies: `.runs/executor-27/`.
- Your report: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-27-report.md`.
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
- Base facts: `python -B .the-way/elements/common/foundation_check.py` on the cycle's first base listed 23 decisions `held by nothing`; the list shrinks as slices go (it is shorter at your base), so read what it lists for your own decisions only. `test_ruff_source_rules` and `test_shellcheck_source_rules` of `tests/quality/test_quality_invariants.py` fail with `FileNotFoundError` on the base: report them as failing at the base, not as caused by the slice. Dependencies are installed in the worktree (`node_modules`); `npm test -- <file>` runs one test file.
- Earlier slices (if any) have added lines `decision:` and rewritten *Verification* fields; the line numbers of the log below are current for your base. Follow what earlier slices did in form: read `git log --oneline` of the branch and the diff of the last earlier slice's commits (`git diff <its base>..HEAD`).

## Rulings of the orchestrator (they bind every slice; they refine the plan's method, never the task)

- R1: A test of an invariant gets no line `decision:` for the part of the sentences that the invariant derived from the decision already states; the clause `tests:` names only what lines `decision:` hold, and `invariants:` stays as it stands. (Settled at slice 1; the template says a sentence held by a test line gets no invariant derived from the decision.) A test that holds a sentence the invariant does not state does get a line.
- R2: A decision with a part of its binding sentences that no test and no invariant holds always carries a pair `complies:` / `violates:` for that part, also where it stood without a pair at the base and a test now holds another part of it. The pair speaks only of the part nothing holds. A decision held in whole by tests and invariants carries none.
- R4: (settled at slice 15) A test that only checks an element takes a colour role or a class does not hold a sentence that says what the role means; mark such a test only where the decision itself names the element or the control the test checks. Do not add a line to every test that merely uses a role.
- R3: Where the log's wording of a decision is stale or wrong against the code, or a decision says more than its tests or code do, you change nothing of it; say it in your report under its own heading (the request lists such remarks for the human).

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

## Your slice (copied word for word from the plan, lines 337-346)

### Slice 27 — programs, the copy and the program list

- **Goal:** The decisions on who owns a program, the list of programs, naming, the copy and its saving, switching programs and what a program rule shows carry their tests. Each of the decisions D-93, D-164, D-165, D-166, D-167, D-168, D-169, D-170, D-171, D-172, D-173, D-174, D-384 is judged, sentence by sentence, as "Work of every slice" gives it: every test that holds one of its binding sentences carries a line `decision:` quoting the start of that sentence, its *Verification* names those tests by the clause `tests:` and keeps its invariants, and a pair `complies:` / `violates:` stands only for the part of its sentences no test and no invariant holds; nothing else of the entry changes.
- **Change:** `foundations/decisions.md` · `tests/sim/program-list.test.mjs` · `tests/sim/copy-actions.test.mjs` · `tests/view/program-list.test.mjs` · `tests/view/program-panel.test.mjs`
- **Read:** `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73` Work of every slice · `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md:30-37` To do · `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md:39-42` Acceptance criteria · `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md:99-104` Out of scope · `.the-way/elements/decisions/template.md:111-127` Binding sentences · `.the-way/elements/decisions/template.md:162-166` Decision or invariant · `.the-way/elements/decisions/template.md:220-260` Verification · `.the-way/elements/decisions/skill/SKILL.md:29-43` Draft · `guidelines/testing.md` · `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `foundations/part_map.md` · `foundations/glossary.md` · `foundations/decisions.md:1848-1911` D-93 · `foundations/decisions.md:3298-3311` D-164 · `foundations/decisions.md:3313-3326` D-165 · `foundations/decisions.md:3328-3346` D-166 · `foundations/decisions.md:3348-3361` D-167 · `foundations/decisions.md:3363-3376` D-168 · `foundations/decisions.md:3378-3391` D-169 · `foundations/decisions.md:3393-3406` D-170 · `foundations/decisions.md:3408-3421` D-171 · `foundations/decisions.md:3423-3436` D-172 · `foundations/decisions.md:3438-3451` D-173 · `foundations/decisions.md:3453-3466` D-174 · `foundations/decisions.md:9440-9453` D-384 · `foundations/decisions.md:1577-1588` D-73 · `foundations/decisions.md:1683-1696` D-82 · `foundations/invariants.md:838-846` saved-program-edit · `foundations/invariants.md:978-986` trip-plan-progress · `foundations/invariants.md:848-856` copy-save
- **Model:** strongest — every judgment whether a test holds a decision's sentence in whole, in part or not at all is made on the strongest available model, as the task's answered question 3 settles.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors` and lists none of D-93, D-164, D-165, D-166, D-167, D-168, D-169, D-170, D-171, D-172, D-173, D-174, D-384 as `held by nothing`; `npm test -- <file>` for each test file the slice changed, one run per file: `tests/sim/program-list.test.mjs`, `tests/sim/copy-actions.test.mjs`, `tests/view/program-list.test.mjs`, `tests/view/program-panel.test.mjs` and every file reached beyond them; `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>` on each `.mjs` file the slice changed; `git diff -U0 <the slice's base commit> -- foundations/decisions.md`, read: every changed line lies in the *Verification* field of one of D-93, D-164, D-165, D-166, D-167, D-168, D-169, D-170, D-171, D-172, D-173, D-174, D-384
- **Depends on:** Slice 26

## Current ranges of the entries of your *Read* in the log as it stands at your base

- `foundations/decisions.md:1933-1996` D-93
- `foundations/decisions.md:3586-3599` D-164
- `foundations/decisions.md:3601-3614` D-165
- `foundations/decisions.md:3616-3634` D-166
- `foundations/decisions.md:3636-3649` D-167
- `foundations/decisions.md:3651-3664` D-168
- `foundations/decisions.md:3666-3679` D-169
- `foundations/decisions.md:3681-3694` D-170
- `foundations/decisions.md:3696-3709` D-171
- `foundations/decisions.md:3711-3724` D-172
- `foundations/decisions.md:3726-3739` D-173
- `foundations/decisions.md:3741-3754` D-174
- `foundations/decisions.md:9981-9994` D-384
- `foundations/decisions.md:1639-1652` D-73
- `foundations/decisions.md:1759-1772` D-82

(The other ranges of your *Read* hold as the plan gives them, except the files of the log and invariants, where earlier slices may have shifted lines: find an entry again by its heading.)

## Also read, beyond the plan's *Read*

- `.the-way/elements/decisions/skill/SKILL.md` whole, as above.
- The check of your decisions at the start: `grep`-style search of the tests for the content of each binding sentence, not only the number, as "Work of every slice" item 2 says.

## Report

Return, as your method gives it: your status, your commits, a one-line check result naming what failed or did not run, the report path, your own-work check, your **Unread material** and your **Searches not found or unclear** (`none` is an answer; a missing section is not). Every check you ran carries its command and exit code. The report holds the table of rows of item 6 of "Work of every slice", and the list of the pairs you added or rewrote.
