# Handoff — the return step, task wilk-wbiega

You are the author of the change, resumed for the return step (step 11 of `implement-task`). The code was
reviewed: the whole change `FAIL` at `e717ec0f`, one fix round, the fix `PASS` at
`66b814d1469632c429cd2d3f23864780053304ae` (`reports/review-2-report.md`). Same worktree, delegation and
rules as in `reports/author-handoff.md`: no push of anything anywhere, commit by path, messages in
English, do not run the product's full gate (the orchestrator runs it once the return step and its review
are done).

- Stage and boundary: the return step only — no change to code, CSS, sprites or tests unless the
  comparison below shows an entry cannot be made true any other way; if so, say it in the report and do not
  change code: return `questions`.
- Read whole, in the pinned the-way: `.the-way/task-cycle/skill/return_step.md` and
  `.the-way/task-cycle/skill/foundation_step.md` (the return step writes as the foundation step writes);
  and the skill of an element when you write an entry of that element (`the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-record-environment-fact`,
  `the-way-update-part-map`; never a personal skill of the same name).
- What you compare with the code at `66b814d1`: the entries the change wrote or changed — D-271, D-148,
  D-316, D-317, D-322, the fact `lpc-wolf-licence`, the invariant `sprite-credits`, the part map row of the
  LPC Wolf pack; the entries the task names (its *Decisions in play*: D-147, D-141, D-27, D-272, D-273,
  D-318 to D-321, D-349 and the invariants and facts it lists), and those a search of the whole foundation
  finds that name or are named by them (WAY-33) — among them D-311, D-366, D-367 and the entries about the
  end window and the effects of a gathering, since the scene now keeps the wolf's effects in a slot of its
  own and the run in counts only while the scene is going or paused by the player; `foundations/part_map.md`
  for the touched parts; and the glossary for the words the change uses in a meaning of its own (a scuffle,
  the run in, an effect of an ordinary event, a moment). Correct in the same change whatever no longer
  matches (for example whether D-316 or D-317 still say what the code does after the fix: both effects play
  in one reading; the run in does not hold once the scene is dead or complete).
- Rows of *Settlements to record* of the frozen task (`docs/task-cycles/wilk-wbiega/task.md`, rows 1–9):
  for each, say which identifier now carries it, or write it if the foundation step missed it.
- Choices that bind after the merge (WAY-36): your reports' choices (which sheet and the cut; where the
  picture stands in the data; the cloud reusing `dust.png`; the wolf's side by geometry; the gap and the
  cloud's height; the run in as an attribute on the state-derived wolf; the layer order and the overlap of
  the falling mage; the mage turning only when standing; the wolf's effects in a slot of their own; the run
  in not holding once the scene stops) are the candidates. Write the ones that bind later work as the
  foundation step says; leave the rest as rows of the questions table (the orchestrator enters them). No
  entry is deferred or listed for later. A finding of the reviews that is Minor and unfixed — N-1, the
  `paused` half of the guard has no test — is no foundation entry.
- Invariants: only a rule the task, a decision or the human sets; do not write one for behaviour only
  because none covers it.
- The comparison is not a second look at the gap, the cloud's height or other numbers no source fixes: they
  stay the human's to judge at the request.

## Report

`docs/task-cycles/wilk-wbiega/reports/return-report.md`: status; commits (or `none`); for the record's
*Return step* section, in its fields: foundation compared with code (the entries and what no longer matched
with its correction, or none), decisions written or changed, invariants, environment facts, glossary terms,
part-map changes, projected entries written whole or in part, rows of *Settlements to record* written (row
number and identifier for each); the commands and exit codes of the checks you ran (`foundation_check.py`
at least); **Unread material**; **Searches not found or unclear** (`none` is an answer).
