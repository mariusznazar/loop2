# Handoff — return step, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You take the return step of a planned change, a
fresh agent. You take no row of the variants table of `make-change`; your stage is the return step.
Your questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch `task/reset-hasla`,
  head `d5c80d3`. Process pin `.the-way` at `a8dfe8a`, not moved.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`) for how you
  commit and report; `.the-way/task-cycle/skill/return_step.md`, your stage; and
  `.the-way/task-cycle/skill/foundation_step.md`, since the return step writes as the foundation step
  writes. Read each whole; read a file they name when the step that names it comes, and the skill of
  an element when you write an entry of it.
- Frozen task: `.runs/task-cycles/reset-hasla/task.md`, *Settlements to record*, *Decisions in play* and
  *Questions carried to cycle*.
- Spec: `.runs/task-cycles/reset-hasla/spec.md`, section *Foundation entries*.
- The entries the change wrote and each row's entry:
  `.runs/task-cycles/reset-hasla/reports/06-foundation-report.md`. Since then `b9efe52` restored D-160's
  second sentence and `c02b685` narrowed D-100.
- Report path: `.runs/task-cycles/reset-hasla/reports/35-return-step-report.md`, holding the fields of
  the record's *Return step*:
  - Foundation compared with code: the entries the change writes or changes, those the task names
    and those the search found, and the part map of the touched parts, each compared with the code:
    what no longer matched and its correction, or none.
  - Decisions written or changed; invariants written or changed, each with the task, decision or human
    that sets its rule; environment facts; glossary terms; part-map changes; projected entries written
    whole or in part; rows of *Settlements to record* written, by row number and identifier.
  - For anything you write or correct, one sentence of its meaning in Polish, for the request.

Commit only what the return step corrects, by explicit paths, in the repository's style; no push.
Where nothing needs correcting, commit nothing and say so. Run
`python -B .the-way/elements/common/foundation_check.py` and give its command and exit code. Do not
run the full gate (`npm test` with no argument); it is the orchestrator's.

## Answers of step 4

- Trust boundary: **yes**, `src/server/**`.
- Irreversible operation: **no**; the change has no schema step.

## Where the comparison has been pointed so far

Each is a place to compare, not a stated answer:

- D-214, "under the field, from the form and from the server alike": a server's `invalid-email` would
  show on the page as the form's warning, under the form (whole-change review, *Searches*).
- D-218, its last sentence "stays as it was": the session of another account has its expiry renewed
  as the request ends (whole-change review, Minor 5).
- `guidelines/coding-account-policy.md:20`, „Rezerwacja przed pracą hasła, rozliczenie po jej końcu”:
  whether the rule, or its reach, is true of the set-password route, which takes no attempt ticket
  (D-218). The first review of the spec and its revision left this to the return step.
- Every `Method: test` of the entries: the whole-change review found each has a citing test.
- The words a player reads, in D-96, D-217, D-219, D-158 and D-44, against the code's strings.

## Not yours

Review findings are no foundation entries. The Minor and out-of-scope findings of the reports go to
the request's lists: do not fix them, tests included. Do not write an entry merely because no entry
covers a behaviour.

## Return

Write your report and return your status, your commits, a one-line check result and the report's path.
