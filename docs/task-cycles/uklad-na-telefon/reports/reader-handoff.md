# Handoff - a fresh reading of the decisions of the first review's index (remark 3 of correction 1)

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's go-ahead to you is provisional and never the human's approval. The remark below is the human's (written by the day's advisor on the human's behalf) and binds. You never ask the human. Your questions go back to the orchestrator in your report.

## Where you work

- Worktree (your working directory; start every command from its root): `the task's worktree`. Branch `task/uklad-na-telefon`, the head is `6f9c462f` (`git rev-parse HEAD` gives the full sha); the code and the foundation are those of `55773884`. The cycle's base is `0a2254cd3a6e53c5c569c18b24499fac68bdad6e`. The pinned the-way is `.the-way` of the worktree, at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`; run its scripts as `python -B .the-way/<path>`. Another agent is correcting code and the foundation on this branch at the same time (it commits by path); you are read-only, you change no file of the repository and make no commit, so read committed content (`git show 6f9c462f:<path>`), not the working tree, where a file may change under you.
- Your stage: a fresh reviewer who did not make the change and did not write the first review, method `review-change` - read `.the-way/task-cycle/review/SKILL.md` whole, and a file it names beside it only when the step that names it comes. The task you were given is narrower than a review of a range: see "What you do".
- Your directory for working copies: `.runs/reader/` (the worktree's ignored `.runs/`).
- Your report path: `.runs/task-cycles/uklad-na-telefon/reports/reader-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it): its first line is `PASS <sha>`, `FAIL <sha>` or `questions`, and it holds the sections **Unread material** and **Searches not found or unclear**, as the method gives them.
- `cycle.md` and the other files of the cycle's record directory are not yours to read unless this handoff names them. This handoff names: the frozen task `.runs/task-cycles/uklad-na-telefon/task.md`, the first whole-change review's report `.runs/task-cycles/uklad-na-telefon/reports/review-whole-report.md` (its **Unread material** tells what the first reviewer read), the review of the return step `.runs/task-cycles/uklad-na-telefon/reports/review-return-report.md` and its fix review `.runs/task-cycles/uklad-na-telefon/reports/review-return-fix-report.md` (their searches by words of placement), the remark `.runs/task-cycles/uklad-na-telefon/reports/correction-1-remarks.md` and your report path.

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

## The remark you answer (word for word, item 3 of the human's comment)

> Fix in this request: a fresh reviewer reads whole the decisions of the first review's index that say where a screen's parts stand or how they look in the browser view (placement, size, columns, scrolling, hover), and that the review read neither whole nor by search. The next tasks of the plan (12, 17–21) design screens on these sentences and read them as binding. Not the whole index of 119 — only those decisions.

## What you do

1. Write the index of the first review's selection: `python -B .the-way/elements/common/decision_index.py --output .runs/reader/index.md --part browser-view --part simulation --part agent-workflow --part product-foundation --section "Browser view: screens, navigation and their code" --section "Look of the browser view: styleguide, controls, pictures and fonts" --section "Program editor" --section "Screen of a map run and the end-of-run window" --section "Scene" --section "Screen Mapy and Siedziba" --section "The gate, test tools and the local start" --decision D-396 --decision D-19 --decision D-41 --decision D-70 --decision D-297 --decision D-295 --decision D-336 --decision D-39 --decision D-47` (run it from the worktree's root; the first reviewer's index held 119 decisions in full and about 270 by heading). Read the index.
2. From it select, by what each decision's question and binding sentences say, **those that say where a screen's parts stand or how they look in the browser view**: placement (left, right, above, under, beside, in which column or area), size (widths, heights, the sizes of the scene and of controls), columns and their order, scrolling, hover, touch, what a narrow window or the phone layout changes. Be generous in selecting: a decision whose sentence places or sizes a part of a screen belongs to the selection.
3. Of the selected decisions, drop only those the first review (`.runs/task-cycles/uklad-na-telefon/reports/review-whole-report.md`, **Unread material**) read whole — D-42, D-43, D-44, D-45, D-46, D-47, D-48, D-297, D-421 and D-396 — and those it took by search by words of placement, which the reports of the return step's review give (read their search lists and the decisions they say they read whole: D-325, D-331, D-445, D-446, and those the search judged true). Everything else of the selection you read **whole** (the entry from its heading to the next, with its rationale and *Rejected*); say in your report the count of selected decisions, how many you read whole, and which you dropped and why. Do not search by words only: read.
4. For each decision read, compare its sentences with the code and the foundation as they stand at `55773884`/`6f9c462f` (the phone layout below 1280 px in blocks `@media (width < 1280px)`, one column of areas, the scene's two sizes, the 48 px touch target, a tap on a tile, arrows of a rule group, the destructive button, `@media (hover: none)` for touch): **is any sentence of the decision false, now, in the phone layout or at some window width, or does it contradict a decision or the styleguide this change wrote?** Judge a sentence false only with evidence (the code, a stylesheet rule, another entry quoted word for word); name the decision, the sentence word for word, the place in the log, what is true instead and the evidence. A sentence that places a part "on the left" or "on the right" as the name of an area is not false (D-282 says each column is an area the phone layout may rearrange). Grade each finding as `review-change` gives its grades; a stale sentence that a later task reads as binding is Important when it says the opposite of the code in the phone layout.
5. You do not fix anything. Where the grade of a finding is Important or Critical, the report first line is `FAIL <sha>`; with none, `PASS <sha>`. Findings Minor are listed too.
6. Your report holds, beside the method's sections, the table of the selection: decision, why selected, read whole or dropped (with the reason), verdict (true / false / unclear), in the order of the log. Its **Unread material** names what of the selection you did not read whole, with the reason (the remark asks that every selected one is read whole).

## What to read

The frozen task, the remark, the first review's report and the return-step reviews' reports named above. The foundation by "Reading the foundation" for the parts the selection touches; the styleguide `guidelines/styleguide-browser-view.md` (its rules of the two layouts and the rules of each screen: read it whole, since you compare decisions with it); `foundations/glossary.md` (the entries "phone layout" and "computer layout"); the code only as far as you need it to judge a sentence.
