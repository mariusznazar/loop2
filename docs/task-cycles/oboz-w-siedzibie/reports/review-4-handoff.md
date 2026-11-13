# Handoff — review of the nine decisions the earlier review read by title only (correction), task oboz-w-siedzibie

You are a fresh reviewer that made none of the change and wrote none of its earlier reviews (method
`review-change`, `.the-way/task-cycle/review/SKILL.md`, read it whole; the variant is a later change
to an open request — here a read-only check of the whole change against decisions that stayed unread).
Read-only. Worktree `the old game's repository on the author's disk2-wt\oboz-w-siedzibie`, branch `task/oboz-w-siedzibie`,
head `df68213feebe035642a555d187db6027e872ac3d`; the code of the change stands at
`be0e0babb9d5ff1baa366ac149f7a977af4fd1a5` (the head only adds and removes the record's copy).
Dependencies installed; `.the-way` at the pin `55afa8e57aa1b83c77108576a36642722e0dda15`.

## The remarks that bind

The human's remarks on the request (`reports/correction-remarks.md`, in
`docs/task-cycles/oboz-w-siedzibie/`): item 4 — "The nine decisions the review of the whole change read
by title only — fix in this request: a fresh reviewer reads these nine decisions in full and checks the
camp against them." Items 1 and 3 change nothing; item 2 (the container check) is the orchestrator's.

## What you do

1. Read whole, in `foundations/decisions.md` (each from its heading to the next heading, with
   *Rationale* and *Rejected*): **D-03, D-04, D-217, D-218, D-311, D-319, D-320, D-330, D-372.** Read the
   entries they link to (*Relations*, *Based on*, *Verification*) as far as you need them, each whole.
2. Check the camp against each of the nine: the change range is
   `2b4d760c517a8b399b2d9b80f77531455e32d11c..be0e0babb9d5ff1baa366ac149f7a977af4fd1a5` (4 feature commits,
   a fix, a return-step commit; 17 files). The frozen task is `docs/task-cycles/oboz-w-siedzibie/task.md`;
   the new decision D-389 and the changed D-271, D-272 and `loop2-container-sprites` are the change's own
   entries. Say for each of the nine whether the change complies, violates, or does not touch it, with
   `file:line` evidence; a decision's *Verification* examples are the checks to apply.
3. Grade what you find as the method gives (Critical, Important, Minor, outside the scope); the earlier
   reviews' reports are `reports/review-1-report.md`, `review-2-report.md`, `review-3-report.md` (all
   `PASS`) and the open Minor findings M2 and N2 are no finding of yours unless you disagree.
4. Trust boundary: yes (the change added `assets/sprites/chest.png` and `assets/sprites/camp-clearing.png`;
   already checked by the earlier reviews; look again only where one of the nine bears on it). No
   irreversible operation.
5. Run the focused checks you need; report each with command and exit code. The orchestrator runs the
   gate. Do not edit anything under the worktree except your report.

## Report

`docs/task-cycles/oboz-w-siedzibie/reports/review-4-report.md`: first line `PASS <sha>`, `FAIL <sha>` or
`questions`; per decision of the nine: read whole (yes/no) and the verdict; findings; checks run with
command and exit code; **Unread material** (name any of the nine or any entry you link to that you did not
read whole; `none` where nothing) and **Searches not found or unclear** (`none` where nothing).
