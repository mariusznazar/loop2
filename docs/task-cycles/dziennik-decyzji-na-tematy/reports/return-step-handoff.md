# Handoff — the return step (resumed one author)

## Delegation

As in `reports/author-handoff.md`: the orchestrator's answers are no approval of the human; ask nobody but the orchestrator.

## What to do

Take the return step, as `.the-way/task-cycle/skill/return_step.md` gives it (read it whole, and `.the-way/task-cycle/skill/foundation_step.md` again as it says the return step writes as the foundation step writes). Your head is `6c146b51` (reviewed `PASS`, whole change and fix). Work from the worktree root the root of the task's worktree, on branch `task/dziennik-decyzji-na-tematy`.

The change writes no entry, so the step compares what the change touches and what it says with the code and the rest of the foundation:

1. Search the whole foundation (decisions, invariants, glossary, environment facts, the part map), the guidelines, the README, the AGENTS files and the skills of the product (outside `.the-way/`) for a sentence that says or assumes how the decision log is ordered or laid out — "in the order they were written", "at the end of the log", "the last entry", an anchor by line number into `foundations/decisions.md`, "the log has no sections" or the like — and for a sentence that names a part, an agent or a script that selects decisions by part only. Compare each with the log as it now stands (28 sections, entries keeping their numbers, `## Withdrawn identifiers` at the end) and with the rule WAY-18 and the template's "Where entries go" give (`.the-way/elements/decisions/template.md`, `.the-way/foundations/decisions.md` WAY-18 and WAY-150). Where something no longer matches, correct it in the same change, by the rule of its place (a foundation entry only through the element skill the foundation step names; a product file by a plain edit). The task's *Out of scope* holds: change no entry's content, number or *Scope*.
2. Say in your report whether a choice binds after the merge that is not already the template's rule (for example how a new entry of the game is placed in a section): the orchestrator's expectation is none, because the template's "Where entries go" already gives it, and the task excludes a decision on the layout ("no decision of the game rules the layout of its log"). Name your finding either way.
3. Check the part map for `product-foundation` and whether the sections change what it says: expected none.
4. Run `python -B .the-way/elements/common/foundation_check.py` in full (exit code in the report) and `python -B .the-way/elements/common/compare_log_entries.py` against `git show bea0abc1:foundations/decisions.md` (exit code in the report) again if you commit anything that touches the log.

Commit by explicit paths, in English, only if you change a file; otherwise commit nothing. Do not run `npm test`.

## Report

`reports/return-step-report.md` of `.runs/task-cycles/dziennik-decyzji-na-tematy/`, with: foundation compared with code; decisions written or changed; invariants; environment facts; glossary terms; part-map changes; projected entries; rows of *Settlements to record* (none) — as the record's *Return step* lists them; and the sections **Unread material** and **Searches not found or unclear**, the working-copies line and your own-work check. Your directory for working copies: `.runs/author/`.

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
