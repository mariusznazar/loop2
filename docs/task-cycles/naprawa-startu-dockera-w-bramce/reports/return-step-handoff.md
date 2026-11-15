# Handoff to the author — the return step

You are the one author, resumed for the return step. Worktree and branch as before
(`the task's worktree`,
`task/naprawa-startu-dockera-w-bramce`). Head after the fix: `c1735524`; base `a1306b53`.
Read whole `.the-way/task-cycle/skill/return_step.md` and follow it (it points to
`foundation_step.md`, which you read before; read an element's `SKILL.md` when you write an entry of
that element). Your directory for working copies: `.runs/author-return/`; the working-copies rule of
your first handoff holds. Your report: `reports/author-return-step-report.md` (under
`.runs/task-cycles/naprawa-startu-dockera-w-bramce/`).

Compare, against the code the change leaves: the entries the change wrote (D-390's new paragraph,
D-406's new answer, D-405's rationale sentence), the task's *Decisions in play* (D-406, D-390, D-391,
D-392, D-405, the invariant `gate-docker-start-waits-once`), the part-map entries `build-tools` and
`product-foundation` (read them now), and what a search of the foundation finds for the words the
change uses. The review of the whole change and of its fix are in `reports/review-whole-report.md`
and `reports/review-fix-report.md`; their Minor findings M1 (the D-390 clause about a dead starter is
the cycle's own choice, shown at the request), M5 (contingent on a revert of `826b2a63`), N1, N2 and N3
(new Minor findings of the fix review: N1 the waiter's cap can fall before a restarted holder's end;
N2 the docstrings of `scripts/docker_gate.py` do not mention the end of the wait at the waiter's own
limit; N3 the stand-in's late holder can remove a taker's lock directory) are for the request's list,
not for you to fix; do not change code in the return step unless the comparison finds a text that no
longer matches the code (a docstring that now misstates what the code does is such a text — if you
hold N2 to be one, say so and correct it in a commit of its own).

Settlement rows: row 1 → D-406, row 2 → D-390 (already written by the change). Say in the report
whether the glossary, the environment facts, the invariants or the part map need an entry or a
correction and why, or `none`; an invariant is written only for a rule the task, a decision or the
human sets. Report as `return_step.md` gives, with **Unread material** and **Searches not found or
unclear** (each, or `none`), working copies and their removal. Return status, commits (or none), a
one-line check result and the report path. No full gate.
