# Handoff — review of a correction for the human's remarks

You are a fresh reviewer, read-only, who made none of the change. Review with `review-change` the
**correction** made for the human's remarks on the open request: read
`.the-way/task-cycle/review/SKILL.md` whole and `.the-way/task-cycle/review/fix.md` (the remarks stand
in place of a findings file).

- Worktree `the task's worktree`; range
  `76fb7bcbe427ff7abde71018b6a2ae8a2fb70a5e..d7cddb27` — one commit, `d7cddb27`, two single-line
  edits in `foundations/decisions.md`. Compute the diff yourself.
- The remarks: `reports/remarks-1.md` in `.runs/task-cycles/porzadki-przed-pierwsza-mapa/`. The part
  this correction answers is **remark 3**: "run the checks of the project skill that writes decisions
  over the foundation entries this cycle wrote and over the three hand edits (the rejected way of one
  decision, the rationale of the other, the first wording of the harness decision); redo through the
  skill only what those checks flag. No full rewrite of the entries." Remark 2 (a fresh reviewer
  reading decisions) is another reviewer's work; remark 1 asks for nothing in this request.
- The correction's report, a set of claims: `reports/correction-1-report.md`. The decisions in scope are
  D-393, D-394, D-395, D-06 and D-264; the correction changed D-393's *Rationale* and D-395's
  *Rejected* only, and says its checks flagged nothing in D-394, D-06 and D-264.
- Judge: whether the two edits keep the meaning of the task's rows 1 and 4
  (`.runs/task-cycles/porzadki-przed-pierwsza-mapa/task.md`, *Settlements to record*) and of the decisions
  template (`.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`); whether the
  removed words had a source (the task's *Need* says the compiler could report the same kind of error "w
  kilka sekund", in seconds) and whether dropping them loses a thing a reader needs; whether the
  correction missed something the skill's checks would flag in the five decisions (read the five whole
  at the head, and judge each against the template and rules yourself — name what you checked); and
  whether it stayed narrow, as the remark asks. The author's reading of D-264's third sentence as part
  of its one question (the review of the return step called it a possible new question, Minor) is
  yours to judge too, against the template's rule on a new rule next to an existing decision.
- Checks: `python -B .the-way/elements/common/foundation_check.py` and any focused read-only check you
  need, with command and exit code. Do not run `npm test`, `npm run build` or anything that writes to
  the tree.
- Report: `.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/review-correction-1-report.md`; first
  line `PASS <sha>` or `FAIL <sha>` (`<sha>` is `git rev-parse d7cddb27`); **Unread material**;
  **Searches not found or unclear**. A Minor finding of this review blocks nothing and goes to the
  request's list.
