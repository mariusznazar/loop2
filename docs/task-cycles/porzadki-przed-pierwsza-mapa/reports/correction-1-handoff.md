# Handoff — a correction for the human's remarks (round 1)

You are the one author, resumed, to make **a correction for the human's remarks**, with
`make-change`: read `.the-way/task-cycle/change/SKILL.md` (its row for a correction), and the human's
remarks, `reports/remarks-1.md` in `.runs/task-cycles/porzadki-przed-pierwsza-mapa/` (the comment on
the open request; each remark binds). The worktree is `the task's worktree`,
branch `task/porzadki-przed-pierwsza-mapa`, head `76fb7bcbe427ff7abde71018b6a2ae8a2fb70a5e`
(the code and the foundation of the request are the tree of `7d61f0f3`; the two last commits only add
and remove the record's copy).

What is yours of the remarks: **remark 3 only.** Remark 1 (make a task of the editor default) needs
no work in this request: change nothing about it. Remark 2 is a fresh reviewer's reading and not
yours. Remarks 4–6 are accepted.

Remark 3, as made: run the checks of the project skill that writes decisions over the foundation
entries this cycle wrote and over the three hand edits; redo through the skill only what those
checks flag; no full rewrite of the entries.

How to make it:

1. Invoke the project skill `the-way-record-decision` with the Skill tool for real, and work in this
   worktree's `.the-way` (its gitlink and `git -C .the-way rev-parse HEAD` match
   `55afa8e57aa1b83c77108576a36642722e0dda15`). Read its `SKILL.md` and the files it names when the
   step that names them comes, whole where it says whole.
2. The entries in scope are the **decisions this cycle wrote or changed**: D-393, D-394, D-395 (new),
   D-06 and D-264 (changed in place). The three hand edits are: the *Rejected* of D-395 and the
   *Rationale* of D-394 (commit `8c5d3d7b`), and the first wording of D-264 (`e8ea984a`, corrected in
   `9e7f586e`). The range of the cycle's foundation writing is
   `git log --oneline 6ab6a32b..7d61f0f3 -- foundations/decisions.md`; compute each entry's diff there.
3. Run every check the skill gives for an entry it has written or changed — the decisions template's
   fields and rules, the search of the foundation, `rules.md`, and `python -B
   .the-way/elements/common/foundation_check.py` — over those entries. A check is a check the skill
   names; do not add your own taste. The reviews of the cycle's earlier rounds left, as Minor findings
   that no fix took, the *Rejected* line of D-395 speaking of the source and of an earlier state of the
   code, a new rule in D-264 that might be its own question, and one long *Rationale* line of D-264:
   they are for the checks to flag or not; do not treat them as findings you must fix.
4. Where a check flags something, redo **only that** through the skill, one entry at a time, and keep
   the meaning of the task's rows 1–4 and the change to D-06. Where nothing is flagged, change
   nothing and commit nothing: say so.
5. Commit by explicit paths, in the form of this branch's commits, in English, only if you changed
   something. Write nothing under `.runs/` into a commit.

Report: `.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/correction-1-report.md`: each remark as
made — remark 3 by entry: which checks ran, what each showed (command and exit code where a command
ran), what was flagged and redone and how, whether the skill was truly invoked with the Skill tool
and what it returned; **Unread material**; **Searches not found or unclear**; the own-work check.
Return the status, your commits (or none), a one-line check result and the report path.
