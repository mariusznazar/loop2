PASS b58ce12e65b68583f0a4aa5e054dfd551850ddfe

# Review of the correction of the open request — lokalizacje-poza-repozytorium

Range `5317955..b58ce12` (the pin move `8c7fe66`, then `50e7a57` and `b58ce12`); `git rev-parse HEAD` in the worktree is `b58ce12e65b68583f0a4aa5e054dfd551850ddfe` and `git status --short` is empty. Method: `review-change`, a later change to an open request, `fix.md` (the remarks in the handoff take the findings file's place, then the diff is reviewed as section 2 gives). The remarks, as quoted in `reports/correction-handoff.md`: the fix the blocking finding called for (the pin holds the fixed check) and the marking of the temporary state taken off. Result: both are made, the earlier findings F1 and F2 are closed, and I found no new Critical or Important finding; two Minor findings are listed below.

## The remarks, each

1. **The pin holds the fixed check — made.** `git ls-files --stage -- .the-way` gives `160000 52f8164a354ee1a704af0d58add2f3be8e4f0247`; `git -C .the-way rev-parse HEAD` gives the same commit; the submodule has no local change. `git diff 5317955..8c7fe66` is one file, `.the-way`, one line, the gitlink `e3825a8 -> 52f8164`, nothing else (stat: `1 file changed, 1 insertion(+), 1 deletion(-)`). So the pin move holds the gitlink alone.
2. **The marking of the temporary state off — made.** `tests/agent_workflow/test_tracked_file_private_paths.py` no longer has `@unittest.expectedFailure` nor the comment above it; the time limit `timeout=30` of the earlier fix is kept; the test is the README's pattern plus `check=False` and the limit. `foundations/invariants.md`, `tracked-file-private-paths`: `Violated: no`, sentence and *Derives from* unchanged.

## Are F1 and F2 closed

- **F1 — closed.** Item 7 of the task now holds: `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> exit 0, `checked: 435 files, 0 listed, 12 binary files not read`. The 12 hits were the the class `[:space:]` between double brackets lines; the new check (the-way's PR #101, `8fa6bac` "Take a POSIX character class in double brackets as no note link") no longer lists them, and no file of loop2 was changed for it and no exception was added (the invariant sentence still holds no backticked text, so no file is skipped). Question 3 and question 4 of the task are kept by the human's own choice to wait for the-way and then move the pin; question 4 said the task does not move the pin, and the orchestrator's pin move is the human's decision here (the human's remark, quoted in the handoff), not the author's.
- **F2 — closed.** The entry says `Violated: no` and the test passes as a plain test: `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` -> `Ran 1 test`, `OK`. The entry and the test now tell the same truth. The template (section "Violated") says the change in which the test starts to pass removes the marking and turns *Violated* to `no`; the two commits do both, in one range. The quoted passage of *Derives from* (`.the-way/installation/README.md` lines 78-79) was compared by the author with the new pin; the diff of the-way `e3825a8..52f8164` does not list `installation/README.md`, so the text is the one I compared in the earlier review.
- The earlier Minor findings stay fixed (M1 source of the link clause, M2 time limit; the latter is still in the file).
- N1 of the review of the fix (an `expectedFailure` that would swallow exit 2 or a timeout) is gone with the marking: the test now fails on any exit other than 0.

## A new Critical or Important finding in the correction

None. The diff of `8c7fe66..b58ce12` is two files (`foundations/invariants.md` 2/2, the test 0/3); the check of what the pin brought: `python -B .the-way/elements/common/foundation_check.py` -> `0 errors` (the author reports 1 error before the edit, the bare `TODO` of `cross-part-imports`). I looked at what else the pin move could bring: the-way's diff `e3825a8..52f8164` touches `elements/common/foundation_check.py`, `rules.md`, `elements/decisions/template.md`, `elements/invariants/template.md`, the task-cycle scripts and skills and the-way's own decisions; it does not touch `product-guidelines/`, `installation/` or the stubs of project skills, so the guidelines' templates (D-28, D-73 refer to the pinned the-way's templates) and the tracked skill stubs in `.claude/skills` and `.agents/skills` need no refresh from it. `foundation_check.py` passing is the evidence for the foundation entries; I did not rerun the gate.

## The `TODO` wording of `cross-part-imports`

`foundations/invariants.md`, the entry `cross-part-imports`: `**Rests on:** TODO — the fact is not named in the foundation (a bare TODO since 2026-11-08, commit 842beb7); the human names the fact and its source`.

- **It invents nothing.** It names no fact, source or value. I checked the history it states: `git log -S"Rests on:** TODO"` gives `842beb7`, dated 2026-11-08, "mark the missing environment fact of cross-part-imports as TODO ...". The claim "not named in the foundation" is the orchestrator's account; my own look at `foundations/environment_facts.md` headings (`browser-bare-import-resolution` at about line 738 and others) does not show a fact for the reading of imports of the test's docstring (TypeScript and Python import matching), and I do not suggest one.
- **It meets the form the new pin demands** (`rules.md`: in an invariant's *Rests on*, `TODO — <the fact, with its source>`); `foundation_check.py` accepts it (0 errors). The same rule adds "a change that leaves one there puts it before the human (WAY-71)": the request must name this `TODO` as an open point for the human. The author says so in its concerns.
- **M3 — Minor, within the task.** The parenthesis "(a bare TODO since 2026-11-08, commit 842beb7)" is the history of the entry (a date and a commit number), not what is missing; a knowledge entry says what is, not how it came to be, and git keeps the history. It also adds nothing a reader needs to name the fact. The wording without it, `TODO — the fact is not named in the foundation; the human names the fact and its source`, serves the form as well. Blocks nothing.
- **M4 — Minor, within the task.** The wording says that the fact is missing but not which kind of fact the form's `<the fact, with its source>` asks for (the fact the reading of imports by the invariant's test stands on); a reader must go to the test's docstring to learn what is to be named. A short addition naming the subject ("the fact the reading of imports in this invariant's test rests on") names no fact and invents none. Blocks nothing.

Both Minor findings lie within the task; the cycle may cut them into a fix or leave them.

## Does my earlier reading of decisions by title bear on this correction

No. In the review of the whole change I read whole two decisions (D-82 and D-362) and screened none by title; the correction changes no decision, no part-map entry and no glossary entry. It changes the *Violated* field of the invariant I read whole and the *Rests on* of `cross-part-imports`, which I read now; the only decision *Derives from* names there is D-351, which the correction does not touch. The decisions I did not read (those of `agent-workflow` and `product-foundation`) bear on this correction only through the invariant form and the pin move, which I judged against the template and the-way's own diff above; I did not open a loop2 decision on moving the pin (the task's question 4 and the human's remark are the sources the cycle holds), and none of the unread ones is named by the correction or its report.

## Declined to judge

- Who names the fact `cross-part-imports` rests on, and which: a choice for the human; stays open.
- The task for the-way that the human mentioned ("będziemy potrzebowali opisać zadanie dla the way"): outside this repository's change.
- The full gate `npm test`: the orchestrator's run. The failing `test_ruff_source_rules` and `test_shellcheck_source_rules` (tools not installed) were failing on the base.

## Checks I ran (command, exit code)

- `git rev-parse HEAD` -> `b58ce12e65b68583f0a4aa5e054dfd551850ddfe`; `git status --short` -> empty.
- `git diff 5317955..HEAD` and `git diff 5317955..8c7fe66` read whole.
- `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` -> both `52f8164a354ee1a704af0d58add2f3be8e4f0247`; `git -C .the-way status --short` -> empty.
- `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` -> `OK` (1 test, plain pass). My shell showed the output, not the exit code of the Python process (the pipe was to `tail`); the verdict is read from the output `OK`.
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> exit 0, `0 listed`.
- `python -B .the-way/elements/common/foundation_check.py` -> `0 errors` (exit 0).
- `git log -S"Rests on:** TODO" --oneline -- foundations/invariants.md` -> `842beb7`, and `git show 842beb7 --format='%ad'` -> 2026-11-08.
- `git -C .the-way log --oneline e3825a8..52f8164` and `git -C .the-way diff e3825a8..52f8164 -- elements/common/rules.md elements/invariants/template.md` read, for what the pin changed in the rule on `TODO` and the template.
- Not run: `npm test`; a mutation of the test (the earlier reports saw it red on the base with 22 hits and on the earlier head with 12).

## Reaches beyond the dispatch

- `.the-way/elements/common/rules.md` lines 17-34 and the `elements/invariants/template.md` diff of the pin (the new `TODO` form); `foundations/invariants.md` around `cross-part-imports` (lines 1236-1250); headings of `foundations/environment_facts.md` near line 730-760; the head of `tests/invariants/test_cross_part_imports.py` (to see what the invariant's test reads); the git history of the `TODO` (`842beb7`); `the author's rule on knowledge entries in his agent instructions` (the author's rule on entries without history, for M3). Why: to judge the `TODO` wording and what the pin moved.

## Unread material

The correction handoff, the correction report and the whole diff of the range were read whole. Not read whole: `.the-way/elements/invariants/template.md` and `.the-way/elements/common/rules.md` beyond the passages above and the diff of the pin (I read the "Violated" and "Links" sections in the earlier review); the other 15 files of the-way's diff `e3825a8..52f8164` (the-way's own decisions, the request template and the check scripts of the task cycle) were seen by name and size only, since the change of this repository does not use them; `foundations/environment_facts.md` was not read beyond headings around line 730-760. Decisions of the selection: none read in this review; of the earlier review, D-82 and D-362 whole, the others unread and not screened by title (as stated there). `guidelines/coding.md` and `guidelines/testing.md` were read in the first review; the correction changes no rule they hold.

## Searches not found or unclear

- I did not find a fact in `foundations/environment_facts.md` for the reading of imports (the orchestrator says none is named); I looked by heading only and cannot rule one out beyond that.
- Unclear: whether WAY-71's "puts it before the human" asks for a form of its own in the request; that is the orchestrator's step, I only note that the open `TODO` has to be named there.
