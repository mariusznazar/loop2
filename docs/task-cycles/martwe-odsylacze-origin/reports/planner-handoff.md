# Handoff — planner (`plan-task`)

You are the planner of one task cycle of the-way. The human who asked for this cycle has delegated
intermediate choices to the orchestrator; you do not ask the human. Questions go to the orchestrator
in your report (status `questions`).

- Worktree (work from its root): `the repository root`, branch
  `task/martwe-odsylacze-origin`, base `83ba52b2` (its first commit moves the pin of `.the-way` to
  `e9a0f92`; that commit holds only the gitlink).
- Method: read `.the-way/task-cycle/plan/SKILL.md` whole (path in this worktree's `.the-way`), and a
  file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/martwe-odsylacze-origin/task.md` (read it whole). The product's
  `AGENTS.md` and `guidelines/coding.md` / `guidelines/testing.md` apply to what slices change.
- Stage and boundary: write `plan.md` and `plan-size.md` in `docs/task-cycles/martwe-odsylacze-origin/`
  and return before any slice is made. You write no code and no foundation entry, and you commit
  nothing. Report to `docs/task-cycles/martwe-odsylacze-origin/reports/planner-report.md`.
- Answers of step 4: trust boundary — no (rewritten prose of `foundations/*.md`, `guidelines/*.md`,
  comments of tests and of `src/browser/*.css`; none of the part map's trust-boundary files);
  irreversible operation — no. No open design choice, no reserved choice. Route: planned slices.
- The task is not bound to a project plan (`Project relation: independent`).

## Facts the orchestrator gathered (verify what you rely on)

- `foundations/decisions.md` is ~825 KB, 367 decisions; 302 lines `- **Origin:**` contain `in the vault`
  (the task says 301 decisions; one line is probably a decision whose Origin also names a file at a
  fixed commit — recount, do not trust the number). The task names 54 distinct vault notes, 38 already
  deleted; deleted notes are read from the git history of the vault repository
  (`the author's notes`, read-only for the whole cycle — nobody commits, stashes or
  checks out anything there; use `git show <commit>^:<path>` and `git log --all -- "*<name>"`).
  Existing notes live under `the author's notes\`.
- A decision's *Origin* line names a note as `<file>.md in the vault (<folder>)`; *Rationale* and
  *Rejected* are the places that must hold the reasoning after the change.
- The change also touches: D-82 and D-362 (wording stated in the task's *Decisions in play* and
  *To do* 3–4), about 45 comment lines in 26 files outside the decisions (tests, `guidelines/testing.md`,
  `guidelines/styleguide-browser-view.md`, `src/browser/tokens.css`, `src/browser/styles.css`,
  `tests/view/scene-picture.test.mjs`, `tests/view/scene.test.mjs`), the invariant
  `action-duration-minimum` (*Derives from*, plus a new decision that carries the sentence it derives
  from), the environment fact `pixel-crawler-terms` (*Source*), and the new invariant of settlement
  row 3.
- Foundation entries are written only through the project skills `the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-environment-fact` (task *To do* 10); a slice's *Read*
  names the skill by its path. Change of a decision's *Rationale*, *Rejected* and *Origin* only — the
  binding sentences stay (D-82 and D-362 and the new decision excepted).
- Vault notes are private: the plan, like every slice, copies no personal data and no secret; the
  public repository may be read by anyone, so slices write the reasoning, not the note's name or path.
- The product's gate is `npm test` (it runs `foundation_check.py` too); a slice's *Checks* name focused
  checks, never the gate (WAY-160). `python -B .the-way/elements/common/foundation_check.py` and the
  tracked-file private-paths checks are focused checks that may run.
- Slices run one after another in one worktree; no two agents write at once.

## What I expect you to look hard at

- How to divide ~300 decisions by source note and by the order of the log so that each slice fits one
  agent and a reviewer can check it against its notes; the 38 deleted notes need their history
  extracted — say which slice does it and what it hands on.
- The task's wording may be wrong. If a value or a count in it does not survive your own
  recount, say so in the report instead of fitting the plan to it.
- Where the cycle should put a check that no file git tracks names a note of the vault or a file of
  the private Loop repository after the change (a focused search the executors and reviewers can run).
- *To do* 9 (the `pixel-crawler-terms` source): the task says the cycle asks the human where no
  reachable place for the terms exists. Propose what the slice does when it finds none, as a
  question for the orchestrator, not a guess.

## Report contract

Return status (`done`, `done with concerns`, `questions`, `returned` or `reserved`), the plan's path,
the size report's verdict, and a one-line check result naming what failed or did not run. The full report
at the report path carries, as the method gives it, **Unread material** (what this handoff names that
stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked
for and not found or unclear, or `none`).
