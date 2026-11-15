# Handoff — the reviewer of the whole change (`review-change`)

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. You review as an agent that made none of the change; you return to the orchestrator, never to the human. You alone grade and scope your findings.

## Where you work

- The worktree: `the task's worktree` — work from its root; it is read-only for you. Branch `task/testy-wskazuja-zdania-decyzji`, base `394ca859caa5d8316eafdb33145f243ddf5c3bac`, head `fd716ca20e4353422396e571d91ae6b354774aa7`. 88 commits, 147 files changed (+6429 −1674): 146 test files with added comment lines, and `foundations/decisions.md`. The pin of the-way is `ec7929d02164c8754f0236d93db52624688967e6` and was not moved (the task's item 1 is already met, see below).
- Your stage: the review of the whole change, by the method `.the-way/task-cycle/review/SKILL.md`; read it whole and follow it, and read a file it names only when its step comes. You select your own foundation and guidelines by the parts the change touches.
- Your directory for working copies: `.runs/review-whole/` (copy of the rule: a copy only there, removed before you return, named in your report).
- Your report: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/review-whole-report.md`, first line `PASS <sha>` or `FAIL <sha>` as your method gives it.

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

## What the change is for

- The whole frozen task: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md` (Polish; its quotations of decisions are English). The plan: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md` — 40 slices, each judging 5–14 decisions, made one after another by executors on the strongest model; every slice's method stands in its section "Work of every slice". No spec.
- The task in one paragraph: for each of the 403 decisions of the log, find which binding sentences a test holds, which an invariant derived from the decision holds, and which nothing holds; a test that holds a sentence gets a line `decision: D-NN "<quotation of the start of the sentence>"`; *Verification* names those tests by the clause `tests:` and keeps `invariants:`; the pair `complies:` / `violates:` stays only for the part no test and no invariant holds and speaks only of it; a decision held in whole loses the pair; a decision held by nothing with no pair gets one. Acceptance: `python -B .the-way/elements/common/foundation_check.py` reports no error and lists no decision as held by nothing; binding sentences, *Rationale* and *Rejected* of every decision are as at the base — only *Verification* changes in the log. Out of scope: new tests, new or changed invariants, renumbering and any change of binding sentences, removing mentions of decision numbers from code and tests.
- **Task item 1** (move the pin to `f4af75d`) is not made: the pin at the base, `ec7929d`, has `f4af75d` as an ancestor, 18 commits later; a move would be a downgrade. Judge this as the cycle's reconciliation of a source that changed since the task was written.
- Each slice's range, report and whether it had a review of its own: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/slice_ranges.md`. **No slice had a review of its own: you judge every slice.** Slice 10 was completed by a second executor (10b); its report is `reports/executor-10b-report.md`. Every executor report has a table with one row per decision and lists the pairs it added or rewrote. Minor findings of slice reviews: none exist.

## Rulings the orchestrator gave the executors (judge them too; each is also a choice you may find wrong)

- R1: a test of an invariant gets no line `decision:` for the part that the invariant derived from the decision already states; the clause `tests:` names only what lines `decision:` hold.
- R2: a decision with a part of its binding sentences that no test and no invariant holds always carries a pair for that part, also where it stood without a pair at the base.
- R3: where a decision's wording is stale or wrong against the code, the executor changes nothing and says so in its report. (These remarks go to the request's list for the human; you need not repeat them, but tell me where you find one the executors missed that changes a verdict.)
- R4: a test that only checks an element takes a colour role or a class does not hold a sentence that says what the role means; mark such a test only where the decision names the element.
- The lines stand as the first lines inside a test body, not above `test(`, as the lines `invariant:` of the repository stand; the plan says "directly above". The foundation check accepts both.
- A mention of a decision number in a comment at a test that gets a line stays where it is; no existing comment was removed.
- Executors read large test files by case and by range, not whole, and several report reading the styleguide, part map and glossary only in part; I accepted this as an autonomous choice, since the change adds comments and rewrites *Verification* fields. Whether it cost a wrong judgment is yours to find.

## What the orchestrator already checked mechanically (do not repeat it; trust it only as far as you can re-run it cheaply)

