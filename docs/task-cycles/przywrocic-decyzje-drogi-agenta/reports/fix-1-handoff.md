# Handoff to the author — fix 1 (Minor findings of the whole-change review)

You are the one author of this change, resumed on your class for the fix. Variant of the method:
"the fix of a review's findings" of `.the-way/task-cycle/change/SKILL.md`, with
`.the-way/task-cycle/change/fix.md` read whole. Worktree and branch as before
(the root of the task's worktree,
`task/przywrocic-decyzje-drogi-agenta`); the reviewed head is `787acccd`, your fix range starts
there. Your directory for working copies: `.runs/author-fix-1/`. Report path:
`docs/task-cycles/przywrocic-decyzje-drogi-agenta/reports/fix-1-report.md`.

The whole-change review (`reports/review-whole-report.md`) returned `PASS` with two Minor findings
within the task and no blocking one. The findings file is `reports/fix-1-findings.md` — the
reviewer's words, cut word for word. Fix those two and nothing else; a fix that grows beyond its
findings is the likeliest to draw a new Critical or Important finding, which would give the whole
fix up.

Guidance from the orchestrator:

1. **Finding 1** (the provenance clause and the two unmarked statements in D-417's *Rationale*).
   Source discipline binds: you add no statement the old entries and the repository's git history
   do not hold, and you do not claim that something was measured when you cannot show it. If the
   history of the repository (the commits and entries before `1a56e519`, including the *Origin* of
   the old D-254 and the commit `f72e08aa` the reviewer cites) shows whether the two statements
   were measurements and under which conditions, make D-417 say so in the template's form. If it
   does not, the finding is *contested*: say so in your report with what you looked at, and leave
   the text as it is. Do not read the author's private notes for this (D-362: the entries name
   none, and the fix must not make them a source of the foundation).
2. **Finding 2** ("owner" against the glossary entry `owner`): replace the word where it names the
   human who owns the repository, in D-418 (*Rationale*, *Rejected*) and D-419 (*Verification*),
   with the phrase the reviewer gives, "the human who owns the repository" (or its grammatical
   form in the sentence: "that repository's owner" → "the human who owns that repository"),
   changing no other word of those sentences. Check D-417 and D-420 and the rest of your four
   entries for the same use; the section sentence at line 1557 belongs to an entry the change did
   not write, and is not yours.
3. Run again the checks the change affects: `python -B .the-way/elements/common/foundation_check.py`
   and `python -B .the-way/instruction-files/check_instructions.py` (and the focused tests, if a
   file other than `foundations/decisions.md` changes — it should not). You do not run the gate
   `npm test`. Commit by path, English message (`docs: :card_file_box: …`), nothing under `.runs/`.
4. The report holds each finding as fixed — how, with the check that shows it — or contested, with
   the evidence; the **Unread material** and **Searches not found or unclear** sections; the line
   on working copies.

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
