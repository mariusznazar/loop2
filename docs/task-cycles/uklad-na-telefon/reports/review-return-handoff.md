# Handoff - the review of the return step of the task "loop2: uklad na telefon dla wszystkich ekranow gry"

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's go-ahead to you is provisional and never the human's approval. You never ask the human. Your questions go back to the orchestrator in your report.

## Where you work

- Worktree (your working directory; start every command from its root): `the task's worktree`. Branch `task/uklad-na-telefon`. The range to review is `83acc083729000e6c4c6dd093adef997dfad4b0c..c254ba21a6c126e849d998d7e3e20a966b3cfeeb` (two commits: `5bb7ad56` foundation: decisions, environment facts, glossary; `c254ba21` the skill `loop2-play`, both copies; 5 files, +134 -32). The cycle's base is `0a2254cd3a6e53c5c569c18b24499fac68bdad6e`; the code of the whole change is `0a2254cd..83acc083` (already reviewed and passed). The pinned the-way is `.the-way` of the worktree, at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`; run its scripts as `python -B .the-way/<path>`.
- Your stage: the reviewer of the return step (fresh, you made none of it), method `review-change` - read `.the-way/task-cycle/review/SKILL.md` whole, and a file it names beside it only when the step that names it comes. Variant: a code review of a range other than a slice or the whole change (the return step). You are read-only: no file changed, no commit.
- Your directory for working copies: `.runs/review-return/` (the worktree's ignored `.runs/`).
- Your report path: `.runs/task-cycles/uklad-na-telefon/reports/review-return-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it): its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`), and it holds the sections **Unread material** and **Searches not found or unclear**.
- `cycle.md` and the other files of the cycle's record directory are not yours to read unless this handoff names them. This handoff names: the frozen task `.runs/task-cycles/uklad-na-telefon/task.md`, the return step's report `.runs/task-cycles/uklad-na-telefon/reports/return-step-report.md` (the author's report: it names what the step compared, wrote, corrected and left out), the method of the return step `.the-way/task-cycle/skill/return_step.md` (read it whole: the review judges the step against it), and your report path.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## What to review

- The return step's range against the task and against the entries the step writes or corrects: the glossary entries "phone layout" and "computer layout" (and the decisions not to write "page area" and "touch target"), D-39, D-346 and D-166 corrected, the `tests:` clauses moved into D-19, D-44 and D-288 (the parts of a decision's pair of examples that a test now holds: check that each named test exists and holds that part, and that no part a test does not hold was removed from a pair), the new environment fact `media-query-width-and-scrollbar` and D-349's *Based on* (the step's author joined a quotation that WebFetch split at its quote limit: fetch the page it names and check the quotation word for word; where you cannot reach it, say so), and the three recipes added to the skill `loop2-play` (a forced tap on a map tile; an account with the owner role; a character in an earning loop with a return report): each against the code and the reports it rests on (the step names them in its report; the commands it gives, such as `account-role.js`, are in `src/server/` and `scripts/`), and the two copies of the skill byte-identical.
- That the step corrects, in the same change, whatever no longer matches (WAY-11) and writes nothing it should not: no invariant for behaviour no rule sets, no entry deferred, no review finding written as a foundation entry. D-166 was not in the plan's rows and the step corrected it because its sentence ("on the left / on the right") contradicted the phone layout: judge whether that is within the step.
- The entries marked `the cycle's` in the report (the two glossary entries, the new fact, D-166's added clause): judge their form against `.the-way/elements/decisions/template.md`, `.the-way/elements/glossary/template.md` and `.the-way/elements/environment-facts/template.md` and `.the-way/elements/common/rules.md` as the method gives.
- Run `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py` and the skill test `tests/agent_workflow/test_loop2_play_skill.py`; report each command and exit code. You do not run the product's full gate.
- Known and not for you: two Minor notes of the earlier review of the fix go to the request's list (D-396's *Rejected* with two ways no human weighed; the sticky highlight of some rows after a tap).

You grade and scope every finding yourself; the orchestrator moves none. Minor findings of this review are not fixed; they go to the request's list.