- Per slice and for the whole range, script `check_slice.py` (scratch of the orchestrator): in `foundations/decisions.md` every entry is equal to its base text except its *Verification* field, no entry added or removed, the withdrawn list unchanged; every other changed file has no removed line and every added line is a `//` or `#` comment line. 0 problems in every slice and in the whole range.
- `reports/../prep/whole_consistency.tsv` (in the record's directory: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/prep/whole_consistency.tsv`): per decision the kind of *Verification* at base and head, the number of lines `decision:` and of files, whether the pair changed; 0 flagged (no decision with lines and no `tests:` clause or the reverse; none held by nothing). At the head: 3831 lines `decision:`; *Verification* kinds: tests+pair 149, tests 87, inv+tests+pair 80, inv+tests 34, pair 30, inv 12, inv+pair 11; 107 pairs removed, 31 added.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`, no line `listed:` (at the base: 23 lines).
- Each executor ran the focused test of every test file it changed (exit 0) and Prettier on changed `.mjs` files (exit 0). **Not run, by anyone:** the full gate `npm test` (the orchestrator runs it after your review), and Ruff, which has no local copy in this worktree; `test_ruff_source_rules` and `test_shellcheck_source_rules` of `tests/quality/test_quality_invariants.py` fail at the base with `FileNotFoundError` and are no work of this task.

## Where to put your effort (questions, not suspicions — beside the full scope of your method, never instead of it)

The change is a judgment, not code: 403 decisions judged by 40 executors. You cannot re-judge all of it; you can find out whether the judgments are sound by sampling the places where a judgment is most likely to be wrong, and you say in your report exactly what you sampled and how many, so that the orchestrator knows what stands unverified.

1. For decisions whose pair was removed (107): does a test or an invariant really hold every binding sentence, including its last clause and its qualifiers? Read the decision, then the cited cases (`grep -rn 'decision: D-NN' tests`), and ask whether the case would fail if the code broke that sentence. Sample at least 30 across the parts of the game (simulation, view, server, build tools) and across slices, drawn so that no slice is missing more than once, and choose first the decisions whose binding sentences have the most clauses.
2. For lines `decision:` the executors flagged themselves as borderline, and for decisions with many lines (the lines per decision are in `whole_consistency.tsv`: D-394 has two lines at 27 cases, D-18 at 24, D-77, D-116, D-117, D-31/D-28 in the quality tests): does each marked test hold the sentence, or only use its subject? At least 15 decisions, with a few cases each.
3. For pairs added or rewritten (the reports list them): does the pair speak only of the part nothing holds, and is the `violates:` example code that goes against the decision while its entry stays as it is? At least 20.
4. The quotations: each begins at the start of a binding sentence (the foundation check proves this); judge whether a quotation that runs past what its test holds misleads, as the `tests:` clause is the only place that says which part the test holds. Does each `tests:` clause say, in words and without path, test name or number, what the tests hold, and is it true of the lines that exist for the decision?
5. Points the executors raised that need your ruling: (a) `tests/sim/loop.test.mjs:854` carries a D-386 line for `endLoopRun`, which settles the death of a character in an earning loop; D-386 names three functions that refuse a moment that is not a safe integer — does `endLoopRun` belong to its sentence? (b) pre-existing lines `decision:` the executors found whose test does not hold the sentence (for example `tests/view/screen-registry.test.mjs` near line 296 for D-408) — were they kept or reported; should they have been removed? (c) D-153, D-108, D-103, D-113, D-397: their *Verification* names, or does not name, invariants that derive from them (the reports list these as remarks R3); judge whether any of the executors' choices made a decision's *Verification* wrong or incomplete in a way the change itself caused.
6. Appearance and form: do the added comment lines break any rule of `guidelines/coding.md` or `guidelines/testing.md` (line length, placement, repetition: the repository has a rule on comments in tests, D-82 — a line `decision:` is a comment that names a foundation entry)? Are the lines placed consistently? Does the log still read well (the fields of every entry in order, the pair lines indented as before)?
7. The record of the cycle is the orchestrator's; the executors' reports are in `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-*-report.md`: where a report claims a count or a check you can re-run cheaply, re-run it and say if it differs.

Run focused tests only where a question needs them (`npm test -- <one test file>` runs one file; `python -B scripts/test.py <file>`); never the full gate. If the foundation check or a test needs a tool absent from the worktree, say so as an unchecked check.

## Report

As your method gives it: the first line `PASS <sha>` or `FAIL <sha>`, graded findings with `file:line` anchors and their reasons in full, the checks you ran with command and exit code, what you sampled (numbers), your **Unread material** and **Searches not found or unclear** (`none` is an answer; a missing section is not), and for each blocking finding the slice it comes from (the slice's number, from `slice_ranges.md`) or that it comes from none.
