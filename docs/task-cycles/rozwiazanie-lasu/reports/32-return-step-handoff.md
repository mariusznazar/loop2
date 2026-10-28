# Handoff — the return step, task `rozwiazanie-lasu`

## Delegation

The person who requested this cycle (the product's owner) has delegated every intermediate choice of
the cycle to its orchestrator. Send your questions to the orchestrator, never to the human; a
question the foundation step leaves to the human goes back with the status `blocked`.

## Where and how

- Worktree: `C:\Storage\repos\loop2-wt\rozwiazanie-lasu` — work from its root. Branch
  `task/rozwiazanie-lasu`, head `5cb8d0b`; task base `main` `6540e4c`; the-way pin moved by
  `c0c51a0` to `3aee7d9`.
- Method: `.the-way/task-cycle/change/SKILL.md` (pinned the-way), read whole. Your stage is **the
  return step** — none of the method's variant rows is yours.
- Read whole `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md`,
  and the skill of an element when you write or correct an entry of that element: the project skills
  `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`,
  `the-way-update-part-map`, `the-way-record-environment-fact` (entry points in
  `.claude/skills/the-way-*/SKILL.md`, pointing into `.the-way`). Never an unprefixed personal skill.
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md` — read whole. Spec `spec.md`, plan
  `plan.md` in the same directory.
- What the change wrote in the foundation: commit `82bbb1c` (report
  `reports/12-foundation-entries-report.md`, with each entry and its Polish meaning sentence) and
  the part-map line in `9dd8306`. The code: `82bbb1c..5cb8d0b`.
- Commit on the branch by explicit paths, messages in English in the repo's form (`docs: :memo: …`);
  leave the worktree clean. After a commit run `python -B .the-way/elements/common/foundation_check.py`
  and any test a correction touches, each with command and exit code. Do not run the full gate.
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/33-return-step-report.md`

## Answers of step 4

- Trust boundary: no. Irreversible operation: no.

## Orchestrator's answers binding this stage

- The human's rule of wording for this task's candidates (task, question 10, way B) holds for every
  entry you write or correct: no „tylko”, „nigdy”, „zawsze”, „bez” — in English "only", "never",
  "always", "without" used to exclude an alternative; an exclusion that outlasts the task describes
  what the game does not have today.
- Keep for the request one Polish sentence of the meaning of each entry you write or change.
- Review findings left open (Minor, not to be fixed by you unless the return step itself requires
  it): M-1 `player-map-run-pace`'s test does not exercise "unless the map run ends in it"; M-2
  `streak-program-change`'s test leaves out some group edits; M-3 doc comments past 80 columns;
  M-4 headquarters re-render on `solvedMaps` untested on the hand-made document
  (`reports/20-whole-review.md`).

## Report

Write your full report to the report path as the method and `return_step.md` give it — what you
compared, what no longer matched and its correction, each entry written or changed with its Polish
sentence, each check with command and exit code — and return only your status, your commits (or
none) and the report path.
