# Handoff — a correction for the human's remarks, task `edytor-programu`

## Delegation
The person who requested this cycle delegated every intermediate choice to the orchestrator of `implement-task`. Here the human has spoken: the remarks below bind. You never ask the human; a question goes back in your report.

## Where you work
- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu` (the request's branch, PR #56). Base and head at start: `52797e5f7ab8` (`git rev-parse HEAD`; the tree equals `eb3d3f5` plus the record's add-and-remove pair). `main` is unchanged (`6fec0ea`), nothing to merge. Pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`, verified. Commit on this branch; push nothing.
- You make: **a correction for the human's remarks.** Read in full `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`); its row for a correction says: the human's remarks bind, and the report holds each remark as made and how. The file you change is a foundation file: write the changes through the project skill `the-way-record-decision` (`.claude/skills/the-way-record-decision/SKILL.md`); read `.the-way/task-cycle/skill/foundation_step.md` for the bounds.
- The remarks (binding, in the human's words): `docs/task-cycles/edytor-programu/reports/remarks-1.md`. Context: the request's questions and the whole-change review in `docs/task-cycles/edytor-programu/reports/report-review-whole.md` (Minor 1, 3) and `docs/task-cycles/edytor-programu/reports/report-return-step.md` (the two questions with the options); the entries D-289 and D-304 in `foundations/decisions.md`; the task `docs/task-cycles/edytor-programu/task.frozen.md` (its rows 1 and 16 of *Settlements to record* are the sources the entries were written from; the human's remark now revises them — the vault documents are outside this repository and are not yours).
- Report: `docs/task-cycles/edytor-programu/reports/report-correction-1.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only; message in English in the repository's form; no full gate.

## What to do
Make the two entries say what the remarks decide, nothing more:
- **D-289:** the binding sentence says a rule holding a value outside what may be picked shows it in the panel as picked and greyed, „with its reason where one of those above fits, and with none otherwise” (choose the exact English wording by the entry's own style); *Verification*: the „violates” example „a greyed cell with no reason” is kept only for a cell where a listed reason fits (word it so), and a „complies” example for the held value with no fitting reason may be added; *Rationale* gets the accepted consequence (no reason sentence is invented: wording the human has not set; the case is rare: only a composed state or an old save reaches it); *Rejected* gets the way not chosen (a reason sentence for that case) with its price as the entries' template gives; *Origin* names the human's decision at the request of this task (2026-11-05).
- **D-304:** the binding sentence says „+ dodaj grupę” stands under the rule groups, in the notation of „+ reguła” (the footer of the list); *Verification* examples agree (no „beside”); *Rationale* and *Rejected* agree (the way not chosen: the two buttons on one line, since nothing stands beside it when the last group is folded); *Origin* as above.
- Search the foundation for any other entry that repeats „beside „+ reguła”” or „a greyed cell with no reason” as a rule (`foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`) and make it agree; report each hit and what you did.
- Keep the other entries and the code untouched. Run `python -B .the-way/elements/common/foundation_check.py` and report its own exit code (not through a pipe).

## Report
Status, your commit, each remark as made and how you carried it out, the entries changed with one sentence of each in Polish, the check with command and exit code, each reach beyond this handoff, **Searches not found or unclear:** or `none`. Return only: status, commit, a one-line check result, and the report path.
