# Handoff to the one author — the return step

You are the one author of this change, resumed on your class for the return step (step 11 of
`implement-task`). Read `.the-way/task-cycle/skill/return_step.md` whole and follow it; it writes
as `.the-way/task-cycle/skill/foundation_step.md` writes, and an entry you write goes through the
`SKILL.md` of its element as that file gives. Method: `.the-way/task-cycle/change/SKILL.md`
(no variant row; the return step has none). Worktree and branch as before. Current head
`77dc6b35` (change `38e84eee`, `787acccd`, fix `77dc6b35`; the whole-change review `PASS` and the
review of the fix `PASS`, reports `reports/review-whole-report.md`, `reports/review-fix-1-report.md`).
Your directory for working copies: `.runs/return-step/`. Report path:
`docs/task-cycles/przywrocic-decyzje-drogi-agenta/reports/return-step-report.md`.

What the orchestrator asks, beyond the file:

1. Compare with the code, and correct where it no longer matches: D-417 to D-420 and the nine facts
   (against the skill copies, the test comment and the real behaviour they describe, as far as the
   repository shows it), the sentence of the section "The gate, test tools and the local start",
   D-264 and D-347, D-75 and D-88 (which D-417 adds to), and the part map entries of the parts the
   change touched (`product-foundation`, `agent-workflow`, `browser-view`).
2. The search of the whole foundation for entries the change touches and no link joins to it
   (WAY-33): for example a decision, an invariant, a glossary term or a fact that speaks of how an
   agent operates the game, where the screenshots lie or Playwright, and still says the rule stands
   only in the skill, or names a withdrawn number. Report what you searched and found.
3. Do not write an entry for the finding the review kept open (D-417's two unmarked statements;
   *Contested* in `reports/fix-1-report.md`): its answer is the human's, and the review's findings
   are no foundation entries.
4. Glossary: `owner` is a role of the game; the entries you wrote now use "the human who owns the
   repository". Check whether the change uses any other word in a meaning for which WAY-95 gives
   an entry.
5. If you change nothing, commit nothing and say so; where you commit, by path, English message,
   nothing under `.runs/`. You do not run the gate `npm test`.

Return the report in the form the record's *Return step* gives (the entries compared, decisions
written or changed, invariants, environment facts, glossary terms, part-map changes, projected
entries, rows of *Settlements to record*), with the own-work check (commands and exit codes), the
**Unread material** and **Searches not found or unclear** sections and the line on working copies.
Return only status, commits, a one-line check result and the report path.

## Working copies

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
all the same and names in the report the remainder, with its full path and the reason it stayed.
